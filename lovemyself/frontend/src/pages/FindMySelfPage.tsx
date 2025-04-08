// src/pages/FindMySelfPage.tsx
import Layout from "../layout/Layout";
import CognitionForm from "../features/cognition/CognitionForm";

export default function FindMySelfPage() {
    return (
        <Layout>
        <div style={{ padding: "2rem" }}>
            <h1>Find Myself</h1>
            <CognitionForm />
        </div>
        </Layout>
    );
}
