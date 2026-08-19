import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MiniMalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import HarvardTemplate from "./templates/HarvardTemplate";
import AcademicCVTemplate from "./templates/AcademicCVTemplate";
import ATSCleanTemplate from "./templates/ATSCleanTemplate";
import OfficialLetterheadTemplate from "./templates/OfficialLetterheadTemplate";
import NovoModernTemplate from "./templates/NovoModernTemplate";
import NovoExecutiveTemplate from "./templates/NovoExecutiveTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "harvard":
        return <HarvardTemplate data={data} accentColor={accentColor} />;
      case "academic-cv":
        return <AcademicCVTemplate data={data} accentColor={accentColor} />;
      case "ats-clean":
        return <ATSCleanTemplate data={data} accentColor={accentColor} />;
      case "official-letterhead":
        return <OfficialLetterheadTemplate data={data} accentColor={accentColor} />;
      case "novo-modern":
        return <NovoModernTemplate data={data} accentColor={accentColor} />;
      case "novo-executive":
        return <NovoExecutiveTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " + classes
        }
      >
        {renderTemplate()}
      </div>

      <style>
        {`
          @page {
            size: letter portrait;
            margin: 0.5in;
          }
          @media print {
            body {
              background: #ffffff !important;
              color: #000000 !important;
            }
            body * {
              visibility: hidden;
            }
            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }
            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              padding: 0;
              margin: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
