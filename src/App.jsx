import React, { useMemo, useState } from "react";
import BookoraRevenueLossCalculator from "./BookoraRevenueLossCalculator";
const ACCENT = "#55a498";
const ACCENT_LIGHT = "#6fc9bd";
const DARK = "#030908";

const BOOKORA_LOGO_SRC = "/bookora-logo.png";

function BookoraLogo({ className = "h-12 w-12 object-contain" }) {
  return (
    <img
      src={BOOKORA_LOGO_SRC}
      alt="Bookora logo"
      className={`${className} block shrink-0`}
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
  const base = "inline-flex items-center justify-center rounded-2xl px-6 py-4 font-bold transition focus:outline-none focus:ring-2 focus:ring-[#6fc9bd] focus:ring-offset-2 focus:ring-offset-[#030908]";
  const styles = variant === "outline"
    ? "border border-[#6fc9bd]/40 bg-white/5 text-white hover:bg-[#55a498]/10"
    : "bg-[#6fc9bd] text-[#031312] hover:bg-[#8BE7DA]";

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
    name: "Basic",
    price: "$500 setup",
    startup: "$500",
    monthly: "$197/mo",
    usage: "45 AI voice minutes included • then $0.50/min",
    bestFor: "AI receptionist + appointment booking",
    features: [
      "45 AI voice minutes included",
      "24/7 AI receptionist",
      "Text follow-up",
      "Appointment booking",
      "Calendar integration",
      "Call summaries",
      "Basic lead capture",
      "Email notifications",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$1,000 setup",
    startup: "$1,000",
    monthly: "$397/mo",
    usage: "90 AI voice minutes included • then $0.40/min",
    setup: "Most popular",
    bestFor: "AI receptionist + lead nurturing",
    features: [
      "90 AI voice minutes included",
      "Everything in Basic",
      "Custom AI call flow",
      "Lead qualification",
      "Lead nurturing",
      "Missed call text-back",
      "Google review requests",
      "Internal team notifications",
      "Call transcripts",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$1,500 setup",
    startup: "$1,500",
    monthly: "$697/mo",
    usage: "180 AI voice minutes included • then $0.30/min",
    setup: "For advanced businesses",
    bestFor: "Full AI lead conversion system",
    features: [
      "180 AI voice minutes included",
      "Everything in Growth",
      "Advanced AI receptionist setup",
      "Advanced call routing",
      "Multi-location support",
      "Multi-phone-number support",
      "Multi-department call flows",
      "Advanced automations",
      "Monthly performance report",
      "Dedicated account support",
      "VIP support",
    ],
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
  console.assert(getPackageByName(PACKAGE_DATA, "Growth").monthly === "$397/mo", "Growth package monthly price should be $397/mo.");
  console.assert(getPackageByName(PACKAGE_DATA, "Missing").name === "Growth", "Unknown package should default to Growth.");
  console.assert(ACCENT === "#55a498", "Accent color should match the Bookora logo teal.");
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
            <p className="text-2xl font-black">Bookora</p>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6fc9bd]">AI Receptionist</p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#6fc9bd]/20 bg-white/5 p-8 leading-7 text-slate-200">
          <h1 className="mb-4 text-4xl font-black text-white">{title}</h1>
          <p className="mb-6 text-sm text-slate-400">Last updated: May 2026</p>

          {isPrivacy ? (
            <div className="space-y-5">
  <p>Bookora (“we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information you provide to us. This Privacy Policy explains how we collect, use, store, and share information when you visit our website, submit a form, schedule a demo, call us, text us, or interact with our AI-powered communication services.</p>

  <h2 className="pt-4 text-2xl font-black text-white">1. Information We Collect</h2>
  <p>We may collect personal information including your name, email address, phone number, business name, business type, website, appointment preferences, inquiry details, and any other information you choose to provide.</p>
  <p>We may also collect automatically collected information including IP address, browser type, device information, pages visited, form activity, and website usage data.</p>

  <h2 className="pt-4 text-2xl font-black text-white">2. AI Voice, Calls, Recordings, and Transcripts</h2>
  <p>Bookora may use artificial intelligence, automation, and voice AI tools to answer calls, respond to inquiries, collect information, assist with scheduling, route calls, and provide customer support.</p>
  <p>When you call or interact with our AI voice tools, we may collect call audio, transcripts, call summaries, phone numbers, call duration, call metadata, interaction logs, and information you provide during the conversation. Calls may be recorded or transcribed for quality assurance, follow-up, training, support, and service improvement.</p>
  <p>By calling Bookora or interacting with our AI voice tools, you consent to the use of AI-assisted communication, call recording, transcription, and follow-up where permitted by law.</p>

  <h2 className="pt-4 text-2xl font-black text-white">3. How We Use Your Information</h2>
  <p>We use the information we collect to respond to inquiries, schedule demos, provide customer support, deliver our services, operate AI voice and SMS automation, send appointment confirmations and reminders, follow up with leads, process payments, improve our services and website functionality, and communicate with you about Bookora.</p>

  <h2 className="pt-4 text-2xl font-black text-white">4. SMS, Phone, and Email Communications</h2>
  <p>By providing your phone number or submitting a form on our website, you consent to receive communications from Bookora by phone, email, and SMS text message. These communications may include appointment confirmations, appointment reminders, follow-ups regarding your inquiry, service-related notifications, and promotional messages where permitted by law.</p>
  <p>Message frequency varies. Message and data rates may apply. You can opt out of SMS messages at any time by replying STOP. For assistance, reply HELP or contact us at support@bookora.ai.</p>
  <p>We will honor reasonable opt-out or consent revocation requests as required by applicable law.</p>

  <h2 className="pt-4 text-2xl font-black text-white">5. How We Share Your Information</h2>
  <p>We do not sell, rent, or share your SMS opt-in data or consent with third parties for their marketing purposes.</p>
  <p>We may share information with trusted service providers only as necessary to operate our business and provide our services. These providers may include CRM platforms, AI voice providers, phone and SMS providers, email providers, payment processors, calendar tools, analytics tools, hosting providers, and automation platforms.</p>
  <p>Examples of service providers we may use include GoHighLevel/LeadConnector, Retell AI, Stripe, Google Calendar, email and SMS providers, phone providers, analytics tools, and website hosting providers.</p>

  <h2 className="pt-4 text-2xl font-black text-white">6. Payments and Billing</h2>
  <p>If you purchase services from Bookora, payment information may be processed by third-party payment processors such as Stripe. Bookora does not store full credit card numbers on its website.</p>

  <h2 className="pt-4 text-2xl font-black text-white">7. Healthcare and Emergency Disclaimer</h2>
  <p>Bookora is not a healthcare provider and does not provide medical advice, diagnosis, treatment, or emergency services. Our tools are intended for scheduling, communication, lead follow-up, and administrative support only. For medical emergencies, call 911 or contact a qualified healthcare provider directly.</p>

  <h2 className="pt-4 text-2xl font-black text-white">8. Medical, Healthcare, and HIPAA-Supported Workflows</h2>
  <p>Bookora may provide appointment communication, missed-call follow-up, lead follow-up, reminders, review requests, and administrative automation services for medical-aesthetic businesses, wellness clinics, med spas, and other health-related businesses.</p>
  <p>Bookora’s standard services are not intended to collect medical history, diagnosis information, symptoms, medications, treatment photos, insurance information, or other protected health information through standard SMS, AI voice, chat, or non-secure forms.</p>
  <p>If a client requires Bookora to create, receive, maintain, or transmit protected health information, additional HIPAA-supported configuration, Business Associate Agreements, vendor requirements, access controls, and compliance procedures may be required before those workflows are enabled.</p>
  <p>Website visitors, callers, and customers should not submit sensitive medical information, treatment details, medical history, symptoms, medications, or photos through Bookora’s standard website forms, SMS messages, AI voice tools, or chat tools unless a HIPAA-supported workflow has been specifically implemented.</p>

  <h2 className="pt-4 text-2xl font-black text-white">8. Data Security</h2>
  <p>We take reasonable administrative, technical, and physical measures to protect personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission or storage is completely secure.</p>

  <h2 className="pt-4 text-2xl font-black text-white">9. Data Retention</h2>
  <p>We retain personal information, call records, transcripts, messages, and related service data for as long as reasonably necessary to provide our services, comply with legal obligations, resolve disputes, improve our systems, and enforce our agreements.</p>

  <h2 className="pt-4 text-2xl font-black text-white">10. Your Rights and Choices</h2>
  <p>You may request access to the personal information we have about you, request corrections or updates, request deletion where applicable, or opt out of communications. To make a request, contact us at support@bookora.ai.</p>

  <h2 className="pt-4 text-2xl font-black text-white">11. Cookies and Tracking Technologies</h2>
  <p>We may use cookies and similar tracking technologies to enhance your experience on our website, understand usage, improve performance, and support marketing or analytics. You can adjust your browser settings to refuse cookies if you prefer.</p>

  <h2 className="pt-4 text-2xl font-black text-white">12. Third-Party Websites and Services</h2>
  <p>Our website and services may link to or integrate with third-party websites, platforms, or services. We are not responsible for the privacy practices, security, or content of those third parties.</p>

  <h2 className="pt-4 text-2xl font-black text-white">13. Changes to This Privacy Policy</h2>
  <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

  <h2 className="pt-4 text-2xl font-black text-white">14. Contact Information</h2>
  <p>Bookora<br />1224 S Highland Ave #1008<br />Clearwater, FL 33756<br />United States<br />Email: support@bookora.ai<br />Phone: (727) 620-6969</p>
</div>
          ) : (
            <div className="space-y-5">
  <p>Welcome to Bookora. By accessing or using our website, submitting a form, booking a demo, communicating with us, or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our website or services.</p>

  <h2 className="pt-4 text-2xl font-black text-white">1. Use of Services</h2>
  <p>Bookora provides AI-powered communication, appointment scheduling, missed-call follow-up, customer engagement, and lead conversion tools for businesses. By using our services, you agree to use them only for lawful business purposes and in accordance with these Terms.</p>

  <h2 className="pt-4 text-2xl font-black text-white">2. AI and Automated Communications</h2>
  <p>Bookora may use artificial intelligence, automation, voice AI, SMS automation, email automation, and related tools to answer calls, respond to inquiries, collect information, assist with scheduling, route calls, and provide customer support.</p>
  <p>You understand that some communications may be handled by an AI assistant or automated system rather than a human representative.</p>

  <h2 className="pt-4 text-2xl font-black text-white">3. Call Recording and Transcription Consent</h2>
  <p>Calls with Bookora or its AI tools may be recorded, monitored, summarized, or transcribed for quality assurance, follow-up, training, support, and service improvement. By calling Bookora or interacting with our AI voice tools, you consent to call recording, transcription, AI-assisted communication, and follow-up where permitted by law.</p>

  <h2 className="pt-4 text-2xl font-black text-white">4. Communications Consent</h2>
  <p>By submitting your information through our website, booking a demo, calling us, texting us, or otherwise providing your contact information, you agree to receive communications from Bookora by email, phone, and SMS text message.</p>
  <p>These communications may include appointment confirmations, appointment reminders, follow-ups regarding your inquiry, service-related notifications, onboarding messages, billing-related messages, and promotional communications where permitted by law.</p>
  <p>Message frequency varies. Message and data rates may apply. You may opt out of SMS messages at any time by replying STOP. For assistance, reply HELP or contact support@bookora.ai.</p>

  <h2 className="pt-4 text-2xl font-black text-white">5. Client Responsibilities</h2>
  <p>Clients are responsible for providing accurate business information, calendar details, service details, pricing information, approved scripts, customer communication rules, and any required legal or compliance instructions needed to configure their system.</p>
  <p>Clients are responsible for ensuring their own use of Bookora complies with applicable laws, industry rules, privacy requirements, advertising rules, call recording rules, SMS consent rules, and customer communication requirements.</p>

  <h2 className="pt-4 text-2xl font-black text-white">6. SMS, Phone, and Usage-Based Costs</h2>
  <p>Some services may include usage-based costs, including AI voice minutes, phone usage, SMS usage, email usage, carrier fees, and related platform charges. Usage-based costs may be billed separately or added to the client’s invoice based on actual usage and the selected plan.</p>

  <h2 className="pt-4 text-2xl font-black text-white">7. Payments, Setup Fees, and Monthly Plans</h2>
  <p>Medical-aesthetic, healthcare, or HIPAA-supported workflows may require additional setup fees, monthly fees, platform fees, compliance-supported configuration, Business Associate Agreements, or vendor-related costs. These fees may vary depending on the selected package and required workflow.</p>
  <p>Bookora may charge setup fees, monthly subscription fees, and usage-based fees according to the package selected. Setup fees may include onboarding, system setup, launch support, and the first 30 days where stated. After the first 30 days, monthly service fees continue month-to-month unless canceled.</p>
  <p>Failure to pay invoices or usage-based charges may result in suspension or termination of services.</p>

  <h2 className="pt-4 text-2xl font-black text-white">8. Results, Guarantees, and Client Responsibilities</h2>
  <p>Bookora may offer certain limited promotional guarantees, launch guarantees, or service commitments in writing as part of a specific package, proposal, or agreement. Any such guarantee applies only if the client meets the stated conditions, including providing required access, accurate business information, approved scripts, sufficient lead volume where applicable, timely staff follow-up, and continued use of the approved workflows during the guarantee period.</p>
  <p>Except for guarantees expressly stated in a written agreement, Bookora does not guarantee specific business results, revenue increases, appointment volume, call answer rates, lead conversion rates, customer responses, or return on investment. Results depend on many factors outside of Bookora’s control, including market demand, offer quality, staffing, pricing, reputation, lead volume, and client follow-up.</p>

  <h2 className="pt-4 text-2xl font-black text-white">9. Healthcare and Emergency Disclaimer</h2>
  <p>Bookora is not a healthcare provider and does not provide medical advice, diagnosis, treatment, or emergency services. Bookora’s tools are intended for scheduling, communication, lead follow-up, and administrative support only. For medical emergencies, call 911 or contact a qualified healthcare provider directly.</p>

  <h2 className="pt-4 text-2xl font-black text-white">10. Medical-Aesthetic, Healthcare, and HIPAA-Supported Services</h2>
  <p>Bookora may offer privacy-conscious workflows for med spas, medical-aesthetic businesses, wellness clinics, and other health-related businesses. These workflows are designed for administrative support, appointment communication, missed-call follow-up, reminders, lead follow-up, and review requests.</p>
  <p>Bookora’s standard services are not designed for medical intake or for collecting protected health information through standard SMS, AI voice, chat, or non-secure forms. Clients agree not to use Bookora’s standard services to collect medical history, diagnosis information, symptoms, medications, treatment photos, insurance information, or other protected health information unless a HIPAA-supported workflow and required agreements are in place.</p>
  <p>If a client’s use of Bookora may involve protected health information, the client is responsible for notifying Bookora before launch. Additional HIPAA-supported configuration, Business Associate Agreements, vendor requirements, access controls, and compliance procedures may be required. Bookora may decline, pause, or modify any workflow that creates compliance, privacy, or security concerns.</p>
  <p>Clients remain responsible for their own legal, healthcare, privacy, advertising, call recording, SMS consent, and industry-specific compliance obligations. Bookora does not provide medical, legal, or compliance advice.</p>

  <h2 className="pt-4 text-2xl font-black text-white">10. Prohibited Uses</h2>
  <p>You may not use Bookora for unlawful, abusive, deceptive, fraudulent, harassing, harmful, or non-compliant communications. You may not use our services to send spam, violate consent requirements, impersonate others, collect sensitive information without authorization, or interfere with our systems.</p>

  <h2 className="pt-4 text-2xl font-black text-white">11. Intellectual Property</h2>
  <p>All content on this website, including text, graphics, logos, software, designs, and branding, is the property of Bookora or its licensors and is protected by applicable intellectual property laws. You may not copy, reproduce, modify, distribute, or use any content without prior written permission.</p>

  <h2 className="pt-4 text-2xl font-black text-white">12. Third-Party Services</h2>
  <p>Our services may integrate with third-party tools and platforms, including CRM systems, AI voice providers, phone providers, SMS providers, calendar tools, payment processors, and analytics providers. Bookora is not responsible for outages, errors, pricing changes, data practices, or policies of third-party services.</p>

  <h2 className="pt-4 text-2xl font-black text-white">13. Limitation of Liability</h2>
  <p>To the fullest extent permitted by law, Bookora is not liable for indirect, incidental, special, consequential, punitive, or lost-profit damages arising from or related to the use of our website or services.</p>

  <h2 className="pt-4 text-2xl font-black text-white">14. Suspension and Termination</h2>
  <p>We reserve the right to suspend or terminate access to our services at any time for non-payment, misuse, unlawful activity, platform abuse, compliance concerns, or violations of these Terms.</p>

  <h2 className="pt-4 text-2xl font-black text-white">15. Changes to Terms</h2>
  <p>We may update these Terms and Conditions at any time. Updates will be posted on this page with a revised effective date. Continued use of our website or services after updates means you accept the revised Terms.</p>

  <h2 className="pt-4 text-2xl font-black text-white">16. Additional Messaging Terms</h2>
  <p>Carriers are not liable for delayed or undelivered messages. You must be at least 18 years old to use our services. Please review our Privacy Policy for more information on how we collect and use your data.</p>

  <h2 className="pt-4 text-2xl font-black text-white">17. Contact Information</h2>
  <p>Bookora<br />1224 S Highland Ave #1008<br />Clearwater, FL 33756<br />United States<br />Email: support@bookora.ai<br />Phone: (727) 620-6969</p>
</div>
          )}

          <a href="/" className="mt-8 inline-flex rounded-2xl bg-[#6fc9bd] px-5 py-3 font-bold text-[#031312] hover:bg-[#8BE7DA]">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
function RevenueImpactSection() {
  const rows = [
    {
      metric: "Missed Calls",
      traditional: "15–40%",
      ai: "<3%",
      impact: "Very High",
      estimate: "+$5k–$20k/mo",
    },
    {
      metric: "Response Time",
      traditional: "~30 min",
      ai: "<10 sec",
      impact: "High",
      estimate: "+$3k–$12k/mo",
    },
    {
      metric: "Lead Follow-Up",
      traditional: "Inconsistent",
      ai: "24/7 Instant",
      impact: "Very High",
      estimate: "+$8k–$25k/mo",
    },
    {
      metric: "Appointment Booking",
      traditional: "Manual",
      ai: "Automated",
      impact: "High",
      estimate: "+$4k–$15k/mo",
    },
    {
      metric: "Review Requests",
      traditional: "Rarely Sent",
      ai: "Automatic",
      impact: "Medium",
      estimate: "+$2k–$8k/mo",
    },
    {
      metric: "Lead Conversion",
      traditional: "20–30%",
      ai: "40–60%",
      impact: "Very High",
      estimate: "+$10k–$40k/mo",
    },
  ];

  return (
    <section
      id="revenue-impact"
      className="mx-auto max-w-7xl px-5 py-20"
    >
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
          Numbers Don’t <span className="text-[#6fc9bd]">Lie</span>
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Slow response times and missed calls cost local businesses
          thousands every month. Bookora helps recover lost revenue
          automatically.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-[#55a498]/10 backdrop-blur">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-6 text-left text-sm font-black uppercase tracking-wide text-slate-400">
                  Metric
                </th>

                <th className="px-6 py-6 text-center text-sm font-black uppercase tracking-wide text-slate-400">
                  Human Staff
                </th>

                <th className="bg-[#6fc9bd]/10 px-6 py-6 text-center text-sm font-black uppercase tracking-wide text-[#6fc9bd]">
                  Bookora AI
                </th>

                <th className="px-6 py-6 text-center text-sm font-black uppercase tracking-wide text-slate-400">
                  Revenue Impact
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5"
                >
                  <td className="px-6 py-5 font-semibold text-white">
                    {row.metric}
                  </td>

                  <td className="px-6 py-5 text-center text-slate-300">
                    {row.traditional}
                  </td>

                  <td className="bg-[#6fc9bd]/5 px-6 py-5 text-center font-black text-[#6fc9bd]">
                    {row.ai}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex rounded-full bg-[#6fc9bd]/10 px-4 py-2 text-sm font-black text-[#6fc9bd]">
                      {row.estimate}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-white/10 p-8 text-center">
          <h3 className="text-3xl font-black">
            Curious How Much Revenue You’re Losing?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Use the Revenue Leak Calculator to estimate how much
            missed calls and slow response times may be costing your
            business every month.
          </p>

          <a
            href="/?page=revenue-calculator"
            className="mt-6 inline-flex rounded-2xl bg-[#6fc9bd] px-7 py-4 font-black text-[#031312] transition hover:bg-[#8BE7DA]"
          >
            Calculate Your Revenue Leak
          </a>
        </div>
      </div>
    </section>
  );
}

export default function BookoraAIReceptionistDemoPage() {
  // ===== REPLACE THESE WITH YOUR REAL LINKS =====
  const DEMO_BOOKING_URL = "https://links.bookora.ai/widget/booking/gdVSUoWSEXFMddK3zFO7";

const CLIENT_LOGIN_URL = "https://bookora-dashboard.vercel.app";

const Basic_URL = "https://links.bookora.ai/payment-link/6a00004634d67b041e7e893f";
const GROWTH_URL = "https://links.bookora.ai/payment-link/6a00009134d67b041e7e8940";
const Enterprise_URL = "https://links.bookora.ai/payment-link/6a0000a7c43a7488828c277a";

const AI_DEMO_PHONE_NUMBER = "7278664823";

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
if (
  currentPath === "/revenue-calculator" ||
  pageParam === "revenue-calculator"
) {
  return <BookoraRevenueLossCalculator />;
}
  if (currentPath === "/privacy-policy" || pageParam === "privacy-policy") {
    return <LegalPage type="privacy" />;
  }

  if (currentPath === "/terms-and-conditions" || pageParam === "terms-and-conditions") {
    return <LegalPage type="terms" />;
  }
if (
  currentPath === "/revenue-calculator" ||
  pageParam === "revenue-calculator"
) {
  return <BookoraRevenueLossCalculator />;
}
  const industries = [
  "HVAC Companies",
  "Plumbers",
  "Roofers",
  "Electricians",
  "Landscapers",
  "Cleaners",
  "Garage Door Companies",
  "Pest Control",
  "Restoration Companies",
  "Auto Repair Shops",
];
  const steps = [
    ["phone", "AI Answers Calls", "Bookora answers your calls instantly, just like a real receptionist."],
    ["message", "Engages & Qualifies", "It has natural conversations, answers questions, and qualifies leads."],
    ["calendar", "Books Appointments", "It checks availability and books appointments directly on your calendar."],
    ["clock", "Texts Missed Calls", "Missed call? Bookora texts them instantly to keep the conversation going."],
  ];

  return (
    <div className="min-h-screen bg-[#030908] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#55a498]/25 blur-3xl" />
        <div className="absolute -left-48 top-80 h-96 w-96 rounded-full bg-[#6fc9bd]/15 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-[#55a498]/10 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <BookoraLogo className="h-12 w-12 object-contain" />
          <div>
            <p className="text-xl font-black tracking-tight sm:text-2xl">Bookora</p>
<p className="hidden text-sm font-bold uppercase tracking-[0.18em] text-[#6fc9bd] sm:block">
  AI Receptionist
</p>
          </div>
        </div>

    <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 lg:flex">
      <a href="#features" className="hover:text-[#6fc9bd]">Features</a>
      <a href="#how" className="hover:text-[#6fc9bd]">How It Works</a>
      <a href="#pricing" className="hover:text-[#6fc9bd]">Pricing</a>
      <a href="#faq" className="hover:text-[#6fc9bd]">FAQ</a>
      <a href="#industries" className="hover:text-[#6fc9bd]">Industries</a>
      <a href="#resources" className="hover:text-[#6fc9bd]">Resources</a>
    </nav>

        <div className="flex items-center gap-2 sm:gap-3">
  <a
    href={CLIENT_LOGIN_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-xl border border-[#6fc9bd]/40 bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:bg-[#55a498]/10 focus:outline-none focus:ring-2 focus:ring-[#6fc9bd] focus:ring-offset-2 focus:ring-offset-[#030908] sm:rounded-2xl sm:px-5 sm:py-4 sm:text-base"
  >
    Client Login
  </a>

  <button
    type="button"
    onClick={() => openLink(DEMO_BOOKING_URL)}
    className="inline-flex items-center justify-center rounded-xl bg-[#6fc9bd] px-3 py-2 text-xs font-bold text-[#031312] transition hover:bg-[#8BE7DA] focus:outline-none focus:ring-2 focus:ring-[#6fc9bd] focus:ring-offset-2 focus:ring-offset-[#030908] sm:rounded-2xl sm:px-6 sm:py-4 sm:text-base"
  >
    Book Demo
  </button>
</div>
      </header>

      <main className="relative z-10">
               <section className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:pb-24 lg:pt-16">
          <div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight md:text-7xl">
  Never Miss Another Call. <span className="text-[#6fc9bd]">Book More Jobs.</span>
</h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Bookora helps home service businesses capture missed calls, respond instantly, collect job details, and follow up automatically — so more leads turn into booked appointments.
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
                {callingDemo ? "Opening Phone..." : "Call The AI Receptionist"}
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
              <div className="mt-4 rounded-2xl border border-[#6fc9bd]/25 bg-[#55a498]/10 p-4 text-sm text-[#C8FFF7]">
                Opening the live Bookora AI receptionist demo now.
              </div>
            )}

            <div id="features" className="mt-8 flex flex-wrap gap-2">
              {[
                ["phone", "AI Answers Calls"],
                ["message", "Texts Missed Leads"],
                ["calendar", "Books Appointments"],
                ["clock", "Works 24/7"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-[#6fc9bd]/25 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100">
                  <Icon name={icon} className="h-4 w-4 text-[#6fc9bd]" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto max-w-[360px] px-3 pb-8 sm:max-w-[460px] md:max-w-[520px] lg:max-w-none lg:px-0 lg:pb-0">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-[#55a498]/20 blur-3xl" />

            <div className="relative overflow-visible">
              <div className="overflow-hidden rounded-[2rem] border border-[#6fc9bd]/20 bg-white/5 shadow-2xl shadow-[#55a498]/20">
                <img
  src="/bookora-home-services-hero.png"
  alt="HVAC technician servicing equipment at a residential home"
  className="h-[500px] w-full object-cover object-center sm:h-[560px] md:h-[640px] lg:h-[700px]"
/>
              </div>

              <div className="absolute right-[-20px] top-6 z-20 max-w-[210px] rounded-xl border border-white/70 bg-white p-3 text-[#031312] shadow-xl shadow-black/20 backdrop-blur lg:-right-16 lg:top-10">
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#55a498]/15 text-[#55a498] sm:h-8 sm:w-8">
                    <Icon name="phone" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-black sm:text-sm">Call Summary</p>
                    <p className="mt-1 text-[10px] leading-3 text-slate-700 sm:text-xs sm:leading-4">
                      AC not cooling. Preferred time: Tomorrow 10:30 AM.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute left-[-25px] top-[42%] z-20 max-w-[210px] -translate-y-1/2 rounded-xl border border-white/70 bg-white p-3 text-[#031312] shadow-xl shadow-black/20 backdrop-blur lg:-left-20">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#55a498] text-white sm:h-8 sm:w-8">
                    <Icon name="check" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-black leading-tight sm:text-sm">
                      Appointment Confirmed
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-700 sm:text-xs">
                      Tue 10:30 AM
                    </p>
                  </div>
                </div>

                <div className="mt-2 border-t border-slate-200 pt-1.5">
                  <p className="text-base font-black text-[#55a498] sm:text-lg">$285</p>
                </div>
              </div>

              <div className="absolute bottom-[-15px] right-[-20px] z-20 w-[210px] rounded-xl border border-white/70 bg-white p-3 text-[#031312] shadow-xl shadow-black/20 backdrop-blur lg:-bottom-6 lg:-right-10 lg:w-[230px]">
                <p className="text-xs font-black leading-tight sm:text-sm">
                  Recovered Jobs
                </p>

                <p className="mt-1.5 text-2xl font-black text-[#55a498] sm:text-3xl">
                  $3,420
                </p>

                <p className="mt-0.5 text-[10px] text-slate-700 sm:text-xs">
                  12 recovered this week
                </p>

                <div className="mt-3 rounded-lg bg-[#55a498]/8 p-1.5 sm:rounded-xl sm:p-2">
                  <svg
                    viewBox="0 0 220 60"
                    className="h-12 w-full sm:h-14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="recoveredFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#55a498" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#55a498" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 50 C12 44, 20 42, 30 45 C40 48, 50 46, 60 40 C70 34, 82 35, 92 40 C102 45, 112 43, 120 37 C128 31, 138 32, 148 37 C158 42, 168 39, 176 28 C184 17, 195 14, 205 18 C212 20, 217 15, 216 12 L220 60 L0 60 Z"
                      fill="url(#recoveredFill)"
                    />

                    <path
                      d="M0 50 C12 44, 20 42, 30 45 C40 48, 50 46, 60 40 C70 34, 82 35, 92 40 C102 45, 112 43, 120 37 C128 31, 138 32, 148 37 C158 42, 168 39, 176 28 C184 17, 195 14, 205 18 C212 20, 217 15, 216 12"
                      stroke="#55a498"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="216" cy="12" r="3.5" fill="#55a498" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section> 

                <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
  <div>
    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6fc9bd]">
      See It In Action
    </p>

    <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
  <span className="block text-white">
    Your AI Receptionist Handles The Call
  </span>
  <span className="block text-[#6fc9bd]">
    While You Handle The Work.
  </span>
</h2>

    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
      Bookora answers calls, captures job details, sends booking links, and notifies your team automatically. SMS automations can be added after carrier verification.
    </p>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[
        ["phone", "Answers calls"],
        ["message", "Captures job details"],
        ["calendar", "Sends booking links"],
        ["clock", "Works after hours"],
      ].map(([icon, label]) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-[#6fc9bd]/20 bg-white/5 p-4 text-sm font-bold text-slate-100"
        >
          <Icon name={icon} className="h-5 w-5 text-[#6fc9bd]" />
          {label}
        </div>
      ))}
    </div>
  </div>

  <div className="grid gap-5 lg:grid-cols-[0.85fr_1fr]">
    <div className="mx-auto w-full max-w-[270px] rounded-[2.5rem] border border-white/20 bg-black p-3 shadow-2xl shadow-[#55a498]/20">
      <div className="rounded-[2rem] border border-white/10 bg-[#071210] p-5 text-center">
        <div className="mx-auto mb-5 h-5 w-24 rounded-b-2xl bg-black" />
        <p className="text-sm text-slate-300">Incoming Call</p>
        <h3 className="mt-1 text-xl font-bold">Reliable HVAC Pros</h3>
        <p className="text-slate-400">(813) 555-0198</p>

        <div className="mx-auto my-8 flex h-32 w-32 items-center justify-center rounded-full border border-[#6fc9bd]/40 bg-[#55a498]/10 p-2">
          <BookoraLogo className="h-28 w-28" />
        </div>

        <p className="font-bold">Bookora AI</p>
        <p className="text-sm text-slate-400">AI Receptionist</p>

        <div className="mt-10 flex justify-center gap-10">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
              <Icon name="phone" className="h-5 w-5 text-white" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Missed</p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#6fc9bd]">
              <Icon name="phone" className="h-5 w-5 text-[#031312]" />
            </div>
            <p className="mt-2 text-xs text-slate-400">Answered</p>
          </div>
        </div>
      </div>
    </div>

    <Card className="hidden border-[#6fc9bd]/25 bg-white/5 p-5 backdrop-blur md:block">
      <p className="mb-4 text-sm font-black uppercase tracking-wide text-[#6fc9bd]">
        AI Lead Follow-Up
      </p>

      <div className="space-y-4 text-sm">
        <div className="max-w-[88%] rounded-2xl bg-white p-4 text-slate-950 shadow-lg">
          Hi! Thanks for calling <b>Reliable HVAC Pros</b>. What can we help you with today?
          <p className="mt-1 text-right text-[10px] text-slate-500">2:31 PM</p>
        </div>

        <div className="ml-auto max-w-[88%] rounded-2xl bg-[#6fc9bd] p-4 text-[#031312] shadow-lg">
          My AC stopped cooling. Do you have anything available tomorrow?
          <p className="mt-1 text-right text-[10px] text-[#031312]/60">2:32 PM</p>
        </div>

        <div className="max-w-[88%] rounded-2xl bg-white p-4 text-slate-950 shadow-lg">
          Absolutely. I can help collect your details and get you scheduled for an AC repair appointment.
          <p className="mt-1 text-right text-[10px] text-slate-500">2:32 PM</p>
        </div>

        <div className="ml-auto max-w-[80%] rounded-2xl bg-[#6fc9bd] p-4 text-[#031312] shadow-lg">
          Perfect, thank you.
          <p className="mt-1 text-right text-[10px] text-[#031312]/60">2:33 PM</p>
        </div>

        <div className="max-w-[88%] rounded-2xl bg-white p-4 text-slate-950 shadow-lg">
          You’re all set. Your AC repair appointment request has been sent to the team, and you’ll receive a confirmation shortly.
          <p className="mt-1 text-right text-[10px] text-slate-500">2:34 PM</p>
        </div>
      </div>
    </Card>
  </div>
</section>

        <section id="industries" className="border-y border-[#6fc9bd]/15 bg-black/25 py-9">
          <div className="mx-auto max-w-7xl px-5 text-center">
            <p className="mb-7 text-sm font-black uppercase tracking-[0.2em] text-[#6fc9bd]">Trusted by businesses that value every call</p>
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
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">How <span className="text-[#55a498]">Bookora</span> AI Receptionist Works</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map(([icon, title, desc], index) => (
                <div key={title} className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#55a498]/40 bg-[#6fc9bd]/40 text-[#031312]">
                    <Icon name={icon} className="h-8 w-8" />
                  </div>                  
                  <h3 className="mt-6 font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
<RevenueImpactSection />
        <section id="pricing" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
  Simple Pricing. <span className="text-[#6fc9bd]">Built To Grow.</span>
</h2>

<p className="mt-3 max-w-2xl text-slate-300">
  Choose the plan that fits your call volume. Bookora helps home service businesses capture missed calls, respond instantly, follow up with leads, and turn more inquiries into booked jobs.
</p>
            </div>
          </div>

          <div className="mb-6 rounded-3xl border border-[#6fc9bd]/20 bg-gradient-to-r from-[#55a498]/10 to-white/5 p-6">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6fc9bd]">
        Home Service Growth Plans
      </p>
      <h3 className="mt-2 text-2xl font-black text-white">
        For home service businesses that want to capture more calls, book more jobs, and stop losing leads after hours.
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
        Perfect for HVAC, plumbing, roofing, electrical, landscaping, cleaning, pest control, restoration, and other local service businesses.
      </p>
    </div>

    <div className="rounded-2xl border border-[#6fc9bd]/25 bg-black/20 px-4 py-3 text-sm font-bold text-[#C8FFF7]">
      Starts at $297/mo
    </div>
  </div>
</div>

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.name} className="text-left">
                <Card
  className={`relative h-full cursor-pointer overflow-hidden bg-white/5 transition hover:-translate-y-1 ${
    activePackage === pkg.name
      ? "scale-[1.02] border-[#6fc9bd] shadow-2xl shadow-[#55a498]/30"
      : "border-white/10 hover:border-[#6fc9bd]/40"
  }`}
>
                  {pkg.name === "Growth" && <div className="bg-[#6fc9bd] py-2 text-center text-xs font-black text-[#031312]">Most Popular</div>}
                  <div
  className="p-7"
  onClick={() => setActivePackage(pkg.name)}
>
                    <h3 className="text-2xl font-black">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{pkg.bestFor}</p>
                    <div className="mt-6">
  <div className="mt-6">
  <p className="text-5xl font-black">
    {pkg.monthly}
  </p>

  <p className="mt-2 text-sm font-semibold text-slate-400">
  after your first 30 days
</p>

<div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
  <p className="text-xs font-black uppercase tracking-wide text-[#6fc9bd]">
    Usage
  </p>
  <p className="mt-1 text-sm font-semibold leading-6 text-slate-200">
    {pkg.usage}
  </p>
</div>

<div className="mt-4 rounded-2xl border border-[#6fc9bd]/25 bg-[#55a498]/10 p-4">
    <p className="text-sm font-black text-[#6fc9bd]">
  {pkg.startup} Startup Includes
</p>
<p className="mt-1 text-xs text-slate-300">
  Setup • onboarding • first 30 days
</p>
  </div>
</div>

  <p className="mt-2 text-xs text-slate-400">
  </p>
</div>
                    <div className="mt-6 space-y-3">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex gap-3 text-sm text-slate-200">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#6fc9bd]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
  variant={activePackage === pkg.name ? "solid" : "outline"}
  className="mt-7 w-full"
  onClick={(e) => {
    e.stopPropagation();

    setActivePackage(pkg.name);

    openLink(
      pkg.name === "Basic"
  ? Basic_URL
  : pkg.name === "Growth"
  ? GROWTH_URL
  : Enterprise_URL
    );
  }}
>
  Get Started
</Button>
                    <p className="mt-3 text-center text-xs text-slate-400">
                     Secure checkout powered by Stripe
                   </p>
                  </div>
                </Card>
              </div>
            ))}

          </div>
<div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {[
    ["spark", "Setup Includes First Month", "Setup, onboarding, and your first 30 days are included."],
    ["shield", "Cancel Anytime", "No contracts. No hassle."],
    ["check", "30-Day Launch Guarantee", "If your system isn’t working as designed, we’ll make it right."],
    ["users", "Built For Small Business", "Simple systems that help you grow."],
  ].map(([icon, title, desc]) => (
    <div
      key={title}
      className="rounded-3xl border border-white/10 bg-white/5 p-5"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#6fc9bd]/40 bg-[#55a498]/10 text-[#6fc9bd]">
          <Icon name={icon} className="h-5 w-5" />
        </div>

        <div>
          <h4 className="text-sm font-black leading-snug text-white">
            {title}
          </h4>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {desc}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-6 text-slate-300">
  <p className="font-black text-white">Usage-Based Costs</p>
  <p className="mt-2">
    Basic includes 45 AI voice minutes per month, then $0.50/min. Growth includes 90 AI voice minutes per month, then $0.40/min. Pro includes 180 AI voice minutes per month, then $0.30/min. SMS, phone, and carrier usage may be billed separately based on actual usage.
  </p>
</div>

        </section>

        <section id="faq" className="mx-auto max-w-5xl px-5 py-12">
  <div className="mb-8 text-center">
  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6fc9bd]">
    Frequently Asked Questions
  </p>

  <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
  Your AI Receptionist Handles The Call{" "}
  <span className="text-[#6fc9bd]">While You Handle The Work.</span>
</h2>

  <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
    Here are the most common questions businesses ask before using Bookora to capture missed calls, follow up with leads, and book more appointments.
  </p>
</div>

  <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
    {[
      {
        question: "What does Bookora do?",
        answer:
          "Bookora helps businesses answer calls with AI, text missed calls instantly, follow up with leads, send reminders, request reviews, and book more appointments automatically.",
      },
      {
        question: "Does Bookora replace my front desk?",
        answer:
          "Not necessarily. Most businesses use Bookora to support their team when staff is busy, after hours, on another call, or when a lead slips through the cracks.",
      },
      {
        question: "Can Bookora book appointments?",
        answer:
          "Yes. Depending on your setup, Bookora can collect appointment details, connect with your calendar, and send confirmations and reminders.",
      },
      {
        question: "What happens when someone misses a call?",
        answer:
          "Bookora can instantly text the missed caller, continue the conversation, collect details, and help move the lead toward booking.",
      },
      {
        question: "Does Bookora work after hours?",
        answer:
          "Yes. Bookora can respond when your business is closed, when your team is unavailable, or when someone reaches out outside normal hours.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Simple setups can usually launch quickly once onboarding is submitted. Timing depends on your package, call flow, calendar setup, services, and business rules.",
      },
      {
  question: "Are there usage fees?",
  answer:
    "Yes. Basic does not include Voice AI. Growth includes 150 AI voice minutes. Enterprise includes 300 AI voice minutes. Additional minutes are $0.25/min. SMS, phone, carrier usage, and compliance-supported medical workflows may be billed separately depending on the plan.",
      },
      {
  question: "Can med spas use Bookora?",
  answer:
    "Yes. Med spas can use Bookora for privacy-conscious appointment follow-up, missed-call recovery, reminders, and lead conversion. Bookora’s standard setup is not designed for medical intake. If a workflow may involve protected health information, a HIPAA-supported setup and required agreements may be needed.",
      },
      {
        question: "Is there a contract?",
        answer:
          "No long-term contract is required. Your startup fee includes setup, onboarding, launch support, and your first 30 days. After that, service continues month-to-month.",
      },
      {
        question: "What happens after I purchase?",
        answer:
          "You’ll receive an onboarding form. Once submitted, we begin setting up your system and preparing it for launch.",
      },
      {
        question: "Can I use Bookora with my existing phone number?",
        answer:
          "In many cases, yes. The best setup depends on your current phone provider, call flow, and whether AI will answer live calls, missed calls, or after-hours calls.",
      },
    ].map((item) => (
      <details key={item.question} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-black text-white transition hover:bg-white/5">
          <span>{item.question}</span>
          <span className="text-xl text-[#6fc9bd] transition group-open:rotate-45">
            +
          </span>
        </summary>

        <div className="px-5 pb-5">
          <p className="text-sm leading-6 text-slate-300">{item.answer}</p>
        </div>
      </details>
    ))}
  </div>

  <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#6fc9bd]/25 bg-[#55a498]/10 p-5 text-center md:flex-row md:text-left">
    <div>
      <h3 className="text-xl font-black text-white">Still have questions?</h3>
      <p className="mt-1 text-sm text-slate-300">
        Book a quick 10-minute demo and we’ll show you how Bookora works.
      </p>
    </div>

    <button
      type="button"
      onClick={() => openLink(DEMO_BOOKING_URL)}
      className="shrink-0 rounded-2xl bg-[#6fc9bd] px-5 py-3 text-sm font-black text-[#031312] transition hover:bg-[#8BE7DA]"
    >
      Book Demo
    </button>
  </div>
</section>

        <section id="resources" className="bg-[#6fc9bd] px-5 py-10 text-[#031312]">
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
      <p>(727) 866-4823</p>
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