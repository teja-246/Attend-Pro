import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {registerUniversity, registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controllers.js"

const router = Router()

router.route("/registerUniversity").post(registerUniversity)
router.route("/registerUser").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router