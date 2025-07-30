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
    console.log("🔥 Google Script Raw Response:", text);

    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error("❌ JSON parse error:", jsonErr);
      return res
        .status(500)
        .json({ message: "Invalid JSON returned from Google Script." });
    }

    if (!response.ok || data.result !== "success") {
      return res
        .status(400)
        .json({ message: data.message || "Submission failed" });
    }

    return res.status(200).json({ message: data.message });
  } catch (err: any) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ message: "Server error while submitting." });
  }
}
