// 📁 src/components/DirectorySelector.tsx
import React from 'react';

interface DirectorySelectorProps {
    value: string | null;
    onChange: (newValue: string | null) => void;
    availableDirs: string[];
}

export default function DirectorySelector({ value, onChange, availableDirs }: DirectorySelectorProps) {
    return (
        <select
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value || null)}
            className="border rounded px-2 py-1"
        >
            <option value="">디렉토리 없음</option>
            {availableDirs.map(dir => (
                <option key={dir} value={dir}>{dir}</option>
            ))}
        </select>
    );
}