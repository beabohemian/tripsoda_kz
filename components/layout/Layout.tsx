import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingChatButtons from '../ui/FloatingChatButtons'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
            <FloatingChatButtons />
        </div>
    )
}
