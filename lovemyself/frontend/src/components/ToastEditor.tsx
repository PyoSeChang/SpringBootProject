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
    insertText: (text: string) => void;
}

export interface ToastEditorProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    dark?: boolean;
}

const ToastEditor = forwardRef<ToastEditorHandle, ToastEditorProps>(
    ({ initialValue = "", onChange, dark = true }, ref) => {
        // 내부 Editor 인스턴스를 저장할 ref
        const instanceRef = useRef<any>(null);

        // Editor 컴포넌트가 마운트되면, getInstance()를 호출해 실제 인스턴스를 저장
        const handleEditorRef = (editor: Editor | null) => {
            if (editor) {
                instanceRef.current = editor.getInstance();
            }
        };

        // 부모에 노출할 메서드 설정
        useImperativeHandle(ref, () => ({
            getMarkdown: () => instanceRef.current?.getMarkdown() || "",
            getHTML: () => instanceRef.current?.getHTML() || "",
            reset: () => {
                instanceRef.current?.reset();
            },
            // 새로 추가: 내부 에디터의 insertText API 호출 (Toast UI Editor 인스턴스에서 제공하는 메서드)
            insertText: (text: string) => {
                instanceRef.current?.insertText(text);
            },
        }));

        // 에디터 변경 이벤트 핸들러
        const handleChange = () => {
            const markdown = instanceRef.current?.getMarkdown() || "";
            onChange?.(markdown);
        };

        return (
            <>
                <ColorToolbar editorRef={instanceRef} />
                <br/>
                <Editor
                    ref={handleEditorRef}
                    initialValue={initialValue}
                    previewStyle="vertical"
                    height="920px"
                    theme={dark ? "dark" : "light"}
                    usageStatistics={false}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    onChange={handleChange}
                />
                {/* ColorToolbar에 에디터 핸들을 전달 */}

            </>
        );
    }
);

export default ToastEditor;
