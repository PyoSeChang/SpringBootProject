// src/features/connection/ConnectionInputList.tsx

import { useState } from "react";
import ConnectionInput from "./ConnectionInput";

export default function ConnectionInputList() {
    const [connections, setConnections] = useState([{ id: Date.now() }]);

    const addConnection = () => {
        setConnections([...connections, { id: Date.now() }]);
    };

    return (
        <div>
            <h3>연결 정보</h3>
            {connections.map((conn, index) => (
                <ConnectionInput key={conn.id} index={index} />
            ))}
            <button type="button" onClick={addConnection}>연결 추가</button>
        </div>
    );
}
