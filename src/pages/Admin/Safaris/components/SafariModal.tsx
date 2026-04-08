import type { Safari, Subcategory } from "./useSafaris";
import { useState, useEffect } from "react";
import SafariImagesManager from "./SafariImagesManager";

interface Props {
  safari?: Safari;
  subcategories: Subcategory[];
  onClose: () => void;
  onSave: () => void;
}

export default function SafariModal({
  safari,
  subcategories,
  onClose,
  onSave,
}: Props) {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState<Partial<Safari>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(safari || {});
  }, [safari]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) return;

    setSaving(true);
    const form = new FormData();
    form.append("id", formData.id);
    form.append("title", formData.title || "");
    form.append("destination", formData.destination || "");
    form.append("description", formData.description || "");
    form.append("duration_label", formData.duration_label || "");
    form.append("currency", formData.currency || "");
    form.append("price_from", String(formData.price_from || ""));
    form.append("price_note", formData.price_note || "");
    form.append("subcategory_id", String(formData.subcategory_id || ""));

    await fetch(`${API}/safaris/safaris/update_safari.php`, {
      method: "POST",
      body: form,
    });

    setSaving(false);
    onSave();
  };
  const labelClass ="block text-xs uppercase tracking-[0.15em] font-medium text-[#1A0A0B] mb-1";
  return (
    <div className="fixed inset-0 flex justify-center items-start md:items-center p-4 z-50 backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh] p-6">
        <h3 className="text-2xl font-light uppercase tracking-widest text-[#1A0A0B] mb-6">
          {safari ? "Edit Safari" : "Add Safari"}
        </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className={labelClass}>Title</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass}>Subcategory</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.subcategory_id || ""}
            onChange={(e) =>
              setFormData({ ...formData, subcategory_id: Number(e.target.value) })
            }
          >
            {subcategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Destination</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.destination || ""}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass}>Duration</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.duration_label || ""}
            onChange={(e) =>
              setFormData({ ...formData, duration_label: e.target.value })
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            rows={4}
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass}>Currency</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.currency || ""}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass}>Price From</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.price_from || ""}
            onChange={(e) =>
              setFormData({ ...formData, price_from: Number(e.target.value) })
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Price Note</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5D547]"
            value={formData.price_note || ""}
            onChange={(e) => setFormData({ ...formData, price_note: e.target.value })}
          />
        </div>

        {/* Images manager */}
        {formData.id && (
          <div className="md:col-span-2">
            <label className={labelClass}>Images</label>
            <SafariImagesManager safariId={formData.id} />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 md:col-span-2 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm uppercase tracking-wide bg-gray-300 rounded hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-sm uppercase tracking-wide bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

      </form>
      </div>
    </div>
  );
}