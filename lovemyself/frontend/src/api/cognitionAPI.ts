export async function postCognition(data: any) {
    try {
        console.log("📤 보낼 요청 객체:", data); // ✅ 요청 객체 출력

        const response = await fetch("/find/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ 서버 응답 상태 오류:", response.status);
            console.error("📩 서버 응답 메시지:", errorText);
            throw new Error(`서버 오류: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ 저장 성공 응답:", result);
        return result;
    } catch (error: any) {
        console.error("🔥 Cognition 저장 실패");
        console.error("에러 이름:", error.name);
        console.error("에러 메시지:", error.message);
        console.error("전체 에러 객체:", error);
        console.log("📤 실패 당시 요청 객체:", data); // 실패 시에도 다시 출력
        throw error;
    }
}
