import DashboardNavbar from "@/components/DashboardNavbar";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <DashboardNavbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E4F5EC] px-2.5 py-1 text-[10px] font-semibold text-[#2F8F68] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F68]" />
            Prescription scanner
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.025em]">
            Scan your prescription
          </h1>

          <p className="text-xs sm:text-sm text-[#71837B] mt-1.5">
            Upload a clear prescription to extract your medicines.
          </p>
        </div>

        {/* Upload */}
        <div className="bg-white border border-[#DDE9E3] rounded-[22px] p-4 sm:p-5 shadow-sm">
          <UploadForm />

          {/* Compact tip */}
          <div className="flex items-center gap-2.5 bg-[#E8F5EE] rounded-xl px-3 py-2.5 mt-4">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="#2C6B52"
                strokeWidth="1.7"
              />
              <path
                d="M12 8h.01M12 11v5"
                stroke="#2C6B52"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <p className="text-[11px] text-[#557267] leading-4">
              Keep the prescription flat and well-lit for the best results.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}