import React from "react";
import ConnectionInput from "./ConnectionInput";
import InlineContainer from "../../components/InlineContainer";

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
            <InlineContainer>
                {connections.map((conn, idx) => (
                    <div key={conn.id} className="w-[32%]">
                        <div className="mb-2 font-ui text-sm text-gray-300">Connection #{idx + 1}</div>
                        <ConnectionInput
                            data={conn}
                            onChange={(updated) => handleChange(idx, updated)}
                            onDelete={() => handleDelete(idx)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAdd} className="btn btn-outline btn-sm self-start">
                    + 연결 추가
                </button>
            </InlineContainer>
        </div>

    );
}
