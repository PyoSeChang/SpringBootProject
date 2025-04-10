import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Nav from "./layout/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-green-900">
            <main
                className="w-[90%] mx-auto p-6 md:p-8 rounded-md"
                style={{
                    backgroundColor: "var(--color-bg-black)",
                    backgroundImage: "var(--color-bg-texture)",
                    backgroundRepeat: "repeat",
                }}
            >

            <Header />
                <Nav />
                {children}
                <Footer />
            </main>

        </div>
    );
}
