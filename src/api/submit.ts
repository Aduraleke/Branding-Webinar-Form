// pages/api/submit.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { fullName, email, phone, hasLogo, goal, journeyStage } = req.body;

  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbwKVZrLo5X8atUQbm8jrP8Kb38S6BCc74wtk471LCA8HhuSpBUk96kc5DStVtRlatqvbw/exec";

  try {
    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        hasLogo,
        goal,
        journeyStage,
      }),
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      if (response.ok && data.result === "success") {
        return res.status(200).json({ message: data.message });
      } else {
        return res
          .status(400)
          .json({ message: data.message || "Submission failed" });
      }
    } catch (jsonErr) {
      console.error("❌ JSON parse failed:", text);
      return res
        .status(500)
        .json({ message: "Google Script did not return valid JSON." });
    }
  } catch (err: any) {
    console.error("❌ Fetch error:", err);
    return res
      .status(500)
      .json({ message: "Server error while submitting to Google Script." });
  }
}
