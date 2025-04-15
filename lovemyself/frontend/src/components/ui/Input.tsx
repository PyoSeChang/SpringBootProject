import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...rest }: Props) {
    return (
        <input
            className={`w-full px-2 py-1 border border-gray-400 rounded text-yellow-300 font-user_3 bg-black  ${className}`}
            {...rest}
        />
    );
}
