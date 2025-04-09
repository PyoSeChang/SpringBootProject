import { useState } from "react";
import { postCognition } from "./cognitionAPI";
import LabeledInput from "../../components/LabeledInput";
import CategorySelect from "../../components/CategorySelect";
import DateInput from "../../components/DateInput";
import ConnectionInputList, { ConnectionData } from "../connection/ConnectionInputList";

function getCognitionTypeByCategory(category: string): "IDEA" | "EXPERIENCE" | null {
    const ideaSet = new Set(["INSPIRATION", "INSIGHT", "FRAMEWORK", "STUDY"]);
    const experienceSet = new Set(["REVIEW", "EVENT", "AWARENESS", "PROJECT"]);
    if (ideaSet.has(category)) return "IDEA";
    if (experienceSet.has(category)) return "EXPERIENCE";
    return null;
}

export default function CognitionForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [content, setContent] = useState(""); // ✨ content 텍스트 입력으로 대체
    const [connections, setConnections] = useState<ConnectionData[]>([
        {
            id: Date.now(),
            toId: "",
            toCategory: "",
            viewName: "",
            connectionTypeName: "",
            usableCategory: "",
            isDirectional: false,
            typeDescription: "",
        },
    ]);

    const cognitionType = getCognitionTypeByCategory(category);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleanedConnections = connections.map((conn) => ({
            ...conn,
            usableCategory: conn.usableCategory === "" ? null : conn.usableCategory,
        }));

        const cognitionData = {
            title,
            category,
            cognitionType,
            startDate,
            endDate,
            content,
            connections: cleanedConnections,
        };

        try {
            const result = await postCognition(cognitionData);
            console.log("저장 성공:", result);
        } catch (err) {
            console.error("저장 실패:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <LabeledInput label="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            <CategorySelect value={category} onChange={setCategory} />
            <DateInput label="시작일" value={startDate} onChange={setStartDate} />
            <DateInput label="종료일" value={endDate} onChange={setEndDate} />
            <LabeledInput label="내용" value={content} onChange={(e) => setContent(e.target.value)} />

            <ConnectionInputList connections={connections} setConnections={setConnections} />

            <button type="submit">저장</button>
        </form>
    );
}
