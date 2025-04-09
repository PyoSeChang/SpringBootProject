// src/components/ToastEditor.tsx
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "../styles/ToastEditor.css";
import ColorToolbar from "./ColorToolbar";

export interface ToastEditorHandle {
    getMarkdown: () => string;
    getHTML: () => string;
    reset: () => void;
}

export interface ToastEditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    dark?: boolean;
}

const ToastEditor = forwardRef<ToastEditorHandle, ToastEditorProps>(
    ({ initialValue = "", onChange, dark = true }, ref) => {
        // 내부 Editor 인스턴스를 저장할 ref (실제 에디터 인스턴스)
        const instanceRef = useRef<any>(null);

        // 콜백 ref: Editor 컴포넌트가 마운트되면 getInstance()를 호출해 실제 에디터 인스턴스를 instanceRef에 저장합니다.
        const handleEditorRef = (editor: Editor | null) => {
            if (editor) {
                instanceRef.current = editor.getInstance();
            }
        };

        // 부모에 노출할 메서드 설정 (이제 instanceRef.current는 에디터 인스턴스이므로 직접 메서드를 호출할 수 있음)
        useImperativeHandle(ref, () => ({
            getMarkdown: () => instanceRef.current?.getMarkdown() || "",
            getHTML: () => instanceRef.current?.getHTML() || "",
            reset: () => {
                instanceRef.current?.reset();
            },
        }));

        // 에디터 변경 이벤트 핸들러
        const handleChange = () => {
            const markdown = instanceRef.current?.getMarkdown() || "";
            onChange?.(markdown);
        };

        return (
            <>
                <Editor
                    ref={handleEditorRef}
                    initialValue={initialValue}
                    previewStyle="vertical"
                    height="400px"
                    theme={dark ? "dark" : "light"}
                    usageStatistics={false}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    onChange={handleChange}
                />
                {/* ColorToolbar가 에디터 인스턴스를 필요로 한다면 instanceRef를 전달 */}
                <ColorToolbar editorRef={instanceRef} />
            </>
        );
    }
);

export default ToastEditor;
