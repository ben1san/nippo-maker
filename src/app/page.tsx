import NippoForm from "@/components/nippo-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 py-10">
      <div className="container mx-auto text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-slate-900 dark:text-slate-100">
          Nippo Maker 🚀
        </h1>
        <p className="text-muted-foreground">
          チャットログを貼り付けるだけ。AIが日報を「いい感じ」に書きます。
        </p>
      </div>

      <NippoForm />
    </main>
  );
}