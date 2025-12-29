import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 pl-0">
              <ChevronLeft className="h-4 w-4" />
              トップページに戻る
            </Button>
          </Link>
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50">プライバシーポリシー</h1>

          <p className="text-sm text-muted-foreground mb-8">最終更新日: {new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. 個人情報の利用目的</h2>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              当サイト（Nippo-Maker）では、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
              取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. 広告について</h2>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
              クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Cookieを無効にする方法やGoogleアドセンスに関する詳細は<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Googleポリシーと規約</a>をご確認ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">3. アクセス解析ツールについて</h2>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
              このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">4. 免責事項</h2>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
              また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              当サイトで生成された日報等のテキストを利用したことによって生じた損害等の一切の責任を負いかねますのでご了承ください。生成された内容は必ずご自身で確認の上、ご利用ください。
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}