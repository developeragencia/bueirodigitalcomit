import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as RadixDialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import React, { memo } from 'react';
import { classNames } from '~/utils/classNames';
import { cubicEasingFn } from '~/utils/easings';
import { IconButton } from './IconButton';
export { Close as DialogClose, Root as DialogRoot } from '@radix-ui/react-dialog';
const transition = {
    duration: 0.15,
    ease: cubicEasingFn,
};
export const dialogBackdropVariants = {
    closed: {
        opacity: 0,
        transition,
    },
    open: {
        opacity: 1,
        transition,
    },
};
export const dialogVariants = {
    closed: {
        x: '-50%',
        y: '-40%',
        scale: 0.96,
        opacity: 0,
        transition,
    },
    open: {
        x: '-50%',
        y: '-50%',
        scale: 1,
        opacity: 1,
        transition,
    },
};
export const DialogButton = memo(({ type, children, onClick }) => {
    return (_jsx("button", { className: classNames('inline-flex h-[35px] items-center justify-center rounded-lg px-4 text-sm leading-none focus:outline-none', {
            'bg-bolt-elements-button-primary-background text-bolt-elements-button-primary-text hover:bg-bolt-elements-button-primary-backgroundHover': type === 'primary',
            'bg-bolt-elements-button-secondary-background text-bolt-elements-button-secondary-text hover:bg-bolt-elements-button-secondary-backgroundHover': type === 'secondary',
            'bg-bolt-elements-button-danger-background text-bolt-elements-button-danger-text hover:bg-bolt-elements-button-danger-backgroundHover': type === 'danger',
        }), onClick: onClick, children: children }));
});
export const DialogTitle = memo(({ className, children, ...props }) => {
    return (_jsx(RadixDialog.Title, { className: classNames('px-5 py-4 flex items-center justify-between border-b border-bolt-elements-borderColor text-lg font-semibold leading-6 text-bolt-elements-textPrimary', className), ...props, children: children }));
});
export const DialogDescription = memo(({ className, children, ...props }) => {
    return (_jsx(RadixDialog.Description, { className: classNames('px-5 py-4 text-bolt-elements-textPrimary text-md', className), ...props, children: children }));
});
export const Dialog = memo(({ className, children, onBackdrop, onClose }) => {
    return (_jsxs(RadixDialog.Portal, { children: [_jsx(RadixDialog.Overlay, { onClick: onBackdrop, asChild: true, children: _jsx(motion.div, { className: "bg-black/50 fixed inset-0 z-max", initial: "closed", animate: "open", exit: "closed", variants: dialogBackdropVariants }) }), _jsx(RadixDialog.Content, { asChild: true, children: _jsxs(motion.div, { className: classNames('fixed top-[50%] left-[50%] z-max max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] border border-bolt-elements-borderColor rounded-lg bg-bolt-elements-background-depth-2 shadow-lg focus:outline-none overflow-hidden', className), initial: "closed", animate: "open", exit: "closed", variants: dialogVariants, children: [children, _jsx(RadixDialog.Close, { asChild: true, onClick: onClose, children: _jsx(IconButton, { icon: "i-ph:x", className: "absolute top-[10px] right-[10px]" }) })] }) })] }));
});
