import Head from 'next/head'
import Link from 'next/link'
import { Users, Languages, Wallet, FileText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Removed Instagram import
export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    // Mouse Parallax Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
            const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Scroll Reveal Logic
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
                <title>중앙아시아 여행의 시작 | 트립소다 카자흐스탄</title>
                <meta name="description" content="카자흐스탄 현지 법인 여행사. 알마티 최고의 투어를 만나보세요." />
            </Head>

            {/* Hero Section (Parallax) */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-black overflow-hidden perspective-1000">
                {/* Background Layer - Moves opposite to mouse */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out scale-110"
                    style={{
                        backgroundImage: "url('/images/hero_bg_1765783966744.png')",
                        transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px) scale(1.1)`
                    }}
                ></div>

                {/* Overlay with Grain/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>

                {/* Content Layer - Moves with mouse slightly */}
                <div
                    className="relative z-10 px-4 max-w-5xl mx-auto space-y-6 md:space-y-8 text-center"
                    style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
                >
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-tripsoda-light text-xs md:text-sm font-bold mb-4 tracking-wider uppercase">
                            Unveiling the Unknown
                        </span>
                        <h1 className="text-4xl md:text-7xl font-extrabold font-sans leading-tight text-white drop-shadow-2xl tracking-tight">
                            압도적 대자연, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tripsoda-light to-white">그 숨겨진 걸작을 만나다</span>
                        </h1>
                    </div>

                    <p className="text-lg md:text-2xl font-light text-gray-100 opacity-95 max-w-2xl mx-auto leading-relaxed shadow-black drop-shadow-md tracking-tight">
                        당신의 심장을 뛰게 할 <strong>카자흐스탄</strong>의 대자연. <br className="hidden md:block" />
                        트립소다 현지 법인이 가장 감각적인 여행을 선사합니다.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                        <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="group relative px-8 py-4 bg-white text-tripsoda-main rounded-full font-bold overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <span className="relative z-10 flex items-center gap-2">여행사 제휴 문의 (B2B)</span>
                            <div className="absolute inset-0 bg-tripsoda-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-20"></div>
                        </a>
                        <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="group relative px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:border-tripsoda-light">
                            <span className="relative z-10 flex items-center gap-2">자유 여행자 문의</span>
                            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="absolute inset-0 z-10 flex items-center justify-center text-tripsoda-main font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">지금 상담하기</span>
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </section>

            {/* Intro Section - Glassmorphism Cards */}
            <section className="py-32 bg-gray-50 text-center relative overflow-hidden">
                {/* Decorative Background Blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-tripsoda-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="reveal mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-tripsoda-textMain mb-6">Why TripSoda Kazakhstan?</h2>
                        <p className="text-xl text-tripsoda-textSub max-w-2xl mx-auto">
                            비교할 수 없는 퀄리티, 압도적인 현지 전문성. <br />
                            우리는 단순한 여행이 아닌, <strong>평생 잊지 못할 경험</strong>을 기획합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: Users, title: '현지 법인 직영', desc: '하청 없는 100% 직영 운영으로\n최상의 퀄리티를 보장합니다.' },
                            { icon: Languages, title: '완벽한 소통', desc: '한국인 매니저와 가이드가\n언어 장벽 없는 여행을 만듭니다.' },
                            { icon: Wallet, title: '투명한 정찰제', desc: '현지 직거래를 통해 \n거품 없는 합리적인 \n가격을 제안합니다.' },
                            { icon: FileText, title: '1:1 맞춤 케어', desc: '항공부터 투어까지,\n당신만의 여행을 처음부터 \n끝까지 설계합니다.' }
                        ].map((feature, idx) => (
                            <div key={idx} className="reveal glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-tripsoda-light to-tripsoda-main rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-tripsoda-main/50 transition-shadow">
                                    <feature.icon size={36} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-tripsoda-textMain mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
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
