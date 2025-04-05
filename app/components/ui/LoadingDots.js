import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useState } from 'react';
export const LoadingDots = memo(({ text }) => {
    const [dotCount, setDotCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevDotCount) => (prevDotCount + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, []);
    return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsxs("div", { className: "relative", children: [_jsx("span", { children: text }), _jsx("span", { className: "absolute left-[calc(100%-12px)]", children: '.'.repeat(dotCount) }), _jsx("span", { className: "invisible", children: "..." })] }) }));
});
