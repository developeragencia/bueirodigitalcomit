"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _deepmerge = _interopRequireDefault(require("@mui/utils/deepmerge"));
var _refType = _interopRequireDefault(require("@mui/utils/refType"));
var _InputBase = _interopRequireDefault(require("../InputBase"));
var _styled = _interopRequireWildcard(require("../styles/styled"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _inputClasses = _interopRequireWildcard(require("./inputClasses"));
var _InputBase2 = require("../InputBase/InputBase");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "slotProps", "slots", "type"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ['root', !disableUnderline && 'underline'],
    input: ['input']
  };
  const composedClasses = (0, _composeClasses.default)(slots, _inputClasses.getInputUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};
const InputRoot = (0, _styled.default)(_InputBase2.InputBaseRoot, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [...(0, _InputBase2.rootOverridesResolver)(props, styles), !ownerState.disableUnderline && styles.underline];
  }
})(({
  theme,
  ownerState
}) => {
  const light = theme.palette.mode === 'light';
  let bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  if (theme.vars) {
    bottomLineColor = `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`;
  }
  return (0, _extends2.default)({
    position: 'relative'
  }, ownerState.formControl && {
    'label + &': {
      marginTop: 16
    }
  }, !ownerState.disableUnderline && {
    '&::after': {
      borderBottom: `2px solid ${(theme.vars || theme).palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: 'absolute',
      right: 0,
      transform: 'scaleX(0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: 'none' // Transparent to the hover style.
    },
    [`&.${_inputClasses.default.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: 'scaleX(1) translateX(0)'
    },
    [`&.${_inputClasses.default.error}`]: {
      '&::before, &::after': {
        borderBottomColor: (theme.vars || theme).palette.error.main
      }
    },
    '&::before': {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('border-bottom-color', {
        duration: theme.transitions.duration.shorter
      }),
      pointerEvents: 'none' // Transparent to the hover style.
    },
    [`&:hover:not(.${_inputClasses.default.disabled}, .${_inputClasses.default.error}):before`]: {
      borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        borderBottom: `1px solid ${bottomLineColor}`
      }
    },
    [`&.${_inputClasses.default.disabled}:before`]: {
      borderBottomStyle: 'dotted'
    }
  });
});
const InputInput = (0, _styled.default)(_InputBase2.InputBaseComponent, {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: _InputBase2.inputOverridesResolver
})({});
const Input = /*#__PURE__*/React.forwardRef(function Input(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$input;
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiInput'
  });
  const {
      disableUnderline,
      components = {},
      componentsProps: componentsPropsProp,
      fullWidth = false,
      inputComponent = 'input',
      multiline = false,
      slotProps,
      slots = {},
      type = 'text'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const classes = useUtilityClasses(props);
  const ownerState = {
    disableUnderline
  };
  const inputComponentsProps = {
    root: {
      ownerState
    }
  };
  const componentsProps = (slotProps != null ? slotProps : componentsPropsProp) ? (0, _deepmerge.default)(slotProps != null ? slotProps : componentsPropsProp, inputComponentsProps) : inputComponentsProps;
  const RootSlot = (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : InputRoot;
  const InputSlot = (_ref2 = (_slots$input = slots.input) != null ? _slots$input : components.Input) != null ? _ref2 : InputInput;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputBase.default, (0, _extends2.default)({
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps: componentsProps,
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? Input.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: _propTypes.default.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: _propTypes.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['primary', 'secondary']), _propTypes.default.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: _propTypes.default.shape({
    Input: _propTypes.default.elementType,
    Root: _propTypes.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: _propTypes.default.shape({
    input: _propTypes.default.object,
    root: _propTypes.default.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline: _propTypes.default.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: _propTypes.default.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: _propTypes.default.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,
  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: _propTypes.default.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: _propTypes.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _refType.default,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: _propTypes.default.oneOf(['dense', 'none']),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: _propTypes.default.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: _propTypes.default.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: _propTypes.default.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: _propTypes.default.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    input: _propTypes.default.object,
    root: _propTypes.default.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: _propTypes.default.shape({
    input: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: _propTypes.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: _propTypes.default.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: _propTypes.default.any
} : void 0;
Input.muiName = 'Input';
var _default = exports.default = Input;