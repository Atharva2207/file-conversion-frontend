import { FileText, Image, Table,Minimize2, Type } from "lucide-react";

export interface Tool {
  id: string;
  title: string;
  description: string;
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export const tools: Tool[] = [
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Convert any image (JPG, PNG, WebP, GIF) to PDF — auto-detected",
    from: "image",
    to: "pdf",
    fromLabel: "IMAGE",
    toLabel: "PDF",
    icon: Image,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
 },
  {
    id: "pdf-to-docx",
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word files",
    from: "pdf",
    to: "docx",
    fromLabel: "PDF",
    toLabel: "DOCX",
    icon: FileText,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "docx-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF",
    from: "docx",
    to: "pdf",
    fromLabel: "DOCX",
    toLabel: "PDF",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "pdf-to-csv",
    title: "PDF to CSV",
    description: "Extract tables from PDF into spreadsheets",
    from: "pdf",
    to: "csv",
    fromLabel: "PDF",
    toLabel: "CSV",
    icon: Table,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "pdf-to-txt",
    title: "PDF to Text",
    description: "Extract all text from PDF documents",
    from: "pdf",
    to: "txt",
    fromLabel: "PDF",
    toLabel: "TXT",
    icon: Type,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10",
  },
  {
    id: "webp-to-pdf",
    title: "WebP to PDF",
    description: "Convert WebP images to PDF documents",
    from: "webp",
    to: "pdf",
    fromLabel: "WEBP",
    toLabel: "PDF",
    icon: Image,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    id: "docx-to-txt",
    title: "Word to Text",
    description: "Extract plain text from Word documents",
    from: "docx",
    to: "txt",
    fromLabel: "DOCX",
    toLabel: "TXT",
    icon: Type,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    from: "pdf",
    to: "pdf_compressed",
    fromLabel: "PDF",
    toLabel: "PDF",
    icon: Minimize2,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getAcceptString(ext: string): string {
  const map: Record<string, string> = {
    pdf: ".pdf",
    image: ".jpg,.jpeg,.png,.webp,.gif", 
    webp: ".webp",
    docx: ".docx,.doc",
    csv: ".csv",
    txt: ".txt",
  };
  return map[ext] || ".*";
}