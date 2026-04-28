import Head from 'next/head'
import Link from 'next/link'
import { Users, Languages, Wallet, FileText, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    // Advanced Mouse Parallax
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

            {/* Vibrant Tripsoda Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden perspective-1000">
                {/* Base Background Image with subtle parallax */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out scale-110 z-0 opacity-70"
                    style={{
                        backgroundImage: "url('/images/tour_charyn_1765783988719.png')",
                        transform: `translate(${-mousePos.x * 30}px, ${-mousePos.y * 30}px) scale(1.1)`
                    }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-0"></div>

                {/* Content Layer */}
                <div
                    className="relative z-10 px-4 max-w-6xl mx-auto text-center"
                    style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
                >
                    <div className="reveal word-reveal mb-6">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-tripsoda-main/90 backdrop-blur-md text-white text-sm font-bold tracking-widest mb-6 shadow-lg">
                            🇰🇷 한국인 매니저 상주 · 100% 현지 법인 직영
                        </span>
                        <h1 ref={textRef} className="text-5xl md:text-7xl font-extrabold font-sans leading-tight text-white tracking-tight drop-shadow-xl">
                            카자흐스탄 투어,<br/>더 이상 고민하지 마세요
                        </h1>
                    </div>

                    <p className="reveal text-lg md:text-2xl font-medium text-gray-100 max-w-3xl mx-auto leading-relaxed mt-6 drop-shadow-md" style={{transitionDelay: '0.4s'}}>
                        자유여행객을 위한 <span className="text-tripsoda-main font-bold">바가지 없는 투명한 정찰제 투어</span>부터<br className="hidden md:block" />
                        여행사를 위한 <span className="text-blue-400 font-bold">안전하고 확실한 B2B 현지 행사 진행</span>까지.<br className="hidden md:block" />
                        트립소다 현지 법인이 카자흐스탄 여행의 기준을 만듭니다.
                    </p>

                    <div className="reveal flex flex-col sm:flex-row justify-center gap-4 mt-12" style={{transitionDelay: '0.6s'}}>
                        <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="magnetic-wrap group">
                            <div className="relative px-8 py-4 bg-tripsoda-main text-white rounded-full font-bold overflow-hidden transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-tripsoda-main/50 flex items-center justify-center gap-2">
                                <span className="relative z-10">🙋‍♂️ 자유 여행자 맞춤 투어 상담</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>
                        <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="magnetic-wrap group">
                            <div className="relative px-8 py-4 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white/30 flex items-center justify-center gap-2">
                                <span className="relative z-10">🤝 여행사 B2B 제휴 및 행사 문의</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70 z-10">
                    <div className="w-[2px] h-12 bg-white/50 rounded-full"></div>
                </div>
            </section>

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
                        <div className="reveal bento-item col-span-12 md:col-span-8 p-10 md:p-12 bg-gray-900 border border-gray-800 group overflow-hidden" style={{transitionDelay: '0.3s'}}>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-tripsoda-main/20 blur-[80px] rounded-full group-hover:bg-tripsoda-main/40 transition-colors duration-700 pointer-events-none"></div>
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                                <FileText size={28} className="text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">나에게 딱 맞춘 비스포크 설계</h3>
                            <p className="text-gray-300 max-w-lg relative z-10 leading-relaxed">
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
