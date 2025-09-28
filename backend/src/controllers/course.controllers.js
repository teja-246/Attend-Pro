import { Course } from "../models/courses.model.js";
import { User } from "../models/user.model.js";


//Don't touch the below comment .... this is for understanding the funcion of the below controller.
/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Private (Admin/Faculty)
 */

const createCourse = async ( req, res ) => {
  const { courseCode, courseName, faculty_id, semester } = req.body;

  try {
    // basic validation
    if( !courseCode || !courseName || !faculty_id || !semester){
      return res.status(401).json({ message: 'Please provide all required fields.' })
    }

    // checking if the course exists already.
    const courseExists = await Course.findOne({ courseCode, semester })
    if( courseExists ) return res.status(401).json({ message: 'This course already exist for specified semester.' })
    
    //verifying faculty_id to be of role faculty
    const facultyMember = await User.findById(faculty_id)
    if( !facultyMember || facultyMember.role !== 'faculty') return res.status(401).json({ message: 'Invalid faculty ID '})
    
    //creating a new course
    const course = new Course({
      courseCode,
      courseName,
      faculty_id,
      semester
    })
    const createdCourse = await course.save();
    res.status(201).json(createdCourse)
  } catch (error) {
    res.status(501).json({ message: 'Server error whle creating course.', error: error.message})
  }
}


/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public/Private
 */

const getAllCourses = async ( req, res ) => {
  try {
    const courses = await Course.find({}).populate('faculty_id', 'firstName lastName email')
    res.status(201).json(courses)

  } catch (error) {
    res.status(501).json({ message: 'Server error while fetching courses.', error: error.message })
  }
}


/**
 * @desc    Get a single course by its ID
 * @route   GET /api/courses/:id
 * @access  Public/Private
 */

const getCourseById = async ( req, res ) => {
  try {
    const course = await Course.findById(req.parama.id).populate('faculty_id', 'firstName lastName email')
    if(course){
      res.status(201).json(course)
    }else{
      res.status(404).json({ message: 'Course not found.' })
    }
  } catch (error) {
    res.status(501).json({ message: 'Server error while fetching courses.', error: error.message })
  }
}


/**
 * @desc    Update a course
 * @route   PUT /api/courses/:id
 * @access  Private (Admin/Faculty)
 */

const updateCourse = async ( req, res ) => {
  try {
      const course = await Course.findById(req.params.id)

      if (course) {
          course.courseCode = req.body.courseCode || course.courseCode
          course.courseName = req.body.courseName || course.courseName
          course.faculty_id = req.body.faculty_id || course.faculty_id
          course.semester = req.body.semester || course.semester

          const updatedCourse = await course.save();
          res.status(201).json(updatedCourse)
      } else {
          res.status(404).json({ message: 'Course not found.' })
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error while updating course.', error: error.message })
  }
};


/**
 * @desc    Delete a course
 * @route   DELETE /api/courses/:id
 * @access  Private (Admin)
 */

const deleteCourse = async ( req, res ) => {
  try {
      const course = await Course.findById(req.params.id)

      if (course) {
          await course.deleteOne()
          res.status(201).json({ message: 'Course removed successfully.' });
      } else {
          res.status(404).json({ message: 'Course not found.' });
      }
  } catch (error) {
      res.status(501).json({ message: 'Server error while deleting course.', error: error.message });
  }
};

export { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse }



