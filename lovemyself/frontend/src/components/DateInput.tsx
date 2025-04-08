// src/components/DateInput.tsx

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function DateInput({ label, value, onChange }: Props) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
            <input
                type="date"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{ width: "100%", padding: "0.5rem" }}
            />
        </div>
    );
}
