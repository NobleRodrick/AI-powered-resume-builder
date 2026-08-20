import { FolderIcon, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";

const ProjectForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateProjectDesc = async (index) => {
    setGeneratingIndex(index);
    const proj = data[index] || {};
    const name = proj.name || "Project";
    const type = proj.type || "Application";
    const desc = proj.description || "Created full stack features and resolved challenges.";

    const prompt = `Write an impressive, technical 2-sentence project summary for "${name}" (${type}). Current draft details: "${desc}". Highlight technologies, system architecture, and user impact.`;

    try {
      const { data: resData } = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      if (resData.enhancedContent) {
        updateProject(index, "description", resData.enhancedContent);
        toast.success("Project description enhanced with AI!");
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
            <FolderIcon className="size-5 text-indigo-600" /> Key Projects
          </h3>
          <p className="text-sm text-gray-500">Showcase technical and personal projects</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-medium text-slate-700">No projects added yet.</p>
          <p className="text-xs text-slate-500 mt-1">Click "Add Project" to detail your work.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((project, index) => {
            const isGenerating = generatingIndex === index;
            return (
              <div key={index} className="p-5 border border-slate-200 rounded-xl space-y-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm">Project #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
                    <input
                      value={project.name || ""}
                      onChange={(e) => updateProject(index, "name", e.target.value)}
                      type="text"
                      placeholder="e.g. AI Task Tracker"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Type / Tech Stack</label>
                    <input
                      value={project.type || ""}
                      onChange={(e) => updateProject(index, "type", e.target.value)}
                      type="text"
                      placeholder="e.g. Full Stack Web Application (React, Node, MongoDB)"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-800">Project Description</label>
                    
                    {/* Vibrant Glowing AI Enhance Button */}
                    <button
                      onClick={() => generateProjectDesc(index)}
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
                    rows={4}
                    value={project.description || ""}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    placeholder="Describe key features, architecture, and personal contributions..."
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white leading-relaxed resize-none"
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

export default ProjectForm;
