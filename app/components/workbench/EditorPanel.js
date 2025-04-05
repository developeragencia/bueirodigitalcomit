import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeMirrorEditor, } from '~/components/editor/codemirror/CodeMirrorEditor';
import { IconButton } from '~/components/ui/IconButton';
import { PanelHeader } from '~/components/ui/PanelHeader';
import { PanelHeaderButton } from '~/components/ui/PanelHeaderButton';
import { shortcutEventEmitter } from '~/lib/hooks';
import { themeStore } from '~/lib/stores/theme';
import { workbenchStore } from '~/lib/stores/workbench';
import { classNames } from '~/utils/classNames';
import { WORK_DIR } from '~/utils/constants';
import { renderLogger } from '~/utils/logger';
import { isMobile } from '~/utils/mobile';
import { FileBreadcrumb } from './FileBreadcrumb';
import { FileTree } from './FileTree';
import { Terminal } from './terminal/Terminal';
const MAX_TERMINALS = 3;
const DEFAULT_TERMINAL_SIZE = 25;
const DEFAULT_EDITOR_SIZE = 100 - DEFAULT_TERMINAL_SIZE;
const editorSettings = { tabSize: 2 };
export const EditorPanel = memo(({ files, unsavedFiles, editorDocument, selectedFile, isStreaming, onFileSelect, onEditorChange, onEditorScroll, onFileSave, onFileReset, }) => {
    renderLogger.trace('EditorPanel');
    const theme = useStore(themeStore);
    const showTerminal = useStore(workbenchStore.showTerminal);
    const terminalRefs = useRef([]);
    const terminalPanelRef = useRef(null);
    const terminalToggledByShortcut = useRef(false);
    const [activeTerminal, setActiveTerminal] = useState(0);
    const [terminalCount, setTerminalCount] = useState(1);
    const activeFileSegments = useMemo(() => {
        if (!editorDocument) {
            return undefined;
        }
        return editorDocument.filePath.split('/');
    }, [editorDocument]);
    const activeFileUnsaved = useMemo(() => {
        return editorDocument !== undefined && unsavedFiles?.has(editorDocument.filePath);
    }, [editorDocument, unsavedFiles]);
    useEffect(() => {
        const unsubscribeFromEventEmitter = shortcutEventEmitter.on('toggleTerminal', () => {
            terminalToggledByShortcut.current = true;
        });
        const unsubscribeFromThemeStore = themeStore.subscribe(() => {
            for (const ref of Object.values(terminalRefs.current)) {
                ref?.reloadStyles();
            }
        });
        return () => {
            unsubscribeFromEventEmitter();
            unsubscribeFromThemeStore();
        };
    }, []);
    useEffect(() => {
        const { current: terminal } = terminalPanelRef;
        if (!terminal) {
            return;
        }
        const isCollapsed = terminal.isCollapsed();
        if (!showTerminal && !isCollapsed) {
            terminal.collapse();
        }
        else if (showTerminal && isCollapsed) {
            terminal.resize(DEFAULT_TERMINAL_SIZE);
        }
        terminalToggledByShortcut.current = false;
    }, [showTerminal]);
    const addTerminal = () => {
        if (terminalCount < MAX_TERMINALS) {
            setTerminalCount(terminalCount + 1);
            setActiveTerminal(terminalCount);
        }
    };
    return (_jsxs(PanelGroup, { direction: "vertical", children: [_jsx(Panel, { defaultSize: showTerminal ? DEFAULT_EDITOR_SIZE : 100, minSize: 20, children: _jsxs(PanelGroup, { direction: "horizontal", children: [_jsx(Panel, { defaultSize: 20, minSize: 10, collapsible: true, children: _jsxs("div", { className: "flex flex-col border-r border-bolt-elements-borderColor h-full", children: [_jsxs(PanelHeader, { children: [_jsx("div", { className: "i-ph:tree-structure-duotone shrink-0" }), "Files"] }), _jsx(FileTree, { className: "h-full", files: files, hideRoot: true, unsavedFiles: unsavedFiles, rootFolder: WORK_DIR, selectedFile: selectedFile, onFileSelect: onFileSelect })] }) }), _jsx(PanelResizeHandle, {}), _jsxs(Panel, { className: "flex flex-col", defaultSize: 80, minSize: 20, children: [_jsx(PanelHeader, { className: "overflow-x-auto", children: activeFileSegments?.length && (_jsxs("div", { className: "flex items-center flex-1 text-sm", children: [_jsx(FileBreadcrumb, { pathSegments: activeFileSegments, files: files, onFileSelect: onFileSelect }), activeFileUnsaved && (_jsxs("div", { className: "flex gap-1 ml-auto -mr-1.5", children: [_jsxs(PanelHeaderButton, { onClick: onFileSave, children: [_jsx("div", { className: "i-ph:floppy-disk-duotone" }), "Save"] }), _jsxs(PanelHeaderButton, { onClick: onFileReset, children: [_jsx("div", { className: "i-ph:clock-counter-clockwise-duotone" }), "Reset"] })] }))] })) }), _jsx("div", { className: "h-full flex-1 overflow-hidden", children: _jsx(CodeMirrorEditor, { theme: theme, editable: !isStreaming && editorDocument !== undefined, settings: editorSettings, doc: editorDocument, autoFocusOnDocumentChange: !isMobile(), onScroll: onEditorScroll, onChange: onEditorChange, onSave: onFileSave }) })] })] }) }), _jsx(PanelResizeHandle, {}), _jsx(Panel, { ref: terminalPanelRef, defaultSize: showTerminal ? DEFAULT_TERMINAL_SIZE : 0, minSize: 10, collapsible: true, onExpand: () => {
                    if (!terminalToggledByShortcut.current) {
                        workbenchStore.toggleTerminal(true);
                    }
                }, onCollapse: () => {
                    if (!terminalToggledByShortcut.current) {
                        workbenchStore.toggleTerminal(false);
                    }
                }, children: _jsx("div", { className: "h-full", children: _jsxs("div", { className: "bg-bolt-elements-terminals-background h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center bg-bolt-elements-background-depth-2 border-y border-bolt-elements-borderColor gap-1.5 min-h-[34px] p-2", children: [Array.from({ length: terminalCount }, (_, index) => {
                                        const isActive = activeTerminal === index;
                                        return (_jsxs("button", { className: classNames('flex items-center text-sm cursor-pointer gap-1.5 px-3 py-2 h-full whitespace-nowrap rounded-full', {
                                                'bg-bolt-elements-terminals-buttonBackground text-bolt-elements-textPrimary': isActive,
                                                'bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:bg-bolt-elements-terminals-buttonBackground': !isActive,
                                            }), onClick: () => setActiveTerminal(index), children: [_jsx("div", { className: "i-ph:terminal-window-duotone text-lg" }), "Terminal ", terminalCount > 1 && index + 1] }, index));
                                    }), terminalCount < MAX_TERMINALS && _jsx(IconButton, { icon: "i-ph:plus", size: "md", onClick: addTerminal }), _jsx(IconButton, { className: "ml-auto", icon: "i-ph:caret-down", title: "Close", size: "md", onClick: () => workbenchStore.toggleTerminal(false) })] }), Array.from({ length: terminalCount }, (_, index) => {
                                const isActive = activeTerminal === index;
                                return (_jsx(Terminal, { className: classNames('h-full overflow-hidden', {
                                        hidden: !isActive,
                                    }), ref: (ref) => {
                                        terminalRefs.current.push(ref);
                                    }, onTerminalReady: (terminal) => workbenchStore.attachTerminal(terminal), onTerminalResize: (cols, rows) => workbenchStore.onTerminalResize(cols, rows), theme: theme }, index));
                            })] }) }) })] }));
});
