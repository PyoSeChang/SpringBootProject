import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Nav from "./layout/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-green-900">
            <main
                className="w-[90%] mx-auto p-6 md:p-8  flex flex-col gap-y-6 flex-1"
                style={{
                    backgroundColor: "#000000",
                    backgroundImage: `url('https://www.transparenttextures.com/patterns/black-paper.png')`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "auto",
                }}
            >

                <section className="relative z-10">
                    <Header />
                </section>

                <section className="relative z-10">
                    <Nav />
                </section>

                <section className="relative z-10 flex-1">
                    {children}
                </section>

                <section className="relative z-10">
                    <Footer />
                </section>
            </main>
        </div>

    );
}
