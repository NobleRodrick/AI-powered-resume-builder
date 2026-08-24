import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import HarvardTemplate from "./templates/HarvardTemplate";
import AcademicCVTemplate from "./templates/AcademicCVTemplate";
import ATSCleanTemplate from "./templates/ATSCleanTemplate";
import OfficialLetterheadTemplate from "./templates/OfficialLetterheadTemplate";
import NeuraModernTemplate from "./templates/NeuraModernTemplate";
import NeuraExecutiveTemplate from "./templates/NeuraExecutiveTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const isLetterDoc = ["recommendation_letter", "statement_of_purpose", "cover_letter", "transcript_summary"].includes(
    data?.document_type
  );

  const renderTemplate = () => {
    // If it's an official letter or SOP and template is default or letterhead, render Official Letterhead
    if (isLetterDoc && (!template || template === "official-letterhead" || template === "classic")) {
      return <OfficialLetterheadTemplate data={data} accentColor={accentColor} />;
    }

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
      case "neura-modern":
      case "novo-modern":
        return <NeuraModernTemplate data={data} accentColor={accentColor} />;
      case "neura-executive":
      case "novo-executive":
        return <NeuraExecutiveTemplate data={data} accentColor={accentColor} />;

      default:
        if (data?.document_type === "cv") {
          return <AcademicCVTemplate data={data} accentColor={accentColor} />;
        }
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100 print:bg-white print:m-0 print:p-0">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " + classes
        }
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
