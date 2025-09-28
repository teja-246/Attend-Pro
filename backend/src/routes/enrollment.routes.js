import { Router } from "express";
import { enrollStudent, getEnrollmentByCourse, getEnrollmentByStudent, unenrollmentStudent } from "../controllers/enrollment.controller";

const router = Router()

router.route('/enrollStudent').post(enrollStudent)
router.route('/course/:courseId').get(getEnrollmentByCourse)
router.route('/student/:studentId').get(getEnrollmentByStudent)
router.route('/:studentId').delete(unenrollmentStudent)