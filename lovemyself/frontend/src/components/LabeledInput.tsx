import React from "react";

interface Props {
    label: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function LabeledInput({
                                         label,
                                         name,
                                         value,
                                         onChange,
                                         placeholder,
                                     }: Props) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label
                style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    fontFamily: "var(--font-ui)", // ✅ 시스템 폰트
                }}
            >
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "var(--font-handwriting)", // ✅ 사용자 입력용 폰트
                }}
            />
        </div>

    );
}
