import Head from 'next/head'
import Link from 'next/link'
import { MapPin, ArrowDown, ArrowRight, ShieldCheck, Zap, Users, Globe, Building2 } from 'lucide-react'
import { motion, Variants, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
}

export default function About() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    return (
        <div className="bg-[#050505] text-white selection:bg-tripsoda-main selection:text-white">
            <Head>
                <title>Brand Story | 트립소다 카자흐스탄</title>
                <meta name="description" content="카자흐스탄 최초의 현지 직영 온라인 플랫폼, 트립소다의 브랜드 스토리를 들려드립니다." />
            </Head>

            {/* 1. Cinematic Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ opacity, scale }}
                    className="absolute inset-0 z-0"
                >
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/hero_bg_1765783966744.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]" />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.span 
                        initial={{ opacity: 0, tracking: "0.2em" }}
                        animate={{ opacity: 1, tracking: "0.5em" }}
                        transition={{ duration: 1.5 }}
                        className="text-tripsoda-main font-bold text-sm md:text-base uppercase mb-8 block"
                    >
                        Re-defining Kazakhstan Travel
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter"
                    >
                        온라인을 넘어 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">현지의 숨결까지.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
                    >
                        트립소다 카자흐스탄은 플랫폼의 편리함과 <br className="hidden md:block" />
                        현지 직영의 전문성을 결합한 중앙아시아 최초의 하이브리드 트래블 브랜드입니다.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll to Explore</span>
                    <div className="w-px h-16 bg-gradient-to-b from-tripsoda-main to-transparent animate-pulse" />
                </motion.div>
            </section>

            {/* 2. Core Vision Section (Dark Bento) */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Big Card 1: Direct Operation */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-8 group relative aspect-[16/9] lg:aspect-auto lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10"
                        >
                            <img src="/images/tour_charyn_1765783988719.png" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" alt="Direct Operation" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                            <div className="absolute bottom-0 p-10 md:p-16">
                                <ShieldCheck size={48} className="text-tripsoda-main mb-6" />
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">100% 현지 법인 직영 운영</h2>
                                <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                                    중간 대행사(Local Agency)를 거치지 않습니다. <br />
                                    알마티 현지 법인이 차량, 가이드, 일정을 직접 통제하여 <br className="hidden md:block" />
                                    가격 거품은 걷어내고 품질은 극대화했습니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2: Innovation */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 flex flex-col justify-between"
                        >
                            <Zap size={40} className="text-tripsoda-main" />
                            <div>
                                <h3 className="text-2xl font-bold mb-4">플랫폼의 혁신</h3>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                    한국 본사의 IT 기술력을 바탕으로, 복잡했던 카자흐스탄 여행 예약을 투명하고 간편하게 혁신합니다. 실시간 상담과 견적 시스템으로 여행의 허들을 낮춥니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3: Global HQ */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 flex flex-col justify-between"
                        >
                            <Globe size={40} className="text-blue-500" />
                            <div>
                                <h3 className="text-2xl font-bold mb-4">트립소다 본사 (Seoul)</h3>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                    문체부 장관상 수상, 국내 최대 모험 여행 커뮤니티 트립소다 본사의 전폭적인 지원과 브랜드 신뢰도를 바탕으로 운영됩니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Big Card 4: The Basecamp */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-8 group relative aspect-[16/9] lg:aspect-auto lg:h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10"
                        >
                            <img src="/images/office_lounge.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt="Almaty Basecamp" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
                            <div className="absolute inset-y-0 left-0 p-10 md:p-16 flex flex-col justify-center">
                                <MapPin size={40} className="text-tripsoda-main mb-6" />
                                <h2 className="text-3xl font-bold mb-4">오프라인 컨트롤 타워</h2>
                                <p className="text-gray-400 max-w-lg leading-relaxed">
                                    알마티 나자르바예프 대로 65번지. <br />
                                    온라인 상담을 넘어 오프라인에서 직접 고객을 맞이하는 전초기지, '트립소다 라운지'를 운영합니다.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. CEO & Philosophy Section */}
            <section className="py-32 bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <img src="/images/office_meeting_1765784054170.png" alt="CEO Lee Jinki" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-tripsoda-main p-10 rounded-[3rem] text-white shadow-2xl z-20 hidden md:block">
                                <p className="text-sm font-bold tracking-widest uppercase mb-2">CEO Philisophy</p>
                                <p className="text-2xl font-black italic">"가장 안전하고,<br />가장 투명하게."</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:w-1/2 space-y-8"
                        >
                            <span className="text-tripsoda-main font-bold tracking-[0.3em] uppercase text-sm block">Founder's Message</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-gray-900">
                                중앙아시아 여행의 <br />
                                <span className="text-gray-300">새로운 표준</span>을 세웁니다.
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                                <p>
                                    알마티의 압도적인 대자연을 처음 마주했을 때의 경이로움을 기억합니다. 동시에 언어와 인프라의 장벽으로 인해 이 아름다움을 온전히 즐기지 못하는 여행자들의 안타까움도 보았습니다.
                                </p>
                                <p className="font-medium text-gray-900">
                                    트립소다 카자흐스탄은 "한국인이 가장 마음 편히 즐길 수 있는 현지 환경을 직접 구축하자"는 일념으로 설립되었습니다.
                                </p>
                                <p>
                                    우리는 단순히 투어 상품을 파는 곳이 아닙니다. 현지에 상주하며 차량 한 대, 가이드 한 명까지 직접 검증하고 책임지는 '현지 직영 시스템'을 통해, 중앙아시아 여행의 고질적인 불투명함을 해결해 나갑니다.
                                </p>
                            </div>
                            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-black text-gray-900">이 진 기</p>
                                    <p className="text-sm text-tripsoda-main font-bold uppercase tracking-widest">CEO, Tripsoda Kazakhstan</p>
                                </div>
                                <img src="/images/logo.png" alt="Logo" className="h-6 opacity-30" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Relationship Synegery (Modern Visual) */}
            <section className="py-32 bg-gray-50 text-black">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">Global Synegery</h2>
                    </motion.div>

                    <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-6">
                        {/* Seoul Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 text-left flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">
                                    <Building2 size={24} />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Tripsoda HQ (Seoul)</h3>
                                <p className="text-gray-500 mb-10 leading-relaxed">한국 최고의 모험 여행 커뮤니티 플랫폼. IT 기술력과 브랜드 신뢰도를 통해 글로벌 여행 시장을 선도합니다.</p>
                            </div>
                            <ul className="space-y-4">
                                {["IT 플랫폼 고도화", "브랜드 마케팅", "커뮤니티 거버넌스", "글로벌 확장 전략"].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm font-bold text-gray-800">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Almaty Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 bg-gray-900 p-12 rounded-[3rem] shadow-2xl text-left flex flex-col justify-between text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Users size={160} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-tripsoda-main rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-tripsoda-main/20">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="text-2xl font-black mb-4 text-tripsoda-main">Tripsoda Almaty</h3>
                                <p className="text-gray-400 mb-10 leading-relaxed">카자흐스탄 현지 실무 본부. 100% 직영 오퍼레이션 시스템을 통해 현장에서 완벽한 여정을 집도합니다.</p>
                            </div>
                            <ul className="space-y-4 relative z-10">
                                {["현지 투어 직접 운영", "가이드/차량 실무 관리", "라운지 거점 서비스", "24시간 로컬 케어"].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm font-bold text-gray-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-tripsoda-main mr-3" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. CTA Section */}
            <section className="py-40 bg-[#050505] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-5" />
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative z-10 px-6"
                >
                    <span className="text-tripsoda-main font-bold tracking-[0.5em] uppercase text-xs mb-8 block">Ready to Explore?</span>
                    <h2 className="text-4xl md:text-7xl font-black mb-16 leading-tight tracking-tighter">
                        당신의 첫 번째 카자흐스탄,<br />
                        <span className="text-gray-500">트립소다가 완성합니다.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/tours">
                            <a className="group bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-tripsoda-main hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-3">
                                투어 둘러보기 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </Link>
                        <Link href="/contact">
                            <a className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all shadow-xl">
                                1:1 맞춤 견적 상담
                            </a>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}

