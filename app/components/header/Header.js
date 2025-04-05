import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
export function Header() {
    const chat = useStore(chatStore);
    return (_jsxs("header", { className: classNames('flex items-center bg-bolt-elements-background-depth-1 p-5 border-b h-[var(--header-height)]', {
            'border-transparent': !chat.started,
            'border-bolt-elements-borderColor': chat.started,
        }), children: [_jsxs("div", { className: "flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer", children: [_jsx("div", { className: "i-ph:sidebar-simple-duotone text-xl" }), _jsx("a", { href: "/", className: "text-2xl font-semibold text-accent flex items-center", children: _jsx("span", { className: "i-bolt:logo-text?mask w-[46px] inline-block" }) })] }), _jsx("span", { className: "flex-1 px-4 truncate text-center text-bolt-elements-textPrimary", children: _jsx(ClientOnly, { children: () => _jsx(ChatDescription, {}) }) }), chat.started && (_jsx(ClientOnly, { children: () => (_jsx("div", { className: "mr-1", children: _jsx(HeaderActionButtons, {}) })) }))] }));
}
