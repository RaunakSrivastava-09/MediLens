"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
        body: JSON.stringify({ imageBase64: preview }),
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
    <div className="w-full">
      <div className="rounded-2xl border border-dashed border-[#BFD8CB] bg-[#F8FBF9] p-5 sm:p-6 mb-4 min-h-[190px] flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Prescription preview"
            className="max-h-48 max-w-full rounded-xl object-contain"
          />
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="7"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="#2F8F68"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="13.5"
                  r="3.4"
                  stroke="#2F8F68"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            <p className="text-sm font-semibold text-[#17392C] mb-1">
              Take a photo of your prescription
            </p>
            <p className="text-xs text-[#71837B] max-w-[260px] mx-auto leading-relaxed">
              Or upload an existing prescription or medicine strip photo
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mb-3 rounded-xl bg-red-50 px-3 py-2">
          {error}
        </p>
      )}

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

          <button
            className="w-full rounded-xl bg-[#17392C] px-4 py-3 text-sm font-medium text-white hover:bg-[#24513F] transition mb-2"
            onClick={() => cameraInputRef.current?.click()}
          >
            Open camera
          </button>

          <button
            className="w-full rounded-xl border border-[#DDE9E3] bg-white px-4 py-3 text-sm font-medium text-[#17392C] hover:bg-[#F8FBF9] transition"
            onClick={() => galleryInputRef.current?.click()}
          >
            Upload from gallery
          </button>
        </>
      ) : (
        <div className="flex gap-2">
          <button
            className="flex-1 rounded-xl border border-[#DDE9E3] bg-white px-3 py-3 text-sm font-medium text-[#17392C] hover:bg-[#F8FBF9] transition"
            onClick={() => setPreview(null)}
            disabled={loading}
          >
            Retake
          </button>

          <button
            className="flex-1 rounded-xl bg-[#17392C] px-3 py-3 text-sm font-medium text-white hover:bg-[#24513F] transition disabled:opacity-60"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      )}
    </div>
  );
}