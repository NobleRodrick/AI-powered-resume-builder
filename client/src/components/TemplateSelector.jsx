import { Check, Layout, Search, Sparkles, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const TemplateSelector = ({ selectedTemplate, documentType = "resume", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dropdownRef = useRef(null);

  const templates = [
    {
      id: "neura-modern",
      name: "Neura Modern Specialist",
      category: "executive",
      tag: "Popular",
      docTypes: ["resume", "cv"],
      preview: "2-column sidebar design with visual skill pills, language levels, and social profile links",
    },
    {
      id: "neura-executive",
      name: "Neura Executive Leader",
      category: "executive",
      tag: "Executive",
      docTypes: ["resume", "cv"],
      preview: "High-impact dark executive banner with strategic competencies grid and leadership summary",
    },
    {
      id: "modern",
      name: "Modern Executive",
      category: "executive",
      tag: "Sleek",
      docTypes: ["resume", "cv"],
      preview: "Sleek design with strategic accent colors and bold modern font choices",
    },
    {
      id: "classic",
      name: "Classic Standard",
      category: "academic",
      tag: "Standard",
      docTypes: ["resume", "cv"],
      preview: "Traditional resume format with clear section dividers and standard layout",
    },
    {
      id: "harvard",
      name: "Harvard Ivy League",
      category: "academic",
      tag: "Top Rated",
      docTypes: ["resume", "cv"],
      preview: "Timeless serif design preferred by top law, finance, and corporate executive recruiters",
    },
    {
      id: "academic-cv",
      name: "Academic CV (Multi-Page)",
      category: "academic",
      tag: "Multi-Page",
      docTypes: ["cv", "academic_cv"],
      preview: "Comprehensive layout for research publications, grants, teaching, and academic references",
    },
    {
      id: "ats-clean",
      name: "100% ATS Clean",
      category: "academic",
      tag: "100% ATS",
      docTypes: ["resume", "cv"],
      preview: "Monochrome Applicant Tracking System compliant layout guaranteed to parse 100%",
    },
    {
      id: "official-letterhead",
      name: "Official Institutional Letterhead",
      category: "official",
      tag: "Official Letter / SOP",
      docTypes: ["recommendation_letter", "statement_of_purpose", "cover_letter", "transcript_summary"],
      preview: "Formal document layout for Recommendation Letters, SOPs, Cover Letters, and Transcripts",
    },
    {
      id: "minimal-image",
      name: "Minimalist Photo",
      category: "minimal",
      tag: "With Photo",
      docTypes: ["resume", "cv"],
      preview: "Clean, elegant layout with profile photo accent",
    },
    {
      id: "minimal",
      name: "Minimalist Clean",
      category: "minimal",
      tag: "Clean",
      docTypes: ["resume", "cv", "recommendation_letter", "statement_of_purpose", "cover_letter"],
      preview: "Ultra-clean design that puts your core achievements front and center",
    },
  ];

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "executive", name: "Executive & Modern" },
    { id: "academic", name: "Academic & ATS" },
    { id: "official", name: "Letters & SOPs" },
    { id: "minimal", name: "Minimalist" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter templates strictly by current document type first, then category and search query
  const categoryTemplates = templates.filter((t) => {
    // If it's a letter type, prioritize official and minimal templates
    if (["recommendation_letter", "statement_of_purpose", "cover_letter", "transcript_summary"].includes(documentType)) {
      return t.docTypes.includes(documentType) || t.category === "official";
    }
    // If it's CV, prioritize academic and executive templates
    if (documentType === "cv" || documentType === "academic_cv") {
      return t.docTypes.includes("cv") || t.docTypes.includes("academic_cv") || t.category === "academic";
    }
    // Default resume mode
    return true;
  });

  const filteredTemplates = categoryTemplates.filter((t) => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 shadow-sm hover:shadow transition-all px-3 py-2 rounded-lg cursor-pointer"
      >
        <Layout size={15} className="text-emerald-600" />
        <span className="max-sm:hidden truncate max-w-[130px]">{activeTemplate.name}</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
          Change
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[340px] sm:w-[420px] bg-white rounded-xl border border-slate-200 shadow-2xl z-50 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-800">Select Template Design</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-1 pb-1 text-xs no-scrollbar border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all text-[11px] ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white font-semibold shadow-sm"
                    : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Scrollable Templates Container */}
          <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No templates found matching "{searchQuery}".
              </div>
            ) : (
              filteredTemplates.map((template) => {
                const isSelected = selectedTemplate === template.id;
                return (
                  <div
                    key={template.id}
                    onClick={() => {
                      onChange(template.id);
                      setIsOpen(false);
                    }}
                    className={`relative p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-800">{template.name}</h4>
                          <span
                            className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                              isSelected
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {template.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {template.preview}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="shrink-0 size-5 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-sm mt-0.5">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
