// app/api/visitors/route.ts

export async function GET() {
  const res = await fetch("https://api.counterapi.dev/v1/sidonweb/portfolio/up");
  const data = await res.json();

  return Response.json(data);
}