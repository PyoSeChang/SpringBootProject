import React from "react";

interface Props {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
}

// 오늘 날짜 구하는 함수
const getToday = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // "YYYY-MM-DD" 형식
};

export default function DateInput({ label, value, onChange }: Props) {
    const displayValue = value ?? getToday(); // value가 없으면 오늘 날짜 사용

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
                value={displayValue}
                onChange={(e) => onChange?.(e.target.value)}
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
