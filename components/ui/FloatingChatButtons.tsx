import { MessageCircle } from 'lucide-react'

export default function FloatingChatButtons() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* KakaoTalk Button */}
            <a
                href="http://pf.kakao.com/_nSKuX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Chat on KakaoTalk"
            >
                <div className="relative flex items-center justify-center w-16 h-16 bg-[#FEE500] rounded-full shadow-xl hover:bg-[#F4DC00] transition-all duration-300 hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#3A1D1D] relative z-10" fill="currentColor">
                        <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.825 1.83 5.304 4.606 6.78l-1.196 4.39c-.11.405.346.732.68.513L11.332 19c.22.02.443.03.668.03 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                    </svg>
                </div>
            </a>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/77789861833"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Chat on WhatsApp"
            >
                <div className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none"></span>
                    <MessageCircle size={32} color="white" fill="white" className="relative z-10" />
                </div>
            </a>
        </div>
    )
}
