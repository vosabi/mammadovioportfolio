import { NextResponse } from "next/server";
import { getContent, saveContent, type SiteContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body) {
    return NextResponse.json({ error: "Yanlış məlumat" }, { status: 400 });
  }
  await saveContent(body);
  return NextResponse.json({ ok: true });
}
