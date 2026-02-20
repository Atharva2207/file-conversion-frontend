import {
  FileText,
  Image,
  Table,
  FileSpreadsheet,
  FileImage,
  ArrowRightLeft,
} from "lucide-react";

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
    id: "pdf-to-docx",
    title: "PDF to Word",
    description: "Convert PDF documents to editable DOCX files",
    from: "pdf",
    to: "docx",
    fromLabel: "PDF",
    toLabel: "DOCX",
    icon: FileText,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "pdf-to-csv",
    title: "PDF to CSV",
    description: "Extract tables from PDF into CSV spreadsheets",
    from: "pdf",
    to: "csv",
    fromLabel: "PDF",
    toLabel: "CSV",
    icon: Table,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    from: "jpg",
    to: "pdf",
    fromLabel: "JPG",
    toLabel: "PDF",
    icon: FileImage,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images to PDF documents",
    from: "png",
    to: "pdf",
    fromLabel: "PNG",
    toLabel: "PDF",
    icon: Image,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "jpeg-to-pdf",
    title: "JPEG to PDF",
    description: "Convert JPEG images to PDF documents",
    from: "jpeg",
    to: "pdf",
    fromLabel: "JPEG",
    toLabel: "PDF",
    icon: FileImage,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
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
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getAcceptString(ext: string): string {
  const map: Record<string, string> = {
    pdf: ".pdf",
    jpg: ".jpg,.jpeg",
    jpeg: ".jpeg,.jpg",
    png: ".png",
    webp: ".webp",
    gif: ".gif",
    docx: ".docx",
    csv: ".csv",
  };
  return map[ext] || ".*";
}