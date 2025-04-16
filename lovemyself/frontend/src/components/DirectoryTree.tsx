// 📁 src/components/DirectoryTree.tsx
import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import DirectoryEditOverlay from "./DirectoryEditOverlay";

interface FileNode {
    filename: string;
    location: number; // 디렉토리 id
}

interface DirectoryNode {
    id: number;
    name: string;
    parentId?: number;
    priority?: number;
    depth: number;
    children?: DirectoryNode[];
    files?: FileNode[];
}

function buildTreeFromFlatList(directories: DirectoryNode[], files: FileNode[]): DirectoryNode[] {
    const dirMap = new Map<number, DirectoryNode>();
    const roots: DirectoryNode[] = [];

    directories.forEach(dir => {
        dir.children = [];
        dir.files = [];
        dirMap.set(dir.id, dir);
    });

    files.forEach(file => {
        const parentDir = dirMap.get(file.location);
        if (parentDir) {
            parentDir.files!.push(file);
        }
    });

    directories.forEach(dir => {
        if (dir.parentId === undefined || dir.parentId === null) {
            roots.push(dir);
        } else {
            const parent = dirMap.get(dir.parentId);
            if (parent) {
                parent.children!.push(dir);
            }
        }
    });

    const sortChildren = (nodes: DirectoryNode[]) => {
        nodes.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
        nodes.forEach(node => {
            if (node.children) sortChildren(node.children);
        });
    };

    sortChildren(roots);
    return roots;
}

function DirectoryItem({ node, level = 0 }: { node: DirectoryNode; level?: number }) {
    const [open, setOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const hasFiles = node.files && node.files.length > 0;

    return (
        <div className="pl-2">
            <div
                className="cursor-pointer flex items-center gap-1"
                style={{ paddingLeft: `${level * 16}px` }}
                onClick={() => setOpen(!open)}
            >
                {hasChildren || hasFiles ? (open ? '📂' : '📁') : '📄'}
                <span>{node.name}</span>
            </div>
            {open && (
                <div>
                    {hasFiles && node.files!.map((file, idx) => (
                        <div key={idx} style={{ paddingLeft: `${(level + 1) * 16}px` }}>📄 {file.filename}</div>
                    ))}
                    {hasChildren && node.children!.map((child) => (
                        <DirectoryItem key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DirectoryTree() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [directoryTree, setDirectoryTree] = useState<DirectoryNode[]>([]);

    useEffect(() => {
        // TODO: 백엔드 API에서 디렉토리와 파일 리스트 받아오기
        const directories: DirectoryNode[] = [];
        const files: FileNode[] = [];

        const builtTree = buildTreeFromFlatList(directories, files);
        setDirectoryTree(builtTree);
    }, []);

    return (
        <div className="relative w-[300px] h-[1000px] overflow-x-auto overflow-y-auto border border-gray-400 rounded-lg p-4">
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                title="디렉토리 수정"
                onClick={() => setShowOverlay(true)}
            >
                <Pencil size={16} />
            </button>

            <div className="w-fit min-w-full">
                {directoryTree.map((dir) => (
                    <DirectoryItem key={dir.id} node={dir} level={0} />
                ))}
            </div>

            {showOverlay && (
                <DirectoryEditOverlay
                    onClose={() => setShowOverlay(false)}
                    initialCategories={['REVIEW', 'EVENT', 'AWARENESS', 'PROJECT', 'INSPIRATION', 'INSIGHT', 'SCHEMA', 'FRAMEWORK', 'MODEL']}
                />
            )}
        </div>
    );
}