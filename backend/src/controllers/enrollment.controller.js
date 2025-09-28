import { Enrollment } from "../models/enrollment.model";
import { User } from "../models/user.model";


const enrollStudent = async ( req, res ) => {
  const { student_id, course_id } = req.body;
  try {
    if( !student_id || !course_id ) return res.status(401).json({ message: 'Please provide both student ID and course ID.' })
    
    const student = await User.findById(student_id)
    const course = await User.findById(course_id)

    if( !student || student.role !== 'student' ) return res.status(401).json({ message: 'Student not found or user is not a student.' })
    if( !course ) return res.status(401).json({ message: "Course not found." })

    const existingEnrollment = await Enrollment.findOne({ student_id, course_id })
    if( existingEnrollment ) return res.status(401).json({ message: 'Student is already enrolled in this course.'})
    
    const enrollment = new Enrollment({
      student_id,
      course_id
    })
    const createdEnrollment = await enrollment.save()
    res.status(201).json(createdEnrollment)
  } catch (error) {
    res.status(501).json({ message: 'Server error in enrolling student', error: error.message })
  }
}


const getEnrollmentByCourse = async ( req, res ) => {
  try {
    const enrollment = await Enrollment.find({ course_id: req.params.courseId }).populate('student_id', 'firstName lastName email')
    if( !enrollment ) return res.status(401).json({ message: 'No enrollment found for this course.'})

    res.status(201).json(enrollment)
  } catch (error) {
    res.status(501).json({ message: 'Server error while fetching enrollments. ', error: error.message })
  }
}


const getEnrollmentByStudent = async ( req, res ) => {
  try {
    const enrollment = await Enrollment.find({ student_id: req.params.studentId }).populate({
      path: 'course_id',
      populate: {
        path: 'faculty_id',
        select: 'firstName lastName'
      }
    })
    if( !enrollment ) return res.status(401).json({ message: 'No enrollment found for this student.'})

    res.status(201).json(enrollment)
  } catch (error) {
    res.status(501).json({ message: 'Server error while fetching enrollments. ', error: error.message })
  }
}


const unenrollmentStudent = async ( req, res ) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)

    if( enrollment ){
      await enrollment.deleteOne();
      res.status(201).json({ messaage: 'Student unenrolled successfully.'})
    }else{
      res.status(404).json({ message: 'Enrollment record not found.' })
    }
  } catch (error) {
    res.status(501).json({ message: 'Server error while unenrolling student. ', error: error.message })
  }
}


export { enrollStudent, getEnrollmentByCourse, getEnrollmentByStudent, unenrollmentStudent }