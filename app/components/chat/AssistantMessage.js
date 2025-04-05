import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Markdown } from './Markdown';
export const AssistantMessage = memo(({ content }) => {
    return (_jsx("div", { className: "overflow-hidden w-full", children: _jsx(Markdown, { html: true, children: content }) }));
});
