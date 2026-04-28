import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

if (typeof global !== 'undefined' && typeof (global as any).performance === 'undefined') {
    (global as any).performance = { now: () => Date.now() };
}

const tours = [
    {
        id: 1,
        title: '투르겐 폭포 + 아씨 고원 투어',
        duration: '1일',
        image: '/images/tour_assy.png',
        description: '현지인들이 가장 사랑하는 대자연 코스. 투르겐 폭포의 장엄함과 아씨 고원의 끝없는 초록빛 파노라마를 하루 만에 만끽하세요.',
        schedule: [
            { time: '08:00', title: '설레는 여정의 시작', desc: '고객님의 픽업 장소에서 투어 전용 차량으로 편안하게 출발합니다.', image: '/images/assy_observatory.png' },
            { time: '10:00', title: '투르겐 폭포 (Turgen Waterfall)', desc: '시원하게 쏟아지는 폭포의 절경 속에서 힐링 타임.' },
            { time: '12:00', title: '아씨 고원으로 이동', desc: '해발 2,600m의 광활한 초원, 아씨 고원으로 오프로드를 달리며 풍경을 감상합니다.' },
            { time: '13:30', title: '아씨 고원 도착 및 피크닉', desc: '아름다운 고원을 배경으로 한 여유로운 피크닉과 인생샷 타임.', image: '/images/tour_assy.png' },
            { time: '18:00', title: '알마티 귀환 출발', desc: '가슴 뻥 뚫리는 대자연의 여운을 안고 알마티로 돌아갑니다.' },
            { time: '20:30', title: '투어 종료', desc: '안전하게 알마티 시내 원하시는 곳에 하차합니다.' }
        ],
        inclusions: ['투어 전용 차량 및 기사', '현지 가이드', '국립공원 입장료'],
        exclusions: ['개인 식비 및 기타 경비']
    },
    {
        id: 2,
        title: '콜사이 + 차른 캐니언 + 카인디 1일 투어',
        duration: '1일',
        image: '/images/tour_charyn_1765783988719.png',
        description: '카자흐스탄의 3대 자연 명소를 1일 만에 정복! 웅장한 캐니언부터 에메랄드빛 신비의 호수까지 가장 가성비 좋게 둘러보는 핵심 투어.',
        schedule: [
            { time: '05:30', title: '알찬 하루의 시작', desc: '조금 일찍 서둘러 알마티를 출발합니다. 꽉 찬 일정을 위해 일찍 만나요!' },
            { time: '08:30', title: '차른 캐니언 (Charyn Canyon)', desc: '지구의 신비! 붉은 암석들이 만들어낸 웅장한 절경 속을 거닐어 봅니다.', image: '/images/charyn_light.png' },
            { time: '11:00', title: '블랙 캐니언 & 문 캐니언', desc: '아찔한 블랙 캐니언 전망대와 독특한 문 캐니언을 잠시 경유합니다.', image: '/images/black_canyon.png' },
            { time: '13:30', title: '카인디 호수 (Kaindy Lake)', desc: '물속에 잠긴 자작나무 숲. 신비로운 분위기의 카인디 호수에서 인생샷을 남겨보세요.', image: '/images/tour_kaindy.png' },
            { time: '15:30', title: '콜사이 호수 (Kolsai Lake)', desc: '알마티의 진주로 불리는 콜사이 호수. 보트를 타거나 호반을 산책하며 힐링합니다.', image: '/images/tour_kolsai_1765784008248.png' },
            { time: '22:00', title: '알마티 도착', desc: '알찬 1일 3대 명소 정복을 마치고 알마티로 무사히 복귀합니다.' }
        ],
        inclusions: ['투어 전용 차량', '현지 가이드', '국립공원 입장료', '카인디 4륜 전용 차량 이동비'],
        exclusions: ['개인 식사비', '기타 개인 경비']
    },
    {
        id: 3,
        title: '알틴 에멜 국립공원 투어',
        duration: '1일 (또는 1박 2일)',
        image: '/images/tour_singing_dune.png',
        description: '바람이 부르면 노래하는 사막과 다채로운 색감의 악타우 산맥. 모험을 갈망하는 배낭여행객을 위한 야생 탐험 코스입니다.',
        schedule: [
            { time: '포인트 1', title: '싱잉 듄 (Singing Dune)', desc: '바람이 모래를 스치며 내는 신비한 소리! 광활한 사막 한가운데서 사막 썰매도 타보세요.', image: '/images/singing_dune.png' },
            { time: '포인트 2', title: '악타우 산맥 (Aktau Mountains)', desc: '과거 바다였던 지형이 솟아오르며 만들어낸 다채로운 단층. 흡사 다른 행성에 온 것 같은 풍경입니다.', image: '/images/aktau_mountains.png' },
            { time: '포인트 3', title: '카투타우 산맥 (Katutau Mountains)', desc: '화산 활동으로 형성된 기괴하고 거대한 암석 지대 탐험.' }
        ],
        inclusions: ['4WD 전용 차량(Subaru Forester 등)', '현지 가이드', '국립공원 입장료'],
        exclusions: ['식사비', '기타 개인 경비']
    },
    {
        id: 4,
        title: '빅 알마티 호수 (BAO) 투어',
        duration: '반나절',
        image: '/images/tour_bao.png',
        description: '해발 2,511m에 위치한 에메랄드빛 만년설 호수. 알마티 시내에서 가장 접근성이 좋아 부담 없이 다녀올 수 있는 반나절 코스입니다.',
        schedule: [
            { time: '06:00', title: '상쾌한 아침 출발', desc: '오전 시간을 100% 활용하기 위해 이른 아침 픽업을 진행합니다.' },
            { time: '07:00', title: '빅 알마티 호수 (BAO) 도착', desc: '아침 햇살에 빛나는 에메랄드 호수! 호숫가를 따라 산책하며 자유 시간을 즐깁니다.', image: '/images/tour_bao.png' },
            { time: '08:30', title: '아유사이 정차 및 커피 타임', desc: '내려오는 길, 분위기 좋은 산장에서 멋진 경관을 바라보며 따뜻한 커피 한 잔의 여유.', image: '/images/cosmo_station.png' },
            { time: '10:00', title: '호텔 복귀', desc: '알마티 시내로 복귀하여 남은 하루 일정을 여유롭게 진행하세요.' }
        ],
        inclusions: ['호텔 픽업/샌딩', '전용 차량', '현지 가이드', '환경 부담금'],
        exclusions: ['식사 및 음료비']
    },
    {
        id: 5,
        title: '노마드 에스닉 마을 투어',
        duration: '1일',
        image: '/images/tour_ethno_village.png',
        description: '카자흐스탄 유목민(노마드)의 전통과 역사를 직접 체험해보는 투어. 웅장한 기마 공연과 유르트 체험으로 특별한 하루를 보냅니다.',
        schedule: [
            { time: '체험 1', title: '전통 무술 및 독수리 쇼 시연', desc: '유목민들의 용맹함을 엿볼 수 있는 전통 무술과 늠름한 맹금류 사냥 시연 관람.', image: '/images/horse_performance.png' },
            { time: '체험 2', title: '전통 승마 경기 (Kokpar)', desc: '눈앞에서 펼쳐지는 기수들의 박진감 넘치는 승마 기예. 카자흐 전통 스포츠의 정수를 느낄 수 있습니다.' },
            { time: '체험 3', title: '전통 가옥 유르트 체험', desc: '유목민들의 텐트인 유르트(Yurt)에 들어가 그들의 생활 방식을 직접 체험해 봅니다.', image: '/images/tour_ethno_village.png' },
            { time: '체험 4', title: '현지식 점심 (플로브 등)', desc: '맛있게 조리된 카자흐스탄 전통 볶음밥 플로브 등 풍성한 현지식으로 든든한 점심 식사.', image: '/images/kazakh_lunch.png' },
            { time: '체험 5', title: '자유 승마 체험', desc: '초원 위에서 직접 말을 타보며 노마드가 된 듯한 기분을 만끽하세요.', image: '/images/horse_riding_activity.png' }
        ],
        inclusions: ['전용 차량 이동', '모든 프로그램 체험비', '현지식 점심 식사'],
        exclusions: ['개인 기타 경비']
    },
    {
        id: 6,
        title: '알마티 시티 투어',
        duration: '반나절',
        image: '/images/tour_city_1765784027581.png',
        description: '알마티 도심의 과거와 현재, 그리고 웅장한 설산까지. 현지 가이드와 함께 알마티의 진짜 매력을 발견하는 워킹 투어입니다.',
        schedule: [
            { time: '10:00', title: '호텔 집합 및 출발', desc: '알마티 시내를 정복하기 위해 기분 좋게 투어를 시작합니다.' },
            { time: '11:00', title: '심불락 케이블카', desc: '3단계 케이블카를 타고 해발 3,200m에 올라 만년설과 알마티 전경을 한눈에!', image: '/images/tour_shymbulak.png' },
            { time: '14:00', title: '판필로프 공원 & 젠코프 대성당', desc: '세계에서 두 번째로 높은 목조 건물인 젠코프 성당과 2차 세계대전 영웅들을 기리는 공원 산책.', image: '/images/zenkov_cathedral.png' },
            { time: '15:00', title: '그린 바자르 전통 시장', desc: '알마티 시민들의 활기가 넘치는 곳! 견과류, 향신료 등 현지 시장의 정취를 느껴봅니다.', image: '/images/green_bazaar.png' },
            { time: '16:00', title: '콕토베 케이블카', desc: '도심 속 전망대 콕토베(Kok Tobe)로 이동하여 아름다운 도심 풍경을 감상합니다.', image: '/images/kok_tobe.png' },
            { time: '17:30', title: '투어 종료', desc: '알마티의 주요 스팟을 모두 돌아보고 숙소로 복귀합니다.' }
        ],
        inclusions: ['차량 서비스', '현지 가이드'],
        exclusions: ['케이블카 티켓(심불락/콕토베)', '식사비', '기타 개인 경비']
    },
    {
        id: 7,
        title: '카자흐 에스닉 스타일 스냅 촬영',
        duration: '약 1시간',
        image: '/images/tour_kazakh_snap.png',
        description: '카자흐스탄의 이국적인 대자연이나 전통 가옥을 배경으로, 화려한 에스닉 의상을 입고 인생 최고의 순간을 남겨보세요.',
        schedule: [
            { time: '준비', title: '의상 피팅 및 컨셉 논의', desc: '카자흐 전통 의상(샤판 등)을 입고, 전문 포토그래퍼와 촬영 스팟 및 컨셉을 맞춥니다.' },
            { time: '본 촬영', title: '대자연/도심 속 스냅 촬영', desc: '압도적인 풍경 속에서 영화 같은 화보 촬영이 진행됩니다.', image: '/images/tour_kazakh_snap.png' },
            { time: '마무리', title: '원본 및 보정본 수령 안내', desc: '촬영을 마치고 사진 보정 일정과 수령 방법을 안내받습니다.' }
        ],
        inclusions: ['사진/영상 패키지(옵션별 상이)', '전통 의상 대여 (옵션 확인)', '전문 포토그래퍼'],
        exclusions: ['헤어/메이크업', '개인 이동 경비']
    }
]

export default function TourDetail() {
    const router = useRouter()
    const { id } = router.query

    // Parallax Scroll logic
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    // Find the tour
    const tour = tours.find(t => t.id == Number(id)) || tours[0]

    if (!tour) return null

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="bg-gray-50/50"
        >
            <Head>
                <title>{tour.title} | 트립소다 카자흐스탄</title>
            </Head>

            {/* Parallax Hero Image */}
            <div className="relative h-[65vh] bg-gray-900 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${tour.image}')`, y: y1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                
                <motion.div 
                    style={{ opacity }}
                    className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10"
                >
                    <div className="max-w-7xl mx-auto">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-tripsoda-main/90 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 inline-block shadow-lg"
                        >
                            {tour.duration}
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-xl max-w-4xl"
                        >
                            {tour.title}
                        </motion.h1>
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 relative">
                
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-tripsoda-main/10 flex items-center justify-center text-tripsoda-main">✨</span>
                                투어 소개
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {tour.description}
                            </p>

                            {/* Highlights */}
                            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['인생샷 보장', '편안한 이동', '전문 가이드', '알찬 일정'].map((tag, i) => (
                                    <div key={i} className="bg-gray-50 text-gray-700 text-center py-4 rounded-2xl font-bold text-sm border border-gray-100 hover:border-tripsoda-main hover:text-tripsoda-main transition-colors">
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* Interactive Timeline */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-12">여정 안내</h2>
                        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[1.4rem] md:before:ml-[2.2rem] before:h-full before:w-0.5 before:bg-gray-200">
                            {tour.schedule ? tour.schedule.map((item, index) => (
                                <motion.div 
                                    key={index} 
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={{
                                        hidden: { opacity: 0.3, scale: 0.95, x: -10 },
                                        visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="relative flex items-start group mb-12 last:mb-0"
                                >
                                    {/* Animated Dot */}
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gray-200 group-[.is-active]:bg-tripsoda-main shrink-0 z-10 transition-colors duration-500 md:ml-4 shadow-sm group-hover:bg-tripsoda-main">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-full bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ml-6 group-hover:-translate-y-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-bold text-tripsoda-main text-sm bg-tripsoda-main/10 px-3 py-1.5 rounded-full">{item.time}</span>
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 text-base leading-relaxed mb-4">{item.desc}</p>
                                        {item.image && (
                                            <div className="rounded-2xl overflow-hidden h-48 w-full mt-4">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )) : (
                                <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">일정 정보 업데이트 중입니다.</div>
                            )}
                        </div>
                        <div className="mt-10 p-5 bg-tripsoda-main/5 rounded-2xl border border-tripsoda-main/20 text-center text-sm text-gray-600 font-medium">
                            📢 위 일정은 예시입니다. 현지 기상 상황 및 교통편에 따라 실제 일정은 변경될 수 있습니다.
                        </div>
                    </section>

                    {/* Inclusions / Exclusions */}
                    <section className="grid md:grid-cols-2 gap-6">
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-blue-50/80 p-8 rounded-3xl border border-blue-100"
                        >
                            <h3 className="flex items-center font-bold text-blue-900 mb-6 text-xl">
                                <span className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3 text-blue-700">✓</span> 포함 사항
                            </h3>
                            <ul className="space-y-4">
                                {(tour.inclusions || ['차량', '가이드']).map((item, i) => (
                                    <li key={i} className="flex items-start text-blue-900/80 text-base font-medium">
                                        <span className="mr-3 text-blue-500">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-red-50/80 p-8 rounded-3xl border border-red-100"
                        >
                            <h3 className="flex items-center font-bold text-red-900 mb-6 text-xl">
                                <span className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center mr-3 text-red-700">✕</span> 불포함 사항
                            </h3>
                            <ul className="space-y-4">
                                {(tour.exclusions || ['개인 경비']).map((item, i) => (
                                    <li key={i} className="flex items-start text-red-900/80 text-base font-medium">
                                        <span className="mr-3 text-red-400">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </section>
                </div>

                {/* Sticky Sidebar Widget */}
                <div className="lg:col-span-1">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="sticky top-28 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-6">여정 요약</h3>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-center text-gray-700">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mr-4">
                                    <Clock size={24} className="text-tripsoda-main" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">소요 시간</div>
                                    <div className="font-bold">{tour.duration}</div>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mr-4">
                                    <MapPin size={24} className="text-tripsoda-main" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">출발지</div>
                                    <div className="font-bold">알마티 시내 픽업</div>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mr-4">
                                    <Calendar size={24} className="text-tripsoda-main" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">출발일</div>
                                    <div className="font-bold">매일 출발 (상담 요망)</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link href="/contact">
                                <a className="block w-full bg-gray-900 text-white text-center font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    견적 문의하기
                                </a>
                            </Link>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-[#FEE500] rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <a href="http://pf.kakao.com/_nSKuX/chat" target="_blank" rel="noreferrer" className="relative flex items-center justify-center w-full bg-[#FEE500] text-black text-center font-bold py-4 rounded-2xl hover:bg-[#f4dc00] transition-all">
                                    <span className="mr-2 text-xl">💬</span> 카카오톡 빠른 상담
                                </a>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 text-center mt-6">
                            평일/주말 09:00 - 18:00 (현지 시간)
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
