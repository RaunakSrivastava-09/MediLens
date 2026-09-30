// Every AI prompt template used across MediLens lives here — one place to
// tune wording without hunting through API routes.

const LANGUAGE_NAMES = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  mr: "Marathi",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  ur: "Urdu"
};

export function languageName(code) {
  return LANGUAGE_NAMES[code] || "English";
}

export function extractionPrompt() {
  return `You are reading a photo of a doctor's prescription or a medicine strip.
Extract every medicine you can identify. For each medicine, return:
- name (string)
- dosage (string, e.g. "500mg")
- frequency (string, e.g. "twice daily")
- confidence (number from 0 to 1, how sure you are about the reading)

If handwriting is unclear, still provide your best guess and lower the confidence score.
Respond ONLY with valid JSON in this exact shape, no extra text:
{
  "medicines": [
    { "name": "...", "dosage": "...", "frequency": "...", "confidence": 0.9 }
  ]
}`;
}

export function explanationPrompt(medicineName, languageCode) {
  const language = languageName(languageCode);
  return `Explain the medicine "${medicineName}" for a patient with no medical background.
Respond in ${language}.
Cover exactly these three things, briefly and in plain language:
1. What it is commonly used for
2. Common side effects
3. Standard/typical timing (e.g. before or after food, how many times a day)

Respond ONLY with valid JSON in this exact shape, no extra text, with all text values written in ${language}:
{
  "purpose": "...",
  "sideEffects": "...",
  "timing": "..."
}`;
}

export function interactionPrompt(activeMedicines, newMedicine, languageCode) {
  const language = languageName(languageCode);
  return `A patient is currently taking: ${activeMedicines.join(", ") || "no other medicines"}.
They have just been prescribed: ${newMedicine}.

Are there any well-known interactions between "${newMedicine}" and the medicines they are already taking?
Respond in ${language}, in simple non-clinical language.
If you are not confident about an interaction, say so clearly rather than guessing.

Respond ONLY with valid JSON in this exact shape, no extra text:
{
  "hasInteraction": true,
  "withMedicine": "...",
  "explanation": "...",
  "suggestedAction": "...",
  "confidence": "low"
}
(confidence should be "low", "medium", or "high". If there is no known interaction, set hasInteraction to false and leave the other fields as empty strings.)`;
}
