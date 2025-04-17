// src/components/DirectoryEditForm.tsx
import React, { FC } from 'react';
import { DirectoryNode, FormState } from '../hooks/useDirectoryEditor';

interface EditFormProps {
    form: FormState;
    tree: DirectoryNode[];
    initialCategories: string[];
    onChange: (key: keyof FormState, value: string | string[]) => void;
    onSave: () => void;
    onCancel: () => void;
}

export const DirectoryEditForm: FC<EditFormProps> = ({
                                                         form,
                                                         tree,
                                                         initialCategories,
                                                         onChange,
                                                         onSave,
                                                         onCancel
                                                     }) => (
    <div className="space-y-4">
        <div>
            <label className="block font-semibold mb-1 text-white">디렉토리 이름</label>
            <input
                type="text"
                value={form.name}
                onChange={e => onChange('name', e.target.value)}
                className="w-full bg-[#444] text-white placeholder-gray-300 border border-gray-600 rounded px-3 py-2"
            />
        </div>

        <div>
            <label className="block font-semibold mb-1 text-white">부모 디렉토리</label>
            <select
                value={form.parentId}
                onChange={e => onChange('parentId', e.target.value)}
                className="w-full bg-[#444] text-white border border-gray-600 rounded px-3 py-2"
            >
                <option value="">(최상위)</option>
                {tree.flatMap(n => [n]).map(dir => (
                    <option key={dir.tempId} value={dir.tempId}>{dir.name}</option>
                ))}
            </select>
        </div>

        <div>
            <label className="block font-semibold mb-1 text-white">우선순위</label>
            <input
                type="number"
                value={form.priority}
                onChange={e => onChange('priority', e.target.value)}
                className="w-full bg-[#444] text-white border border-gray-600 rounded px-3 py-2"
            />
        </div>

        <div>
            <label className="block font-semibold mb-1 text-white">전용 카테고리</label>
            <div className="grid grid-cols-3 gap-2 text-white">
                {initialCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={form.categories.includes(cat)}
                            onChange={() => onChange(
                                'categories',
                                form.categories.includes(cat)
                                    ? form.categories.filter(c => c !== cat)
                                    : [...form.categories, cat]
                            )}
                        /> {cat}
                    </label>
                ))}
            </div>
        </div>

        <div className="flex justify-end gap-2">
            <button onClick={onCancel} className="px-4 py-2 bg-[#555] hover:bg-[#444] text-white rounded transition-colors">취소</button>
            <button onClick={onSave} className="px-4 py-2 bg-[#5c6ac4] hover:bg-[#4e5ab0] text-white rounded transition-colors">저장</button>
        </div>
    </div>

);
