export function GET() {
  return new Response("Gone", { status: 410 });
}

export function HEAD() {
  return new Response(null, { status: 410 });
}
