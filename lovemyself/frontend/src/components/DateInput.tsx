import React, { useState, useEffect } from "react";

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
    // 초기 상태를 부모의 value 또는 오늘 날짜로 설정
    const [selectedDate, setSelectedDate] = useState(value || getToday());

    // 부모의 value가 변경되면 내부 상태를 동기화함
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
        <div style={{ marginBottom: "1rem" }}>
            <label
                style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                }}
            >
                {label}
            </label>
            <input
                type="date"
                value={selectedDate}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />
        </div>
    );
}
