import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
    medicineName: { type: String, required: true },
    times: [{ type: String, required: true }], // "08:00", "20:00" (24hr, local time)
    isActive: { type: Boolean, default: true },
    lastSentSlot: { type: String, default: null } // "2026-09-30T08:00" to prevent duplicate sends
  },
  { timestamps: true }
);

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
