// src/features/connection/ConnectionInput.tsx

import LabeledInput from "../../components/LabeledInput";

interface Props {
    index: number;
}

export default function ConnectionInput({ index }: Props) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h4>연결 #{index + 1}</h4>
            <LabeledInput label="From ID" name={`connections[${index}].fromId`} />
            <LabeledInput label="To ID" name={`connections[${index}].toId`} />
            <LabeledInput label="Type" name={`connections[${index}].type`} />
            <LabeledInput label="View" name={`connections[${index}].view`} />
        </div>
    );
}
