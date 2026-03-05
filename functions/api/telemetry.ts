interface Env {
  OBSERVABILITY_API_ENABLED?: string;
}

interface FunctionContext {
  request: Request;
  env: Env;
}

interface CfRequest extends Request {
  cf?: {
    colo?: string;
    country?: string;
    asn?: number;
  };
}

type TelemetryEvent = {
  event: "page_view";
  path: string;
  ts: number;
};

const MAX_BODY_BYTES = 1024;

function isEnabled(env: Env): boolean {
  return env.OBSERVABILITY_API_ENABLED === "true";
}

function toSafePath(input: unknown): string | null {
  if (typeof input !== "string" || input.length === 0 || input.length > 200) return null;
  if (!input.startsWith("/")) return null;
  if (input.includes("://")) return null;
  const pathOnly = input.split("?")[0].split("#")[0];
  return pathOnly.replace(/[^a-zA-Z0-9\-/_]/g, "");
}

function parseEvent(body: unknown): TelemetryEvent | null {
  if (!body || typeof body !== "object") return null;
  const event = body as Partial<TelemetryEvent>;
  if (event.event !== "page_view") return null;
  const safePath = toSafePath(event.path);
  if (!safePath) return null;
  if (typeof event.ts !== "number" || !Number.isFinite(event.ts)) return null;
  return { event: "page_view", path: safePath, ts: Math.floor(event.ts) };
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const url = new URL(request.url);
  return origin === url.origin;
}

export const onRequestPost = async ({ request, env }: FunctionContext) => {
  if (!isEnabled(env)) {
    return new Response(null, { status: 204 });
  }

  if (!isSameOrigin(request)) {
    return new Response("forbidden", { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return new Response("unsupported media type", { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return new Response("payload too large", { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  const event = parseEvent(parsed);
  if (!event) {
    return new Response("invalid payload", { status: 400 });
  }

  const url = new URL(request.url);
  const cf = (request as CfRequest).cf ?? {};

  console.log(
    JSON.stringify({
      type: "telemetry",
      event: event.event,
      path: event.path,
      site_host: url.host,
      colo: cf.colo ?? null,
      country: cf.country ?? null,
      asn: cf.asn ?? null,
      ts: event.ts,
    })
  );

  return new Response(null, {
    status: 204,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });
};
