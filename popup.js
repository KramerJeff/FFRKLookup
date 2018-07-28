var bgPage = chrome.extension.getBackgroundPage();
const apiBase = "http://ffrkapi.azurewebsites.net/api/v1.0/";
let sbURL = apiBase + "/SoulBreaks/Name/";
let $results = $("#results");
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
  13: "Wind"
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

const charIDs = {
  "ace": 206,
  "aemo": 221,
  "aerith": 100,
  "agrias": 194,
  "alma": 205,
  "alphinaud": 181,
  "amarant": 135,
  "angeal": 109,
  "aphmau": 155,
  "aranea": 192,
  "arc": 45,
  "aria": 51,
  "ashe": 161,
  "auron": 145,
  "ayame": 151,
  "balthier": 158,
  "barbariccia": 69,
  "bard": 20,
  "barret": 98,
  "bartz": 74,
  "basch": 160,
  "beatrix": 136,
  "berserker": 17,
  "black mage": 7,
  "braska": 147,
  "cait sith": 103,
  "cecil (dark knight)": 52,
  "cecil (paladin)": 53,
  "celes": 83,
  "ceodore": 66,
  "cid (iv)": 65,
  "cid (vii)": 107,
  "cid (xiv)": 183,
  "cid raines": 174,
  "cinque": 213,
  "cloud": 97,
  "cloud of darkness": 50,
  "curilla": 152,
  "cyan": 88,
  "dark knight": 14,
  "delita": 195,
  "desch": 48,
  "deuce": 207,
  "devout": 10,
  "dorgann": 76,
  "dragoon": 13,
  "echo": 27,
  "edea": 122,
  "edgar": 85,
  "edge": 62,
  "edward": 57,
  "eiko": 134,
  "elarra": 2,
  "elena": 113,
  "emperor": 41,
  "enna": 224,
  "estinien": 186,
  "exdeath": 77,
  "fang": 172,
  "faris": 75,
  "firion": 32,
  "fran": 159,
  "freya": 132,
  "fujin": 124,
  "fusoya": 63,
  "gabranth": 163,
  "gaffgarion": 199,
  "galuf": 71,
  "garland": 24,
  "garnet": 129,
  "gau": 89,
  "gilgamesh": 73,
  "gladiator": 22,
  "gladiolus": 188,
  "gogo (v)": 72,
  "gogo (vi)": 93,
  "golbez": 64,
  "gordon": 37,
  "guy": 34,
  "haurchefant": 185,
  "hilda": 42,
  "hope": 171,
  "ignis": 189,
  "ingus": 47,
  "iris": 191,
  "irvine": 119,
  "jecht": 146,
  "josef": 40,
  "kain": 54,
  "kefka": 95,
  "kelger": 80,
  "kimahri": 143,
  "king": 212,
  "kiros": 125,
  "knight": 4,
  "krile": 78,
  "kuja": 137,
  "laguna": 121,
  "lann": 219,
  "larsa": 164,
  "leila": 38,
  "lenna": 70,
  "leo": 96,
  "leon": 35,
  "lightning": 167,
  "lion": 154,
  "locke": 82,
  "lulu": 142,
  "luneth": 44,
  "machina": 210,
  "magus": 8,
  "marach": 201,
  "marche": 203,
  "marcus": 138,
  "maria": 33,
  "master": 28,
  "matoya": 29,
  "meia": 30,
  "meliadoul": 202,
  "minfilia": 182,
  "minwu": 36,
  "mog": 84,
  "monk": 5,
  "montblanc": 204,
  "morrow": 220,
  "mustadio": 197,
  "nabaat": 176,
  "nine": 208,
  "ninja": 21,
  "noctis": 187,
  "noel": 175,
  "onion knight": 49,
  "orlandeau": 198,
  "ovelia": 196,
  "paine": 148,
  "palom": 59,
  "papalymo": 180,
  "penelo": 162,
  "porom": 60,
  "prishe": 153,
  "prompto": 190,
  "queen": 211,
  "quina": 133,
  "quistis": 116,
  "raijin": 123,
  "ramza": 193,
  "ranger": 18,
  "rapha": 200,
  "red mage": 6,
  "red xiii": 101,
  "refia": 46,
  "reks": 166,
  "relm": 92,
  "rem": 209,
  "reno": 108,
  "reynn": 218,
  "ricard": 39,
  "rikku": 144,
  "riku": 217,
  "rinoa": 115,
  "rosa": 56,
  "rubicante": 67,
  "rude": 112,
  "rufus": 110,
  "rydia": 55,
  "sabin": 86,
  "samurai": 12,
  "sarah": 25,
  "sazh": 170,
  "scott": 43,
  "seifer": 120,
  "selphie": 118,
  "sephiroth": 106,
  "serah": 173,
  "setzer": 90,
  "seven": 214,
  "seymour": 149,
  "shadow": 87,
  "shantotto": 150,
  "shelke": 111,
  "sice": 215,
  "snow": 168,
  "sora": 216,
  "spellblade": 15,
  "squall": 114,
  "steiner": 131,
  "strago": 91,
  "summoner": 11,
  "tama": 223,
  "tellah": 61,
  "terra": 81,
  "thancred": 178,
  "thief (core)": 19,
  "thief (i)": 31,
  "tidus": 139,
  "tifa": 99,
  "tyro": 1,
  "ultimecia": 127,
  "umaro": 94,
  "ursula": 68,
  "vaan": 157,
  "vanille": 169,
  "vayne": 165,
  "viking": 16,
  "vincent": 104,
  "vivi": 130,
  "wakka": 141,
  "ward": 126,
  "warrior": 3,
  "warrior of light": 23,
  "white mage": 9,
  "wol": 26,
  "wrieg": 222,
  "xezat": 79,
  "y'shtola": 177,
  "yang": 58,
  "yda": 179,
  "ysayle": 184,
  "yuffie": 102,
  "yuna": 140,
  "zack": 105,
  "zeid": 156,
  "zell": 117,
  "zidane": 128
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

const sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|FSB|Glint/gi; //lcsb is caught by the CSB
const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|GSB|FSB|Glint|lm|lmr/gi;


$(function () {
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
        else if(request.length > 1 && request[1] === "lm" || request[1] === "lmr") {
          let charID = getCharacterID(request[0]);
          return getLMsForCharID(charID);
        }
        else {
          return getSoulBreak(request);
        }
      }).then(function(HTML) {
        $("#results").append(HTML);
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
    queries.forEach(function(query) { //for each request, grab command and character name
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
 * Gets parts of a query depending on the text
 */
function getParts(query) {
    let parts = [];
    if (query.includes('"')) {
        parts = query.split('"');
        parts.shift(); //get rid of empty element
    } else {
        parts = query.split(" ");
    }

    if(parts.length > 1 && parts[1].match(cmdRegex)) {
      parts[0] = searchAliases(parts[0]);
      parts[1] = parts[1].trim().toLowerCase();
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
  if(sbTier === 'sb') { //TODO generic sb request
    let objSBTier = { tierID: 0};
    console.log("parseSBRequest " + charID);
    return getTierSBsForCharID(charID, objSBTier);
  }
  else if(sbTier.match(sbRegex)) { //contains specific character name and tier
    let objSBTier = filterSBTier(sbTier); //filter the tier info to pass to getting the soul breaks
    console.log("parseSBRequest " + charID);
    return getTierSBsForCharID(charID, objSBTier);
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
 * Searches through the characterAliases dictionary to see
 * if the name is an alias - if it does, it replaces it with a name
 * the API can recognize.
 * @param charName - the alleged name of the character
 * @returns the API recognizable name
 */
function searchAliases(charName) {
  if( charName === "WoL" ) {
    return "warrior of light";
  }
  for(key in characterAliases) {
    if(characterAliases[key].includes(charName.toLowerCase())) {
      charName = key;
    }
  }
  return charName;
}

/**
 * Gets the character ID of the specified character
 * @param charName - name of the character to retrieve their ID
 * @returns charID - the integer ID of the character
 */
function getCharacterID(charName) {
  return charIDs[charName];
}

/**
 * Called when user is searching for a specific tier of character relics e.g. Cloud BSB, Cloud USB
 * @param charID - character ID
 * @param cbParams - callback parameters
 */
function getTierSBsForCharID(charID, cbParams) {
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/SoulBreaks/Character/" + charID, function(json) {
      let SBs = "";
      let arr = [];
      //TODO if cbParams.tierID === 0 -> get all soul breaks
      if(cbParams.tierID === 0) {
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
        }); //TODO REFACTOR handle array out of bound exception
        SBs += formatSBJSON(arr[cbParams.index-1]);
      }
      resolve(SBs);
    });
  });

}
/**
 * Gets the Legend Materia for the specified character
 * @param charID - the integer ID for the character
 * @returns a Promise with the formatted HTML for the Legend Materia
 */
function getLMsForCharID(charID) {
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/LegendMaterias/Character/" + charID, function(json) {
      let LMs = "<div class='sb-result'><h3 class='character__name'>" + json[0].characterName + "</h3>"; //get the character name once
      json.forEach((json) => {
        console.log("legend materia " + json);
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
    $.getJSON(apiBase + "/SoulBreaks/Name/" + request.join(" "), function(json) {
      let SBs = "";
      json.forEach((json) => {
        SBs += formatSBJSON(json);
      });
      resolve(SBs);
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
  console.log("formatSBJSON " + json);
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
        statuses += "<span class='braveMode__elements'>Elements - ";
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
  for (let j = 0; j < json.elements.length; j++) { //TODO put this loop in a helper function?
    elements += parseElementNumber(json.elements[j]);
    if (j !== json.elements.length - 1) {
      elements += ", ";
    }
  }
  return elements;
}
