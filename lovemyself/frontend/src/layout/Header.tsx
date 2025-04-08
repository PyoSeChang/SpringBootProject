// src/layout/Header.tsx
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1>LoveMySelf 🌙</h1>
            <nav className="nav-bar">
                <ul>
                    <li><Link to="/find">🔍 Find Myself</Link></li>
                    <li><Link to="/dream">💭 Dream Yourself</Link></li>
                    <li><Link to="/bloom">🌸 Bloom Yourself</Link></li>
                    <li><Link to="/test-style">🎨 Style Test</Link></li>
                </ul>
            </nav>
        </header>
    );
}
