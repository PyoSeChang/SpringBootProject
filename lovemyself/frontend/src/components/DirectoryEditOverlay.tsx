// 파일: src/components/DirectoryEditOverlay.tsx
import React, { useState } from 'react';
import { saveDirectories } from '../api/directoryAPI';

interface DirectoryNode {
    id: number;
    name: string;
    parentId?: number;
    children?: DirectoryNode[];
    priority?: number;
    categories?: string[];
    depth?: number;
}

interface DirectoryEditOverlayProps {
    onClose: () => void;
    initialCategories: string[];
}

export default function DirectoryEditOverlay({ onClose, initialCategories }: DirectoryEditOverlayProps) {
    const [directoryTree, setDirectoryTree] = useState<DirectoryNode[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [order, setOrder] = useState('');
    const [parent, setParent] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    const categoryOptions = initialCategories;

    const flattenDirectories = (tree: DirectoryNode[]): { id: number; name: string; parentId?: number; priority?: number }[] => {
        const result: { id: number; name: string; parentId?: number; priority?: number }[] = [];
        const dfs = (node: DirectoryNode) => {
            result.push({ id: node.id, name: node.name, parentId: node.parentId, priority: node.priority });
            node.children?.forEach(dfs);
        };
        tree.forEach(dfs);
        return result;
    };

    const allDirectories = flattenDirectories(directoryTree);

    const buildTree = (flatList: DirectoryNode[]): DirectoryNode[] => {
        const map = new Map<number, DirectoryNode>();
        const roots: DirectoryNode[] = [];

        flatList.forEach((item) => map.set(item.id, { ...item, children: [] }));

        map.forEach((item) => {
            if (item.parentId !== undefined && map.has(item.parentId)) {
                const parent = map.get(item.parentId)!;
                item.depth = (parent.depth ?? 0) + 1;
                parent.children!.push(item);
                parent.children = parent.children!.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
            } else {
                item.depth = 0;
                roots.push(item);
            }
        });

        return roots;
    };

    const flattenTreeToCreateDTOs = (tree: DirectoryNode[]): any[] => {
        const result: any[] = [];
        const dfs = (node: DirectoryNode) => {
            result.push({
                tempId: node.id,
                name: node.name,
                priority: node.priority,
                parentId: node.parentId ?? undefined,
                categories: node.categories ?? [],
                depth: node.depth ?? 0
            });
            node.children?.forEach(dfs);
        };
        tree.forEach(dfs);
        return result;
    };

    const handleSelect = (node: DirectoryNode) => {
        setSelectedId(node.id);
        setName(node.name);
        setOrder(node.priority?.toString() || '');
        setParent(node.parentId?.toString() || '');
        setCategories(node.categories ?? []);
    };

    const updateNode = (nodes: DirectoryNode[]): DirectoryNode[] => {
        return nodes.map((node) => {
            const updatedChildren = node.children ? updateNode(node.children) : undefined;
            return node.id === selectedId
                ? {
                    ...node,
                    name,
                    priority: parseFloat(order) || undefined,
                    categories,
                    children: updatedChildren
                }
                : {
                    ...node,
                    children: updatedChildren
                };
        });
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
        setDirectoryTree(updateNode(directoryTree));
    };

    const handleOrderChange = (newOrder: string) => {
        setOrder(newOrder);
        setDirectoryTree(updateNode(directoryTree));
    };

    const handleAddDirectory = () => {
        const newDir: DirectoryNode = {
            id: Date.now(),
            name: `NewDirectory_${Date.now()}`,
            parentId: selectedId ?? undefined,
            categories: [...initialCategories]
        };

        const updatedFlat = [...flattenDirectories(directoryTree), newDir];
        const rebuiltTree = buildTree(updatedFlat);

        setDirectoryTree(rebuiltTree);
        setName(newDir.name);
        setSelectedId(newDir.id);
        setParent(newDir.parentId?.toString() || '');
        setOrder('');
        setCategories([...initialCategories]);
    };

    const handleDeleteDirectory = (targetId: number) => {
        const deleteRecursively = (nodes: DirectoryNode[]): DirectoryNode[] => {
            return nodes
                .filter((node) => node.id !== targetId)
                .map((node) => ({
                    ...node,
                    children: node.children ? deleteRecursively(node.children) : undefined
                }));
        };
        setDirectoryTree(deleteRecursively(directoryTree));
        if (selectedId === targetId) {
            setSelectedId(null);
            setName('');
        }
    };

    const handleSave = async () => {
        const created = flattenTreeToCreateDTOs(directoryTree);
        const payload = { created, updated: [], deleted: [] };

        // 보낼 DTO 로그 확인
        console.log("📦 전송할 payload", JSON.stringify(payload, null, 2));

        try {
            const response = await saveDirectories(payload);

            // ✅ 서버 응답 확인
            console.log("✅ 서버 응답:", response);

            alert('디렉토리가 성공적으로 저장되었습니다!');
            onClose();
        } catch (error: any) {
            // ⛔ 에러 객체 전체 출력
            console.error("❌ 에러 발생:", error);

            // ⛔ 서버에서 응답이 있었다면, 응답 내용 확인
            if (error.response) {
                console.error("🔴 서버 에러 응답:", error.response);
            }

            alert('저장에 실패했습니다.');
        }
    };

    const FolderTree = ({ node, level = 0 }: { node: DirectoryNode; level?: number }) => {
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div className="pl-2">
                <div
                    className={`cursor-pointer flex items-center gap-1 justify-between group px-2 py-1 rounded ${node.id === selectedId ? 'bg-gray-600' : ''}`}
                    style={{ paddingLeft: `${level * 16}px` }}
                    onClick={() => handleSelect(node)}
                >
                    <div className="flex items-center gap-1">
                        {hasChildren ? '📂' : '📁'}
                        <span>{node.id === selectedId ? name : node.name}</span>
                    </div>
                    <button
                        className="text-red-400 hover:text-red-600 text-sm hidden group-hover:inline"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDirectory(node.id);
                        }}
                    >
                        🗑️
                    </button>
                </div>
                {hasChildren && node.children!.map((child) => (
                    <FolderTree key={child.id} node={child} level={level + 1} />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="bg-[#2b2b2b] text-white rounded-lg shadow-lg p-6 w-[500px] h-[1000px] overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">디렉토리 수정</h2>
                    <button onClick={handleAddDirectory} className="text-sm bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded">
                        + 새 디렉토리
                    </button>
                </div>
                <div className="border border-gray-300 rounded p-3 mb-4 h-[420px] overflow-y-auto">
                    {directoryTree.map((dir) => (
                        <FolderTree key={dir.id} node={dir} />
                    ))}
                </div>
                <div className="space-y-4">
                    <InputField label="디렉토리 이름" value={name} onChange={handleNameChange} />
                    <div>
                        <label className="font-semibold block mb-1">부모 디렉토리</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                            value={parent}
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option value="">(최상위)</option>
                            {allDirectories.map((dir) => (
                                <option key={dir.id} value={dir.id.toString()}>{dir.name}</option>
                            ))}
                        </select>
                    </div>
                    <InputField label="디렉토리 우선순위" value={order} onChange={handleOrderChange} type="number" />
                    <div>
                        <label className="font-semibold block mb-2">전용 카테고리</label>
                        <div className="grid grid-cols-3 gap-3">
                            {categoryOptions.map((cat) => (
                                <label key={cat} className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={categories.includes(cat)}
                                        onChange={() => {
                                            setCategories(prev =>
                                                prev.includes(cat)
                                                    ? prev.filter((c) => c !== cat)
                                                    : [...prev, cat]
                                            );
                                        }}
                                        className="accent-black"
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded" onClick={onClose}>
                        취소
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded" onClick={handleSave}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, value, onChange, type = 'text' }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
}) {
    return (
        <div>
            <label className="font-semibold block mb-1">{label}</label>
            <input
                type={type}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
