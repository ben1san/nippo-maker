"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export default function NippoForm() {
  const [tone, setTone] = useState("normal");

  // Vercel AI SDKのフック
  const { complete, completion, isLoading, input, handleInputChange, setInput } =
    useCompletion({
      api: "/api/generate",
      body: { tone }, // APIにトーン情報を渡す
      onError: (error: any) => {
        toast.error("エラーが発生しました: " + error.message);
      },
    });

  // 日報生成ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.warning("チャットログを入力してください");
      return;
    }
    await complete(input);
  };

  // コピー機能
  const handleCopy = () => {
    navigator.clipboard.writeText(completion);
    toast.success("クリップボードにコピーしました！");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto p-4">
      {/* 入力エリア */}
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>チャットログ入力</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
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
                placeholder="ここにSlackやTeamsのログを貼り付けてください..."
                className="flex-1 resize-none p-4 font-mono text-sm"
                value={input}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
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
      <Card className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>生成結果</CardTitle>
          <div className="flex gap-2">
            {completion && (
              <Button variant="outline" size="sm" onClick={() => complete(input)}>
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
        <CardContent className="flex-1">
          {completion ? (
            <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap p-4 bg-white dark:bg-black rounded-md border shadow-sm h-full overflow-auto">
              {completion}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              左側のフォームに入力して生成ボタンを押してください
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}