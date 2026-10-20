
"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Flame,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Workouts",
    value: "24",
    change: "+12%",
    description: "vs. last month",
    icon: Dumbbell,
    color: "text-[#ccff00]",
    bg: "bg-[#ccff00]/10",
    positive: true,
  },
  {
    title: "Calories Burned",
    value: "8,420",
    change: "+8.4%",
    description: "vs. last month",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    positive: true,
  },
  {
    title: "Time Trained",
    value: "18.5h",
    change: "+5.2%",
    description: "vs. last month",
    icon: Clock3,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    positive: true,
  },
  {
    title: "Weekly Goal",
    value: "4/5",
    change: "80%",
    description: "workouts completed",
    icon: Target,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    positive: true,
  },
];

const weeklyActivity = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 90 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 100 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 30 },
];

const recentWorkouts = [
  {
    name: "Barbell Bench Press",
    category: "Chest · Strength",
    duration: "25 min",
    calories: "180 kcal",
    date: "Today",
    icon: Dumbbell,
  },
  {
    name: "Running",
    category: "Cardio · Endurance",
    duration: "30 min",
    calories: "260 kcal",
    date: "Yesterday",
    icon: Activity,
  },
  {
    name: "Dumbbell Shoulder Press",
    category: "Shoulders · Strength",
    duration: "20 min",
    calories: "140 kcal",
    date: "Oct 15",
    icon: Dumbbell,
  },
];

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-[#090b09] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              Your fitness overview
            </p>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Dashboard<span className="text-[#ccff00]">.</span>
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Track your progress. Stay consistent. Get stronger.
            </p>
          </div>

          <Link
            href="/workout"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 text-sm font-bold text-black transition hover:bg-[#ddff55]"
          >
            <Plus size={18} />
            Explore Workouts
          </Link>
        </header>

        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121512] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#ccff00]/10 blur-[90px]" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/20 bg-[#ccff00]/[0.07] px-3 py-1.5 text-xs font-semibold text-[#ccff00]">
                <Flame size={14} />
                Keep your streak alive
              </span>

              <h2 className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
                Every rep counts.
                <br />
                <span className="text-[#ccff00]">
                  Every day matters.
                </span>
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                You are building a stronger version of yourself. Keep showing
                up and let your progress speak for itself.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-black/20 p-5 sm:min-w-52">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ccff00]/10 text-[#ccff00]">
                <Flame size={25} />
              </div>

              <div>
                <p className="text-3xl font-black">7 Days</p>
                <p className="mt-1 text-xs text-white/40">
                  Current activity streak
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Your Statistics</h2>
            <span className="text-xs text-white/35">
              Monthly overview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#121512] p-5 transition-colors hover:border-white/15"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                    >
                      <Icon size={21} />
                    </div>

                    <span className="flex items-center gap-1 text-xs font-semibold text-[#ccff00]">
                      <ArrowUpRight size={14} />
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-5 text-sm text-white/45">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-3xl font-black tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-white/30">
                    {stat.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Activity and Goal */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Weekly Activity */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121512] p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Weekly Activity</h2>
                <p className="mt-1 text-xs text-white/40">
                  Your workout intensity this week
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/55">
                <CalendarDays size={14} />
                This week
              </div>
            </div>

            <div className="mt-8 flex h-52 items-end justify-between gap-3 sm:gap-5">
              {weeklyActivity.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end justify-center">
                    <div
                      className={`w-full max-w-12 rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                        item.day === "Fri"
                          ? "bg-[#ccff00]"
                          : "bg-[#ccff00]/20"
                      }`}
                      style={{ height: `${item.value}%` }}
                      title={`${item.day}: ${item.value}% activity`}
                    />
                  </div>

                  <span
                    className={`text-xs ${
                      item.day === "Fri"
                        ? "font-bold text-[#ccff00]"
                        : "text-white/35"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-4">
              <TrendingUp size={16} className="text-[#ccff00]" />
              <p className="text-xs text-white/45">
                <span className="font-semibold text-white">
                  Stay consistent
                </span>{" "}
                to build a stronger weekly routine.
              </p>
            </div>
          </div>

          {/* Goal Progress */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#121512] p-5 sm:p-6">
            <h2 className="text-lg font-bold">Weekly Goal</h2>
            <p className="mt-1 text-xs text-white/40">
              Your commitment to yourself
            </p>

            <div className="flex flex-col items-center py-7">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <svg
                  viewBox="0 0 160 160"
                  className="h-full w-full -rotate-90"
                  aria-label="80 percent of weekly workout goal completed"
                  role="img"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke="currentColor"
                    className="text-white/[0.07]"
                    strokeWidth="12"
                  />

                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke="#ccff00"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 66 * 0.8} ${
                      2 * Math.PI * 66 * 0.2
                    }`}
                  />
                </svg>

                <div className="absolute text-center">
                  <p className="text-3xl font-black">80%</p>
                  <p className="mt-1 text-xs text-white/40">Completed</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold">
                4 of 5 workouts completed
              </p>

              <p className="mt-2 text-center text-xs leading-5 text-white/40">
                One more session to reach your weekly goal.
              </p>
            </div>

            <Link
              href="/workout"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#ccff00]/25 text-sm font-semibold text-[#ccff00] transition hover:bg-[#ccff00]/[0.07]"
            >
              Finish Your Goal
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Recent Workouts */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121512]">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-bold">Recent Workouts</h2>
              <p className="mt-1 text-xs text-white/40">
                Your latest training sessions
              </p>
            </div>

            <Link
              href="/my-plan"
              className="flex items-center gap-1 text-xs font-semibold text-[#ccff00] transition hover:text-white"
            >
              View plan
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {recentWorkouts.map((workout) => {
              const Icon = workout.icon;

              return (
                <article
                  key={workout.name}
                  className="flex flex-col gap-4 p-5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ccff00]/10 bg-[#ccff00]/[0.06] text-[#ccff00]">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold">
                        {workout.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/40">
                        {workout.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pl-16 text-xs text-white/45 sm:pl-0">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {workout.duration}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Flame size={14} />
                      {workout.calories}
                    </span>

                    <span className="flex items-center gap-1.5 text-[#ccff00]/80">
                      <CheckCircle2 size={14} />
                      {workout.date}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="border-t border-white/[0.08] p-4 text-center">
            <Link
              href="/my-plan"
              className="text-xs font-semibold text-white/45 transition hover:text-[#ccff00]"
            >
              Explore your training history
              <ArrowDownRight size={14} className="ml-1 inline" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-2 text-center text-[10px] tracking-[0.15em] text-white/25">
          BUILT FOR CONSISTENCY. DESIGNED FOR PROGRESS.
        </footer>
      </div>
    </main>
  );
};

export default DashboardPage;
