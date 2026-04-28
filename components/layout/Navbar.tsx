import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Portal from '../ui/Portal'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: '홈', href: '/' },
        { name: '회사 소개', href: '/about' },
        { name: '투어 소개', href: '/tours' },
        { name: '가이드 소개', href: '/tours/guides' },
        { name: '문의하기', href: '/contact' },
    ]

    return (
        <header 
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out flex justify-center ${
                scrolled ? 'pt-4 px-4' : 'pt-0 px-0'
            }`}
        >
            <div 
                className={`transition-all duration-500 ease-in-out flex items-center justify-between ${
                    scrolled 
                        ? 'w-full max-w-4xl bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full h-14 px-6 border border-white/40' 
                        : 'w-full bg-transparent h-20 px-4 sm:px-6 lg:px-8'
                }`}
            >
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                        <a className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="Tripsoda Kazakhstan"
                                className={`transition-all duration-500 ${scrolled ? 'h-6' : 'h-8 md:h-10 brightness-0 invert drop-shadow-md'} w-auto`}
                            />
                        </a>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href}>
                            <a className={`transition-colors font-bold hover:text-tripsoda-main ${scrolled ? 'text-sm text-gray-800' : 'text-white drop-shadow-md'}`}>
                                {link.name}
                            </a>
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 focus:outline-none transition-colors ${scrolled ? 'text-tripsoda-textMain hover:text-tripsoda-main' : 'text-white hover:text-tripsoda-light'}`}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
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
