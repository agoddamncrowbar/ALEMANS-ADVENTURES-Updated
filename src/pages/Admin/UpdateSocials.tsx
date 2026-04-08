import { useState } from "react";
import AdminHeader from "./components/adminHeader";

const platforms = [
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "tripadvisor", label: "TripAdvisor" },
];

export default function UpdateSocials() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform || !url) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/socials/socials.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform, url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Social link added successfully");
      setPlatform("");
      setUrl("");
    } catch (err: any) {
      setMessage(err.message || "Failed to add link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <AdminHeader />
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-xl mx-auto space-y-8">

        <div>
          <div className="w-12 h-px bg-[#F5D547] mb-6"></div>
          <h1 className="text-3xl font-light uppercase tracking-[0.15em] text-[#1A0A0B]">
            Add Social Link
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Platform */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm"
            >
              <option value="">Select platform</option>
              {platforms.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-2">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 px-4 py-2.5 text-sm"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-gray-600">{message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="border border-[#1A0A0B] px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-[#1A0A0B] hover:text-white transition"
          >
            {loading ? "Saving..." : "Add Link"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}