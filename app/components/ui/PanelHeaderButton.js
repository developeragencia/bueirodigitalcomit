import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { classNames } from '~/utils/classNames';
export const PanelHeaderButton = memo(({ className, disabledClassName, disabled = false, children, onClick }) => {
    return (_jsx("button", { className: classNames('flex items-center shrink-0 gap-1.5 px-1.5 rounded-md py-0.5 text-bolt-elements-item-contentDefault bg-transparent enabled:hover:text-bolt-elements-item-contentActive enabled:hover:bg-bolt-elements-item-backgroundActive disabled:cursor-not-allowed', {
            [classNames('opacity-30', disabledClassName)]: disabled,
        }, className), disabled: disabled, onClick: (event) => {
            if (disabled) {
                return;
            }
            onClick?.(event);
        }, children: children }));
});
