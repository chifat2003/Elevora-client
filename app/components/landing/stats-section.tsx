"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PlatformStats } from "@/app/lib/types";

export function StatsSection({ stats }: { stats: PlatformStats }) {
  const data = [
    { label: "Jobs Posted", value: stats.jobsPosted },
    { label: "Companies Hiring", value: stats.companiesHiring },
    { label: "Applications Submitted", value: stats.applicationsSubmitted },
  ];

  return (
    <section className="bg-primary py-16 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold">Elevora by the Numbers</h2>
        <p className="mt-1 text-white/80">
          Live activity across the platform, updated in real time.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
            {data.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold sm:text-4xl">{item.value.toLocaleString()}</p>
                <p className="mt-1 text-sm text-white/80">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="h-64 rounded-xl bg-white/10 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.8)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.8)" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#1E3A8A", border: "none", borderRadius: 8, color: "white" }}
                />
                <Bar dataKey="value" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
