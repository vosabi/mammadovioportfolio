"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Yükləmə uğursuz oldu");
      return;
    }
    const body = await res.json();
    onChange(body.url);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#6B6862]">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#DEDCD6] bg-[#F4F3F0]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[11px] text-[#A5A29B]">Şəkil yoxdur</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-[#DEDCD6] bg-white px-4 py-2 text-sm font-medium hover:bg-[#F4F3F0] disabled:opacity-50"
          >
            {uploading ? "Yüklənir..." : "Şəkil seç"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-sm text-[#A5A29B] hover:text-[#1A1918]"
            >
              Sil
            </button>
          )}
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
