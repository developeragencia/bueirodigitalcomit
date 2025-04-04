import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';
import {} from '~/lib/persistence';
export function HistoryItem({ item, onDelete }) {
    const [hovering, setHovering] = useState(false);
    const hoverRef = useRef(null);
    useEffect(() => {
        let timeout;
        function mouseEnter() {
            setHovering(true);
            if (timeout) {
                clearTimeout(timeout);
            }
        }
        function mouseLeave() {
            setHovering(false);
        }
        hoverRef.current?.addEventListener('mouseenter', mouseEnter);
        hoverRef.current?.addEventListener('mouseleave', mouseLeave);
        return () => {
            hoverRef.current?.removeEventListener('mouseenter', mouseEnter);
            hoverRef.current?.removeEventListener('mouseleave', mouseLeave);
        };
    }, []);
    return (_jsx("div", { ref: hoverRef, className: "group rounded-md text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3 overflow-hidden flex justify-between items-center px-2 py-1", children: _jsxs("a", { href: `/chat/${item.urlId}`, className: "flex w-full relative truncate block", children: [item.description, _jsx("div", { className: "absolute right-0 z-1 top-0 bottom-0 bg-gradient-to-l from-bolt-elements-background-depth-2 group-hover:from-bolt-elements-background-depth-3 to-transparent w-10 flex justify-end group-hover:w-15 group-hover:from-45%", children: hovering && (_jsx("div", { className: "flex items-center p-1 text-bolt-elements-textSecondary hover:text-bolt-elements-item-contentDanger", children: _jsx(Dialog.Trigger, { asChild: true, children: _jsx("button", { className: "i-ph:trash scale-110", onClick: (event) => {
                                    // we prevent the default so we don't trigger the anchor above
                                    event.preventDefault();
                                    onDelete?.(event);
                                } }) }) })) })] }) }));
}
