// src/hooks/useDirectoryEditor.ts
import { useState, useEffect, useRef } from 'react';
import { saveDirectories } from '../api/directoryAPI';

export interface DirectoryNode {
    tempId: number;
    id?: number;
    name: string;
    parentId?: number;
    priority?: number;
    categories?: string[];
    depth?: number;
    children?: DirectoryNode[];
}

export interface FormState {
    name: string;
    priority: string;
    parentId: string;
    categories: string[];
}

// ✅ tempIdCounter 및 generateTempId 함수 추가
let tempIdCounter = -1;
const generateTempId = (): number => {
    return tempIdCounter--; // 무조건 음수 ID
};

export function useDirectoryEditor(apiUrl: string) {
    const [tree, setTree] = useState<DirectoryNode[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [form, setForm] = useState<FormState>({ name: '', priority: '', parentId: '', categories: [] });

    // 초기 데이터 로드
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) throw new Error(`Load failed: ${res.status}`);
                const data = (await res.json()) as DirectoryNode[];
                const initial = data.map(item => ({ ...item, tempId: item.id!, children: [] }));
                setTree(buildTree(initial));
            } catch (err) {
                console.error('Directory load error:', err);
            }
        })();
    }, [apiUrl]);

    function buildTree(flat: DirectoryNode[]): DirectoryNode[] {
        const map = new Map<number, DirectoryNode>();
        flat.forEach(n => map.set(n.tempId, { ...n, children: [] }));
        const roots: DirectoryNode[] = [];
        map.forEach(node => {
            if (node.parentId != null && map.has(node.parentId)) {
                map.get(node.parentId)!.children!.push(node);
            } else {
                roots.push(node);
            }
        });
        return assignDepth(roots, 0);
    }
    function assignDepth(nodes: DirectoryNode[], level: number): DirectoryNode[] {
        return nodes.map(n => ({
            ...n,
            depth: level,
            children: n.children ? assignDepth(n.children, level + 1) : []
        }));
    }

    function flatten(nodes: DirectoryNode[]): DirectoryNode[] {
        return nodes.reduce((acc, n) => acc.concat(n, flatten(n.children || [])), [] as DirectoryNode[]);
    }

    function selectNode(node: DirectoryNode) {
        setSelectedId(node.tempId);
        setForm({
            name: node.name,
            priority: node.priority?.toString() || '',
            parentId: node.parentId?.toString() || '',
            categories: node.categories || []
        });
    }

    function handleChange(key: keyof FormState, value: string | string[]) {
        setForm(prev => ({ ...prev, [key]: value }));
        if (selectedId != null) setTree(prev => updateTree(prev));
    }
    function updateTree(nodes: DirectoryNode[]): DirectoryNode[] {
        return nodes.map(node => {
            const children = node.children ? updateTree(node.children) : [];
            if (node.tempId === selectedId) {
                return {
                    ...node,
                    name: form.name,
                    priority: form.priority ? parseFloat(form.priority) : undefined,
                    parentId: form.parentId ? parseInt(form.parentId) : undefined,
                    categories: form.categories,
                    children
                };
            }
            return { ...node, children };
        });
    }

    function addNode() {
        const newNode: DirectoryNode = {
            tempId: generateTempId(), // ✅ 여기서 tempId 음수 생성
            name: '새 디렉토리',
            parentId: selectedId ?? undefined,
            children: []
        };
        const updatedFlat = flatten(tree).concat(newNode);
        setTree(buildTree(updatedFlat));
        setSelectedId(newNode.tempId);
        setForm({
            name: newNode.name,
            priority: '',
            parentId: newNode.parentId?.toString() || '',
            categories: []
        });
    }

    function deleteNode(id: number) {
        const removeRec = (nodes: DirectoryNode[]): DirectoryNode[] =>
            nodes.filter(n => n.tempId !== id).map(n => ({ ...n, children: removeRec(n.children || []) }));
        setTree(removeRec(tree));
        if (selectedId === id) {
            setSelectedId(null);
            setForm({ name: '', priority: '', parentId: '', categories: [] });
        }
    }

    async function handleSave() {
        const flatNodes = flatten(tree);
        const created = flatNodes.filter(n => n.id == null).map(n => ({
            tempId: n.tempId, name: n.name, priority: n.priority,
            parentId: n.parentId, categories: n.categories, depth: n.depth
        }));
        const updated = flatNodes.filter(n => n.id != null).map(n => ({
            id: n.id!, tempId: n.tempId, name: n.name, priority: n.priority,
            parentId: n.parentId, categories: n.categories, depth: n.depth
        }));
        const payload = { created, updated, deleted: [] };
        console.log('Save payload:', payload);
        try {
            await saveDirectories(payload);
            alert('저장 성공');
        } catch (err) {
            console.error('Save error:', err);
            alert('저장 실패');
        }
    }

    return { tree, form, selectedId, selectNode, handleChange, addNode, deleteNode, handleSave };
}