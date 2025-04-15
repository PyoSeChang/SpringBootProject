import React from "react";
import CognitionForm from "../features/cognition/CognitionForm";
import RightStickyTabs from "../components/ui/RightStickyTabs"; // ✅ 오타 수정

const findTabs = [
    { id: "write", label: "write", color: "#a855f7", path: "/find/write" },
    { id: "view", label: "view", color: "#2563eb", path: "/find/view" },
];

export default function FindMySelfPage() {
    return (
        <div>
            <CognitionForm />
            <RightStickyTabs tabs={findTabs} />
        </div>
    );
}
