import { jsx as _jsx } from "react/jsx-runtime";
import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
startTransition(() => {
    hydrateRoot(document.getElementById('root'), _jsx(RemixBrowser, {}));
});
