const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://file-converter-aj.duckdns.org";

export async function createConversionJob(file: File, targetFormat: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("target_format", targetFormat);

  const response = await fetch(`${API_BASE_URL}/convert/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to start conversion");
  }

  return response.json();
}

export async function fetchJobStatus(jobId: string) {
  const response = await fetch(`${API_BASE_URL}/convert/${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job status");
  }

  return response.json();
}

export function downloadFile(jobId: string) {
  window.location.href = `${API_BASE_URL}/convert/${jobId}/download`;
}