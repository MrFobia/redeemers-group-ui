import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Phone, Mail, MapPin, Clock, Wrench, ChevronRight, ChevronLeft, Shield, Star, Calendar } from "lucide-react";

// ─── Brand Tokens ──────────────────────────────────────────────────────────────
const DARK = "#0A0B14";
const CHAR = "#1E2235";
const SAND = "#C4AB6C";
const MUTED = "#6B6E85";
const B = "#1A52A8";

// ─── Global helper ─────────────────────────────────────────────────────────────
export const openInspection = () =>
  window.dispatchEvent(new CustomEvent("open-inspection"));

// ─── Form types ────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  service: string;
  description: string;
  contactMethod: "phone" | "email";
  bestTime: "morning" | "afternoon" | "evening";
}

const INITIAL: FormData = {
  firstName: "", lastName: "", phone: "", email: "",
  address: "", city: "", state: "", zip: "",
  service: "", description: "",
  contactMethod: "phone", bestTime: "morning",
};

const STATES = [
  { code: "TN", label: "Tennessee" },
  { code: "AR", label: "Arkansas" },
  { code: "MS", label: "Mississippi" },
  { code: "MO", label: "Missouri" },
];

const SERVICES = [
  "Foundation Repair",
  "Basement Waterproofing",
  "Crawl Space Encapsulation",
  "Concrete Lifting & Leveling",
  "Mold Remediation",
  "Insulation",
  "Not sure — need an assessment",
];

const TIMES = [
  { id: "morning" as const, label: "Morning", sub: "8 am – 12 pm" },
  { id: "afternoon" as const, label: "Afternoon", sub: "12 – 5 pm" },
  { id: "evening" as const, label: "Evening", sub: "5 – 8 pm" },
];

// ─── Input component ───────────────────────────────────────────────────────────
function Field({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
        {label}{required && <span style={{ color: SAND }}> *</span>}
      </label>
      {children}
      {error && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#e05858" }}>{error}</span>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 4,
  padding: "10px 12px",
  fontFamily: "'Inter',sans-serif",
  fontSize: 14,
  color: "#fff",
  outline: "none",
  width: "100%",
  transition: "border-color .15s",
};

function TextInput({ id, value, onChange, placeholder, type = "text", autoComplete }: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id} type={type} value={value} placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle, borderColor: focused ? SAND : "rgba(255,255,255,0.10)" }}
    />
  );
}

function SelectInput({ id, value, onChange, placeholder, options }: {
  id: string; value: string; onChange: (v: string) => void;
  placeholder: string; options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      id={id} value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        borderColor: focused ? SAND : "rgba(255,255,255,0.10)",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: 36,
        color: value ? "#fff" : "rgba(255,255,255,.35)",
      }}
    >
      <option value="" disabled style={{ background: DARK, color: "rgba(255,255,255,.35)" }}>{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value} style={{ background: DARK, color: "#fff" }}>{o.label}</option>
      ))}
    </select>
  );
}

function PhoneInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const format = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  return (
    <div className="relative flex items-center">
      <span style={{ position: "absolute", left: 12, fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.35)", pointerEvents: "none" }}>+1</span>
      <input
        type="tel" value={value} placeholder="(555) 000-0000"
        onChange={(e) => onChange(format(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, paddingLeft: 36, borderColor: focused ? SAND : "rgba(255,255,255,0.10)" }}
      />
    </div>
  );
}

// ─── Progress dots ─────────────────────────────────────────────────────────────
function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2].map((n) => (
        <div key={n} style={{
          width: n === step ? 24 : 8, height: 8, borderRadius: 4,
          background: n <= step ? SAND : "rgba(255,255,255,0.12)",
          transition: "all .25s ease",
        }} />
      ))}
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.4)", marginLeft: 4 }}>
        Step {step} of 2
      </span>
    </div>
  );
}

// ─── Trust panel ───────────────────────────────────────────────────────────────
function TrustPanel() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between h-full"
      style={{ background: "rgba(196,171,108,0.06)", borderLeft: "1px solid rgba(196,171,108,0.12)", padding: "40px 36px" }}
    >
      <div>
        <div style={{ width: 32, height: 2, background: SAND, marginBottom: 28 }} />
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1.25, marginBottom: 8 }}>
          Free. No pressure.<br />Same-week availability.
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
          A certified inspector will assess your property and give you a written estimate — at no cost, ever.
        </p>

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            { icon: <Calendar size={15} />, title: "Same-week scheduling", body: "Most inspections booked within 2–4 business days." },
            { icon: <Shield size={15} />, title: "Certified inspectors", body: "Licensed structural engineers, not salespeople." },
            { icon: <Star size={15} />, title: "Written estimate", body: "Detailed scope of work. No surprises on invoice day." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div style={{ color: SAND, marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 2 }}>{item.title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.55 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, marginTop: 32 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={SAND}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ))}
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.45)" }}>4.9 avg · 2,400+ reviews</span>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,.35)", fontStyle: "italic", lineHeight: 1.6 }}>
          "They came out the next day, found the issue in 20 minutes, and had a crew here within the week. Best contractor experience I've had."
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: SAND, marginTop: 6, fontWeight: 600 }}>— Marcus T., Memphis TN</p>
      </div>
    </div>
  );
}

// ─── Success screen ─────────────────────────────────────────────────────────────
function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center"
      style={{ padding: "60px 40px" }}
    >
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(196,171,108,0.12)", border: `1px solid rgba(196,171,108,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <CheckCircle size={28} color={SAND} />
      </div>
      <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
        Inspection requested!
      </p>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.7, maxWidth: 380, marginBottom: 36 }}>
        Our scheduling team will call you within 2 business hours to confirm your inspection date. Check your email for a confirmation.
      </p>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "20px 28px", width: "100%", maxWidth: 380, marginBottom: 32, textAlign: "left" }}>
        <p style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 11, color: SAND, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>What happens next</p>
        {[
          "We confirm your appointment window",
          "A certified inspector visits your property",
          "You receive a written, no-obligation estimate",
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-3" style={{ marginBottom: i < 2 ? 12 : 0 }}>
            <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 11, color: SAND, minWidth: 20, marginTop: 1 }}>0{i + 1}</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>

      <button onClick={onClose} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.45)", background: "none", border: "none", cursor: "pointer", letterSpacing: ".5px" }}>
        Close
      </button>
    </motion.div>
  );
}

// ─── Main modal ────────────────────────────────────────────────────────────────
export function InspectionModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => { setOpen(true); setStep(1); setForm(INITIAL); setErrors({}); setSubmitted(false); };
    window.addEventListener("open-inspection", handler);
    return () => window.removeEventListener("open-inspection", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = (key: keyof FormData) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid 10-digit US number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state) e.state = "Select a state";
    if (!form.zip.match(/^\d{5}$/)) e.zip = "5-digit ZIP required";
    if (!form.service) e.service = "Select a service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep1()) {
      setStep(2);
      scrollRef.current?.scrollTo(0, 0);
    }
  };

  const submit = () => {
    if (validateStep2()) setSubmitted(true);
  };

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 900,
              maxHeight: "calc(100vh - 32px)",
              background: DARK,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {submitted ? (
              <SuccessScreen onClose={close} />
            ) : (
              <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
                {/* Form panel */}
                <div
                  ref={scrollRef}
                  style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}
                >
                  {/* Header */}
                  <div style={{ padding: "28px 32px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 24, height: 2, background: SAND }} />
                        <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 10, color: SAND, letterSpacing: 3, textTransform: "uppercase" }}>Free Inspection</span>
                      </div>
                      <h2 style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
                        {step === 1 ? "Let's get in touch" : "Where do you need help?"}
                      </h2>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,.45)" }}>
                        {step === 1 ? "Your information stays private. No spam, ever." : "Service available in TN, AR, MS & MO."}
                      </p>
                    </div>
                    <button onClick={close} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 6, padding: 8, cursor: "pointer", color: "rgba(255,255,255,.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 16 }}>
                      <X size={16} />
                    </button>
                  </div>

                  {/* Progress */}
                  <div style={{ padding: "16px 32px 0", flexShrink: 0 }}>
                    <StepDots step={step} />
                  </div>

                  {/* Form body */}
                  <div style={{ padding: "24px 32px 32px", flex: 1 }}>
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: "flex", flexDirection: "column", gap: 18 }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <Field label="First name" required error={errors.firstName}>
                              <TextInput id="firstName" value={form.firstName} onChange={set("firstName")} placeholder="John" autoComplete="given-name" />
                            </Field>
                            <Field label="Last name" required error={errors.lastName}>
                              <TextInput id="lastName" value={form.lastName} onChange={set("lastName")} placeholder="Smith" autoComplete="family-name" />
                            </Field>
                          </div>
                          <Field label="Phone number" required error={errors.phone}>
                            <PhoneInput value={form.phone} onChange={set("phone")} />
                          </Field>
                          <Field label="Email address" required error={errors.email}>
                            <TextInput id="email" value={form.email} onChange={set("email")} placeholder="john@example.com" type="email" autoComplete="email" />
                          </Field>

                          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                            <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
                              Preferred contact method
                            </label>
                            <div className="flex gap-3">
                              {[
                                { id: "phone" as const, icon: <Phone size={13} />, label: "Phone call" },
                                { id: "email" as const, icon: <Mail size={13} />, label: "Email" },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => setForm((f) => ({ ...f, contactMethod: opt.id }))}
                                  className="flex items-center gap-2 flex-1"
                                  style={{
                                    padding: "10px 14px",
                                    background: form.contactMethod === opt.id ? "rgba(196,171,108,0.12)" : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${form.contactMethod === opt.id ? "rgba(196,171,108,0.5)" : "rgba(255,255,255,0.08)"}`,
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    transition: "all .15s",
                                    color: form.contactMethod === opt.id ? SAND : "rgba(255,255,255,.45)",
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: 13,
                                    fontWeight: form.contactMethod === opt.id ? 600 : 400,
                                  }}
                                >
                                  {opt.icon}
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
                              Best time to reach you
                            </label>
                            <div className="flex gap-3">
                              {TIMES.map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() => setForm((f) => ({ ...f, bestTime: t.id }))}
                                  className="flex flex-col items-center flex-1"
                                  style={{
                                    padding: "10px 8px",
                                    background: form.bestTime === t.id ? "rgba(196,171,108,0.12)" : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${form.bestTime === t.id ? "rgba(196,171,108,0.5)" : "rgba(255,255,255,0.08)"}`,
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    transition: "all .15s",
                                  }}
                                >
                                  <span style={{ fontFamily: "'Articulat CF',sans-serif", fontWeight: 700, fontSize: 12, color: form.bestTime === t.id ? SAND : "rgba(255,255,255,.6)" }}>{t.label}</span>
                                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{t.sub}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={next}
                            className="flex items-center justify-center gap-2 w-full"
                            style={{
                              marginTop: 8,
                              padding: "14px 24px",
                              background: SAND,
                              border: "none",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontFamily: "'Articulat CF',sans-serif",
                              fontWeight: 700,
                              fontSize: 14,
                              color: DARK,
                              letterSpacing: ".5px",
                            }}
                          >
                            Continue <ChevronRight size={16} />
                          </button>
                          <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: -4 }}>
                            Your data is encrypted and never sold.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: "flex", flexDirection: "column", gap: 18 }}
                        >
                          <Field label="Property address" required error={errors.address}>
                            <TextInput id="address" value={form.address} onChange={set("address")} placeholder="123 Oak Street" autoComplete="street-address" />
                          </Field>

                          <div className="grid grid-cols-5 gap-3">
                            <div className="col-span-2">
                              <Field label="City" required error={errors.city}>
                                <TextInput id="city" value={form.city} onChange={set("city")} placeholder="Memphis" autoComplete="address-level2" />
                              </Field>
                            </div>
                            <div className="col-span-2">
                              <Field label="State" required error={errors.state}>
                                <SelectInput
                                  id="state" value={form.state} onChange={set("state")}
                                  placeholder="State"
                                  options={STATES.map((s) => ({ value: s.code, label: s.label }))}
                                />
                              </Field>
                            </div>
                            <div className="col-span-1">
                              <Field label="ZIP" required error={errors.zip}>
                                <TextInput id="zip" value={form.zip} onChange={set("zip")} placeholder="38101" />
                              </Field>
                            </div>
                          </div>

                          <Field label="Service needed" required error={errors.service}>
                            <SelectInput
                              id="service" value={form.service} onChange={set("service")}
                              placeholder="Select a service…"
                              options={SERVICES.map((s) => ({ value: s, label: s }))}
                            />
                          </Field>

                          <Field label="Tell us what's happening" error={errors.description}>
                            <textarea
                              value={form.description}
                              onChange={(e) => set("description")(e.target.value)}
                              placeholder="Describe what you're seeing — cracks, settling, moisture, odors, etc. Any detail helps."
                              rows={3}
                              style={{
                                ...inputStyle,
                                resize: "vertical",
                                minHeight: 80,
                              }}
                            />
                          </Field>

                          <div className="flex gap-3" style={{ marginTop: 8 }}>
                            <button
                              onClick={() => setStep(1)}
                              className="flex items-center gap-2"
                              style={{
                                padding: "14px 20px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.10)",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontFamily: "'Inter',sans-serif",
                                fontWeight: 500,
                                fontSize: 13,
                                color: "rgba(255,255,255,.55)",
                              }}
                            >
                              <ChevronLeft size={15} /> Back
                            </button>
                            <button
                              onClick={submit}
                              className="flex items-center justify-center gap-2 flex-1"
                              style={{
                                padding: "14px 24px",
                                background: SAND,
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontFamily: "'Articulat CF',sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                color: DARK,
                                letterSpacing: ".5px",
                              }}
                            >
                              Schedule my free inspection
                            </button>
                          </div>
                          <p style={{ textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: -4 }}>
                            No obligation. No credit card. We call you.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Trust panel — desktop only */}
                <div style={{ width: 300, flexShrink: 0 }}>
                  <TrustPanel />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
