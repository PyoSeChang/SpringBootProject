// src/components/DirectoryTreeView.tsx
import React, { FC } from 'react';
import { DirectoryNode } from '../hooks/useDirectoryEditor';

interface TreeViewProps {
    tree: DirectoryNode[];
    selectedId: number | null;
    onSelect: (node: DirectoryNode) => void;
    onDelete: (id: number) => void;
}

export const DirectoryTreeView: FC<TreeViewProps> = ({ tree, selectedId, onSelect, onDelete }) => {
    const RenderNode: FC<{ node: DirectoryNode; level: number }> = ({ node, level }) => (
        <>
            <div
                style={{ paddingLeft: (node.depth ?? level) * 16 }}
                className={`flex justify-between items-center group px-2 py-1 cursor-pointer 
        ${selectedId === node.tempId ? 'bg-gray-700' : 'hover:bg-gray-600'}`}
                onClick={() => onSelect(node)}
            >
                <span>{node.children && node.children.length > 0 ? '📂' : '📁'} {node.name}</span>
                <button
                    onClick={e => { e.stopPropagation(); onDelete(node.tempId); }}
                    className="invisible group-hover:visible text-red-500"
                >🗑️</button>
            </div>
            {node.children && node.children.map(child => (
                <RenderNode key={child.tempId} node={child} level={(node.depth ?? level) + 1} />
            ))}
        </>
    );

    return <div>{tree.map(node => <RenderNode key={node.tempId} node={node} level={0} />)}</div>;
};