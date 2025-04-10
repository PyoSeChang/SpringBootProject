import React, { useState, useEffect } from "react";
import Label from "./ui/Label";
import Input from "./ui/Input";

interface Props {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
}

const getToday = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
};

export default function DateInput({ label, value, onChange }: Props) {
    const [selectedDate, setSelectedDate] = useState(value || getToday());

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <div className="mb-4">
            <Label htmlFor={label}>{label}</Label>
            <Input
                id={label}
                type="date"
                value={selectedDate}
                onChange={handleChange}
                className="w-full px-2 py-2 border border-gray-400 rounded font-handwriting bg-black text-white"
            />
        </div>
    );
}
