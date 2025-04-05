import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { memo } from 'react';
import { classNames } from '~/utils/classNames';
import { cubicEasingFn } from '~/utils/easings';
import { genericMemo } from '~/utils/react';
export const Slider = genericMemo(({ selected, options, setSelected }) => {
    const isLeftSelected = selected === options.left.value;
    return (_jsxs("div", { className: "flex items-center flex-wrap shrink-0 gap-1 bg-bolt-elements-background-depth-1 overflow-hidden rounded-full p-1", children: [_jsx(SliderButton, { selected: isLeftSelected, setSelected: () => setSelected?.(options.left.value), children: options.left.text }), _jsx(SliderButton, { selected: !isLeftSelected, setSelected: () => setSelected?.(options.right.value), children: options.right.text })] }));
});
const SliderButton = memo(({ selected, children, setSelected }) => {
    return (_jsxs("button", { onClick: setSelected, className: classNames('bg-transparent text-sm px-2.5 py-0.5 rounded-full relative', selected
            ? 'text-bolt-elements-item-contentAccent'
            : 'text-bolt-elements-item-contentDefault hover:text-bolt-elements-item-contentActive'), children: [_jsx("span", { className: "relative z-10", children: children }), selected && (_jsx(motion.span, { layoutId: "pill-tab", transition: { duration: 0.2, ease: cubicEasingFn }, className: "absolute inset-0 z-0 bg-bolt-elements-item-backgroundAccent rounded-full" }))] }));
});
