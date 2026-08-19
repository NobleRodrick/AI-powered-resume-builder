import ai, { DEFAULT_MODEL, PRO_MODEL } from "../configs/ai.js";
import Resume from "../models/Resume.js";

// controller for enhancing a resume's professional summary with AI
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Content is required" });
    }

    const modelToUse = process.env.OPENAI_MODEL || process.env.GEMINI_MODEL || DEFAULT_MODEL;
    const response = await ai.chat.completions.create({
      model: modelToUse,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly, and only return text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for enhancing a resume's job descriptions with AI
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const modelToUse = process.env.OPENAI_MODEL || process.env.GEMINI_MODEL || DEFAULT_MODEL;
    const response = await ai.chat.completions.create({
      model: modelToUse,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results. Make it ATS-friendly, and only return text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for generating official Recommendation Letters
// POST: /api/ai/generate-recommendation-letter
export const generateRecommendationLetter = async (req, res) => {
  try {
    const { candidateName, recommenderTitle, relationship, targetRole, keyStrengths } = req.body;

    if (!candidateName || !relationship) {
      return res.status(400).json({ message: "Candidate name and relationship details are required" });
    }

    const prompt = `Write a formal, highly persuasive Letter of Recommendation for ${candidateName}.
Recommender Position: ${recommenderTitle || "Supervisor/Professor"}
Relationship & Context: ${relationship}
Target Opportunity / Program: ${targetRole || "Graduate Admission / Employment"}
Candidate Strengths & Key Achievements: ${keyStrengths || "Exceptional academic performance, strong analytical skills, leadership, and work ethic"}

Instructions:
- Write in a highly professional, academic/institutional tone suitable for official print/PDF documents.
- Structure into 4-5 well-formed paragraphs (Opening recommendation, relationship context, core strengths & evidence, personal character, enthusiastic closing statement).
- Do NOT include markdown headers or brackets, return raw clean text formatted with proper line breaks suitable for direct document insertion.`;

    const modelToUse = process.env.GEMINI_PRO_MODEL || PRO_MODEL;
    const response = await ai.chat.completions.create({
      model: modelToUse,
      messages: [
        { role: "system", content: "You are a distinguished university professor and senior executive writing official recommendation letters." },
        { role: "user", content: prompt },
      ],
    });

    const documentContent = response.choices[0].message.content;
    return res.status(200).json({ documentContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for generating Statement of Purpose / Cover Letters
// POST: /api/ai/generate-sop
export const generateSop = async (req, res) => {
  try {
    const { applicantName, targetProgram, background, motivation, careerGoals, documentType } = req.body;

    const docTypeLabel = documentType === "cover_letter" ? "Professional Cover Letter" : "Statement of Purpose (SOP)";

    const prompt = `Write a compelling ${docTypeLabel} for ${applicantName || "the applicant"}.
Target Program / Job Position: ${targetProgram || "Graduate Program / Position"}
Academic/Professional Background: ${background || "Strong background in relevant field"}
Key Motivations: ${motivation || "Passion for research and career growth"}
Long-term Career Goals: ${careerGoals || "To excel as a leader and researcher"}

Instructions:
- Structure into 4-5 impactful paragraphs.
- Tone: Confident, articulate, professional, and inspiring.
- Do NOT include markdown code blocks, return raw text ready for official printing.`;

    const modelToUse = process.env.GEMINI_PRO_MODEL || PRO_MODEL;
    const response = await ai.chat.completions.create({
      model: modelToUse,
      messages: [
        { role: "system", content: "You are an expert academic advisor and executive career coach." },
        { role: "user", content: prompt },
      ],
    });

    const documentContent = response.choices[0].message.content;
    return res.status(200).json({ documentContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from a resume or CV.";

    const userPrompt = `extract data from this resume: ${resumeText}
        Provide data in the following JSON format with no additional text before or after:

        {
        professional_summary: "",
        skills: [""],
        personal_info: {
           image: "",
           full_name: "",
           profession: "",
           email: "",
           phone: "",
           location: "",
           linkedin: "",
           website: ""
        },
        experience: [
            {
                company: "",
                position: "",
                start_date: "",
                end_date: "",
                description: "",
                is_current: false
            }
        ],
        project: [
            {
               name: "",
               type: "",
               description: ""
            }
        ],
        education: [
            {
                institution: "",
                degree: "",
                field: "",
                start_date: "",
                graduation_date: "",
                is_current: false,
                gpa: "",
                location: "",
                honors: "",
                thesis_title: "",
                relevant_coursework: []
            }
        ]
        }
        `;

    const modelToUse = process.env.OPENAI_MODEL || process.env.GEMINI_MODEL || DEFAULT_MODEL;
    const response = await ai.chat.completions.create({
      model: modelToUse,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });

    res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

