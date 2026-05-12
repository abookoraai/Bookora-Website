import React, { useMemo, useState } from "react";

const ACCENT = "#58AA9D";
const ACCENT_LIGHT = "#72D6C8";
const DARK = "#030908";

const BOOKORA_LOGO_SRC = "data:image/webp;base64,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";

function BookoraLogo({ className = "h-14 w-14" }) {
  return (
    <img
      src={BOOKORA_LOGO_SRC}
      alt="Bookora logo"
      className={`${className} block shrink-0 rounded-full object-cover`}
      style={{ aspectRatio: "1 / 1" }}
    />
  );
}

function Icon({ name, className = "h-6 w-6" }) {
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
    phone: <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8 9.68a16 16 0 0 0 6.32 6.32l1.24-1.24a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92z" /></svg>,
    message: <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg>,
    calendar: <svg {...common}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>,
    check: <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>,
    play: <svg {...common}><polygon points="6 3 20 12 6 21 6 3" /></svg>,
    arrow: <svg {...common}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    clock: <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    bot: <svg {...common}><rect x="5" y="8" width="14" height="10" rx="2" /><path d="M12 8V4" /><circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" /><path d="M9 18v2" /><path d="M15 18v2" /></svg>,
    chart: <svg {...common}><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
    spark: <svg {...common}><path d="M12 3 10.3 8.3 5 10l5.3 1.7L12 17l1.7-5.3L19 10l-5.3-1.7L12 3z" /><path d="M19 15v4" /><path d="M21 17h-4" /></svg>,
    users: <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  };

  return icons[name] || icons.spark;
}

function Button({ children, onClick, variant = "solid", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-6 py-4 font-bold transition focus:outline-none focus:ring-2 focus:ring-[#72D6C8] focus:ring-offset-2 focus:ring-offset-[#030908]";
  const styles = variant === "outline"
    ? "border border-[#72D6C8]/40 bg-white/5 text-white hover:bg-[#58AA9D]/10"
    : "bg-[#72D6C8] text-[#031312] hover:bg-[#8BE7DA]";

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border ${className}`}>{children}</div>;
}

const PACKAGE_DATA = [
  {
    name: "Starter",
    price: "$500 today",
monthly: "$297/mo after 30 days",
    bestFor: "Missed-call recovery + appointment reminders",
    features: ["AI answers calls 24/7", "Missed call text-back", "Books appointments", "Basic integrations", "Email support"],
  },
    {
  name: "Growth",
  price: "$500 today",
  monthly: "$497/mo after 30 days",
    setup: "Most popular",
    bestFor: "AI receptionist + lead nurturing",
    features: ["Everything in Starter", "Advanced integrations", "Custom call flows", "Priority support", "Call logs and analytics"],
  },
  {
  name: "Pro",
  price: "$500 today",
  monthly: "$797/mo after 30 days",
    setup: "For high-volume businesses",
    bestFor: "Full lead conversion system",
    features: ["Everything in Growth", "Multi-location support", "Advanced analytics", "Dedicated account manager", "VIP support"],
  },
];

function getPackageByName(packages, name) {
  return packages.find((pkg) => pkg.name === name) || packages[1];
}

function buildTelLink(phoneNumber) {
  const clean = String(phoneNumber).replace(/\D/g, "");

  if (clean.length === 10) {
    return "tel:+1" + clean;
  }

  if (clean.length === 11 && clean.startsWith("1")) {
    return "tel:+" + clean;
  }

  return "tel:" + clean;
}

function runSmokeTests() {
  console.assert(PACKAGE_DATA.length === 3, "Expected exactly 3 packages.");
  console.assert(getPackageByName(PACKAGE_DATA, "Growth").price === "$497/mo", "Growth package price should be $497/mo.");
  console.assert(getPackageByName(PACKAGE_DATA, "Missing").name === "Growth", "Unknown package should default to Growth.");
  console.assert(ACCENT === "#58AA9D", "Accent color should match the Bookora logo teal.");
}

if (typeof process === "undefined" || process.env.NODE_ENV !== "production") {
  runSmokeTests();
}

function LegalPage({ type }) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";

  return (
    <div className="min-h-screen bg-[#030908] px-5 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <BookoraLogo className="h-12 w-12" />
          <div>
            <p className="text-2xl font-black">BOOKORA</p>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#72D6C8]">AI Receptionist</p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#72D6C8]/20 bg-white/5 p-8 leading-7 text-slate-200">
          <h1 className="mb-4 text-4xl font-black text-white">{title}</h1>
          <p className="mb-6 text-sm text-slate-400">Last updated: May 2026</p>

          {isPrivacy ? (
            <div className="space-y-5">
              <p>Bookora (“we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information you provide to us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or interact with our services.</p>

              <h2 className="pt-4 text-2xl font-black text-white">1. Information We Collect</h2>
              <p>We may collect personal information including your name, email address, phone number, and business information if provided.</p>
              <p>We may also collect automatically collected information including IP address, browser type, device information, and pages visited on our website.</p>

              <h2 className="pt-4 text-2xl font-black text-white">2. How We Use Your Information</h2>
              <p>We use the information we collect to respond to inquiries, provide customer support, schedule appointments, communicate with you, send service-related communications via email, phone, or SMS, improve our services and website functionality, and provide updates, promotions, or relevant business information.</p>

              <h2 className="pt-4 text-2xl font-black text-white">3. SMS Communications</h2>
              <p>By providing your phone number and submitting a form on our website, you consent to receive SMS text messages from Bookora. These messages may include appointment confirmations and reminders, follow-ups regarding your inquiry, and service-related notifications.</p>
              <p>Message frequency varies. Message and data rates may apply. You can opt out at any time by replying STOP. For assistance, reply HELP.</p>

              <h2 className="pt-4 text-2xl font-black text-white">4. How We Share Your Information</h2>
              <p>We do not share, sell, rent, or disclose your SMS opt-in data or consent with any third parties for marketing purposes.</p>
              <p>We may share your information with trusted third-party service providers only as necessary to operate our business and provide our services, such as CRM, messaging platforms, and automation tools. These providers are required to keep your information secure and confidential.</p>

              <h2 className="pt-4 text-2xl font-black text-white">5. Data Security</h2>
              <p>We take reasonable administrative, technical, and physical measures to protect your personal information from unauthorized access, use, or disclosure.</p>

              <h2 className="pt-4 text-2xl font-black text-white">6. Your Rights and Choices</h2>
              <p>You have the right to request access to the personal information we have about you, request corrections or updates, request deletion of your data where applicable, and opt out of communications at any time. To make a request, contact us at support@bookora.ai.</p>

              <h2 className="pt-4 text-2xl font-black text-white">7. Cookies and Tracking Technologies</h2>
              <p>We may use cookies and similar tracking technologies to enhance your experience on our website and analyze usage. You can adjust your browser settings to refuse cookies if you prefer.</p>

              <h2 className="pt-4 text-2xl font-black text-white">8. Third-Party Services</h2>
              <p>Our website may use third-party tools, such as analytics or CAPTCHA services, that may collect information according to their own privacy policies.</p>

              <h2 className="pt-4 text-2xl font-black text-white">9. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

              <h2 className="pt-4 text-2xl font-black text-white">10. Contact Information</h2>
              <p>Bookora<br />1224 S Highland Ave #1008<br />Clearwater, FL 33756<br />United States<br />Email: support@bookora.ai<br />Phone: (727) 620-6969</p>
            </div>
          ) : (
            <div className="space-y-5">
              <p>Welcome to Bookora. By accessing or using our website and services, you agree to be bound by the following Terms and Conditions. If you do not agree with these terms, please do not use our services.</p>

              <h2 className="pt-4 text-2xl font-black text-white">1. Use of Services</h2>
              <p>Bookora provides AI-powered communication, appointment scheduling, and customer engagement tools for businesses. By using our services, you agree to use them only for lawful purposes and in accordance with these Terms.</p>

              <h2 className="pt-4 text-2xl font-black text-white">2. Communications Consent</h2>
              <p>By submitting your information through our website, you agree to receive communications from Bookora via email, phone, and SMS text messages.</p>
              <p>These communications may include appointment confirmations and reminders, follow-ups regarding your inquiry, and service-related notifications.</p>
              <p>Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP to any SMS message. For assistance, reply HELP.</p>

              <h2 className="pt-4 text-2xl font-black text-white">3. User Responsibilities</h2>
              <p>You agree that the information you provide is accurate and complete, that you will not use our services for unlawful or prohibited activities, and that you will not attempt to interfere with or disrupt our systems.</p>

              <h2 className="pt-4 text-2xl font-black text-white">4. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and software, is the property of Bookora and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any content without prior written permission.</p>

              <h2 className="pt-4 text-2xl font-black text-white">5. Limitation of Liability</h2>
              <p>Bookora is not liable for any indirect, incidental, or consequential damages arising from the use of our services. We do not guarantee specific business results, including increased bookings or revenue.</p>

              <h2 className="pt-4 text-2xl font-black text-white">6. Third-Party Services</h2>
              <p>Our services may integrate with third-party tools and platforms. We are not responsible for the performance or policies of these third-party services.</p>

              <h2 className="pt-4 text-2xl font-black text-white">7. Termination</h2>
              <p>We reserve the right to suspend or terminate access to our services at any time for violations of these Terms.</p>

              <h2 className="pt-4 text-2xl font-black text-white">8. Changes to Terms</h2>
              <p>We may update these Terms and Conditions at any time. Updates will be posted on this page with a revised effective date.</p>

              <h2 className="pt-4 text-2xl font-black text-white">9. Additional Terms</h2>
              <p>Carriers are not liable for delayed or undelivered messages. You must be at least 18 years old to use our services. Please review our Privacy Policy for more information on how we collect and use your data.</p>

              <h2 className="pt-4 text-2xl font-black text-white">10. Contact Information</h2>
              <p>Bookora<br />1224 S Highland Ave #1008<br />Clearwater, FL 33756<br />United States<br />Email: support@bookora.ai<br />Phone: (727) 620-6969</p>
            </div>
          )}

          <a href="/" className="mt-8 inline-flex rounded-2xl bg-[#72D6C8] px-5 py-3 font-bold text-[#031312] hover:bg-[#8BE7DA]">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BookoraAIReceptionistDemoPage() {
  // ===== REPLACE THESE WITH YOUR REAL LINKS =====
  const DEMO_BOOKING_URL = "https://links.bookora.ai/widget/booking/gdVSUoWSEXFMddK3zFO7";

const STARTER_URL = "https://links.bookora.ai/payment-link/6a00004634d67b041e7e893f";
const GROWTH_URL = "https://links.bookora.ai/payment-link/6a00009134d67b041e7e8940";
const PRO_URL = "https://links.bookora.ai/payment-link/6a0000a7c43a7488828c277a";
  const AI_DEMO_PHONE_NUMBER = "7276206969";

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const [activePackage, setActivePackage] = useState("Growth");
  const [billing, setBilling] = useState("monthly");
  const [callingDemo, setCallingDemo] = useState(false);

  const packages = useMemo(() => PACKAGE_DATA, []);
  const active = getPackageByName(packages, activePackage);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const pageParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("page") : "";

  if (currentPath === "/privacy-policy" || pageParam === "privacy-policy") {
    return <LegalPage type="privacy" />;
  }

  if (currentPath === "/terms-and-conditions" || pageParam === "terms-and-conditions") {
    return <LegalPage type="terms" />;
  }

  const industries = ["Med Spa", "Dental Studio", "Auto Detailing", "Fitness Club", "Chiropractic Care"];
  const steps = [
    ["phone", "AI Answers Calls", "Bookora answers your calls instantly, just like a real receptionist."],
    ["message", "Engages & Qualifies", "It has natural conversations, answers questions, and qualifies leads."],
    ["calendar", "Books Appointments", "It checks availability and books appointments directly on your calendar."],
    ["clock", "Texts Missed Calls", "Missed call? Bookora texts them instantly to keep the conversation going."],
  ];

  return (
    <div className="min-h-screen bg-[#030908] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#58AA9D]/25 blur-3xl" />
        <div className="absolute -left-48 top-80 h-96 w-96 rounded-full bg-[#72D6C8]/15 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-[#58AA9D]/10 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <BookoraLogo className="h-14 w-14" />
          <div>
            <p className="text-2xl font-black tracking-tight">BOOKORA</p>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#72D6C8]">AI Receptionist</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 lg:flex">
          <a href="#features" className="hover:text-[#72D6C8]">Features</a>
          <a href="#how" className="hover:text-[#72D6C8]">How It Works</a>
          <a href="#pricing" className="hover:text-[#72D6C8]">Pricing</a>
          <a href="#industries" className="hover:text-[#72D6C8]">Industries</a>
          <a href="#resources" className="hover:text-[#72D6C8]">Resources</a>
        </nav>

        <Button className="hidden sm:inline-flex" onClick={() => openLink(DEMO_BOOKING_URL)}>
          Book a Demo
        </Button>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-14 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-16">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-[#72D6C8]/40 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#72D6C8]">
              24/7 AI Receptionist For Your Business
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight md:text-7xl">
              Never Miss Another Call. <span className="text-[#72D6C8]">Book More Appointments.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Bookora’s AI Receptionist answers your calls, texts missed calls instantly, and books appointments — so you never lose a customer again.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => {
                  setCallingDemo(true);

                  if (typeof window !== "undefined") {
                    window.location.href = buildTelLink(AI_DEMO_PHONE_NUMBER);
                  }

                  setTimeout(() => {
                    setCallingDemo(false);
                  }, 2500);
                }}
                className="px-8 py-5 text-base"
              >
                {callingDemo ? "Opening Phone..." : "Call The AI Demo"}
                <Icon name="phone" className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-5 text-base"
                onClick={() => openLink(DEMO_BOOKING_URL)}
              >
                <Icon name="calendar" className="mr-2 h-5 w-5" /> Book a Demo
              </Button>
            </div>

            {callingDemo && (
              <div className="mt-4 rounded-2xl border border-[#72D6C8]/25 bg-[#58AA9D]/10 p-4 text-sm text-[#C8FFF7]">
                Opening the live Bookora AI receptionist demo now.
              </div>
            )}

            <div id="features" className="mt-8 flex flex-wrap gap-2">
              {[
                ["phone", "AI Answers Calls"],
                ["message", "Texts Instantly"],
                ["calendar", "Books Appointments"],
                ["clock", "Works 24/7"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-[#72D6C8]/25 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100">
                  <Icon name={icon} className="h-4 w-4 text-[#72D6C8]" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1fr]">
            <div className="mx-auto w-full max-w-[270px] rounded-[2.5rem] border border-white/20 bg-black p-3 shadow-2xl shadow-[#58AA9D]/20">
              <div className="rounded-[2rem] border border-white/10 bg-[#071210] p-5 text-center">
                <div className="mx-auto mb-5 h-5 w-24 rounded-b-2xl bg-black" />
                <p className="text-sm text-slate-300">Incoming Call</p>
                <h3 className="mt-1 text-xl font-bold">Dream Med Spa</h3>
                <p className="text-slate-400">(702) 555-0187</p>
                <div className="mx-auto my-8 flex h-32 w-32 items-center justify-center rounded-full border border-[#72D6C8]/40 bg-[#58AA9D]/10 p-2">
                  <BookoraLogo className="h-28 w-28" />
                </div>
                <p className="font-bold">Bookora AI</p>
                <p className="text-sm text-slate-400">AI Receptionist</p>
                <div className="mt-10 flex justify-center gap-10">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500"><Icon name="phone" className="h-5 w-5 text-white" /></div>
                    <p className="mt-2 text-xs text-slate-400">Decline</p>
                  </div>
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#72D6C8]"><Icon name="phone" className="h-5 w-5 text-[#031312]" /></div>
                    <p className="mt-2 text-xs text-slate-400">Accept</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="hidden border-[#72D6C8]/25 bg-white/5 p-5 backdrop-blur md:block">
              <p className="mb-4 text-sm font-black uppercase tracking-wide text-[#72D6C8]">Missed Call Text Back</p>
              <div className="space-y-4 text-sm">
                <div className="max-w-[88%] rounded-2xl bg-white p-4 text-slate-950 shadow-lg">
                  Hi! Thank you for calling <b>Dream Med Spa</b>. How can I help you today?
                  <p className="mt-1 text-right text-[10px] text-slate-500">2:31 PM</p>
                </div>
                <div className="ml-auto max-w-[88%] rounded-2xl bg-[#72D6C8] p-4 text-[#031312] shadow-lg">
                  Hi! I was wondering if you have any availability for a facial this week?
                  <p className="mt-1 text-right text-[10px] text-[#031312]/60">2:32 PM</p>
                </div>
                <div className="max-w-[88%] rounded-2xl bg-white p-4 text-slate-950 shadow-lg">
                  Yes! I’d be happy to help you book that. What day works best for you?
                  <p className="mt-1 text-right text-[10px] text-slate-500">2:32 PM</p>
                </div>
                <div className="ml-auto max-w-[80%] rounded-2xl bg-[#72D6C8] p-4 text-[#031312] shadow-lg">
                  Thursday morning works!
                  <p className="mt-1 text-right text-[10px] text-[#031312]/60">2:33 PM</p>
                </div>
                <div className="max-w-[88%] rounded-2xl bg-white p-4 text-slate-950 shadow-lg">
                  Perfect! You’re all set for <b>Thursday at 10:00 AM.</b> See you then!
                  <p className="mt-1 text-right text-[10px] text-slate-500">2:39 PM</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="industries" className="border-y border-[#72D6C8]/15 bg-black/25 py-9">
          <div className="mx-auto max-w-7xl px-5 text-center">
            <p className="mb-7 text-sm font-black uppercase tracking-[0.2em] text-[#72D6C8]">Trusted by businesses that value every call</p>
            <div className="grid gap-5 text-left sm:grid-cols-2 md:grid-cols-5">
              {industries.map((industry) => (
                <div key={industry} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm font-black uppercase tracking-wide text-slate-400">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="bg-slate-50 px-5 py-16 text-[#031312]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">How <span className="text-[#58AA9D]">Bookora</span> AI Receptionist Works</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map(([icon, title, desc], index) => (
                <div key={title} className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#58AA9D]/40 bg-[#72D6C8]/40 text-[#031312]">
                    <Icon name={icon} className="h-8 w-8" />
                  </div>
                  <div className="mx-auto mt-5 flex h-7 w-7 items-center justify-center rounded-md bg-[#58AA9D] text-sm font-black text-white">{index + 1}</div>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
  Simple Pricing. <span className="text-[#72D6C8]">Easy Start.</span>
</h2>

<p className="mt-3 max-w-2xl text-slate-300">
  Start today for $500. Your first 30 days are included, then continue month-to-month. Cancel anytime.
</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
            {packages.map((pkg) => (
              <div key={pkg.name} className="text-left">
                <Card className={`relative h-full overflow-hidden bg-white/5 transition ${activePackage === pkg.name ? "border-[#72D6C8] shadow-2xl shadow-[#58AA9D]/20" : "border-white/10 hover:border-[#72D6C8]/40"}`}>
                  {pkg.name === "Growth" && <div className="bg-[#72D6C8] py-2 text-center text-xs font-black text-[#031312]">Most Popular</div>}
                  <div className="p-7">
                    <h3 className="text-2xl font-black">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{pkg.bestFor}</p>
                    <div className="mt-6">
  <p className="text-4xl font-black">
    {pkg.price}
  </p>

  <p className="mt-2 text-sm font-semibold text-[#72D6C8]">
    {pkg.monthly}
  </p>

  <p className="mt-2 text-xs text-slate-400">
    Includes setup + first 30 days
  </p>
</div>
                    <div className="mt-6 space-y-3">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex gap-3 text-sm text-slate-200">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#72D6C8]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant={pkg.name === "Growth" ? "solid" : "outline"}
                      className="mt-7 w-full"
                      onClick={() =>
                        openLink(
                          pkg.name === "Starter"
                          ? STARTER_URL
                          : pkg.name === "Growth"
                          ? GROWTH_URL
                          : PRO_URL
  )
}
                    >
                      Get Started
                    </Button>
                  </div>
                </Card>
              </div>
            ))}

            <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-7">
              {[
                ["spark", "$500 Includes Setup", "Your first 30 days are included."],
                ["shield", "Cancel Anytime", "No contracts. No hassle."],
                ["check", "30-Day Launch Guarantee", "If your system isn’t working as designed, we’ll make it right."],
                ["users", "Built For Small Business", "Simple systems that help you grow."],
              ].map(([icon, title, desc]) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#72D6C8]/40 text-[#72D6C8]">
                    <Icon name={icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-black">{title}</h4>
                    <p className="mt-1 text-sm text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#72D6C8]/25 bg-[#58AA9D]/10 p-6">
            <p className="text-sm text-[#C8FFF7]">Selected package</p>
            <h3 className="mt-1 text-2xl font-black">{active.name} — {active.price}</h3>
            <p className="mt-2 text-slate-300">{active.bestFor}</p>
          </div>
        </section>

        <section id="resources" className="bg-[#72D6C8] px-5 py-10 text-[#031312]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <BookoraLogo className="h-16 w-16" />
              <h2 className="text-2xl font-black md:text-3xl">Ready to Stop Missing Calls and Start Booking More?</h2>
            </div>
            <p className="max-w-md text-sm font-semibold">Join businesses using Bookora AI Receptionist to capture more leads and grow revenue.</p>
            <Button
              className="bg-[#031312] text-white hover:bg-[#10231F]"
              onClick={() => openLink(DEMO_BOOKING_URL)}
            >
              <Icon name="calendar" className="mr-2 h-5 w-5" /> Book Your Demo Today
            </Button>
          </div>
        </section>
        <footer className="border-t border-white/10 bg-black/40 px-5 py-8 text-sm text-slate-400">
  <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <div>
      <p className="font-semibold text-white">Bookora</p>
      <p>(727) 620-6969</p>
      <p>1224 S Highland Ave #1008 Clearwater, FL 33756</p>
    </div>

    <div className="flex gap-6">
      <a
  href="/?page=privacy-policy"
        className="hover:text-white"
      >
        Privacy Policy
      </a>

      <a
  href="/?page=terms-and-conditions"
  className="hover:text-white"
      >
        Terms & Conditions
      </a>
    </div>

  </div>
</footer>
      </main>
    </div>
  );
}
