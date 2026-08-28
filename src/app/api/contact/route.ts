import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Field length caps — prevents abuse / oversized payloads.
const MAX = {
  name: 120,
  email: 254, // RFC 5321 practical max
  business: 160,
  need: 2000,
};

// Simple in-memory rate limit: max 5 submissions / IP / 10 minutes.
// Adequate for a marketing site; swap for Redis in a scaled deployment.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, { count: number; firstAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, firstAt: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

function getClientIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = getClientIp(req);
    if (rateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many messages from your network. Please try again shortly.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim().slice(0, MAX.name) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, MAX.email) : "";
    const business =
      typeof body.business === "string" ? body.business.trim().slice(0, MAX.business) : "";
    const need = typeof body.need === "string" ? body.need.trim().slice(0, MAX.need) : "";

    if (!name || !email || !need) {
      return NextResponse.json(
        { ok: false, error: "Name, email and a description of what you need are required." },
        { status: 422 }
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 422 }
      );
    }

    const message = await db.contactMessage.create({
      data: {
        name,
        email,
        business: business || null,
        need,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json(
      {
        ok: true,
        id: message.id,
        createdAt: message.createdAt,
        message: "Thanks! We'll reply within a day — usually a lot faster.",
      },
      { status: 201 }
    );
  } catch (err) {
    // Never leak internal error details to the client.
    console.error("[contact] create error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Try WhatsApp." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "Heka Enterprise contact",
    methods: ["POST"],
  });
}
