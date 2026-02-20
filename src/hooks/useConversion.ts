import { useState, useRef, useCallback } from "react";
import { createConversionJob, fetchJobStatus } from "../services/conversionApi";

export type JobStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface Job {
  id: string;
  status: JobStatus;
  error_message?: string;
}

export interface Progress {
  percent: number;
  label: string;
}

const POLL_INTERVAL_MS = 1500;

function getProgressFromStatus(status: JobStatus): Progress {
  switch (status) {
    case "PENDING":
      return { percent: 15, label: "Queued…" };
    case "PROCESSING":
      return { percent: 60, label: "Converting…" };
    case "COMPLETED":
      return { percent: 100, label: "Done!" };
    case "FAILED":
      return { percent: 0, label: "Failed" };
    default:
      return { percent: 0, label: "" };
  }
}

export function useConversion() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const pollStatus = useCallback(
    (jobId: string) => {
      pollRef.current = setInterval(async () => {
        try {
          const data = await fetchJobStatus(jobId);
          const updatedJob: Job = {
            id: data.id,
            status: data.status,
            error_message: data.error_message,
          };
          setJob(updatedJob);
          setProgress(getProgressFromStatus(data.status));

          if (data.status === "COMPLETED" || data.status === "FAILED") {
            stopPolling();
            setLoading(false);
          }
        } catch (err) {
          stopPolling();
          setLoading(false);
          setError(err instanceof Error ? err.message : "Polling failed");
        }
      }, POLL_INTERVAL_MS);
    },
    [stopPolling]
  );

  const startConversion = useCallback(
    async (file: File, targetFormat: string) => {
      setLoading(true);
      setError(null);
      setJob(null);
      setProgress({ percent: 5, label: "Uploading…" });

      try {
        const data = await createConversionJob(file, targetFormat);
        const newJob: Job = {
          id: data.id,
          status: data.status ?? "PENDING",
          error_message: data.error_message,
        };
        setJob(newJob);
        setProgress(getProgressFromStatus(newJob.status));

        if (newJob.status !== "COMPLETED" && newJob.status !== "FAILED") {
          pollStatus(newJob.id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setProgress(null);
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    },
    [pollStatus]
  );

  const reset = useCallback(() => {
    stopPolling();
    setJob(null);
    setLoading(false);
    setError(null);
    setProgress(null);
  }, [stopPolling]);

  return { job, loading, error, progress, startConversion, reset };
}