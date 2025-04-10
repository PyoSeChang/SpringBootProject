import React from "react";

interface LabelProps {
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}

export default function Label({ children, htmlFor, className = "" }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block mb-5 text-sm text-gray-300 font-ui ${className}`}
        >
            {children}
        </label>
    );
}
