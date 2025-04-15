/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // ✅ 소스 폴더
    ],
    theme: {
        extend: {
            fontFamily: {
                // 시스템 UI용 - 복명조 (BookkMyungjo-Bd)
                "ui_1": ['"BookkMyungjo-Bd"', "serif"],

                // 시스템 UI 디자인용
                'ui_design_1': ['"Parisienne"', 'cursive'],

                // 시스템 UI 디자인용 2
                'ui_design_2': ['"Tangerine"', 'cursive'],

                // 사용자 입력용 - 신라문화체 (Shilla_CultureB)
                "user_1": ['"Shilla_CultureB"', "cursive"],

                // 사용자 입력용 - kdg_Medium
                "user_2": ['"kdg_Medium"', "sans-serif"],

                // 사용자 입력용 - 마포꽃섬체
                "user_3": ['"MapoFlowerIsland"', "cursive"],


            },
        },
    },
    plugins: [
        require("daisyui"), // ✅ 추가!
    ],
};
