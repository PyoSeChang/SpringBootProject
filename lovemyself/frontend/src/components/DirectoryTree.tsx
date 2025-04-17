import React, { useEffect, useState, FC } from 'react';
import { Pencil } from 'lucide-react';
import DirectoryEditOverlay from './DirectoryEditOverlay';

export interface DirectoryNode {
    id: number;
    name: string;
    depth: number;
    parentId?: number;
    priority?: number;
}

const DirectoryTree: FC = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [directories, setDirectories] = useState<DirectoryNode[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/find/view');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: DirectoryNode[] = await response.json();
                setDirectories(data);
            } catch (error) {
                console.error('디렉토리 데이터를 불러오는 데 실패했습니다.', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="relative w-[300px] h-[1000px] overflow-auto border border-gray-400 rounded-lg p-4">
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                title="디렉토리 수정"
                onClick={() => setShowOverlay(true)}
            >
                <Pencil size={16} />
            </button>

            <div className="space-y-1">
                {directories.map(dir => (
                    <div
                        key={dir.id}
                        className="flex items-center gap-1"
                        style={{ paddingLeft: `${dir.depth * 16}px` }}
                    >
                        📁
                        <span>{dir.name}</span>
                    </div>
                ))}
            </div>

            {showOverlay && (
                <DirectoryEditOverlay
                    onClose={() => setShowOverlay(false)}
                    initialCategories={[
                        'REVIEW', 'EVENT', 'AWARENESS', 'PROJECT',
                        'INSPIRATION', 'INSIGHT', 'STUDY', 'FRAMEWORK', 'MODEL'
                    ]}
                />
            )}
        </div>
    );
};

export default DirectoryTree;
