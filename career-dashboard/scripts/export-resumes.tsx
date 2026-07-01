import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

import { renderToStaticMarkup } from "react-dom/server";

import { ResumeDocument } from "@/components/resume-document";
import { getResumePackets } from "@/lib/resume-packets";
import { getResumeSnapshot } from "@/lib/resume-data";

const execFileAsync = promisify(execFile);

function buildHtmlDocument(markup: string, title: string) {
  return [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    `  <title>${title}</title>`,
    "  <style>",
    "    body { margin: 0; padding: 32px; background: #e9eff6; }",
    "    * { box-sizing: border-box; }",
    "  </style>",
    "</head>",
    `<body>${markup}</body>`,
    "</html>",
  ].join("\n");
}

async function exportPacket(outputDir: string, packet: ReturnType<typeof getResumePackets>[number]) {
  const snapshot = getResumeSnapshot();
  const markup = renderToStaticMarkup(
    <ResumeDocument
      candidateName={snapshot.candidateName}
      location={snapshot.location}
      email={snapshot.email}
      phone={snapshot.phone}
      workAuthorization={snapshot.workAuthorization}
      roleHeadline={packet.roleHeadline}
      summary={packet.summary}
      skillHighlights={packet.skillHighlights}
      sections={packet.sections}
    />,
  );
  const html = buildHtmlDocument(markup, `${packet.label} Resume`);
  const htmlPath = path.join(outputDir, `${packet.slug}.html`);
  const docxPath = path.join(outputDir, `${packet.slug}.docx`);
  const tempHtmlPath = path.join(tmpdir(), `${packet.slug}-${Date.now()}.html`);

  await writeFile(htmlPath, html, "utf8");
  await writeFile(tempHtmlPath, html, "utf8");
  await execFileAsync("/usr/bin/textutil", ["-convert", "docx", tempHtmlPath, "-output", docxPath]);

  return {
    slug: packet.slug,
    htmlPath,
    docxPath,
  };
}

async function main() {
  const outputDir = path.resolve(process.cwd(), "public", "resume-exports");
  await mkdir(outputDir, { recursive: true });

  const packets = getResumePackets();
  const results = [];

  for (const packet of packets) {
    results.push(await exportPacket(outputDir, packet));
  }

  console.log(
    JSON.stringify(
      {
        exported: results,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});