import Head from 'next/head'
import Link from 'next/link'
import { MapPin, ArrowRight, ShieldCheck, Zap, Globe, Building2, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// --- Components ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const SpotlightCard = ({ children, className = "" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-[#080808] border border-white/5 rounded-[3rem] group transition-all duration-500 hover:border-tripsoda-main/30 ${className}`}
    >
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0"
        animate={{
          background: isHovered 
            ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 243, 191, 0.12), transparent 40%)`
            : `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 243, 191, 0), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const RevealText = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "110%", skewY: 10 }}
                animate={isInView ? { y: 0, skewY: 0 } : { y: "110%", skewY: 10 }}
                transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
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
    const heroScale = useTransform(smoothScrollY, [0, 0.3], [1, 1.5]);
    const heroOpacity = useTransform(smoothScrollY, [0, 0.2], [1, 0]);
    const heroBlur = useTransform(smoothScrollY, [0, 0.2], [0, 10]);

    // Synergy Animations
    const pathLength = useTransform(smoothScrollY, [0.4, 0.6], [0, 1]);

    return (
        <div ref={containerRef} className="bg-[#050505] text-white selection:bg-tripsoda-main selection:text-white font-sans antialiased overflow-x-hidden">
            <Head>
                <title>The Vision | 트립소다 카자흐스탄</title>
                <meta name="description" content="카자흐스탄 여행의 새로운 패러다임. 트립소다의 혁신적인 비즈니스와 브랜드 스토리를 경험하세요." />
            </Head>

            <NoiseOverlay />

            {/* 1. ULTRA HERO: Immersive Presence */}
            <section className="relative h-[150vh] flex items-center justify-center">
                <motion.div 
                    style={{ scale: heroScale, opacity: heroOpacity, filter: `blur(${heroBlur}px)` }}
                    className="fixed inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero_bg_1765783966744.png')]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
                </motion.div>

                <div className="relative z-10 text-center px-6 mt-[-20vh]">
                    <div className="mb-12 overflow-hidden">
                        <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-tripsoda-main font-black tracking-[1em] uppercase text-[10px] md:text-xs block"
                        >
                            Establishment Share
                        </motion.span>
                    </div>
                    
                    <h1 className="text-7xl md:text-[15rem] font-black leading-[0.8] tracking-tighter mb-12">
                        <RevealText delay={0.2}>VIRTUAL</RevealText>
                        <RevealText delay={0.4} className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10">REALITY.</RevealText>
                    </h1>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="max-w-xl mx-auto"
                    >
                        <p className="text-sm md:text-base text-white/40 font-medium tracking-[0.2em] leading-relaxed uppercase">
                            우리는 온라인 플랫폼에서 <br /> 오프라인 전초기지로 진화합니다.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-40 left-1/2 -translate-x-1/2">
                    <motion.div 
                        animate={{ y: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-tripsoda-main to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* 2. THE CORE: Absolute Dominance */}
            <section className="relative py-60 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-40">
                        <div>
                            <RevealText className="mb-6">
                                <span className="text-tripsoda-main font-bold text-xs uppercase tracking-[0.4em]">Hybrid Innovation</span>
                            </RevealText>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                                미쳐버린 <br /> 디테일의 차이.
                            </h2>
                        </div>
                        <p className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed">
                            트립소다 카자흐스탄은 단순한 여행사를 넘어 <br className="hidden md:block" /> 
                            카자흐스탄 여행의 모든 픽셀을 직접 집도하는 브랜드입니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Innovation 1 */}
                        <SpotlightCard className="p-16 h-[550px] flex flex-col justify-between">
                            <div className="space-y-8">
                                <ShieldCheck size={40} className="text-tripsoda-main" />
                                <h3 className="text-4xl font-black tracking-tighter">직영의 <br /> 압도적 품질</h3>
                                <p className="text-gray-400 leading-relaxed text-lg font-light">하청 없는 100% 직영. 차량의 청결도부터 가이드의 눈빛까지 우리가 직접 책임집니다.</p>
                            </div>
                            <div className="text-8xl font-black text-white/[0.02] tracking-tighter select-none">CRAFT</div>
                        </SpotlightCard>

                        {/* Innovation 2 */}
                        <SpotlightCard className="p-16 h-[550px] flex flex-col justify-between md:translate-y-20">
                            <div className="space-y-8">
                                <Zap size={40} className="text-tripsoda-main" />
                                <h3 className="text-4xl font-black tracking-tighter">데이터 기반 <br /> 신뢰 구축</h3>
                                <p className="text-gray-400 leading-relaxed text-lg font-light">불투명한 현지 시장을 IT 기술로 혁신했습니다. 모든 여정은 투명하게 공개됩니다.</p>
                            </div>
                            <div className="text-8xl font-black text-white/[0.02] tracking-tighter select-none">TECH</div>
                        </SpotlightCard>

                        {/* Innovation 3 */}
                        <SpotlightCard className="p-16 h-[550px] flex flex-col justify-between md:translate-y-40">
                            <div className="space-y-8">
                                <MapPin size={40} className="text-tripsoda-main" />
                                <h3 className="text-4xl font-black tracking-tighter">물리적 <br /> 거점의 가치</h3>
                                <p className="text-gray-400 leading-relaxed text-lg font-light">알마티 나자르바예프 65번지. 온라인을 넘어 오프라인에서 당신을 보호합니다.</p>
                            </div>
                            <div className="text-8xl font-black text-white/[0.02] tracking-tighter select-none">BASE</div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* 3. SYNERGY: The Pulse */}
            <section className="py-80 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-32">
                        <div className="lg:w-1/2 space-y-10">
                            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
                                SEOUL <br />
                                <span className="text-tripsoda-main italic">TO</span> <br />
                                ALMATY.
                            </h2>
                            <div className="h-px w-full bg-gradient-to-r from-tripsoda-main to-transparent opacity-30" />
                            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
                                서울의 플랫폼 기술력과 알마티의 로컬 실행력이 <br /> 
                                실시간으로 공명하며 최고의 시너지를 만듭니다.
                            </p>
                        </div>

                        <div className="lg:w-1/2 relative aspect-square bg-[#080808] rounded-full border border-white/5 flex items-center justify-center p-20 group">
                            <div className="absolute inset-0 bg-tripsoda-main/5 rounded-full blur-[100px] animate-pulse" />
                            <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
                                <motion.circle 
                                    cx="50" cy="50" r="48" 
                                    fill="none" stroke="rgba(0,243,191,0.1)" strokeWidth="0.5" 
                                />
                                <motion.path 
                                    d="M 50 2 L 50 98 M 2 50 L 98 50" 
                                    stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"
                                />
                                <motion.path 
                                    d="M 10 50 Q 50 10, 90 50 T 10 50" 
                                    fill="none" stroke="#00f3bf" strokeWidth="1"
                                    style={{ pathLength }}
                                />
                                <motion.circle 
                                    r="2" fill="#00f3bf"
                                    style={{ offsetPath: "path('M 10 50 Q 50 10, 90 50 T 10 50')", offsetDistance: pathLength }}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center gap-2">
                                <span className="text-[10px] font-black tracking-[0.5em] text-tripsoda-main">SYNCING...</span>
                                <div className="text-4xl font-black">100%</div>
                            </div>
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


