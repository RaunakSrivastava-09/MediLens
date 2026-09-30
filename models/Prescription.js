import mongoose from "mongoose";

const ExtractedMedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dosage: String,
    frequency: String,
    confidence: { type: Number, default: 0 }
  },
  { _id: false }
);

const PrescriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    doctorName: { type: String, default: "" },
    courseDays: { type: Number, default: null }, // e.g. 7 for a 7-day course
    extractedMedicines: [ExtractedMedicineSchema],
    status: { type: String, enum: ["active", "completed"], default: "active" }
  },
  { timestamps: true }
);

export default mongoose.models.Prescription || mongoose.model("Prescription", PrescriptionSchema);
