import React from "react";
import Label from "./ui/Label";
import Input from "./ui/Input";

interface Props {
    label: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export default function LabeledInput({
                                         label,
                                         name,
                                         value,
                                         onChange,
                                         placeholder,
                                         className,
                                     }: Props) {
    return (
        <div className="mb-4">
            <Label htmlFor={name}>{label}</Label>
            <Input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-2 py-2 border border-gray-400 rounded font-handwriting bg-black text-white ${className || ""}`}
            />
        </div>
    );
}
