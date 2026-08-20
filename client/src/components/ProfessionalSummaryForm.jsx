import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Enhance this professional summary: "${data || 'Experienced professional with a proven track record.'}". Make it compelling, ATS-friendly, and highlight key leadership and technical skills in 2-3 sentences.`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } },
      );
      if (response.data?.enhancedContent) {
        setResumeData((prev) => ({
          ...prev,
          professional_summary: response.data.enhancedContent,
        }));
        toast.success("Summary enhanced with AI!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Write a concise executive summary or bio
          </p>
        </div>
        
        {/* Vibrant Glowing AI Enhance Button */}
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          type="button"
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
            isGenerating
              ? "bg-purple-400 text-white opacity-50 animate-pulse cursor-wait"
              : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
          }`}
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4 text-amber-300 animate-bounce" />
          )}
          <span>{isGenerating ? "AI Enhancing..." : "AI Enhance"}</span>
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3.5 border text-xs border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-colors resize-none leading-relaxed bg-white"
          placeholder="Write a compelling professional summary that highlights your key strengths, domain expertise, and career goals..."
        />
        <p className="text-[11px] text-slate-500 text-center">
          Tip: Keep it concise (2-4 sentences) focusing on high-level achievements and career focus.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
