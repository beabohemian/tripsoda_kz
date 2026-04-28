/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                tripsoda: {
                    main: '#00D094', // Bright Mint (New Brand Color)
                    dark: '#009E70', // Darker Mint for hover
                    light: '#E6FBF5', // Very light mint for backgrounds
                    gray: '#f3f4f6', // Light gray for backgrounds
                    textMain: '#111827', // Dark gray/almost black for main text
                    textSub: '#6b7280', // Medium gray for sub text
                },
                nature: {
                    beige: '#E6FBF5',
                    brown: '#111827',
                    green: '#00D094',
                    lightGreen: '#60a5fa',
                }
            },
            fontFamily: {
                sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', '"Helvetica Neue"', '"Segoe UI"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', '"Malgun Gothic"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 10s infinite alternate',
                'aurora': 'aurora 15s linear infinite',
                'magnetic': 'magnetic 0.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                'scroll-x': 'scrollX 40s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                aurora: {
                    from: { backgroundPosition: '50% 50%, 50% 50%' },
                    to: { backgroundPosition: '350% 50%, 350% 50%' },
                },
                magnetic: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'var(--magnetic-transform)' },
                },
                scrollX: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
