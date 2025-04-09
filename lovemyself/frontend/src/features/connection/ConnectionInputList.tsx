import React from "react";
import ConnectionInput from "./ConnectionInput";

export interface ConnectionData {
    id: number;
    toId: string;
    toCategory: string;
    viewName: string;
    connectionTypeName: string;
    usableCategory: string;
    isDirectional: boolean;
    typeDescription: string;
}

interface Props {
    connections: ConnectionData[];
    setConnections: (conns: ConnectionData[]) => void;
}

export default function ConnectionInputList({ connections, setConnections }: Props) {
    const handleChange = (index: number, updated: ConnectionData) => {
        const copy = [...connections];
        copy[index] = updated;
        setConnections(copy);
    };

    const handleDelete = (index: number) => {
        const copy = [...connections];
        copy.splice(index, 1);
        setConnections(copy);
    };

    const handleAdd = () => {
        setConnections([
            ...connections,
            {
                id: Date.now(),
                toId: "",
                toCategory: "",
                viewName: "",
                connectionTypeName: "",
                usableCategory: "",
                isDirectional: false, // ✅ 기본값 false
                typeDescription: "",
            },
        ]);
    };

    return (
        <div>
            <h3 style={{ fontFamily: "var(--font-ui)" }}>Connection</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {connections.map((conn, idx) => (
                    <li key={conn.id}>
                        <ConnectionInput
                            data={conn}
                            onChange={(updated) => handleChange(idx, updated)}
                            onDelete={() => handleDelete(idx)}
                        />
                    </li>
                ))}
            </ul>
            <button type="button" onClick={handleAdd}>+ 연결 추가</button>
        </div>
    );
}
