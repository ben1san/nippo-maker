"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export default function NippoForm() {
  const [tone, setTone] = useState("normal");
  const [mounted, setMounted] = useState(false);

  // 自前で管理するステート
  const [input, setInput] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ■ 修正ポイント: useCompletionを使わず、標準のfetchで実装
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.warning("チャットログを入力してください");
      return;
    }

    setIsLoading(true);
    setCompletion(""); // 結果をリセット

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, tone: tone }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Vercel AI SDKのデータ形式を行ごとに処理
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.trim() === "") continue;

          // ケースA: Vercel AI SDKのプロトコル (0:"...") の場合
          if (line.startsWith('0:"')) {
            try {
              // JSONとしてパースすると、\n が本当の改行に変換されます
              const content = JSON.parse(line.slice(2));
              setCompletion((prev) => prev + content);
            } catch (e) {
              console.log("JSON Parse Error", e);
            }
          }
          // ケースB: 生のテキストが来ている場合 (念のため)
          else {
            setCompletion((prev) => prev + line);
          }
        }
      }

    } catch (error: any) {
      console.error("Fetch error:", error);
      toast.error("エラーが発生しました: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(completion);
    toast.success("コピーしました！");
  };

  const handleRegenerate = (e: any) => {
    handleManualSubmit(e);
  };

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto p-4">
      {/* 入力エリア */}
      <Card className="h-full flex flex-col shadow-lg">
        <CardHeader>
          <CardTitle>チャットログ入力</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <form onSubmit={handleManualSubmit} className="h-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="tone">今日の気分（トーン設定）</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="トーンを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">通常モード (丁寧)</SelectItem>
                  <SelectItem value="reflective">反省モード (改善重視)</SelectItem>
                  <SelectItem value="confident">自信満々モード (成果重視)</SelectItem>
                  <SelectItem value="bullet">箇条書きモード (簡潔)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 flex flex-col gap-2 min-h-[300px]">
              <Label htmlFor="input">チャットログ / メモ</Label>
              <Textarea
                id="input"
                name="prompt"
                placeholder="ここにSlackやTeamsのログを貼り付けてください..."
                className="flex-1 resize-none p-4 font-mono text-sm leading-relaxed"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full font-bold">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                "日報を生成する ✨"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 出力エリア */}
      <Card className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>生成結果</CardTitle>
          <div className="flex gap-2">
            {completion && (
              <Button variant="outline" size="sm" onClick={handleRegenerate}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                再生成
              </Button>
            )}
            <Button variant="default" size="sm" onClick={handleCopy} disabled={!completion}>
              <Copy className="h-4 w-4 mr-2" />
              コピー
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative">
          {completion ? (
            <div className="absolute inset-0 p-4 overflow-auto">
              <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap bg-white dark:bg-black rounded-md border p-4 shadow-sm min-h-full">
                {/* もし "0:" などのゴミが表示されてしまう場合は、
                  以下の replace で簡易的に消すことができます 
                */}
                {completion}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm p-8 border-2 border-dashed m-4 rounded-lg">
              {isLoading ? "AIが考え中..." : "左側のフォームに入力して生成ボタンを押してください"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}