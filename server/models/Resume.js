import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
    professional_summary: { type: String, default: "" },
    skills: [{ type: String }],
    personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
        }
    ],
    project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        }
    ],
    education: [
        {
            institution: { type: String, default: "" },
            degree: { type: String, default: "" },
            field: { type: String, default: "" },
            start_date: { type: String, default: "" },
            graduation_date: { type: String, default: "" },
            is_current: { type: Boolean, default: false },
            gpa: { type: String, default: "" },
            location: { type: String, default: "" },
            honors: { type: String, default: "" },
            thesis_title: { type: String, default: "" },
            relevant_coursework: [{ type: String }],
        }
    ],
    // Extended Academic & Executive CV Sections
    publications: [
        {
            title: { type: String, default: "" },
            journal: { type: String, default: "" },
            year: { type: String, default: "" },
            doi: { type: String, default: "" },
            authors: { type: String, default: "" },
            link: { type: String, default: "" },
        }
    ],
    research_experience: [
        {
            institution: { type: String, default: "" },
            role: { type: String, default: "" },
            advisor: { type: String, default: "" },
            start_date: { type: String, default: "" },
            end_date: { type: String, default: "" },
            is_current: { type: Boolean, default: false },
            description: { type: String, default: "" },
        }
    ],
    grants_and_awards: [
        {
            title: { type: String, default: "" },
            issuer: { type: String, default: "" },
            amount: { type: String, default: "" },
            year: { type: String, default: "" },
            description: { type: String, default: "" },
        }
    ],
    teaching_experience: [
        {
            institution: { type: String, default: "" },
            course_name: { type: String, default: "" },
            role: { type: String, default: "" },
            start_date: { type: String, default: "" },
            end_date: { type: String, default: "" },
        }
    ],
    languages: [
        {
            language: { type: String, default: "" },
            proficiency: { type: String, default: "Fluent" },
        }
    ],
    references: [
        {
            name: { type: String, default: "" },
            title: { type: String, default: "" },
            organization: { type: String, default: "" },
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            relationship: { type: String, default: "" },
        }
    ],
    certifications: [
        {
            name: { type: String, default: "" },
            issuer: { type: String, default: "" },
            date: { type: String, default: "" },
            credential_id: { type: String, default: "" },
            url: { type: String, default: "" },
        }
    ],
    custom_sections: [
        {
            title: { type: String, default: "Additional Achievements" },
            items: [
                {
                    heading: { type: String, default: "" },
                    subheading: { type: String, default: "" },
                    date: { type: String, default: "" },
                    description: { type: String, default: "" },
                }
            ]
        }
    ],
    interests: [{ type: String }],
    social_links: {
        github: { type: String, default: "" },
        twitter: { type: String, default: "" },
        portfolio: { type: String, default: "" },
        kaggle: { type: String, default: "" },
        scholar: { type: String, default: "" },
    },
    // Official Document & Recommendation Letter Fields
    document_type: { 
        type: String, 
        enum: ["resume", "cv", "recommendation_letter", "statement_of_purpose", "cover_letter", "transcript_summary"],
        default: "resume" 
    },
    letterhead: {
        institution_name: { type: String, default: "" },
        logo_url: { type: String, default: "" },
        sender_name: { type: String, default: "" },
        sender_title: { type: String, default: "" },
        sender_email: { type: String, default: "" },
        sender_phone: { type: String, default: "" },
        date: { type: String, default: "" },
        recipient_name: { type: String, default: "" },
        recipient_title: { type: String, default: "" },
        recipient_organization: { type: String, default: "" },
        recipient_address: { type: String, default: "" },
        subject: { type: String, default: "" },
    },
    signature_url: { type: String, default: "" },
    document_body: { type: String, default: "" },
}, { timestamps: true, minimize: false });

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;