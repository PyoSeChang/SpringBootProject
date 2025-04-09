// src/components/ColorToolbar.tsx
import { useCallback, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";

const colors = [
    { name: "Yellow", code: "#f1c40f" },
    { name: "Red", code: "#e74c3c" },
    { name: "Green", code: "#1e8449" },
    { name: "Blue", code: "#3498db" },
    { name: "Purple", code: "#9b59b6" },
    { name: "Orange", code: "#e67e22" },
];

type Props = {
    editorRef: React.RefObject<Editor | null>;
};

export default function ColorToolbar({ editorRef }: Props) {
    const insertColorSpan = useCallback(
        (color: string) => {
            const editor = editorRef.current?.getInstance();
            if (!editor) return;

            const html = `<span style="color: ${color}"></span>`;
            editor.insertText(html);
        },
        [editorRef]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                const index = parseInt(e.key) - 1;
                if (index >= 0 && index < colors.length) {
                    e.preventDefault();
                    insertColorSpan(colors[index].code);
                }
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [insertColorSpan]);

    return (
        <div className="flex flex-col gap-1 p-2 bg-black/50 rounded-md border border-gray-700 mt-2">
            {colors.map((c, i) => (
                <button
                    key={c.name}
                    className="w-8 h-8 rounded hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.code }}
                    title={`${c.name} (Ctrl+${i + 1})`}
                    onClick={() => insertColorSpan(c.code)}
                />
            ))}
        </div>
    );
}
