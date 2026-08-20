import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  FilePenLineIcon,
  FileSignature,
  FileText,
  FolderIcon,
  GraduationCap,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  Search,
  Sparkles,
  TrashIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  
  // Document creation form state
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("resume");
  const [docTemplate, setDocTemplate] = useState("neura-modern");

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadAllResumes = useCallback(async () => {
    try {
      const { data } = await api.get("/api/resumes/get", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [token]);

  const handleOpenCreate = (type = "resume", template = "neura-modern", defaultTitle = "") => {
    setDocType(type);
    setDocTemplate(template);
    setDocTitle(defaultTitle);
    setShowCreateModal(true);
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        {
          title: docTitle,
          document_type: docType,
          template: docTemplate,
        },
        { headers: { Authorization: token } }
      );
      toast.success(data.message);
      setShowCreateModal(false);
      setDocTitle("");
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please select a resume file");
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title: docTitle || "Uploaded Resume", resumeText },
        {
          headers: { Authorization: token },
        }
      );
      setDocTitle("");
      setResume(null);
      setShowUploadResume(false);
      toast.success("Resume imported successfully!");
      const targetId = data.resumeId || data.resume?._id;
      if (targetId) {
        navigate(`/app/builder/${targetId}`);
      } else {
        loadAllResumes();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title: docTitle } },
        { headers: { Authorization: token } }
      );
      setAllResumes(
        allResumes.map((r) => (r._id === editResumeId ? { ...r, title: docTitle } : r))
      );
      setDocTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this document?");
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((r) => r._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, [loadAllResumes]);

  // Document Types Config
  const actionCards = [
    {
      id: "resume",
      title: "Professional Resume",
      subtitle: "2-column & single-column executive templates",
      icon: Briefcase,
      gradient: "from-blue-600 to-indigo-600",
      bgHover: "hover:border-blue-500 hover:shadow-blue-100",
      badge: "Most Popular",
      template: "neura-modern",
      docType: "resume",
    },
    {
      id: "recommendation",
      title: "Recommendation Letter",
      subtitle: "Official institutional letterhead & signatures",
      icon: FileSignature,
      gradient: "from-emerald-600 to-teal-600",
      bgHover: "hover:border-emerald-500 hover:shadow-emerald-100",
      badge: "Official",
      template: "official-letterhead",
      docType: "recommendation_letter",
    },
    {
      id: "academic",
      title: "Academic CV",
      subtitle: "Multi-page for research, grants & publications",
      icon: GraduationCap,
      gradient: "from-purple-600 to-violet-600",
      bgHover: "hover:border-purple-500 hover:shadow-purple-100",
      badge: "Multi-Page",
      template: "academic-cv",
      docType: "cv",
    },
    {
      id: "official",
      title: "Official SOP & Cover Letter",
      subtitle: "Formal Statements of Purpose & Transcripts",
      icon: Building2,
      gradient: "from-amber-600 to-orange-600",
      bgHover: "hover:border-amber-500 hover:shadow-amber-100",
      badge: "Institutional",
      template: "official-letterhead",
      docType: "statement_of_purpose",
    },
    {
      id: "upload",
      title: "Import Existing PDF",
      subtitle: "AI converts existing PDF resume automatically",
      icon: UploadCloud,
      gradient: "from-slate-700 to-slate-900",
      bgHover: "hover:border-slate-500 hover:shadow-slate-100",
      badge: "AI Import",
      isUpload: true,
    },
  ];

  // Helper for document visual styling
  const getDocStyle = (type = "resume") => {
    switch (type) {
      case "recommendation_letter":
        return { label: "Recommendation Letter", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: FileSignature };
      case "cv":
      case "academic_cv":
        return { label: "Academic CV", color: "bg-purple-100 text-purple-800 border-purple-200", icon: GraduationCap };
      case "statement_of_purpose":
      case "cover_letter":
      case "official_doc":
        return { label: "Official SOP / Letter", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Building2 };
      default:
        return { label: "Resume / CV", color: "bg-blue-100 text-blue-800 border-blue-200", icon: FileText };
    }
  };

  // Filter documents
  const filteredResumes = allResumes.filter((doc) => {
    const matchesSearch = doc.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const type = doc.document_type || "resume";
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "resume") return matchesSearch && type === "resume";
    if (selectedFilter === "academic") return matchesSearch && (type === "cv" || type === "academic_cv");
    if (selectedFilter === "recommendation") return matchesSearch && type === "recommendation_letter";
    if (selectedFilter === "official") return matchesSearch && (type === "statement_of_purpose" || type === "cover_letter");
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Executive Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-10 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="size-4" /> AI Executive Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "Professional"}
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Build, customize, and manage executive resumes, academic CVs, official recommendation letters, and SOPs.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur border border-white/10 rounded-xl p-3 px-5 text-xs text-slate-200">
            <div>
              <p className="text-slate-400 font-medium">Total Suite Documents</p>
              <p className="text-xl font-bold text-white mt-0.5">{allResumes.length}</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <p className="text-slate-400 font-medium">AI Intelligence</p>
              <p className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                <Check className="size-3.5" /> Ready
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Quick Action Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FolderIcon className="size-5 text-indigo-600" /> Executive Creation Suite
            </h2>
            <span className="text-xs text-slate-500 font-medium">Select document type to start</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {actionCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    if (card.isUpload) {
                      setShowUploadResume(true);
                    } else {
                      handleOpenCreate(card.docType, card.template);
                    }
                  }}
                  className={`relative group text-left bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer overflow-hidden ${card.bgHover}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors pt-2">
                    <PlusIcon className="size-3.5" /> Start Building
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Saved Documents Header with Search & Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="size-5 text-slate-700" /> Your Document Collection
            </h2>

            {/* Realtime Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  <XIcon className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-1 text-xs no-scrollbar">
            {[
              { id: "all", label: "All Documents", count: allResumes.length },
              { id: "resume", label: "Resumes", count: allResumes.filter((r) => (r.document_type || "resume") === "resume").length },
              { id: "recommendation", label: "Recommendation Letters", count: allResumes.filter((r) => r.document_type === "recommendation_letter").length },
              { id: "academic", label: "Academic CVs", count: allResumes.filter((r) => r.document_type === "cv").length },
              { id: "official", label: "Official Docs & SOPs", count: allResumes.filter((r) => r.document_type === "statement_of_purpose" || r.document_type === "cover_letter").length },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? "bg-slate-900 text-white font-semibold shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {filter.label}
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedFilter === filter.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Documents Grid */}
          {filteredResumes.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-4">
              <div className="size-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <FileText className="size-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">No documents found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {searchQuery
                    ? `No document matching "${searchQuery}"`
                    : "Create a resume, recommendation letter, or academic CV using the suite above."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenCreate("resume")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow transition-all"
              >
                <PlusIcon className="size-4" /> Create New Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredResumes.map((doc) => {
                const style = getDocStyle(doc.document_type);
                const DocIcon = style.icon;
                return (
                  <div
                    key={doc._id}
                    onClick={() => navigate(`/app/builder/${doc._id}`)}
                    className="relative group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 cursor-pointer flex flex-col justify-between h-52 overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${style.color}`}>
                          <DocIcon className="size-3" /> {style.label}
                        </span>

                        {/* Quick Edit/Delete Icons */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur rounded-lg p-1 border border-slate-200 shadow-sm"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setEditResumeId(doc._id);
                              setDocTitle(doc.title);
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                            title="Edit Title"
                          >
                            <PencilIcon className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteResume(doc._id)}
                            className="p-1 hover:bg-red-50 rounded text-red-600 transition-colors"
                            title="Delete Document"
                          >
                            <TrashIcon className="size-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 capitalize">
                        Template: <span className="text-slate-600 font-medium">{doc.template || "Standard"}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Updated {new Date(doc.updatedAt).toLocaleDateString()}</span>
                      <span className="font-semibold text-indigo-600 group-hover:underline flex items-center gap-1">
                        Open <FilePenLineIcon className="size-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal: Create Document */}
        {showCreateModal && (
          <form
            onSubmit={handleCreateDocument}
            onClick={() => setShowCreateModal(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Create New Document</h3>
                    <p className="text-xs text-slate-500">Configure title and type</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer Resume"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Document Category
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setDocType(selected);
                      if (selected === "recommendation_letter" || selected === "statement_of_purpose") {
                        setDocTemplate("official-letterhead");
                      } else if (selected === "cv") {
                        setDocTemplate("academic-cv");
                      } else {
                        setDocTemplate("neura-modern");
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  >
                    <option value="resume">Professional Resume (Single/2-Column)</option>
                    <option value="recommendation_letter">Recommendation Letter (Official Letterhead)</option>
                    <option value="cv">Academic CV (Multi-Page Research)</option>
                    <option value="statement_of_purpose">Statement of Purpose / Cover Letter</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Initial Template Preset
                  </label>
                  <select
                    value={docTemplate}
                    onChange={(e) => setDocTemplate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  >
                    <option value="neura-modern">Neura Modern Specialist</option>
                    <option value="neura-executive">Neura Executive Leader</option>
                    <option value="harvard">Harvard Ivy League Serif</option>
                    <option value="ats-clean">100% ATS Clean Monochrome</option>
                    <option value="official-letterhead">Official Institutional Letterhead</option>
                    <option value="academic-cv">Academic CV Multi-Page</option>
                    <option value="minimal-image">Minimalist Photo</option>
                    <option value="minimal">Minimalist Clean</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/2 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : "Create & Launch"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Modal: Upload PDF Resume */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <UploadCloud className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Import PDF Resume</h3>
                    <p className="text-xs text-slate-500">Convert existing resume file automatically</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUploadResume(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter document title"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="resume-file-input" className="block font-semibold text-slate-700 mb-1">
                    Select PDF File
                  </label>
                  <label
                    htmlFor="resume-file-input"
                    className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-purple-500 bg-slate-50 hover:bg-purple-50/40 rounded-xl p-6 text-center cursor-pointer transition-all"
                  >
                    {resume ? (
                      <div className="flex items-center gap-2 text-purple-700 font-medium">
                        <FileText className="size-5" /> {resume.name}
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="size-10 text-slate-400" />
                        <span className="text-xs text-slate-600 font-medium">Click to select PDF document</span>
                        <span className="text-[10px] text-slate-400">PDF up to 10MB</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="resume-file-input"
                    accept=".pdf"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadResume(false)}
                  className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/2 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : "Import Resume"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Modal: Edit Title */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-sm p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Rename Document
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Title
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditResumeId("")}
                  className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
