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

const characterAliases = {
  "onion knight": ["ok", "onion knight", "onion"],
  "orlandeau": ["tg cid", "tgc"],
  "cecil (dark knight)": ["dcecil", "dark knight cecil", "cecil dark knight"],
  "cecil (paladin)": ["pcecil", "paladin cecil", "cecil paladin"],
  "gilgamesh": "greg",
  "aerith": "aeris",
  "cid (xiv)": "cid xiv",
  "cid (vii)": "cid vii",
  "elarra": "urara",
  "barbariccia": "barb"
};

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
    let sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|UOSB|GSB|Glint/gi; //lcsb is caught by the CSB
    let sequence = Promise.resolve();

    requests.forEach(function(request) {
      sequence = sequence.then(function() {
        if(request[1].match(sbRegex)) {
          return parseSBRequest(request);
        }
        else if(request[1] === "lm") { //TODO this is broken
          return getCharacterID(request[0]).then(charID => getLMsForCharID(charID));
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
    parts[0] = searchAliases(parts[0]);
    parts[1] = parts[1].trim().toLowerCase();
    return parts;
}

/**
 * This function parses if the user is asking for a specific soul break by name
 * or by a character's name and SB tier e.g. Cloud USB
 */
function parseSBRequest(arr) {
  let sbHTML = "";
  let sbRegex = /SSB|BSB|USB|CSB|chain|OSB|AOSB|UOSB|GSB|Glint/gi; //lcsb is caught by the CSB
  let charName = arr[0];
  let sbTier = arr[1];
  if(sbTier === 'sb') { //TODO generic sb request
    console.log("get ALL the soul breaks!");
  }
  else if(sbTier.match(sbRegex)) { //contains specific character name and tier
    let objSBTier = filterSBTier(sbTier); //filter the tier info to pass to getting the soul breaks
    return getCharacterID(charName)
      .then(charID => getTierSBsForCharID(charID, objSBTier));
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
      format.tierID = 10;
      break;
    case "aosb":
    case "uosb":
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
  for(key in characterAliases) {
    if(characterAliases[key].includes(charName)) {
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
  return new Promise(function(resolve, reject) {
    $.getJSON(apiBase + "/Characters/Name/" + charName, function(outerJSON) {
      outerJSON.forEach((json) => {
        if(json.characterName.toLowerCase() === charName.toLowerCase()) { //loop through and find exact match for Character Name
          resolve(json.id); //resolve promise with correct character ID
        }
      });
    });
  });
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

      if(cbParams.index === 0) { //if there is no sb number e.g. cloud usb2
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
 * This function will format the Soul Break JSON into a human-readable result.
 * @param json - the JSON from the API query
 * TODO add if the relic gives +element? relicName and relicId are provided
 * TODO add elements to effect? also to commands? json.elements array has numbers to indicate the elements
 */
function formatSBJSON(json) {
  console.log("formatSBJSON " + json);
  let html = "<div class='sb-result'>";
  let name = "<div class='sb'><h3 class='sb-result__name'>" + json.description + "</h3>";
  let icon = "<div class='sb-main'><img class='sb-result__icon' src='" + json.imagePath.split('"')[0] + "'/>"; //TODO make effect text vertically aligned like BSB commands
  let effect = "<p class='sb-result__effect'>" + json.effects + "</p></div></div>";

  let commands = "";
  let statuses = "";
  let otherEffects = "";
  if(json.commands.length !== 0) {
    commands += "<div class='cmds'>";
    for(let i = 0; i < json.commands.length; i++) {
      //TODO create container for these so they never overlap
      commands += "<div class='cmd'><img class='cmd__icon' src='" + json.commands[i].imagePath.split('"')[0] + "'/>";
      commands += "<p class='cmd__effect'>" + json.commands[i].effects + "</p></div>";

      //School and Elements
      commands += "<div class='cmd'><span class='margin-right'>";
      commands += "School - " + schoolDict[json.commands[i].school] + "</span>";
      commands += "<span>"
      for(let j = 0; j < json.commands[i].elements.length; j++){
        //console.log("value = " + elementDict[json.commands[i].elements[j]]);
        commands += "" + parseElementNumber(json.commands[i].elements[j]);
        if(j !== json.commands[i].elements.length - 1) {
          commands += ", ";
        }
      }
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
      if(json.statuses[i].description !== "Haste" && json.statuses[i].description !== "Burst Mode" && !json.statuses[i].description.includes("Attach") && !json.statuses[i].description.includes("Imp") && !json.statuses[i].description.includes("Blink")) {
        statuses += "<span class='status__name'>" + json.statuses[i].description + "</span>";
        statuses += "<p class='status__effect'>" + json.statuses[i].effects + "</p>";
        //TODO if statuses[i].description === "Brave Mode" - find Brave Mode data from BraveActions/Character/{CharacterID}
      }
    }
    statuses += "</div>";
  }
  if(json.otherEffects) {
    otherEffects += "<div class='otherEffects'>";
    for(let i = 0; i < json.otherEffects.length; i++) {
      if(json.otherEffects[i].description !== "Attack") {
        otherEffects += "<span class='status__name'>" + json.otherEffects[i].description + "</span>";
        otherEffects += "<p class='otherEffects__effect'>" + json.otherEffects[i].effects + "</p>";
      }
    }
    otherEffects += "</div>";
  }
  //if(json.braveActions) TODO Brave Actions!
  //braveCondition in braveActions specifies how to increment Brave
  html += name + icon + effect + statuses + otherEffects + commands + "</div>";
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
