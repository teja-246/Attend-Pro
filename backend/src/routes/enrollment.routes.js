import { Router } from "express";
import { enrollStudent, getEnrollmentByCourse, getEnrollmentByStudent, unenrollmentStudent } from "../controllers/enrollment.controller";

const router = Router()

router.route('/').post(enrollStudent)
router.route('/course/:courseId').get(getEnrollmentByCourse)
router.route('/student/:studentId').get(getEnrollmentByStudent)
router.route('/:id').delete(unenrollmentStudent)
