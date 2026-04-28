import Head from 'next/head'
import Link from 'next/link'
import { Users, Languages, Wallet, FileText, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    // Advanced Mouse Parallax & Custom Cursor Hover Interaction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 2; 
            const y = (e.clientY / innerHeight - 0.5) * 2; 
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Advanced Scroll Reveal & Kinetic Typography
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

        // Wrap words for kinetic typography
        if (textRef.current) {
            const text = textRef.current.innerText;
            textRef.current.innerHTML = text.split(' ').map((word, i) => 
                `<span style="transition-delay: ${i * 0.1}s">${word}&nbsp;</span>`
            ).join('');
        }

        return () => reveals.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <>
            <Head>
                <title>중앙아시아 여행의 시작 | 트립소다 카자흐스탄</title>
                <meta name="description" content="카자흐스탄 현지 법인 여행사. 알마티 최고의 투어를 만나보세요." />
            </Head>

            {/* Cinematic Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-black overflow-hidden perspective-1000">
                {/* Dynamic Mesh Aurora Background */}
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen animate-aurora pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,208,148,0.4) 0%, rgba(0,0,0,0) 50%), radial-gradient(circle at 80% 20%, rgba(96,165,250,0.3) 0%, rgba(0,0,0,0) 40%)',
                    backgroundSize: '200% 200%'
                }}></div>

                {/* Base Background Image with extreme parallax */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out scale-110 z-0 opacity-50"
                    style={{
                        backgroundImage: "url('/images/hero_bg_1765783966744.png')",
                        transform: `translate(${-mousePos.x * 40}px, ${-mousePos.y * 40}px) scale(1.15)`
                    }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a] z-0"></div>

                {/* Content Layer */}
                <div
                    className="relative z-10 px-4 max-w-6xl mx-auto text-center"
                    style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
                >
                    <div className="reveal word-reveal mb-6">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-tripsoda-light text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 shadow-2xl">
                            Unveiling the Unknown
                        </span>
                        <h1 ref={textRef} className="text-5xl md:text-8xl font-black font-sans leading-tight text-white tracking-tighter drop-shadow-2xl mix-blend-plus-lighter">
                            압도적 대자연, 그 숨겨진 걸작
                        </h1>
                    </div>

                    <p className="reveal text-xl md:text-3xl font-light text-gray-300 opacity-90 max-w-3xl mx-auto leading-relaxed tracking-tight mt-6" style={{transitionDelay: '0.4s'}}>
                        당신의 심장을 뛰게 할 <strong>카자흐스탄</strong>.<br className="hidden md:block" />
                        현지 법인이 설계하는 가장 완벽하고 감각적인 여정.
                    </p>

                    <div className="reveal flex flex-col sm:flex-row justify-center gap-6 mt-16" style={{transitionDelay: '0.6s'}}>
                        <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="magnetic-wrap group">
                            <div className="relative px-10 py-5 bg-white text-black rounded-full font-bold overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3">
                                <span className="relative z-10">B2B 제휴 문의</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-tripsoda-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-30"></div>
                            </div>
                        </a>
                        <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="magnetic-wrap group">
                            <div className="relative px-10 py-5 bg-transparent border border-white/30 backdrop-blur-md text-white rounded-full font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white/10 flex items-center gap-3">
                                <span className="relative z-10">자유 여행자 상담</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/30 z-10 mix-blend-screen">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
                </div>
            </section>

            {/* Premium Bento Box Section */}
            <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                {/* Decorative Deep Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tripsoda-main/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="reveal text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">Masterpiece<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-tripsoda-main to-blue-400">of Travel.</span></h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-tight">
                            비교를 불허하는 하이엔드 퀄리티. 우리는 단순한 관광이 아닌,<br/>
                            당신의 영혼에 각인될 궁극의 마스터피스를 기획합니다.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="bento-grid">
                        {/* Box 1: Large Span */}
                        <div className="reveal bento-item col-span-12 md:col-span-8 p-10 md:p-14 bg-white/5 border-white/10 hover:bg-white/10 group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users size={120} className="text-tripsoda-main" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">100% 현지 법인 직영</h3>
                            <p className="text-lg text-gray-400 max-w-md relative z-10 leading-relaxed">
                                하청의 하청으로 이어지는 저품질 투어는 잊으세요.<br/>
                                트립소다는 카자흐스탄 현지 법인이 A부터 Z까지 모든 일정을 직접 통제하고 보증합니다.
                            </p>
                        </div>

                        {/* Box 2: Square */}
                        <div className="reveal bento-item col-span-12 md:col-span-4 p-10 bg-gradient-to-br from-tripsoda-dark/20 to-transparent border-tripsoda-main/20 group" style={{transitionDelay: '0.1s'}}>
                            <Languages size={48} className="text-tripsoda-main mb-6 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="text-2xl font-bold text-white mb-3">완벽한 언어 소통</h3>
                            <p className="text-gray-400 leading-relaxed">
                                한국인 전담 매니저와 한국어가 유창한 현지 엘리트 가이드가 언어의 장벽을 완전히 허물어 드립니다.
                            </p>
                        </div>

                        {/* Box 3: Square */}
                        <div className="reveal bento-item col-span-12 md:col-span-4 p-10 bg-white/5 border-white/10 hover:bg-white/10 group" style={{transitionDelay: '0.2s'}}>
                            <Wallet size={48} className="text-white mb-6 group-hover:rotate-12 transition-transform duration-500" />
                            <h3 className="text-2xl font-bold text-white mb-3">투명한 하이엔드</h3>
                            <p className="text-gray-400 leading-relaxed">
                                옵션 강요, 숨겨진 팁은 없습니다. 오직 프리미엄 여행 본질에만 집중할 수 있는 깔끔한 정찰제를 약속합니다.
                            </p>
                        </div>

                        {/* Box 4: Large Span */}
                        <div className="reveal bento-item col-span-12 md:col-span-8 p-10 md:p-14 bg-gradient-to-tr from-blue-900/20 to-transparent border-white/10 group overflow-hidden" style={{transitionDelay: '0.3s'}}>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-400/30 transition-colors duration-700"></div>
                            <FileText size={48} className="text-blue-400 mb-6 group-hover:-translate-y-2 transition-transform duration-500 relative z-10" />
                            <h3 className="text-3xl font-bold text-white mb-4 relative z-10">당신만의 1:1 비스포크 설계</h3>
                            <p className="text-lg text-gray-400 max-w-lg relative z-10 leading-relaxed">
                                VIP 의전부터 익스트림 오프로드까지. 정해진 패키지에 당신을 맞추지 마세요. 당신의 취향과 예산에 맞춘 단 하나의 여행을 디자인합니다.
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
