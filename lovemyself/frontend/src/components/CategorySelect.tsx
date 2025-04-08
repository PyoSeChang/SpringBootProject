// src/components/CategorySelect.tsx

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function CategorySelect({ value, onChange }: Props) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>카테고리</label>
            <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "0.5rem" }}>
                <option value="">선택하세요</option>
                <option value="Review">Review</option>
                <option value="Event">Event</option>
                <option value="Awareness">Awareness</option>
                <option value="Project">Project</option>
            </select>
        </div>
    );
}
