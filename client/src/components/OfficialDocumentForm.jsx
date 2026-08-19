import React, { useState } from "react";
import { FileText, Sparkles, GraduationCap, Building2 } from "lucide-react";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const OfficialDocumentForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [loadingAI, setLoadingAI] = useState(false);

  const documentType = data.document_type || "statement_of_purpose";
  const letterhead = data.letterhead || {};
  const documentBody = data.document_body || "";

  // Prompt helpers
  const [applicantName, setApplicantName] = useState(data.personal_info?.full_name || "");
  const [targetProgram, setTargetProgram] = useState("");
  const [background, setBackground] = useState("");
  const [motivation, setMotivation] = useState("");
  const [careerGoals, setCareerGoals] = useState("");

  const updateLetterhead = (field, value) => {
    onChange({
      ...data,
      letterhead: {
        ...letterhead,
        [field]: value,
      },
    });
  };

  const handleGenerateSop = async () => {
    setLoadingAI(true);
    try {
      const { data: resData } = await api.post(
        "/api/ai/generate-sop",
        {
          applicantName: applicantName || data.personal_info?.full_name,
          targetProgram,
          background,
          motivation,
          careerGoals,
          documentType,
        },
        { headers: { Authorization: token } }
      );

      if (resData.documentContent) {
        onChange({
          ...data,
          document_body: resData.documentContent,
          letterhead: {
            ...letterhead,
            sender_name: applicantName || data.personal_info?.full_name || "Applicant Name",
            sender_title: data.personal_info?.profession || "Applicant",
            date: letterhead.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            subject: letterhead.subject || (documentType === "cover_letter" ? `Cover Letter - ${targetProgram}` : `Statement of Purpose - ${targetProgram}`),
          },
        });
        toast.success(`${documentType === "cover_letter" ? "Cover Letter" : "Statement of Purpose"} generated!`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate document");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="size-5 text-green-600" />
          Official Academic & Professional Documents
        </h3>
        <p className="text-sm text-gray-500">
          Create Statement of Purpose (SOP), Cover Letters, or Transcript Summaries
        </p>
      </div>

      {/* Document Type Selector */}
      <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...data, document_type: "statement_of_purpose", template: "official-letterhead" })}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            documentType === "statement_of_purpose"
              ? "bg-green-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Statement of Purpose (SOP)
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, document_type: "cover_letter", template: "official-letterhead" })}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            documentType === "cover_letter"
              ? "bg-green-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Cover Letter
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, document_type: "transcript_summary", template: "official-letterhead" })}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            documentType === "transcript_summary"
              ? "bg-green-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Transcript Summary
        </button>
      </div>

      {/* AI Assistant Generator */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-teal-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-teal-900 flex items-center gap-2">
            <Sparkles className="size-4 text-teal-600 animate-pulse" />
            AI Document Generator (Gemini 2.5)
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Applicant Name</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="e.g. John Smith"
              className="w-full px-2.5 py-1.5 border border-teal-200 rounded bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Target Program / Job Title</label>
            <input
              type="text"
              value={targetProgram}
              onChange={(e) => setTargetProgram(e.target.value)}
              placeholder="e.g. M.S. in Data Science at Columbia University"
              className="w-full px-2.5 py-1.5 border border-teal-200 rounded bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Academic / Professional Background</label>
          <input
            type="text"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="e.g. B.S. in Computer Engineering, 2 years research experience in NLP"
            className="w-full px-2.5 py-1.5 text-xs border border-teal-200 rounded bg-white"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Key Motivations</label>
            <input
              type="text"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="e.g. Driven to pioneer ethical AI and large language models"
              className="w-full px-2.5 py-1.5 border border-teal-200 rounded bg-white"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Future Career Goals</label>
            <input
              type="text"
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="e.g. Lead AI research lab and mentor next generation scholars"
              className="w-full px-2.5 py-1.5 border border-teal-200 rounded bg-white"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateSop}
          disabled={loadingAI}
          className="w-full py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-xs font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          {loadingAI ? "Generating Document..." : `Generate AI ${documentType === "cover_letter" ? "Cover Letter" : "Statement of Purpose"}`}
        </button>
      </div>

      {/* Document Header & Details */}
      <div className="p-4 border border-gray-200 rounded-xl space-y-3 bg-white">
        <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <Building2 className="size-4 text-gray-600" /> Header & Recipient Setup
        </h4>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
            <input
              type="text"
              value={letterhead.date || ""}
              onChange={(e) => updateLetterhead("date", e.target.value)}
              placeholder="e.g. November 15, 2024"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Subject Line</label>
            <input
              type="text"
              value={letterhead.subject || ""}
              onChange={(e) => updateLetterhead("subject", e.target.value)}
              placeholder="e.g. Statement of Purpose - Application #4019"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Recipient / University Name</label>
            <input
              type="text"
              value={letterhead.recipient_organization || ""}
              onChange={(e) => updateLetterhead("recipient_organization", e.target.value)}
              placeholder="e.g. Stanford University Admissions Office"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Recipient Address / Location</label>
            <input
              type="text"
              value={letterhead.recipient_address || ""}
              onChange={(e) => updateLetterhead("recipient_address", e.target.value)}
              placeholder="e.g. Stanford, CA 94305, USA"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">
          Document Content ({documentType.replace(/_/g, " ").toUpperCase()})
        </label>
        <textarea
          rows={12}
          value={documentBody}
          onChange={(e) => onChange({ ...data, document_body: e.target.value })}
          placeholder="Enter or edit your statement of purpose, cover letter, or transcript notes..."
          className="w-full p-4 border border-gray-300 rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-green-500 bg-white"
        />
      </div>
    </div>
  );
};

export default OfficialDocumentForm;
