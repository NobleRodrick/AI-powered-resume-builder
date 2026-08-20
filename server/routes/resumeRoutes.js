import express from "express"
import protect from "../middlewares/authMiddleware.js"
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js"
import { getUserResumes } from "../controllers/userController.js"
import upload from "../configs/multer.js"

const resumeRouter = express.Router()

resumeRouter.post("/create", protect, createResume)
resumeRouter.put("/update", upload.fields([{ name: "image", maxCount: 1 }, { name: "logo", maxCount: 1 }]), protect, updateResume)
resumeRouter.delete("/delete/:resumeId", protect, deleteResume)
resumeRouter.get("/get", protect, getUserResumes)
resumeRouter.get("/", protect, getUserResumes)
resumeRouter.get("/get/:resumeId", protect, getResumeById)
resumeRouter.get("/public/:resumeId", getPublicResumeById)

export default resumeRouter