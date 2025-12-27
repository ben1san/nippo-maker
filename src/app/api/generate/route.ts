import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { ratelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

export const runtime = "edge";

export async function POST(req: Request) {
  // 1. レートリミット
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }

  // 2. データ取得
  const { prompt, tone } = await req.json();

  // 3. プロンプト作成
  let systemPrompt = "あなたは優秀なビジネスパーソンです。入力されたチャットログやメモを元に、上司に提出する適切な「日報」を作成してください。挨拶や不要な会話は削除し、Markdown形式で出力してください。";

  if (tone === "reflective") systemPrompt += "\n【重要】反省モード: 失敗や課題に対して真摯に向き合い、改善策を具体的に提示する謙虚なトーンで。";
  if (tone === "confident") systemPrompt += "\n【重要】自信モード: 成果をアピールし、ポジティブな言葉選びで。";
  if (tone === "bullet") systemPrompt += "\n【重要】箇条書きモード: 事実のみを簡潔に羅列。";
  if (tone === "normal") systemPrompt += "\n【重要】通常モード: 丁寧かつ簡潔に。";

  // 4. 生成 & ストリーミング (最新の書き方)
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    prompt: `以下のログを日報に整形してください:\n\n${prompt}`,
  });

  return result.toTextStreamResponse();
}