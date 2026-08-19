import React from "react";

const ATSCleanTemplate = ({ data }) => {
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
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-sans leading-relaxed text-sm">
      {/* Name and Contact (Plain Clean Stack for ATS Parsers) */}
      <div className="text-center mb-6 pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-black mb-1">
          {data.personal_info?.full_name || "FIRSTNAME LASTNAME"}
        </h1>
        {data.personal_info?.profession && (
          <p className="font-semibold text-gray-800 mb-2">
            {data.personal_info.profession}
          </p>
        )}
        <div className="text-xs text-gray-800 space-x-2">
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.phone && <span> | {data.personal_info.phone}</span>}
          {data.personal_info?.email && <span> | {data.personal_info.email}</span>}
          {data.personal_info?.linkedin && <span> | {data.personal_info.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.professional_summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Professional Summary
          </h2>
          <p className="text-xs text-gray-900 leading-relaxed">
            {data.professional_summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Technical & Professional Skills
          </h2>
          <p className="text-xs text-gray-900">
            <span className="font-semibold">Core Competencies:</span> {data.skills.join(", ")}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-3 text-black">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-bold text-black">
                  <span>{exp.company}</span>
                  <span>
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <div className="italic text-gray-800 font-semibold mb-1">{exp.position}</div>
                {exp.description && (
                  <div className="text-gray-900 leading-relaxed whitespace-pre-line pl-3">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-3 text-black">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="text-xs">
                <div className="flex justify-between font-bold text-black">
                  <span>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</span>
                  <span>
                    {edu.start_date ? `${formatDate(edu.start_date)} - ` : ""}
                    {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                  </span>
                </div>
                <div className="italic text-gray-800">
                  {edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `(GPA: ${edu.gpa})`}
                </div>
                {edu.honors && <p className="text-gray-700">Honors: {edu.honors}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Key Projects
          </h2>
          <div className="space-y-2">
            {data.project.map((proj, index) => (
              <div key={index} className="text-xs">
                <span className="font-bold text-black">{proj.name}: </span>
                <span className="text-gray-900">{proj.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSCleanTemplate;
