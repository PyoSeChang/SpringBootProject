// 📁 src/pages/FindView.tsx
import React, { useState } from 'react';
import DirectoryTree from '../components/DirectoryTree';
import DirectorySelector from '../components/DirectorySelector';

export default function FindView() {
    const [viewMode, setViewMode] = useState<'directory' | 'category' | 'calendar'>('directory');

    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4 border-b">
                <button className="font-bold" onClick={() => setViewMode('directory')}>📁 디렉토리</button>
                <button className="font-bold" onClick={() => setViewMode('category')}>📂 카테고리</button>
                <button className="font-bold" onClick={() => setViewMode('calendar')}>🗓️ 캘린더</button>
            </div>

            {viewMode === 'directory' && <DirectoryTree />}
            {viewMode === 'category' && <div>카테고리별 뷰 준비 중...</div>}
            {viewMode === 'calendar' && <div>캘린더 뷰 준비 중...</div>}
        </div>
    );
}




