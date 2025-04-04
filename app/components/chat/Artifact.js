import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'framer-motion';
import { computed } from 'nanostores';
import { memo, useEffect, useRef, useState } from 'react';
import { createHighlighter } from 'shiki';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';
import { cubicEasingFn } from '~/utils/easings';
const highlighterOptions = {
    langs: ['shell'],
    themes: ['light-plus', 'dark-plus'],
};
const shellHighlighter = import.meta.hot?.data.shellHighlighter ?? (await createHighlighter(highlighterOptions));
if (import.meta.hot) {
    import.meta.hot.data.shellHighlighter = shellHighlighter;
}
export const Artifact = memo(({ messageId }) => {
    const userToggledActions = useRef(false);
    const [showActions, setShowActions] = useState(false);
    const artifacts = useStore(workbenchStore.artifacts);
    const artifact = artifacts[messageId];
    const actions = useStore(computed(artifact.runner.actions, (actions) => {
        return Object.values(actions);
    }));
    const toggleActions = () => {
        userToggledActions.current = true;
        setShowActions(!showActions);
    };
    useEffect(() => {
        if (actions.length && !showActions && !userToggledActions.current) {
            setShowActions(true);
        }
    }, [actions]);
    return (_jsxs("div", { className: "artifact border border-bolt-elements-borderColor flex flex-col overflow-hidden rounded-lg w-full transition-border duration-150", children: [_jsxs("div", { className: "flex", children: [_jsx("button", { className: "flex items-stretch bg-bolt-elements-artifacts-background hover:bg-bolt-elements-artifacts-backgroundHover w-full overflow-hidden", onClick: () => {
                            const showWorkbench = workbenchStore.showWorkbench.get();
                            workbenchStore.showWorkbench.set(!showWorkbench);
                        }, children: _jsxs("div", { className: "px-5 p-3.5 w-full text-left", children: [_jsx("div", { className: "w-full text-bolt-elements-textPrimary font-medium leading-5 text-sm", children: artifact?.title }), _jsx("div", { className: "w-full w-full text-bolt-elements-textSecondary text-xs mt-0.5", children: "Click to open Workbench" })] }) }), _jsx("div", { className: "bg-bolt-elements-artifacts-borderColor w-[1px]" }), _jsx(AnimatePresence, { children: actions.length && (_jsx(motion.button, { initial: { width: 0 }, animate: { width: 'auto' }, exit: { width: 0 }, transition: { duration: 0.15, ease: cubicEasingFn }, className: "bg-bolt-elements-artifacts-background hover:bg-bolt-elements-artifacts-backgroundHover", onClick: toggleActions, children: _jsx("div", { className: "p-4", children: _jsx("div", { className: showActions ? 'i-ph:caret-up-bold' : 'i-ph:caret-down-bold' }) }) })) })] }), _jsx(AnimatePresence, { children: showActions && actions.length > 0 && (_jsxs(motion.div, { className: "actions", initial: { height: 0 }, animate: { height: 'auto' }, exit: { height: '0px' }, transition: { duration: 0.15 }, children: [_jsx("div", { className: "bg-bolt-elements-artifacts-borderColor h-[1px]" }), _jsx("div", { className: "p-5 text-left bg-bolt-elements-actions-background", children: _jsx(ActionList, { actions: actions }) })] })) })] }));
});
function ShellCodeBlock({ classsName, code }) {
    return (_jsx("div", { className: classNames('text-xs', classsName), dangerouslySetInnerHTML: {
            __html: shellHighlighter.codeToHtml(code, {
                lang: 'shell',
                theme: 'dark-plus',
            }),
        } }));
}
const actionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
const ActionList = memo(({ actions }) => {
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 }, children: _jsx("ul", { className: "list-none space-y-2.5", children: actions.map((action, index) => {
                const { status, type, content } = action;
                const isLast = index === actions.length - 1;
                return (_jsxs(motion.li, { variants: actionVariants, initial: "hidden", animate: "visible", transition: {
                        duration: 0.2,
                        ease: cubicEasingFn,
                    }, children: [_jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [_jsx("div", { className: classNames('text-lg', getIconColor(action.status)), children: status === 'running' ? (_jsx("div", { className: "i-svg-spinners:90-ring-with-bg" })) : status === 'pending' ? (_jsx("div", { className: "i-ph:circle-duotone" })) : status === 'complete' ? (_jsx("div", { className: "i-ph:check" })) : status === 'failed' || status === 'aborted' ? (_jsx("div", { className: "i-ph:x" })) : null }), type === 'file' ? (_jsxs("div", { children: ["Create", ' ', _jsx("code", { className: "bg-bolt-elements-artifacts-inlineCode-background text-bolt-elements-artifacts-inlineCode-text px-1.5 py-1 rounded-md", children: action.filePath })] })) : type === 'shell' ? (_jsx("div", { className: "flex items-center w-full min-h-[28px]", children: _jsx("span", { className: "flex-1", children: "Run command" }) })) : null] }), type === 'shell' && (_jsx(ShellCodeBlock, { classsName: classNames('mt-1', {
                                'mb-3.5': !isLast,
                            }), code: content }))] }, index));
            }) }) }));
});
function getIconColor(status) {
    switch (status) {
        case 'pending': {
            return 'text-bolt-elements-textTertiary';
        }
        case 'running': {
            return 'text-bolt-elements-loader-progress';
        }
        case 'complete': {
            return 'text-bolt-elements-icon-success';
        }
        case 'aborted': {
            return 'text-bolt-elements-textSecondary';
        }
        case 'failed': {
            return 'text-bolt-elements-icon-error';
        }
        default: {
            return undefined;
        }
    }
}
