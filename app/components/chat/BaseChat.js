import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, {} from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { Menu } from '~/components/sidebar/Menu.client';
import { IconButton } from '~/components/ui/IconButton';
import { Workbench } from '~/components/workbench/Workbench.client';
import { classNames } from '~/utils/classNames';
import { Messages } from './Messages.client';
import { SendButton } from './SendButton.client';
import styles from './BaseChat.module.scss';
const EXAMPLE_PROMPTS = [
    { text: 'Build a todo app in React using Tailwind' },
    { text: 'Build a simple blog using Astro' },
    { text: 'Create a cookie consent form using Material UI' },
    { text: 'Make a space invaders game' },
    { text: 'How do I center a div?' },
];
const TEXTAREA_MIN_HEIGHT = 76;
export const BaseChat = React.forwardRef(({ textareaRef, messageRef, scrollRef, showChat = true, chatStarted = false, isStreaming = false, enhancingPrompt = false, promptEnhanced = false, messages, input = '', sendMessage, handleInputChange, enhancePrompt, handleStop, }, ref) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;
    return (_jsxs("div", { ref: ref, className: classNames(styles.BaseChat, 'relative flex h-full w-full overflow-hidden bg-bolt-elements-background-depth-1'), "data-chat-visible": showChat, children: [_jsx(ClientOnly, { children: () => _jsx(Menu, {}) }), _jsxs("div", { ref: scrollRef, className: "flex overflow-y-auto w-full h-full", children: [_jsxs("div", { className: classNames(styles.Chat, 'flex flex-col flex-grow min-w-[var(--chat-min-width)] h-full'), children: [!chatStarted && (_jsxs("div", { id: "intro", className: "mt-[26vh] max-w-chat mx-auto", children: [_jsx("h1", { className: "text-5xl text-center font-bold text-bolt-elements-textPrimary mb-2", children: "Where ideas begin" }), _jsx("p", { className: "mb-4 text-center text-bolt-elements-textSecondary", children: "Bring ideas to life in seconds or get help on existing projects." })] })), _jsxs("div", { className: classNames('pt-6 px-6', {
                                    'h-full flex flex-col': chatStarted,
                                }), children: [_jsx(ClientOnly, { children: () => {
                                            return chatStarted ? (_jsx(Messages, { ref: messageRef, className: "flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-1", messages: messages, isStreaming: isStreaming })) : null;
                                        } }), _jsxs("div", { className: classNames('relative w-full max-w-chat mx-auto z-prompt', {
                                            'sticky bottom-0': chatStarted,
                                        }), children: [_jsxs("div", { className: classNames('shadow-sm border border-bolt-elements-borderColor bg-bolt-elements-prompt-background backdrop-filter backdrop-blur-[8px] rounded-lg overflow-hidden'), children: [_jsx("textarea", { ref: textareaRef, className: `w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-md text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary bg-transparent`, onKeyDown: (event) => {
                                                            if (event.key === 'Enter') {
                                                                if (event.shiftKey) {
                                                                    return;
                                                                }
                                                                event.preventDefault();
                                                                sendMessage?.(event);
                                                            }
                                                        }, value: input, onChange: (event) => {
                                                            handleInputChange?.(event);
                                                        }, style: {
                                                            minHeight: TEXTAREA_MIN_HEIGHT,
                                                            maxHeight: TEXTAREA_MAX_HEIGHT,
                                                        }, placeholder: "How can Bolt help you today?", translate: "no" }), _jsx(ClientOnly, { children: () => (_jsx(SendButton, { show: input.length > 0 || isStreaming, isStreaming: isStreaming, onClick: (event) => {
                                                                if (isStreaming) {
                                                                    handleStop?.();
                                                                    return;
                                                                }
                                                                sendMessage?.(event);
                                                            } })) }), _jsxs("div", { className: "flex justify-between text-sm p-4 pt-2", children: [_jsx("div", { className: "flex gap-1 items-center", children: _jsx(IconButton, { title: "Enhance prompt", disabled: input.length === 0 || enhancingPrompt, className: classNames({
                                                                        'opacity-100!': enhancingPrompt,
                                                                        'text-bolt-elements-item-contentAccent! pr-1.5 enabled:hover:bg-bolt-elements-item-backgroundAccent!': promptEnhanced,
                                                                    }), onClick: () => enhancePrompt?.(), children: enhancingPrompt ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "i-svg-spinners:90-ring-with-bg text-bolt-elements-loader-progress text-xl" }), _jsx("div", { className: "ml-1.5", children: "Enhancing prompt..." })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "i-bolt:stars text-xl" }), promptEnhanced && _jsx("div", { className: "ml-1.5", children: "Prompt enhanced" })] })) }) }), input.length > 3 ? (_jsxs("div", { className: "text-xs text-bolt-elements-textTertiary", children: ["Use ", _jsx("kbd", { className: "kdb", children: "Shift" }), " + ", _jsx("kbd", { className: "kdb", children: "Return" }), " for a new line"] })) : null] })] }), _jsx("div", { className: "bg-bolt-elements-background-depth-1 pb-6" })] })] }), !chatStarted && (_jsx("div", { id: "examples", className: "relative w-full max-w-xl mx-auto mt-8 flex justify-center", children: _jsx("div", { className: "flex flex-col space-y-2 [mask-image:linear-gradient(to_bottom,black_0%,transparent_180%)] hover:[mask-image:none]", children: EXAMPLE_PROMPTS.map((examplePrompt, index) => {
                                        return (_jsxs("button", { onClick: (event) => {
                                                sendMessage?.(event, examplePrompt.text);
                                            }, className: "group flex items-center w-full gap-2 justify-center bg-transparent text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary transition-theme", children: [examplePrompt.text, _jsx("div", { className: "i-ph:arrow-bend-down-left" })] }, index));
                                    }) }) }))] }), _jsx(ClientOnly, { children: () => _jsx(Workbench, { chatStarted: chatStarted, isStreaming: isStreaming }) })] })] }));
});
