import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redisインスタンスの作成
// .env.localに UPSTASH_REDIS_REST_URL と UPSTASH_REDIS_REST_TOKEN が必要です
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// レートリミットの設定
// "10 requests per 10 seconds" (10秒間に10回まで)
// MVP開発中のテストがしやすいように少し緩めにしていますが、本番では "5 requests per 1 day" などに厳しくします
export const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});