// layout/Nav.tsx

import Atag from "../components/ui/Atag";

export default function Nav() {
    return (
        <div className="w-full">
            {/* 위 구분선 */}
            <div className="w-full h-px bg-gray-300 relative z-50 mb-1" />
            <div className="w-[99%] h-px bg-gray-300 relative z-50 mx-auto mb-4" />

            {/* 네비게이션 */}
            <nav className="w-full px-4 py-3 font-ui  flex justify-evenly text-white font-ui_design_1 text-2xl">
                <Atag href="/find">Find Myself</Atag>
                <Atag href="/dream">Dream Myself</Atag>
                <Atag href="/bloom">Bloom Myself</Atag>
            </nav>

            {/* 아래 구분선 */}
            <div className="w-[99%] h-px bg-gray-300 relative z-50 mx-auto mt-4" />
            <div className="w-full h-px bg-gray-300 relative z-50 mt-1" />
        </div>

    );
}
