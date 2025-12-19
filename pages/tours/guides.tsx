import Head from 'next/head'
import Link from 'next/link'

interface Guide {
    id: string
    name: string
    role: string
    image: string
    languages: string[]
    bio: string
    specialties: string[]
    experience: string
    location?: string
    isPlaceholder?: boolean
}

const guides: Guide[] = [
    {
        id: 'g2',
        name: '노라 (Nora)',
        role: '전문 관광 가이드 / VIP 의전 & 투어',
        image: '/images/guides/nora.jpg',
        languages: ['한국어', '러시아어', '영어', '카자흐어'],
        bio: '한국 숭실대학교 유학 경험과 다양한 국제 행사 및 방송 촬영 통역 경력을 보유한 베테랑 가이드입니다. VIP 의전부터 트레킹, 방송 코디네이터까지 품격 있는 맞춤형 투어를 진행합니다.',
        specialties: ['VIP 의전/투어', '방송/미디어 코디네이터', '고려 역사 투어'],
        experience: '5년 이상',
        location: '카자흐스탄, 키르기스스탄',
    },
    {
        id: 'g3',
        name: '칭그스 (Chingis)',
        role: '전문 관광 가이드 / 아웃도어 & 산악',
        image: '/images/guides/chingis_young.png',
        languages: ['한국어', '러시아어', '카자흐어'],
        bio: '한국에서 10년 이상 거주하여 한국 문화에 대한 이해도가 매우 높습니다. 알마티의 숨겨진 대자연과 산악 지형을 누구보다 잘 아는 전문가로, 안전하고 짜릿한 아웃도어 경험을 선사합니다.',
        specialties: ['알마티 외곽 투어', '산악 트레킹', '방송 촬영 지원'],
        experience: '4년',
        location: '카자흐스탄',
        isPlaceholder: true
    },
    {
        id: 'g4',
        name: '숄판 (Sholpan)',
        role: '전문 관광 가이드 / 트레킹 전문',
        image: '/images/guides/sholpan_young.png',
        languages: ['한국어', '영어', '러시아어', '카자흐어'],
        bio: '공인 트레킹 가이드 자격증을 보유한 산악 전문 가이드입니다. 자연과 함께하는 여행을 사랑하며, 세심한 배려로 초보자도 즐길 수 있는 안전하고 편안한 트레킹을 안내합니다.',
        specialties: ['공인 트레킹 가이드', '초보자/가족 산행', '자연 생태 해설'],
        experience: '3년',
        location: '카자흐스탄',
        isPlaceholder: true
    },
    {
        id: 'g1',
        name: '아이볼 (Aibol)',
        role: '전문 관광 가이드 / 통역',
        image: '/images/guides/aibol.jpg',
        languages: ['한국어', '러시아어', '카자흐어'],
        bio: '대학에서 한국어를 전공하여 언어 소통이 매우 원활합니다. 한국 방송 촬영 통역 지원 경험이 다수 있으며, 젊은 감각으로 카자흐스탄의 핫플레이스와 문화를 생생하게 전달합니다.',
        specialties: ['전문 통역', '방송/촬영 지원', '시티 투어'],
        experience: '2년',
        location: '카자흐스탄',
    },
]

export default function GuidePage() {
    return (
        <>
            <Head>
                <title>가이드 소개 - Tripsoda Kazakhstan</title>
                <meta name="description" content="트립소다 카자흐스탄의 전문 가이드를 소개합니다. 검증된 현지 전문가와 함께 안전하고 즐거운 여행을 떠나보세요." />
            </Head>

            {/* Hero Section */}
            {/* Hero Section */}
            <div className="relative py-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/hero_bg_1765783966744.png')] bg-cover bg-center opacity-40"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        가이드 소개
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
                        현지의 매력을 가장 잘 아는 엄선된 가이드들이<br className="hidden sm:block" />
                        여러분의 여행을 더욱 특별하게 만들어 드립니다.
                    </p>
                </div>
            </div>

            {/* Intro Text Section */}
            <div className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        왜 트립소다 가이드인가요?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 rounded-2xl">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">엄격한 선발 기준</h3>
                            <p className="text-gray-600">
                                경력, 언어 능력, 자격증 검증, 서비스 마인드 등<br />
                                꼼꼼한 기준으로 선발된 검증된 가이드
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl">
                            <div className="text-4xl mb-4">💬</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">원활한 소통</h3>
                            <p className="text-gray-600">
                                한국어 또는 영어가 유창하여<br />
                                여행 중 의사소통 걱정 NO
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-2xl">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">깊이 있는 경험</h3>
                            <p className="text-gray-600">
                                단순 지식 전달이 아닌, 수년간의 현장 경험에서<br />
                                우러나오는 생생한 노하우를 전달합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Guides Grid */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                        <div className="space-y-16">
                            {guides.map((guide) => (
                                <div key={guide.id} className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    {/* Image Section */}
                                    <div className="w-full md:w-1/3 relative h-96 md:h-auto bg-gray-200 overflow-hidden group">
                                        {/* If duplicate image/placeholder issues arise, ensuring correct sizing here */}
                                        <img
                                            src={guide.image}
                                            alt={guide.name}
                                            className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${guide.isPlaceholder ? 'opacity-90' : ''}`}
                                            style={{ objectPosition: 'top center' }}
                                        />
                                        {/* "Coming Soon" overlay for placeholders */}
                                        {guide.isPlaceholder && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <span className="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-gray-700 shadow-lg ring-1 ring-gray-900/5">
                                                    프로필 사진 준비중
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900">{guide.name}</h3>
                                            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                                                <span className="inline-flex items-center rounded-full bg-tripsoda-50 px-3 py-1 text-sm font-medium text-tripsoda-main ring-1 ring-inset ring-tripsoda-main/20">
                                                    {guide.role}
                                                </span>
                                                {guide.location && (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                                                        📍 {guide.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-6 space-y-2">
                                            <p className="text-gray-500 text-sm">
                                                <span className="font-semibold text-gray-700 mr-2">언어:</span>
                                                {guide.languages.join(', ')}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                <span className="font-semibold text-gray-700 mr-2">경력:</span>
                                                {guide.experience}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                <span className="font-semibold text-gray-700 mr-2">전문 분야:</span>
                                                {guide.specialties.join(', ')}
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute top-0 left-0 -translate-x-2 -translate-y-2 text-4xl text-gray-200 font-serif">"</div>
                                            <p className="text-gray-600 leading-relaxed italic relative z-10 pl-6 border-l-4 border-gray-100 py-1">
                                                {guide.bio}
                                            </p>
                                        </div>


                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center p-8 bg-gray-100 rounded-2xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                이 외에도 다수의 전문 가이드가 함께하고 있습니다.
                            </h3>
                            <p className="text-gray-600">
                                트립소다는 엄격한 기준을 통과하고 <span className="font-semibold text-tripsoda-main">가이드 자격증을 소지한 전문가</span>만이<br className="hidden sm:block" />
                                투어의 메인 가이드로 배정되어 여행을 이끌어 나갑니다.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
