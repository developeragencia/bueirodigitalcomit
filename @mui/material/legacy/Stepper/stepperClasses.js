import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getStepperUtilityClass(slot) {
  return generateUtilityClass('MuiStepper', slot);
}
var stepperClasses = generateUtilityClasses('MuiStepper', ['root', 'horizontal', 'vertical', 'nonLinear', 'alternativeLabel']);
export default stepperClasses;