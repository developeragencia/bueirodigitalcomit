import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from '@nanostores/react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import tailwindReset from '@unocss/reset/tailwind-compat.css?url';
import { themeStore } from './lib/stores/theme';
import { stripIndents } from './utils/stripIndent';
import { createHead } from 'remix-island';
import { useEffect } from 'react';
import reactToastifyStyles from 'react-toastify/dist/ReactToastify.css?url';
import globalStyles from './styles/index.scss?url';
import xtermStyles from '@xterm/xterm/css/xterm.css?url';
import 'virtual:uno.css';
export const links = () => [
    {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
    },
    { rel: 'stylesheet', href: reactToastifyStyles },
    { rel: 'stylesheet', href: tailwindReset },
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: xtermStyles },
    {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
    },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
];
const inlineThemeCode = stripIndents `
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('bolt_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
`;
export const Head = createHead(() => (_jsxs(_Fragment, { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx(Meta, {}), _jsx(Links, {}), _jsx("script", { dangerouslySetInnerHTML: { __html: inlineThemeCode } })] })));
export function Layout({ children }) {
    const theme = useStore(themeStore);
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);
    return (_jsxs(_Fragment, { children: [children, _jsx(ScrollRestoration, {}), _jsx(Scripts, {})] }));
}
export default function App() {
    return _jsx(Outlet, {});
}
