import * as consts from './constants';

export function getElements(elementArray, type) {
  if(type === 'string') {
    let retString = '';
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