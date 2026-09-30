import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    preferredLanguage: { type: String, default: "en" }, // en, hi, bn, ta, te, mr, gu, kn, ml, pa, ur
    voiceOutputEnabled: { type: Boolean, default: true },
    reminderNotificationsEnabled: { type: Boolean, default: true },
    // For family/dependent profiles: if this user is managed by a caregiver,
    // managedBy points to the caregiver's User._id. Null for independent adults.
    managedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    relationLabel: { type: String, default: null } // e.g. "Mother", "Father", "Son"
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
