// src/components/ColorToolbar.tsx
import React, { useCallback, useEffect } from "react";
import { ToastEditorHandle } from "./ToastEditor";

const colors = [
    { name: "Yellow", code: "#f1c40f" },
    { name: "Red", code: "#e74c3c" },
    { name: "Green", code: "#1e8449" },
    { name: "Blue", code: "#3498db" },
    { name: "Purple", code: "#9b59b6" },
    { name: "Orange", code: "#e67e22" },
];

type ColorToolbarProps = {
    editorRef: React.RefObject<ToastEditorHandle>;
};

const ColorToolbar: React.FC<ColorToolbarProps> = ({ editorRef }) => {
    const insertColorSpan = useCallback(
        (color: string) => {
            if (!editorRef.current) return;
            // ToastEditorHandle의 insertText 메서드 호출
            const html = `<span style="color: ${color}"></span>`;
            editorRef.current.insertText(html);
        },
        [editorRef]
    );

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                const index = parseInt(e.key, 10) - 1;
                if (index >= 0 && index < colors.length) {
                    e.preventDefault();
                    insertColorSpan(colors[index].code);
                }
            }
        };

        window.addEventListener("keydown", keyDownHandler);
        return () => window.removeEventListener("keydown", keyDownHandler);
    }, [insertColorSpan]);

    return (
        <div className="flex flex-row justify-center gap-2 p-2 bg-black/50 rounded-md border border-gray-700 mt-2">
            {colors.map((color, i) => (
                <button
                    key={color.name}
                    className="w-8 h-8 rounded hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.code }}
                    title={`${color.name} (Ctrl+${i + 1})`}
                    onClick={() => insertColorSpan(color.code)}
                />
            ))}
        </div>

    );
};

export default ColorToolbar;
