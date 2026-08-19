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
  template: "novo-modern",
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
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [resumeId, token]);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "optional", name: "Certifications & Extras", icon: Award },
    { id: "academic_cv", name: "Academic CV", icon: BookOpen },
    { id: "recommendation", name: "Recommendation Letter", icon: FileSignature },
    { id: "official_doc", name: "Official Docs / SOP", icon: Building2 },
  ];

  const activeSection = sections[activeSectionIndex];

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
      if (typeof resumeData.personal_info?.image === "object") {
        delete updatedResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      if (removeBackground) formData.append("removeBackground", "yes");
      if (typeof resumeData.personal_info?.image === "object") {
        formData.append("image", resumeData.personal_info.image);
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

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/app" className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all text-sm font-medium">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-2">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 border-none transition-all duration-300"
                style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }}
              />
              <div className="flex overflow-x-auto gap-1 py-3 border-b border-gray-200 no-scrollbar">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSectionIndex(index)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${activeSectionIndex === index ? "bg-green-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                      <Icon className="size-3.5" /> {section.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center my-4 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData((prev) => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(accent_color) => setResumeData((prev) => ({ ...prev, accent_color }))} />
                </div>
                <div className="flex items-center gap-1">
                  {activeSectionIndex !== 0 && (
                    <button type="button" onClick={() => setActiveSectionIndex((index) => Math.max(index - 1, 0))} className="flex items-center gap-1 p-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all">
                      <ChevronLeft className="size-4" /> Prev
                    </button>
                  )}
                  <button type="button" onClick={() => setActiveSectionIndex((index) => Math.min(index + 1, sections.length - 1))} className="flex items-center gap-1 p-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all" disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className="size-4" />
                  </button>
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

              <button type="button" onClick={() => toast.promise(saveResume(), { loading: "Saving..." })} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-sm transition-all rounded-lg px-6 py-2.5 mt-6 text-sm">
                Save All Changes
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
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
