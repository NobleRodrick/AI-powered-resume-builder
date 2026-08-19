import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "novo-modern",
      name: "NovoResume Modern Specialist",
      preview: "2-column sidebar design with visual skill pills, language levels, and social profile links",
    },
    {
      id: "novo-executive",
      name: "NovoResume Executive Leader",
      preview: "High-impact dark executive banner with strategic competencies grid and leadership summary",
    },
    {
      id: "classic",
      name: "Classic Standard",
      preview: "Traditional resume format with clear section dividers and standard layout",
    },
    {
      id: "harvard",
      name: "Harvard Ivy League",
      preview: "Timeless serif design preferred by top law, finance, and corporate executive recruiters",
    },
    {
      id: "academic-cv",
      name: "Academic CV (Multi-Page)",
      preview: "Comprehensive layout for research publications, grants, teaching, and academic references",
    },
    {
      id: "ats-clean",
      name: "100% ATS Clean",
      preview: "Monochrome Applicant Tracking System compliant layout guaranteed to parse 100%",
    },
    {
      id: "official-letterhead",
      name: "Official Institutional Letterhead",
      preview: "Formal document layout for Recommendation Letters, SOPs, Cover Letters, and Transcripts",
    },
    {
      id: "modern",
      name: "Modern Executive",
      preview: "Sleek design with strategic accent colors and bold modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimalist Photo",
      preview: "Clean, elegant layout with profile photo accent",
    },
    {
      id: "minimal",
      name: "Minimalist Clean",
      preview: "Ultra-clean design that puts your core achievements front and center",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">{template.preview}</div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
