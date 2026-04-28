import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/77789861833"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110">
                {/* Pulsing effect */}
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none"></span>

                <MessageCircle size={32} color="white" fill="white" className="relative z-10" />
            </div>
        </a>
    )
}
