import React from "react";

const OfficialLetterheadTemplate = ({ data, accentColor = "#1e3a8a" }) => {
  const letterhead = data.letterhead || {};
  const documentBody = data.document_body || "";
  const signatureUrl = data.signature_url || "";

  const defaultDate = letterhead.date || new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-12 bg-white text-gray-900 font-serif leading-relaxed shadow-sm min-h-[11in] flex flex-col justify-between">
      <div>
        {/* Institutional Letterhead Header */}
        <header className="border-b-2 pb-6 mb-8 flex justify-between items-start" style={{ borderColor: accentColor }}>
          <div className="flex items-center gap-4">
            {letterhead.logo_url && (
              <img
                src={letterhead.logo_url}
                alt="Institutional Logo"
                className="h-16 w-auto object-contain"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold tracking-tight uppercase" style={{ color: accentColor }}>
                {letterhead.institution_name || "HARVARD UNIVERSITY"}
              </h1>
              <p className="text-sm font-semibold text-gray-700">
                {letterhead.sender_title || "OFFICE OF ACADEMIC AFFAIRS & RESEARCH"}
              </p>
              <p className="text-xs text-gray-500 italic mt-0.5">
                {letterhead.sender_name || "Official Departmental Communication"}
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-600 space-y-0.5">
            {letterhead.sender_email && <p>Email: {letterhead.sender_email}</p>}
            {letterhead.sender_phone && <p>Phone: {letterhead.sender_phone}</p>}
            <p className="text-gray-400 text-[10px]">Doc Ref: #{data._id ? data._id.slice(-6).toUpperCase() : "OFFICIAL"}</p>
          </div>
        </header>

        {/* Date Line */}
        <div className="mb-6 text-sm font-sans text-gray-800">
          <p>{defaultDate}</p>
        </div>

        {/* Recipient Address Block */}
        {(letterhead.recipient_name || letterhead.recipient_organization || letterhead.recipient_address) && (
          <div className="mb-6 text-sm font-sans text-gray-800 space-y-0.5">
            {letterhead.recipient_name && <p className="font-bold">{letterhead.recipient_name}</p>}
            {letterhead.recipient_title && <p>{letterhead.recipient_title}</p>}
            {letterhead.recipient_organization && <p className="font-semibold">{letterhead.recipient_organization}</p>}
            {letterhead.recipient_address && <p className="text-gray-600">{letterhead.recipient_address}</p>}
          </div>
        )}

        {/* Subject Line */}
        {letterhead.subject && (
          <div className="mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
              RE: {letterhead.subject}
            </h2>
          </div>
        )}

        {/* Main Document Body */}
        <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-line text-justify mb-8 font-serif">
          {documentBody || (
            <p className="italic text-gray-400">
              (No document body entered yet. Select "Recommendation Letter Builder" or "Official Documents" to generate or write your letter.)
            </p>
          )}
        </div>
      </div>

      {/* Official Sign-Off and Digital Signature Block */}
      <div className="pt-6 border-t border-gray-200 text-sm font-sans mt-auto">
        <p className="font-serif italic mb-4">Sincerely,</p>

        {signatureUrl ? (
          <img
            src={signatureUrl}
            alt="Digital Signature"
            className="h-14 w-auto object-contain mb-2"
          />
        ) : (
          <div className="h-12 w-48 border-b border-dashed border-gray-400 mb-2 flex items-end">
            <span className="text-[10px] text-gray-400 italic mb-1">[Digital Signature]</span>
          </div>
        )}

        <div className="font-bold text-gray-900">
          {letterhead.sender_name || data.personal_info?.full_name || "Signature Name"}
        </div>
        <div className="text-xs text-gray-700">
          {letterhead.sender_title || data.personal_info?.profession || "Official Representative"}
        </div>
        {letterhead.institution_name && (
          <div className="text-xs text-gray-600 italic">
            {letterhead.institution_name}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficialLetterheadTemplate;
