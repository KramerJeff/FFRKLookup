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
  14: "Light."
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
    'ace': 210,
    'aemo': 226,
    'aerith': 102,
    'agrias': 197,
    'alma': 208,
    'alphinaud': 184,
    'amarant': 137,
    'angeal': 111,
    'aphmau': 157,
    'aranea': 195,
    'arc': 47,
    'aria': 53,
    'ashe': 164,
    'auron': 147,
    'ayame': 153,
    'balthier': 161,
    'barbariccia': 71,
    'bard': 22,
    'barret': 100,
    'bartz': 76,
    'basch': 163,
    'beatrix': 138,
    'berserker': 19,
    'biggs': 3,
    'black mage': 9,
    'braska': 149,
    'cait sith': 105,
    'cecil (dark knight)': 54,
    'cecil (paladin)': 55,
    'celes': 85,
    'ceodore': 68,
    'cid (iv)': 67,
    'cid (vii)': 109,
    'cid (xiv)': 186,
    'cid raines': 177,
    'cinque': 217,
    'cloud': 99,
    'cloud of darkness': 52,
    'curilla': 154,
    'cyan': 90,
    'dark knight': 16,
    'delita': 198,
    'desch': 50,
    'deuce': 211,
    'devout': 12,
    'dorgann': 78,
    'dragoon': 15,
    'echo': 29,
    'edea': 124,
    'edgar': 87,
    'edge': 64,
    'edward': 59,
    'eiko': 136,
    'elarra': 2,
    'elena': 115,
    'emperor': 43,
    'enna': 229,
    'estinien': 189,
    'exdeath': 79,
    'fang': 175,
    'faris': 77,
    'firion': 34,
    'fran': 162,
    'freya': 134,
    'fujin': 126,
    'fusoya': 65,
    'gabranth': 166,
    'gaffgarion': 202,
    'galuf': 73,
    'garland': 26,
    'garnet': 131,
    'gau': 91,
    'gilgamesh': 75,
    'gladiator': 24,
    'gladiolus': 191,
    'gogo (v)': 74,
    'gogo (vi)': 95,
    'golbez': 66,
    'gordon': 39,
    'guy': 36,
    'haurchefant': 188,
    'hilda': 44,
    'hope': 174,
    'ignis': 192,
    'ingus': 49,
    'iris': 194,
    'irvine': 121,
    'jack': 220,
    'jecht': 148,
    'josef': 42,
    'kain': 56,
    'kefka': 97,
    'kelger': 82,
    'kimahri': 145,
    'king': 216,
    'kiros': 127,
    'knight': 6,
    'krile': 80,
    'kuja': 139,
    'laguna': 123,
    'lann': 224,
    'larsa': 167,
    'leila': 40,
    'lenna': 72,
    'leo': 98,
    'leon': 37,
    'lightning': 170,
    'lilisette': 159,
    'lion': 156,
    'locke': 84,
    'lulu': 144,
    'luneth': 46,
    'machina': 214,
    'magus': 10,
    'marach': 204,
    'marche': 206,
    'marcus': 140,
    'maria': 35,
    'master': 30,
    'matoya': 31,
    'meia': 32,
    'meliadoul': 205,
    'minfilia': 185,
    'minwu': 38,
    'mog': 86,
    'monk': 7,
    'montblanc': 207,
    'morrow': 225,
    'mustadio': 200,
    'nabaat': 179,
    'nine': 212,
    'ninja': 23,
    'noctis': 190,
    'noel': 178,
    'onion knight': 51,
    'orlandeau': 201,
    'orran': 209,
    'ovelia': 199,
    'paine': 150,
    'palom': 61,
    'papalymo': 183,
    'penelo': 165,
    'porom': 62,
    'prishe': 155,
    'prompto': 193,
    'queen': 215,
    'quina': 135,
    'quistis': 118,
    'raijin': 125,
    'ramza': 196,
    'ranger': 20,
    'rapha': 203,
    'red mage': 8,
    'red xiii': 103,
    'refia': 48,
    'reks': 169,
    'relm': 94,
    'rem': 213,
    'reno': 110,
    'reynn': 223,
    'ricard': 41,
    'rikku': 146,
    'riku': 222,
    'rinoa': 117,
    'rosa': 58,
    'rubicante': 69,
    'rude': 114,
    'rufus': 112,
    'rydia': 57,
    'sabin': 88,
    'samurai': 14,
    'sarah': 27,
    'sazh': 173,
    'scott': 45,
    'seifer': 122,
    'selphie': 120,
    'sephiroth': 108,
    'serah': 176,
    'setzer': 92,
    'seven': 218,
    'seymour': 151,
    'shadow': 89,
    'shantotto': 152,
    'shelke': 113,
    'sice': 219,
    'snow': 171,
    'sora': 221,
    'spellblade': 17,
    'squall': 116,
    'steiner': 133,
    'strago': 93,
    'summoner': 13,
    'tama': 228,
    'tellah': 63,
    'terra': 83,
    'thancred': 181,
    'thief (core)': 21,
    'thief (i)': 33,
    'tidus': 141,
    'tifa': 101,
    'tyro': 1,
    'ultimecia': 129,
    'umaro': 96,
    'ursula': 70,
    'vaan': 160,
    'vanille': 172,
    'vayne': 168,
    'viking': 18,
    'vincent': 106,
    'vivi': 132,
    'wakka': 143,
    'ward': 128,
    'warrior': 5,
    'warrior of light': 25,
    'wedge': 4,
    'white mage': 11,
    'wol': 28,
    'wrieg': 227,
    'xezat': 81,
    "y'shtola": 180,
    'yang': 60,
    'yda': 182,
    'ysayle': 187,
    'yuffie': 104,
    'yuna': 142,
    'zack': 107,
    'zeid': 158,
    'zell': 119,
    'zidane': 130,
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
  "vortex": ["voltech"]
};

const sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|FSB|Glint/gi; //lcsb is caught by the CSB
const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|FSB|Glint|lm|lmr|abil|ability|rm/gi;


// createAbilityDict().then(data => {
//   abilDict = data;
// });


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
        else if(request.length > 1 && request[1] === "lm" || request[1] === "lmr") { //if i did contains.("lm") that could be too generic
          return getLMsForChar(request);
        }
        else if(request.length > 1 && request[1] === "abil" || request[1] === "ability") {
          return getAbility(request[0], abilDict);
        }
        else if(request.length > 1 && request[1] === "rm") {
          //TODO RM aliases
          return getRecordMateria(request[0]);
        }
        else {
          console.log("getSoulBreak " + request);
          return getSoulBreak(request);
        }
      }).then(function(HTML) {
        $("#results").append(HTML);
      }).catch(function(err) {
        let errHTML = "<div class='sb-result result'><span class='error'>" + err + "</span></div>";
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
    return Promise.reject(new Error(charName + ' is not a valid character name'));
  }
  else if(sbTier === 'sb') { //TODO generic sb request
    let objSBTier = { tierID: 0};
    return getTierSBsForCharID(charID, objSBTier, arr);
  }
  else if(sbTier.match(sbRegex)) { //contains specific character name and tier
    let objSBTier = filterSBTier(sbTier); //filter the tier info to pass to getting the soul breaks
    return getTierSBsForCharID(charID, objSBTier, arr);
  }
  else {
    return Promise.reject(new Error(charName + ' ' + sbTier + ' is not a valid request'));
  }
}

function filterSBTier(sbString) {
  let sbTier = sbString.toLowerCase();
  let format = { index: 0 };
  if(hasNumber(sbTier)) { //find if there's a number
    format.index = sbTier.charAt(sbTier.length-1); //create an index
    sbTier = sbTier.substring(0, sbTier.length-1); //get rid of last character
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
      format.tierID = 11;
      break;
  }
  return format;
}

/**
 * Helper function to find out if a string has a number or not
 */
function hasNumber(myString) {
  return /\d/.test(myString);
}

/**
 * Searches through the alias dictionary to see
 * if the name is an alias - if it does, it replaces it with a name
 * the API can recognize.
 * @param aliasDict - the dictionary to search through
 * @param name - the name input into the search
 * @returns the API recognizable name
 */
function searchAliases(aliasDict, name) {
  if( name === "WoL" ) {
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
          reject(new Error(request[0] + " does not have " + cbParams.index + " " + request[1].replace(/[0-9]/g, '') + "s"));
        }
      }
      resolve(SBs);
    });
  });

}
/**
 * Gets the Legend Materia for the specified character
 * @param request - the
 * @returns a Promise with the formatted HTML for the Legend Materia
 */
function getLMsForChar(request) {
  let charID = getCharacterID(request[0]);
  if(charID === -1) {
    return Promise.reject(new Error(request[0] + ' is not a valid character name'));
  }
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/LegendMaterias/Character/" + charID, function(json) {
      let LMs = "<div class='sb-result result'><h3 class='character__name'>" + json[0].characterName + "</h3>"; //get the character name once
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
  //TODO add error if json retrieves no results (json.length === 0? json === undefined?)
  return new Promise(function(resolve,reject) {
    $.getJSON(apiBase + "/SoulBreaks/Name/" + request, function(json) {
      let SBs = "";
      if(json.length === 0) {
        reject(new Error("There is no soul break named " + request));
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
      $.getJSON(apiBase + "/Abilities/" + id, function(json) {
        let abil = "";
        json.forEach((json) => {
          abil += formatAbilityJSON(json);
        });
        resolve(abil);
      });
    });
  }
  else {
    return Promise.reject(new Error(abilityName + ' is not an acceptable ability name'));
  }
}

function getRecordMateria(rmName) {
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/RecordMaterias/Name/" + rmName, function(json) {
      let RMs = "";
      json.forEach((json) => {
        RMs += formatRMJSON(json);
      });
      resolve(RMs);
    });
  });
}

/**
 * This function will format the Soul Break JSON into a human-readable result.
 * @param json - the JSON from the API query
 * @returns HTML formatted string to represent the Soul Break
 * TODO add if the relic gives +element? relicName and relicId are provided
 */
function formatSBJSON(json) {
  let html = "<div class='sb-result'>";
  let name = "<div class='sb'><h3 class='sb-result__name'>" + json.description + "</h3>";
  let icon = "<div class='sb-main'><img class='sb-result__icon' src='" + json.imagePath.split('"')[0] + "'/>";
  let effect = "<p class='sb-result__effect'>" + json.effects + "</p></div>";
  let entry = "<div class='flex'><span class='margin-right entry__castTime'>Cast Time - " + json.castTime + "</span><span class='entry__elements'>" + formatElements(json) + "</span></div></div>";

  let commands = "";
  let statuses = "";
  let otherEffects = "";
  let braveActions = "";
  if(json.commands.length !== 0) {
    commands += "<div class='cmds border-top'>";
    for(let i = 0; i < json.commands.length; i++) {
      //TODO create container for these so they never overlap
      commands += "<div class='cmd'><img class='cmd__icon' src='" + json.commands[i].imagePath.split('"')[0] + "'/>";
      commands += "<p class='cmd__effect'>" + json.commands[i].effects + "</p></div>";

      //School and Elements
      commands += "<div class='cmd'><span class='margin-right'>";
      commands += "School - " + schoolDict[json.commands[i].school] + "</span>";
      commands += "<span>"
      commands += formatElements(json.commands[i]);
      commands += "</span>";
      commands += "</div>";

      //Multiplier and Cast Time
      commands += "<div class='cmd";
      if(i !== json.commands.length-1) { //Due to uncertainty of number of previous/next elements/features, this is my best solution
        commands += " border-bottom'>"
      }
      else {
        commands += "'>";
      }
      commands += "<span class='margin-right'>Multiplier - " + json.commands[i].multiplier + "</span>";
      commands += "<span>Cast Time - " + json.commands[i].castTime + "</span></div>";
    }
    commands += "</div>";
  }
  if(json.statuses) {
    statuses += "<div class='status'>";
    for(let i = 0; i < json.statuses.length; i++) {
      //TODO create list of unwanted statuses included in SB preview
      //List so far: Poison, Minor Resist Dark (Resist?), KO, Instant KO, Protect, Shell, Magical Blink, Astra, Instant Cast
      if(json.statuses[i].description === "Brave Mode") {
        statuses += "<span class='status__name'>" + json.statuses[i].description + "</span>";
        statuses += "<p class='braveMode__condition'>Condition - " + json.braveActions[0].braveCondition + "</p>";
        statuses += "<div class='flex'><span class='margin-right braveMode__castTime'>Cast Time - " + json.braveActions[0].castTime + "</span>";
        statuses += "<span class='braveMode__elements'>";
        statuses += formatElements(json.braveActions[0]);
        statuses += "</span></div>";
        for(let j = 0; j < json.braveActions.length; j++) {
          if(j === 0 ) {
            statuses += "<p class='braveMode__desc'>" + json.braveActions[j].braveActionName + "</p>";
          }
          statuses += "<p class='braveMode__effects'>" + json.braveActions[j].braveLevel + " - " + json.braveActions[j].effects + "</p>";
        }
      }
      else if(json.statuses[i].description !== "Remove" && json.statuses[i].description !== "Reraise" && json.statuses[i].description !== "Haste" && json.statuses[i].description !== "Burst Mode" && !json.statuses[i].description.includes("Attach") && !json.statuses[i].description.includes("Imp") && !json.statuses[i].description.includes("Blink")) {
        statuses += "<span class='status__name'>" + json.statuses[i].description + "</span>";
        statuses += "<p class='status__effect'>" + json.statuses[i].effects + "</p>";
      }
    }
    statuses += "</div>";
  }
  if(json.otherEffects) {
    otherEffects += "<div class='otherEffects'>";
    for(let i = 0; i < json.otherEffects.length; i++) {
      if(json.otherEffects[i].description !== "Attack") {
          otherEffects += "<span class='status__name'>" + json.otherEffects[i].description;
          if(json.otherEffects[i].elements.length > 0) {
            otherEffects += " - (";
            otherEffects += formatElements(json.otherEffects[i]);
            otherEffects += ")</span>";
          }
          else {
            otherEffects += "</span>";
          }
          otherEffects += "<p class='otherEffects__effect'>" + json.otherEffects[i].effects + "</p>";
      }
    }
    otherEffects += "</div>";
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
