import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Dumbbell,
  Flame,
  Target,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Workout Library",
    description: "Explore exercises and find the right workout for your goals.",
    number: "01",
  },
  {
    icon: Target,
    title: "Personal Plan",
    description: "Build a workout plan that fits your daily routine.",
    number: "02",
  },
  {
    icon: Flame,
    title: "Track Progress",
    description: "Track your sets, reps, calories, and completed workouts.",
    number: "03",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#101010] text-white">
      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute -right-25 top-16 h-80 w-80 rounded-full bg-[#ccff00]/10 blur-[120px]" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ccff00]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ccff00]" />
            Your fitness journey starts here
          </div>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
            TRAIN WITH
            <br />
            <span className="text-[#ccff00]">INTENT.</span>
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
            No excuses. No guesswork. Just focused training and measurable
            progress. Build your plan, track every workout, and become stronger
            every day.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/workouts"
              className="inline-flex items-center justify-center gap-3 bg-[#ccff00] px-7 py-4 font-bold text-black transition hover:bg-white"
            >
              Explore Workouts
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/my-plan"
              className="inline-flex items-center justify-center gap-3 border border-white/15 px-7 py-4 font-semibold transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              View My Plan
              <ArrowDownRight size={20} />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid max-w-2xl grid-cols-3 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-black text-[#ccff00] md:text-4xl">
                01
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                Your Goal
              </p>
            </div>

            <div className="border-x border-white/10 px-5">
              <p className="text-3xl font-black md:text-4xl">100%</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                Your Focus
              </p>
            </div>

            <div className="pl-5">
              <p className="text-3xl font-black md:text-4xl">DAILY</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                Your Progress
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-500 lg:flex">
          <span className="h-px w-12 bg-[#ccff00]" />
          Scroll to explore
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/10 bg-[#151515] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                Everything you need
              </p>
              <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">
                BUILT FOR
                <br className="sm:hidden" /> YOUR PROGRESS.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-400 md:text-base">
              A simple, no-nonsense fitness companion to help you stay
              consistent and make every training session count.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group border border-white/10 bg-[#101010] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#ccff00] text-black">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      / {feature.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold">{feature.title}</h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-400">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-px w-full bg-white/10 transition group-hover:bg-[#ccff00]/50" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border border-[#ccff00]/30 bg-[#ccff00]/5 p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#ccff00]">
              <Zap size={18} />
              Time to get moving
            </div>

            <h2 className="max-w-2xl text-3xl font-black sm:text-4xl md:text-5xl">
              YOUR NEXT REP STARTS NOW.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400">
              Stop waiting for motivation. Start building consistency, one
              workout at a time.
            </p>
          </div>

          <Link
            href="/workouts"
            className="inline-flex shrink-0 items-center gap-3 bg-[#ccff00] px-7 py-4 font-bold text-black transition hover:bg-white"
          >
            Start Training
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}