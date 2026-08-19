import React, { useState } from "react";
import { Award, Plus, Trash2, Globe, Github, Twitter, Share2, Heart, FolderPlus } from "lucide-react";

const OptionalSectionsForm = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState("certifications");

  const certifications = data.certifications || [];
  const socialLinks = data.social_links || {};
  const customSections = data.custom_sections || [];
  const interests = data.interests || [];

  const updateCertifications = (newList) => {
    onChange({ ...data, certifications: newList });
  };

  const updateSocialLinks = (field, val) => {
    onChange({
      ...data,
      social_links: { ...socialLinks, [field]: val },
    });
  };

  const updateCustomSections = (newList) => {
    onChange({ ...data, custom_sections: newList });
  };

  const updateInterests = (newList) => {
    onChange({ ...data, interests: newList });
  };

  // Certification Handlers
  const addCertification = () => {
    updateCertifications([
      ...certifications,
      { name: "", issuer: "", date: "", credential_id: "", url: "" },
    ]);
  };

  const updateCert = (idx, field, val) => {
    const list = [...certifications];
    list[idx] = { ...list[idx], [field]: val };
    updateCertifications(list);
  };

  const removeCert = (idx) => {
    updateCertifications(certifications.filter((_, i) => i !== idx));
  };

  // Custom Section Handlers
  const addCustomSection = () => {
    updateCustomSections([
      ...customSections,
      {
        title: "Key Highlights & Volunteering",
        items: [{ heading: "", subheading: "", date: "", description: "" }],
      },
    ]);
  };

  const updateCustomSecTitle = (secIdx, title) => {
    const list = [...customSections];
    list[secIdx] = { ...list[secIdx], title };
    updateCustomSections(list);
  };

  const addCustomItem = (secIdx) => {
    const list = [...customSections];
    list[secIdx].items = [
      ...(list[secIdx].items || []),
      { heading: "", subheading: "", date: "", description: "" },
    ];
    updateCustomSections(list);
  };

  const updateCustomItem = (secIdx, itemIdx, field, val) => {
    const list = [...customSections];
    const items = [...(list[secIdx].items || [])];
    items[itemIdx] = { ...items[itemIdx], [field]: val };
    list[secIdx].items = items;
    updateCustomSections(list);
  };

  const removeCustomSection = (secIdx) => {
    updateCustomSections(customSections.filter((_, i) => i !== secIdx));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">NovoResume Optional & Custom Sections</h3>
        <p className="text-sm text-gray-500">
          Add Certifications, Professional Social Profiles, Custom Sections, and Passions
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "certifications" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Award className="size-3.5" /> Certifications ({certifications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "social" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Share2 className="size-3.5" /> Social Profiles
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("custom")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "custom" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FolderPlus className="size-3.5" /> Custom Sections ({customSections.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("interests")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "interests" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Heart className="size-3.5" /> Passions & Hobbies
        </button>
      </div>

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Licenses & Industry Certifications</span>
            <button
              onClick={addCertification}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium"
            >
              <Plus className="size-3.5" /> Add Certification
            </button>
          </div>

          {certifications.map((cert, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-700">Certification #{idx + 1}</span>
                <button onClick={() => removeCert(idx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Certification Name (e.g. AWS Certified Solutions Architect)"
                  value={cert.name || ""}
                  onChange={(e) => updateCert(idx, "name", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Issuing Organization (e.g. Amazon Web Services)"
                  value={cert.issuer || ""}
                  onChange={(e) => updateCert(idx, "issuer", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Issue Date (e.g. Jan 2024)"
                  value={cert.date || ""}
                  onChange={(e) => updateCert(idx, "date", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Credential URL / ID (Optional)"
                  value={cert.url || cert.credential_id || ""}
                  onChange={(e) => updateCert(idx, "url", e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Social Profiles Tab */}
      {activeTab === "social" && (
        <div className="p-4 border border-gray-200 rounded-xl space-y-3 bg-white">
          <h4 className="font-semibold text-gray-800 text-sm">Professional Web Profiles</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">GitHub Username / URL</label>
              <input
                type="text"
                placeholder="github.com/username"
                value={socialLinks.github || ""}
                onChange={(e) => updateSocialLinks("github", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Portfolio / Personal Website</label>
              <input
                type="text"
                placeholder="myportfolio.com"
                value={socialLinks.portfolio || ""}
                onChange={(e) => updateSocialLinks("portfolio", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Twitter / X Profile</label>
              <input
                type="text"
                placeholder="twitter.com/username"
                value={socialLinks.twitter || ""}
                onChange={(e) => updateSocialLinks("twitter", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Kaggle / Google Scholar</label>
              <input
                type="text"
                placeholder="scholar.google.com/..."
                value={socialLinks.scholar || socialLinks.kaggle || ""}
                onChange={(e) => updateSocialLinks("scholar", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Sections Tab */}
      {activeTab === "custom" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Custom Resume Sections</span>
            <button
              onClick={addCustomSection}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium"
            >
              <Plus className="size-3.5" /> Add Custom Section
            </button>
          </div>

          {customSections.map((sec, secIdx) => (
            <div key={secIdx} className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={sec.title || ""}
                  onChange={(e) => updateCustomSecTitle(secIdx, e.target.value)}
                  placeholder="Section Title (e.g. Volunteering & Leadership)"
                  className="font-bold text-gray-800 text-sm px-3 py-1 border border-gray-300 rounded bg-white"
                />
                <button onClick={() => removeCustomSection(secIdx)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              {sec.items?.map((item, itemIdx) => (
                <div key={itemIdx} className="p-3 border border-gray-200 rounded bg-white space-y-2 text-xs">
                  <div className="grid md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Heading (e.g. Volunteer Lead)"
                      value={item.heading || ""}
                      onChange={(e) => updateCustomItem(secIdx, itemIdx, "heading", e.target.value)}
                      className="px-2.5 py-1 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Subheading / Organization"
                      value={item.subheading || ""}
                      onChange={(e) => updateCustomItem(secIdx, itemIdx, "subheading", e.target.value)}
                      className="px-2.5 py-1 border border-gray-300 rounded"
                    />
                  </div>
                  <textarea
                    placeholder="Description / Key bullet points..."
                    rows={2}
                    value={item.description || ""}
                    onChange={(e) => updateCustomItem(secIdx, itemIdx, "description", e.target.value)}
                    className="w-full px-2.5 py-1 border border-gray-300 rounded"
                  />
                </div>
              ))}

              <button
                onClick={() => addCustomItem(secIdx)}
                className="text-xs text-green-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="size-3" /> Add Item to {sec.title}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Interests & Passions Tab */}
      {activeTab === "interests" && (
        <div className="p-4 border border-gray-200 rounded-xl space-y-2 bg-white">
          <label className="block text-xs font-semibold text-gray-700">Passions, Hobbies & Personal Interests (comma-separated)</label>
          <input
            type="text"
            value={interests.join(", ")}
            onChange={(e) => updateInterests(e.target.value.split(",").map(s => s.trimStart()))}
            placeholder="e.g. Artificial Intelligence, Marathon Running, Open Source Contributing, Chess, Photography"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default OptionalSectionsForm;
