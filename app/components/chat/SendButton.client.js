import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
const customEasingFn = cubicBezier(0.4, 0, 0.2, 1);
export function SendButton({ show, isStreaming, onClick }) {
    return (_jsx(AnimatePresence, { children: show ? (_jsx(motion.button, { className: "absolute flex justify-center items-center top-[18px] right-[22px] p-1 bg-accent-500 hover:brightness-94 color-white rounded-md w-[34px] h-[34px] transition-theme", transition: { ease: customEasingFn, duration: 0.17 }, initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 }, onClick: (event) => {
                event.preventDefault();
                onClick?.(event);
            }, children: _jsx("div", { className: "text-lg", children: !isStreaming ? _jsx("div", { className: "i-ph:arrow-right" }) : _jsx("div", { className: "i-ph:stop-circle-bold" }) }) })) : null }));
}
