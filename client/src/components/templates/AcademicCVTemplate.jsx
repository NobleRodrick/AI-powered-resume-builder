import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, BookOpen, Award, FlaskConical, Languages as LangIcon, UserCheck, GraduationCap } from "lucide-react";

const AcademicCVTemplate = ({ data, accentColor = "#0f766e" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!month) return dateStr;
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const publications = data.publications || [];
  const research = data.research_experience || [];
  const grants = data.grants_and_awards || [];
  const teaching = data.teaching_experience || [];
  const languages = data.languages || [];
  const references = data.references || [];

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-900 leading-relaxed font-sans shadow-sm">
      {/* Header */}
      <header className="mb-8 pb-4 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold tracking-tight mb-1" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "DR. CANDIDATE NAME"}
        </h1>
        <p className="text-base font-semibold text-gray-700 mb-3">
          {data.personal_info?.profession || "Academic Researcher & Scholar"}
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-3.5" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-3.5" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-3.5" />
              <span>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-200 pb-1" style={{ color: accentColor }}>
            Research Statement & Profile
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">{data.professional_summary}</p>
        </section>
      )}

      {/* Education & Qualifications */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1" style={{ color: accentColor }}>
            Education & Degrees
          </h2>

          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                  <span>
                    {edu.start_date ? `${formatDate(edu.start_date)} - ` : ""}
                    {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                  </span>
                </div>
                <div className="text-gray-700 font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</div>
                {edu.honors && <p className="text-gray-600 italic mt-0.5">Distinctions: {edu.honors}</p>}
                {edu.thesis_title && <p className="text-gray-700 mt-0.5"><span className="font-semibold">Dissertation/Thesis:</span> "{edu.thesis_title}"</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
            <BookOpen className="size-4" /> Peer-Reviewed Publications
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-xs text-gray-800">
            {publications.map((pub, idx) => (
              <li key={idx} className="pl-1">
                <span className="font-semibold">{pub.authors ? `${pub.authors}. ` : ""}</span>
                <span>"{pub.title}." </span>
                <span className="italic">{pub.journal}</span>
                {pub.year && <span> ({pub.year})</span>}
                {pub.doi && <span className="text-gray-500 font-mono text-[10px]"> [DOI: {pub.doi}]</span>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Research Experience */}
      {research.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
            <FlaskConical className="size-4" /> Research Experience & Appointments
          </h2>

          <div className="space-y-3">
            {research.map((resItem, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{resItem.role}</span>
                  <span>{formatDate(resItem.start_date)} - {resItem.is_current ? "Present" : formatDate(resItem.end_date)}</span>
                </div>
                <div className="text-gray-700 italic">{resItem.institution} {resItem.advisor && `(Advisor: ${resItem.advisor})`}</div>
                {resItem.description && <p className="text-gray-600 mt-1">{resItem.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grants & Awards */}
      {grants.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
            <Award className="size-4" /> Honors, Grants & Fellowships
          </h2>

          <div className="space-y-2 text-xs">
            {grants.map((grant, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-gray-900">{grant.title}</span>
                  {grant.issuer && <span className="text-gray-700"> — {grant.issuer}</span>}
                  {grant.amount && <span className="text-green-700 font-semibold"> ({grant.amount})</span>}
                </div>
                <span className="text-gray-600">{grant.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Teaching Experience */}
      {teaching.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
            <GraduationCap className="size-4" /> Teaching & Course Instruction
          </h2>

          <div className="space-y-3">
            {teaching.map((tItem, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{tItem.course_name} ({tItem.role})</span>
                  <span>{tItem.start_date} {tItem.end_date && `- ${tItem.end_date}`}</span>
                </div>
                {tItem.institution && <div className="text-gray-700 italic">{tItem.institution}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1" style={{ color: accentColor }}>
            Professional & Academic Work
          </h2>

          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{exp.position} — {exp.company}</span>
                  <span>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                </div>
                {exp.description && <p className="text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Skills */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-gray-200 pb-1" style={{ color: accentColor }}>
              Languages
            </h2>
            <ul className="text-xs text-gray-700 space-y-1">
              {languages.map((l, i) => (
                <li key={i}><span className="font-semibold">{l.language}:</span> {l.proficiency}</li>
              ))}
            </ul>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-gray-200 pb-1" style={{ color: accentColor }}>
              Technical & Methodological Skills
            </h2>
            <p className="text-xs text-gray-700">{data.skills.join(", ")}</p>
          </div>
        )}
      </div>

      {/* References */}
      {references.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 flex items-center gap-1.5" style={{ color: accentColor }}>
            <UserCheck className="size-4" /> Academic References
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {references.map((refItem, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="font-bold text-gray-900">{refItem.name}</div>
                <div className="text-gray-700">{refItem.title}</div>
                <div className="text-gray-600">{refItem.organization}</div>
                {refItem.email && <div className="text-gray-500 font-mono text-[11px] mt-1">{refItem.email}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AcademicCVTemplate;
