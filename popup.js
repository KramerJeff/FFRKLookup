var bgPage = chrome.extension.getBackgroundPage();
const apiBase = "http://ffrkapi.azurewebsites.net/api/v1.0/";

const elementDict = {
  0: "unknown",
  1: "",
  2: "-",
  3: "Dark",
  4: "Earth",
  5: "Fire",
  6: "Holy",
  7: "Ice",
  8: "Lightning",
  9: "NE",
  10: "Poison",
  11: "Pioson", //typo from the API...
  12: "Water",
  13: "Wind",
  14: "Light.",
  15: "Earth", //extra type from API
  16: "Water" //extra type from API
};

const schoolDict = {
  0: "Unknown",
  2: "Bard",
  3: "Black Magic",
  4: "Celerity",
  5: "Combat",
  6: "Dancer",
  7: "Darkness",
  8: "Dragoon",
  9: "Heavy",
  10: "Knight",
  11: "Machinist",
  12: "Monk",
  13: "Ninja",
  14: "Samurai",
  15: "Sharpshooter",
  17: "Special",
  18: "Spellblade",
  19: "Summoning",
  20: "Support",
  21: "Thief",
  22: "White Magic",
  23: "Witch"
};

const targetDict = {
  0: "Unknown",
  1: "-",
  2: "All allies",
  3: "All enemies",
  4: "Ally with status",
  5: "Another ally",
  6: "Lowest HP% ally",
  7: "Random ally",
  8: "Random enemies",
  9: "Random enemy",
  10: "Self",
  11: "Single",
  12: "Single ally",
  13: "Single enemy",
  14: ""
};

const charIDs = {
  'tyro': 1,'warrior': 2,'knight': 3,'monk': 4,'red mage': 5,'black mage': 6,'magus': 7,'white mage': 8,'devout': 9,'summoner': 10,'samurai': 11,'dragoon': 12,'dark knight': 13,'spellblade': 14,'viking': 15,'berserker': 16,'ranger': 17,'thief (core)': 18,'bard': 19,'ninja': 20,'gladiator': 21,'elarra': 22,'biggs': 23,'wedge': 24,'dr. mog': 25,'warrior of light': 26,'garland': 27,'sarah': 28,'wol': 29,'echo': 30,'master': 31,'matoya': 32,'meia': 33,'thief (i)': 34,'firion': 35,'maria': 36,'guy': 37,'leon': 38,'minwu': 39,'gordon': 40,'leila': 41,'ricard': 42,'josef': 43,'emperor': 44,'hilda': 45,'scott': 46,'luneth': 47,'arc': 48,'refia': 49,'ingus': 50,'desch': 51,'onion knight': 52,'cloud of darkness': 53,'aria': 54,'cecil (dark knight)': 55,'cecil (paladin)': 56,'kain': 57,'rydia': 58,'rosa': 59,'edward': 60,'yang': 61,'palom': 62,'porom': 63,'tellah': 64,'edge': 65,'fusoya': 66,'golbez': 67,'cid (iv)': 68,'ceodore': 69,'rubicante': 70,'ursula': 71,'barbariccia': 72,'lenna': 73,'galuf': 74,'gogo (v)': 75,'gilgamesh': 76,'bartz': 77,'faris': 78,'dorgann': 79,'exdeath': 80,'krile': 81,'xezat': 82,'kelger': 83,'terra': 84,'locke': 85,'celes': 86,'mog': 87,'edgar': 88,'sabin': 89,'shadow': 90,'cyan': 91,'gau': 92,'setzer': 93,'strago': 94,'relm': 95,'gogo (vi)': 96,'umaro': 97,'kefka': 98,'leo': 99,'cloud': 100,'barret': 101,'tifa': 102,'aerith': 103,'red xiii': 104,'yuffie': 105,'cait sith': 106,'vincent': 107,'zack': 108,'sephiroth': 109,'cid (vii)': 110,'reno': 111,'angeal': 112,'rufus': 113,'shelke': 114,'rude': 115,'elena': 116,'squall': 117,'rinoa': 118,'quistis': 119,'zell': 120,'selphie': 121,'irvine': 122,'seifer': 123,'laguna': 124,'edea': 125,'raijin': 126,'fujin': 127,'kiros': 128,'ward': 129,'ultimecia': 130,'zidane': 131,'garnet': 132,'vivi': 133,'steiner': 134,'freya': 135,'quina': 136,'eiko': 137,'amarant': 138,'beatrix': 139,'kuja': 140,'marcus': 141,'tidus': 142,'yuna': 143,'wakka': 144,'lulu': 145,'kimahri': 146,'rikku': 147,'auron': 148,'jecht': 149,'braska': 150,'paine': 151,'seymour': 152,'shantotto': 153,'ayame': 154,'curilla': 155,'prishe': 156,'lion': 157,'aphmau': 158,'zeid': 159,'lilisette': 160,'vaan': 161,'balthier': 162,'fran': 163,'basch': 164,'ashe': 165,'penelo': 166,'gabranth': 167,'larsa': 168,'vayne': 169,'reks': 170,'lightning': 171,'snow': 172,'vanille': 173,'sazh': 174,'hope': 175,'fang': 176,'serah': 177,'cid raines': 178,'noel': 179,'nabaat': 180,"y'shtola": 181,'thancred': 182,'yda': 183,'papalymo': 184,'alphinaud': 185,'minfilia': 186,'cid (xiv)': 187,'ysayle': 188,'haurchefant': 189,'estinien': 190,'noctis': 191,'gladiolus': 192,'ignis': 193,'prompto': 194,'iris': 195,'aranea': 196,'ramza': 197,'agrias': 198,'delita': 199,'ovelia': 200,'mustadio': 201,'orlandeau': 202,'gaffgarion': 203,'rapha': 204,'marach': 205,'meliadoul': 206,'marche': 207,'montblanc': 208,'alma': 209,'orran': 210,'ace': 211,'deuce': 212,'nine': 213,'machina': 214,'rem': 215,'queen': 216,'king': 217,'cinque': 218,'seven': 219,'sice': 220,'jack': 221,'eight': 222,'cater': 223,'sora': 224,'riku': 225,'roxas': 226,'axel': 227,'reynn': 228,'lann': 229,'morrow': 230,'aemo': 231,'wrieg': 232,'tama': 233,'enna': 234,
};

const characterAliases = {
  "onion knight": ["ok", "onion knight", "onion"],
  "orlandeau": ["tg cid", "tgc"],
  "cecil (dark knight)": ["decil", "dcecil", "dark knight cecil", "cecil dark knight"],
  "cecil (paladin)": ["pecil", "pcecil", "paladin cecil", "cecil paladin"],
  "gilgamesh": "greg",
  "aerith": "aeris",
  "cid (iv)": ["cid iv", "cid4", "cid 4"],
  "cid (xiv)": ["cid xiv", "cid 14", "cid14"],
  "cid (vii)": ["cid vii", "cid7", "cid 7"],
  "elarra": "urara",
  "barbariccia": "barb",
  "cloud of darkness": "cod",
  "red xiii": ["nanaki", "red13", "red 13"],
  "gogo (v)": ["gogo v", "gogo5", "gogo 5"],
  "gogo (vi)": ["gogo vi", "gogo6", "gogo 6"]
};

const abilityAliases = {
  "bahamut (v)": ["bahamut", "bahamut5", "bahamut v"],
  "bahamut (vi)": ["bahamut6", "bahamut vi"],
  "voltech": ["vortex"]
};

const ignoredStatuses = ["Remove", "Reraise", "Haste", "Burst Mode", "Imp", "Attach", "Blink"];
const sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|FSB|AASB|Glint/gi; //lcsb is caught by the CSB
const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|FSB|AASB|Glint|lm|lmr|abil|ability|rm|stat|char/gi;

$(function () {
  let dictSequence = Promise.resolve();
  let abilDict = {};

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
    $("#results").html("");
    let requests = parseRequests(query);
    let sequence = Promise.resolve();
    requests.forEach(function(request) {
      sequence = sequence.then(function() {
        if(request.length > 1 && request[1].match(sbRegex)) {
          return parseSBRequest(request);
        }
        else if(request.length > 1 && request[1] === "lm" || request[1] === "lmr") { //if i did contains.("lm") that would be too generic
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
        else {
          console.log('fallback');
          return getSoulBreak(request);
        }
      }).then(function(HTML) {
        $("#results").append(HTML);
      }).catch(function(err) {
        let errHTML = `<div class='sb-result result'><span class='error'>${err}</span></div>`;
        $("#results").append(errHTML);
      });
    });
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

function getParts(query) {
  let parts = [];
  let words = query.trim().split(" ");
  let cmd = words.pop().toLowerCase();
  if(cmd.match(cmdRegex)) {
    parts[0] = searchAliases(characterAliases, words.join(" ").toLowerCase());
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

/**
 * Determines if the specified status is allowed and should be displayed in the text
 * @param statusName - the name of the status to be verified
 * @returns true if the status is allowed, false otherwise
 */
function statusAllowed(statusName) {
  let val = true;
  for(let i = 0; i < ignoredStatuses.length; i++){
    if(statusName.includes(ignoredStatuses[i])) {
      val = false;
      break;
    }
  }
  return val;
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
  return (charIDs[charName] ? charIDs[charName] : -1);
}

/**
 * Called when user is searching for a specific tier of character relics e.g. Cloud BSB, Cloud USB
 * @param charID - character ID
 * @param cbParams - callback parameters
 */
function getTierSBsForCharID(charID, cbParams, request) {
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/SoulBreaks/Character/" + charID, function(json) {
      let SBs = "";
      let arr = [];
      if(cbParams.tierID === 0) { //if tierID = 0, get all SBs
        json.forEach((json) => { SBs += formatSBJSON(json); });
      }
      else if(cbParams.index === 0) { //if there is no sb number e.g. cloud usb2
        json.forEach((json) => {
          if(json.soulBreakTier === cbParams.tierID) {
            SBs += formatSBJSON(json);
          }
        });
      }
      else { //if there IS an index - TODO REFACTOR so the loop breaks once the correct SB is reached
        json.forEach((json) => {
          if(json.soulBreakTier === cbParams.tierID) {
            arr.push(json);
          }
        });
        if(arr.length > cbParams.index-1) {
          SBs += formatSBJSON(arr[cbParams.index-1]); //TODO REFACTOR handle array out of bound exception
        }
        else {
          reject(new Error(`${request[0]} does not have ${cbParams.index} ${request[1].replace(/[0-9]/g, '')}s`));
        }
      }
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
      let LMs = `<div class='sb-result result'><h3 class='character__name'>${json[0].characterName}</h3>`; //get the character name once
      json.forEach((json) => {
        LMs += formatLMJSON(json);
      });
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
      let SBs = "";
      if(json.length === 0) {
        reject(new Error(`There is no soul break named ${request}`));
      }
      else {
        json.forEach((json) => {
          SBs += formatSBJSON(json);
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
  let abilName = searchAliases(abilityAliases, abilityName.toLowerCase());
  if(abilName in abilDict) {
    let id = abilDict[abilName];
    return new Promise(function(resolve,reject) {
      $.getJSON(`${apiBase}/Abilities/${id}`, function(json) {
        let abil = "";
        json.forEach((json) => {
          abil += formatAbilityJSON(json);
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
      let RMs = "";
      json.forEach((json) => {
        RMs += formatRMJSON(json);
      });
      resolve(RMs);
    });
  });
}

function getStatus(statusName) {
  return new Promise(function(resolve, reject) {
    $.getJSON(`${apiBase}/Statuses/CommonName/${statusName}`, function(json) {
      let statuses = "";
      json.forEach((json) => {
        statuses += formatStatusJSON(json);
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
        //console.log(json[0].SchoolAccessInfos);
        let schools = [];
        let schoolInfo = json[0].SchoolAccessInfos;
        for(let i = 0; i < schoolInfo.length; i++) {
          if(schoolInfo[i].AccessLevel > 0) {
            let school = {};
            school.schoolName = schoolInfo[i].SchoolName;
            school.accessLevel = schoolInfo[i].AccessLevel;
            schools.push(school);
          }
        }
        let html = formatSchoolJSON(schools);

        //recordSpheres is an array
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

// function getStatusJSONFromArray(arr) {
//   return new Promise(function(resolve, reject) {
//     let sequence = Promise.resolve();
//     let retJSON = "";
//     for(let i = 0; i < arr.length; i++) {
//       sequence = sequence.then(() =>
//         getStatus(arr[i]).then((json) => {
//           retJSON += json;
//           console.log('lower ' + retJSON + " json " + json);
//         });
//         console.log("i " + i + " arrlen " + (arr.length-1));
//         if(i === (arr.length-1)) {
//           console.log("end of array");
//           resolve(retJSON);
//         }
//       );
//     }
//   });
// }

/**
 * SB helper
 */
function getCommands(cmdArr) {
    let commands = "<div class='cmds border-top'>";
    for(let i = 0; i < cmdArr.length; i++) {
      //TODO create container for these so they never overlap
      commands += "<div class='cmd'><img class='cmd__icon' src='" + cmdArr[i].imagePath.split('"')[0] + "'/>";
      commands += `<p class='cmd__effect'>${cmdArr[i].effects}</p></div>`; //TODO SEARCH FOR STATUS
      // if(findStatusInText(json.commands[i].effects).length > 0) {
      //   commands += `<p class='cmd__effect'>${findStatusInText(json.commands[i].effects)}`;
      //   //getStatusJSONFromArray(findStatusInText(json.commands[i].effects)).then((json) => console.log("upper " + json));
      // }
      //School and Elements
      commands += "<div class='cmd'><span class='margin-right'>";
      commands += `School - ${schoolDict[cmdArr[i].school]}</span>`;
      commands += `<span>${formatElements(cmdArr[i])}</span>`;
      commands += "</div>";

      //Multiplier and Cast Time
      commands += "<div class='cmd";
      if(i !== cmdArr.length-1) { //Due to uncertainty of number of previous/next elements/features, this is my best solution
        commands += " border-bottom'>"
      }
      else {
        commands += "'>";
      }
      commands += `<span class='margin-right'>Multiplier - ${cmdArr[i].multiplier}</span>`;
      commands += `<span>Cast Time - ${cmdArr[i].castTime}</span></div>`;
    }
    commands += "</div>";
    return commands;
}

function getSBStatuses(statusJson, braveJson, statusArr) {
    let statuses = "<div class='status'>";
    console.log(statusArr);
    for(let i = 0; i < statusJson.length; i++) {
      //List so far: Poison, Minor Resist Dark (Resist?), KO, Instant KO, Protect, Shell, Magical Blink, Astra, Instant Cast
      if(statusJson[i].description === "Brave Mode") {
        statuses += "<span class='status__name'>" + statusJson[i].description + "</span>";
        console.log(statusJson[i]);
        console.log(braveJson);
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
      else if(statusAllowed(statusJson[i].description) && statusArr.includes(statusJson[i].description)) { //make sure status is not 'blacklisted'
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
 * This function will format the Soul Break JSON into a human-readable result.
 * @param json - the JSON from the API query
 * @returns HTML formatted string to represent the Soul Break
 * TODO add if the relic gives +element? relicName and relicId are provided
 */
function formatSBJSON(json) {
  let html = "<div class='sb-result'>";
  let name = `<div class='sb'><h3 class='sb-result__name'>${json.description}</h3>`;
  let icon = "<div class='sb-main'><img class='sb-result__icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = `<p class='sb-result__effect'>${json.effects}</p></div>`;
  let entry = `<div class='flex'><span class='margin-right entry__castTime'>Cast Time - ${json.castTime}</span><span class='entry__elements'>${formatElements(json)}</span></div></div>`;

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
 * TODO figure out what this should look like!
 * This function will format the Character JSON into a human-readable result.
 * @param json - the JSON from the API query
 */
function formatCharacterJSON(json) {

}

/**
 * @param arr - array of objects containing schoolName and accessLevel
 */
function formatSchoolJSON(arr) {
  let html = `<span>`;
  for(let i = 0; i < arr.length; i++) {
    html += `${arr[i].schoolName}: ${arr[i].accessLevel}`;
    if(i !== arr.length-1) {
      html += `, `;
    }
    else {
      html += `</span>`;
    }
  }
  return html;
}

/**
 * This function will format the Legend Materia JSON into a human-readable result.
 * @param json - the JSON from the API query
 */
function formatLMJSON(json) {
  let html = "";
  let name = "<div class='lm'><h4 class='lm__name'>" + json.description + "</h4>";
  let icon = "<div class='lm__container'><img class='cmd__icon' src='" + json.imagePath.split('"')[0] + "'/>"; //TODO change name of this class
  let effect = "<p class='lm__effect'>" + json.effect + "</p></div></div>";
  html += name + icon + effect;
  return html;
}

/**
 * This function will format the Record Materia JSON into a human-readable result.
 * @param json - the JSON from the API query
 */
function formatRMJSON(json) {
  let start = "<div class='result'>";
  let name = "<h3 class='result__name'>" + json.recordMateriaName + "</h3>";
  let icon = "<div class='icon-container'><img class='icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = "<p class='effect'>" + json.effect + "</p></div>";
  let unlock = "<p class='info'>Unlock Criteria - " + json.unlockCriteria + "</p>";
  let end = "</div>";
  return start + name + icon + effect + unlock +  end;
}

function formatStatusJSON(json, options) {
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

function formatAbilityJSON(json) {
  let start = "<div class='result'>";
  let name = "<h3 class='result__name'>" + json.abilityName + "</h3>";
  let icon = "<div class='icon-container'><img class='icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = "<p class='effect'>" + json.effects + "</p></div>";
  let flexDiv = "<div class='flex'>";
  let castTime = "<span class='margin-right info'>Cast Time - " + json.castTime + "</span>";
  let elements = "<span class='elements info'>Elements - " + formatElements(json) + "</span>";
  let multiplier = "<span class='info'>Total Multiplier - " + json.multiplier + "</span>";
  let school = "<span class='margin-right info'>School - " + schoolDict[json.school] + "</span>";
  let sbGain = "<span class='margin-right info'>SB Gain - " + json.soulBreakPointsGained + "</span>";
  let target = "<span class='info'>Target - " + targetDict[json.targetType] + "</span>";
  let endDiv = "</div>";
  return start + name + icon + effect + flexDiv + castTime + elements + endDiv + flexDiv + school + multiplier + endDiv + flexDiv + sbGain + target + endDiv + formatOrbRequirements(json) + endDiv;
}

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


/**
 * This helper function will find the element name to match the ID passed in
 * @param elementID - the element ID
 * @returns human readable element name
 */
function parseElementNumber(elementID) {
  let elementName = elementDict[elementID];
  if(elementName === '-') {
    return 'NE';
  }
  else {
    return elementName;
  }
}

function formatElements(json) {
  let elements = "";
  for (let j = 0; j < json.elements.length; j++) {
    elements += parseElementNumber(json.elements[j]);
    if (j !== json.elements.length - 1) {
      elements += ", ";
    }
  }
  return elements;
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
