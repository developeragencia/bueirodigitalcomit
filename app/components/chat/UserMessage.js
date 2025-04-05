import { jsx as _jsx } from "react/jsx-runtime";
import { modificationsRegex } from '~/utils/diff';
import { Markdown } from './Markdown';
export function UserMessage({ content }) {
    return (_jsx("div", { className: "overflow-hidden pt-[4px]", children: _jsx(Markdown, { limitedMarkdown: true, children: sanitizeUserMessage(content) }) }));
}
function sanitizeUserMessage(content) {
    return content.replace(modificationsRegex, '').trim();
}
