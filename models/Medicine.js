import mongoose from "mongoose";

// Cache of AI-generated explanations, keyed by (name + language), so the
// same medicine in the same language is never re-explained via the AI API.
const MedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    language: { type: String, required: true, default: "en" },
    purpose: { type: String, required: true },
    sideEffects: { type: String, required: true },
    timing: { type: String, required: true },
    lastFetchedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

MedicineSchema.index({ name: 1, language: 1 }, { unique: true });

export default mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
