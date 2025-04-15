// src/components/common/Atag.tsx

type AtagProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    rel?: string;
};

export default function Atag({
                                 href,
                                 children,
                                 className = "",
                                 target,
                                 rel,
                             }: AtagProps) {
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={`px-2 [text-decoration:none] ${className}`}
        >
            {children}
        </a>
    );
}
