import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT || 465),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    });
  }
  return transporter;
}

/**
 * Sends a single medicine reminder email.
 */
export async function sendReminderEmail({ to, medicineName, time }) {
  const t = getTransporter();
  return t.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Reminder: time to take ${medicineName}`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2 style="color:#173B2E;">MediLens Reminder</h2>
        <p>It's ${time} — time to take <strong>${medicineName}</strong>.</p>
        <p style="color:#5B6B64;font-size:13px;">This is an automated reminder from MediLens. Informational only — always follow your doctor's instructions.</p>
      </div>
    `
  });
}

/**
 * Sends a caregiver notification when a family member misses a dose.
 */
export async function sendMissedDoseEmail({ to, dependentName, medicineName, time }) {
  const t = getTransporter();
  return t.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `${dependentName} missed a dose`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2 style="color:#C98A2C;">Missed Dose Alert</h2>
        <p>${dependentName} may have missed their ${time} dose of <strong>${medicineName}</strong>.</p>
      </div>
    `
  });
}
