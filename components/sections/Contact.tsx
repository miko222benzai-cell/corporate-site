"use client";

import { useRef, useState } from "react";
import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/data/siteConfig";
import {
  INQUIRY_TYPES,
  validateContact,
  type ContactErrors,
  type ContactPayload,
  type InquiryType,
} from "@/lib/contact";

type FormState = "idle" | "submitting" | "done" | "error";

interface FormShape {
  name: string;
  company: string;
  email: string;
  inquiryType: InquiryType | "";
  message: string;
  /** honeypot：ユーザーには見えないがDOMには存在する */
  website: string;
}

const initialForm: FormShape = {
  name: "",
  company: "",
  email: "",
  inquiryType: "",
  message: "",
  website: "",
};

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [form, setForm] = useState<FormShape>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const mountedAtRef = useRef<number>(Date.now());

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: ContactPayload = {
      name: form.name,
      company: form.company || undefined,
      email: form.email,
      inquiryType: form.inquiryType,
      message: form.message,
      website: form.website,
      elapsedMs: Date.now() - mountedAtRef.current,
    };

    const errs = validateContact(payload);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: ContactErrors;
      };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setErrorMsg(
          res.status === 502
            ? "送信処理でエラーが発生しました。お手数ですが時間をおいて再度お試しください。"
            : "送信できませんでした。入力内容をご確認ください。"
        );
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setErrorMsg(
        "ネットワークエラーが発生しました。時間をおいて再度お試しください。"
      );
      setState("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-red-700 relative overflow-hidden"
    >
      {/* 背景大文字 */}
      <span className="absolute top-0 right-0 text-[9rem] lg:text-[13rem] font-black text-white/[0.06] leading-none select-none pointer-events-none whitespace-nowrap">
        CONTACT
      </span>

      {/* 斜めライン装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white" style={{ width: "50px", height: "200%", top: "-50%", left: "5%", transform: "rotate(-19deg)", opacity: 0.04 }} />
        <div className="absolute bg-white" style={{ width: "20px", height: "200%", top: "-50%", left: "11%", transform: "rotate(-19deg)", opacity: 0.025 }} />
        <div className="absolute bg-white" style={{ width: "7px", height: "200%", top: "-50%", left: "15%", transform: "rotate(-19deg)", opacity: 0.015 }} />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-white/60" />
              <p className="text-white/60 text-[11px] font-bold tracking-[0.3em]">
                CONTACT
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              お問い合わせ
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* 左カラム */}
          <FadeIn>
            <p className="text-red-100 text-base leading-[1.9] mb-10">
              事業のご相談、採用、取材・メディア掲載、タレント・クリエイター関連など、お気軽にお問い合わせください。
              <br />
              通常2営業日以内にご返信いたします。
            </p>
            <div className="flex flex-col gap-5">
              <ContactInfo label="EMAIL" value={siteConfig.info.email} />
            </div>
          </FadeIn>

          {/* 右カラム：フォーム */}
          <FadeIn delay={0.15}>
            <div className="bg-white p-8 md:p-10">
              {state === "done" ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-red-600 flex items-center justify-center mx-auto mb-5">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    送信ありがとうございました
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    2営業日以内にご返信いたします。
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <Field label="お名前" required error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      autoComplete="name"
                      maxLength={100}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>

                  <Field label="会社名">
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="株式会社〇〇"
                      autoComplete="organization"
                      maxLength={100}
                      className={inputClass(false)}
                    />
                  </Field>

                  <Field label="メールアドレス" required error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@example.com"
                      autoComplete="email"
                      maxLength={254}
                      className={inputClass(!!errors.email)}
                    />
                  </Field>

                  <Field
                    label="お問い合わせ種別"
                    required
                    error={errors.inquiryType}
                  >
                    <select
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      className={inputClass(!!errors.inquiryType)}
                    >
                      <option value="">選択してください</option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="お問い合わせ内容"
                    required
                    error={errors.message}
                  >
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      maxLength={5000}
                      placeholder="ご相談内容をご記入ください"
                      className={inputClass(!!errors.message) + " resize-none"}
                    />
                  </Field>

                  {/* honeypot：人間には見えない。スクリーンリーダーにも非通知 */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                    }}
                  >
                    <label>
                      Webサイト（入力しないでください）
                      <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  {errors.form && (
                    <p className="text-red-600 text-[12px]">{errors.form}</p>
                  )}
                  {state === "error" && errorMsg && (
                    <p className="text-red-600 text-[12px]">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="mt-2 inline-flex items-center justify-center bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold tracking-wide px-9 py-4 transition-all duration-200 self-start shadow-[0_4px_20px_rgba(220,38,38,0.3)]"
                  >
                    {state === "submitting" ? "送信中..." : "送信する →"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-white/50 font-bold text-[10px] tracking-[0.2em] w-14 flex-shrink-0">
        {label}
      </span>
      <span className="text-white text-sm">{value}</span>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full px-4 py-3 border text-sm text-gray-800 bg-white",
    "placeholder:text-gray-300 outline-none transition-colors",
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-50",
  ].join(" ");
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-500 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-[11px]">{error}</p>}
    </div>
  );
}
