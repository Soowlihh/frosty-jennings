const FEATURES = [
  {
    color: "bg-indigo-50 text-indigo-600",
    title: "AI Receipt Scanning",
    desc: "Upload or snap a photo of any receipt. Our AI instantly extracts the merchant, amount, date, and items — no typing required.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    color: "bg-violet-50 text-violet-600",
    title: "Smart Categorization",
    desc: "Food, transport, subscriptions, textbooks — expenses are automatically sorted into meaningful categories so you never have to.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    color: "bg-emerald-50 text-emerald-600",
    title: "Spending Analytics",
    desc: "Visual breakdowns of your spending by week, month, and category. Spot patterns at a glance and understand your habits clearly.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    color: "bg-amber-50 text-amber-600",
    title: "Personalized Advice",
    desc: "Get insights based on your actual spending patterns. Tips that get sharper the more you use the app — advice that's actually about you.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const STEPS = [
  { step: "01", emoji: "📷", title: "Upload a Receipt", desc: "Take a photo or upload any receipt file. Any format, any store." },
  { step: "02", emoji: "⚡", title: "AI Extracts Data",  desc: "Amount, merchant, date — pulled out instantly with no typing." },
  { step: "03", emoji: "🗂️", title: "Auto-Categorized",  desc: "Your expense lands in the right category automatically." },
  { step: "04", emoji: "💡", title: "Get Insights",      desc: "See trends and receive personalized tips to spend smarter." },
];

const BARS = [55, 80, 40, 95, 65, 50, 35];
const DAYS  = ["M", "T", "W", "T", "F", "S", "S"];

const TRANSACTIONS = [
  { emoji: "🍔", name: "McDonald's",  amount: "-$12.50", bg: "bg-orange-500/20" },
  { emoji: "🚗", name: "Uber",        amount: "-$8.00",  bg: "bg-blue-500/20"   },
  { emoji: "📺", name: "Netflix",     amount: "-$15.99", bg: "bg-red-500/20"    },
];

function CheckIcon() {
  return (
    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function Logo({ small }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${small ? "w-6 h-6 rounded-md" : "w-8 h-8 rounded-lg"} bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0`}>
        <svg className={`${small ? "w-3 h-3" : "w-4 h-4"} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className={`${small ? "text-sm" : "text-lg"} font-bold text-white tracking-tight`}>SpendSmart</span>
    </div>
  );
}

export default function Landing({ onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Navigation ───────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="text-slate-400 hover:text-white font-medium text-sm px-4 py-2 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={onRegister}
              className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 px-6" style={{ background: "linear-gradient(to bottom, #020617, #0f172a, #1e1b4b)" }}>
        <div className="max-w-6xl mx-auto">

          {/* Copy */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-indigo-300 text-sm font-medium">AI-Powered · Built for Students</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Stop guessing.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Start knowing
              </span>{" "}
              where<br className="hidden sm:block" /> your money goes.
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Snap a receipt. Our AI extracts, categorizes, and turns your expenses into clear
              insights — so you can budget smarter without the spreadsheet headache.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={onRegister}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-base hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
              >
                Get Started Free →
              </button>
              <button
                onClick={onLogin}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-slate-300 rounded-xl font-semibold text-base hover:bg-white/10 transition-colors border border-white/10"
              >
                Sign In
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-4">No credit card required · Free forever plan</p>
          </div>

          {/* Dashboard Mockup */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/60 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
              {/* Browser chrome */}
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/70"></div>
                </div>
                <div className="flex-1 mx-3 bg-slate-700/80 rounded-md h-6 flex items-center justify-center">
                  <span className="text-slate-400 text-xs">spendsmart.app/dashboard</span>
                </div>
              </div>

              {/* Dashboard grid */}
              <div className="p-5 grid grid-cols-3 gap-4 bg-slate-900/60">

                {/* Total spent */}
                <div className="col-span-1 bg-slate-900 rounded-xl p-4 border border-white/5">
                  <p className="text-slate-400 text-xs font-medium mb-1">Total Spent</p>
                  <p className="text-white text-2xl font-bold">$847</p>
                  <p className="text-emerald-400 text-xs mt-1.5">↓ 12% vs last month</p>
                </div>

                {/* Budget progress */}
                <div className="col-span-2 bg-slate-900 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-slate-400 text-xs font-medium mb-0.5">Monthly Budget</p>
                      <p className="text-white text-lg font-bold">$153 remaining</p>
                    </div>
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="col-span-2 bg-slate-900 rounded-xl p-4 border border-white/5">
                  <p className="text-slate-400 text-xs font-medium mb-4">Weekly Spending</p>
                  <div className="flex items-end gap-1.5 h-20">
                    {BARS.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full rounded-t ${i === 3 ? "bg-indigo-500" : "bg-indigo-500/25"}`}
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-slate-500 text-xs">{DAYS[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="col-span-1 bg-slate-900 rounded-xl p-4 border border-white/5">
                  <p className="text-slate-400 text-xs font-medium mb-3">Recent</p>
                  <div className="space-y-3">
                    {TRANSACTIONS.map((tx, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${tx.bg} flex items-center justify-center text-xs flex-shrink-0`}>
                          {tx.emoji}
                        </div>
                        <p className="text-white text-xs font-medium flex-1 truncate">{tx.name}</p>
                        <span className="text-red-400 text-xs font-semibold">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-indigo-600 text-xs font-bold tracking-widest uppercase">Sound familiar?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Student finances are messier<br />than they need to be
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🧾",
                title: "Receipts pile up and vanish",
                desc: "You buy coffee, groceries, textbooks — and by month-end you have no idea where it all went.",
              },
              {
                emoji: "📊",
                title: "No real visibility",
                desc: "Bank statements give you numbers, not patterns. You can't fix what you can't clearly see.",
              },
              {
                emoji: "🤷",
                title: "Generic apps don't get students",
                desc: "Built for professionals with salaries — not students managing $500–$1,500/month on a budget.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-gray-900 font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 text-xs font-bold tracking-widest uppercase">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Everything you need to stay<br />on top of your budget
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Simple tools built for how students actually spend money every day.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-600 text-xs font-bold tracking-widest uppercase">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              From receipt to insight in seconds
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Four steps that take under 30 seconds from photo to personalized insight.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-3">{s.emoji}</div>
                <p className="text-indigo-500 text-xs font-bold tracking-widest mb-2">{s.step}</p>
                <h3 className="text-gray-900 font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for Students ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* Copy */}
          <div>
            <span className="text-indigo-600 text-xs font-bold tracking-widest uppercase">Built for students</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5">
              Not a generic app with a<br />student label slapped on.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
              We built SpendSmart from the ground up for the way students actually manage money —
              tight budgets, irregular income, and categories like ramen, Uber rides, and split subscriptions.
            </p>
            <div className="space-y-4">
              {[
                { label: "Free to start",           sub: "No credit card. No hidden trial timers." },
                { label: "Student-sized budgets",   sub: "Meaningful insights whether you spend $200 or $2,000/month." },
                { label: "Relevant categories",     sub: "Food, commute, textbooks, subscriptions — what actually matters." },
                { label: "AI that learns you",      sub: "Advice gets sharper and more personal the more you use it." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{item.label}</p>
                    <p className="text-gray-400 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insight Cards */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 border border-indigo-100 space-y-4">

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-gray-400 text-xs font-medium mb-3">Top Category · April</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍕</span>
                <div>
                  <p className="text-gray-900 font-bold">Food &amp; Dining</p>
                  <p className="text-gray-400 text-sm">$312 · 37% of your budget</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full" style={{ width: "37%" }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl p-5 text-white">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 text-sm">💡</div>
                <div>
                  <p className="font-semibold text-sm mb-1">Personalized Insight</p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    You spent 28% more on food this week than usual. Cooking at home 3× this week
                    could save you around $45.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: "linear-gradient(to bottom, #020617, #1e1b4b)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
            Your budget, finally<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              under control.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Join students who stopped guessing and started knowing exactly where their money goes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-base hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
            >
              Create Your Free Account
            </button>
            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-slate-300 rounded-xl font-semibold text-base hover:bg-white/10 transition-colors border border-white/10"
            >
              Sign In
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-5">No credit card required</p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo small />
          <p className="text-slate-500 text-sm">Made for students. Powered by AI.</p>
          <p className="text-slate-600 text-xs">© 2025 SpendSmart. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
