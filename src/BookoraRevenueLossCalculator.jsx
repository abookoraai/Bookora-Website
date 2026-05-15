import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    phone: (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8 9.68a16 16 0 0 0 6.32 6.32l1.24-1.24a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    calculator: (
      <svg {...common}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
      </svg>
    ),
    chart: (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-7" />
      </svg>
    ),
    dollar: (
      <svg {...common}>
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    spark: (
      <svg {...common}>
        <path d="M12 3 10.3 8.3 5 10l5.3 1.7L12 17l1.7-5.3L19 10l-5.3-1.7L12 3z" />
        <path d="M19 15v4" />
        <path d="M21 17h-4" />
      </svg>
    ),
  };

  return icons[name] || icons.spark;
}

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function calculateLostRevenue({ missedCallsPerWeek, averageCustomerValue, bookingRate, recoveryRate }) {
  const weeklyMissedCalls = Math.max(0, Number(missedCallsPerWeek) || 0);
  const customerValue = Math.max(0, Number(averageCustomerValue) || 0);
  const closeRate = Math.max(0, Math.min(100, Number(bookingRate) || 0)) / 100;
  const recoveredRate = Math.max(0, Math.min(100, Number(recoveryRate) || 0)) / 100;

  const monthlyMissedCalls = weeklyMissedCalls * 4.33;
  const lostCustomers = monthlyMissedCalls * closeRate;
  const monthlyLostRevenue = lostCustomers * customerValue;
  const recoverableRevenue = monthlyLostRevenue * recoveredRate;
  const yearlyRecoverableRevenue = recoverableRevenue * 12;

  return {
    monthlyMissedCalls,
    lostCustomers,
    monthlyLostRevenue,
    recoverableRevenue,
    yearlyRecoverableRevenue,
  };
}

function runSmokeTests() {
  const result = calculateLostRevenue({ missedCallsPerWeek: 10, averageCustomerValue: 250, bookingRate: 30, recoveryRate: 50 });
  console.assert(Math.round(result.monthlyMissedCalls) === 43, "Monthly missed calls should use 4.33 weeks.");
  console.assert(Math.round(result.lostCustomers) === 13, "Lost customers should calculate correctly.");
  console.assert(Math.round(result.monthlyLostRevenue) === 3248, "Monthly lost revenue should calculate correctly.");
  console.assert(Math.round(result.recoverableRevenue) === 1624, "Recoverable revenue should calculate correctly.");

  const clamped = calculateLostRevenue({ missedCallsPerWeek: -5, averageCustomerValue: 100, bookingRate: 200, recoveryRate: 200 });
  console.assert(clamped.monthlyLostRevenue === 0, "Negative missed calls should clamp to zero.");
}

runSmokeTests();

function InputCard({ label, value, onChange, prefix, suffix, helper, min = 0, max }) {
  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8">
      <label className="text-sm font-black uppercase tracking-wide text-[#72D6C8]">{label}</label>
      <div className="mt-3 flex items-center rounded-2xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-[#72D6C8]/60">
        {prefix && <span className="mr-2 text-xl font-black text-slate-400">{prefix}</span>}
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-2xl font-black text-white outline-none sm:text-3xl"
        />
        {suffix && <span className="ml-2 text-xl font-black text-slate-400">{suffix}</span>}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{helper}</p>
    </div>
  );
}

function ResultCard({ icon, title, value, desc, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 sm:rounded-3xl sm:p-5 ${
        featured
          ? "border-[#72D6C8] bg-[#72D6C8]/10 shadow-xl shadow-[#58AA9D]/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#72D6C8] text-[#031312] sm:h-11 sm:w-11">
        <Icon name={icon} className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>

      <p className="text-xs font-black uppercase tracking-wide text-slate-400 sm:text-sm">
        {title}
      </p>

      <p
        className={`mt-2 break-words font-black leading-tight ${
          featured
            ? "text-3xl text-[#72D6C8] sm:text-5xl"
            : "text-2xl text-white sm:text-3xl"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-400 sm:mt-3">
        {desc}
      </p>
    </motion.div>
  );
}

export default function BookoraRevenueLossCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(20);
  const [averageCustomerValue, setAverageCustomerValue] = useState(250);
  const [bookingRate, setBookingRate] = useState(30);
  const [recoveryRate, setRecoveryRate] = useState(50);

  const results = useMemo(
    () => calculateLostRevenue({ missedCallsPerWeek, averageCustomerValue, bookingRate, recoveryRate }),
    [missedCallsPerWeek, averageCustomerValue, bookingRate, recoveryRate]
  );

  return (
    <div className="min-h-screen bg-[#030908] px-4 py-8 text-white sm:px-5 sm:py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#58AA9D]/25 blur-3xl" />
        <div className="absolute -left-48 top-80 h-96 w-96 rounded-full bg-[#72D6C8]/15 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-[#58AA9D]/10 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur sm:p-8 lg:p-10">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#72D6C8]/40 bg-white/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#72D6C8]">
            <Icon name="calculator" className="h-4 w-4" /> Revenue Leak Calculator
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
            See How Much Revenue You’re <span className="text-[#72D6C8]">Losing From Missed Calls</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Most local businesses miss calls every week. Use this calculator to estimate how much revenue could be slipping away — and how much Bookora may help recover.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <InputCard
              label="Missed calls per week"
              value={missedCallsPerWeek}
              onChange={setMissedCallsPerWeek}
              helper="Estimate how many calls go unanswered during business hours, after hours, lunch breaks, or busy moments."
            />
            <InputCard
              label="Average customer value"
              value={averageCustomerValue}
              onChange={setAverageCustomerValue}
              prefix="$"
              helper="Use the average value of a booked appointment, job, visit, or new customer."
            />
            <InputCard
              label="Estimated booking rate"
              value={bookingRate}
              onChange={setBookingRate}
              suffix="%"
              max={100}
              helper="Of the calls you answer, what percentage typically turn into booked appointments or paying customers?"
            />
            <InputCard
              label="Recovery rate with Bookora"
              value={recoveryRate}
              onChange={setRecoveryRate}
              suffix="%"
              max={100}
              helper="Conservative estimate of how many missed-call opportunities could be recovered with instant AI response and follow-up."
            />
          </div>

          <div className="rounded-[2rem] border border-[#72D6C8]/20 bg-white/5 p-5 shadow-2xl shadow-[#58AA9D]/10 backdrop-blur md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[#72D6C8]">Estimated Opportunity</p>
                <h2 className="mt-1 text-2xl font-black">Your missed-call revenue report</h2>
              </div>
              <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-[#72D6C8] text-[#031312] sm:flex">
                <Icon name="chart" className="h-7 w-7" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <ResultCard
                icon="phone"
                title="Monthly missed calls"
                value={Math.round(results.monthlyMissedCalls)}
                desc="Estimated missed calls per month based on your weekly number."
              />
              <ResultCard
                icon="check"
                title="Lost booked customers"
                value={results.lostCustomers.toFixed(1)}
                desc="Estimated customers who may have booked if the call was captured."
              />
              <ResultCard
                icon="dollar"
                title="Monthly revenue at risk"
                value={currency(results.monthlyLostRevenue)}
                desc="Estimated revenue tied to missed-call opportunities."
              />
              <ResultCard
                icon="spark"
                title="Potential monthly recovery"
                value={currency(results.recoverableRevenue)}
                desc="Estimated revenue Bookora may help recover through instant response."
                featured
              />
            </div>

            <div className="mt-6 rounded-3xl border border-[#72D6C8]/25 bg-[#58AA9D]/10 p-6 text-center">
              <p className="text-sm font-black uppercase tracking-wide text-[#72D6C8]">Potential yearly recovered revenue</p>
              <p className="mt-2 break-words text-3xl font-black text-white sm:text-5xl">
  {currency(results.yearlyRecoverableRevenue)}
</p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                This is an estimate, but it gives prospects a clear reason to fix missed calls now instead of waiting.
              </p>
              <a
  href="https://links.bookora.ai/widget/booking/gdVSUoWSEXFMddK3zFO7"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#72D6C8] px-5 py-4 text-sm font-black text-[#031312] transition hover:bg-[#8BE7DA] sm:w-auto sm:px-7 sm:text-base"
>
  Book a 10-Minute Demo
</a>
<a
  href="/#pricing"
  className="mt-4 inline-block text-sm font-semibold text-[#72D6C8] hover:underline"
>
  Or view packages
</a>
              <p className="mt-3 text-xs text-slate-400">No pressure. Just a quick 10-minute demo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
