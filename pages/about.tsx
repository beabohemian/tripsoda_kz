import Head from 'next/head'
import Link from 'next/link'
import { MapPin, ArrowDown, ArrowRight } from 'lucide-react'

export default function About() {
    return (
        <>
            <Head>
                <title>회사 소개 | 트립소다 카자흐스탄</title>
            </Head>

            {/* 1. Hero Section: Tripsoda Kazakhstan Identity */}
            <div className="relative py-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_bg_1765783966744.png')] bg-cover bg-center opacity-40"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        트립소다 <span className="text-tripsoda-main">카자흐스탄</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
                        우리는 <span className="font-bold text-white">카자흐스탄 현지</span>에서 직접 발로 뛰며<br className="md:hidden" />
                        가장 완벽한 여행을 만듭니다.
                    </p>
                </div>
            </div>

            {/* 2. Traveler's Lounge: Tangible Local Presence */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl relative min-h-[500px] flex items-center transform md:-translate-y-12 border border-gray-100">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img src="/images/office_lounge.jpg" alt="Lounge Background" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-10 md:p-20 max-w-3xl text-white">
                            <div className="inline-flex items-center bg-tripsoda-main px-4 py-2 rounded-full text-sm font-bold mb-6">
                                <MapPin size={16} className="mr-2" /> 알마티 시내 중심 (나자르바예프 대로)
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                여행자들의 아지트,<br />
                                <span className="text-tripsoda-main">트립소다 라운지</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                카자흐스탄에 도착하면 언제든 들러주세요.<br />
                                짐 보관, 와이파이, 현지 정보, 시원한 물까지 모두 무료입니다.<br />
                                트립소다 카자흐스탄은 온라인에만 존재하는 여행사가 아닙니다.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact">
                                    <a className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                                        라운지 위치 보기
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CEO Message: Personal Trust */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-tripsoda-main font-bold tracking-wider uppercase text-sm">CEO Message</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            "진짜 중앙아시아를<br />
                            보여드리고 싶었습니다."
                        </h2>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 relative">
                        <div className="absolute top-0 left-8 md:left-12 transform -translate-y-1/2 w-16 h-16 bg-tripsoda-main rounded-full flex items-center justify-center text-3xl text-white shadow-md">
                            ❝
                        </div>
                        <div className="mt-6 space-y-6 text-gray-600 leading-relaxed text-base md:text-lg text-left tracking-tight md:tracking-normal">
                            <p>
                                안녕하세요, <strong>트립소다 카자흐스탄 대표 이진기</strong>입니다.
                            </p>
                            <p>
                                중앙아시아의 압도적인 대자연을 처음 마주했을 때의 전율을 잊을 수 없습니다.
                                하지만 동시에 언어의 장벽, 부족한 정보, 낙후된 인프라 때문에
                                많은 분들이 선뜻 여행을 떠나지 못하는 현실이 안타까웠습니다.
                            </p>
                            <p>
                                그래서 결심했습니다. <br className="block md:hidden" />
                                <span className="bg-yellow-100 px-1 inline-block mt-1 md:mt-0">"한국인이 가장 마음 편히, 깊이 있게 즐길 수 있는 여행을 직접 만들자."</span>
                            </p>
                            <p>
                                트립소다 카자흐스탄은 현지에서 직접 운영하는 여행사입니다.
                                저희는 현지에 상주하며 모든 투어 코스를 직접 개발하고 운영합니다.
                                여러분의 설레는 여행이 가장 안전하고 빛나는 추억이 되도록,
                                현지에서 제가 직접 챙기겠습니다.
                            </p>
                        </div>
                        <div className="mt-10 flex items-center justify-end space-x-4 border-t pt-6">
                            <div className="text-right">
                                <div className="font-bold text-xl text-gray-900">이 진 기</div>
                                <div className="text-sm text-gray-500">트립소다 카자흐스탄 CEO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Relationship Diagram: Distinction */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">트립소다 & 트립소다 카자흐스탄</h2>
                        <p className="text-gray-600">한국 최고의 여행 커뮤니티와 현지 전문 법인의 만남으로<br />가장 완벽한 시너지를 만듭니다.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

                        {/* Tripsoda HQ */}
                        <div className="w-full md:w-1/3 bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-xl transition-shadow text-center relative group">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-bold">Headquarters</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">트립소다 (본사)</h3>
                            <p className="text-gray-500 text-sm mb-6">대한민국 서울</p>
                            <ul className="text-left space-y-3 text-gray-600 bg-white p-6 rounded-2xl md:min-h-[160px]">
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>IT 플랫폼 개발 및 운영</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>여행자 커뮤니티 관리</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>글로벌 파트너십 구축</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>브랜드 신뢰도 보증</li>
                            </ul>
                        </div>

                        {/* Connection Icon */}
                        <div className="flex flex-col items-center justify-center text-tripsoda-main animate-pulse">
                            <div className="hidden md:block">
                                <ArrowRight size={48} strokeWidth={3} />
                            </div>
                            <div className="md:hidden">
                                <ArrowDown size={48} strokeWidth={3} />
                            </div>
                            <span className="font-bold text-sm mt-2">DIRECT OPERATION</span>
                        </div>

                        {/* Tripsoda Kazakhstan */}
                        <div className="w-full md:w-1/3 bg-tripsoda-light p-8 rounded-3xl border border-tripsoda-main hover:shadow-xl transition-shadow text-center relative">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-tripsoda-main text-white px-4 py-1 rounded-full text-sm font-bold">Local Entity</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">트립소다 카자흐스탄</h3>
                            <p className="text-gray-500 text-sm mb-6">카자흐스탄 알마티</p>
                            <ul className="text-left space-y-3 text-gray-700 bg-white p-6 rounded-2xl md:min-h-[160px]">
                                <li className="flex items-center"><span className="w-2 h-2 bg-tripsoda-main rounded-full mr-3"></span>현지 투어 직접 기획/운영</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-tripsoda-main rounded-full mr-3"></span>한국인 가이드/매니저 상주</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-tripsoda-main rounded-full mr-3"></span>전용 차량 및 베이스캠프 관리</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-tripsoda-main rounded-full mr-3"></span>24시간 현지 케어 서비스</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. Tripsoda (HQ) Credibility: Background info */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold mb-6">About <span className="text-tripsoda-main">Tripsoda</span></h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                트립소다는 여행의 설렘을 나누는 한국 1등 모험 여행 커뮤니티 플랫폼입니다. <br />
                                신뢰할 수 있는 기술력과 탄탄한 자본력을 바탕으로 글로벌 여행 시장을 혁신하고 있습니다.
                            </p>
                            <a href="https://tripsoda.com" target="_blank" rel="noreferrer" className="text-white underline hover:text-tripsoda-main transition-colors">
                                트립소다 본사 홈페이지 방문 &rarr;
                            </a>
                        </div>

                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            {/* Card 1 */}
                            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-tripsoda-main transition-colors group overflow-hidden">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">🏆</div>
                                <h3 className="font-bold text-xl mb-2">2024 문화체육관광부 장관상</h3>
                                <p className="text-gray-400 text-sm">
                                    대한민국 관광벤처기업 선정 및 우수 기업 수상.<br />
                                    국가가 인정한 믿을 수 있는 기업입니다.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-tripsoda-main transition-colors group overflow-hidden">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">💰</div>
                                <h3 className="font-bold text-xl mb-2">글로벌 투자 유치</h3>
                                <p className="text-gray-400 text-sm">
                                    미국 실리콘밸리 벤처캐피탈(Strong Ventures) 및<br />
                                    국내 유수 투자사로부터 투자를 유치한 유망 스타트업입니다.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-tripsoda-main transition-colors group sm:col-span-2 overflow-hidden">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">🤝</div>
                                <h3 className="font-bold text-xl mb-2">여행자 중심의 커뮤니티</h3>
                                <p className="text-gray-400 text-sm">
                                    단순한 상품 판매를 넘어, 여행자들이 정보를 나누고 동행을 구하는 <br />
                                    건강한 여행 생태계를 만들어갑니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Contact CTA */}
            <section className="py-20 bg-tripsoda-main text-white text-center">
                <h2 className="text-3xl font-bold mb-8">가장 완벽한 중앙아시아 여행,<br />트립소다 카자흐스탄과 함께하세요.</h2>
                <div className="flex justify-center gap-4">
                    <Link href="/tours">
                        <a className="bg-white text-tripsoda-main px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                            추천 투어 보기
                        </a>
                    </Link>
                    <Link href="/contact">
                        <a className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                            여행 상담하기
                        </a>
                    </Link>
                </div>
            </section>
        </>
    )
}
