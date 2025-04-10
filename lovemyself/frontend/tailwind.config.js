/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // ✅ 소스 폴더
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("daisyui"), // ✅ 추가!
    ],
};
