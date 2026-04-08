import { NextRequest } from "next/server";

function clientIp(request: NextRequest): string {
  const headers = request.headers;

  const forwarded = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const cfIp = headers.get("cf-connecting-ip");

  let ip = cfIp || realIp;

  if (!ip && forwarded) {
    const ips = forwarded.split(",").map((i) => i.trim());
    ip = ips[0]; // first = original client
  }

  if (!ip) return "unknown";
  if (ip === "::1" || ip === "127.0.0.1") return "localhost";

  return /^[a-fA-F0-9:.]+$/.test(ip) ? ip : "unknown";
}

export { clientIp };
