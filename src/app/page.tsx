import NippoForm from "@/components/nippo-form";
import Link from "next/link";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ヒーローセクション */}
      <section className="pt-20 pb-12 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:text-blue-400 dark:bg-blue-900/30">
            完全無料・登録不要
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-slate-50 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">
            日報作成の時間を、<br className="hidden md:block" />
            <span className="text-blue-600 dark:text-blue-500">ゼロにする。</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            SlackやTeamsのチャットログを貼り付けるだけ。<br />
            AIが要約し、上司が納得するビジネス日報を一瞬で生成します。
          </p>
        </div>
      </section>

      {/* アプリ本体 */}
      <section className="px-4 pb-20">
        <NippoForm />
      </section>

      {/* 機能紹介セクション（AdSense対策：文字数稼ぎ） */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100">
            Nippo-Makerが選ばれる理由
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-yellow-500" />}
              title="爆速生成"
              desc="チャットログを貼ってボタンを押すだけ。平均3秒で日報が完成します。プロンプトを考える必要はありません。"
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-10 h-10 text-green-500" />}
              title="トーン調整"
              desc="「反省モード」「自信満々モード」など、その日の状況に合わせて文体を自動で調整できます。"
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-blue-500" />}
              title="安心のセキュリティ"
              desc="入力されたデータは保存されません。APIキーも安全に管理され、安心して業務に利用できます。"
            />
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100">
            3ステップで完了
          </h2>
          <div className="space-y-8">
            <StepItem
              num="01"
              title="チャットログをコピー"
              desc="Slack、Teams、Discordなどで、今日自分が発言した内容や作業メモをコピーします。"
            />
            <StepItem
              num="02"
              title="フォームに貼り付け"
              desc="Nippo-Makerの入力欄に貼り付けます。箇条書きでも、乱雑なメモでも構いません。"
            />
            <StepItem
              num="03"
              title="生成ボタンをクリック"
              desc="AIが自動的に「やったこと」「課題」「明日の予定」に分類・整形します。あとはコピーして提出するだけ。"
            />
          </div>
        </div>
      </section>

      {/* フッター（AdSense必須リンク） */}
      <footer className="py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              ホーム
            </Link>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              プライバシーポリシー
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Nippo-Maker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// 補助コンポーネント
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function StepItem({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
        {num}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}