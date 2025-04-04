import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getPopperUtilityClass(slot) {
  return generateUtilityClass('MuiPopper', slot);
}
var popperClasses = generateUtilityClasses('MuiPopper', ['root']);
export default popperClasses;