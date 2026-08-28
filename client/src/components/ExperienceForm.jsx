import React, { useState } from "react";
import { Briefcase, Calendar, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);
  const [errors, setErrors] = useState({});

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    const entry = { ...updated[index], [field]: value };
    updated[index] = entry;

    // Validate dates
    if (field === "start_date" || field === "end_date" || field === "is_current") {
      const newErrors = { ...errors };
      const start = entry.start_date;
      const end = entry.is_current ? new Date().toISOString().slice(0, 7) : entry.end_date;

      if (start && end && start > end) {
        newErrors[index] = "End date cannot be before start date";
      } else {
        delete newErrors[index];
      }
      setErrors(newErrors);
    }

    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index] || {};
    const pos = experience.position || "Professional Role";
    const comp = experience.company || "Company";
    const desc = experience.description || "Responsible for key tasks and project execution.";
    
    const prompt = `Enhance and write an executive, high-impact job description for the position of "${pos}" at "${comp}". Current draft details: "${desc}". Highlight achievements, leadership, and metrics in 2-3 crisp sentences.`;

    try {
      const { data: resData } = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      if (resData.enhancedContent) {
        updateExperience(index, "description", resData.enhancedContent);
        toast.success("Job description enhanced with AI!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Briefcase className="size-5 text-indigo-600" />
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add work history, roles, and achievements</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-medium text-slate-700">No work experience added yet.</p>
          <p className="text-xs text-slate-500 mt-1">Click "Add Experience" to list your positions.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((experience, index) => {
            const isGenerating = generatingIndex === index;
            return (
              <div
                key={index}
                className="p-5 border border-slate-200 rounded-xl space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Experience #{index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Remove Entry"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      value={experience.company || ""}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      type="text"
                      placeholder="e.g. Google / Microsoft"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Job Title / Position
                    </label>
                    <input
                      value={experience.position || ""}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      type="text"
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="size-3.5 text-slate-500" /> Start Date
                    </label>
                    <input
                      aria-label="Start date"
                      value={experience.start_date || ""}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      type="month"
                      className={`w-full px-3.5 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer ${
                        errors[index] ? "border-red-500 ring-red-200" : "border-slate-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Calendar className="size-3.5 text-slate-500" /> End Date
                    </label>
                    <input
                      aria-label="End date"
                      value={experience.end_date || ""}
                      disabled={Boolean(experience.is_current)}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      type="month"
                      className={`w-full px-3.5 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed ${
                        errors[index] ? "border-red-500 ring-red-200" : "border-slate-300"
                      }`}
                    />
                  </div>
                </div>
                {errors[index] && (
                  <p className="text-[10px] text-red-500 font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors[index]}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`exp_current_${index}`}
                    checked={experience.is_current || false}
                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor={`exp_current_${index}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                    Currently working in this role
                  </label>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-800">
                      Description & Achievements
                    </label>

                    {/* Vibrant Glowing AI Enhance Button */}
                    <button
                      onClick={() => generateDescription(index)}
                      type="button"
                      disabled={isGenerating}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-md transition-all duration-300 cursor-pointer ${
                        isGenerating
                          ? "bg-purple-400 text-white opacity-50 animate-pulse cursor-wait"
                          : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
                      }`}
                    >
                      {isGenerating ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="size-3.5 text-amber-300 animate-bounce" />
                      )}
                      <span>{isGenerating ? "AI Enhancing..." : "AI Enhance"}</span>
                    </button>
                  </div>
                  <textarea
                    value={experience.description || ""}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    rows={4}
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white leading-relaxed resize-none"
                    placeholder="Describe key responsibilities, projects led, technologies used, and metrics achieved..."
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
