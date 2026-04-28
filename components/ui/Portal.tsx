import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
    selector?: string
}

export default function Portal({ children, selector = "#portal-root" }: PortalProps) {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.body
        setMounted(true)
    }, [])

    return (mounted && ref.current) ? createPortal(children, ref.current) : null
}
