"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SliderValueLabel = exports.SliderTrack = exports.SliderThumb = exports.SliderRoot = exports.SliderRail = exports.SliderMarkLabel = exports.SliderMark = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _chainPropTypes = _interopRequireDefault(require("@mui/utils/chainPropTypes"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _colorManipulator = require("@mui/system/colorManipulator");
var _RtlProvider = require("@mui/system/RtlProvider");
var _useSlotProps = _interopRequireDefault(require("@mui/utils/useSlotProps"));
var _isHostComponent = _interopRequireDefault(require("@mui/utils/isHostComponent"));
var _useSlider = require("./useSlider");
var _zeroStyled = require("../zero-styled");
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _slotShouldForwardProp = _interopRequireDefault(require("../styles/slotShouldForwardProp"));
var _shouldSpreadAdditionalProps = _interopRequireDefault(require("../utils/shouldSpreadAdditionalProps"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _SliderValueLabel = _interopRequireDefault(require("./SliderValueLabel"));
var _sliderClasses = _interopRequireWildcard(require("./sliderClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["aria-label", "aria-valuetext", "aria-labelledby", "component", "components", "componentsProps", "color", "classes", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "shiftStep", "size", "step", "scale", "slotProps", "slots", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Identity(x) {
  return x;
}
const SliderRoot = exports.SliderRoot = (0, _zeroStyled.styled)('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`color${(0, _capitalize.default)(ownerState.color)}`], ownerState.size !== 'medium' && styles[`size${(0, _capitalize.default)(ownerState.size)}`], ownerState.marked && styles.marked, ownerState.orientation === 'vertical' && styles.vertical, ownerState.track === 'inverted' && styles.trackInverted, ownerState.track === false && styles.trackFalse];
  }
})(({
  theme
}) => {
  var _theme$vars;
  return {
    borderRadius: 12,
    boxSizing: 'content-box',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    WebkitTapHighlightColor: 'transparent',
    '@media print': {
      colorAdjust: 'exact'
    },
    [`&.${_sliderClasses.default.disabled}`]: {
      pointerEvents: 'none',
      cursor: 'default',
      color: (theme.vars || theme).palette.grey[400]
    },
    [`&.${_sliderClasses.default.dragging}`]: {
      [`& .${_sliderClasses.default.thumb}, & .${_sliderClasses.default.track}`]: {
        transition: 'none'
      }
    },
    variants: [...Object.keys(((_theme$vars = theme.vars) != null ? _theme$vars : theme).palette).filter(key => {
      var _theme$vars2;
      return ((_theme$vars2 = theme.vars) != null ? _theme$vars2 : theme).palette[key].main;
    }).map(color => ({
      props: {
        color
      },
      style: {
        color: (theme.vars || theme).palette[color].main
      }
    })), {
      props: {
        orientation: 'horizontal'
      },
      style: {
        height: 4,
        width: '100%',
        padding: '13px 0',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '20px 0'
        }
      }
    }, {
      props: {
        orientation: 'horizontal',
        size: 'small'
      },
      style: {
        height: 2
      }
    }, {
      props: {
        orientation: 'horizontal',
        marked: true
      },
      style: {
        marginBottom: 20
      }
    }, {
      props: {
        orientation: 'vertical'
      },
      style: {
        height: '100%',
        width: 4,
        padding: '0 13px',
        // The primary input mechanism of the device includes a pointing device of limited accuracy.
        '@media (pointer: coarse)': {
          // Reach 42px touch target, about ~8mm on screen.
          padding: '0 20px'
        }
      }
    }, {
      props: {
        orientation: 'vertical',
        size: 'small'
      },
      style: {
        width: 2
      }
    }, {
      props: {
        orientation: 'vertical',
        marked: true
      },
      style: {
        marginRight: 44
      }
    }]
  };
});
const SliderRail = exports.SliderRail = (0, _zeroStyled.styled)('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail
})({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      width: '100%',
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }, {
    props: {
      orientation: 'vertical'
    },
    style: {
      height: '100%',
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, {
    props: {
      track: 'inverted'
    },
    style: {
      opacity: 1
    }
  }]
});
const SliderTrack = exports.SliderTrack = (0, _zeroStyled.styled)('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track
})(({
  theme
}) => {
  var _theme$vars3;
  return {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest
    }),
    variants: [{
      props: {
        size: 'small'
      },
      style: {
        border: 'none'
      }
    }, {
      props: {
        orientation: 'horizontal'
      },
      style: {
        height: 'inherit',
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }, {
      props: {
        orientation: 'vertical'
      },
      style: {
        width: 'inherit',
        left: '50%',
        transform: 'translateX(-50%)'
      }
    }, {
      props: {
        track: false
      },
      style: {
        display: 'none'
      }
    }, ...Object.keys(((_theme$vars3 = theme.vars) != null ? _theme$vars3 : theme).palette).filter(key => {
      var _theme$vars4;
      return ((_theme$vars4 = theme.vars) != null ? _theme$vars4 : theme).palette[key].main;
    }).map(color => ({
      props: {
        color,
        track: 'inverted'
      },
      style: (0, _extends2.default)({}, theme.vars ? {
        backgroundColor: theme.vars.palette.Slider[`${color}Track`],
        borderColor: theme.vars.palette.Slider[`${color}Track`]
      } : (0, _extends2.default)({
        backgroundColor: (0, _colorManipulator.lighten)(theme.palette[color].main, 0.62),
        borderColor: (0, _colorManipulator.lighten)(theme.palette[color].main, 0.62)
      }, theme.applyStyles('dark', {
        backgroundColor: (0, _colorManipulator.darken)(theme.palette[color].main, 0.5)
      }), theme.applyStyles('dark', {
        borderColor: (0, _colorManipulator.darken)(theme.palette[color].main, 0.5)
      })))
    }))]
  };
});
const SliderThumb = exports.SliderThumb = (0, _zeroStyled.styled)('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.thumb, styles[`thumbColor${(0, _capitalize.default)(ownerState.color)}`], ownerState.size !== 'medium' && styles[`thumbSize${(0, _capitalize.default)(ownerState.size)}`]];
  }
})(({
  theme
}) => {
  var _theme$vars5;
  return {
    position: 'absolute',
    width: 20,
    height: 20,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
      duration: theme.transitions.duration.shortest
    }),
    '&::before': {
      position: 'absolute',
      content: '""',
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      boxShadow: (theme.vars || theme).shadows[2]
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // 42px is the hit target
      width: 42,
      height: 42,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    [`&.${_sliderClasses.default.disabled}`]: {
      '&:hover': {
        boxShadow: 'none'
      }
    },
    variants: [{
      props: {
        size: 'small'
      },
      style: {
        width: 12,
        height: 12,
        '&::before': {
          boxShadow: 'none'
        }
      }
    }, {
      props: {
        orientation: 'horizontal'
      },
      style: {
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }, {
      props: {
        orientation: 'vertical'
      },
      style: {
        left: '50%',
        transform: 'translate(-50%, 50%)'
      }
    }, ...Object.keys(((_theme$vars5 = theme.vars) != null ? _theme$vars5 : theme).palette).filter(key => {
      var _theme$vars6;
      return ((_theme$vars6 = theme.vars) != null ? _theme$vars6 : theme).palette[key].main;
    }).map(color => ({
      props: {
        color
      },
      style: {
        [`&:hover, &.${_sliderClasses.default.focusVisible}`]: (0, _extends2.default)({}, theme.vars ? {
          boxShadow: `0px 0px 0px 8px rgba(${theme.vars.palette[color].mainChannel} / 0.16)`
        } : {
          boxShadow: `0px 0px 0px 8px ${(0, _colorManipulator.alpha)(theme.palette[color].main, 0.16)}`
        }, {
          '@media (hover: none)': {
            boxShadow: 'none'
          }
        }),
        [`&.${_sliderClasses.default.active}`]: (0, _extends2.default)({}, theme.vars ? {
          boxShadow: `0px 0px 0px 14px rgba(${theme.vars.palette[color].mainChannel} / 0.16)`
        } : {
          boxShadow: `0px 0px 0px 14px ${(0, _colorManipulator.alpha)(theme.palette[color].main, 0.16)}`
        })
      }
    }))]
  };
});
const SliderValueLabel = exports.SliderValueLabel = (0, _zeroStyled.styled)(_SliderValueLabel.default, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel
})(({
  theme
}) => (0, _extends2.default)({
  zIndex: 1,
  whiteSpace: 'nowrap'
}, theme.typography.body2, {
  fontWeight: 500,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shortest
  }),
  position: 'absolute',
  backgroundColor: (theme.vars || theme).palette.grey[600],
  borderRadius: 2,
  color: (theme.vars || theme).palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      transform: 'translateY(-100%) scale(0)',
      top: '-10px',
      transformOrigin: 'bottom center',
      '&::before': {
        position: 'absolute',
        content: '""',
        width: 8,
        height: 8,
        transform: 'translate(-50%, 50%) rotate(45deg)',
        backgroundColor: 'inherit',
        bottom: 0,
        left: '50%'
      },
      [`&.${_sliderClasses.default.valueLabelOpen}`]: {
        transform: 'translateY(-100%) scale(1)'
      }
    }
  }, {
    props: {
      orientation: 'vertical'
    },
    style: {
      transform: 'translateY(-50%) scale(0)',
      right: '30px',
      top: '50%',
      transformOrigin: 'right center',
      '&::before': {
        position: 'absolute',
        content: '""',
        width: 8,
        height: 8,
        transform: 'translate(-50%, -50%) rotate(45deg)',
        backgroundColor: 'inherit',
        right: -8,
        top: '50%'
      },
      [`&.${_sliderClasses.default.valueLabelOpen}`]: {
        transform: 'translateY(-50%) scale(1)'
      }
    }
  }, {
    props: {
      size: 'small'
    },
    style: {
      fontSize: theme.typography.pxToRem(12),
      padding: '0.25rem 0.5rem'
    }
  }, {
    props: {
      orientation: 'vertical',
      size: 'small'
    },
    style: {
      right: '20px'
    }
  }]
}));
const SliderMark = exports.SliderMark = (0, _zeroStyled.styled)('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: prop => (0, _slotShouldForwardProp.default)(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => {
    const {
      markActive
    } = props;
    return [styles.mark, markActive && styles.markActive];
  }
})(({
  theme
}) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      top: '50%',
      transform: 'translate(-1px, -50%)'
    }
  }, {
    props: {
      orientation: 'vertical'
    },
    style: {
      left: '50%',
      transform: 'translate(-50%, 1px)'
    }
  }, {
    props: {
      markActive: true
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      opacity: 0.8
    }
  }]
}));
const SliderMarkLabel = exports.SliderMarkLabel = (0, _zeroStyled.styled)('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: prop => (0, _slotShouldForwardProp.default)(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body2, {
  color: (theme.vars || theme).palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  variants: [{
    props: {
      orientation: 'horizontal'
    },
    style: {
      top: 30,
      transform: 'translateX(-50%)',
      '@media (pointer: coarse)': {
        top: 40
      }
    }
  }, {
    props: {
      orientation: 'vertical'
    },
    style: {
      left: 36,
      transform: 'translateY(50%)',
      '@media (pointer: coarse)': {
        left: 44
      }
    }
  }, {
    props: {
      markLabelActive: true
    },
    style: {
      color: (theme.vars || theme).palette.text.primary
    }
  }]
}));
const useUtilityClasses = ownerState => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track,
    classes,
    color,
    size
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', dragging && 'dragging', marked && 'marked', orientation === 'vertical' && 'vertical', track === 'inverted' && 'trackInverted', track === false && 'trackFalse', color && `color${(0, _capitalize.default)(color)}`, size && `size${(0, _capitalize.default)(size)}`],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled', size && `thumbSize${(0, _capitalize.default)(size)}`, color && `thumbColor${(0, _capitalize.default)(color)}`],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible']
  };
  return (0, _composeClasses.default)(slots, _sliderClasses.getSliderUtilityClass, classes);
};
const Forward = ({
  children
}) => children;
const Slider = /*#__PURE__*/React.forwardRef(function Slider(inputProps, ref) {
  var _ref, _slots$root, _ref2, _slots$rail, _ref3, _slots$track, _ref4, _slots$thumb, _ref5, _slots$valueLabel, _ref6, _slots$mark, _ref7, _slots$markLabel, _ref8, _slots$input, _slotProps$root, _slotProps$rail, _slotProps$track, _slotProps$thumb, _slotProps$valueLabel, _slotProps$mark, _slotProps$markLabel, _slotProps$input;
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inputProps,
    name: 'MuiSlider'
  });
  const isRtl = (0, _RtlProvider.useRtl)();
  const {
      'aria-label': ariaLabel,
      'aria-valuetext': ariaValuetext,
      'aria-labelledby': ariaLabelledby,
      // eslint-disable-next-line react/prop-types
      component = 'span',
      components = {},
      componentsProps = {},
      color = 'primary',
      classes: classesProp,
      className,
      disableSwap = false,
      disabled = false,
      getAriaLabel,
      getAriaValueText,
      marks: marksProp = false,
      max = 100,
      min = 0,
      orientation = 'horizontal',
      shiftStep = 10,
      size = 'medium',
      step = 1,
      scale = Identity,
      slotProps,
      slots,
      track = 'normal',
      valueLabelDisplay = 'off',
      valueLabelFormat = Identity
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    isRtl,
    max,
    min,
    classes: classesProp,
    disabled,
    disableSwap,
    orientation,
    marks: marksProp,
    color,
    size,
    step,
    shiftStep,
    scale,
    track,
    valueLabelDisplay,
    valueLabelFormat
  });
  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    focusedThumbIndex,
    range,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle
  } = (0, _useSlider.useSlider)((0, _extends2.default)({}, ownerState, {
    rootRef: ref
  }));
  ownerState.marked = marks.length > 0 && marks.some(mark => mark.label);
  ownerState.dragging = dragging;
  ownerState.focusedThumbIndex = focusedThumbIndex;
  const classes = useUtilityClasses(ownerState);

  // support both `slots` and `components` for backward compatibility
  const RootSlot = (_ref = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : components.Root) != null ? _ref : SliderRoot;
  const RailSlot = (_ref2 = (_slots$rail = slots == null ? void 0 : slots.rail) != null ? _slots$rail : components.Rail) != null ? _ref2 : SliderRail;
  const TrackSlot = (_ref3 = (_slots$track = slots == null ? void 0 : slots.track) != null ? _slots$track : components.Track) != null ? _ref3 : SliderTrack;
  const ThumbSlot = (_ref4 = (_slots$thumb = slots == null ? void 0 : slots.thumb) != null ? _slots$thumb : components.Thumb) != null ? _ref4 : SliderThumb;
  const ValueLabelSlot = (_ref5 = (_slots$valueLabel = slots == null ? void 0 : slots.valueLabel) != null ? _slots$valueLabel : components.ValueLabel) != null ? _ref5 : SliderValueLabel;
  const MarkSlot = (_ref6 = (_slots$mark = slots == null ? void 0 : slots.mark) != null ? _slots$mark : components.Mark) != null ? _ref6 : SliderMark;
  const MarkLabelSlot = (_ref7 = (_slots$markLabel = slots == null ? void 0 : slots.markLabel) != null ? _slots$markLabel : components.MarkLabel) != null ? _ref7 : SliderMarkLabel;
  const InputSlot = (_ref8 = (_slots$input = slots == null ? void 0 : slots.input) != null ? _slots$input : components.Input) != null ? _ref8 : 'input';
  const rootSlotProps = (_slotProps$root = slotProps == null ? void 0 : slotProps.root) != null ? _slotProps$root : componentsProps.root;
  const railSlotProps = (_slotProps$rail = slotProps == null ? void 0 : slotProps.rail) != null ? _slotProps$rail : componentsProps.rail;
  const trackSlotProps = (_slotProps$track = slotProps == null ? void 0 : slotProps.track) != null ? _slotProps$track : componentsProps.track;
  const thumbSlotProps = (_slotProps$thumb = slotProps == null ? void 0 : slotProps.thumb) != null ? _slotProps$thumb : componentsProps.thumb;
  const valueLabelSlotProps = (_slotProps$valueLabel = slotProps == null ? void 0 : slotProps.valueLabel) != null ? _slotProps$valueLabel : componentsProps.valueLabel;
  const markSlotProps = (_slotProps$mark = slotProps == null ? void 0 : slotProps.mark) != null ? _slotProps$mark : componentsProps.mark;
  const markLabelSlotProps = (_slotProps$markLabel = slotProps == null ? void 0 : slotProps.markLabel) != null ? _slotProps$markLabel : componentsProps.markLabel;
  const inputSlotProps = (_slotProps$input = slotProps == null ? void 0 : slotProps.input) != null ? _slotProps$input : componentsProps.input;
  const rootProps = (0, _useSlotProps.default)({
    elementType: RootSlot,
    getSlotProps: getRootProps,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: (0, _extends2.default)({}, (0, _shouldSpreadAdditionalProps.default)(RootSlot) && {
      as: component
    }),
    ownerState: (0, _extends2.default)({}, ownerState, rootSlotProps == null ? void 0 : rootSlotProps.ownerState),
    className: [classes.root, className]
  });
  const railProps = (0, _useSlotProps.default)({
    elementType: RailSlot,
    externalSlotProps: railSlotProps,
    ownerState,
    className: classes.rail
  });
  const trackProps = (0, _useSlotProps.default)({
    elementType: TrackSlot,
    externalSlotProps: trackSlotProps,
    additionalProps: {
      style: (0, _extends2.default)({}, axisProps[axis].offset(trackOffset), axisProps[axis].leap(trackLeap))
    },
    ownerState: (0, _extends2.default)({}, ownerState, trackSlotProps == null ? void 0 : trackSlotProps.ownerState),
    className: classes.track
  });
  const thumbProps = (0, _useSlotProps.default)({
    elementType: ThumbSlot,
    getSlotProps: getThumbProps,
    externalSlotProps: thumbSlotProps,
    ownerState: (0, _extends2.default)({}, ownerState, thumbSlotProps == null ? void 0 : thumbSlotProps.ownerState),
    className: classes.thumb
  });
  const valueLabelProps = (0, _useSlotProps.default)({
    elementType: ValueLabelSlot,
    externalSlotProps: valueLabelSlotProps,
    ownerState: (0, _extends2.default)({}, ownerState, valueLabelSlotProps == null ? void 0 : valueLabelSlotProps.ownerState),
    className: classes.valueLabel
  });
  const markProps = (0, _useSlotProps.default)({
    elementType: MarkSlot,
    externalSlotProps: markSlotProps,
    ownerState,
    className: classes.mark
  });
  const markLabelProps = (0, _useSlotProps.default)({
    elementType: MarkLabelSlot,
    externalSlotProps: markLabelSlotProps,
    ownerState,
    className: classes.markLabel
  });
  const inputSliderProps = (0, _useSlotProps.default)({
    elementType: InputSlot,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: inputSlotProps,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(RootSlot, (0, _extends2.default)({}, rootProps, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RailSlot, (0, _extends2.default)({}, railProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(TrackSlot, (0, _extends2.default)({}, trackProps)), marks.filter(mark => mark.value >= min && mark.value <= max).map((mark, index) => {
      const percent = (0, _useSlider.valueToPercent)(mark.value, min, max);
      const style = axisProps[axis].offset(percent);
      let markActive;
      if (track === false) {
        markActive = values.indexOf(mark.value) !== -1;
      } else {
        markActive = track === 'normal' && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === 'inverted' && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MarkSlot, (0, _extends2.default)({
          "data-index": index
        }, markProps, !(0, _isHostComponent.default)(MarkSlot) && {
          markActive
        }, {
          style: (0, _extends2.default)({}, style, markProps.style),
          className: (0, _clsx.default)(markProps.className, markActive && classes.markActive)
        })), mark.label != null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MarkLabelSlot, (0, _extends2.default)({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !(0, _isHostComponent.default)(MarkLabelSlot) && {
          markLabelActive: markActive
        }, {
          style: (0, _extends2.default)({}, style, markLabelProps.style),
          className: (0, _clsx.default)(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, index);
    }), values.map((value, index) => {
      const percent = (0, _useSlider.valueToPercent)(value, min, max);
      const style = axisProps[axis].offset(percent);
      const ValueLabelComponent = valueLabelDisplay === 'off' ? Forward : ValueLabelSlot;
      return (
        /*#__PURE__*/
        /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
        (0, _jsxRuntime.jsx)(ValueLabelComponent, (0, _extends2.default)({}, !(0, _isHostComponent.default)(ValueLabelComponent) && {
          valueLabelFormat,
          valueLabelDisplay,
          value: typeof valueLabelFormat === 'function' ? valueLabelFormat(scale(value), index) : valueLabelFormat,
          index,
          open: open === index || active === index || valueLabelDisplay === 'on',
          disabled
        }, valueLabelProps, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ThumbSlot, (0, _extends2.default)({
            "data-index": index
          }, thumbProps, {
            className: (0, _clsx.default)(classes.thumb, thumbProps.className, active === index && classes.active, focusedThumbIndex === index && classes.focusVisible),
            style: (0, _extends2.default)({}, style, getThumbStyle(index), thumbProps.style),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(InputSlot, (0, _extends2.default)({
              "data-index": index,
              "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
              "aria-valuenow": scale(value),
              "aria-labelledby": ariaLabelledby,
              "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
              value: values[index]
            }, inputSliderProps))
          }))
        }), index)
      );
    })]
  }));
});
process.env.NODE_ENV !== "production" ? Slider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  'aria-label': (0, _chainPropTypes.default)(_propTypes.default.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props['aria-label'] != null) {
      return new Error('MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.');
    }
    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': _propTypes.default.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': (0, _chainPropTypes.default)(_propTypes.default.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);
    if (range && props['aria-valuetext'] != null) {
      return new Error('MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.');
    }
    return null;
  }),
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  components: _propTypes.default.shape({
    Input: _propTypes.default.elementType,
    Mark: _propTypes.default.elementType,
    MarkLabel: _propTypes.default.elementType,
    Rail: _propTypes.default.elementType,
    Root: _propTypes.default.elementType,
    Thumb: _propTypes.default.elementType,
    Track: _propTypes.default.elementType,
    ValueLabel: _propTypes.default.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  componentsProps: _propTypes.default.shape({
    input: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    mark: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    markLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    rail: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    thumb: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    track: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    valueLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
      children: _propTypes.default.element,
      className: _propTypes.default.string,
      open: _propTypes.default.bool,
      style: _propTypes.default.object,
      value: _propTypes.default.number,
      valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on'])
    })])
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: _propTypes.default.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: _propTypes.default.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: _propTypes.default.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node,
    value: _propTypes.default.number.isRequired
  })), _propTypes.default.bool]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: _propTypes.default.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: _propTypes.default.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: _propTypes.default.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: _propTypes.default.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: _propTypes.default.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: _propTypes.default.number,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['small', 'medium']), _propTypes.default.string]),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    input: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    mark: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    markLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    rail: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    thumb: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    track: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    valueLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
      children: _propTypes.default.element,
      className: _propTypes.default.string,
      open: _propTypes.default.bool,
      style: _propTypes.default.object,
      value: _propTypes.default.number,
      valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on'])
    })])
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    input: _propTypes.default.elementType,
    mark: _propTypes.default.elementType,
    markLabel: _propTypes.default.elementType,
    rail: _propTypes.default.elementType,
    root: _propTypes.default.elementType,
    thumb: _propTypes.default.elementType,
    track: _propTypes.default.elementType,
    valueLabel: _propTypes.default.elementType
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: _propTypes.default.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: _propTypes.default.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: _propTypes.default.oneOf(['inverted', 'normal', false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string])
} : void 0;
var _default = exports.default = Slider;