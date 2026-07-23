"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/content";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const inputClass =
  "w-full rounded-lg border border-[#DEDCD6] bg-white px-3 py-2 text-sm outline-none focus:border-[#1A1918]";
const labelClass = "mb-1.5 block text-sm font-medium text-[#6B6862]";

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={inputClass}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#ECEAE5] bg-white p-6">
      <h2 className="mb-5 text-lg font-semibold text-[#1A1918]">{title}</h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSave = async () => {
    if (!content) return;
    setStatus("saving");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(res.ok ? "saved" : "error");
    setTimeout(() => setStatus("idle"), 2000);
  };

  if (!content) {
    return <div className="flex min-h-screen items-center justify-center text-[#6B6862]">Yüklənir...</div>;
  }

  const update = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setContent((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="min-h-screen bg-[#F4F3F0] pb-24">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#ECEAE5] bg-white/90 px-6 py-4 backdrop-blur">
        <h1 className="text-base font-semibold">Admin Panel</h1>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-sm text-[#6B6862] underline decoration-[#DEDCD6] hover:text-[#1A1918]"
          >
            Saytı gör ↗
          </a>
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="rounded-full bg-[#1A1918] px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "saving" ? "Saxlanılır..." : status === "saved" ? "Saxlanıldı ✓" : "Yadda saxla"}
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-[#A5A29B] hover:text-[#1A1918]"
          >
            Çıxış
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-8">
        <Section title="Ümumi">
          <Field label="Ad Soyad" value={content.fullName} onChange={(v) => update("fullName", v)} />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={content.availableForWork}
              onChange={(e) => update("availableForWork", e.target.checked)}
            />
            Yeni layihələrə açığam (status pill görünsün)
          </label>
        </Section>

        <Section title="Hero">
          <ImageUploadField
            label="Foto"
            value={content.hero.photo}
            onChange={(url) => update("hero", { ...content.hero, photo: url })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Başlıq (AZ)"
              value={content.hero.titleAz}
              onChange={(v) => update("hero", { ...content.hero, titleAz: v })}
            />
            <Field
              label="Başlıq (EN)"
              value={content.hero.titleEn}
              onChange={(v) => update("hero", { ...content.hero, titleEn: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Təsvir (AZ)"
              textarea
              value={content.hero.descAz}
              onChange={(v) => update("hero", { ...content.hero, descAz: v })}
            />
            <Field
              label="Təsvir (EN)"
              textarea
              value={content.hero.descEn}
              onChange={(v) => update("hero", { ...content.hero, descEn: v })}
            />
          </div>
        </Section>

        <Section title="Sosial linklər">
          <Field
            label="GitHub URL"
            value={content.social.github}
            onChange={(v) => update("social", { ...content.social, github: v })}
          />
          <Field
            label="LinkedIn URL"
            value={content.social.linkedin}
            onChange={(v) => update("social", { ...content.social, linkedin: v })}
          />
          <Field
            label="E-poçt"
            value={content.social.email}
            onChange={(v) => update("social", { ...content.social, email: v })}
          />
        </Section>

        <Section title="Xidmətlər">
          {content.services.map((svc, i) => (
            <div key={i} className="rounded-xl border border-[#ECEAE5] p-4">
              <div className="mb-3 grid grid-cols-2 gap-4">
                <Field
                  label={`Başlıq ${i + 1} (AZ)`}
                  value={svc.titleAz}
                  onChange={(v) => {
                    const next = [...content.services];
                    next[i] = { ...svc, titleAz: v };
                    update("services", next);
                  }}
                />
                <Field
                  label={`Başlıq ${i + 1} (EN)`}
                  value={svc.titleEn}
                  onChange={(v) => {
                    const next = [...content.services];
                    next[i] = { ...svc, titleEn: v };
                    update("services", next);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Təsvir (AZ)"
                  textarea
                  value={svc.descAz}
                  onChange={(v) => {
                    const next = [...content.services];
                    next[i] = { ...svc, descAz: v };
                    update("services", next);
                  }}
                />
                <Field
                  label="Təsvir (EN)"
                  textarea
                  value={svc.descEn}
                  onChange={(v) => {
                    const next = [...content.services];
                    next[i] = { ...svc, descEn: v };
                    update("services", next);
                  }}
                />
              </div>
            </div>
          ))}
        </Section>

        <Section title="Seçilmiş İşlər">
          {content.projects.map((p, i) => (
            <div key={i} className="rounded-xl border border-[#ECEAE5] p-4">
              <ImageUploadField
                label="Şəkil"
                value={p.image}
                onChange={(url) => {
                  const next = [...content.projects];
                  next[i] = { ...p, image: url };
                  update("projects", next);
                }}
              />
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Field
                  label="Başlıq (AZ)"
                  value={p.titleAz}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, titleAz: v };
                    update("projects", next);
                  }}
                />
                <Field
                  label="Başlıq (EN)"
                  value={p.titleEn}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, titleEn: v };
                    update("projects", next);
                  }}
                />
              </div>
              <div className="mt-3">
                <Field
                  label="Taqlar (vergüllə ayırın)"
                  value={p.tags.join(", ")}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, tags: v.split(",").map((s) => s.trim()).filter(Boolean) };
                    update("projects", next);
                  }}
                />
              </div>
              <div className="mt-3">
                <Field
                  label="Slug (linkdə görünür: /isler/...)"
                  value={p.slug}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, slug: v };
                    update("projects", next);
                  }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Field
                  label="Qısa təsvir / summary (AZ)"
                  textarea
                  value={p.summaryAz}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, summaryAz: v };
                    update("projects", next);
                  }}
                />
                <Field
                  label="Qısa təsvir / summary (EN)"
                  textarea
                  value={p.summaryEn}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, summaryEn: v };
                    update("projects", next);
                  }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Field
                  label="Nə etdik (AZ) — hər sətir ayrı bənd"
                  textarea
                  value={p.detailsAz.join("\n")}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, detailsAz: v.split("\n").map((s) => s.trim()).filter(Boolean) };
                    update("projects", next);
                  }}
                />
                <Field
                  label="What we built (EN) — one line per bullet"
                  textarea
                  value={p.detailsEn.join("\n")}
                  onChange={(v) => {
                    const next = [...content.projects];
                    next[i] = { ...p, detailsEn: v.split("\n").map((s) => s.trim()).filter(Boolean) };
                    update("projects", next);
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={p.full}
                    onChange={(e) => {
                      const next = [...content.projects];
                      next[i] = { ...p, full: e.target.checked };
                      update("projects", next);
                    }}
                  />
                  Tam en (böyük kart)
                </label>
                <button
                  onClick={() => update("projects", content.projects.filter((_, idx) => idx !== i))}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              update("projects", [
                ...content.projects,
                {
                  slug: `layihe-${content.projects.length + 1}`,
                  titleAz: "",
                  titleEn: "",
                  tags: [],
                  image: null,
                  full: false,
                  summaryAz: "",
                  summaryEn: "",
                  detailsAz: [],
                  detailsEn: [],
                },
              ])
            }
            className="self-start rounded-lg border border-dashed border-[#DEDCD6] px-4 py-2 text-sm text-[#6B6862] hover:bg-[#F4F3F0]"
          >
            + Layihə əlavə et
          </button>
        </Section>

        <Section title="Təcrübə">
          {content.experience.map((exp, i) => (
            <div key={i} className="rounded-xl border border-[#ECEAE5] p-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Şirkət"
                  value={exp.company}
                  onChange={(v) => {
                    const next = [...content.experience];
                    next[i] = { ...exp, company: v };
                    update("experience", next);
                  }}
                />
                <Field
                  label="Vəzifə"
                  value={exp.role}
                  onChange={(v) => {
                    const next = [...content.experience];
                    next[i] = { ...exp, role: v };
                    update("experience", next);
                  }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Field
                  label="Tarix (AZ)"
                  value={exp.dateAz}
                  onChange={(v) => {
                    const next = [...content.experience];
                    next[i] = { ...exp, dateAz: v };
                    update("experience", next);
                  }}
                />
                <Field
                  label="Tarix (EN)"
                  value={exp.dateEn}
                  onChange={(v) => {
                    const next = [...content.experience];
                    next[i] = { ...exp, dateEn: v };
                    update("experience", next);
                  }}
                />
              </div>
              <button
                onClick={() => update("experience", content.experience.filter((_, idx) => idx !== i))}
                className="mt-3 text-sm text-red-500 hover:text-red-700"
              >
                Sil
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              update("experience", [
                ...content.experience,
                { company: "", role: "", dateAz: "", dateEn: "", current: false },
              ])
            }
            className="self-start rounded-lg border border-dashed border-[#DEDCD6] px-4 py-2 text-sm text-[#6B6862] hover:bg-[#F4F3F0]"
          >
            + Təcrübə əlavə et
          </button>
        </Section>

        <Section title="Əlaqə bölməsi">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Başlıq (AZ)"
              value={content.contact.headingAz}
              onChange={(v) => update("contact", { ...content.contact, headingAz: v })}
            />
            <Field
              label="Başlıq (EN)"
              value={content.contact.headingEn}
              onChange={(v) => update("contact", { ...content.contact, headingEn: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Təsvir (AZ)"
              textarea
              value={content.contact.descAz}
              onChange={(v) => update("contact", { ...content.contact, descAz: v })}
            />
            <Field
              label="Təsvir (EN)"
              textarea
              value={content.contact.descEn}
              onChange={(v) => update("contact", { ...content.contact, descEn: v })}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
