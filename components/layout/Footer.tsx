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
                                <span>카자흐스탄 공화국, 알마티시, 알말리구, 나자르바예프 대로 65, 사무실 405/1, 우편번호 050004</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail size={18} />
                                <a href="mailto:jinki@tripsoda.com" className="hover:text-tripsoda-main transition-colors">jinki@tripsoda.com</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={18} />
                                <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors">+7 778 986 1833 (WhatsApp)</a>
                            </li>
                            <li className="flex space-x-4 mt-4 pt-2">
                                <a href="https://instagram.com/tripsoda_kz" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors"><Instagram size={24} /></a>
                                <a href="https://wa.me/77789861833" target="_blank" rel="noreferrer" className="hover:text-tripsoda-main transition-colors"><MessageCircle size={24} /></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-tripsoda-textSub">
                    &copy; {new Date().getFullYear()} Tripsoda Kazakhstan. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
