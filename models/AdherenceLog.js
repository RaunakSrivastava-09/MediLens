import mongoose from "mongoose";

const AdherenceLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reminderId: { type: mongoose.Schema.Types.ObjectId, ref: "Reminder", required: true },
    medicineName: { type: String, required: true },
    scheduledFor: { type: Date, required: true },
    takenStatus: { type: String, enum: ["taken", "missed", "pending"], default: "pending" },
    takenAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.models.AdherenceLog || mongoose.model("AdherenceLog", AdherenceLogSchema);
