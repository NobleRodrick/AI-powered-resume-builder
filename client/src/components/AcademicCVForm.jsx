import React, { useState } from "react";
import { BookOpen, Plus, Trash2, Award, FlaskConical, Languages, UserCheck, GraduationCap } from "lucide-react";

const AcademicCVForm = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState("publications");

  const publications = data.publications || [];
  const research = data.research_experience || [];
  const grants = data.grants_and_awards || [];
  const teaching = data.teaching_experience || [];
  const languages = data.languages || [];
  const references = data.references || [];

  const updateSection = (sectionKey, newList) => {
    onChange({
      ...data,
      [sectionKey]: newList,
    });
  };

  // Handlers for Publications
  const addPublication = () => {
    updateSection("publications", [
      ...publications,
      { title: "", journal: "", year: "", doi: "", authors: "", link: "" },
    ]);
  };

  const updatePublication = (index, field, val) => {
    const list = [...publications];
    list[index] = { ...list[index], [field]: val };
    updateSection("publications", list);
  };

  const removePublication = (index) => {
    updateSection("publications", publications.filter((_, i) => i !== index));
  };

  // Handlers for Research
  const addResearch = () => {
    updateSection("research_experience", [
      ...research,
      { institution: "", role: "", advisor: "", start_date: "", end_date: "", is_current: false, description: "" },
    ]);
  };

  const updateResearch = (index, field, val) => {
    const list = [...research];
    list[index] = { ...list[index], [field]: val };
    updateSection("research_experience", list);
  };

  const removeResearch = (index) => {
    updateSection("research_experience", research.filter((_, i) => i !== index));
  };

  // Handlers for Grants & Awards
  const addGrant = () => {
    updateSection("grants_and_awards", [
      ...grants,
      { title: "", issuer: "", amount: "", year: "", description: "" },
    ]);
  };

  const updateGrant = (index, field, val) => {
    const list = [...grants];
    list[index] = { ...list[index], [field]: val };
    updateSection("grants_and_awards", list);
  };

  const removeGrant = (index) => {
    updateSection("grants_and_awards", grants.filter((_, i) => i !== index));
  };

  // Handlers for Teaching
  const addTeaching = () => {
    updateSection("teaching_experience", [
      ...teaching,
      { institution: "", course_name: "", role: "Teaching Assistant / Lecturer", start_date: "", end_date: "" },
    ]);
  };

  const updateTeaching = (index, field, val) => {
    const list = [...teaching];
    list[index] = { ...list[index], [field]: val };
    updateSection("teaching_experience", list);
  };

  const removeTeaching = (index) => {
    updateSection("teaching_experience", teaching.filter((_, i) => i !== index));
  };

  // Handlers for Languages
  const addLanguage = () => {
    updateSection("languages", [...languages, { language: "", proficiency: "Fluent" }]);
  };

  const updateLanguage = (index, field, val) => {
    const list = [...languages];
    list[index] = { ...list[index], [field]: val };
    updateSection("languages", list);
  };

  const removeLanguage = (index) => {
    updateSection("languages", languages.filter((_, i) => i !== index));
  };

  // Handlers for References
  const addReference = () => {
    updateSection("references", [
      ...references,
      { name: "", title: "", organization: "", email: "", phone: "", relationship: "" },
    ]);
  };

  const updateReference = (index, field, val) => {
    const list = [...references];
    list[index] = { ...list[index], [field]: val };
    updateSection("references", list);
  };

  const removeReference = (index) => {
    updateSection("references", references.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Academic & Executive CV Sections</h3>
        <p className="text-sm text-gray-500">
          Add publications, research experience, grants, teaching, and formal references for academic CVs
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("publications")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "publications" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <BookOpen className="size-3.5" /> Publications ({publications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("research")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "research" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FlaskConical className="size-3.5" /> Research ({research.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("grants")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "grants" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Award className="size-3.5" /> Grants & Awards ({grants.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("teaching")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "teaching" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <GraduationCap className="size-3.5" /> Teaching ({teaching.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("languages")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "languages" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Languages className="size-3.5" /> Languages ({languages.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("references")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "references" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <UserCheck className="size-3.5" /> References ({references.length})
        </button>
      </div>

      {/* Publications Tab */}
      {activeTab === "publications" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Journal Articles & Conference Papers</span>
            <button
              onClick={addPublication}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              <Plus className="size-3.5" /> Add Publication
            </button>
          </div>

          {publications.map((pub, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-700">Publication #{idx + 1}</span>
                <button onClick={() => removePublication(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Paper / Publication Title"
                value={pub.title || ""}
                onChange={(e) => updatePublication(idx, "title", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
              />

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Journal / Conference Name"
                  value={pub.journal || ""}
                  onChange={(e) => updatePublication(idx, "journal", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2024)"
                  value={pub.year || ""}
                  onChange={(e) => updatePublication(idx, "year", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Authors (e.g. A. Smith, J. Doe)"
                  value={pub.authors || ""}
                  onChange={(e) => updatePublication(idx, "authors", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="DOI or URL link"
                  value={pub.doi || pub.link || ""}
                  onChange={(e) => updatePublication(idx, "doi", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Research Tab */}
      {activeTab === "research" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Research & Laboratory Experience</span>
            <button
              onClick={addResearch}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              <Plus className="size-3.5" /> Add Research
            </button>
          </div>

          {research.map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-700">Research Entry #{idx + 1}</span>
                <button onClick={() => removeResearch(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Role / Title (e.g. Senior Researcher)"
                  value={item.role || ""}
                  onChange={(e) => updateResearch(idx, "role", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Institution / Lab Name"
                  value={item.institution || ""}
                  onChange={(e) => updateResearch(idx, "institution", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>

              <input
                type="text"
                placeholder="Principal Investigator / Advisor Name"
                value={item.advisor || ""}
                onChange={(e) => updateResearch(idx, "advisor", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
              />

              <textarea
                placeholder="Key research methodology, findings, and contributions..."
                rows={2}
                value={item.description || ""}
                onChange={(e) => updateResearch(idx, "description", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
              />
            </div>
          ))}
        </div>
      )}

      {/* Grants Tab */}
      {activeTab === "grants" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Grants, Fellowships & Honors</span>
            <button
              onClick={addGrant}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              <Plus className="size-3.5" /> Add Grant / Award
            </button>
          </div>

          {grants.map((grant, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-700">Award #{idx + 1}</span>
                <button onClick={() => removeGrant(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Award / Grant Title"
                  value={grant.title || ""}
                  onChange={(e) => updateGrant(idx, "title", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Granting Body / Organization"
                  value={grant.issuer || ""}
                  onChange={(e) => updateGrant(idx, "issuer", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Monetary Value (e.g. $50,000)"
                  value={grant.amount || ""}
                  onChange={(e) => updateGrant(idx, "amount", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Year Awarded"
                  value={grant.year || ""}
                  onChange={(e) => updateGrant(idx, "year", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Teaching Tab */}
      {activeTab === "teaching" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Teaching & Course Instruction</span>
            <button
              onClick={addTeaching}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              <Plus className="size-3.5" /> Add Teaching Entry
            </button>
          </div>

          {teaching.map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-700">Teaching Entry #{idx + 1}</span>
                <button onClick={() => removeTeaching(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Course Name / Code (e.g. CS101 Intro to CS)"
                  value={item.course_name || ""}
                  onChange={(e) => updateTeaching(idx, "course_name", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Lead Instructor, TA)"
                  value={item.role || ""}
                  onChange={(e) => updateTeaching(idx, "role", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Institution / Department"
                  value={item.institution || ""}
                  onChange={(e) => updateTeaching(idx, "institution", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white col-span-1 md:col-span-1"
                />
                <input
                  type="text"
                  placeholder="Start Date / Term (e.g. Fall 2023)"
                  value={item.start_date || ""}
                  onChange={(e) => updateTeaching(idx, "start_date", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="End Date / Term (e.g. Spring 2024)"
                  value={item.end_date || ""}
                  onChange={(e) => updateTeaching(idx, "end_date", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages Tab */}
      {activeTab === "languages" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Languages & Proficiency</span>
            <button
              onClick={addLanguage}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              <Plus className="size-3.5" /> Add Language
            </button>
          </div>

          {languages.map((lang, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
              <input
                type="text"
                placeholder="Language (e.g. English, French)"
                value={lang.language || ""}
                onChange={(e) => updateLanguage(idx, "language", e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
              />
              <select
                value={lang.proficiency || "Fluent"}
                onChange={(e) => updateLanguage(idx, "proficiency", e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
              >
                <option value="Native / Bilingual">Native / Bilingual</option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button onClick={() => removeLanguage(idx)} className="text-red-500 hover:text-red-700">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* References Tab */}
      {activeTab === "references" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Academic & Professional References</span>
            <button
              onClick={addReference}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
            >
              <Plus className="size-3.5" /> Add Reference
            </button>
          </div>

          {references.map((refItem, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-700">Referee #{idx + 1}</span>
                <button onClick={() => removeReference(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Referee Name (e.g. Dr. Robert Vance)"
                  value={refItem.name || ""}
                  onChange={(e) => updateReference(idx, "name", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Title / Designation"
                  value={refItem.title || ""}
                  onChange={(e) => updateReference(idx, "title", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Institution / Company"
                  value={refItem.organization || ""}
                  onChange={(e) => updateReference(idx, "organization", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={refItem.email || ""}
                  onChange={(e) => updateReference(idx, "email", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcademicCVForm;
