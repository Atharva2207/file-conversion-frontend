const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: "PDF Document",
  docx: "Word Document",
  doc: "Word Document",
  pptx: "PowerPoint",
  ppt: "PowerPoint",
  xlsx: "Excel Spreadsheet",
  xls: "Excel Spreadsheet",
  csv: "CSV File",
  png: "PNG Image",
  jpg: "JPEG Image",
  jpeg: "JPEG Image",
  gif: "GIF Image",
  webp: "WebP Image",
  svg: "SVG Image",
  mp4: "MP4 Video",
  mp3: "MP3 Audio",
  html: "HTML File",
  txt: "Text File",
  json: "JSON File",
};

export function getSourceType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return ext;
}

export function getFileTypeLabel(ext: string): string {
  return FILE_TYPE_LABELS[ext] || ext.toUpperCase();
}
