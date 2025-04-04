import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { classNames } from '~/utils/classNames';
export const IconButton = memo(({ icon, size = 'xl', className, iconClassName, disabledClassName, disabled = false, title, onClick, children, }) => {
    return (_jsx("button", { className: classNames('flex items-center text-bolt-elements-item-contentDefault bg-transparent enabled:hover:text-bolt-elements-item-contentActive rounded-md p-1 enabled:hover:bg-bolt-elements-item-backgroundActive disabled:cursor-not-allowed', {
            [classNames('opacity-30', disabledClassName)]: disabled,
        }, className), title: title, disabled: disabled, onClick: (event) => {
            if (disabled) {
                return;
            }
            onClick?.(event);
        }, children: children ? children : _jsx("div", { className: classNames(icon, getIconSize(size), iconClassName) }) }));
});
function getIconSize(size) {
    if (size === 'sm') {
        return 'text-sm';
    }
    else if (size === 'md') {
        return 'text-md';
    }
    else if (size === 'lg') {
        return 'text-lg';
    }
    else if (size === 'xl') {
        return 'text-xl';
    }
    else {
        return 'text-2xl';
    }
}
