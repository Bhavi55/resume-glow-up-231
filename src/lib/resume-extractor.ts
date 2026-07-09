// Client-side resume text extraction for PDF and DOCX files.
import * as pdfjsLib from "pdfjs-dist";
// Use the bundled worker via Vite ?url so pdfjs works in the browser.
// @ts-expect-error - vite worker url import
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromPdf(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items
      .map((item) => ("str" in item ? (item as { str: string }).str : ""))
      .filter(Boolean);
    text += strings.join(" ") + "\n";
  }
  return text;
}

export async function extractTextFromDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser");
  const buf = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buf });
  return result.value;
}

export async function extractResumeText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return extractTextFromPdf(file);
  }
  if (name.endsWith(".docx") || name.endsWith(".doc") || file.type.includes("word")) {
    return extractTextFromDocx(file);
  }
  throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
}
