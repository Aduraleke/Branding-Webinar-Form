export const submitToGoogle = async (formData: {
  fullName: string;
  email: string;
  phone: string;
  brand: string;
  hasLogo: string;
  journeyStage: string;
}) => {
  const payload = {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    hasLogo: formData.hasLogo,
    goal: formData.brand,
    journeyStage: formData.journeyStage,
  };

  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json(); // Safe now because server handled it
  if (!res.ok) throw new Error(result.message || "Submission failed");

  return result.message;
};
