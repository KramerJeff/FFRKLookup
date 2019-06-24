import * as consts from '/scripts/constants.js';
"use strict";

/**
 * This function will format the Soul Break JSON into a human-readable result.
 * @param json - the JSON from the API query
 * @returns HTML formatted string to represent the Soul Break
 * TODO add if the relic gives +element? relicName and relicId are provided
 */
export function formatSBJSON(json) {
  let html = "<div class='sb-result'>";
  let name = `<div class='sb'><h3 class='sb__name'>${json.description}`;
  name += (json.isInGlobal) ? `</h3>` : ` (JP)</h3>`;
  let icon = "<div class='sb__content'><img class='sb__icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = `<div class='sb__text'><p class='sb__effect'>${json.effects}</p>`;
  let entry = `<div class='flex'><span class='margin-right entry__castTime'><b>Element:</b> ${formatElements(json)}</span><span class='entry__elements'></span></div><div class='flex'><span class='margin-right entry__castTime'><b>Multiplier:</b> ${json.multiplier}</span><span class='entry__elements'><b>Cast Time:</b> ${json.castTime}</span></div><div class='flex'><span class='margin-right entry__castTime'><b>Target:</b> ${consts.targetTypeDict[json.targetType]}</span><span class='entry__elements'><b>Type:</b> ${consts.damageFormulaDict[json.damageFormulaType]}</span></div></div></div></div>`;

  let commands = "";
  let statuses = "";
  let otherEffects = "";
  let braveActions = "";
  if(json.commands.length !== 0) {
    commands = getCommands(json.commands);
  }
  if(json.statuses) {
    let statusArr = findStatusInText(json.effects);
    statuses = getSBStatuses(json.statuses, json.braveActions, statusArr);
  }
  if(json.otherEffects) {
    otherEffects = getOtherEffects(json.otherEffects);
  }

  //braveCondition in braveActions specifies how to increment Brave
  html += name + icon + effect + entry + statuses + otherEffects + commands + "</div>";
  return html;
}

/**
 * Formats the HTML for the BSB commands
 * @param cmdArr - the array containing the JSON for the BSB commands
 */
function getCommands(cmdArr) {
    let commands = "";
    for(let i = 0; i < cmdArr.length; i++) {
      commands += "<div class='cmd'>";
      //TODO create container for these so they never overlap
      commands += "<img class='cmd__icon' src='" + cmdArr[i].imagePath.split('"')[0] + "'/>";
      commands += `<div class='cmd__text'><p class='cmd__effect'>${cmdArr[i].effects}</p>`; //TODO SEARCH FOR STATUS

      //School and Elements
      commands += "<div class='flex'>";
      commands += `<span class='margin-right'><b>Elements:</b> ${formatElements(cmdArr[i])}</span>`;
      commands += `<span><b>School:</b> ${consts.schoolDict[cmdArr[i].school]}</span>`;

      commands += "</div>";

      commands += `<div class='flex'><span class='margin-right'><b>Multiplier:</b> ${cmdArr[i].multiplier}</span>`;
      commands += `<span><b>Cast Time:</b> ${cmdArr[i].castTime}</span></div>`;

      //Multiplier and Cast Time
      commands += "<div class='flex'>";

      commands += `<span class='margin-right'><b>Target:</b> ${consts.targetTypeDict[cmdArr[i].targetType]}</span>`;
      commands += `<span><b>Type:</b> ${consts.damageFormulaDict[cmdArr[i].damageFormulaType]}</span></div></div>`;

      commands += "</div>";
    }

    return commands;
}

//returns an array of status names
function findStatusInText(text) {
  let arr = [];
  if(text.includes("grants")) {
    arr = text.split("grants")[1].split("to")[0].split(","); //TODO lookout for statuses with commas in them
    if(arr[arr.length-1].includes('and')) { //if there's an and
      arr.push(arr[arr.length-1].split('and')[1]); //push last status on end of array
      arr[arr.length-2] = arr[arr.length-2].split('and')[0]; //fix 2nd to last status
    }
    for(let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim(); //get rid of whitespace
    }
  }
  return arr;
}

/**
 * Format the HTML for the SB statuses in the JSON
 * @param statusJson -
 * @param braveJson -
 * @param statusArr - array to check against retrieved from SB text
 */
function getSBStatuses(statusJson, braveJson, statusArr) {
    let statuses = "<div class='status'>";

    for(let i = 0; i < statusJson.length; i++) {
      //List so far: Poison, Minor Resist Dark (Resist?), KO, Instant KO, Protect, Shell, Magical Blink, Astra, Instant Cast

      if(statusJson[i].description === "Brave Mode") {
        statuses += "<span class='status__name'>" + statusJson[i].description + "</span>";

        if(braveJson[0]) {
          statuses += "<p class='braveMode__condition'>Condition - " + braveJson[0].braveCondition + "</p>";
          statuses += "<div class='flex'><span class='margin-right braveMode__castTime'>Cast Time - " + braveJson[0].castTime + "</span>";
          statuses += "<span class='braveMode__elements'>";
          statuses += formatElements(braveJson[0]);
          statuses += "</span></div>";
          for(let j = 0; j < braveJson.length; j++) {
            if(j === 0) {
              statuses += "<p class='braveMode__desc'>" + braveJson[j].braveActionName + "</p>";
            }
            statuses += "<p class='braveMode__effects'>" + braveJson[j].braveLevel + " - " + braveJson[j].effects + "</p>";
          }
        }
      }
      else if(statusAllowed(statusJson[i].description)) { //make sure status is not 'blacklisted'
        statuses += "<span class='status__name'>" + statusJson[i].description + "</span>";
        statuses += "<p class='status__effect'>" + statusJson[i].effects + "</p>";
      }
    }
    statuses += "</div>";
    return statuses;
}

function getOtherEffects(jsonArr) {
  let otherEffects = "<div class='otherEffects'>";
  for(let i = 0; i < jsonArr.length; i++) {
    if(jsonArr[i].description !== "Attack") {
      otherEffects += "<span class='status__name'>" + jsonArr[i].description;
      if(jsonArr[i].elements.length > 0) {
        otherEffects += " - (";
        otherEffects += formatElements(jsonArr[i]);
        otherEffects += ")</span>";
      }
      else {
        otherEffects += "</span>";
      }
      otherEffects += "<p class='otherEffects__effect'>" + jsonArr[i].effects + "</p>";
    }
  }
  otherEffects += "</div>";
  return otherEffects;
}

/**
 * Determines if the specified status is allowed and should be displayed in the text
 * @param statusName - the name of the status to be verified
 * @returns true if the status is allowed, false otherwise
 */
function statusAllowed(statusName) {
  let val = true;
  for(let i = 0; i < consts.ignoredStatuses.length; i++){
    if(statusName.includes(consts.ignoredStatuses[i])) {
      val = false;
      break;
    }
  }
  return val;
}

function formatOrbRequirements(json) {
  let orbReqs = "<p class='info'>Hone Requirements</p><table class='info' border='1'><thead>";
  let headerRow = "<tr><th>Rank</th>";
  let row1 = "<tbody class='center'><tr><td>R1</td>";
  let row2 = "<tr><td>R2</td>";
  let row3 = "<tr><td>R3</td>";
  let row4 = "<tr><td>R4</td>";
  let row5 = "<tr><td>R5</td>";
  for(let i = 0; i < json.orbRequirements.length; i++) {
    switch(i % 5) {
      case 0:
        if(json.orbRequirements[i].orbName !== "Ability Record") {
          headerRow += "<th>" + json.orbRequirements[i].orbName + "</th>";
          row1 += "<td>" + json.orbRequirements[i].orbCount + "</td>";
        }
        break;
      case 1:
        row2 += "<td>" + json.orbRequirements[i].orbCount + "</td>";
        break;
      case 2:
        row3 += "<td>" + json.orbRequirements[i].orbCount + "</td>";
        break;
      case 3:
        row4 += "<td>" + json.orbRequirements[i].orbCount + "</td>";
        break;
      case 4:
        row5 += "<td>" + json.orbRequirements[i].orbCount + "</td>";
        break;
    }
  }
  headerRow += "</tr></thead>";
  row5 += "</tbody></table>";
  return orbReqs + headerRow + row1 + row2 + row3 + row4 + row5;
}

/**
 * This helper function will find the element name to match the ID passed in
 * @param elementID - the element ID
 * @returns human readable element name
 */
function parseElementNumber(elementID) {
  let elementName = consts.elementDict[elementID];
  if(elementName === '-') {
    return 'NE';
  }
  else {
    return elementName;
  }
}

export function formatAbilityJSON(json) {
  let start = "<div class='result'>";
  let name = `<h3 class='result__name'>${json.abilityName}`;
  name += (json.isInGlobal) ? `</h3>` : ` (JP)</h3>`;
  let icon = "<div class='icon-container'><img class='icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = "<p class='effect'>" + json.effects + "</p></div>";
  let flexDiv = "<div class='flex'>";
  let castTime = "<span class='margin-right info'><b>Cast Time:</b> " + json.castTime + "</span>";
  let elements = "<span class='elements info'><b>Elements:</b> " + formatElements(json) + "</span>";
  let multiplier = "<span class='info'><b>Multiplier:</b> " + json.multiplier + "</span>";
  let school = "<span class='margin-right info'><b>School:</b> " + consts.schoolDict[json.school] + "</span>";
  let sbGain = "<span class='margin-right info'><b>SB Gain:</b> " + json.soulBreakPointsGained + "</span>";
  let target = "<span class='info'><b>Target:</b> " + consts.targetTypeDict[json.targetType] + "</span>";
  let endDiv = "</div>";
  return start + name + icon + effect + flexDiv + castTime + elements + endDiv + flexDiv + school + multiplier + endDiv + flexDiv + sbGain + target + endDiv + formatOrbRequirements(json) + endDiv;
}

/**
 * This function will format the Legend Materia JSON into a human-readable result.
 * @param json - the JSON from the API query
 */
export function formatLMJSON(json) {
  let html = "";
  let name = `<div class='lm'><h4 class='lm__name'>${json.description}`;
  name += (json.isInGlobal) ? `</h4>` : ` (JP)</h4>`;
  let icon = "<div class='lm__container'><img class='cmd__icon' src='" + json.imagePath.split('"')[0] + "'/>"; //TODO change name of this class
  let effect = "<p class='lm__effect'>" + json.effect + "</p></div></div>";
  html += name + icon + effect;
  return html;
}

export function formatElements(json) {
  let elements = "";
  for (let j = 0; j < json.elements.length; j++) {
    elements += parseElementNumber(json.elements[j]);
    if (j !== json.elements.length - 1) {
      elements += ", ";
    }
  }
  return elements;
}

/**
 * This function will format the Record Materia JSON into a human-readable result.
 * @param json - the JSON from the API query
 */
export function formatRMJSON(json) {
  let start = "<div class='result'>";
  let name = "<h3 class='result__name'>" + json.recordMateriaName + "</h3>";
  let icon = "<div class='icon-container'><img class='icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = "<p class='effect'>" + json.effect + "</p></div>";
  let unlock = "<p class='info'>Unlock Criteria - " + json.unlockCriteria + "</p>";
  let end = "</div>";
  return start + name + icon + effect + unlock +  end;
}

export function formatStatusJSON(json, options) {
  let start = "<div class='result'>";
  let name = "<h3 class='result__name'>" + json.commonName + "</h3>";
  let effect = "<div><p class='effect'>" + json.effects + "</p></div>";
  let end = "</div>";
  if(options === "append") {
    return name + effect;
  }
  else {
    return start + name + effect + end;
  }
}

/**
 * TODO figure out what this should look like!
 * This function will format the Character JSON into a human-readable result.
 * @param json - the JSON from the API query
 */
export function formatCharacterJSON(json) {

}
