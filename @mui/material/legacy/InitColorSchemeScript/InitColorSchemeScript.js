import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import SystemInitColorSchemeScript from '@mui/system/InitColorSchemeScript';
import { jsx as _jsx } from "react/jsx-runtime";
export var defaultConfig = {
  attribute: 'data-mui-color-scheme',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'mui-mode'
};
export default (function InitColorSchemeScript(props) {
  return /*#__PURE__*/_jsx(SystemInitColorSchemeScript, _extends({}, defaultConfig, props));
});