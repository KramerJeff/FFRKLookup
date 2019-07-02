import * as formatter from '/scripts/htmlFormatter.js';
import * as consts from '/scripts/constants.js';

"use strict";
//var bgPage = chrome.extension.getBackgroundPage();
const apiBase = "https://ffrkapi.azurewebsites.net/api/v1.0/";
const imgBase = "https://dff.sp.mbga.jp/dff/static/lang/image/buddy";
const imgEnd = "base_hands_up.png";


const sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|GSB\+|FSB|AASB|Glint|Glint\+/gi; //lcsb is caught by the CSB
const lmRegex = /LM|LMR/gi;
const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|GSB\+|FSB|AASB|Glint|Glint\+|lm|lmr|abil|ability|rm|stat|char|rd|ld|rdive|ldive/gi;


$(function () {
  //Autocomplete stuff
  const form = document.querySelector('form');
  const input = document.getElementById('search-text');
  let dataArray = localStorage.getItem('data') !== null ? JSON.parse(localStorage.getItem('data')) : [];
  let options = {
    data: dataArray,
    list: {
      match: {
        enabled: true
      }
    }
  };
  localStorage.setItem('data', JSON.stringify(dataArray))
  const data = JSON.parse(localStorage.getItem('data'));
  $("#search-text").easyAutocomplete(options);
  $("#search-text").focus();
  let dictSequence = Promise.resolve();
  let abilDict = {};


  //creates Dictionary of ability names and IDs for quick reference
  createAbilityDict().then(function(data) { abilDict = data; });
  //createCharacterDict().then(function(data) { charDict = data; }); TODO
	$("#search-button").click(function(e) {
    e.preventDefault();
    //based on command, send data to correct function
    //functions handle the data and return the formatted HTML
    //the formatted HTML is added to a variable until loop is finished.
    //once loop is finished, replace div with formatted HTML

    //grab query
    let query = $("#search-text").val();
    //places query into localStorage for autocomplete
    let search = input.value;

    input.value = '';
    options = {
      data: dataArray,
      list: {
        match: {
          enabled: true
        }
      }
    };

    $("#search-text").easyAutocomplete(options);

    $("#results").html("");
    let requests = parseRequests(query);
    let sequence = Promise.resolve();
    requests.forEach(function(request) {
      sequence = sequence.then(function() {
        if(request.length > 1 && request[1].match(sbRegex)) {
          return parseSBRequest(request);
        }
        else if(request.length > 1 && request[1].match(lmRegex)) { //if i did contains.("lm") that would be too generic
          return getLMsForChar(request);
        }
        else if(request.length > 1 && request[1] === "abil" || request[1] === "ability") {
          return getAbility(request[0], abilDict);
        }
        else if(request.length > 1 && request[1] === "rm") {
          return getRecordMateria(request[0]); //TODO RM aliases
        }
        else if(request.length > 1 && request[1] === "stat") {
          return getStatus(request[0]);
        }
        else if(request.length > 1 && request[1] === "char") {
          return getCharacter(request[0]);
        }
        else if(request.length > 1 && request[1] === "ldive") {
          return getLegendDive(request[0]);
        }
        else if(request.length > 1 && request[1] === "rdive") {
          return getRecordDive(request[0]);
        }
        else {
          return getSoulBreak(request);
        }
      }).then(function(HTML) {
        $("#results").append(HTML);
        if(!dataArray.includes(query)) { //only update if it isn't a duplicate value, TODO make sure this accounts for all errors
          dataArray.push(query);
          localStorage.setItem('data', JSON.stringify(dataArray));
        }

      }).catch(function(err) {
        let errHTML = `<div class='sb-result result'><span class='error'>${err}</span></div>`;
        $("#results").append(errHTML);
      });
    });

    $('#search-text').focus();
	});
});

/**
 * Take the input from the search box and parses it into
 * one or multiple requests, depending on the content
 * @param text - the text from the search box
 */
function parseRequests(text) {
  let requests = [];
  //search for commas - if commas are present, split into multiple commands
  if(text.includes(';')) {
    let queries = text.split(';');
    queries.forEach(function(query) { //for each request, grab command and request text
      query = query.trim();
      requests.push(getParts(query));
    });
  }
  else { //if there's a single request, grab command and character name
    requests.push(getParts(text));
  }
  return requests;
}

/**
 * Get the parts of the query and make sure it is a proper command
 */
function getParts(query) {
  let parts = [];
  let words = query.trim().split(" ");
  let cmd = words.pop().toLowerCase();
  if(cmd.match(cmdRegex)) {
    parts[0] = searchAliases(consts.characterAliases, words.join(" ").toLowerCase());
    parts[1] = cmd;
  }
  else {
    return query; //if it isn't a cmd, return the pure query
  }
  return parts;
}

/**
 * This function parses if the user is asking for a specific soul break by name
 * or by a character's name and SB tier e.g. Cloud USB
 * @param arr - array index 0 is the character name, index 1 is the sbTier
 * return Promise with HTML formatted data
 */
function parseSBRequest(arr) {
  let sbHTML = "";
  let charName = arr[0];
  let sbTier = arr[1];
  let charID = getCharacterID(charName);
  if(charID === -1) {
    return Promise.reject(new Error(`${charName} is not a valid character name`));
  }
  else if(sbTier === 'sb') {
    let objSBTier = { tierID: 0};
    return getTierSBsForCharID(charID, objSBTier, arr);
  }
  else if(sbTier.match(sbRegex)) { //contains specific character name and tier
    let objSBTier = filterSBTier(sbTier); //filter the tier info to pass to getting the soul breaks
    return getTierSBsForCharID(charID, objSBTier, arr);
  }
  else {
    return Promise.reject(new Error(`${charName} ${sbTier} is not a valid request`));
  }
}

/**
 * Creates an Object based on the SB search string to help create the API
 * request to retrieve Soul Break data.
 * @param sbString - the Soul Break search string e.g. BSB1, USB2, BSB
 * @returns Object containing the tierID and index of the SB you are looking for e.g. USB2 (second USB)
 */
function filterSBTier(sbString) {
  let sbTier = sbString.toLowerCase();
  let format = { index: 0 };
  if(hasNumber(sbTier)) { //find if there's a number
    format.index = sbTier.charAt(sbTier.length-1); //create an index
    sbTier = sbTier.substring(0, sbTier.length-1); //get rid of number in tier
  }
  format.tierName = sbTier;
  switch(sbTier) {
    case "ssb":
      format.tierID = 5;
      break;
    case "bsb":
      format.tierID = 6;
      break;
    case "osb":
      format.tierID = 7;
      break;
    case "usb":
      format.tierID = 8;
      break;
    case "chain":
    case "csb":
    case "lcsb":
      format.tierID = 9;
      break;
    case "glint":
    case "gsb":
    case "fsb":
      format.tierID = 10;
      break;
    case "glint+":
    case "gsb+":
      format.tierID = 11;
      break;
    case "aosb":
    case "uosb":
    case "asb":
      format.tierID = 12;
      break;
    case "aasb":
      format.tierID = 13;
      break;
  }
  return format;
}

/**
 * Helper function to find out if a string has a number or not
 * @param myString - string you want to find number in
 * @returns True if the string contains a number
 */
function hasNumber(myString) {
  return /\d/.test(myString);
}

//findStatusInEffects
//Look through statuses in effects and add them to an array

/**
 * Searches through the alias dictionary to see
 * if the name is an alias - if it does, it replaces it with a name
 * the API can recognize.
 * @param aliasDict - the dictionary to search through
 * @param name - the name input into the search
 * @returns the API recognizable name
 */
function searchAliases(aliasDict, name) {
  if( name === "WoL" ) { //TODO fix this?
    return "warrior of light";
  }
  let key;
  for(key in aliasDict) {
    if(aliasDict[key].includes(name.toLowerCase())) {
      name = key;
    }
  }
  return name;
}

/**
 * Gets the character ID of the specified character
 * @param charName - name of the character to retrieve their ID
 * @returns charID - the integer ID of the character, -1 if charName is not in dictionary
 */
function getCharacterID(charName) {
  return (consts.charIDs[charName] ? consts.charIDs[charName] : -1);
}

/**
 * Called when user is searching for a specific tier of character relics e.g. Cloud BSB, Cloud USB
 * @param charID - character ID
 * @param cbParams - callback parameters
 */
function getTierSBsForCharID(charID, cbParams, request) {
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/SoulBreaks/Character/" + charID, function(json) {
      let SBs = `<div class='result'><p class='request lato'><b>Request</b> - ${request[0]} ${request[1].toUpperCase()}</p>`;
      let arr = [];
      if(cbParams.tierID === 0) { //if tierID = 0, get all SBs
        json.forEach((json) => { SBs += formatter.formatSBJSON(json); });
      }
      else if(cbParams.index === 0) { //if there is no sb number e.g. cloud usb2
        json.forEach((json) => {
          if(json.soulBreakTier === cbParams.tierID) {
            SBs += formatter.formatSBJSON(json);
          }
        });
      }
      else { //if there IS an index - TODO REFACTOR so the loop breaks once the correct SB is reached
        json.forEach((json) => {
          if(json.soulBreakTier === cbParams.tierID) {
            arr.push(json);
          }
        });
        if(arr.length > cbParams.index-1) { //this should handle array out of bound exception
          SBs += formatter.formatSBJSON(arr[cbParams.index-1]);
        }
        else {
          reject(new Error(`${request[0]} does not have ${cbParams.index} ${request[1].replace(/[0-9]/g, '')}s`));
        }
      }
      SBs += '</div>';
      resolve(SBs);
    });
  });
}

/**
 * Gets the Legend Materia for the specified character
 * @param request - array containing the character name
 * @returns a Promise with the formatted HTML for the Legend Materia
 */
function getLMsForChar(request) {
  let charID = getCharacterID(request[0]);
  if(charID === -1) {
    return Promise.reject(new Error(request[0] + ' is not a valid character name'));
  }
  return new Promise(function(resolve, reject) {
    $.getJSON(`${apiBase}/LegendMaterias/Character/${charID}`, function(json) {
      let lmCmd = request[1];
      let LMs = `<div class='sb-result result'><p class='request lato'><b>Request</b> - ${json[0].characterName} ${lmCmd.toUpperCase()}</p>`; //get the character name once

      if(lmCmd.includes('lmr')) {
        json = json.slice(2); //get rid of dive LMs
      }
      if(hasNumber(lmCmd)) {
        let numIndex = lmCmd.search(/\d/);
        let index = lmCmd.substring(numIndex, lmCmd.length);
        lmCmd = lmCmd.substring(0, numIndex);
        if(json.length > index-1) {
          LMs += formatter.formatLMJSON(json[index-1]);
        }
        else {
          reject(new Error(`${request[0]} does not have ${index} ${lmCmd}s`));
        }
      }
      else {
        json.forEach((json) => {
          LMs += formatter.formatLMJSON(json);
        });
      }
      LMs += "</div>";
      resolve(LMs);
    });
  });
}

/**
 * This function does a reverse search for a Soul Break name based on the request based in
 * @param request - array passed down from getParts method
 */
function getSoulBreak(request) {
  return new Promise(function(resolve,reject) {
    $.getJSON(`${apiBase}/SoulBreaks/Name/${request}`, function(json) {
      let SBs = `<p class='request lato'><b>Request</b> - ${request}</p>`
      if(json.length === 0) {
        reject(new Error(`There is no soul break named ${request}`));
      }
      else {
        json.forEach((json) => {
          SBs += formatter.formatSBJSON(json);
        });
        resolve(SBs);
      }
    });
  });
}

/**
 * TODO map IdLists to abilities
 */
function getAbility(abilityName, abilDict) {
  let abilName = searchAliases(consts.abilityAliases, abilityName.toLowerCase());
  if(abilName in abilDict) {
    let id = abilDict[abilName];
    return new Promise(function(resolve,reject) {
      $.getJSON(`${apiBase}/Abilities/${id}`, function(json) {
        let abil = `<p class='request lato'><b>Request</b> - ${abilName} abil</p>`;
        json.forEach((json) => {
          abil += formatter.formatAbilityJSON(json);
        });
        resolve(abil);
      });
    });
  }
  else {
    return Promise.reject(new Error(`${abilityName} is not an acceptable ability name`));
  }
}

function getRecordMateria(rmName) {
  return new Promise(function(resolve, reject) {
    $.getJSON(`${apiBase}/RecordMaterias/Name/${rmName}`, function(json) {
      let RMs = `<p class='request lato'><b>Request</b> - ${rmName} RM</p>`;
      json.forEach((json) => {
        RMs += formatter.formatRMJSON(json);
      });
      resolve(RMs);
    });
  });
}

function getStatus(statusName) {
  return new Promise(function(resolve, reject) {
    $.getJSON(`${apiBase}/Statuses/CommonName/${statusName}`, function(json) {
      let statuses = `<p class='request lato'><b>Request</b> - ${statusName} Stat</p>`;
      json.forEach((json) => {
        statuses += formatter.formatStatusJSON(json);
      });
      resolve(statuses);
    });
  });
}

function getCharacter(charName) {
  return new Promise(function(resolve, reject) {
      let charID = getCharacterID(charName);
      if(charID === -1) {
        return Promise.reject(new Error(`${charName} is not a valid character name`));
      }
      $.getJSON(`${apiBase}/Characters/${charID}`, function(json) {
        let enlirID = json[0].EnlirId;
        let schools = [];
        let schoolInfo = json[0].SchoolAccessInfos.filter(school => school.AccessLevel > 0); //filter out useless schools
        for(let i = 0; i < schoolInfo.length; i++) {
          let school = {};
          school.schoolName = schoolInfo[i].SchoolName;
          school.accessLevel = schoolInfo[i].AccessLevel;
          schools.push(school);
        }
        let weaponAccess = json[0].EquipmentAccessInfos.filter(weapon => weapon.CanAccess === true);
        let html = `<div class='result'>
          <div class='char-title'>
            <p class='request lato'><b>Request</b> - ${json[0].Description} char</p>
            <img src=${imgBase}/${enlirID}/${imgEnd} class='char-title__img'>
          </div>`;
        html += `${formatter.formatWeaponsJSON(weaponAccess)}`;
        html += `${formatter.formatSchoolJSON(schools)}`;

        let recordSpheres = [];
        for(let i = 0; i < json[0].RecordSpheres.length; i++) {
          for(let j = 0; j < json[0].RecordSpheres[i].RecordSphereLevels.length; j++) {
              if(json[0].RecordSpheres[i].RecordSphereLevels[j].Benefit.includes(String.fromCharCode(9733))) { //includes Star character
                recordSpheres.push(json[0].RecordSpheres[i].RecordSphereLevels[j].Benefit);
              }
          }
        }
        html += `${formatter.formatRecordSphereAbilJSON(recordSpheres, json[0].Description)}`
        html += '</div>';
        //recordSpheres[0].recordSphereLevels[0].benefit contains ->
        // split (★)[1].lastChar
        // `Enable Spellblade 3★`
        resolve(html);
        // for(let i = 0; i < json[SchoolAccessInfos].length; i++) {
        //   console.log(json[SchoolAccessInfos][i]);
        // }
      });
  });
  //weaponAccess
  //abilityAccess
  //LMs
  //Record Materia
}

function getLegendDive(charName) {
  return new Promise(function(resolve, reject) {
      let charID = getCharacterID(charName);
      if(charID === -1) {
        return Promise.reject(new Error(`${charName} is not a valid character name`));
      }
      $.getJSON(`${apiBase}/Characters/${charID}`, function(json) {
        let html = `<div class='result'><p class='request lato'><b>Request</b> - ${json[0].Description} Legend Dive</p>`;
        html += formatter.formatLegendDiveJSON(json[0].StatIncrementsForLegendSpheres);
        html += `</div>`;
        resolve(html);
      });
  });
}

function getRecordDive(charName) {
  return new Promise(function(resolve, reject) {
      let charID = getCharacterID(charName);
      if(charID === -1) {
        return Promise.reject(new Error(`${charName} is not a valid character name`));
      }
      $.getJSON(`${apiBase}/Characters/${charID}`, function(json) {
        let html = `<div class='result'><p class='request lato'><b>Request</b> - ${json[0].Description} Record Dive</p>`;
        html += formatter.formatRecordDiveJSON(json[0].StatIncrementsForRecordSpheres);
        html += `</div>`;
        resolve(html);
      });
  });
}

/**
 * @param arr - array of objects containing schoolName and accessLevel
 */
function formatSchoolTableJSON(arr) {
  let html = `<table class='info' border='1'><thead><tr><th>School</th><th>Access Level</th></tr></thead><tbody class='center'>`;
  for(let i = 0; i < arr.length; i++) {
    if(consts.nightmareSchools.includes(arr[i].schoolName) && arr[i].accessLevel === 5) {
      html += `<tr><td>${arr[i].schoolName}</td><td>6</td></tr>`;
    }
    else {
      html += `<tr><td>${arr[i].schoolName}</td><td>${arr[i].accessLevel}</td></tr>`;
    }
    if(i === arr.length-1) {
      html += `</tbody></table>`;
    }
  }
  return html;
}

/**
 * Initializes an ability dictionary in order to prevent multiple lookups for * ability IDs
 */
function createAbilityDict() {
  let abilDict = {};
  return new Promise(function(resolve,reject) {
    $.getJSON(apiBase + "IdLists/Ability", function(abilJSON) {
      abilJSON.forEach((json) => {
        abilDict[json.value.toLowerCase()] = json.key;
      });
      resolve(abilDict);
    });
  });
}
