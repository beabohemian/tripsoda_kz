import Head from 'next/head'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

export default function Tours() {
    const tours = [
        { id: 1, title: '투르겐 폭포 + 아씨 고원 투어', duration: '1일', image: '/images/tour_assy.png' },
        { id: 2, title: '콜사이 + 차른 캐니언 + 카인디 1일 투어', duration: '1일', image: '/images/tour_charyn_1765783988719.png' },
        { id: 3, title: '알틴 에멜 국립공원 투어', duration: '1일 (또는 1박 2일)', image: '/images/tour_singing_dune.png' },
        { id: 4, title: '빅 알마티 호수 (BAO) 투어', duration: '반나절', image: '/images/tour_bao.png' },
        { id: 5, title: '노마드 에스닉 마을 투어', duration: '1일', image: '/images/tour_ethno_village.png' },
        { id: 6, title: '알마티 시티 투어', duration: '반나절', image: '/images/tour_city_1765784027581.png' },
        { id: 7, title: '카자흐 에스닉 스타일 스냅 촬영', duration: '약 1시간', image: '/images/tour_kazakh_snap.png' },
    ]

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
        >
            <Head>
                <title>투명한 현지 투어 | 트립소다 카자흐스탄</title>
            </Head>

            {/* Hero Section */}
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
                        거품 없는 현지 투어
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
                    >
                        중간 유통 마진 없이 카자흐스탄 현지 법인이 직접 기획하고 운영합니다.<br />
                        자유여행자를 위한 가장 합리적이고 투명한 여정을 만나보세요.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                {/* Tour Grid */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                >
                    {tours.map((tour) => (
                        <motion.div 
                            key={tour.id} 
                            variants={fadeInUp}
                            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100 flex flex-col"
                        >
                            <div className="h-72 overflow-hidden relative flex-shrink-0 bg-gray-100">
                                <img
                                    src={tour.image}
                                    alt={tour.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-tripsoda-main shadow-lg">
                                    {tour.duration}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow relative bg-white">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex-grow leading-snug group-hover:text-tripsoda-main transition-colors duration-300">
                                    {tour.title}
                                </h3>
                                <div className="mt-auto grid grid-cols-2 gap-4">
                                    <Link href={`/tours/${tour.id}`}>
                                        <a className="block w-full text-center border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl hover:border-tripsoda-main hover:text-tripsoda-main hover:bg-tripsoda-main/5 transition-all">
                                            자세히 보기
                                        </a>
                                    </Link>
                                    <a href="http://pf.kakao.com/_nSKuX/chat" target="_blank" rel="noreferrer" className="block w-full text-center bg-[#FEE500] border-2 border-[#FEE500] text-black font-bold py-3.5 rounded-2xl hover:bg-[#f4dc00] hover:border-[#f4dc00] transition-all shadow-sm">
                                        최저가 카톡 문의
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Custom Inquiry CTA (Backpacker Style) */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mt-20 md:mt-32 bg-tripsoda-main/5 rounded-[3rem] p-10 md:p-16 text-center border border-tripsoda-main/20 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-tripsoda-main opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
                    <div className="text-4xl mb-6 animate-bounce">🤔</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">원하는 일정이 없으신가요?</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        배낭여행객의 가벼운 주머니 사정부터 알찬 일정까지!<br className="hidden md:block" />
                        트립소다 현지 법인이 중간 마진 없이 <strong>가장 합리적인 맞춤 견적</strong>을 설계해 드립니다.<br/>
                        언제든 카카오톡으로 편하게 찔러봐 주세요!
                    </p>
                    <div className="relative inline-block group/btn">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-[#FEE500] rounded-2xl blur opacity-25 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200"></div>
                        <a href="http://pf.kakao.com/_nSKuX/chat" target="_blank" rel="noreferrer" className="relative inline-block bg-[#FEE500] text-black text-lg font-bold px-12 py-5 rounded-2xl hover:bg-[#f4dc00] transition-all shadow-md transform hover:-translate-y-1">
                            ⚡ 1분 만에 내 맞춤 일정 견적받기
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
