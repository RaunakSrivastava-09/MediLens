"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

// Handles the camera/gallery upload flow described in the synopsis:
// <input type="file" accept="image/*" capture="environment"> opens the
// phone's back camera directly on mobile browsers, and the normal file
// picker on desktop.
export default function UploadForm() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const router = useRouter();

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!preview) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: preview })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      const firstMedicine = data.prescription.extractedMedicines?.[0];
      if (firstMedicine) {
        router.push(`/medicine/${data.prescription._id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="border-[1.8px] border-dashed border-forest-light rounded-lg2 bg-mint-tint flex flex-col items-center justify-center gap-4 p-10 mb-5 min-h-[220px]">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Prescription preview" className="max-h-48 rounded-md2" />
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="13" rx="2" stroke="#2C6B52" strokeWidth="1.8" />
                <circle cx="12" cy="13.5" r="3.4" stroke="#2C6B52" strokeWidth="1.8" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold mb-1.5">Take a photo of your prescription</p>
              <p className="text-xs text-ink-soft max-w-[230px]">
                Or upload an existing photo of a prescription or medicine strip
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-sm text-danger mb-3">{error}</p>}

      {!preview ? (
        <>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button className="btn btn-primary w-full mb-2.5" onClick={() => cameraInputRef.current?.click()}>
            Open camera
          </button>
          <button className="btn btn-secondary w-full" onClick={() => galleryInputRef.current?.click()}>
            Upload from gallery
          </button>
        </>
      ) : (
        <div className="flex gap-2.5">
          <button className="btn btn-secondary flex-1" onClick={() => setPreview(null)} disabled={loading}>
            Retake
          </button>
          <button className="btn btn-primary flex-1" onClick={handleSubmit} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze prescription"}
          </button>
        </div>
      )}
    </div>
  );
}
