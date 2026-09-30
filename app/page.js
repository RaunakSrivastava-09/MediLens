import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="chip bg-mint-tint text-forest-light mb-5">
            AI-powered medication companion
          </div>
          <h1 className="font-serif text-5xl leading-[1.12] mb-5">
            Understand every
            <br />
            prescription, in your
            <br />
            <em className="text-forest-light not-italic font-serif italic">own language.</em>
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed max-w-md mb-8">
            Photograph a prescription or medicine strip and MediLens explains what it&apos;s for, when to
            take it, and reminds you — automatically, every time.
          </p>
          <div className="flex gap-3.5 mb-10">
            <Link href="/register" className="btn btn-primary">
              Scan a prescription
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary">
              See how it works
            </Link>
          </div>
          <div className="flex gap-10 pt-7 border-t border-line max-w-md">
            <div>
              <p className="font-serif text-2xl font-semibold">10+</p>
              <p className="text-xs text-ink-soft mt-1">Regional languages</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold">92%</p>
              <p className="text-xs text-ink-soft mt-1">Avg. adherence rate</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold">0</p>
              <p className="text-xs text-ink-soft mt-1">Prompts needed</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <p className="text-sm font-semibold mb-3">Amoxicillin 500mg</p>
          <div className="card p-3.5 mb-3">
            <p className="text-[11px] text-ink-soft mb-1.5">Used for</p>
            <p className="text-[12.5px] leading-relaxed">
              Treats bacterial infections such as chest and throat infections.
            </p>
          </div>
          <div className="bg-mint-tint rounded-md2 p-3.5 flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] rounded-full bg-forest flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="#fff" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-forest">सुनें — हिन्दी में</span>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="bg-forest">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-9">
          {[
            { title: "Plain-language explanations", text: "No medical jargon — just what a medicine does, in words anyone can follow." },
            { title: "Automatic reminders", text: "Set intake times once — reminders happen on their own, no follow-up needed." },
            { title: "Interaction warnings", text: "Every new prescription is checked against what you're already taking." },
            { title: "Voice in your language", text: "Every explanation can be read aloud in Hindi and other regional languages." }
          ].map((f) => (
            <div key={f.title}>
              <div className="w-[38px] h-[38px] rounded-[10px] bg-white/10 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-white text-[17px] font-semibold mb-2">{f.title}</h3>
              <p className="text-[#C9D8D0] text-[13.5px] leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
