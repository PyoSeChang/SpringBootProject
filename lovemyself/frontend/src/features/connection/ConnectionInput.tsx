import React from "react";
import CategorySelect from "../../components/CategorySelect";
import LabeledInput from "../../components/LabeledInput";
import { ConnectionData } from "./ConnectionInputList";

interface Props {
    data: ConnectionData;
    onChange: (updated: ConnectionData) => void;
    onDelete: () => void;
}

export default function ConnectionInput({ data, onChange, onDelete }: Props) {
    const handleChange = (field: keyof ConnectionData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div style={{ border: "1px solid #888", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
    <LabeledInput
        label="toId"
    value={data.toId}
    onChange={(e) => handleChange("toId", e.target.value)}
    />
    <label style={{ fontFamily: "var(--font-ui)", fontWeight: "bold" }}>toCategory</label>
    <CategorySelect value={data.toCategory} onChange={(v) => handleChange("toCategory", v)} />

    <LabeledInput
    label="viewName"
    value={data.viewName}
    onChange={(e) => handleChange("viewName", e.target.value)}
    />
    <LabeledInput
    label="connectionTypeName"
    value={data.connectionTypeName}
    onChange={(e) => handleChange("connectionTypeName", e.target.value)}
    />

    <label style={{ fontFamily: "var(--font-ui)", fontWeight: "bold" }}>usableCategory</label>
    <CategorySelect value={data.usableCategory} onChange={(v) => handleChange("usableCategory", v)} />

    <label style={{ display: "block", margin: "0.5rem 0", fontFamily: "var(--font-ui)" }}>
    <input
        type="checkbox"
    checked={data.isDirectional}
    onChange={(e) => handleChange("isDirectional", e.target.checked)}
    />{" "}
    방향성 있음
    </label>

    <LabeledInput
    label="typeDescription"
    value={data.typeDescription}
    onChange={(e) => handleChange("typeDescription", e.target.value)}
    />

    <button type="button" onClick={onDelete}>삭제</button>
        </div>
);
}
