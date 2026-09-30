import DashboardNavbar from "@/components/DashboardNavbar";
import AdherenceTracker from "@/components/AdherenceTracker";

export default function AdherencePage() {
  return (
    <div>
    <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-lg font-semibold mb-2">Adherence</h1>
        <AdherenceTracker />
      </div>
    </div>
  );
}
