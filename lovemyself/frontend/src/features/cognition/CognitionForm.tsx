import { useState, useRef } from "react";
import { postCognition } from "../../api/cognitionAPI";
import LabeledInput from "../../components/LabeledInput";
import CategorySelect from "../../components/CategorySelect";
import DateInput from "../../components/DateInput";
import InlineContainer from "../../components/InlineContainer";
import ConnectionInputList, { ConnectionData } from "../connection/ConnectionInputList";
import ToastEditor, { ToastEditorHandle } from "../../components/ToastEditor";

function getCognitionTypeByCategory(category: string): "IDEA" | "EXPERIENCE" | null {
    const ideaSet = new Set(["INSPIRATION", "INSIGHT", "FRAMEWORK", "STUDY"]);
    const experienceSet = new Set(["REVIEW", "EVENT", "AWARENESS", "PROJECT"]);
    if (ideaSet.has(category)) return "IDEA";
    if (experienceSet.has(category)) return "EXPERIENCE";
    return null;
}

export default function CognitionForm() {
    // ToastEditorHandle를 반환하는 ref로 타입을 변경합니다.
    const editorRef = useRef<ToastEditorHandle | null>(null);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState(() => getTodayString());
    const [endDate, setEndDate] = useState(() => getTodayString());

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
    function getTodayString() {
        return new Date().toISOString().split("T")[0]; // "2025-04-10"
    }


    const cognitionType = getCognitionTypeByCategory(category);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ToastEditorHandle에 정의된 getMarkdown 메서드를 직접 호출합니다.
        const markdownContent = editorRef.current?.getMarkdown() ?? "";

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
            content: markdownContent,
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
            <InlineContainer>
                <LabeledInput label="제목" value={title} className="w-[500px]" onChange={(e) => setTitle(e.target.value)} />
                <CategorySelect value={category} onChange={setCategory} />
            </InlineContainer>

            <InlineContainer className="w-3/4 pl-4">
                <DateInput label="시작일" value={startDate} onChange={setStartDate} />
                <DateInput label="종료일" value={endDate} onChange={setEndDate} />
            </InlineContainer>
            <div className="w-[80%] mx-auto mt-4 px-4">
                <ToastEditor ref={editorRef} initialValue="내용을 입력하세요..." />
            </div>

            <ConnectionInputList connections={connections} setConnections={setConnections} />

            <div className="w-full mt-6 flex justify-center">
                <button type="submit" className="btn btn-outline btn-wide">
                    저장
                </button>
            </div>
        </form>
    );
}
