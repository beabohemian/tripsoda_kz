import Head from 'next/head'
import Link from 'next/link'
import { MapPin, ArrowRight, ShieldCheck, Zap, Globe, Building2, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// --- Components ---

const SpotlightCard = ({ children, className = "" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] group ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 243, 191, 0.08), transparent 40%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const RevealText = ({ children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// --- Main Page ---

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Hero Animations
    const heroScale = useTransform(smoothScrollY, [0, 0.2], [1, 1.3]);
    const heroOpacity = useTransform(smoothScrollY, [0, 0.15], [1, 0]);
    const heroTextY = useTransform(smoothScrollY, [0, 0.2], [0, -100]);

    // Synergy Animations
    const pathLength = useTransform(smoothScrollY, [0.5, 0.7], [0, 1]);

    return (
        <div ref={containerRef} className="bg-[#050505] text-white selection:bg-tripsoda-main selection:text-white font-sans antialiased overflow-x-hidden">
            <Head>
                <title>The Vision | 트립소다 카자흐스탄</title>
                <meta name="description" content="카자흐스탄 여행의 새로운 패러다임. 트립소다의 혁신적인 비즈니스와 브랜드 스토리를 경험하세요." />
            </Head>

            {/* 1. ULTRA HERO: Text Masking Experience */}
            <section className="relative h-[120vh] flex items-center justify-center">
                <motion.div 
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="fixed inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero_bg_1765783966744.png')]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div style={{ y: heroTextY }}>
                        <RevealText className="mb-4">
                            <span className="text-tripsoda-main font-black tracking-[0.8em] uppercase text-xs md:text-sm">Beyond Boundaries</span>
                        </RevealText>
                        <h1 className="text-6xl md:text-[12rem] font-black leading-[0.85] tracking-tighter mix-blend-difference mb-8">
                            <RevealText>TRIPSODA</RevealText>
                            <RevealText className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">KAZAKHSTAN</RevealText>
                        </h1>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-lg md:text-2xl font-light text-white/60 tracking-tight"
                        >
                            우리는 중앙아시아의 여행을 '재발명'합니다.
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ChevronDown className="text-tripsoda-main" size={32} />
                    </motion.div>
                </div>
            </section>

            {/* 2. THE CORE: Hybrid Innovation */}
            <section className="relative py-40 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-32">
                        <RevealText className="mb-4">
                            <span className="text-tripsoda-main font-bold text-sm uppercase tracking-widest">Hybrid Business Model</span>
                        </RevealText>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
                            온라인의 편리함과 <br />
                            <span className="text-white/30">오프라인의 전문성이 만나다.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Innovation 1 */}
                        <SpotlightCard className="p-12 h-[450px] flex flex-col justify-between">
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-tripsoda-main/10 rounded-2xl flex items-center justify-center text-tripsoda-main">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-3xl font-bold">현지 법인 직영</h3>
                                <p className="text-gray-400 leading-relaxed">하청이나 대행이 아닙니다. 트립소다 알마티 법인이 직접 차량, 가이드, 전 일정을 소유하고 통제합니다.</p>
                            </div>
                            <div className="text-5xl font-black text-white/5 uppercase">Direct</div>
                        </SpotlightCard>

                        {/* Innovation 2 */}
                        <SpotlightCard className="p-12 h-[450px] flex flex-col justify-between">
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-3xl font-bold">IT 플랫폼 신뢰</h3>
                                <p className="text-gray-400 leading-relaxed">한국 본사의 기술력으로 불투명했던 가격과 정보를 양지로 끌어올렸습니다. 모든 예약은 데이터로 보호됩니다.</p>
                            </div>
                            <div className="text-5xl font-black text-white/5 uppercase">Digital</div>
                        </SpotlightCard>

                        {/* Innovation 3 */}
                        <SpotlightCard className="p-12 h-[450px] flex flex-col justify-between md:col-span-2 lg:col-span-1">
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="text-3xl font-bold">베이스캠프</h3>
                                <p className="text-gray-400 leading-relaxed">알마티 도심 한복판, 여행자를 위한 물리적 공간 '라운지'를 통해 온라인 그 이상의 안도감을 제공합니다.</p>
                            </div>
                            <div className="text-5xl font-black text-white/5 uppercase">Physical</div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 3. SYNERGY: The Global Bridge */}
            <section className="py-60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-tripsoda-main/5 to-[#050505]" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-40">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">GLOBAL SYNERGY</h2>
                        <p className="text-xl text-gray-500 font-light">Seoul and Almaty, connected for your perfect journey.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
                        <div className="lg:w-1/3 text-center lg:text-left">
                            <Building2 className="mb-6 mx-auto lg:mx-0 text-white/20" size={48} />
                            <h3 className="text-4xl font-bold mb-6">Seoul HQ</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                한국 본사는 글로벌 IT 플랫폼 운영과 <br />
                                브랜드 거버넌스를 담당합니다. <br />
                                신뢰의 기틀을 닦는 곳입니다.
                            </p>
                        </div>

                        {/* Connection SVG */}
                        <div className="hidden lg:block relative w-1/3 h-20">
                            <svg className="w-full h-full" viewBox="0 0 400 100">
                                <path 
                                    d="M 0 50 C 100 50, 300 50, 400 50" 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.1)" 
                                    strokeWidth="2"
                                />
                                <motion.path 
                                    d="M 0 50 C 100 50, 300 50, 400 50" 
                                    fill="none" 
                                    stroke="#00f3bf" 
                                    strokeWidth="4"
                                    style={{ pathLength }}
                                />
                                <motion.circle 
                                    r="6" 
                                    fill="#00f3bf"
                                    style={{ offsetPath: "path('M 0 50 C 100 50, 300 50, 400 50')", offsetDistance: pathLength }}
                                />
                            </svg>
                        </div>

                        <div className="lg:w-1/3 text-center lg:text-right">
                            <Globe className="mb-6 mx-auto lg:mx-0 lg:ml-auto text-tripsoda-main" size={48} />
                            <h3 className="text-4xl font-bold mb-6 text-tripsoda-main">Almaty Branch</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                알마티 법인은 모든 투어의 실전 <br />
                                오퍼레이션을 직접 집도합니다. <br />
                                최고의 경험을 실현하는 곳입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PHILOSOPHY: The Immersive Message */}
            <section className="min-h-screen flex items-center justify-center bg-white text-black py-40">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ margin: "-200px" }}
                        className="space-y-12"
                    >
                        <span className="text-tripsoda-main font-bold tracking-[0.4em] uppercase text-sm">Founder's Vision</span>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">
                            "우리는 상품이 아니라, <br />
                            <span className="text-gray-300">신뢰를 직접 발명</span>하기 위해 <br />
                            현지로 떠났습니다."
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t border-gray-100">
                            <div className="text-xl text-gray-600 leading-relaxed font-light space-y-6">
                                <p>카자흐스탄의 광활한 대자연은 그 자체로 예술입니다. 하지만 그 예술을 즐기기 위한 과정은 그동안 결코 쉽지 않았습니다.</p>
                                <p>불투명한 가격, 검증되지 않은 가이드, 사고 시의 책임 회피. 우리는 이 고질적인 문제를 '현지 직영'이라는 정공법으로 풀기로 했습니다.</p>
                            </div>
                            <div className="text-xl text-gray-600 leading-relaxed font-light space-y-6">
                                <p>트립소다 카자흐스탄은 한국인이 카자흐스탄을 가장 안전하고 깊이 있게 즐길 수 있는 '표준'을 만듭니다. 우리는 현장에 상주하며 한 명의 여행자 뒤에 있는 수많은 불안을 직접 해결합니다.</p>
                                <div className="pt-10">
                                    <p className="text-3xl font-black text-gray-900">이 진 기</p>
                                    <p className="text-sm font-bold text-tripsoda-main uppercase tracking-widest">CEO, Tripsoda Kazakhstan</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 5. CTA: The Final Invitation */}
            <section className="py-60 text-center bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-tripsoda-main/20 rounded-full blur-[160px] opacity-20" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 px-6"
                >
                    <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-none mb-20">
                        THE NEXT <br />
                        <span className="text-tripsoda-main italic">ADVENTURE.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/tours">
                            <a className="group bg-white text-black px-16 py-8 rounded-full font-black text-xl hover:bg-tripsoda-main hover:text-white transition-all duration-700 flex items-center gap-4">
                                탐험 시작하기 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </Link>
                        <Link href="/contact">
                            <a className="text-white border border-white/20 px-16 py-8 rounded-full font-black text-xl hover:bg-white/5 transition-all">
                                맞춤 상담
                            </a>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}


