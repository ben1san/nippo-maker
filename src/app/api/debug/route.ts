// src/app/api/debug/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API Keyが見つかりません" }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // モデル一覧を取得する機能はSDKのバージョンによって差異があるため、
    // ここでは最も確実な「単純な生成テスト」を行います。
    // もしこれで動けば、モデル名の問題です。

    // 試しに "gemini-1.5-flash" で動くかテスト
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent("Test");
    const response = await result.response;

    return NextResponse.json({
      status: "Success",
      message: "gemini-1.5-flash は正常に動作しました",
      text: response.text()
    });

  } catch (error: any) {
    return NextResponse.json({
      status: "Error",
      message: error.message,
      hint: "APIキーが間違っているか、Google AI StudioでAPIが有効になっていない可能性があります。"
    }, { status: 500 });
  }
}