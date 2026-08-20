import React, { useState } from "react";
import { Sparkles, FileSignature, Building2, UserCheck, Calendar, Image as ImageIcon, UploadCloud, Loader2 } from "lucide-react";
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

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store local File object in letterhead.logo_url for ImageKit multipart submission
      updateLetterhead("logo_url", file);
      toast.success("School/Institution logo attached! Click Save to upload.");
    }
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
            sender_title: letterhead.sender_title || recommenderTitle || "Department Chair & Senior Professor",
            recipient_name: letterhead.recipient_name || "Graduate Admissions Committee",
            subject: letterhead.subject || `Letter of Recommendation for ${candidateName}`,
            date: letterhead.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          },
        });
        toast.success("Official Recommendation Letter generated with AI!");
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
          <FileSignature className="size-5 text-emerald-600" />
          Recommendation Letter Builder
        </h3>
        <p className="text-sm text-gray-500">
          Build official letters of recommendation with university/company letterhead, logos, and signatures
        </p>
      </div>

      {/* AI Assistant Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="size-4 animate-pulse text-amber-400" />
            AI Gemini Executive Letter Generator
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Candidate Full Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-300 mb-1">Recommender Title</label>
            <input
              type="text"
              value={recommenderTitle}
              onChange={(e) => setRecommenderTitle(e.target.value)}
              placeholder="e.g. Department Chair / Vice President"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-300 mb-1">Relationship Context</label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. Professor & Research Advisor for 3 years"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-300 mb-1">Target Opportunity / Position</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Ph.D. in Computer Science"
              className="w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Key Achievements & Strengths</label>
          <input
            type="text"
            value={keyStrengths}
            onChange={(e) => setKeyStrengths(e.target.value)}
            placeholder="e.g. Top 1% of graduating class, published author, exemplary research leadership"
            className="w-full px-3 py-2 text-xs border border-slate-700 rounded-lg bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Vibrant Glowing AI Button */}
        <button
          onClick={handleGenerateAILetter}
          disabled={loadingAI}
          type="button"
          className={`w-full py-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
            loadingAI
              ? "bg-purple-400 text-white opacity-50 animate-pulse cursor-wait"
              : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-purple-900/50 transform hover:scale-[1.01] active:scale-95"
          }`}
        >
          {loadingAI ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4 text-amber-300 animate-bounce" />
          )}
          <span>{loadingAI ? "Drafting Recommendation Letter with AI..." : "Generate AI Recommendation Letter"}</span>
        </button>
      </div>

      {/* Institutional Letterhead Details & School Logo Upload */}
      <div className="p-5 border border-slate-200 rounded-xl space-y-4 bg-white shadow-sm">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <Building2 className="size-4 text-slate-600" /> Institutional Letterhead Header & Logo
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">University / Organization Name</label>
            <input
              type="text"
              value={letterhead.institution_name || ""}
              onChange={(e) => updateLetterhead("institution_name", e.target.value)}
              placeholder="e.g. Harvard University / Google Research"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              School / Institution Logo File (Upload)
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sender / Recommender Name</label>
            <input
              type="text"
              value={letterhead.sender_name || ""}
              onChange={(e) => updateLetterhead("sender_name", e.target.value)}
              placeholder="e.g. Dr. Arthur Pendelton"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sender Official Title</label>
            <input
              type="text"
              value={letterhead.sender_title || ""}
              onChange={(e) => updateLetterhead("sender_title", e.target.value)}
              placeholder="e.g. Dean of Academic Affairs"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sender Email</label>
            <input
              type="email"
              value={letterhead.sender_email || ""}
              onChange={(e) => updateLetterhead("sender_email", e.target.value)}
              placeholder="e.g. professor@harvard.edu"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document Date</label>
            <input
              type="text"
              value={letterhead.date || ""}
              onChange={(e) => updateLetterhead("date", e.target.value)}
              placeholder="e.g. October 24, 2024"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="p-5 border border-slate-200 rounded-xl space-y-3 bg-white shadow-sm">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <UserCheck className="size-4 text-slate-600" /> Recipient & Subject
        </h4>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Name / Committee</label>
            <input
              type="text"
              value={letterhead.recipient_name || ""}
              onChange={(e) => updateLetterhead("recipient_name", e.target.value)}
              placeholder="e.g. Graduate Admissions Committee"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Organization</label>
            <input
              type="text"
              value={letterhead.recipient_organization || ""}
              onChange={(e) => updateLetterhead("recipient_organization", e.target.value)}
              placeholder="e.g. MIT Department of EECS"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Letter Subject Line</label>
          <input
            type="text"
            value={letterhead.subject || ""}
            onChange={(e) => updateLetterhead("subject", e.target.value)}
            placeholder="e.g. Recommendation Letter for Jane Doe - Application ID #9821"
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Letter Body Editor */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800">Recommendation Letter Content</label>
        <textarea
          rows={11}
          value={documentBody}
          onChange={(e) => onChange({ ...data, document_body: e.target.value })}
          placeholder="Enter or edit the official recommendation letter text here..."
          className="w-full p-4 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>

      {/* Digital Signature */}
      <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-white shadow-sm">
        <label className="block text-xs font-semibold text-slate-700">Digital Signature Image URL (Optional)</label>
        <input
          type="text"
          value={signatureUrl}
          onChange={(e) => onChange({ ...data, signature_url: e.target.value })}
          placeholder="https://example.com/signature.png"
          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
        />
        <p className="text-[11px] text-slate-500">Renders as an official sign-off graphic at the bottom of the letter.</p>
      </div>
    </div>
  );
};

export default RecommendationLetterForm;
