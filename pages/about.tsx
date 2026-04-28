import Head from 'next/head'
import Link from 'next/link'
import { MapPin, ArrowDown, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

export default function About() {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
        >
            <Head>
                <title>회사 소개 | 트립소다 카자흐스탄</title>
            </Head>

            {/* 1. Hero Section */}
            <div className="relative py-32 bg-gray-900 overflow-hidden">
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
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
                    >
                        트립소다 <span className="text-tripsoda-main">카자흐스탄</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
                    >
                        우리는 <span className="font-bold text-white">카자흐스탄 현지</span>에서 직접 발로 뛰며<br className="md:hidden" />
                        가장 완벽한 여행을 만듭니다.
                    </motion.p>
                </div>
            </div>

            {/* 2. Traveler's Lounge */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] relative min-h-[500px] flex items-center transform md:-translate-y-24 border border-gray-100 group"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 overflow-hidden">
                            <img src="/images/office_lounge.jpg" alt="Lounge Background" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-10 md:p-20 max-w-3xl text-white">
                            <motion.div variants={fadeInUp} className="inline-flex items-center bg-tripsoda-main px-4 py-2 rounded-full text-sm font-bold mb-6">
                                <MapPin size={16} className="mr-2" /> 알마티 시내 중심 (나자르바예프 대로)
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                여행자들의 아지트,<br />
                                <span className="text-tripsoda-main">트립소다 라운지</span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-10 leading-relaxed font-light">
                                카자흐스탄에 도착하면 언제든 들러주세요.<br />
                                짐 보관, 와이파이, 현지 정보, 시원한 물까지 모두 무료입니다.<br />
                                트립소다 카자흐스탄은 온라인에만 존재하는 여행사가 아닙니다.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <a href="https://maps.app.goo.gl/4txAKpYxMunKXBQ39" target="_blank" rel="noreferrer" className="bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl hover:bg-tripsoda-main hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    라운지 위치 보기
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. CEO Message */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute -left-40 top-40 w-96 h-96 bg-tripsoda-main/5 rounded-full blur-3xl"></div>
                <div className="absolute -right-40 bottom-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <span className="text-tripsoda-main font-bold tracking-widest uppercase text-sm mb-4 inline-block px-4 py-1.5 bg-tripsoda-main/10 rounded-full">CEO Message</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                            "진짜 중앙아시아를<br />보여드리고 싶었습니다."
                        </h2>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative"
                    >
                        <div className="absolute -top-8 left-10 md:left-16 w-16 h-16 bg-tripsoda-main rounded-2xl flex items-center justify-center text-4xl text-white shadow-xl rotate-12">
                            ❝
                        </div>
                        <div className="mt-6 space-y-8 text-gray-600 leading-loose text-lg text-left">
                            <p className="font-medium text-gray-900 text-xl">
                                안녕하세요, <strong>트립소다 카자흐스탄 대표 이진기</strong>입니다.
                            </p>
                            <p>
                                중앙아시아의 압도적인 대자연을 처음 마주했을 때의 전율을 잊을 수 없습니다.
                                하지만 동시에 언어의 장벽, 부족한 정보, 낙후된 인프라 때문에
                                많은 분들이 선뜻 여행을 떠나지 못하는 현실이 안타까웠습니다.
                            </p>
                            <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-tripsoda-main">
                                <p className="font-bold text-gray-900 italic">
                                    "한국인이 가장 마음 편히, 깊이 있게 즐길 수 있는 여행을 직접 만들자."
                                </p>
                            </div>
                            <p>
                                트립소다 카자흐스탄은 현지에서 직접 운영하는 여행사입니다.
                                저희는 현지에 상주하며 모든 투어 코스를 직접 개발하고 운영합니다.
                                여러분의 설레는 여행이 가장 안전하고 빛나는 추억이 되도록,
                                현지에서 제가 직접 챙기겠습니다.
                            </p>
                        </div>
                        <div className="mt-12 flex items-center justify-end border-t border-gray-100 pt-8">
                            <div className="text-right">
                                <div className="font-bold text-2xl text-gray-900 mb-1">이 진 기</div>
                                <div className="text-sm font-medium text-tripsoda-main">트립소다 카자흐스탄 CEO</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Relationship Diagram */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">트립소다 & 트립소다 카자흐스탄</h2>
                        <p className="text-xl text-gray-600 font-light">한국 최고의 여행 커뮤니티와 현지 전문 법인의 만남으로<br />가장 완벽한 시너지를 만듭니다.</p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

                        {/* Tripsoda HQ */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-[40%] bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center relative group"
                        >
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">Headquarters</div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2 mt-4">트립소다 (본사)</h3>
                            <p className="text-gray-400 text-sm mb-8 font-medium">대한민국 서울</p>
                            <ul className="text-left space-y-4 text-gray-600 bg-gray-50 p-8 rounded-3xl min-h-[220px]">
                                <li className="flex items-center text-lg"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-4 shadow-sm"></span>IT 플랫폼 개발 및 운영</li>
                                <li className="flex items-center text-lg"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-4 shadow-sm"></span>여행자 커뮤니티 관리</li>
                                <li className="flex items-center text-lg"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-4 shadow-sm"></span>글로벌 파트너십 구축</li>
                                <li className="flex items-center text-lg"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-4 shadow-sm"></span>브랜드 신뢰도 보증</li>
                            </ul>
                        </motion.div>

                        {/* Connection Icon */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col items-center justify-center text-tripsoda-main"
                        >
                            <motion.div 
                                animate={{ x: [0, 10, 0] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="hidden md:block bg-tripsoda-main/10 p-4 rounded-full"
                            >
                                <ArrowRight size={48} strokeWidth={2.5} />
                            </motion.div>
                            <motion.div 
                                animate={{ y: [0, 10, 0] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="md:hidden bg-tripsoda-main/10 p-4 rounded-full"
                            >
                                <ArrowDown size={48} strokeWidth={2.5} />
                            </motion.div>
                            <span className="font-extrabold text-sm mt-4 tracking-widest text-tripsoda-main/70">DIRECT SYNERGY</span>
                        </motion.div>

                        {/* Tripsoda Kazakhstan */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-[40%] bg-white p-10 rounded-[2.5rem] shadow-sm border border-tripsoda-main/30 hover:shadow-2xl hover:border-tripsoda-main transition-all duration-500 text-center relative"
                        >
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-tripsoda-main text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">Local Entity</div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2 mt-4">트립소다 카자흐스탄</h3>
                            <p className="text-gray-400 text-sm mb-8 font-medium">카자흐스탄 알마티</p>
                            <ul className="text-left space-y-4 text-gray-700 bg-tripsoda-main/5 p-8 rounded-3xl min-h-[220px]">
                                <li className="flex items-center text-lg font-medium"><span className="w-2.5 h-2.5 bg-tripsoda-main rounded-full mr-4 shadow-sm"></span>현지 투어 직접 기획/운영</li>
                                <li className="flex items-center text-lg font-medium"><span className="w-2.5 h-2.5 bg-tripsoda-main rounded-full mr-4 shadow-sm"></span>한국인 가이드/매니저 상주</li>
                                <li className="flex items-center text-lg font-medium"><span className="w-2.5 h-2.5 bg-tripsoda-main rounded-full mr-4 shadow-sm"></span>전용 차량 및 베이스캠프 관리</li>
                                <li className="flex items-center text-lg font-medium"><span className="w-2.5 h-2.5 bg-tripsoda-main rounded-full mr-4 shadow-sm"></span>24시간 현지 케어 서비스</li>
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 5. Tripsoda (HQ) Credibility */}
            <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_bg_1765783966744.png')] bg-cover bg-center opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:w-1/3 text-center lg:text-left"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">About <span className="text-tripsoda-main">Tripsoda</span></h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-10 font-light">
                                트립소다는 여행의 설렘을 나누는 한국 1등 모험 여행 커뮤니티 플랫폼입니다. <br />
                                신뢰할 수 있는 기술력과 탄탄한 자본력을 바탕으로 글로벌 여행 시장을 혁신하고 있습니다.
                            </p>
                            <a href="https://tripsoda.com" target="_blank" rel="noreferrer" className="inline-flex items-center font-bold text-white bg-white/10 px-6 py-3 rounded-xl hover:bg-tripsoda-main transition-colors">
                                본사 홈페이지 방문 <ArrowRight className="ml-2" size={20} />
                            </a>
                        </motion.div>

                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
                        >
                            {/* Card 1 */}
                            <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors group overflow-hidden">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 transform origin-left">🏆</div>
                                <h3 className="font-bold text-2xl mb-4">2024 문체부 장관상</h3>
                                <p className="text-gray-400 text-base leading-relaxed">
                                    대한민국 관광벤처기업 선정 및 우수 기업 수상.
                                    국가가 인정한 믿을 수 있는 기업입니다.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors group overflow-hidden">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 transform origin-left">💰</div>
                                <h3 className="font-bold text-2xl mb-4">글로벌 투자 유치</h3>
                                <p className="text-gray-400 text-base leading-relaxed">
                                    국내외 유수 벤처 캐피탈(VC)로부터
                                    성공적으로 투자를 유치한 탄탄한 기업입니다.
                                </p>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div variants={fadeInUp} className="bg-tripsoda-main/10 backdrop-blur-md p-10 rounded-[2rem] border border-tripsoda-main/20 hover:bg-tripsoda-main/20 transition-colors group sm:col-span-2 overflow-hidden">
                                <div className="flex items-center mb-6">
                                    <div className="text-5xl group-hover:scale-110 transition-transform duration-500 transform origin-left">🤝</div>
                                    <h3 className="font-bold text-2xl ml-4">국내 최대 모험 커뮤니티</h3>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    단순한 상품 판매를 넘어, 수십만 명의 여행자들이 실시간으로 정보를 나누고 동행을 구하는 
                                    가장 활발하고 건강한 여행 생태계를 만들어가고 있습니다.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 6. Contact CTA */}
            <section className="py-32 bg-tripsoda-main text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay"></div>
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">가장 완벽한 중앙아시아 여행,<br />트립소다 카자흐스탄과 함께하세요.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                        <Link href="/tours">
                            <a className="bg-white text-tripsoda-main px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
                                추천 투어 둘러보기
                            </a>
                        </Link>
                        <Link href="/contact">
                            <a className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-tripsoda-main hover:scale-105 transition-all shadow-xl">
                                1:1 맞춤 상담하기
                            </a>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    )
}
