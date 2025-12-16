import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Portal from '../ui/Portal'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: '홈', href: '/' },
        { name: '회사 소개', href: '/about' },
        { name: '투어 상품', href: '/tours' },
        { name: '문의하기', href: '/contact' },
    ]

    return (
        <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <a className="flex items-center">
                                <img
                                    src="/images/logo.png"
                                    alt="Tripsoda Kazakhstan"
                                    className="h-8 md:h-10 w-auto" // Responsive height
                                />
                            </a>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href}>
                                <a className="text-tripsoda-textMain hover:text-tripsoda-main transition-colors font-medium">
                                    {link.name}
                                </a>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-tripsoda-textMain hover:text-tripsoda-main p-2 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer - Rendered via Portal */}
            <Portal>
                {/* Container for Portal content - controls visibility */}
                <div className={`fixed inset-0 z-[9999] md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

                    {/* Backdrop overlay - Fades in/out */}
                    <div
                        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Drawer Content - Slides in from right */}
                    <div
                        className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl flex flex-col p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-900 focus:outline-none"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href}>
                                    <a
                                        onClick={() => setIsOpen(false)}
                                        className="text-xl font-medium text-gray-800 hover:text-tripsoda-main transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 border-t border-gray-100">
                            <p className="text-xs text-gray-400 text-center">
                                © 2025 Tripsoda Kazakhstan
                            </p>
                        </div>
                    </div>
                </div>
            </Portal>
        </header>
    )
}
