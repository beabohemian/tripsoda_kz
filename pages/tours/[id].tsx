import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { MapPin, Clock, Calendar } from 'lucide-react'

const tours = [
    {
        id: 1,
        title: '알마티 근교 아씨 고원 & 천문대 낭만 트레킹',
        duration: '1일',
        image: '/images/tour_assy.png',
        description: '아씨 고원의 광활한 초원과 밤하늘의 은하수를 만나는 낭만적인 트레킹 투어입니다. 윈도우 배경화면 같은 풍경 속으로 떠나보세요.',
        schedule: [
            { time: '08:00', title: '설레는 출발', desc: '알마티 시내 호텔/숙소 픽업! 쾌적한 4륜 구동 차량에 탑승하여 가이드님과 인사를 나눕니다.', image: '/images/tour_city_1765784027581.png' },
            { time: '11:00', title: '아씨 고원 도착', desc: '해발 2,600m에 펼쳐지는 끝없는 초록빛 파노라마! 가슴이 뻥 뚫리는 기분을 만끽하세요.', image: '/images/tour_assy.png' },
            { time: '13:00', title: '낭만적인 피크닉', desc: '대자연을 배경으로 즐기는 꿀맛 같은 점심 식사. (현지 상황에 따라 메뉴는 변경될 수 있습니다)', image: '/images/tour_kolsai_1765784008248.png' },
            { time: '15:00', title: '천문대 탐방', desc: '과거 소비에트 시절 건설된 붉은 천문대. 시간이 멈춘 듯한 독특한 분위기에서 인증샷 필수!', image: '/images/assy_observatory.png' },
            { time: '18:00', title: '알마티 복귀', desc: '아쉬움을 뒤로하고 알마티로 복귀합니다. 안전하게 숙소까지 모셔다 드려요.', image: '/images/tour_city_1765784027581.png' }
        ],
        inclusions: ['4륜 구동 전용 차량', '한국어 가이드', '점심 식사 (도시락/현지식)', '국립공원 입장료', '생수'],
        exclusions: ['개인 경비', '여행자 보험']
    },
    {
        id: 2,
        title: '3대 명소 정복! 차른 캐년 & 콜사이 & 카인디 호수',
        duration: '1일',
        image: '/images/tour_charyn_1765783988719.png',
        description: '카자흐스탄의 그랜드 캐년이라 불리는 차른 캐년과 신비로운 호수들을 하루에 정복하세요. 시간이 없는 여행자에게 최고의 선택!',
        schedule: [
            { time: '07:00', title: '부지런한 출발', desc: '조금 일찍 서둘러요! 하루 꽉 찬 일정으로 알마티 핵심 명소를 모두 정복하러 떠납니다.' },
            { time: '10:00', title: '차른 캐년 트레킹', desc: '지구가 아닌 것 같은 붉은 암석의 향연. "여기가 화성인가요?" 감탄이 절로 나오는 웅장함을 걸어보세요.', image: '/images/tour_charyn_1765783988719.png' },
            { time: '13:00', title: '블랙 캐년 & 점심', desc: '아찔한 절벽 위에서 내려다보는 블랙 캐년. 든든하게 점심을 먹고 에너지를 충전합니다.', image: '/images/black_canyon.png' },
            { time: '15:00', title: '카인디 호수', desc: '물 속에 잠겨있는 자작나무 숲? 신비로움 그 자체. 4륜 구동(푸르공) 차량을 타고 오프로드를 달리는 재미까지!', image: '/images/tour_kaindy.png' },
            { time: '17:00', title: '콜사이 호수', desc: '알마티의 진주, 콜사이 호수. 보트를 타거나 호수가를 거닐며 여유를 즐기세요.', image: '/images/tour_kolsai_1765784008248.png' },
            { time: '21:00', title: '알마티 도착', desc: '하루 만에 알마티 정복 완료! 피곤하지만 마음만은 꽉 찬 하루.', image: '/images/almaty_night_view.png' }
        ],
        inclusions: ['전용 차량', '전문 가이드', '중식 1회', '모든 입장료 및 에코 택스', '카인디 호수 4륜 구동 환승비'],
        exclusions: ['개인 경비', '매너 팁', '석식']
    },
    {
        id: 3,
        title: '빅 알마티 호수(BAO) & 만년설 파노라마 투어',
        duration: '1일',
        image: '/images/tour_bao.png',
        description: '알마티 시내에서 가장 가까운 에메랄드 빛 호수와 만년설을 감상하는 투어입니다. 가볍게 다녀오기 좋아요.',
        schedule: [
            { time: '09:00', title: '여유로운 출발', desc: '호텔 픽업 후 출발! 시내에서 가까워서 이동이 부담 없어요.', image: '/images/tour_city_1765784027581.png' },
            { time: '10:30', title: '빅 알마티 호수 (BAO)', desc: '에메랄드 물감 풀어놓은 듯한 호수 색깔 실화? 백두산 천지보다 아름답다는 그곳!', image: '/images/tour_bao.png' },
            { time: '12:30', title: '코스모 스테이션', desc: '구름보다 높은 곳! 해발 3,200m까지 올라가 만년설을 눈앞에서 마주합니다. 공기부터 달라요.', image: '/images/cosmo_station.png' },
            { time: '13:30', title: '산장 점심 식사', desc: '산을 내려오며 맛있는 샤슬릭(꼬치구이)으로 점심 식사!' },
            { time: '16:00', title: '시내 복귀', desc: '오후 시간을 알마티 시내에서 즐기실 수 있도록 적절한 시간에 복귀합니다.', image: '/images/tour_city_1765784027581.png' }
        ],
        inclusions: ['차량 및 기사', '가이드', '국립공원 입장료', '생수'],
        exclusions: ['개인 식사 비용 (현지 지불)']
    },
    {
        id: 4,
        title: '아씨 고원 별밤 & 3대 명소(차른/콜사이/카인디) 1박 2일',
        duration: '1박 2일',
        image: '/images/tour_kaindy.png',
        description: '쏟아지는 별과 웅장한 캐년, 신비로운 호수까지. 카자흐스탄 자연의 모든 것을 담았습니다. 캠핑의 로망을 실현해보세요.',
        schedule: [
            { time: 'Day 1 09:00', title: '출발 & 아씨 고원', desc: '알마티 출발 후 아씨 고원으로 이동. 끝없는 초원에서 인생 사진 남기기!', image: '/images/tour_assy.png' },
            { time: 'Day 1 18:00', title: '캠핑 & 별 보기', desc: '아씨 고원 또는 콜사이 호수 인근에서 캠핑(또는 게스트하우스). 밤하늘 쏟아지는 별을 보며 불멍 타임.', image: '/images/camping_stars.png' },
            { time: 'Day 2 09:00', title: '카인디 & 콜사이', desc: '아침 일찍 신비로운 카인디 호수와 콜사이 호수 산책. 상쾌한 공기를 마셔보세요.', image: '/images/kaindy_morning.png' },
            { time: 'Day 2 14:00', title: '차른 캐년', desc: '돌아오는 길에 차른 캐년의 웅장함을 감상합니다. 빛에 따라 변하는 암석의 색감이 예술이에요.', image: '/images/charyn_light.png' },
            { time: 'Day 2 19:00', title: '알마티 도착', desc: '1박 2일의 알찬 여정을 마치고 시내로 복귀합니다.', image: '/images/almaty_night_view.png' }
        ],
        inclusions: ['전용 차량', '가이드', '숙박(캠핑/게스트하우스)', '식사(4식)', '입장료'],
        exclusions: ['개인 경비', '주류 및 음료']
    },
    {
        id: 5,
        title: '대자연 하이라이트: 아씨+3대명소+빅알마티 2박 3일',
        duration: '2박 3일',
        image: '/images/tour_kolsai_1765784008248.png',
        description: '여유롭게 즐기는 카자흐스탄. 천천히 대자연의 숨결을 느껴보세요. 알짜배기 명소를 모두 둘러보는 마스터 코스.',
        schedule: [
            { time: 'Day 1', title: '아씨 고원 & 별밤', desc: '아씨 고원의 광활함과 천문대의 신비로움을 즐기고, 쏟아지는 별빛 아래서 첫날밤을 보냅니다.', image: '/images/assy_observatory.png' },
            { time: 'Day 2', title: '카인디 & 콜사이 호수', desc: '물에 잠긴 숲 카인디와 알마티의 진주 콜사이 호수에서 힐링의 시간을 가집니다.', image: '/images/kaindy_morning.png' },
            { time: 'Day 3', title: '차른 캐년 & BAO', desc: '차른 캐년의 붉은 매력에 빠졌다가, 시내로 돌아와 에메랄드 빛 빅 알마티 호수로 마무리하는 완벽한 일정!', image: '/images/tour_bao.png' }
        ],
        inclusions: ['전용 차량', '전 일정 가이드', '숙박 2박', '전 일정 식사', '모든 입장료'],
        exclusions: ['개인 경비']
    },
    {
        id: 6,
        title: '알마티 남부 골든링: 싱잉듄 & 3대 명소 & 아씨 고원 3박 4일',
        duration: '3박 4일',
        image: '/images/tour_singing_dune.png',
        description: '노래하는 사막 싱잉듄부터 고원까지. 알마티 남부의 핵심 명소를 모두 돌아보는 완벽한 일주. 모험을 좋아하는 분들께 추천!',
        schedule: [
            { time: 'Day 1', title: '알틴 예멜 국립공원', desc: '바람이 불면 노래를 한다는 "싱잉 듄(Singing Dune)" 사막 체험. 사막 썰매도 타볼까요?', image: '/images/singing_dune.png' },
            { time: 'Day 2', title: '악타우 & 카투타우', desc: '다채로운 색깔의 지형이 펼쳐지는 악타우 산맥. 화산 활동의 흔적을 찾아 떠나는 지질 탐험.', image: '/images/aktau_mountains.png' },
            { time: 'Day 3', title: '차른 캐년 & 콜사이', desc: '국립공원을 이동하며 차른 캐년과 콜사이 호수의 대조적인 아름다움을 감상합니다.', image: '/images/black_canyon.png' },
            { time: 'Day 4', title: '카인디 & 아씨 & 복귀', desc: '신비의 호수 카인디를 보고 아씨 고원을 가로질러 알마티로 복귀하는 대장정.', image: '/images/tour_kaindy.png' }
        ],
        inclusions: ['4륜 구동 차량', '전문 가이드', '숙박 3박', '전 일정 식사', '국립공원 입장료'],
        exclusions: ['개인 경비']
    },
    {
        id: 7,
        title: '알마티 시티 핵심 명소 & 콕토베 야경 워킹 투어',
        duration: '반나절',
        image: '/images/tour_city_1765784027581.png',
        description: '현지 가이드와 함께 알마티의 역사와 문화를 걸으며 느껴보세요. 숨겨진 로컬 맛집과 포토 스팟은 덤!',
        schedule: [
            { time: '14:00', title: '판필로프 공원 & 젠코프 성당', desc: '못을 하나도 쓰지 않고 지은 목조 건축물, 젠코프 성당의 아름다움에 빠져보세요.', image: '/images/zenkov_cathedral.png' },
            { time: '15:30', title: '그린 바자르 (재래시장)', desc: '현지인들의 삶이 녹아있는 시장! 신선한 과일과 견과류, 고려인 반찬 등을 시식하고 구경해요.', image: '/images/green_bazaar.png' },
            { time: '17:00', title: '콕토베 언덕 케이블카', desc: '알마티 시내가 한눈에 내려다보이는 콕토베 언덕으로 이동합니다.', image: '/images/kok_tobe.png' },
            { time: '18:30', title: '야경 감상 & 투어 종료', desc: '황홀한 알마티의 야경을 감상하며 낭만적인 마무리. 가이드님이 추천 맛집도 알려드려요!', image: '/images/almaty_night_view.png' }
        ],
        inclusions: ['한국어 가이드', '콕토베 케이블카 왕복 티켓'],
        exclusions: ['교통비(도보/택시 이용)', '개인 식음료']
    },
    {
        id: 8,
        title: '침블락 스키 리조트 & 메데우 빙상장 케이블카 투어',
        duration: '1일',
        image: '/images/tour_shymbulak.png',
        description: '3,200m 높이의 침블락 스키장! 여름엔 시원한 트레킹, 겨울엔 짜릿한 스키를 즐길 수 있는 최고의 휴양지입니다.',
        schedule: [
            { time: '10:00', title: '메데우 빙상장', desc: '세계에서 가장 높은 곳에 위치한 야외 빙상장. 웅장한 설산을 배경으로 인생샷!', image: '/images/medeu_rink.png' },
            { time: '11:00', title: '침블락 케이블카', desc: '3단계에 걸친 케이블카를 타고 해발 3,200m까지 올라갑니다. 발 아래 펼쳐지는 풍경이 예술이에요.', image: '/images/tour_shymbulak.png' },
            { time: '13:00', title: '정상에서의 점심', desc: '구름 위 카페에서 따뜻한 커피 한 잔과 식사. (자유식)', image: '/images/shymbulak_cafe.png' },
            { time: '15:00', title: '자유 시간 & 하산', desc: '주변을 산책하거나 눈썰매/스키 등 액티비티를 즐기고 내려옵니다.', image: '/images/tour_shymbulak.png' }
        ],
        inclusions: ['차량 및 기사', '가이드', '케이블카 왕복 티켓'],
        exclusions: ['점심 식사', '스키 장비 렌탈']
    },
    {
        id: 9,
        title: '유목민 전통 문화 체험: 훈스 에스노 빌리지 & 승마',
        duration: '1일',
        image: '/images/tour_ethno_village.png',
        description: '카자흐스탄 유목민들은 어떻게 살았을까? 전통 가옥 유르트 체험, 승마, 전통 공연까지! 가족 여행으로 강력 추천합니다.',
        schedule: [
            { time: '09:00', title: '에스노 빌리지로 이동', desc: '알마티 시내를 벗어나 전통 마을로 이동합니다.', image: '/images/tour_city_1765784027581.png' },
            { time: '11:00', title: '환영식 & 전통 관습 체험', desc: '전통 의상을 입은 분들의 환대와 맛있는 빵(바우트삭) 시식!', image: '/images/tour_ethno_village.png' },
            { time: '12:00', title: '기마 공연 관람', desc: '박진감 넘치는 유목민들의 말 타기 솜씨! 눈앞에서 펼쳐지는 기예에 입이 쩍 벌어질걸요?', image: '/images/horse_performance.png' },
            { time: '13:00', title: '전통식 점심', desc: '푸짐하게 차려진 카자흐스탄 전통 요리로 배를 채웁니다.', image: '/images/kazakh_lunch.png' },
            { time: '14:30', title: '승마 체험 & 활쏘기', desc: '직접 말을 타고 초원을 거닐어보고, 활쏘기도 배워보세요.', image: '/images/horse_riding_activity.png' },
            { time: '17:00', title: '알마티 복귀', desc: '특별한 추억을 안고 시내로 돌아옵니다.', image: '/images/tour_city_1765784027581.png' }
        ],
        inclusions: ['전용 차량', '가이드', '에스노 빌리지 프로그램 이용권', '점심 식사'],
        exclusions: ['개인 경비']
    },
]

export default function TourDetail() {
    const router = useRouter()
    const { id } = router.query

    // Find the tour regardless of string/number type match
    // Fallback to tour 1 or specific generic data if detailed data is missing for others
    const tour = tours.find(t => t.id == Number(id)) || tours[0]

    if (!tour) return null

    return (
        <>
            <Head>
                <title>{tour.title} | 트립소다 카자흐스탄</title>
            </Head>

            {/* Hero Image */}
            <div className="relative h-[60vh] bg-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80"
                    style={{ backgroundImage: `url('${tour.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <span className="bg-tripsoda-main text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">{tour.duration}</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{tour.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-tripsoda-textMain mb-6">투어 소개</h2>
                        <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-tripsoda-main pl-6 bg-gray-50 py-4 rounded-r-lg">
                            {tour.description}
                        </p>

                        {/* Highlights (Generic for now) */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['인생샷 보장', '편안한 이동', '전문 가이드', '알찬 일정'].map((tag, i) => (
                                <div key={i} className="bg-tripsoda-light/50 text-tripsoda-main text-center py-3 rounded-lg font-bold text-sm">
                                    #{tag}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Detailed Schedule */}
                    <section>
                        <h2 className="text-2xl font-bold text-tripsoda-textMain mb-8 border-b pb-4">상세 일정</h2>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                            {tour.schedule ? tour.schedule.map((item, index) => (
                                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Icon/Dot */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-tripsoda-main text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:static">
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow ml-14 md:ml-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-tripsoda-main text-sm bg-tripsoda-light px-2 py-1 rounded">{item.time}</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                                        {item.image && (
                                            <div className="rounded-xl overflow-hidden h-32 w-full mt-3">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 bg-gray-50 rounded-xl">일정 정보 업데이트 중입니다.</div>
                            )}
                        </div>
                        {/* Disclaimer */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-sm text-gray-500">
                            📢 위 일정은 예시입니다. 현지 기상 상황, 교통편, 그리고 맞춤 견적 내용에 따라 실제 일정은 유동적으로 변경될 수 있습니다.
                        </div>
                    </section>

                    {/* Inclusions / Exclusions */}
                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-6 rounded-2xl">
                            <h3 className="flex items-center font-bold text-blue-800 mb-4 text-lg">
                                <span className="mr-2">🙆‍♂️</span> 포함 사항
                            </h3>
                            <ul className="space-y-2">
                                {(tour.inclusions || ['차량', '가이드']).map((item, i) => (
                                    <li key={i} className="flex items-start text-blue-900 text-sm">
                                        <span className="mr-2 text-blue-500">✔</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 p-6 rounded-2xl">
                            <h3 className="flex items-center font-bold text-red-800 mb-4 text-lg">
                                <span className="mr-2">🙅‍♀️</span> 불포함 사항
                            </h3>
                            <ul className="space-y-2">
                                {(tour.exclusions || ['개인 경비']).map((item, i) => (
                                    <li key={i} className="flex items-start text-red-900 text-sm">
                                        <span className="mr-2 text-red-400">✖</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Sidebar Widget */}
                <div className="md:col-span-1">
                    <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-tripsoda-textMain mb-6">여행 상담 및 예약</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-gray-600">
                                <Clock size={20} className="mr-3 text-tripsoda-main" />
                                <span>소요 시간: {tour.duration}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPin size={20} className="mr-3 text-tripsoda-main" />
                                <span>출발지: 알마티 시내</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Calendar size={20} className="mr-3 text-tripsoda-main" />
                                <span>매일 출발 가능</span>
                            </div>
                        </div>

                        <Link href="/contact">
                            <a className="block w-full bg-tripsoda-main text-white text-center font-bold py-4 rounded-xl hover:bg-tripsoda-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mb-3">
                                견적 문의하기
                            </a>
                        </Link>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-[#FEE500] rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <a href="http://pf.kakao.com/_nSKuX/chat" target="_blank" rel="noreferrer" className="relative flex items-center justify-center w-full bg-[#FEE500] border-2 border-[#FEE500] text-black text-center font-bold py-4 rounded-xl hover:bg-yellow-300 hover:border-yellow-300 transition-all">
                                <span className="mr-2">💬</span> 카카오톡 바로 상담
                            </a>
                        </div>
                        <p className="text-xs text-gray-400 text-center mt-3">
                            평일/주말 09:00 - 18:00 (현지 시간 기준)
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
