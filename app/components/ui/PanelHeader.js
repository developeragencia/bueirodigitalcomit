import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { classNames } from '~/utils/classNames';
export const PanelHeader = memo(({ className, children }) => {
    return (_jsx("div", { className: classNames('flex items-center gap-2 bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary border-b border-bolt-elements-borderColor px-4 py-1 min-h-[34px] text-sm', className), children: children }));
});
