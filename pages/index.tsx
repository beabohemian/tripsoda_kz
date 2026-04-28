import Head from 'next/head'
import Link from 'next/link'
import { Users, Languages, Wallet, FileText, ArrowRight, Search, Map, Star, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

export default function Home() {
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

    // Animation Variants
    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const revealText: Variants = {
        hidden: { opacity: 0, y: "100%" },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Advanced Scroll Reveal
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => observer.observe(el));
        return () => reveals.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <>
            <Head>
                <title>트립소다 카자흐스탄 - 진정한 여정의 시작</title>
                <meta name="description" content="카자흐스탄 현지 법인 직영 프리미엄 여행사. 비교할 수 없는 디테일과 장인정신이 담긴 투어를 경험하세요." />
            </Head>

            {/* Premium Cinematic Hero Section */}
            <motion.section 
                className="relative h-screen flex flex-col justify-center bg-black overflow-hidden perspective-1000"
                style={{ opacity: heroOpacity }}
            >
                {/* Parallax Background Image */}
                <motion.div
                    className="absolute inset-0 z-0 origin-bottom"
                    style={{ y: heroY, scale: heroScale }}
                >
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/tour_charyn_1765783988719.png')" }}
                    />
                    {/* Multi-stop cinematic gradient for maximum text readability and mood */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
                </motion.div>

                {/* Main Content Layer */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 mt-20 md:mt-32">
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-4">
                            <span className="flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest shadow-2xl">
                                <span className="w-2 h-2 rounded-full bg-tripsoda-main animate-pulse"></span>
                                ALMATY, KAZAKHSTAN
                            </span>
                            <span className="hidden sm:inline-flex py-1.5 px-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 text-sm font-medium tracking-wide">
                                100% 현지 법인 직영
                            </span>
                        </motion.div>

                        <div className="overflow-hidden mb-2">
                            <motion.h1 variants={revealText} className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold text-white tracking-tighter leading-[1.1] drop-shadow-2xl">
                                Discover the
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden mb-8">
                            <motion.h1 variants={revealText} className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tighter leading-[1.1] drop-shadow-2xl italic">
                                Untouched.
                            </motion.h1>
                        </div>

                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl leading-relaxed mb-12 drop-shadow-md">
                            당신의 발길이 닿는 곳이 곧 예술이 되도록.<br className="hidden sm:block" />
                            트립소다가 카자흐스탄 여행의 <span className="text-white font-semibold border-b border-white/30 pb-1">새로운 기준</span>을 제시합니다.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-6">
                            <a href="http://pf.kakao.com/_nSKuX/chat" target="_blank" rel="noreferrer" className="group w-full sm:w-auto">
                                <div className="relative px-8 py-5 bg-tripsoda-main text-white rounded-full font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-tripsoda-dark shadow-[0_0_40px_rgba(255,107,0,0.4)] flex items-center justify-center gap-3">
                                    <span className="relative z-10 text-lg tracking-wide">여정 시작하기</span>
                                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </a>
                            <div className="flex items-center gap-4 text-white/80">
                                <div className="flex -space-x-3">
                                    <img className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover" src="/images/guides/nora.jpg" alt="Guide 1"/>
                                    <img className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover" src="/images/guides/chingis_jump.jpg" alt="Guide 2"/>
                                    <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-xs font-bold">+5</div>
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center text-yellow-400 text-xs mb-0.5">
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                    </div>
                                    <span className="font-semibold text-white">4.9/5.0</span> 리뷰 평점
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Glassmorphism Quick Info Bar (Bottom) */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-10 left-0 w-full px-6 z-30 hidden lg:block"
                >
                    <div className="max-w-7xl mx-auto flex justify-between items-end">
                        <div className="flex gap-4">
                            <div className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
                                <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Location</p>
                                <p className="font-medium">알마티, 카자흐스탄</p>
                            </div>
                            <div className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
                                <p className="text-xs text-white/60 font-bold uppercase tracking-widest mb-1">Expertise</p>
                                <p className="font-medium">안전하고 투명한 정찰제 투어</p>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="flex flex-col items-center gap-3 mr-10 cursor-pointer group" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
                            <p className="text-xs text-white/50 font-bold tracking-widest uppercase group-hover:text-white transition-colors">Scroll</p>
                            <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:border-white/60 transition-colors">
                                <motion.div 
                                    animate={{ y: [0, 24, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="w-1.5 h-3 bg-white rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 lg:hidden flex flex-col items-center gap-2"
                >
                    <ChevronDown size={24} className="text-white/50 animate-bounce" />
                </motion.div>
            </motion.section>

            {/* Bright Bento Box Section */}
            <section className="py-32 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="reveal text-center mb-20">
                        <span className="text-tripsoda-main font-bold tracking-widest uppercase text-sm mb-3 block">Why Tripsoda</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">트립소다와 함께해야 하는 이유</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            완벽한 현지 케어와 거품 없는 가격으로 잊지 못할 추억을 선사합니다.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="bento-grid">
                        {/* Box 1: Large Span */}
                        <div className="reveal bento-item col-span-12 md:col-span-8 p-10 md:p-12 bg-white border border-gray-100 hover:shadow-xl group">
                            <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                <Users size={180} className="text-tripsoda-main" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">100% 현지 법인 직영</h3>
                            <p className="text-gray-600 max-w-md relative z-10 leading-relaxed">
                                중간 마진과 하청으로 인한 퀄리티 저하는 없습니다.<br/>
                                트립소다 카자흐스탄 현지 법인이 일정을 직접 운영하고 책임집니다.
                            </p>
                        </div>

                        {/* Box 2: Square */}
                        <div className="reveal bento-item col-span-12 md:col-span-4 p-8 bg-tripsoda-light border border-tripsoda-main/20 group" style={{transitionDelay: '0.1s'}}>
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
                                <Languages size={28} className="text-tripsoda-main" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">완벽한 언어 소통</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                한국인 매니저와 한국어가 유창한 현지 가이드가 동행하여 언어 장벽 없는 편안한 여행을 만듭니다.
                            </p>
                        </div>

                        {/* Box 3: Square */}
                        <div className="reveal bento-item col-span-12 md:col-span-4 p-8 bg-white border border-gray-100 hover:shadow-xl group" style={{transitionDelay: '0.2s'}}>
                            <div className="w-14 h-14 bg-tripsoda-main/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                                <Wallet size={28} className="text-tripsoda-main" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">투명한 정찰제</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                불필요한 옵션 강요나 숨겨진 팁 요구 없이, 정해진 예산 내에서 안심하고 즐길 수 있습니다.
                            </p>
                        </div>

                        {/* Box 4: Large Span */}
                        <div className="reveal bento-item col-span-12 md:col-span-8 p-10 md:p-12 bg-gradient-to-tr from-tripsoda-light to-white border border-gray-100 group overflow-hidden" style={{transitionDelay: '0.3s'}}>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-100 blur-[80px] rounded-full group-hover:bg-blue-200/50 transition-colors duration-700 pointer-events-none"></div>
                            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-6 border border-gray-50 group-hover:-translate-y-2 transition-transform duration-500">
                                <FileText size={28} className="text-blue-500" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">나에게 딱 맞춘 비스포크 설계</h3>
                            <p className="text-gray-600 max-w-lg relative z-10 leading-relaxed">
                                꽉 막힌 패키지는 싫고 자유여행은 막막하다면? 당신의 취향과 일정에 맞춰 단 하나뿐인 완벽한 여행 코스를 디자인해 드립니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Tours Preview */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="reveal text-center mb-16">
                        <span className="text-tripsoda-main font-bold tracking-widest uppercase text-sm mb-2 block">Best Sellers</span>
                        <h2 className="text-4xl font-bold text-tripsoda-textMain">여행자들이 선택한 인기 투어</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { id: 1, title: '알마티 근교 아씨 고원 & 천문대 낭만 트레킹', img: '/images/tour_assy.png', duration: '1일' },
                            { id: 2, title: '3대 명소 정복! 차른 캐년 & 콜사이 & 카인디 호수', img: '/images/tour_charyn_1765783988719.png', duration: '1일' },
                            { id: 3, title: '빅 알마티 호수(BAO) & 만년설 파노라마 투어', img: '/images/tour_bao.png', duration: '1일' },
                        ].map((tour, idx) => (
                            <div key={tour.id} className="reveal group block overflow-hidden rounded-3xl shadow-lg relative h-[450px]">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${tour.img}')` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-3 py-1 bg-tripsoda-main text-xs font-bold rounded-full mb-3">{tour.duration}</span>
                                    <h3 className="text-2xl font-bold mb-4 leading-snug">{tour.title}</h3>

                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        <Link href="/contact">
                                            <a className="flex-1 bg-white text-tripsoda-main text-center text-sm font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                                                견적 문의
                                            </a>
                                        </Link>
                                        <Link href={`/tours/${tour.id}`}>
                                            <a className="flex-1 bg-tripsoda-main text-white text-center text-sm font-bold py-3 rounded-xl hover:bg-tripsoda-dark transition-colors border border-tripsoda-main">
                                                자세히 보기
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="reveal text-center mt-16">
                        <Link href="/tours">
                            <a className="inline-flex items-center gap-2 px-8 py-4 border-2 border-tripsoda-textMain rounded-full text-tripsoda-textMain font-bold hover:bg-tripsoda-textMain hover:text-white transition-all">
                                전체 투어 보러가기
                            </a>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Reviews (Infinite Scroller) */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16 reveal">
                    <h2 className="text-3xl font-bold text-tripsoda-textMain mb-4">트립소다 카자흐스탄 여행자들의 생생 후기</h2>
                    <p className="text-tripsoda-textSub">카자흐스탄의 매력에 푹 빠진 여행자들의 이야기를 들어보세요.</p>
                </div>

                <div className="relative reveal">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

                    <div className="flex space-x-6 animate-scroll w-max hover:pause">
                        {[
                            { text: "차른 캐년의 웅장함은 사진으로 다 담기지 않아요. 가이드님의 설명 덕분에 더 알찬 여행이었습니다!", name: "김민지 님", tour: "차른 캐년 투어" },
                            { text: "카인디 호수의 물빛은 정말 비현실적이었어요. 인생 사진 건졌습니다! 트립소다 강추해요.", name: "이현수 님", tour: "카인디 호수 투어" },
                            { text: "알마티 시내 투어도 너무 좋았어요. 콕토베 야경은 잊을 수 없을 것 같습니다. 라운지도 편안했어요.", name: "박지영 님", tour: "알마티 시티 투어" },
                            { text: "아씨 고원에서 본 별들은 제 인생 최고의 장면이었어요. 캠핑 장비도 훌륭했고 가이드분도 친절하셨습니다.", name: "최동훈 님", tour: "아씨 고원 캠핑" },
                            { text: "침블락 스키장은 시설이 정말 좋더라고요. 장비 렌탈부터 리프트권까지 편하게 해결했습니다.", name: "정수빈 님", tour: "침블락 스키 투어" },
                            { text: "콜사이 호수에서 배 타는 경험은 꼭 해보세요! 평화롭고 아름다운 자연 그 자체였습니다.", name: "강민우 님", tour: "콜사이 호수 투어" },
                            { text: "혼자 여행이라 걱정했는데, 안전하게 다녀올 수 있어서 좋았어요. 다음엔 친구들이랑 또 오고 싶네요.", name: "윤서연 님", tour: "빅 알마티 호수 투어" },
                        ].concat([
                            { text: "차른 캐년의 웅장함은 사진으로 다 담기지 않아요. 가이드님의 설명 덕분에 더 알찬 여행이었습니다!", name: "김민지 님", tour: "차른 캐년 투어" },
                            { text: "카인디 호수의 물빛은 정말 비현실적이었어요. 인생 사진 건졌습니다! 트립소다 강추해요.", name: "이현수 님", tour: "카인디 호수 투어" },
                            { text: "알마티 시내 투어도 너무 좋았어요. 콕토베 야경은 잊을 수 없을 것 같습니다. 라운지도 편안했어요.", name: "박지영 님", tour: "알마티 시티 투어" },
                            { text: "아씨 고원에서 본 별들은 제 인생 최고의 장면이었어요. 캠핑 장비도 훌륭했고 가이드분도 친절하셨습니다.", name: "최동훈 님", tour: "아씨 고원 캠핑" },
                            { text: "침블락 스키장은 시설이 정말 좋더라고요. 장비 렌탈부터 리프트권까지 편하게 해결했습니다.", name: "정수빈 님", tour: "침블락 스키 투어" },
                            { text: "콜사이 호수에서 배 타는 경험은 꼭 해보세요! 평화롭고 아름다운 자연 그 자체였습니다.", name: "강민우 님", tour: "콜사이 호수 투어" },
                            { text: "혼자 여행이라 걱정했는데, 안전하게 다녀올 수 있어서 좋았어요. 다음엔 친구들이랑 또 오고 싶네요.", name: "윤서연 님", tour: "빅 알마티 호수 투어" },
                        ]).map((review, index) => (
                            <div key={index} className="w-96 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-shrink-0">
                                <div className="flex items-center mb-4">
                                    <div className="text-yellow-400 flex text-sm">
                                        {'★'.repeat(5)}
                                    </div>
                                    <span className="text-xs text-gray-400 ml-2">{review.tour}</span>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm min-h-[80px]">"{review.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-tripsoda-light flex items-center justify-center text-tripsoda-main font-bold text-xs mr-3">
                                        {review.name[0]}
                                    </div>
                                    <p className="font-bold text-tripsoda-main text-sm">{review.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    )
}
