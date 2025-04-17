// src/components/DirectoryEditOverlay.tsx
import React, { FC } from 'react';
import { useDirectoryEditor } from '../hooks/useDirectoryEditor';
import { DirectoryTreeView } from './DirectoryTreeView';
import { DirectoryEditForm } from './DirectoryEditForm';

interface DirectoryEditOverlayProps {
    onClose: () => void;
    initialCategories: string[];
}

const DirectoryEditOverlay: FC<DirectoryEditOverlayProps> = ({ onClose, initialCategories }) => {
    const {
        tree,
        form,
        selectedId,
        selectNode,
        handleChange,
        addNode,
        deleteNode,
        handleSave
    } = useDirectoryEditor('/find/view');

    return (
        <div className="fixed inset-0 bg-[#333333] bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-[#1f1f1f] rounded-lg shadow-lg p-6 w-[640px] h-[1100px] overflow-y-auto text-white">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">디렉토리 수정</h2>
                    <button
                        onClick={addNode}
                        className="px-3 py-1 rounded bg-[#5c6ac4] text-white hover:bg-[#4e5ab0] transition-colors"
                    >
                        + 새 디렉토리
                    </button>
                </div>

                {/* 트리 뷰 */}
                <div className="border border-gray-600 rounded p-2 mb-4 h-[520px] overflow-y-auto bg-[#2a2a2a]">
                    <DirectoryTreeView
                        tree={tree}
                        selectedId={selectedId}
                        onSelect={selectNode}
                        onDelete={deleteNode}
                    />
                </div>

                {/* 편집 폼 */}
                <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4 space-y-4">
                    <DirectoryEditForm
                        form={form}
                        tree={tree}
                        initialCategories={initialCategories}
                        onChange={handleChange}
                        onSave={handleSave}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </div>

    );
};

export default DirectoryEditOverlay;
