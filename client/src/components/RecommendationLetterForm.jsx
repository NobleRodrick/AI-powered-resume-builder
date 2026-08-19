import React, { useState } from "react";
import { Sparkles, FileSignature, Building2, UserCheck, Calendar, Image as ImageIcon } from "lucide-react";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RecommendationLetterForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [loadingAI, setLoadingAI] = useState(false);

  const letterhead = data.letterhead || {};
  const documentBody = data.document_body || "";
  const signatureUrl = data.signature_url || "";

  // Prompt helpers state
  const [candidateName, setCandidateName] = useState(data.personal_info?.full_name || "");
  const [recommenderTitle, setRecommenderTitle] = useState(letterhead.sender_title || "");
  const [relationship, setRelationship] = useState("Academic Advisor & Senior Professor for 3 years");
  const [targetRole, setTargetRole] = useState("Ph.D. Program in Computer Science / Employment");
  const [keyStrengths, setKeyStrengths] = useState("Top 1% of graduating class, exceptional analytical problem solving, research leadership, integrity");

  const updateLetterhead = (field, value) => {
    onChange({
      ...data,
      letterhead: {
        ...letterhead,
        [field]: value,
      },
    });
  };

  const handleGenerateAILetter = async () => {
    if (!candidateName) {
      toast.error("Please provide the candidate name");
      return;
    }
    setLoadingAI(true);
    try {
      const { data: resData } = await api.post(
        "/api/ai/generate-recommendation-letter",
        {
          candidateName,
          recommenderTitle: recommenderTitle || letterhead.sender_title,
          relationship,
          targetRole,
          keyStrengths,
        },
        { headers: { Authorization: token } }
      );

      if (resData.documentContent) {
        onChange({
          ...data,
          document_body: resData.documentContent,
          letterhead: {
            ...letterhead,
            sender_name: letterhead.sender_name || recommenderTitle || "Prof. Dr. Alexander Vance",
            sender_title: letterhead.sender_title || recommenderTitle || "Department Chair & Professor",
            recipient_name: letterhead.recipient_name || "Graduate Admissions Committee",
            subject: letterhead.subject || `Letter of Recommendation for ${candidateName}`,
            date: letterhead.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          },
        });
        toast.success("Recommendation Letter generated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate recommendation letter");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileSignature className="size-5 text-green-600" />
          Recommendation Letter Builder
        </h3>
        <p className="text-sm text-gray-500">
          Build and print official letters of recommendation with institutional letterhead and signatures
        </p>
      </div>

      {/* AI Assistant Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-green-900 flex items-center gap-2">
            <Sparkles className="size-4 text-green-600 animate-pulse" />
            AI Gemini Letter Writer
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Candidate Full Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full px-2.5 py-1.5 border border-green-200 rounded bg-white"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Recommender Title</label>
            <input
              type="text"
              value={recommenderTitle}
              onChange={(e) => setRecommenderTitle(e.target.value)}
              placeholder="e.g. Department Chair / Vice President"
              className="w-full px-2.5 py-1.5 border border-green-200 rounded bg-white"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Relationship Context</label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. Professor & Research Advisor for 3 years"
              className="w-full px-2.5 py-1.5 border border-green-200 rounded bg-white"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Target Program / Position</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Ph.D. in Computer Science"
              className="w-full px-2.5 py-1.5 border border-green-200 rounded bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Key Achievements & Strengths</label>
          <input
            type="text"
            value={keyStrengths}
            onChange={(e) => setKeyStrengths(e.target.value)}
            placeholder="e.g. Top 1% of graduating class, published author, exemplary research leadership"
            className="w-full px-2.5 py-1.5 text-xs border border-green-200 rounded bg-white"
          />
        </div>

        <button
          onClick={handleGenerateAILetter}
          disabled={loadingAI}
          className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-xs font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          {loadingAI ? "Drafting Official Recommendation Letter..." : "Generate AI Recommendation Letter"}
        </button>
      </div>

      {/* Institutional Letterhead Details */}
      <div className="p-4 border border-gray-200 rounded-xl space-y-3 bg-white">
        <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <Building2 className="size-4 text-gray-600" /> Institutional Letterhead Header
        </h4>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">University / Organization Name</label>
            <input
              type="text"
              value={letterhead.institution_name || ""}
              onChange={(e) => updateLetterhead("institution_name", e.target.value)}
              placeholder="e.g. Harvard University / Google Research"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Institution Logo URL (Optional)</label>
            <input
              type="text"
              value={letterhead.logo_url || ""}
              onChange={(e) => updateLetterhead("logo_url", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sender / Recommender Name</label>
            <input
              type="text"
              value={letterhead.sender_name || ""}
              onChange={(e) => updateLetterhead("sender_name", e.target.value)}
              placeholder="e.g. Dr. Arthur Pendelton"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sender Official Title</label>
            <input
              type="text"
              value={letterhead.sender_title || ""}
              onChange={(e) => updateLetterhead("sender_title", e.target.value)}
              placeholder="e.g. Dean of Academic Affairs"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sender Email</label>
            <input
              type="email"
              value={letterhead.sender_email || ""}
              onChange={(e) => updateLetterhead("sender_email", e.target.value)}
              placeholder="e.g. professor@harvard.edu"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Document Date</label>
            <input
              type="text"
              value={letterhead.date || ""}
              onChange={(e) => updateLetterhead("date", e.target.value)}
              placeholder="e.g. October 24, 2024"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="p-4 border border-gray-200 rounded-xl space-y-3 bg-white">
        <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <UserCheck className="size-4 text-gray-600" /> Recipient & Subject
        </h4>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Recipient Name / Committee</label>
            <input
              type="text"
              value={letterhead.recipient_name || ""}
              onChange={(e) => updateLetterhead("recipient_name", e.target.value)}
              placeholder="e.g. Graduate Admissions Committee"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Recipient Organization</label>
            <input
              type="text"
              value={letterhead.recipient_organization || ""}
              onChange={(e) => updateLetterhead("recipient_organization", e.target.value)}
              placeholder="e.g. MIT Department of EECS"
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Letter Subject Line</label>
          <input
            type="text"
            value={letterhead.subject || ""}
            onChange={(e) => updateLetterhead("subject", e.target.value)}
            placeholder="e.g. Recommendation Letter for Jane Doe - Application ID #9821"
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Letter Body Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">Recommendation Letter Body Text</label>
        <textarea
          rows={10}
          value={documentBody}
          onChange={(e) => onChange({ ...data, document_body: e.target.value })}
          placeholder="Enter or edit the official recommendation letter text here..."
          className="w-full p-4 border border-gray-300 rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-green-500 bg-white"
        />
      </div>

      {/* Digital Signature */}
      <div className="p-4 border border-gray-200 rounded-xl space-y-2 bg-white">
        <label className="block text-xs font-medium text-gray-700">Digital Signature Image URL (Optional)</label>
        <input
          type="text"
          value={signatureUrl}
          onChange={(e) => onChange({ ...data, signature_url: e.target.value })}
          placeholder="https://example.com/signature.png"
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500">Will be rendered at the bottom of the letterhead with official sign-off.</p>
      </div>
    </div>
  );
};

export default RecommendationLetterForm;
