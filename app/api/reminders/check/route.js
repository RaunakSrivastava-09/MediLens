// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Reminder from "@/models/Reminder";
// import User from "@/models/User";
// import AdherenceLog from "@/models/AdherenceLog";
// import { sendReminderEmail } from "@/lib/mailer";

// // This route is the target Vercel Cron hits every few minutes (see
// // vercel.json). It finds reminders due "right now" and emails them.
// // Protected by CRON_SECRET so it can't be triggered by anyone else.
// export async function GET(req) {
//   const authHeader = req.headers.get("authorization");
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   const now = new Date();
//   const hh = String(now.getHours()).padStart(2, "0");
//   const mm = String(now.getMinutes()).padStart(2, "0");
//   const currentTime = `${hh}:${mm}`;
//   const slotKey = `${now.toISOString().slice(0, 10)}T${currentTime}`;

//   const dueReminders = await Reminder.find({
//     isActive: true,
//     times: currentTime,
//     lastSentSlot: { $ne: slotKey }
//   });

//   let sentCount = 0;

//   for (const reminder of dueReminders) {
//     const user = await User.findById(reminder.userId);
//     if (!user || !user.reminderNotificationsEnabled) continue;

//     await sendReminderEmail({
//       to: user.email,
//       medicineName: reminder.medicineName,
//       time: currentTime
//     });

//     await AdherenceLog.create({
//       userId: reminder.userId,
//       reminderId: reminder._id,
//       medicineName: reminder.medicineName,
//       scheduledFor: now,
//       takenStatus: "pending"
//     });

//     reminder.lastSentSlot = slotKey;
//     await reminder.save();
//     sentCount++;
//   }

//   return NextResponse.json({ checked: dueReminders.length, sent: sentCount });
// }



import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Reminder from "@/models/Reminder";
import User from "@/models/User";
import AdherenceLog from "@/models/AdherenceLog";
import { sendReminderEmail } from "@/lib/mailer";

export async function GET(req) {
  // Protect the cron endpoint
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    // Get current time specifically in India
    const now = new Date();

    const indiaTime = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const hh = indiaTime.find(
      (part) => part.type === "hour"
    ).value;

    const mm = indiaTime.find(
      (part) => part.type === "minute"
    ).value;

    const currentTime = `${hh}:${mm}`;

    // Get today's date in India
    const dateParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);

    const year = dateParts.find(
      (part) => part.type === "year"
    ).value;

    const month = dateParts.find(
      (part) => part.type === "month"
    ).value;

    const day = dateParts.find(
      (part) => part.type === "day"
    ).value;

    const indiaDate = `${year}-${month}-${day}`;

    const slotKey = `${indiaDate}T${currentTime}`;

    console.log(
      `MediLens cron checking reminders at India time: ${slotKey}`
    );

    const dueReminders = await Reminder.find({
      isActive: true,
      times: currentTime,
      lastSentSlot: { $ne: slotKey },
    });

    let sentCount = 0;

    for (const reminder of dueReminders) {
      const user = await User.findById(reminder.userId);

      if (!user) {
        continue;
      }

      if (!user.reminderNotificationsEnabled) {
        continue;
      }

      if (!user.email) {
        continue;
      }

      await sendReminderEmail({
        to: user.email,
        medicineName: reminder.medicineName,
        time: currentTime,
      });

      await AdherenceLog.create({
        userId: reminder.userId,
        reminderId: reminder._id,
        medicineName: reminder.medicineName,
        scheduledFor: now,
        takenStatus: "pending",
      });

      reminder.lastSentSlot = slotKey;

      await reminder.save();

      sentCount++;
    }

    return NextResponse.json({
      success: true,
      checked: dueReminders.length,
      sent: sentCount,
      currentTime,
      indiaDate,
    });
  } catch (error) {
    console.error("Reminder cron error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process reminders",
      },
      { status: 500 }
    );
  }
}