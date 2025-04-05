import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { chatStore } from '~/lib/stores/chat';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';
export function HeaderActionButtons({}) {
    const showWorkbench = useStore(workbenchStore.showWorkbench);
    const { showChat } = useStore(chatStore);
    const canHideChat = showWorkbench || !showChat;
    return (_jsx("div", { className: "flex", children: _jsxs("div", { className: "flex border border-bolt-elements-borderColor rounded-md overflow-hidden", children: [_jsx(Button, { active: showChat, disabled: !canHideChat, onClick: () => {
                        if (canHideChat) {
                            chatStore.setKey('showChat', !showChat);
                        }
                    }, children: _jsx("div", { className: "i-bolt:chat text-sm" }) }), _jsx("div", { className: "w-[1px] bg-bolt-elements-borderColor" }), _jsx(Button, { active: showWorkbench, onClick: () => {
                        if (showWorkbench && !showChat) {
                            chatStore.setKey('showChat', true);
                        }
                        workbenchStore.showWorkbench.set(!showWorkbench);
                    }, children: _jsx("div", { className: "i-ph:code-bold" }) })] }) }));
}
function Button({ active = false, disabled = false, children, onClick }) {
    return (_jsx("button", { className: classNames('flex items-center p-1.5', {
            'bg-bolt-elements-item-backgroundDefault hover:bg-bolt-elements-item-backgroundActive text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary': !active,
            'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': active && !disabled,
            'bg-bolt-elements-item-backgroundDefault text-alpha-gray-20 dark:text-alpha-white-20 cursor-not-allowed': disabled,
        }), onClick: onClick, children: children }));
}
