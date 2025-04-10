import React from "react";

interface InlineContainerProps {
    children: React.ReactNode;
    className?: string; // ✅ 여기를 추가!
}

export default function InlineContainer({ children, className = "" }: InlineContainerProps) {
    return (
        <div className="w-[80%] mx-auto px-4 flex flex-wrap gap-4">
            {children}
        </div>
    );
}
