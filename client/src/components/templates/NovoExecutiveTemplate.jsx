import React from "react";
const NovoExecutiveTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!month) return dateStr;
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const certifications = data.certifications || [];
  const customSections = data.custom_sections || [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-sans shadow-md p-10 leading-relaxed">
      {/* Executive Banner Header */}
      <header className="bg-slate-900 text-white p-8 rounded-xl mb-8 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            {data.personal_info?.full_name || "EXECUTIVE NAME"}
          </h1>
          <p className="text-sm text-blue-300 font-semibold tracking-wide uppercase">
            {data.personal_info?.profession || "CHIEF EXECUTIVE / SENIOR DIRECTOR"}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-300 mt-4">
            {data.personal_info?.email && <span>{data.personal_info.email}</span>}
            {data.personal_info?.phone && <span>• {data.personal_info.phone}</span>}
            {data.personal_info?.location && <span>• {data.personal_info.location}</span>}
            {data.personal_info?.linkedin && <span>• {data.personal_info.linkedin}</span>}
          </div>
        </div>

        {data.personal_info?.image && (
          <img
            src={data.personal_info.image}
            alt="Executive Headshot"
            className="w-24 h-24 rounded-lg object-cover border-2 border-white/30 shrink-0"
          />
        )}
      </header>

      {/* Executive Summary & Core Strengths */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2 border-slate-900 mb-2">
            Executive Summary & Vision
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed text-justify">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Key Skills & Executive Competencies */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2 border-slate-900 mb-3">
            Core Leadership & Strategic Competencies
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="p-2 border border-slate-200 rounded-md bg-slate-50 text-xs font-semibold text-slate-800 text-center">
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Executive Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2 border-slate-900 mb-4">
            Executive Leadership & Experience
          </h2>

          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>{exp.position}</span>
                  <span className="text-xs text-gray-500 font-normal">
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <div className="text-blue-800 font-semibold mb-1 text-xs">{exp.company}</div>
                {exp.description && (
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-justify pl-3 border-l-2 border-slate-900">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Credentials */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2 border-slate-900 mb-3">
              Education & Degrees
            </h2>

            <div className="space-y-3 text-xs">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="font-bold text-slate-900">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                  <div className="text-gray-700">{edu.institution}</div>
                  <div className="text-gray-500 text-[11px]">
                    {formatDate(edu.start_date)} - {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                  </div>
                  {edu.honors && <div className="text-green-700 font-medium">Honors: {edu.honors}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2 border-slate-900 mb-3">
              Board Roles & Certifications
            </h2>

            <div className="space-y-2 text-xs">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded-md bg-slate-50">
                  <div className="font-bold text-slate-900">{cert.name}</div>
                  <div className="text-gray-600 text-[11px]">{cert.issuer} {cert.date && `(${cert.date})`}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Custom Sections */}
      {customSections.map((sec, idx) => (
        <section key={idx} className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 pb-1 border-b-2 border-slate-900 mb-3">
            {sec.title}
          </h2>
          <div className="space-y-2 text-xs">
            {sec.items?.map((item, i) => (
              <div key={i}>
                <div className="font-bold text-slate-900">{item.heading} {item.date && `(${item.date})`}</div>
                {item.subheading && <div className="text-gray-700 italic">{item.subheading}</div>}
                {item.description && <div className="text-gray-700">{item.description}</div>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default NovoExecutiveTemplate;
