import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href}>
                                <a
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-tripsoda-textMain hover:text-tripsoda-main hover:bg-tripsoda-light"
                                >
                                    {link.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
