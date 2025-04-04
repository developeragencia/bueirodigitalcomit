import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getMenuUtilityClass(slot) {
  return generateUtilityClass('MuiMenu', slot);
}
var menuClasses = generateUtilityClasses('MuiMenu', ['root', 'paper', 'list']);
export default menuClasses;