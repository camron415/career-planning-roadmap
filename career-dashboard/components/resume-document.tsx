import type { ControlResumeSection } from "@/lib/resume-data";

type ResumeDocumentProps = {
  candidateName: string;
  location: string;
  email: string;
  phone: string;
  workAuthorization: string;
  roleHeadline: string;
  summary: string;
  skillHighlights: string[];
  sections: ControlResumeSection[];
};

const pageStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "8.5in",
  minHeight: "11in",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  color: "#0f172a",
  border: "1px solid rgba(15, 23, 42, 0.10)",
  borderRadius: "24px",
  boxShadow: "0 28px 80px rgba(15, 23, 42, 0.12)",
  padding: "40px 44px",
  fontFamily: '"Georgia", "Times New Roman", serif',
};

const sectionLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "#475569",
  fontWeight: 700,
};

export function ResumeDocument({
  candidateName,
  location,
  email,
  phone,
  workAuthorization,
  roleHeadline,
  summary,
  skillHighlights,
  sections,
}: ResumeDocumentProps) {
  return (
    <article style={pageStyle}>
      <header style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "20px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            lineHeight: 1.1,
            letterSpacing: "0.03em",
            fontWeight: 700,
          }}
        >
          {candidateName}
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "14px", color: "#334155" }}>
          {location} | {email} | {phone}
        </p>
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#475569" }}>{workAuthorization}</p>
        <p
          style={{
            margin: "18px 0 0",
            fontSize: "15px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0f172a",
            fontWeight: 700,
          }}
        >
          {roleHeadline}
        </p>
        <p style={{ margin: "14px 0 0", fontSize: "14px", lineHeight: 1.7, color: "#1e293b" }}>
          {summary}
        </p>
      </header>

      <section style={{ marginTop: "22px" }}>
        <p style={sectionLabelStyle}>Technical Skills</p>
        <p style={{ margin: "10px 0 0", fontSize: "13px", lineHeight: 1.7, color: "#1e293b" }}>
          {skillHighlights.join(" | ")}
        </p>
      </section>

      <div style={{ marginTop: "22px", display: "grid", gap: "20px" }}>
        {sections.map((section) => (
          <section key={section.title}>
            <p style={sectionLabelStyle}>{section.title}</p>
            <div style={{ marginTop: "12px", display: "grid", gap: "14px" }}>
              {section.entries.map((entry) => (
                <article key={`${section.title}-${entry.title}`}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "16px", color: "#0f172a", fontWeight: 700 }}>
                      {entry.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>{entry.meta}</p>
                  </div>
                  <ul
                    style={{
                      margin: "8px 0 0 18px",
                      padding: 0,
                      display: "grid",
                      gap: "6px",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#1e293b",
                    }}
                  >
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}