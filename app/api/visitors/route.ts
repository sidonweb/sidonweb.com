import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET() {
  const count = await redis.incr("portfolio-visits");

  return Response.json({
    count,
  });
}