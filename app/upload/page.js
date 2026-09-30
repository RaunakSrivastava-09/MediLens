import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-10">
        <h1 className="text-lg font-semibold mb-6">Scan prescription</h1>
        <UploadForm />
        <div className="flex gap-2.5 bg-mint-tint rounded-md2 px-3.5 py-3 mt-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="9.5" stroke="#2C6B52" strokeWidth="1.7" />
            <path d="M12 8h.01M12 11v5" stroke="#2C6B52" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <p className="text-[11.5px] text-forest-light leading-relaxed">
            Keep the prescription flat and well-lit for the most accurate reading.
          </p>
        </div>
      </div>
    </div>
  );
}
