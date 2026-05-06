import Head from 'next/head'
import { Mail, MessageCircle, MapPin, Phone, ExternalLink, MessageSquare, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
    return (
        <>
            <Head>
                <title>문의하기 | 트립소다 카자흐스탄</title>
                <meta name="description" content="카자흐스탄 여행의 모든 것, 트립소다에 직접 문의하세요. 카카오톡, 와츠앱, 이메일로 가장 빠른 상담이 가능합니다." />
            </Head>

            <div className="bg-white min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 bg-gray-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <img 
                            src="/images/tour_charyn_1765783988719.png" 
                            alt="Background" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-tripsoda-main font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                        >
                            Get in Touch
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
                        >
                            당신의 여정을 시작하세요
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
                        >
                            카자흐스탄 현지 전문가들이 가장 빠르고 정확하게 답변해 드립니다.<br/>
                            선호하시는 메신저로 지금 바로 상담을 시작하세요.
                        </motion.p>
                    </div>
                </section>

                {/* Contact Methods Grid */}
                <section className="py-24 -mt-16 relative z-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            
                            {/* KakaoTalk Card */}
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 bg-[#FEE500] rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <MessageSquare size={36} fill="#3C1E1E" className="text-[#3C1E1E]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">카카오톡 상담</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    가장 친숙하고 빠른 상담 방법입니다.<br/>
                                    한국인 매니저가 직접 답변해 드립니다.
                                </p>
                                <a 
                                    href="http://pf.kakao.com/_nSKuX/chat" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full py-4 bg-[#FEE500] text-[#3C1E1E] rounded-2xl font-bold hover:bg-[#EBD200] transition-colors flex items-center justify-center gap-2"
                                >
                                    카톡 채팅하기 <ExternalLink size={18} />
                                </a>
                            </motion.div>

                            {/* WhatsApp Card */}
                            <motion.div 
                                whileHover={{ y: -10 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 bg-[#25D366] rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <MessageCircle size={36} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    글로벌 메신저 와츠앱을 통해<br/>
                                    현지 운영팀과 실시간 소통이 가능합니다.
                                </p>
                                <a 
                                    href="https://wa.me/77789861833" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                                >
                                    WhatsApp 메시지 <ExternalLink size={18} />
                                </a>
                            </motion.div>

                            {/* Email Card */}
                            <motion.div 
                                whileHover={{ y: -10 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <Mail size={36} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Inquiry</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    공식적인 견적 요청이나 협업 문의는<br/>
                                    이메일을 통해 상세히 남겨주세요.
                                </p>
                                <a 
                                    href="mailto:jinki@tripsoda.com" 
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                                >
                                    이메일 보내기 <Send size={18} />
                                </a>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* Company Details Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-gray-900">현지 법인 정보</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-tripsoda-main">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Office Location</p>
                                            <p className="text-lg text-gray-700 font-medium leading-relaxed">
                                                알마티 나자르바예프 대로 65,<br/>
                                                비즈니스 센터 건물 4층 401/5호
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-tripsoda-main">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Local Number</p>
                                            <p className="text-lg text-gray-700 font-medium">+7 778 986 1833</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-tripsoda-main/5 rounded-3xl border border-tripsoda-main/10">
                                    <p className="text-tripsoda-main font-bold mb-2">운영 시간 (알마티 기준)</p>
                                    <p className="text-gray-600">월~금: 09:00 - 18:00 | 토/일: 휴무 (투어 진행 시 상담 가능)</p>
                                </div>
                            </div>

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
                                {/* Using a placeholder map image or just a nice local photo */}
                                <img 
                                    src="/images/tour_charyn_1765783988719.png" 
                                    alt="Office" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-tripsoda-main/10 mix-blend-multiply"></div>
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20">
                                    <p className="font-bold text-gray-900 mb-1 italic">"우리는 당신의 안전한 여행을 위해 알마티 현지에서 항상 대기하고 있습니다."</p>
                                    <p className="text-sm text-gray-500">- Tripsoda Almaty Team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
