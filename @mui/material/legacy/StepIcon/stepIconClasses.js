import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getStepIconUtilityClass(slot) {
  return generateUtilityClass('MuiStepIcon', slot);
}
var stepIconClasses = generateUtilityClasses('MuiStepIcon', ['root', 'active', 'completed', 'error', 'text']);
export default stepIconClasses;