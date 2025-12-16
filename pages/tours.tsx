import Head from 'next/head'
import Link from 'next/link'

export default function Tours() {
    const tours = [
        { id: 1, title: '알마티 근교 아씨 고원 & 천문대 낭만 트레킹', duration: '1일', image: '/images/tour_assy.png' },
        { id: 2, title: '3대 명소 정복! 차른 캐년 & 콜사이 & 카인디 호수', duration: '1일', image: '/images/tour_charyn_1765783988719.png' },
        { id: 3, title: '빅 알마티 호수(BAO) & 만년설 파노라마 투어', duration: '1일', image: '/images/tour_bao.png' },
        { id: 4, title: '아씨 고원 별밤 & 3대 명소(차른/콜사이/카인디) 1박 2일', duration: '1박 2일', image: '/images/tour_kaindy.png' },
        { id: 5, title: '대자연 하이라이트: 아씨+3대명소+빅알마티 2박 3일', duration: '2박 3일', image: '/images/tour_kolsai_1765784008248.png' },
        { id: 6, title: '알마티 남부 골든링: 싱잉듄 & 3대 명소 & 아씨 고원 3박 4일', duration: '3박 4일', image: '/images/tour_singing_dune.png' },
        { id: 7, title: '알마티 시티 핵심 명소 & 콕토베 야경 워킹 투어', duration: '반나절', image: '/images/tour_city_1765784027581.png' },
        { id: 8, title: '침블락 스키 리조트 & 메데우 빙상장 케이블카 투어', duration: '1일', image: '/images/tour_shymbulak.png' },
        { id: 9, title: '유목민 전통 문화 체험: 훈스 에스노 빌리지 & 승마', duration: '1일', image: '/images/tour_ethno_village.png' },
    ]

    return (
        <>
            <Head>
                <title>투어 상품 | 트립소다 카자흐스탄</title>
            </Head>

            <div className="bg-tripsoda-main py-12 md:py-20 text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold">투어 둘러보기</h1>
                <p className="opacity-90 mt-2 text-sm md:text-base">카자흐스탄 어디든, 어떤 경험이든 OK!</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour) => (
                        <div key={tour.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col">
                            <div className="h-64 overflow-hidden relative flex-shrink-0">
                                <img
                                    src={tour.image}
                                    alt={tour.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-tripsoda-main">
                                    {tour.duration}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-tripsoda-textMain mb-4 flex-grow">{tour.title}</h3>
                                <div className="mt-auto">
                                    <div className="mt-auto grid grid-cols-2 gap-3">
                                        <Link href={`/tours/${tour.id}`}>
                                            <a className="block w-full text-center border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-tripsoda-main hover:text-tripsoda-main transition-colors">
                                                자세히 보기
                                            </a>
                                        </Link>
                                        <Link href="/contact">
                                            <a className="block w-full text-center bg-tripsoda-main text-white font-bold py-3 rounded-xl hover:bg-tripsoda-dark transition-colors shadow-md">
                                                견적 문의
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Inquiry CTA */}
                <div className="mt-12 md:mt-20 bg-tripsoda-light rounded-3xl p-6 md:p-10 text-center border border-tripsoda-main/20">
                    <h2 className="text-2xl font-bold text-tripsoda-textMain mb-4">찾으시는 여행이 없으신가요?</h2>
                    <p className="text-tripsoda-textSub mb-8 max-w-2xl mx-auto">
                        트립소다 카자흐스탄은 목록에 없는 여행지나 특별한 맞춤 일정도 전문으로 기획합니다. <br className="hidden md:block" />
                        가시고 싶은 곳, 하고 싶은 경험이 있다면 무엇이든 자유롭게 문의해주세요.
                    </p>
                    <Link href="/contact">
                        <a className="inline-block bg-tripsoda-main text-white text-lg font-bold px-10 py-4 rounded-full hover:bg-tripsoda-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            기타 여행 및 맞춤 견적 문의하기
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}
