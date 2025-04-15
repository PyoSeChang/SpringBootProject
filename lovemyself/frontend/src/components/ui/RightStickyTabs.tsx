// 📁 src/components/ui/RightStickyTabs.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface Tab {
    id: string;
    label: string;
    color: string;
    path: string;
}

interface RightStickyTabsProps {
    tabs: Tab[];
}

export default function RightStickyTabs({ tabs }: RightStickyTabsProps) {
    const navigate = useNavigate();

    return (
        <div className="fixed top-40 right-0 z-50 flex flex-col gap-2 pr-[2px]">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    className="text-white font-bold tracking-wide transition transform hover:translate-x-[-4px]"
                    style={{
                        backgroundColor: tab.color,
                        width: "40px",
                        height: "80px",
                        clipPath: "polygon(0% 0%, 100% 10%, 100% 90%, 0% 100%)",
                        writingMode: "vertical-rl",
                        textOrientation: "upright",
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
