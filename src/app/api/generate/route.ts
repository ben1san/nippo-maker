import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { ratelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

// Edge Runtimeを使用
export const runtime = "edge";

export async function POST(req: Request) {
  console.log("🟢 Request received at /api/generate");

  try {
    // 1. データ取得
    const { prompt, tone } = await req.json();
    console.log("📝 Prompt received length:", prompt?.length);

    // 2. システムプロンプト作成
    let systemPrompt = "あなたは優秀なビジネスパーソンです。入力されたチャットログやメモを元に、上司に提出する適切な「日報」を作成してください。挨拶や不要な会話は削除し、Markdown形式で出力してください。";

    if (tone === "reflective") systemPrompt += "\n【重要】反省モード: 失敗や課題に対して真摯に向き合い、改善策を具体的に提示する謙虚なトーンで。";
    if (tone === "confident") systemPrompt += "\n【重要】自信モード: 成果をアピールし、ポジティブな言葉選びで。";
    if (tone === "bullet") systemPrompt += "\n【重要】箇条書きモード: 事実のみを簡潔に羅列。";

    // 3. レートリミット (デバッグ中はコメントアウト推奨ですが、残しておきます)
    // もし429エラーが出るならここをコメントアウトしてください
    const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      console.log("🔴 Rate limit exceeded");
      return new Response("Too many requests", { status: 429 });
    }

    console.log("🚀 Calling Gemini API via Vercel SDK...");

    // 4. 生成 & ストリーミング
    // 【重要】ここで models/gemini-1.5-flash を明示的に指定します
    const result = await streamText({
      model: google("models/gemini-3-flash-preview"),
      system: systemPrompt,
      prompt: `以下のログを日報に整形してください:\n\n${prompt}`,
      onFinish: ({ text }) => {
        console.log("✅ Generation finished. Length:", text.length);
        console.log("✅ Generation finished. Text:", text);
      },
    });

    // レスポンスを返却
    return result.toTextStreamResponse();

  } catch (error: any) {
    // エラーの詳細をコンソールに表示
    console.error("💥 Critical Error in route.ts:", error);

    // クライアントにもエラー内容を返す
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      details: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}