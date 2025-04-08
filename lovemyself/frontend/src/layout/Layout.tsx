// src/layout/Layout.tsx
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout-wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
