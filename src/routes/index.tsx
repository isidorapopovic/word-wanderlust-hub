import { createFileRoute, Link } from "@tanstack/react-router";
import { LANGUAGES, TENSES } from "@/lib/verbs";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Verb practice · Romance languages
          </p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] tracking-tight">
            Conjugate with
            <span className="italic text-primary"> confidence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Short, focused fill-in-the-blank drills for Italian, French and
            Spanish verbs. Pick a language, choose a tense, and start.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/practice"
              search={{ lang: "it", tenses: "present", mode: "sentence" }}
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Start practicing
            </Link>
            <a
              href="#languages"
              className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-secondary"
            >
              Browse languages
            </a>
          </div>
        </section>

        {/* Language cards */}
        <section
          id="languages"
          className="mx-auto max-w-5xl px-6 pb-16"
        >
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-3xl md:text-4xl">
              Choose a language
            </h2>
            <p className="text-sm text-muted-foreground">
              Explanations in English
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang.code}
                to="/practice"
                search={{ lang: lang.code, tenses: "present", mode: "sentence" }}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:-translate-y-0.5"
              >
                <div className="text-4xl">{lang.flag}</div>
                <div className="mt-4 font-display text-2xl">{lang.name}</div>
                <div className="text-sm text-muted-foreground">
                  {lang.nativeName}
                </div>
                <div className="mt-6 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                  Practice →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tenses */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Four tenses covered
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {TENSES.map((t) => (
              <div
                key={t.code}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="font-display text-xl">{t.name}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">
          Lingua<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#languages" className="text-muted-foreground hover:text-foreground">
            Languages
          </a>
          <Link to="/stats" className="text-muted-foreground hover:text-foreground">
            Stats
          </Link>
          <Link
            to="/practice"
            search={{ lang: "it", tenses: "present", mode: "sentence" }}
            className="rounded-full bg-foreground px-4 py-2 text-background hover:opacity-90"
          >
            Practice
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted-foreground">
        Built for learners. More languages and exercises coming soon.
      </div>
    </footer>
  );
}
