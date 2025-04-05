import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import { computed } from 'nanostores';
import { memo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import {} from '~/components/editor/codemirror/CodeMirrorEditor';
import { IconButton } from '~/components/ui/IconButton';
import { PanelHeaderButton } from '~/components/ui/PanelHeaderButton';
import { Slider } from '~/components/ui/Slider';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';
import { cubicEasingFn } from '~/utils/easings';
import { renderLogger } from '~/utils/logger';
import { EditorPanel } from './EditorPanel';
import { Preview } from './Preview';
const viewTransition = { ease: cubicEasingFn };
const sliderOptions = {
    left: {
        value: 'code',
        text: 'Code',
    },
    right: {
        value: 'preview',
        text: 'Preview',
    },
};
const workbenchVariants = {
    closed: {
        width: 0,
        transition: {
            duration: 0.2,
            ease: cubicEasingFn,
        },
    },
    open: {
        width: 'var(--workbench-width)',
        transition: {
            duration: 0.2,
            ease: cubicEasingFn,
        },
    },
};
export const Workbench = memo(({ chatStarted, isStreaming }) => {
    renderLogger.trace('Workbench');
    const hasPreview = useStore(computed(workbenchStore.previews, (previews) => previews.length > 0));
    const showWorkbench = useStore(workbenchStore.showWorkbench);
    const selectedFile = useStore(workbenchStore.selectedFile);
    const currentDocument = useStore(workbenchStore.currentDocument);
    const unsavedFiles = useStore(workbenchStore.unsavedFiles);
    const files = useStore(workbenchStore.files);
    const selectedView = useStore(workbenchStore.currentView);
    const setSelectedView = (view) => {
        workbenchStore.currentView.set(view);
    };
    useEffect(() => {
        if (hasPreview) {
            setSelectedView('preview');
        }
    }, [hasPreview]);
    useEffect(() => {
        workbenchStore.setDocuments(files);
    }, [files]);
    const onEditorChange = useCallback((update) => {
        workbenchStore.setCurrentDocumentContent(update.content);
    }, []);
    const onEditorScroll = useCallback((position) => {
        workbenchStore.setCurrentDocumentScrollPosition(position);
    }, []);
    const onFileSelect = useCallback((filePath) => {
        workbenchStore.setSelectedFile(filePath);
    }, []);
    const onFileSave = useCallback(() => {
        workbenchStore.saveCurrentDocument().catch(() => {
            toast.error('Failed to update file content');
        });
    }, []);
    const onFileReset = useCallback(() => {
        workbenchStore.resetCurrentDocument();
    }, []);
    return (chatStarted && (_jsx(motion.div, { initial: "closed", animate: showWorkbench ? 'open' : 'closed', variants: workbenchVariants, className: "z-workbench", children: _jsx("div", { className: classNames('fixed top-[calc(var(--header-height)+1.5rem)] bottom-6 w-[var(--workbench-inner-width)] mr-4 z-0 transition-[left,width] duration-200 bolt-ease-cubic-bezier', {
                'left-[var(--workbench-left)]': showWorkbench,
                'left-[100%]': !showWorkbench,
            }), children: _jsx("div", { className: "absolute inset-0 px-6", children: _jsxs("div", { className: "h-full flex flex-col bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor shadow-sm rounded-lg overflow-hidden", children: [_jsxs("div", { className: "flex items-center px-3 py-2 border-b border-bolt-elements-borderColor", children: [_jsx(Slider, { selected: selectedView, options: sliderOptions, setSelected: setSelectedView }), _jsx("div", { className: "ml-auto" }), selectedView === 'code' && (_jsxs(PanelHeaderButton, { className: "mr-1 text-sm", onClick: () => {
                                        workbenchStore.toggleTerminal(!workbenchStore.showTerminal.get());
                                    }, children: [_jsx("div", { className: "i-ph:terminal" }), "Toggle Terminal"] })), _jsx(IconButton, { icon: "i-ph:x-circle", className: "-mr-1", size: "xl", onClick: () => {
                                        workbenchStore.showWorkbench.set(false);
                                    } })] }), _jsxs("div", { className: "relative flex-1 overflow-hidden", children: [_jsx(View, { initial: { x: selectedView === 'code' ? 0 : '-100%' }, animate: { x: selectedView === 'code' ? 0 : '-100%' }, children: _jsx(EditorPanel, { editorDocument: currentDocument, isStreaming: isStreaming, selectedFile: selectedFile, files: files, unsavedFiles: unsavedFiles, onFileSelect: onFileSelect, onEditorScroll: onEditorScroll, onEditorChange: onEditorChange, onFileSave: onFileSave, onFileReset: onFileReset }) }), _jsx(View, { initial: { x: selectedView === 'preview' ? 0 : '100%' }, animate: { x: selectedView === 'preview' ? 0 : '100%' }, children: _jsx(Preview, {}) })] })] }) }) }) })));
});
const View = memo(({ children, ...props }) => {
    return (_jsx(motion.div, { className: "absolute inset-0", transition: viewTransition, ...props, children: children }));
});
