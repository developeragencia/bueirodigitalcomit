import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { classNames } from '~/utils/classNames';
import { AssistantMessage } from './AssistantMessage';
import { UserMessage } from './UserMessage';
export const Messages = React.forwardRef((props, ref) => {
    const { id, isStreaming = false, messages = [] } = props;
    return (_jsxs("div", { id: id, ref: ref, className: props.className, children: [messages.length > 0
                ? messages.map((message, index) => {
                    const { role, content } = message;
                    const isUserMessage = role === 'user';
                    const isFirst = index === 0;
                    const isLast = index === messages.length - 1;
                    return (_jsxs("div", { className: classNames('flex gap-4 p-6 w-full rounded-[calc(0.75rem-1px)]', {
                            'bg-bolt-elements-messages-background': isUserMessage || !isStreaming || (isStreaming && !isLast),
                            'bg-gradient-to-b from-bolt-elements-messages-background from-30% to-transparent': isStreaming && isLast,
                            'mt-4': !isFirst,
                        }), children: [isUserMessage && (_jsx("div", { className: "flex items-center justify-center w-[34px] h-[34px] overflow-hidden bg-white text-gray-600 rounded-full shrink-0 self-start", children: _jsx("div", { className: "i-ph:user-fill text-xl" }) })), _jsx("div", { className: "grid grid-col-1 w-full", children: isUserMessage ? _jsx(UserMessage, { content: content }) : _jsx(AssistantMessage, { content: content }) })] }, index));
                })
                : null, isStreaming && (_jsx("div", { className: "text-center w-full text-bolt-elements-textSecondary i-svg-spinners:3-dots-fade text-4xl mt-4" }))] }));
});
