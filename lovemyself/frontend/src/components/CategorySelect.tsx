import Label from "./ui/Label";

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
        <div className="mb-4">
            <Label htmlFor="category">카테고리</Label>
            <select
                id="category"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-2 py-2 border border-gray-400 rounded font-handwriting bg-black text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
