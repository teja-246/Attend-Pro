import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/course.controllers";


const router = Router();

router.route('/').post(createCourse).get(getAllCourses)
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse)