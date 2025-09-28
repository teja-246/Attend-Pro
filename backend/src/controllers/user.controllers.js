import { University } from "../models/university.model";
import { User } from "../models/user.model";

const registerUniversity = async (req, res) => {
    try {
        const { universityName, contactEmail } = req.body;
        if (universityName.length < 1) {
            throw new Error("University name can't be empty");
        }
        if (contactEmail.length < 1) {
            throw new Error("Contact email can't be empty");
        }
        const existingUniversity = await University.findOne({ universityName });
        if (existingUniversity) {
            throw new Error("University already registered");
        }
        const newUniversity = new University({ universityName, contactEmail });
        await newUniversity.save();
        res.status(201).json({ message: "University registered successfully", university: newUniversity });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering university", error });
    }
};
const registerUser = async (req, res) => {
    try {
        const { user_id, userType, firstName, lastName, email, password } = req.body;
        if (firstName.length < 1) {
            throw new Error("First name cannot be empty");
        }
        if (password.length < 1) {
            throw new Error("Password can't be empty");
        }
        if (email.length < 1) {
            throw new Error("Email can't be empty");
        }
        if (user_id.length < 1) {
            throw new Error("User ID can't be empty");
        }
        const existingUser = await User.findOne({ user_id });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = new User({ user_id, userType, firstName, lastName, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};
const generateAccessandRefreshTokens = async(userId) =>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error("Error while generating tokens");
    }
}
const loginUser = async (req, res) => {
    try {
        const { user_id, password } = req.body;
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.status(401).json({ message: "Invalid ID" });
        }
        const isPasswordValid = user.isPasswordValid(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshTokens(user._id);
        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        console.log('Response headers:', res.getHeaders());

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "Login successful", user: loggedInUser, accessToken, refreshToken });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id,
            {
                $unset: { refreshToken: 1 }
            },
            {
                new: true
            })
    
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({message:"Logout successful"}, )
    } 
    catch (error) {
        throw new Error("Error while logging out");
    }
}
const refreshAccessToken = async (req, res) => {

    const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incommingRefreshToken) {
        throw new ApiError(401, "Unauthorised Request")
    }

    const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)
    if (!user) {
        throw new ApiError(401, "Invalid Refresh token")
    }

    if (incommingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token is expired or used")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, newrefreshToken } = await generateAccessandRefreshTokens(user._id)

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json({ accessToken, refreshToken: newrefreshToken }, "Access token refreshed!!")
}
export { registerUniversity, registerUser, loginUser, logoutUser, refreshAccessToken };