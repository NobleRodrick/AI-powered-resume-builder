import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const HarvardTemplate = ({ data, accentColor = "#1e3a8a" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!month) return dateStr;
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-900 font-serif leading-relaxed shadow-sm">
      {/* Harvard Header */}
      <header className="text-center mb-6 pb-4 border-b border-gray-400">
        <h1 className="text-3xl font-bold tracking-wide uppercase text-gray-900 mb-2">
          {data.personal_info?.full_name || "YOUR FULL NAME"}
        </h1>
        <p className="text-sm italic text-gray-700 mb-2">
          {data.personal_info?.profession || ""}
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-700">
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
          {data.personal_info?.email && (
            <>
              <span>•</span>
              <span>{data.personal_info.email}</span>
            </>
          )}
          {data.personal_info?.phone && (
            <>
              <span>•</span>
              <span>{data.personal_info.phone}</span>
            </>
          )}
          {data.personal_info?.linkedin && (
            <>
              <span>•</span>
              <span>{data.personal_info.linkedin}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-gray-400 mb-2"
            style={{ color: accentColor }}
          >
            Executive Summary
          </h2>
          <p className="text-xs text-gray-800 text-justify leading-normal">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Education & Academic Honors */}
      {data.education && data.education.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-gray-400 mb-3"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</span>
                  <span>
                    {edu.start_date ? `${formatDate(edu.start_date)} – ` : ""}
                    {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                  </span>
                </div>
                <div className="flex justify-between italic text-gray-800">
                  <span>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
                {edu.honors && (
                  <p className="text-gray-700 mt-0.5">
                    <span className="font-semibold">Honors:</span> {edu.honors}
                  </p>
                )}
                {edu.thesis_title && (
                  <p className="text-gray-700 mt-0.5 italic">
                    <span className="font-semibold not-italic">Thesis:</span> "{edu.thesis_title}"
                  </p>
                )}
                {edu.relevant_coursework && edu.relevant_coursework.length > 0 && (
                  <p className="text-gray-600 mt-0.5 text-[11px]">
                    <span className="font-semibold text-gray-700">Coursework:</span>{" "}
                    {Array.isArray(edu.relevant_coursework)
                      ? edu.relevant_coursework.join(", ")
                      : edu.relevant_coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-gray-400 mb-3"
            style={{ color: accentColor }}
          >
            Professional Experience
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{exp.company}</span>
                  <span>
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <div className="italic text-gray-800 mb-1 font-semibold">{exp.position}</div>
                {exp.description && (
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-justify pl-3 border-l border-gray-300">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-gray-400 mb-3"
            style={{ color: accentColor }}
          >
            Key Projects & Research Initiatives
          </h2>

          <div className="space-y-3">
            {data.project.map((proj, index) => (
              <div key={index} className="text-xs">
                <div className="font-bold text-gray-900">{proj.name}</div>
                <p className="text-gray-700 leading-normal">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-gray-400 mb-2"
            style={{ color: accentColor }}
          >
            Skills & Competencies
          </h2>
          <p className="text-xs text-gray-800 leading-normal">
            {data.skills.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
};

export default HarvardTemplate;
