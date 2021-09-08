import * as consts from './constants';

/**
 * 
 * @param {*} elementArray 
 * @param {*} retType - the return type you want - either string or array
 * @returns 
 */
export function getElements(elementArray, retType) {
  if(retType === 'string') {
    let retString = '';
    if(elementArray.length === 0) {
      return 'None';
    }
    elementArray.forEach((element, index) => {
      if(index === elementArray.length-1) {
        retString += consts.ELEMENTS[element];
      }
      else {
        retString += `${consts.ELEMENTS[element]}, `;
      }
    });
    return retString;
  }
  return elementArray.map(element => consts.ELEMENTS[element]);
}

export function getDamageType(dmgTypeNum) {
  return consts.DAMAGE_TYPES[dmgTypeNum];
}

export function getTargetType(targetNum) {
  return consts.TARGET_TYPES[targetNum];
}

export function handleErrors(response) {
  console.log('handleErrors');
  console.log(response);
  if (!response.ok) {
      console.log('not ok');
      throw Error(response.statusText);
  }
  return response;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}