import { Copy, ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/AdminCard.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { deleteMediaAsset, listMediaAssets, uploadMediaAsset } from "../../lib/siteApi.js";

export default function AdminMediaPage() {
  const { addToast } = useToast();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    setLoading(true);
    try {
      const data = await listMediaAssets();
      setAssets(data);
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadMediaAsset(file);
      await loadAssets();
      addToast("Media uploaded");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleDelete(asset) {
    if (!window.confirm(`Delete "${asset.name}"?`)) return;
    try {
      await deleteMediaAsset(asset);
      await loadAssets();
      addToast("Media deleted");
    } catch (error) {
      addToast(error.message, "error");
    }
  }

  async function copyUrl(url) {
    await navigator.clipboard.writeText(url);
    addToast("Image URL copied");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Media Library</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Media</h1>
      </div>

      <AdminCard
        title="Storage uploads"
        description="Upload images once, then paste their URLs into projects or theme settings."
        action={
          <label className="cinema-button cursor-pointer">
            <ImagePlus size={16} />
            {uploading ? "Uploading..." : "Upload image"}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        }
      >
        {loading ? (
          <p className="text-sm text-zinc-500">Loading media…</p>
        ) : assets.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {assets.map((asset) => (
              <article key={asset.id} className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                <div className="aspect-[4/3] bg-black">
                  <img src={asset.public_url} alt={asset.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <p className="truncate text-sm font-medium text-zinc-100">{asset.name}</p>
                    <p className="mt-1 truncate text-xs text-zinc-500">{asset.public_url}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => copyUrl(asset.public_url)} className="rounded-2xl border border-white/10 px-3 py-2 text-sm">
                      <Copy size={14} className="inline" /> Copy URL
                    </button>
                    <button type="button" onClick={() => handleDelete(asset)} className="rounded-2xl border border-red-400/20 px-3 py-2 text-sm text-red-200">
                      <Trash2 size={14} className="inline" /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No uploaded images yet.</p>
        )}
      </AdminCard>
    </div>
  );
}

