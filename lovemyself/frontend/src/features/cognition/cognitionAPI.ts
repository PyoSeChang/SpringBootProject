// src/features/cognition/cognitionAPI.ts
export async function postCognition(data: any) {
    const res = await fetch("/find/write", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("저장 실패");
    }

    return res.text();
}
