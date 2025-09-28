import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/course.controllers";


const router = Router();

router.route('/createCourse').post(createCourse)
router.route('/getAllCourses').get(getAllCourses)
router.route('/getCourse/:courseId').get(getCourseById)
router.route('/updateCourse/:courseId').put(updateCourse)
router.route('/deleteCourse/:courseId').delete(deleteCourse)