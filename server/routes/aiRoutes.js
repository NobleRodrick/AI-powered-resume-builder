import express from "express"
import protect from "../middlewares/authMiddleware.js"
import { enhanceJobDescription, enhanceProfessionalSummary, generateRecommendationLetter, generateSop, uploadResume } from "../controllers/aiController.js"

const aiRouter = express.Router()

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary)
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription)
aiRouter.post("/generate-recommendation-letter", protect, generateRecommendationLetter)
aiRouter.post("/generate-sop", protect, generateSop)
aiRouter.post("/upload-resume", protect, uploadResume)

export default aiRouter
