import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      start_date: "",
      graduation_date: "",
      is_current: false,
      gpa: "",
      location: "",
      honors: "",
      thesis_title: "",
      relevant_coursework: [],
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education & Qualifications
          </h3>
          <p className="text-sm text-gray-500">
            Add detailed education, academic honors, location, and relevant coursework
          </p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-700">No education added yet.</p>
          <p className="text-sm text-gray-500">Click "Add Education" to list your degree, honors, and coursework.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50 shadow-sm"
            >
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Education Entry #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  title="Remove Entry"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Institution Name</label>
                  <input
                    value={education.institution || ""}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Stanford University"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Degree / Qualification</label>
                  <input
                    value={education.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    type="text"
                    placeholder="e.g. Bachelor of Science (B.S.)"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Field of Study / Major</label>
                  <input
                    value={education.field || ""}
                    onChange={(e) =>
                      updateEducation(index, "field", e.target.value)
                    }
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    placeholder="e.g. Computer Science & AI"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Location (City, Country)</label>
                  <input
                    value={education.location || ""}
                    onChange={(e) =>
                      updateEducation(index, "location", e.target.value)
                    }
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    placeholder="e.g. Stanford, CA, USA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                  <input
                    value={education.start_date || ""}
                    onChange={(e) =>
                      updateEducation(index, "start_date", e.target.value)
                    }
                    type="month"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">End / Graduation Date</label>
                  <input
                    disabled={education.is_current}
                    value={education.graduation_date || ""}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                    type="month"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id={`is_current_${index}`}
                  checked={education.is_current || false}
                  onChange={(e) => updateEducation(index, "is_current", e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor={`is_current_${index}`} className="text-xs text-gray-700 font-medium">
                  Currently Studying Here
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">GPA / Score (Optional)</label>
                  <input
                    value={education.gpa || ""}
                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    placeholder="e.g. 3.9 / 4.0 or First Class Honors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Honors & Distinctions</label>
                  <input
                    value={education.honors || ""}
                    onChange={(e) => updateEducation(index, "honors", e.target.value)}
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    placeholder="e.g. Summa Cum Laude, Dean's List (2022-2024)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Thesis / Capstone Title (Optional)</label>
                <input
                  value={education.thesis_title || ""}
                  onChange={(e) => updateEducation(index, "thesis_title", e.target.value)}
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="e.g. Neural Architectures for Fast Document Processing"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Relevant Coursework (comma-separated)</label>
                <input
                  value={Array.isArray(education.relevant_coursework) ? education.relevant_coursework.join(", ") : (education.relevant_coursework || "")}
                  onChange={(e) =>
                    updateEducation(index, "relevant_coursework", e.target.value.split(",").map(item => item.trimStart()))
                  }
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="e.g. Machine Learning, Distributed Systems, Data Structures, Econometrics"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
