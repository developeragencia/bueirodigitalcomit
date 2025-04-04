import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getCardActionAreaUtilityClass(slot) {
  return generateUtilityClass('MuiCardActionArea', slot);
}
var cardActionAreaClasses = generateUtilityClasses('MuiCardActionArea', ['root', 'focusVisible', 'focusHighlight']);
export default cardActionAreaClasses;