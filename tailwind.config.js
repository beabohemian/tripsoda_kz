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
                    beige: '#E6FBF5', // Remap to light mint
                    brown: '#111827', // Remap to dark text
                    green: '#00D094', // Remap to main mint
                    lightGreen: '#60a5fa', // Keep or remove if unused
                }
            },
            fontFamily: {
                sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', '"Helvetica Neue"', '"Segoe UI"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', '"Malgun Gothic"', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
