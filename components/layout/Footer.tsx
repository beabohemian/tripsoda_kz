import Link from 'next/link'
import { Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-tripsoda-main mb-4">트립소다 카자흐스탄 LLP</h2>
                        <p className="max-w-xs text-tripsoda-textSub">
                            중앙아시아의 숨겨진 보석, 카자흐스탄을 여행하세요. 트립소다 카자흐스탄 LLP가 최고의 여행 파트너가 되어드릴게요.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-tripsoda-textMain mb-4">바로가기</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about">
                                    <a className="text-tripsoda-textSub hover:text-tripsoda-main transition-colors">회사 소개</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tours">
                                    <a className="text-tripsoda-textSub hover:text-tripsoda-main transition-colors">투어 소개</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tours/guides">
                                    <a className="text-tripsoda-textSub hover:text-tripsoda-main transition-colors">가이드 소개</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <a className="text-tripsoda-textSub hover:text-tripsoda-main transition-colors">문의하기</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-tripsoda-textMain mb-4">연락처</h3>
                        <ul className="space-y-3 text-tripsoda-textSub">
                            <li className="flex items-start space-x-2">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <a href="https://maps.app.goo.gl/4txAKpYxMunKXBQ39" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors">
                                    카자흐스탄 공화국, 알마티시, 알말리구, 나자르바예프 대로 65, 비즈니스 센터 건물 4층 401/5호, 우편번호 050004
                                </a>
                            </li>
                            <li className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Mail size={16} />
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Official Support</p>
                                </div>
                                <div className="flex flex-col space-y-1 pl-6">
                                    <a href="mailto:jinki@tripsoda.com" className="hover:text-tripsoda-main transition-colors text-sm">CEO: jinki@tripsoda.com</a>
                                    <a href="mailto:alua@tripsoda.com" className="hover:text-tripsoda-main transition-colors text-sm">Head Mgr: alua@tripsoda.com</a>
                                    <a href="mailto:zhibek@tripsoda.com" className="hover:text-tripsoda-main transition-colors text-sm">Mgr: zhibek@tripsoda.com</a>
                                </div>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={18} />
                                <div className="flex flex-col">
                                    <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors">+7 778 986 1833 (WhatsApp)</a>
                                    <p className="text-xs text-tripsoda-textSub">Kakao ID: tripsoda_kz</p>
                                </div>
                            </li>
                            <li className="flex space-x-4 mt-4 pt-2">
                                <a href="https://instagram.com/tripsoda_kz" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors" aria-label="Instagram"><Instagram size={24} /></a>
                                <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors" aria-label="WhatsApp"><MessageCircle size={24} /></a>
                                <a href="http://pf.kakao.com/_nSKuX/chat" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors text-[#FEE500] hover:text-[#F4DC00]" aria-label="KakaoTalk">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                                        <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.825 1.83 5.304 4.606 6.78l-1.196 4.39c-.11.405.346.732.68.513L11.332 19c.22.02.443.03.668.03 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 w-full h-64 rounded-lg overflow-hidden shadow-sm">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.417958474898!2d76.9452575!3d43.2636189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836fed6c0b42b5%3A0xab006b31d87515e4!2zVFJJUFNPREEgS0FaQUtIU1RBTiAo7Yq466a97IaM64ukIOy5tOyekO2dkOyKpO2DhCk!5e0!3m2!1sko!2skr!4v1777447858292!5m2!1sko!2skr"
                        title="Google Map Location"
                        loading="lazy"
                    ></iframe>
                </div>

                <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-tripsoda-textSub">
                    &copy; {new Date().getFullYear()} Tripsoda Kazakhstan. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
