import { load } from "cheerio";

import type { SeniorityHint } from "./types";

const annualHours = 2080;
const headingSelector = "h1, h2, h3, h4, h5, h6";
const summaryHeadingPatterns = [
  /about the role/i,
  /about this role/i,
  /position summary/i,
  /role summary/i,
  /job summary/i,
  /the role/i,
  /opportunity/i,
  /what you'll do/i,
  /what you will do/i,
  /overview/i,
] as const;
const requirementsHeadingPatterns = [
  /requirements/i,
  /qualifications/i,
  /what you'll bring/i,
  /what you will bring/i,
  /you have/i,
  /must have/i,
  /minimum qualifications/i,
  /who you are/i,
  /what we're looking for/i,
  /what we are looking for/i,
  /about you/i,
] as const;

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map(normalizeWhitespace).filter(Boolean)));
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function cleanText(value: string) {
  if (!value) {
    return "";
  }

  const text = value.includes("<") ? load(`<article>${value}</article>`).text() : value;

  return normalizeWhitespace(text);
}

export function buildRequirementsSummary(value: string) {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return "Requirements not summarized yet.";
  }

  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const summary = sentences.slice(0, 2).join(" ");

  return (summary || cleaned).slice(0, 360);
}

function extractSectionTexts(html: string, headingPatterns: readonly RegExp[]) {
  if (!html) {
    return [];
  }

  const $ = load(`<article>${html}</article>`);
  const collected: string[] = [];

  $(headingSelector).each((_, element) => {
    const headingText = normalizeWhitespace($(element).text());

    if (!headingPatterns.some((pattern) => pattern.test(headingText))) {
      return;
    }

    let sibling = $(element).next();

    while (sibling.length > 0 && !sibling.is(headingSelector)) {
      if (sibling.is("p, li")) {
        collected.push(sibling.text());
      }

      if (sibling.is("ul, ol")) {
        sibling.find("li").each((__, item) => {
          collected.push($(item).text());
        });
      }

      sibling = sibling.next();
    }
  });

  return uniqueStrings(collected);
}

function firstParagraphsFromHtml(html: string) {
  if (!html) {
    return [];
  }

  const $ = load(`<article>${html}</article>`);

  return uniqueStrings(
    $("p")
      .map((_, element) => $(element).text())
      .get()
      .filter((text) => normalizeWhitespace(text).length > 40),
  );
}

function allListItemsFromHtml(html: string) {
  if (!html) {
    return [];
  }

  const $ = load(`<article>${html}</article>`);

  return uniqueStrings(
    $("li")
      .map((_, element) => $(element).text())
      .get()
      .filter((text) => normalizeWhitespace(text).length > 10),
  );
}

function firstSentences(value: string, count: number) {
  return cleanText(value)
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 30)
    .slice(0, count)
    .join(" ");
}

export function buildPositionSummary(value: string) {
  const summary = firstSentences(value, 2);

  return summary || cleanText(value).slice(0, 240) || "Position summary not extracted yet.";
}

export function extractPositionSummaryFromHtml(html: string, fallbackText: string) {
  const sectionTexts = extractSectionTexts(html, summaryHeadingPatterns);

  if (sectionTexts.length > 0) {
    return sectionTexts.slice(0, 2).join(" ");
  }

  const paragraphs = firstParagraphsFromHtml(html);

  if (paragraphs.length > 0) {
    return paragraphs.slice(0, 2).join(" ");
  }

  return buildPositionSummary(fallbackText);
}

export function buildRequirementsList(value: string) {
  const cleaned = cleanText(value);

  if (!cleaned) {
    return [];
  }

  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 18);

  if (sentences.length > 0) {
    return uniqueStrings(sentences).slice(0, 5);
  }

  return uniqueStrings(
    cleaned
      .split(/,|;|\u2022/)
      .map((part) => part.trim())
      .filter((part) => part.length > 10),
  ).slice(0, 5);
}

export function extractRequirementsListFromHtml(html: string, fallbackText: string) {
  const sectionBullets = extractSectionTexts(html, requirementsHeadingPatterns);

  if (sectionBullets.length > 0) {
    return sectionBullets.slice(0, 6);
  }

  const listItems = allListItemsFromHtml(html);

  if (listItems.length > 0) {
    return listItems.slice(0, 6);
  }

  return buildRequirementsList(fallbackText);
}

export function classifySeniority(title: string, bodyText: string): SeniorityHint {
  const titleHaystack = normalizeWhitespace(title).toLowerCase();
  const bodyHaystack = normalizeWhitespace(bodyText).toLowerCase();

  if (/(vp|vice president|chief|head of|director|engineering manager|manager)/i.test(titleHaystack)) {
    return "leadership";
  }

  if (/(senior|staff|principal|lead|architect|sr\.?\s)/i.test(titleHaystack)) {
    return "senior";
  }

  if (/(junior|entry-level|entry level|new grad|new graduate|early career|associate|apprentice|intern)/i.test(titleHaystack)) {
    return "entry-level";
  }

  const yearsMatch = bodyHaystack.match(/(\d+)\+?\s+years?/i);

  if (yearsMatch && Number(yearsMatch[1]) >= 3) {
    return "mid-level";
  }

  return "unknown";
}

function parseNumber(rawValue: string) {
  return Number(rawValue.replace(/[$,]/g, ""));
}

function toAnnualizedRange(low: number, high: number, multiplier = 1) {
  return {
    low: Math.round(low * multiplier),
    high: Math.round(high * multiplier),
  };
}

export function parseCompensation(value: string) {
  const cleaned = normalizeWhitespace(value);

  if (!cleaned) {
    return {
      raw: null,
      low: null,
      high: null,
    };
  }

  const hourlyRange = cleaned.match(
    /(\$\s?\d+(?:\.\d+)?)\s*(?:-|to)\s*(\$\s?\d+(?:\.\d+)?)\s*(?:\/\s?(?:hr|hour)|hourly|an hour)/i,
  );

  if (hourlyRange) {
    const low = parseNumber(hourlyRange[1]);
    const high = parseNumber(hourlyRange[2]);
    const normalized = toAnnualizedRange(low, high, annualHours);

    return {
      raw: hourlyRange[0],
      low: normalized.low,
      high: normalized.high,
    };
  }

  const annualKRange = cleaned.match(
    /(\$\s?\d{2,3}k)\s*(?:-|to)\s*(\$\s?\d{2,3}k)/i,
  );

  if (annualKRange) {
    const low = parseNumber(annualKRange[1].replace(/k/i, "000"));
    const high = parseNumber(annualKRange[2].replace(/k/i, "000"));

    return {
      raw: annualKRange[0],
      low,
      high,
    };
  }

  const annualRange = cleaned.match(
    /(\$\s?\d{2,3}(?:,\d{3})+)\s*(?:-|to)\s*(\$\s?\d{2,3}(?:,\d{3})+)/i,
  );

  if (annualRange) {
    const low = parseNumber(annualRange[1]);
    const high = parseNumber(annualRange[2]);

    return {
      raw: annualRange[0],
      low,
      high,
    };
  }

  return {
    raw: null,
    low: null,
    high: null,
  };
}

export function inferRemoteType(locationText: string, descriptionText: string) {
  const haystack = normalizeWhitespace(`${locationText} ${descriptionText}`).toLowerCase();

  if (haystack.includes("remote") && /(united states|u\.s\.| us\b|usa|us-only)/i.test(haystack)) {
    return "Remote US";
  }

  if (haystack.includes("remote")) {
    return "Remote";
  }

  if (haystack.includes("hybrid")) {
    return "Hybrid";
  }

  if (haystack.includes("on-site") || haystack.includes("onsite")) {
    return "On-site";
  }

  return "Location specified";
}

export function inferEmploymentType(value: string) {
  const haystack = normalizeWhitespace(value).toLowerCase();

  if (haystack.includes("intern")) {
    return "Internship";
  }

  if (haystack.includes("part-time") || haystack.includes("part time")) {
    return "Part-time";
  }

  if (haystack.includes("contract") || haystack.includes("temporary")) {
    return "Contract";
  }

  return "Full-time";
}

export function inferDegreeRequirement(value: string) {
  const haystack = normalizeWhitespace(value).toLowerCase();

  if (!haystack) {
    return "Not specified";
  }

  if (/(bachelor|bs\b|b\.s\.|degree)/i.test(haystack)) {
    if (/(equivalent experience|or equivalent|experience in lieu)/i.test(haystack)) {
      return "Equivalent experience accepted";
    }

    if (/(preferred|nice to have|bonus)/i.test(haystack)) {
      return "Degree preferred";
    }

    return "Bachelor's degree required";
  }

  return "Not specified";
}

export function inferInternshipFlag(title: string, value: string) {
  const haystack = normalizeWhitespace(`${title} ${value}`).toLowerCase();

  return haystack.includes("intern") ? 1 : 0;
}

export function normalizeDate(value: string | number | null | undefined) {
  if (value == null || value === "") {
    return new Date().toISOString().slice(0, 10);
  }

  if (typeof value === "number") {
    return new Date(value).toISOString().slice(0, 10);
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return parsed.toISOString().slice(0, 10);
}