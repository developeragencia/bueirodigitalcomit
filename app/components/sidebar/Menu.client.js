import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogButton, DialogDescription, DialogRoot, DialogTitle } from '~/components/ui/Dialog';
import { IconButton } from '~/components/ui/IconButton';
import { ThemeSwitch } from '~/components/ui/ThemeSwitch';
import { db, deleteById, getAll, chatId } from '~/lib/persistence';
import { cubicEasingFn } from '~/utils/easings';
import { logger } from '~/utils/logger';
import { HistoryItem } from './HistoryItem';
import { binDates } from './date-binning';
const menuVariants = {
    closed: {
        opacity: 0,
        visibility: 'hidden',
        left: '-150px',
        transition: {
            duration: 0.2,
            ease: cubicEasingFn,
        },
    },
    open: {
        opacity: 1,
        visibility: 'initial',
        left: 0,
        transition: {
            duration: 0.2,
            ease: cubicEasingFn,
        },
    },
};
export function Menu() {
    const menuRef = useRef(null);
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);
    const loadEntries = useCallback(() => {
        if (db) {
            getAll(db)
                .then((list) => list.filter((item) => item.urlId && item.description))
                .then(setList)
                .catch((error) => toast.error(error.message));
        }
    }, []);
    const deleteItem = useCallback((event, item) => {
        event.preventDefault();
        if (db) {
            deleteById(db, item.id)
                .then(() => {
                loadEntries();
                if (chatId.get() === item.id) {
                    // hard page navigation to clear the stores
                    window.location.pathname = '/';
                }
            })
                .catch((error) => {
                toast.error('Failed to delete conversation');
                logger.error(error);
            });
        }
    }, []);
    const closeDialog = () => {
        setDialogContent(null);
    };
    useEffect(() => {
        if (open) {
            loadEntries();
        }
    }, [open]);
    useEffect(() => {
        const enterThreshold = 40;
        const exitThreshold = 40;
        function onMouseMove(event) {
            if (event.pageX < enterThreshold) {
                setOpen(true);
            }
            if (menuRef.current && event.clientX > menuRef.current.getBoundingClientRect().right + exitThreshold) {
                setOpen(false);
            }
        }
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);
    return (_jsxs(motion.div, { ref: menuRef, initial: "closed", animate: open ? 'open' : 'closed', variants: menuVariants, className: "flex flex-col side-menu fixed top-0 w-[350px] h-full bg-bolt-elements-background-depth-2 border-r rounded-r-3xl border-bolt-elements-borderColor z-sidebar shadow-xl shadow-bolt-elements-sidebar-dropdownShadow text-sm", children: [_jsx("div", { className: "flex items-center h-[var(--header-height)]" }), _jsxs("div", { className: "flex-1 flex flex-col h-full w-full overflow-hidden", children: [_jsx("div", { className: "p-4", children: _jsxs("a", { href: "/", className: "flex gap-2 items-center bg-bolt-elements-sidebar-buttonBackgroundDefault text-bolt-elements-sidebar-buttonText hover:bg-bolt-elements-sidebar-buttonBackgroundHover rounded-md p-2 transition-theme", children: [_jsx("span", { className: "inline-block i-bolt:chat scale-110" }), "Start new chat"] }) }), _jsx("div", { className: "text-bolt-elements-textPrimary font-medium pl-6 pr-5 my-2", children: "Your Chats" }), _jsxs("div", { className: "flex-1 overflow-scroll pl-4 pr-5 pb-5", children: [list.length === 0 && _jsx("div", { className: "pl-2 text-bolt-elements-textTertiary", children: "No previous conversations" }), _jsxs(DialogRoot, { open: dialogContent !== null, children: [binDates(list).map(({ category, items }) => (_jsxs("div", { className: "mt-4 first:mt-0 space-y-1", children: [_jsx("div", { className: "text-bolt-elements-textTertiary sticky top-0 z-1 bg-bolt-elements-background-depth-2 pl-2 pt-2 pb-1", children: category }), items.map((item) => (_jsx(HistoryItem, { item: item, onDelete: () => setDialogContent({ type: 'delete', item }) }, item.id)))] }, category))), _jsx(Dialog, { onBackdrop: closeDialog, onClose: closeDialog, children: dialogContent?.type === 'delete' && (_jsxs(_Fragment, { children: [_jsx(DialogTitle, { children: "Delete Chat?" }), _jsx(DialogDescription, { asChild: true, children: _jsxs("div", { children: [_jsxs("p", { children: ["You are about to delete ", _jsx("strong", { children: dialogContent.item.description }), "."] }), _jsx("p", { className: "mt-1", children: "Are you sure you want to delete this chat?" })] }) }), _jsxs("div", { className: "px-5 pb-4 bg-bolt-elements-background-depth-2 flex gap-2 justify-end", children: [_jsx(DialogButton, { type: "secondary", onClick: closeDialog, children: "Cancel" }), _jsx(DialogButton, { type: "danger", onClick: (event) => {
                                                                deleteItem(event, dialogContent.item);
                                                                closeDialog();
                                                            }, children: "Delete" })] })] })) })] })] }), _jsx("div", { className: "flex items-center border-t border-bolt-elements-borderColor p-4", children: _jsx(ThemeSwitch, { className: "ml-auto" }) })] })] }));
}
