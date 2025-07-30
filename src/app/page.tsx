import WebinarForm from "@/components/WebinarForm";
import { Toaster } from "sonner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#d9e8fc] flex items-center justify-center px-4">
      <WebinarForm />
      <Toaster richColors position="top-center" />
    </main>
  );
}
