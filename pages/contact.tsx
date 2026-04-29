import Head from "next/head";
import { MapPin, Phone, Mail } from "lucide-react";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Custom Input Component with Floating Label
const FloatingInput = ({ 
    label, name, type = "text", required = false, value, onChange, placeholder = "" 
}: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;

    return (
        <div className="relative mb-6">
            <input
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="block w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-tripsoda-main focus:bg-white transition-all duration-300 peer"
                placeholder={isFocused ? placeholder : ""}
            />
            <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    isActive 
                    ? "top-1.5 text-xs text-tripsoda-main font-bold" 
                    : "top-4 text-gray-500 text-base"
                }`}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
    );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    duration: "",
    pax: "",
    destinations: "",
    accommodation: "hotel",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/kz/mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        duration: "",
        pax: "",
        destinations: "",
        accommodation: "hotel",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="bg-gray-50 min-h-screen"
    >
      <Head>
        <title>문의하기 | 트립소다 카자흐스탄</title>
      </Head>

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('/images/hero_bg_1765783966744.png')] bg-cover bg-center"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
            >
                1:1 맞춤 상담
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
            >
                가장 완벽한 중앙아시아 여행을 위해<br className="md:hidden" />현지 전문가가 상세히 답변해 드립니다.
            </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-20 -mt-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Contact Info */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-10 lg:sticky lg:top-32 self-start"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                무엇이든 물어보세요
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                정해진 일정이 아니어도 괜찮습니다. <br />
                원하시는 여행의 모습을 자유롭게 남겨주시면,<br />
                현지 담당자가 최적의 일정을 제안해 드립니다.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-5 group">
                <div className="bg-tripsoda-main/10 p-4 rounded-2xl text-tripsoda-main group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-1">WhatsApp / Call</h3>
                    <p className="text-gray-700 text-lg font-medium">+7 778 986 1833</p>
                </div>
                </div>

                <div className="flex items-start space-x-5 group">
                <div className="bg-tripsoda-main/10 p-4 rounded-2xl text-tripsoda-main group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                </div>
                <div className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-1">Email</h3>
                    <div className="space-y-2">
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">CEO</p>
                            <a href="mailto:jinki@tripsoda.com" className="text-gray-700 text-lg font-medium hover:text-tripsoda-main transition-colors">jinki@tripsoda.com</a>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Head Manager (Alua)</p>
                            <a href="mailto:alua@tripsoda.com" className="text-gray-700 text-lg font-medium hover:text-tripsoda-main transition-colors">alua@tripsoda.com</a>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Manager (Zhibek)</p>
                            <a href="mailto:zhibek@tripsoda.com" className="text-gray-700 text-lg font-medium hover:text-tripsoda-main transition-colors">zhibek@tripsoda.com</a>
                        </div>
                    </div>
                </div>
                </div>

                <div className="flex items-start space-x-5 group">
                <div className="bg-tripsoda-main/10 p-4 rounded-2xl text-tripsoda-main group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-1">Location</h3>
                    <p className="text-gray-700 text-lg font-medium leading-snug">
                    알마티 나자르바예프 대로 65<br/>비즈니스 센터 건물 4층 401/5호
                    </p>
                </div>
                </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden"
          >
            {status === "success" && (
              <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in text-center p-8">
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner"
                >
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  성공적으로 접수되었습니다.
                </h3>
                <p className="text-gray-600 text-lg mb-10">
                  담당자가 내용을 확인 후, 남겨주신 연락처로<br/>빠르게 회신 드리겠습니다. 감사합니다.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
                >
                  새로운 문의 남기기
                </button>
              </div>
            )}

            {status === "error" && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-medium">
                  전송에 실패했습니다. 일시적인 오류일 수 있으니 다시 시도해주시거나, 이메일로 직접 문의해주세요.
                </span>
                <button onClick={() => setStatus("idle")} className="bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold hover:bg-red-200 transition-colors whitespace-nowrap">
                  다시 시도
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-tripsoda-main text-white flex items-center justify-center text-sm mr-3 shadow-md">1</span>
                    기본 정보
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <FloatingInput label="이름" name="name" required value={formData.name} onChange={handleChange} placeholder="홍길동" />
                  <FloatingInput label="연락처" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="010-1234-5678" />
                  <div className="md:col-span-2">
                    <FloatingInput label="이메일 (견적서 수령용)" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="example@email.com" />
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-tripsoda-main text-white flex items-center justify-center text-sm mr-3 shadow-md">2</span>
                    여행 계획
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 ml-1">예상 여행 시작일</label>
                    <input
                      type="date"
                      name="date"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all bg-gray-50 focus:bg-white text-gray-900"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <FloatingInput label="여행 기간" name="duration" value={formData.duration} onChange={handleChange} placeholder="예: 4박 6일" />
                  <FloatingInput label="인원 수" name="pax" value={formData.pax} onChange={handleChange} placeholder="성인 2명, 아동 1명" />

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2 ml-1">선호 숙소 형태</label>
                    <div className="relative">
                        <select
                        name="accommodation"
                        className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all bg-gray-50 focus:bg-white text-gray-900 appearance-none"
                        value={formData.accommodation}
                        onChange={handleChange}
                        >
                        <option value="hotel">호텔 (3~4성급)</option>
                        <option value="luxury">고급 호텔 (4~5성급)</option>
                        <option value="yurt">유르트 (전통 체험)</option>
                        <option value="guesthouse">게스트하우스 (가성비)</option>
                        <option value="camping">캠핑/글램핑</option>
                        <option value="mix">상담 후 결정 (믹스)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 mt-2">
                    <FloatingInput label="희망 방문지 / 액티비티" name="destinations" value={formData.destinations} onChange={handleChange} placeholder="예: 차른캐년, 승마 체험, 스키 등" />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-tripsoda-main text-white flex items-center justify-center text-sm mr-3 shadow-md">3</span>
                    기타 문의사항
                </h3>
                <div className="relative">
                    <textarea
                    name="message"
                    rows={5}
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light focus:bg-white outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                    placeholder="특별한 요청사항이나 궁금한 점이 있으시면 자유롭게 적어주세요. (알러지, 특별한 목적 등)"
                    value={formData.message}
                    onChange={handleChange}
                    ></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-tripsoda-main text-white font-bold text-lg py-5 rounded-2xl hover:bg-tripsoda-dark transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
                >
                    {status === "submitting" ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            전송 중...
                        </>
                    ) : "견적 요청 완료하기"}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                    제출 시 트립소다의 개인정보 처리방침에 동의하는 것으로 간주됩니다.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
