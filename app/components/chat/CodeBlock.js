import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useState } from 'react';
import { bundledLanguages, codeToHtml, isSpecialLang } from 'shiki';
import { classNames } from '~/utils/classNames';
import { createScopedLogger } from '~/utils/logger';
import styles from './CodeBlock.module.scss';
const logger = createScopedLogger('CodeBlock');
export const CodeBlock = memo(({ className, code, language = 'plaintext', theme = 'dark-plus', disableCopy = false }) => {
    const [html, setHTML] = useState(undefined);
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        if (copied) {
            return;
        }
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    useEffect(() => {
        if (language && !isSpecialLang(language) && !(language in bundledLanguages)) {
            logger.warn(`Unsupported language '${language}'`);
        }
        logger.trace(`Language = ${language}`);
        const processCode = async () => {
            setHTML(await codeToHtml(code, { lang: language, theme }));
        };
        processCode();
    }, [code]);
    return (_jsxs("div", { className: classNames('relative group text-left', className), children: [_jsx("div", { className: classNames(styles.CopyButtonContainer, 'bg-white absolute top-[10px] right-[10px] rounded-md z-10 text-lg flex items-center justify-center opacity-0 group-hover:opacity-100', {
                    'rounded-l-0 opacity-100': copied,
                }), children: !disableCopy && (_jsx("button", { className: classNames('flex items-center bg-transparent p-[6px] justify-center before:bg-white before:rounded-l-md before:text-gray-500 before:border-r before:border-gray-300', {
                        'before:opacity-0': !copied,
                        'before:opacity-100': copied,
                    }), title: "Copy Code", onClick: () => copyToClipboard(), children: _jsx("div", { className: "i-ph:clipboard-text-duotone" }) })) }), _jsx("div", { dangerouslySetInnerHTML: { __html: html ?? '' } })] }));
});
