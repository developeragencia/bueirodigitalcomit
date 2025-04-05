import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';
import { classNames } from '~/utils/classNames';
import { WORK_DIR } from '~/utils/constants';
import { cubicEasingFn } from '~/utils/easings';
import { renderLogger } from '~/utils/logger';
import FileTree from './FileTree';
const WORK_DIR_REGEX = new RegExp(`^${WORK_DIR.split('/').slice(0, -1).join('/').replaceAll('/', '\\/')}/`);
const contextMenuVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.15,
            ease: cubicEasingFn,
        },
    },
    close: {
        y: 6,
        opacity: 0,
        transition: {
            duration: 0.15,
            ease: cubicEasingFn,
        },
    },
};
export const FileBreadcrumb = memo(({ files, pathSegments = [], onFileSelect }) => {
    renderLogger.trace('FileBreadcrumb');
    const [activeIndex, setActiveIndex] = useState(null);
    const contextMenuRef = useRef(null);
    const segmentRefs = useRef([]);
    const handleSegmentClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (activeIndex !== null &&
                !contextMenuRef.current?.contains(event.target) &&
                !segmentRefs.current.some((ref) => ref?.contains(event.target))) {
                setActiveIndex(null);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [activeIndex]);
    if (files === undefined || pathSegments.length === 0) {
        return null;
    }
    return (_jsx("div", { className: "flex", children: pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const path = pathSegments.slice(0, index).join('/');
            if (!WORK_DIR_REGEX.test(path)) {
                return null;
            }
            const isActive = activeIndex === index;
            return (_jsx("div", { className: "relative flex items-center", children: _jsxs(DropdownMenu.Root, { open: isActive, modal: false, children: [_jsx(DropdownMenu.Trigger, { asChild: true, children: _jsxs("span", { ref: (ref) => (segmentRefs.current[index] = ref), className: classNames('flex items-center gap-1.5 cursor-pointer shrink-0', {
                                    'text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary': !isActive,
                                    'text-bolt-elements-textPrimary underline': isActive,
                                    'pr-4': isLast,
                                }), onClick: () => handleSegmentClick(index), children: [isLast && _jsx("div", { className: "i-ph:file-duotone" }), segment] }) }), index > 0 && !isLast && _jsx("span", { className: "i-ph:caret-right inline-block mx-1" }), _jsx(AnimatePresence, { children: isActive && (_jsx(DropdownMenu.Portal, { children: _jsx(DropdownMenu.Content, { className: "z-file-tree-breadcrumb", asChild: true, align: "start", side: "bottom", avoidCollisions: false, children: _jsxs(motion.div, { ref: contextMenuRef, initial: "close", animate: "open", exit: "close", variants: contextMenuVariants, children: [_jsx("div", { className: "rounded-lg overflow-hidden", children: _jsx("div", { className: "max-h-[50vh] min-w-[300px] overflow-scroll bg-bolt-elements-background-depth-1 border border-bolt-elements-borderColor shadow-sm rounded-lg", children: _jsx(FileTree, { files: files, hideRoot: true, rootFolder: path, collapsed: true, allowFolderSelection: true, selectedFile: `${path}/${segment}`, onFileSelect: (filePath) => {
                                                            setActiveIndex(null);
                                                            onFileSelect?.(filePath);
                                                        } }) }) }), _jsx(DropdownMenu.Arrow, { className: "fill-bolt-elements-borderColor" })] }) }) })) })] }) }, index));
        }) }));
});
