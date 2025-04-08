// src/features/cognition/CognitionForm.tsx

import { useState } from "react";
import ConnectionInputList from "../connection/ConnectionInputList";
import LabeledInput from "../../components/LabeledInput";
import CategorySelect from "../../components/CategorySelect";
import DateInput from "../../components/DateInput";

export default function CognitionForm() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cognitionData = {
            title,
            category,
            startDate,
            endDate,
            content,
            connections: [], // 연결 정보는 추후 추가
        };
        console.log("제출 데이터:", cognitionData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <LabeledInput label="제목" value={title} onChange={e => setTitle(e.target.value)} />
            <CategorySelect value={category} onChange={setCategory} />
            <DateInput label="시작일" value={startDate} onChange={setStartDate} />
            <DateInput label="종료일" value={endDate} onChange={setEndDate} />

            <label>내용</label>
            <textarea
                style={{ width: "100%", height: "200px" }}
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <ConnectionInputList />

            <button type="submit">저장</button>
        </form>
    );
}