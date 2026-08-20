import React, { useState } from "react";
import { FileText, Sparkles, GraduationCap, Building2, UploadCloud, Loader2 } from "lucide-react";
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

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateLetterhead("logo_url", file);
      toast.success("Institution logo attached! Click Save to upload.");
    }
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
        toast.success(`${documentType === "cover_letter" ? "Cover Letter" : "Statement of Purpose"} generated with AI!`);
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
          <FileText className="size-5 text-indigo-600" />
          Official Academic & Professional Documents
        </h3>
        <p className="text-sm text-gray-500">
          Draft Statements of Purpose (SOP), Cover Letters, or Transcript Summaries
        </p>
      </div>

      {/* Document Type Selector */}
      <div className="p-2 border border-slate-200 rounded-xl bg-slate-100/80 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...data, document_type: "statement_of_purpose", template: "official-letterhead" })}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            documentType === "statement_of_purpose"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-200"
          }`}
        >
          Statement of Purpose (SOP)
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, document_type: "cover_letter", template: "official-letterhead" })}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            documentType === "cover_letter"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-200"
          }`}
        >
          Cover Letter
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, document_type: "transcript_summary", template: "official-letterhead" })}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            documentType === "transcript_summary"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-200"
          }`}
        >
          Transcript Summary
        </button>
      </div>

      {/* AI Assistant Generator */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="size-4 animate-pulse text-emerald-400" />
            AI Gemini Document Studio
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Applicant Name</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="e.g. John Smith"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Target Program / Job Title</label>
            <input
              type="text"
              value={targetProgram}
              onChange={(e) => setTargetProgram(e.target.value)}
              placeholder="e.g. M.S. in Data Science at Columbia University"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Academic / Professional Background</label>
          <input
            type="text"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="e.g. B.S. in Computer Engineering, 2 years research experience in NLP"
            className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Key Motivations</label>
            <input
              type="text"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="e.g. Driven to pioneer ethical AI and large language models"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Future Career Goals</label>
            <input
              type="text"
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              placeholder="e.g. Lead AI research lab and mentor next generation scholars"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Vibrant Glowing AI Button */}
        <button
          onClick={handleGenerateSop}
          disabled={loadingAI}
          type="button"
          className={`w-full py-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
            loadingAI
              ? "bg-purple-400 text-white opacity-50 animate-pulse cursor-wait"
              : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-indigo-900/50 transform hover:scale-[1.01] active:scale-95"
          }`}
        >
          {loadingAI ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4 text-amber-300 animate-bounce" />
          )}
          <span>{loadingAI ? "Generating Document..." : `Generate AI ${documentType === "cover_letter" ? "Cover Letter" : "Statement of Purpose"}`}</span>
        </button>
      </div>

      {/* Document Header & Details */}
      <div className="p-5 border border-slate-200 rounded-xl space-y-4 bg-white shadow-sm">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Building2 className="size-4 text-slate-600" /> Header & Institution Logo
        </h4>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
            <input
              type="text"
              value={letterhead.date || ""}
              onChange={(e) => updateLetterhead("date", e.target.value)}
              placeholder="e.g. November 15, 2024"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institution / School Logo File (Upload)
            </label>
            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold border border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 rounded-lg cursor-pointer transition-colors">
                <UploadCloud className="size-4" />
                {typeof letterhead.logo_url === "object"
                  ? letterhead.logo_url.name
                  : "Upload Logo Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {typeof letterhead.logo_url === "string" && letterhead.logo_url && (
                <img
                  src={letterhead.logo_url}
                  alt="Logo Preview"
                  className="size-9 object-contain border border-slate-200 rounded p-0.5 bg-white"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Line</label>
            <input
              type="text"
              value={letterhead.subject || ""}
              onChange={(e) => updateLetterhead("subject", e.target.value)}
              placeholder="e.g. Statement of Purpose - Application #4019"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient / University Name</label>
            <input
              type="text"
              value={letterhead.recipient_organization || ""}
              onChange={(e) => updateLetterhead("recipient_organization", e.target.value)}
              placeholder="e.g. Stanford University Admissions Office"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800">
          Document Content ({documentType.replace(/_/g, " ").toUpperCase()})
        </label>
        <textarea
          rows={12}
          value={documentBody}
          onChange={(e) => onChange({ ...data, document_body: e.target.value })}
          placeholder="Enter or edit your statement of purpose, cover letter, or transcript notes..."
          className="w-full p-4 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
    </div>
  );
};

export default OfficialDocumentForm;
