import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useMemo, useState } from 'react';
import { classNames } from '~/utils/classNames';
import { createScopedLogger, renderLogger } from '~/utils/logger';
const logger = createScopedLogger('FileTree');
const NODE_PADDING_LEFT = 8;
const DEFAULT_HIDDEN_FILES = [/\/node_modules\//, /\/\.next/, /\/\.astro/];
export const FileTree = memo(({ files = {}, onFileSelect, selectedFile, rootFolder, hideRoot = false, collapsed = false, allowFolderSelection = false, hiddenFiles, className, unsavedFiles, }) => {
    renderLogger.trace('FileTree');
    const computedHiddenFiles = useMemo(() => [...DEFAULT_HIDDEN_FILES, ...(hiddenFiles ?? [])], [hiddenFiles]);
    const fileList = useMemo(() => {
        return buildFileList(files, rootFolder, hideRoot, computedHiddenFiles);
    }, [files, rootFolder, hideRoot, computedHiddenFiles]);
    const [collapsedFolders, setCollapsedFolders] = useState(() => {
        return collapsed
            ? new Set(fileList.filter((item) => item.kind === 'folder').map((item) => item.fullPath))
            : new Set();
    });
    useEffect(() => {
        if (collapsed) {
            setCollapsedFolders(new Set(fileList.filter((item) => item.kind === 'folder').map((item) => item.fullPath)));
            return;
        }
        setCollapsedFolders((prevCollapsed) => {
            const newCollapsed = new Set();
            for (const folder of fileList) {
                if (folder.kind === 'folder' && prevCollapsed.has(folder.fullPath)) {
                    newCollapsed.add(folder.fullPath);
                }
            }
            return newCollapsed;
        });
    }, [fileList, collapsed]);
    const filteredFileList = useMemo(() => {
        const list = [];
        let lastDepth = Number.MAX_SAFE_INTEGER;
        for (const fileOrFolder of fileList) {
            const depth = fileOrFolder.depth;
            // if the depth is equal we reached the end of the collaped group
            if (lastDepth === depth) {
                lastDepth = Number.MAX_SAFE_INTEGER;
            }
            // ignore collapsed folders
            if (collapsedFolders.has(fileOrFolder.fullPath)) {
                lastDepth = Math.min(lastDepth, depth);
            }
            // ignore files and folders below the last collapsed folder
            if (lastDepth < depth) {
                continue;
            }
            list.push(fileOrFolder);
        }
        return list;
    }, [fileList, collapsedFolders]);
    const toggleCollapseState = (fullPath) => {
        setCollapsedFolders((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(fullPath)) {
                newSet.delete(fullPath);
            }
            else {
                newSet.add(fullPath);
            }
            return newSet;
        });
    };
    return (_jsx("div", { className: classNames('text-sm', className), children: filteredFileList.map((fileOrFolder) => {
            switch (fileOrFolder.kind) {
                case 'file': {
                    return (_jsx(File, { selected: selectedFile === fileOrFolder.fullPath, file: fileOrFolder, unsavedChanges: unsavedFiles?.has(fileOrFolder.fullPath), onClick: () => {
                            onFileSelect?.(fileOrFolder.fullPath);
                        } }, fileOrFolder.id));
                }
                case 'folder': {
                    return (_jsx(Folder, { folder: fileOrFolder, selected: allowFolderSelection && selectedFile === fileOrFolder.fullPath, collapsed: collapsedFolders.has(fileOrFolder.fullPath), onClick: () => {
                            toggleCollapseState(fileOrFolder.fullPath);
                        } }, fileOrFolder.id));
                }
                default: {
                    return undefined;
                }
            }
        }) }));
});
export default FileTree;
function Folder({ folder: { depth, name }, collapsed, selected = false, onClick }) {
    return (_jsx(NodeButton, { className: classNames('group', {
            'bg-transparent text-bolt-elements-item-contentDefault hover:text-bolt-elements-item-contentActive hover:bg-bolt-elements-item-backgroundActive': !selected,
            'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': selected,
        }), depth: depth, iconClasses: classNames({
            'i-ph:caret-right scale-98': collapsed,
            'i-ph:caret-down scale-98': !collapsed,
        }), onClick: onClick, children: name }));
}
function File({ file: { depth, name }, onClick, selected, unsavedChanges = false }) {
    return (_jsx(NodeButton, { className: classNames('group', {
            'bg-transparent hover:bg-bolt-elements-item-backgroundActive text-bolt-elements-item-contentDefault': !selected,
            'bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent': selected,
        }), depth: depth, iconClasses: classNames('i-ph:file-duotone scale-98', {
            'group-hover:text-bolt-elements-item-contentActive': !selected,
        }), onClick: onClick, children: _jsxs("div", { className: classNames('flex items-center', {
                'group-hover:text-bolt-elements-item-contentActive': !selected,
            }), children: [_jsx("div", { className: "flex-1 truncate pr-2", children: name }), unsavedChanges && _jsx("span", { className: "i-ph:circle-fill scale-68 shrink-0 text-orange-500" })] }) }));
}
function NodeButton({ depth, iconClasses, onClick, className, children }) {
    return (_jsxs("button", { className: classNames('flex items-center gap-1.5 w-full pr-2 border-2 border-transparent text-faded py-0.5', className), style: { paddingLeft: `${6 + depth * NODE_PADDING_LEFT}px` }, onClick: () => onClick?.(), children: [_jsx("div", { className: classNames('scale-120 shrink-0', iconClasses) }), _jsx("div", { className: "truncate w-full text-left", children: children })] }));
}
function buildFileList(files, rootFolder = '/', hideRoot, hiddenFiles) {
    const folderPaths = new Set();
    const fileList = [];
    let defaultDepth = 0;
    if (rootFolder === '/' && !hideRoot) {
        defaultDepth = 1;
        fileList.push({ kind: 'folder', name: '/', depth: 0, id: 0, fullPath: '/' });
    }
    for (const [filePath, dirent] of Object.entries(files)) {
        const segments = filePath.split('/').filter((segment) => segment);
        const fileName = segments.at(-1);
        if (!fileName || isHiddenFile(filePath, fileName, hiddenFiles)) {
            continue;
        }
        let currentPath = '';
        let i = 0;
        let depth = 0;
        while (i < segments.length) {
            const name = segments[i];
            const fullPath = (currentPath += `/${name}`);
            if (!fullPath.startsWith(rootFolder) || (hideRoot && fullPath === rootFolder)) {
                i++;
                continue;
            }
            if (i === segments.length - 1 && dirent?.type === 'file') {
                fileList.push({
                    kind: 'file',
                    id: fileList.length,
                    name,
                    fullPath,
                    depth: depth + defaultDepth,
                });
            }
            else if (!folderPaths.has(fullPath)) {
                folderPaths.add(fullPath);
                fileList.push({
                    kind: 'folder',
                    id: fileList.length,
                    name,
                    fullPath,
                    depth: depth + defaultDepth,
                });
            }
            i++;
            depth++;
        }
    }
    return sortFileList(rootFolder, fileList, hideRoot);
}
function isHiddenFile(filePath, fileName, hiddenFiles) {
    return hiddenFiles.some((pathOrRegex) => {
        if (typeof pathOrRegex === 'string') {
            return fileName === pathOrRegex;
        }
        return pathOrRegex.test(filePath);
    });
}
/**
 * Sorts the given list of nodes into a tree structure (still a flat list).
 *
 * This function organizes the nodes into a hierarchical structure based on their paths,
 * with folders appearing before files and all items sorted alphabetically within their level.
 *
 * @note This function mutates the given `nodeList` array for performance reasons.
 *
 * @param rootFolder - The path of the root folder to start the sorting from.
 * @param nodeList - The list of nodes to be sorted.
 *
 * @returns A new array of nodes sorted in depth-first order.
 */
function sortFileList(rootFolder, nodeList, hideRoot) {
    logger.trace('sortFileList');
    const nodeMap = new Map();
    const childrenMap = new Map();
    // pre-sort nodes by name and type
    nodeList.sort((a, b) => compareNodes(a, b));
    for (const node of nodeList) {
        nodeMap.set(node.fullPath, node);
        const parentPath = node.fullPath.slice(0, node.fullPath.lastIndexOf('/'));
        if (parentPath !== rootFolder.slice(0, rootFolder.lastIndexOf('/'))) {
            if (!childrenMap.has(parentPath)) {
                childrenMap.set(parentPath, []);
            }
            childrenMap.get(parentPath)?.push(node);
        }
    }
    const sortedList = [];
    const depthFirstTraversal = (path) => {
        const node = nodeMap.get(path);
        if (node) {
            sortedList.push(node);
        }
        const children = childrenMap.get(path);
        if (children) {
            for (const child of children) {
                if (child.kind === 'folder') {
                    depthFirstTraversal(child.fullPath);
                }
                else {
                    sortedList.push(child);
                }
            }
        }
    };
    if (hideRoot) {
        // if root is hidden, start traversal from its immediate children
        const rootChildren = childrenMap.get(rootFolder) || [];
        for (const child of rootChildren) {
            depthFirstTraversal(child.fullPath);
        }
    }
    else {
        depthFirstTraversal(rootFolder);
    }
    return sortedList;
}
function compareNodes(a, b) {
    if (a.kind !== b.kind) {
        return a.kind === 'folder' ? -1 : 1;
    }
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
}
