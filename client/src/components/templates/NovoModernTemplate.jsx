import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Award, CheckCircle, Github, Twitter, Code } from "lucide-react";

const NovoModernTemplate = ({ data, accentColor = "#2563eb" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    if (!month) return dateStr;
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const socialLinks = data.social_links || {};
  const certifications = data.certifications || [];
  const customSections = data.custom_sections || [];
  const interests = data.interests || [];
  const languages = data.languages || [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-sans shadow-md grid grid-cols-12 min-h-[11in]">
      {/* Left Sidebar (35% width) */}
      <div className="col-span-4 p-6 bg-slate-900 text-white flex flex-col justify-between">
        <div className="space-y-6">
          {/* Profile Picture */}
          {data.personal_info?.image && (
            <div className="flex justify-center">
              <img
                src={data.personal_info.image}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-md"
              />
            </div>
          )}

          {/* Name & Title (Mobile/Sidebar view) */}
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight text-white">
              {data.personal_info?.full_name || "YOUR NAME"}
            </h1>
            <p className="text-xs text-blue-300 font-medium mt-1">
              {data.personal_info?.profession || ""}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-700 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contact</h2>
            {data.personal_info?.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="size-3.5 text-blue-400 shrink-0" />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-blue-400 shrink-0" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-blue-400 shrink-0" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin className="size-3.5 text-blue-400 shrink-0" />
                <span>{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="size-3.5 text-blue-400 shrink-0" />
                <span>{data.personal_info.website}</span>
              </div>
            )}
            {socialLinks.github && (
              <div className="flex items-center gap-2 break-all">
                <Github className="size-3.5 text-blue-400 shrink-0" />
                <span>{socialLinks.github}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Skills & Strengths</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-medium bg-blue-900/60 text-blue-200 border border-blue-700/50 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Languages</h2>
              <div className="space-y-1.5 text-xs text-slate-300">
                {languages.map((l, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="font-semibold text-slate-200">{l.language}</span>
                    <span className="text-slate-400 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests & Passions */}
          {interests.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interests & Passions</h2>
              <p className="text-xs text-slate-300">{interests.join(" • ")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area (65% width) */}
      <div className="col-span-8 p-8 space-y-6">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Professional Profile
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed text-justify">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Work Experience
            </h2>

            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className="text-sm">{exp.position}</span>
                    <span className="text-gray-500 font-normal">
                      {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <div className="text-blue-700 font-semibold">{exp.company}</div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify pl-2 border-l-2 border-gray-200 mt-1">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Education & Academic Achievements
            </h2>

            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="text-xs">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                    <span className="text-gray-500 font-normal">
                      {edu.start_date ? `${formatDate(edu.start_date)} - ` : ""}
                      {edu.is_current ? "Present" : formatDate(edu.graduation_date)}
                    </span>
                  </div>
                  <div className="text-gray-700 font-semibold">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</div>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.honors && <p className="text-green-700 font-medium">Honors: {edu.honors}</p>}
                  {edu.thesis_title && <p className="text-gray-600 italic">Thesis: "{edu.thesis_title}"</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Certifications & Credentials
            </h2>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-2 border border-gray-200 rounded-md bg-gray-50">
                  <div className="font-bold text-gray-900 flex items-center gap-1">
                    <CheckCircle className="size-3 text-green-600 shrink-0" />
                    {cert.name}
                  </div>
                  <div className="text-gray-600 text-[11px]">{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project && data.project.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-3"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Key Projects
            </h2>

            <div className="space-y-2 text-xs">
              {data.project.map((proj, index) => (
                <div key={index}>
                  <span className="font-bold text-gray-900">{proj.name}: </span>
                  <span className="text-gray-700">{proj.description}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((sec, idx) => (
          <section key={idx}>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b-2 mb-2"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {sec.title}
            </h2>
            <div className="space-y-2 text-xs">
              {sec.items?.map((item, i) => (
                <div key={i}>
                  <div className="font-bold text-gray-900">{item.heading} {item.date && `(${item.date})`}</div>
                  {item.subheading && <div className="text-gray-700 italic">{item.subheading}</div>}
                  {item.description && <div className="text-gray-600">{item.description}</div>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default NovoModernTemplate;
