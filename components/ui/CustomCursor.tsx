import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e: MouseEvent) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        };

        const addHoverClass = () => cursor.classList.add('hover');
        const removeHoverClass = () => cursor.classList.remove('hover');

        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .magnetic-wrap');
        
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', addHoverClass);
            el.addEventListener('mouseleave', removeHoverClass);
        });

        window.addEventListener('mousemove', onMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', addHoverClass);
                el.removeEventListener('mouseleave', removeHoverClass);
            });
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor hidden md:block"></div>;
}
