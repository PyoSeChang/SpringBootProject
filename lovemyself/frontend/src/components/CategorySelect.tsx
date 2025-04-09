interface Props {
    value: string;
    onChange: (value: string) => void;
}

const categories = [
    "REVIEW",
    "EVENT",
    "AWARENESS",
    "PROJECT",
    "INSPIRATION",
    "INSIGHT",
    "FRAMEWORK",
    "STUDY",
];

export default function CategorySelect({ value, onChange }: Props) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>
                카테고리
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            >
                <option value="">-- 선택하세요 --</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
}
