// layout/Header.tsx
import Atag from "../components/ui/Atag";

export default function Header() {
    return (
        <header className="w-full px-4 py-6 font-ui_design_2 text-white text-center">
            <Atag href={"/main"}><h1 className="text-7xl">Love Myself</h1></Atag>
        </header>

    );
}
