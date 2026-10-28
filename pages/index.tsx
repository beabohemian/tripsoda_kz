import LocalTeam from "../components/LocalTeam";
import Head from "next/head";
import { track } from "../lib/analytics";
import { medicalCopy, medicalExtra } from "../lib/medical";
import { russian, kazakh, extra } from "../lib/translations";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Check,
  Globe2,
  Menu,
  X,
} from "lucide-react";

type Lang = "ko" | "en" | "ru" | "kk";
const baseCopy = {
  ko: {
    nav: ["맞춤여행", "기업·여행사", "현지 운영", "트립소다 소개"],
    quote: "맞춤 견적 요청",
    eyebrow: "YOUR LOCAL TEAM IN KAZAKHSTAN",
    title: (
      <>
        카자흐스탄 여행·행사,
        <br />
        현지 팀이 직접 설계합니다.
      </>
    ),
    intro:
      "맞춤여행·차량·가이드·숙박부터 출장·인센티브·통역·의전까지.\n트립소다 카자흐스탄 현지 법인이 필요한 서비스를 조율합니다.",
    personal: "나만의 여행 설계하기",
    business: "기업·여행사 파트너 문의",
    location: "카자흐스탄 · 알마티",
    foot: "현지 법인 · 알마티 운영 거점 · 한국어 상담",
    serviceLabel: "ONE LOCAL TEAM. YOUR ENTIRE JOURNEY.",
    serviceTitle: (
      <>
        여행의 목적은 달라도,
        <br />
        필요한 건 확실한 현지 팀.
      </>
    ),
    serviceDesc:
      "필요한 서비스만 선택하거나 전체 일정을 맡기세요.\n날짜, 인원, 예산에 맞춰 개별 견적을 제안합니다.",
    audiences: [
      {
        tag: "FOR TRAVELERS",
        title: "개인·가족·그룹 맞춤여행",
        desc: "정해진 상품에 여행을 맞추지 마세요. 가고 싶은 곳과 여행하는 방식부터 듣겠습니다.",
        items: [
          "희망 지역·일정에 맞춘 여행 설계",
          "가이드·차량·숙박 수배 상담",
          "가족·친구·소규모 그룹 일정 조율",
        ],
        cta: "맞춤여행 견적 요청",
      },
      {
        tag: "FOR TRAVEL PARTNERS & BUSINESSES",
        title: "여행사·기업 현지 운영",
        desc: "고객의 일정에 필요한 현지 자원을 함께 구성합니다. 요청 범위와 운영 조건부터 구체적으로 협의하세요.",
        items: [
          "여행사 현지 행사·인센티브 운영",
          "기업 출장·단체 행사 기획 및 수배",
          "통역·의전 및 차량·숙박·가이드",
        ],
        cta: "파트너 프로젝트 문의",
      },
    ],
    capabilityLabel: "BUILT ON LOCAL OPERATIONS",
    capabilityTitle: "현지에서 연결하고,\n일정으로 완성합니다.",
    capabilities: [
      [
        "여행 설계",
        "여행 목적과 이동 거리, 소요 시간을 고려해 지역과 코스를 조합합니다.",
      ],
      [
        "가이드·차량",
        "인원과 일정에 맞춰 차량과 가이드 언어, 동행 범위를 협의합니다.",
      ],
      [
        "숙박 수배",
        "희망 지역, 객실 구성, 숙박 예산을 바탕으로 가능한 조건을 확인합니다.",
      ],
      [
        "기업 출장·인센티브",
        "출장 목적과 참가자 구성, 행사 동선에 맞춰 현지 일정을 기획하고 수배합니다.",
      ],
      [
        "행사·통역·의전",
        "현지 행사 운영, 언어별 통역과 의전 요구를 확인해 필요한 인력과 서비스를 구성합니다.",
      ],
      [
        "알마티 거점",
        "현지 담당 팀과 출발 전 준비부터 일정 브리핑, 현지 운영까지 조율합니다.",
      ],
    ],
    exampleLabel: "POSSIBILITIES, NOT PACKAGES",
    exampleTitle: "이런 여행도 가능합니다.",
    exampleDesc:
      "아래 코스는 출발점입니다. 지역, 기간, 인원과 관심사에 따라 자유롭게 조합하세요.",
    examples: [
      ["호수와 캐니언", "콜사이 · 카인디 · 차른", "대자연 중심의 일정 예시"],
      [
        "초원으로 떠나는 하루",
        "투르겐 · 아씨 고원",
        "트레킹과 풍경을 즐기는 일정 예시",
      ],
      [
        "도시와 현지 문화",
        "알마티 · 에스닉 마을",
        "도시 탐방과 문화 체험 일정 예시",
      ],
    ],
    exampleCta: "이 코스로 견적 시작",
    processTitle: "요청부터 예약까지,\n조건을 확인하며 한 단계씩.",
    steps: [
      [
        "문의·예약 신청",
        "일정, 인원, 필요한 서비스를 적어 문의하거나 예약을 신청하세요.",
      ],
      [
        "담당자 연락",
        "담당자와 운영 가능 여부, 최종 견적 및 취소 조건을 확인합니다.",
      ],
      [
        "계약금 계좌이체",
        "담당자가 안내한 계약금과 입금 계좌를 확인하고 이체합니다.",
      ],
      ["예약 확정", "입금 확인 후 담당자가 예약 확정 내용을 안내합니다."],
    ],
    quoteTitle: "어떤 일이 필요하신가요?",
    quoteDesc:
      "정해진 상품이 없어도 괜찮습니다. 필요한 조건을 자유롭게 알려주세요.",
    type: ["개인·그룹 여행", "기업·여행사"],
    labels: {
      name: "이름 / 담당자",
      company: "회사명",
      email: "이메일",
      date: "희망 출발일",
      people: "인원",
      budget: "예산 / 통화",
      service: "필요한 서비스",
      message: "지역·기간·요청 사항",
      consent:
        "문의·예약 상담을 위해 이름, 연락처와 요청 내용을 수집·이용하는 데 동의합니다.",
      submit: "요청 내용 확인",
      preview: "견적 요청 내용",
      edit: "수정하기",
      send: "WhatsApp으로 요청 보내기",
      note: "신청이 접수되면 담당자가 연락드립니다. 계약금 입금 확인 후 예약이 확정됩니다.",
      draft: "입력 내용을 확인한 후 접수해 주세요.",
      placeholder:
        "방문하고 싶은 지역, 여행 목적, 숙박 조건, 가이드 언어 등을 알려주세요.",
      select: "선택해 주세요",
      flexible: "일정 미정 / 협의 가능",
      services: [
        "맞춤여행",
        "단체여행",
        "차량",
        "가이드",
        "숙박",
        "현지 행사",
        "인센티브",
        "출장",
        "통역",
        "의전",
      ],
    },
    faqTitle: "문의 전에 확인하세요.",
    faqs: [
      [
        "정해진 투어 외의 견적도 가능한가요?",
        "네. 대표 코스 외에도 필요한 지역, 날짜, 인원, 서비스 범위를 알려주세요. 운영 가능 여부를 확인해 개별 제안을 드립니다.",
      ],
      [
        "한국어 가이드가 항상 포함되나요?",
        "가이드 언어와 동행 범위는 요청 조건에 따라 달라집니다. 한국어 가이드가 필요하다면 견적 요청에 적어주세요.",
      ],
      [
        "사이트에서 바로 결제할 수 있나요?",
        "문의 또는 예약 신청 후 담당자가 연락드립니다. 최종 견적과 취소 조건을 확인하고 계약금을 계좌이체하면, 입금 확인 후 예약이 확정됩니다.",
      ],
    ],
    footer: "카자흐스탄 현지 법인 · 알마티",
    contact: "연락처",
    address: "Nazarbayev Ave 65, 4층 401/5호, Almaty",
    privacy:
      "입력 정보는 문의·예약 상담을 위해 담당자가 확인합니다. 접수만으로 예약이 확정되지는 않습니다.",
  },
  en: {
    nav: ["Travel", "Business", "Operations", "About Tripsoda"],
    quote: "Request a proposal",
    eyebrow: "YOUR LOCAL TEAM IN KAZAKHSTAN",
    title: (
      <>
        Kazakhstan travel & events.
        <br />
        Planned by your local team.
      </>
    ),
    intro:
      "Tailor-made travel, transport, guides and hotels. Business trips, incentives, interpreting and protocol.\nOur Kazakhstan team coordinates the services your journey needs.",
    personal: "Plan a private journey",
    business: "Discuss a business project",
    location: "ALMATY · KAZAKHSTAN",
    foot: "Kazakhstan legal entity · Almaty base · Korean-language consultation",
    serviceLabel: "ONE LOCAL TEAM. YOUR ENTIRE JOURNEY.",
    serviceTitle: (
      <>
        Different purposes.
        <br />
        The same local expertise.
      </>
    ),
    serviceDesc:
      "Ask for individual services or a complete itinerary.\nWe prepare a proposal around your dates, group and budget.",
    audiences: [
      {
        tag: "FOR TRAVELERS",
        title: "Private & group journeys",
        desc: "Start with the places you want to see and the way you want to travel. We build the itinerary around you.",
        items: [
          "Itineraries around your destinations and dates",
          "Guide, vehicle and accommodation arrangements",
          "Coordination for families, friends and small groups",
        ],
        cta: "Request a travel proposal",
      },
      {
        tag: "FOR TRAVEL PARTNERS & BUSINESSES",
        title: "Local operations for partners",
        desc: "Build the local arrangements your itinerary requires. Discuss the scope, logistics and operating conditions with our team.",
        items: [
          "Ground handling, group events and incentive travel",
          "Corporate trips and event arrangements",
          "Interpreters, protocol support, transport and hotels",
        ],
        cta: "Discuss a partner project",
      },
    ],
    capabilityLabel: "BUILT ON LOCAL OPERATIONS",
    capabilityTitle: "Local arrangements.\nA coordinated itinerary.",
    capabilities: [
      [
        "Itinerary planning",
        "Combine destinations and routes around the purpose of the trip, travel distances and available time.",
      ],
      [
        "Guides & transport",
        "Discuss vehicle requirements, guide languages and coverage based on the itinerary and group size.",
      ],
      [
        "Accommodation",
        "Check availability against your preferred location, room configuration and budget.",
      ],
      [
        "Corporate & incentive travel",
        "Plan local arrangements around business objectives, participant profiles and event logistics.",
      ],
      [
        "Events, interpreting & protocol",
        "Coordinate local events, language requirements, interpreters and protocol arrangements.",
      ],
      [
        "Almaty base",
        "Work with our local team on preparation, itinerary briefings and on-the-ground coordination.",
      ],
    ],
    exampleLabel: "POSSIBILITIES, NOT PACKAGES",
    exampleTitle: "A few places to begin.",
    exampleDesc:
      "These routes are starting points. Combine destinations, dates and services to suit your plans.",
    examples: [
      [
        "Lakes & canyons",
        "Kolsai · Kaindy · Charyn",
        "An example itinerary focused on nature",
      ],
      [
        "A day in the highlands",
        "Turgen · Assy Plateau",
        "An example for walking and open landscapes",
      ],
      [
        "City & local culture",
        "Almaty · Ethno village",
        "An example combining the city and cultural experiences",
      ],
    ],
    exampleCta: "Build a proposal from this",
    processTitle: "From your brief to a booking.\nClear terms at every step.",
    steps: [
      [
        "Inquiry or booking request",
        "Share your dates, group size and the services you need.",
      ],
      [
        "Your coordinator gets in touch",
        "Review availability, your final quote and cancellation terms.",
      ],
      [
        "Deposit by bank transfer",
        "Check the deposit amount and bank details provided by your coordinator, then transfer the deposit.",
      ],
      [
        "Booking confirmed",
        "Your coordinator confirms your booking after verifying the deposit.",
      ],
    ],
    quoteTitle: "Tell us what you have in mind.",
    quoteDesc:
      "You do not need to choose a package. Start with the arrangements you need.",
    type: ["Private & group travel", "Business & travel partner"],
    labels: {
      name: "Name / contact person",
      company: "Company",
      email: "Email",
      date: "Preferred departure",
      people: "Guests",
      budget: "Budget / currency",
      service: "Services required",
      message: "Destinations, duration & requirements",
      consent:
        "I consent to the collection and use of my name, contact details and request for travel consultation.",
      submit: "Review request",
      preview: "Your proposal request",
      edit: "Edit details",
      send: "Send request via WhatsApp",
      note: "A coordinator will contact you after submission. Your booking is confirmed after your deposit is verified.",
      draft: "Review your details and submit your request.",
      placeholder:
        "Tell us your destinations, trip purpose, accommodation preferences and guide language.",
      select: "Please select",
      flexible: "Dates flexible / to be discussed",
      services: [
        "Tailor-made travel",
        "Group travel",
        "Vehicle",
        "Guide",
        "Accommodation",
        "Local event",
        "Incentive travel",
        "Business trip",
        "Interpreter",
        "Protocol support",
      ],
    },
    faqTitle: "Before you get in touch.",
    faqs: [
      [
        "Can I request something beyond the example tours?",
        "Yes. Share your destinations, dates, group size and required services. We will check what is possible and prepare an individual proposal.",
      ],
      [
        "Is a Korean-speaking guide always included?",
        "Guide language and coverage depend on your requested arrangements. Please specify your preferred language in your request.",
      ],
      [
        "Can I pay directly on this website?",
        "After your inquiry or booking request, a coordinator contacts you to agree the quote and cancellation terms. You pay the deposit by bank transfer. Your booking is confirmed after the deposit is verified.",
      ],
    ],
    footer: "Kazakhstan legal entity · Almaty",
    contact: "Contact",
    address: "Nazarbayev Ave 65, 4F #401/5, Almaty",
    privacy:
      "Our coordinators use your details to handle your inquiry or booking request. Submission alone does not confirm a booking.",
  },
};
const copy = { ...baseCopy, ru: russian, kk: kazakh };
export default function Home({
  medical: initialMedicalMarket = false,
  initialLanguage = "ko",
  preview = false,
}: {
  medical?: boolean;
  initialLanguage?: Lang;
  preview?: boolean;
}) {
  const [lang, setLang] = useState<Lang>(initialLanguage);
  const [medicalMarket, setMedicalMarket] = useState(initialMedicalMarket);
  const whatsappOnly = process.env.NEXT_PUBLIC_CONTACT_MODE === "whatsapp";
  const legacyMail = process.env.NEXT_PUBLIC_CONTACT_MODE === "legacy-mail";
  useEffect(() => {
    if (preview) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("kz-language");
    } catch {}
    const browserLanguage = navigator.language.toLowerCase().split("-")[0];
    setLang(
      saved && ["ko", "en", "ru", "kk"].includes(saved)
        ? (saved as Lang)
        : ["ko", "en", "ru", "kk"].includes(browserLanguage)
          ? (browserLanguage as Lang)
          : "ko",
    );
    const controller = new AbortController();
    fetch("/__country", { cache: "no-store", signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && ["KZ", "RU"].includes(data.country)) setMedicalMarket(true);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [preview]);
  const medical = medicalMarket && (preview || lang === "ru" || lang === "kk");
  const [menu, setMenu] = useState(false);
  const [audience, setAudience] = useState(0);
  const [review, setReview] = useState(false);
  const [example, setExample] = useState("");
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [requestKey, setRequestKey] = useState("");
  const formStarted = useRef(false);
  const submitLock = useRef(false);
  const [intent, setIntent] = useState("inquiry");
  const [chosen, setChosen] = useState<number[]>([]);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    people: "",
    budget: "",
    message: "",
  });
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const c = medical
    ? {
        ...copy[lang],
        ...medicalCopy[lang],
        labels: { ...copy[lang].labels, ...medicalCopy[lang].labels },
      }
    : copy[lang];
  const x = medical ? { ...extra[lang], ...medicalExtra[lang] } : extra[lang];
  const trackForm = (
    event:
      | "form_start"
      | "form_review"
      | "form_submit_attempt"
      | "generate_lead"
      | "form_submit_error",
  ) =>
    track(event, {
      audience_type: audience === 1 ? "business" : "personal",
      request_type: intent === "booking" ? "booking" : "inquiry",
      site_language: lang,
    });
  const changeLang = (v: Lang) => {
    track("language_change", { site_language: v });
    setLang(v);
    setChosen([]);
    setExample("");
    setReview(false);
    setRequestKey("");
    try {
      if (!preview) {
        localStorage.setItem("kz-language", v);
        document.cookie = `kz-language=${v}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
      }
    } catch {}
  };
  const request = (type: number, route = "") => {
    track("quote_click", {
      audience_type: type === 1 ? "business" : "personal",
      site_language: lang,
      cta_location: "home",
    });
    setReceipt("");
    setSubmitError("");
    setRequestKey("");
    setAudience(type);
    setExample(route);
    setReview(false);
    setMenu(false);
    document.getElementById("proposal")?.scrollIntoView({ behavior: "smooth" });
  };
  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setReview(false);
  };
  const message = [
    `Tripsoda Kazakhstan — ${c.type[audience]} — ${intent === "booking" ? x.booking : x.inquiry}`,
    `${c.labels.name}: ${form.name}`,
    audience === 1 ? `${c.labels.company}: ${form.company}` : "",
    `${c.labels.email}: ${form.email}`,
    `Phone / 연락처: ${form.phone || "—"}`,
    `${c.labels.date}: ${form.date || c.labels.flexible}`,
    `${c.labels.people}: ${form.people}`,
    `${c.labels.budget}: ${form.budget || "—"}`,
    `${c.labels.service}: ${chosen.map((i) => c.labels.services[i]).join(", ") || "—"}`,
    example ? `Route: ${example}` : "",
    `${c.labels.message}: ${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  async function submitRequest() {
    if (whatsappOnly || submitLock.current) return;
    submitLock.current = true;
    trackForm("form_submit_attempt");
    setSending(true);
    setSubmitError("");
    const key = requestKey || crypto.randomUUID();
    setRequestKey(key);
    try {
      if (legacyMail) {
        const response = await fetch("https://api.tripsoda.com/admin/kz/mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            date: form.date || c.labels.flexible,
            duration: c.labels.flexible,
            pax: String(form.people),
            destinations:
              example ||
              (medical ? "Korea medical travel" : "Kazakhstan custom travel"),
            accommodation: c.labels.flexible,
            message: `[KZ 접수] ${key}\n${message}`,
          }),
        });
        if (!response.ok) throw new Error("MAIL_REQUEST_FAILED");
        trackForm("generate_lead");
        formStarted.current = false;
        setReceipt(key);
        setRequestKey("");
        return;
      }
      const response = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message: medical
            ? `[KOREA MEDICAL TOUR]\n${form.message}`
            : form.message,
          people: Number(form.people),
          key,
          audience: audience === 1 ? "business" : "personal",
          intent,
          language: lang,
          services: medical
            ? chosen.map(
                (i) =>
                  [
                    "checkup",
                    "beauty",
                    "specialist",
                    "interpreter",
                    "hotel",
                    "vehicle",
                  ][i],
              )
            : chosen.map(
                (i) =>
                  [
                    "custom",
                    "group",
                    "vehicle",
                    "guide",
                    "hotel",
                    "event",
                    "incentive",
                    "business",
                    "interpreter",
                    "protocol",
                  ][i],
              ),
          example,
          consent: true,
        }),
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      trackForm("generate_lead");
      formStarted.current = false;
      setReceipt(data.id);
      setRequestKey("");
    } catch {
      trackForm("form_submit_error");
      setSubmitError(x.error);
    } finally {
      submitLock.current = false;
      setSending(false);
    }
  }
  return (
    <div className="kz-site">
      <Head>
        <title>
          {medical
            ? c.title
            : lang === "ko"
              ? "트립소다 카자흐스탄 | 개인 맞춤여행 · 기업·여행사 현지 운영"
              : `TripSoda Kazakhstan | ${c.nav[0]} · ${c.nav[1]}`}
        </title>
        <meta name="description" content={c.intro.replace("\n", " ")} />
      </Head>
      <header className="kz-nav">
        <a className="kz-brand" href="#">
          <img src="/images/logo.png" alt="TripSoda Kazakhstan LLP" />
        </a>
        <nav
          className={menu ? "is-open" : ""}
          aria-label={lang === "ko" ? "주 메뉴" : "Main navigation"}
        >
          {c.nav.map((n, i) => (
            <a
              key={n}
              href={["#travel", "#business", "#operations", "#tripsoda"][i]}
              onClick={() => setMenu(false)}
            >
              {n}
            </a>
          ))}
          {!medical && (
            <a href="/guides/">
              {lang === "ko" ? "여행 가이드" : "Travel guides (KO)"}
            </a>
          )}
        </nav>
        <div className="nav-tools">
          <label className="language-picker">
            <Globe2 size={15} />
            <span className="sr-only">언어 / Language</span>
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value as Lang)}
              aria-label="언어 / Language"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="kk">Қазақша</option>
            </select>
          </label>
          <button className="nav-proposal" onClick={() => request(audience)}>
            {c.quote}
            <ArrowUpRight size={15} />
          </button>
          <button
            className="mobile-toggle"
            aria-expanded={menu}
            aria-label={x.menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className={`kz-hero ${medical ? "medical-hero" : ""}`}>
          {!medical && (
            <>
              <img
                src="/images/tour_charyn_1765783988719.png"
                alt={
                  lang === "ko"
                    ? "카자흐스탄 차른 캐니언"
                    : "Charyn Canyon, Kazakhstan"
                }
                className="kz-hero-photo"
              />
              <div className="kz-hero-shade" />
            </>
          )}
          <div className="kz-hero-content">
            <span className="kz-eyebrow">
              <i />
              {c.eyebrow}
            </span>
            <h1>{c.title}</h1>
            {medical && (
              <div className="medical-hero-fields">
                {c.capabilities.map(([title]) => (
                  <a key={title} href="#operations">
                    {title}
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </div>
            )}
            <p>{c.intro}</p>
            <div className="kz-actions">
              <button className="kz-btn primary" onClick={() => request(0)}>
                {c.personal}
                <ArrowUpRight size={19} />
              </button>
              <button
                className="kz-btn ghost"
                onClick={() => request(medical ? 0 : 1)}
              >
                {c.business}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="kz-hero-bottom">
            <span>
              <MapPin size={14} />
              {c.location}
            </span>
            <span>{c.foot}</span>
            <a href="#services">EXPLORE ↓</a>
          </div>
        </section>
        <section className="kz-section" id="services">
          <div className="kz-section-head">
            <div>
              <span className="kz-eyebrow green">{c.serviceLabel}</span>
              <h2>{c.serviceTitle}</h2>
            </div>
            <p>{c.serviceDesc}</p>
          </div>
          <div className="audience-grid">
            {c.audiences.map((a, i) => (
              <article
                id={i === 0 ? "travel" : "business"}
                className={`audience-card audience-${i}`}
                key={a.tag}
              >
                <span className="kz-eyebrow">{a.tag}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <ul>
                  {a.items.map((item) => (
                    <li key={item}>
                      <Check size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => request(medical ? 0 : i)}>
                  {a.cta}
                  <ArrowUpRight size={20} />
                </button>
              </article>
            ))}
          </div>
        </section>
        {!medical && (
          <>
            <section className="kz-operations" id="operations">
              <div className="operations-photo">
                <img
                  src="/images/office_lounge.jpg"
                  alt={
                    lang === "ko"
                      ? "트립소다 알마티 라운지"
                      : "Tripsoda Almaty lounge"
                  }
                  loading="lazy"
                />
                <span>OUR BASE, YOUR LOCAL CONNECTION.</span>
              </div>
              <div className="operations-content">
                <span className="kz-eyebrow green">{c.capabilityLabel}</span>
                <h2>{c.capabilityTitle}</h2>
                {c.capabilities.map(([title, desc], i) => (
                  <div className="capability" key={title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <LocalTeam lang={lang === "ko" ? "ko" : "en"} />
          </>
        )}
        {medical && (
          <section className="kz-section medical-care" id="operations">
            <span className="kz-eyebrow green">KOREA · MEDICAL TRAVEL</span>
            <h2>{c.capabilityTitle}</h2>
            <div className="medical-grid">
              {c.capabilities.map(([title, desc], i) => (
                <article key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <button
                    className="kz-btn secondary"
                    onClick={() => {
                      setChosen([Math.min(i, 2)]);
                      request(0, title);
                    }}
                  >
                    {c.quote} ↗
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
        <section id="tripsoda" className="brand-connection kz-section">
          <span className="kz-eyebrow green">SEOUL TO ALMATY</span>
          <h2>{x.brandTitle}</h2>
          <p>{x.brandBody}</p>
          <div className="brand-pair">
            <article>
              <span>SEOUL · KOREA</span>
              <h3>TripSoda</h3>
              <p>{x.hq}</p>
              <a href="https://tripsoda.com" target="_blank" rel="noreferrer">
                {x.visit} ↗
              </a>
            </article>
            <div aria-hidden="true">↔</div>
            <article>
              <span>ALMATY · KAZAKHSTAN</span>
              <img src="/images/logo.png" alt="TripSoda Kazakhstan LLP" />
              <p>{x.local}</p>
              <a href="#operations">{x.operations} ↗</a>
            </article>
          </div>
        </section>
        <section id="founder" className="founder-section kz-section">
          <span className="kz-eyebrow green">A MESSAGE FROM OUR CEO</span>
          <div className="founder-grid">
            <div>
              <h2>{x.greetingTitle}</h2>
              <p className="founder-name">
                {x.name}
                <span>CEO · TRIPSODA KAZAKHSTAN</span>
              </p>
            </div>
            <div>
              {x.greeting.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
        {!medical && (
          <section className="kz-section">
            <div className="kz-section-head">
              <div>
                <span className="kz-eyebrow green">{c.exampleLabel}</span>
                <h2>{c.exampleTitle}</h2>
              </div>
              <p>{c.exampleDesc}</p>
            </div>
            <div className="kz-example-grid">
              {c.examples.map(([tag, title, desc], i) => (
                <article key={title}>
                  <div className="example-photo">
                    <img
                      src={
                        [
                          "/images/tour_charyn_1765783988719.png",
                          "/images/tour_assy.png",
                          "/images/tour_city_1765784027581.png",
                        ][i]
                      }
                      alt={title}
                      loading="lazy"
                    />
                    <span>
                      0{i + 1} / {tag}
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <button onClick={() => request(0, title)}>
                    {c.exampleCta}
                    <ArrowUpRight size={17} />
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className="kz-process kz-section">
          <span className="kz-eyebrow green">
            A CLEAR PATH FROM BRIEF TO BOOKING
          </span>
          <h2>{c.processTitle}</h2>
          <div>
            {c.steps.map(([title, desc], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="proposal-section" id="proposal">
          <div className="proposal-intro">
            <span className="kz-eyebrow">LET’S BUILD YOUR BRIEF</span>
            <h2>{c.quoteTitle}</h2>
            <p>{c.quoteDesc}</p>
            <a
              href="https://pf.kakao.com/_nSKuX/chat"
              target="_blank"
              rel="noreferrer"
            >
              KakaoTalk ↗
            </a>
            <a
              href="https://wa.me/77789861833"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
            <small>{c.privacy}</small>
          </div>
          <div className="proposal-form">
            {receipt ? (
              <div className="receipt" role="status">
                <Check size={40} />
                <h3>{x.received}</h3>
                {!legacyMail && (
                  <p>
                    {x.reference}: {receipt}
                  </p>
                )}
                <p>{x.receivedBody}</p>
                <button
                  className="kz-btn primary"
                  onClick={() => {
                    setReceipt("");
                    setReview(false);
                  }}
                >
                  {x.another}
                </button>
              </div>
            ) : review ? (
              <div className="proposal-review">
                {submitError && (
                  <p className="admin-error" role="alert">
                    {submitError}
                  </p>
                )}
                <h3>{c.labels.preview}</h3>
                <pre>{message}</pre>
                <p>{c.labels.draft}</p>
                <div className="kz-actions">
                  <button
                    className="kz-btn secondary"
                    onClick={() => {
                      setReview(false);
                      setRequestKey("");
                    }}
                  >
                    {c.labels.edit}
                  </button>
                  {whatsappOnly ? (
                    <a
                      className="kz-btn primary"
                      href={`https://wa.me/77789861833?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.labels.send}
                      <ArrowUpRight size={17} />
                    </a>
                  ) : (
                    <button
                      className="kz-btn primary"
                      disabled={sending}
                      onClick={submitRequest}
                    >
                      {sending ? x.sending : x.submit}
                      <ArrowRight size={17} />
                    </button>
                  )}
                </div>
                <small>
                  {whatsappOnly
                    ? {
                        ko: "WhatsApp에서 메시지를 전송해야 상담 요청이 전달됩니다. 예약은 담당자와 조건 협의 및 계약금 확인 후 확정됩니다.",
                        en: "Send the message in WhatsApp to submit your inquiry. Booking is confirmed after agreed terms and deposit verification.",
                        ru: "Отправьте сообщение в WhatsApp, чтобы передать запрос. Бронирование подтверждается после согласования условий и проверки предоплаты.",
                        kk: "Өтінімді жеткізу үшін WhatsApp-та хабарламаны жіберіңіз. Брондау шарттар келісіліп, депозит тексерілген соң расталады.",
                      }[lang]
                    : c.labels.note}
                </small>
              </div>
            ) : (
              <form
                onChange={() => {
                  if (!formStarted.current) {
                    formStarted.current = true;
                    trackForm("form_start");
                  }
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  trackForm("form_review");
                  setReview(true);
                }}
              >
                <div
                  className="audience-switch"
                  role="group"
                  aria-label={x.requestType}
                >
                  {c.type.map((t, i) => (
                    <button
                      type="button"
                      key={t}
                      aria-pressed={audience === i}
                      onClick={() => setAudience(i)}
                      className={audience === i ? "active" : ""}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {example && (
                  <div className="selected-example">
                    {example}
                    <button
                      type="button"
                      aria-label={x.remove}
                      onClick={() => setExample("")}
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
                <label className="request-intent">
                  {x.purpose}
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                  >
                    <option value="inquiry">{x.inquiry}</option>
                    <option value="booking">{x.booking}</option>
                  </select>
                </label>
                <div className="form-grid">
                  <label>
                    {c.labels.name}
                    <input
                      required
                      value={form.name}
                      maxLength={100}
                      autoComplete="name"
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </label>
                  {audience === 1 && (
                    <label>
                      {c.labels.company}
                      <input
                        required
                        value={form.company}
                        maxLength={150}
                        autoComplete="organization"
                        onChange={(e) => update("company", e.target.value)}
                      />
                    </label>
                  )}
                  <label>
                    {c.labels.email}
                    <input
                      required
                      type="email"
                      value={form.email}
                      autoComplete="email"
                      maxLength={200}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </label>
                  <label>
                    {
                      {
                        ko: "연락처",
                        en: "Phone / contact",
                        ru: "Телефон / контакт",
                        kk: "Телефон / байланыс",
                      }[lang]
                    }
                    <input
                      type="tel"
                      autoComplete="tel"
                      required={legacyMail}
                      maxLength={60}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </label>
                  <label>
                    {c.labels.date}
                    <input
                      type="date"
                      min={new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000,
                      )
                        .toISOString()
                        .slice(0, 10)}
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                    />
                    <small>{c.labels.flexible}</small>
                  </label>
                  <label>
                    {c.labels.people}
                    <input
                      type="number"
                      required
                      min="1"
                      max="10000"
                      value={form.people}
                      onChange={(e) => update("people", e.target.value)}
                    />
                  </label>
                  <label>
                    {c.labels.budget}
                    <input
                      value={form.budget}
                      maxLength={100}
                      placeholder="KRW / USD / KZT"
                      onChange={(e) => update("budget", e.target.value)}
                    />
                  </label>
                </div>
                <fieldset>
                  <legend>{c.labels.service}</legend>
                  <div className="service-options">
                    {c.labels.services.map((s, i) => (
                      <label key={s}>
                        <input
                          type="checkbox"
                          checked={chosen.includes(i)}
                          onChange={() =>
                            setChosen(
                              chosen.includes(i)
                                ? chosen.filter((v) => v !== i)
                                : [...chosen, i],
                            )
                          }
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label>
                  {c.labels.message}
                  <textarea
                    required
                    rows={4}
                    maxLength={medical ? 2470 : 2500}
                    value={form.message}
                    placeholder={c.labels.placeholder}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </label>
                <label className="consent">
                  <input required type="checkbox" />
                  {c.labels.consent}
                </label>
                <button className="kz-btn primary" type="submit">
                  {c.labels.submit}
                  <ArrowRight size={18} />
                </button>
                <small>
                  {whatsappOnly
                    ? {
                        ko: "WhatsApp에서 메시지를 전송해야 상담 요청이 전달됩니다. 예약은 담당자와 조건 협의 및 계약금 확인 후 확정됩니다.",
                        en: "Send the message in WhatsApp to submit your inquiry. Booking is confirmed after agreed terms and deposit verification.",
                        ru: "Отправьте сообщение в WhatsApp, чтобы передать запрос. Бронирование подтверждается после согласования условий и проверки предоплаты.",
                        kk: "Өтінімді жеткізу үшін WhatsApp-та хабарламаны жіберіңіз. Брондау шарттар келісіліп, депозит тексерілген соң расталады.",
                      }[lang]
                    : c.labels.note}
                </small>
              </form>
            )}
          </div>
        </section>
        <section className="kz-section kz-faq">
          <h2>{c.faqTitle}</h2>
          <div>
            {c.faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="kz-footer">
        <div>
          <a className="kz-brand" href="#">
            <img src="/images/logo.png" alt="TripSoda Kazakhstan LLP" />
          </a>
          <p>{c.footer}</p>
          <p>{c.address}</p>
        </div>
        <div>
          <span>{c.contact}</span>
          <a href="mailto:jinki@tripsoda.com">CEO · jinki@tripsoda.com</a>
          <a href="mailto:alua@tripsoda.com">
            Head Manager · alua@tripsoda.com
          </a>
          <a href="mailto:zhibek@tripsoda.com">Manager · zhibek@tripsoda.com</a>
          <a
            href="https://instagram.com/tripsoda_kz"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
          <a href="https://wa.me/77789861833">+7 778 986 1833</a>
          <p>© {new Date().getFullYear()} Tripsoda Kazakhstan LLP</p>
        </div>
      </footer>
    </div>
  );
}
