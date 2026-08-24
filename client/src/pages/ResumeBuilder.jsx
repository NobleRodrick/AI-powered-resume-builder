import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Award,
  Briefcase,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileSignature,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import AcademicCVForm from "../components/AcademicCVForm";
import RecommendationLetterForm from "../components/RecommendationLetterForm";
import OfficialDocumentForm from "../components/OfficialDocumentForm";
import OfficialOptionalForm from "../components/OfficialOptionalForm";
import api from "../configs/api.js";

const initialResumeData = {
  _id: "",
  title: "",
  personal_info: {},
  professional_summary: "",
  experience: [],
  education: [],
  project: [],
  skills: [],
  publications: [],
  research_experience: [],
  grants_and_awards: [],
  teaching_experience: [],
  languages: [],
  references: [],
  certifications: [],
  custom_sections: [],
  interests: [],
  social_links: {},
  document_type: "resume",
  letterhead: {},
  signature_url: "",
  document_body: "",
  template: "neura-modern",
  accent_color: "#3B82F6",
  public: false,
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const loadExistingResume = useCallback(async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
        setActiveSectionIndex(0); // Reset to first tab of context-isolated section
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [resumeId, token]);

  // Context-Isolated Sections per Document Type
  const getSectionsForDocType = (type = "resume") => {
    if (type === "recommendation_letter") {
      return [
        { id: "recommendation", name: "Recommendation Letter", icon: FileSignature },
        { id: "personal", name: "Recommender Profile", icon: User },
      ];
    }
    if (type === "statement_of_purpose" || type === "cover_letter" || type === "transcript_summary") {
      return [
        { id: "official_doc", name: "SOP & Letter Content", icon: Building2 },
        { id: "personal", name: "Applicant Info", icon: User },
      ];
    }
    if (type === "cv" || type === "academic_cv") {
      return [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary & Bio", icon: FileText },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "academic_cv", name: "Academic CV & Research", icon: BookOpen },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "projects", name: "Publications & Projects", icon: FolderIcon },
        { id: "optional", name: "Certifications & Extras", icon: Award },
      ];
    }

    // Default: Resume
    return [
      { id: "personal", name: "Personal Info", icon: User },
      { id: "summary", name: "Summary", icon: FileText },
      { id: "experience", name: "Experience", icon: Briefcase },
      { id: "education", name: "Education", icon: GraduationCap },
      { id: "projects", name: "Projects", icon: FolderIcon },
      { id: "skills", name: "Skills", icon: Sparkles },
      { id: "optional", name: "Certifications & Extras", icon: Award },
    ];
  };

  const sections = getSectionsForDocType(resumeData.document_type);
  const activeSection = sections[activeSectionIndex] || sections[0];

  useEffect(() => {
    loadExistingResume();
  }, [loadExistingResume]);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));
      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData((prev) => ({ ...prev, public: !prev.public }));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume / Document" });
    } else {
      navigator.clipboard?.writeText(resumeUrl);
      toast.success("Public link copied");
    }
  };

  const saveResume = async () => {
    try {
      const updatedResumeData = structuredClone(resumeData);
      
      // Clean File objects from JSON payload before sending FormData
      if (typeof resumeData.personal_info?.image === "object") {
        delete updatedResumeData.personal_info.image;
      }
      if (typeof resumeData.letterhead?.logo_url === "object") {
        delete updatedResumeData.letterhead.logo_url;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      if (removeBackground) formData.append("removeBackground", "yes");

      if (typeof resumeData.personal_info?.image === "object") {
        formData.append("image", resumeData.personal_info.image);
      }
      if (typeof resumeData.letterhead?.logo_url === "object") {
        formData.append("logo", resumeData.letterhead.logo_url);
      }

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Document Badge Info
  const getDocBadge = (type) => {
    switch (type) {
      case "recommendation_letter":
        return { label: "Recommendation Letter Studio", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
      case "statement_of_purpose":
      case "cover_letter":
      case "transcript_summary":
        return { label: "SOP & Cover Letter Studio", color: "bg-amber-100 text-amber-800 border-amber-200" };
      case "cv":
        return { label: "Academic CV Studio", color: "bg-purple-100 text-purple-800 border-purple-200" };
      default:
        return { label: "Executive Resume Builder Mode", color: "bg-blue-100 text-blue-800 border-blue-200" };
    }
  };

  const docBadge = getDocBadge(resumeData.document_type);

  return (
    <div className="print:m-0 print:p-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between print:hidden">
        <Link to="/app" className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all text-xs font-semibold">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>

        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${docBadge.color}`}>
          {docBadge.label}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 print:max-w-none print:mx-0 print:px-0 print:pb-0">
        <div className="grid lg:grid-cols-12 gap-8 print:block print:gap-0">
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden print:hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-2">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-600 border-none transition-all duration-300"
                style={{ width: `${((activeSectionIndex + 1) * 100) / (sections.length)}%` }}
              />
              
              {/* Context Isolated Navigation Tabs */}
              <div className="flex overflow-x-auto gap-1 py-3 border-b border-gray-200 no-scrollbar">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSectionIndex(index)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${activeSectionIndex === index ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      <Icon className="size-3.5" /> {section.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center my-4 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <TemplateSelector selectedTemplate={resumeData.template} documentType={resumeData.document_type} onChange={(template) => setResumeData((prev) => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(accent_color) => setResumeData((prev) => ({ ...prev, accent_color }))} />
                </div>
                <div className="flex items-center gap-1">
                  {activeSectionIndex !== 0 && (
                    <button type="button" onClick={() => setActiveSectionIndex((index) => Math.max(index - 1, 0))} className="flex items-center gap-1 p-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all">
                      <ChevronLeft className="size-4" /> Prev
                    </button>
                  )}
                  {activeSectionIndex < sections.length - 1 && (
                    <button type="button" onClick={() => setActiveSectionIndex((index) => Math.min(index + 1, sections.length - 1))} className="flex items-center gap-1 p-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all">
                      Next <ChevronRight className="size-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6 min-h-[420px]">
                {activeSection.id === "personal" && <PersonalInfoForm data={resumeData.personal_info} onChange={(personal_info) => setResumeData((prev) => ({ ...prev, personal_info }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                {activeSection.id === "summary" && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(professional_summary) => setResumeData((prev) => ({ ...prev, professional_summary }))} setResumeData={setResumeData} />}
                {activeSection.id === "experience" && <ExperienceForm data={resumeData.experience} onChange={(experience) => setResumeData((prev) => ({ ...prev, experience }))} />}
                {activeSection.id === "education" && <EducationForm data={resumeData.education} onChange={(education) => setResumeData((prev) => ({ ...prev, education }))} />}
                {activeSection.id === "projects" && <ProjectForm data={resumeData.project} onChange={(project) => setResumeData((prev) => ({ ...prev, project }))} />}
                {activeSection.id === "skills" && <SkillsForm data={resumeData.skills} onChange={(skills) => setResumeData((prev) => ({ ...prev, skills }))} />}
                {activeSection.id === "optional" && <OfficialOptionalForm data={resumeData} onChange={setResumeData} />}
                {activeSection.id === "academic_cv" && <AcademicCVForm data={resumeData} onChange={setResumeData} />}
                {activeSection.id === "recommendation" && <RecommendationLetterForm data={resumeData} onChange={setResumeData} />}
                {activeSection.id === "official_doc" && <OfficialDocumentForm data={resumeData} onChange={setResumeData} />}
              </div>

              <button type="button" onClick={() => toast.promise(saveResume(), { loading: "Saving document..." })} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md hover:shadow-lg transition-all rounded-xl px-6 py-3 mt-6 text-xs uppercase tracking-wider">
                Save All Document Changes
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 max-lg:mt-6 print:max-lg:mt-0">
            <div className="relative w-full print:static">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 print:hidden">
                {resumeData.public && <button type="button" onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"><Share2Icon className="size-4" /> Share</button>}
                <button type="button" onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors">
                  {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button type="button" onClick={() => window.print()} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"><DownloadIcon className="size-4" /> Download</button>
              </div>
              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
