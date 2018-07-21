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
  "elarra": "urara"
};

//TODO Need to handle multi-word characters
$(function () {
	$("#search-button").click(function(e) {
    e.preventDefault();

    let $select = $("#search-select"); //dropdown menu
    let query = $("#search-text").val();
    if($select.val() === "sb") {
      //parse text
      let parsedQuery = parseSBRequest(query);
      console.log(sbURL + parsedQuery);
      $.getJSON(sbURL + parsedQuery, function(json) {
        if(json[0] !== undefined) {
          console.log(json[0]);
          $("#results").html(formatSBJSON(json[0]));
        }
        else {
          $("#results").html("Invalid query, try again");
        }
      });
    }
    else if($select.val() === "lm") {
      let arr = query.split(" ");
      let cbParams = new Object();

      getCharacterID(arr[0], cbParams, getLMsForCharID);
    }
    else {
      console.log("character");
    }
	});
});


/**
 * This function parses if the user is asking for a specific soul break by name
 * or by a character's name and SB tier e.g. Cloud USB
 */
function parseSBRequest(text) {
  let sbRegex = /SSB|BSB|USB|CSB|chain|OSB|AOSB|UOSB|GSB|Glint/gi; //lcsb is caught by the CSB
  if(text.match(sbRegex)) { //contains specific character name and tier
    //search to see if there are quotes
    let arr = [];
    if(text.includes('"')) {
      let splitData = text.split('"');
      splitData[0] = splitData[0].trim(); //get rid of spaces in
      arr = splitData;
    }
    else {
      arr = text.split(" ");
    }

    let sbTier = arr[0];
    let charName = searchAliases(arr[1]);

    //filter the tier info to pass to getting the soul breaks
    let objSBTier = filterSBTier(sbTier);
    getCharacterID(charName, objSBTier, getTierSBsForCharID);
  }
  else {
    return text;
  }
}

function filterSBTier(sbString) {
  //find if there's a number
  console.log("the string is " + sbString);
  let sbTier = sbString.toLowerCase();
  let format = { index: 0 };
  if(hasNumber(sbTier)) {
    //create an index
    format.index = sbTier.charAt(sbTier.length-1);
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

function hasNumber(myString) {
  return /\d/.test(myString);
}

function searchAliases(charName) {
  for(key in characterAliases) {
    if(characterAliases[key].includes(charName)) {
      charName = key;
    }
  }
  return charName;
}

/**
 * TODO rename, make it only execute callback if present, otherwise return character ID
 * Gets the character ID of the specified character and executes the callback function
 * @param charName - name of the character to retrieve their ID
 * @param cbParams - the parameters the callback will need e.g.
 *    tierID - the tier ID of the soul breaks being searched
 *    index - the index in the list of soulbreaks e.g. 1 for "Cloud USB1"
 * @param callback - function that will make use of the character ID
 */
function getCharacterID(charName, cbParams, callback) {
  console.log("this is the callback");
  console.log(callback.name);
  $.getJSON(apiBase + "/Characters/Name/" + charName, function(json) {
    //execute different code based on the callback name
    //pass in callback params as object
    json.forEach((json) => {
      if(json.characterName.toLowerCase() === charName.toLowerCase()) { //loop through and find exact match for Character Name
        callback(json.id, cbParams); //calls function to get character SBs for specified tier
        return; //break out of loop if exact match
      }
    });
  });
}

/**
 * Called when user is searching for a specific tier of character relics e.g. Cloud BSB, Cloud USB
 * @param charID - character ID
 * @param cbParams - callback parameters
 */
function getTierSBsForCharID(charID, cbParams) {
  $.getJSON(apiBase + "/SoulBreaks/Character/" + charID, function(json) {
    let SBs = "";
    let arr = [];

    if(cbParams.index === 0) {
      json.forEach((json) => {
        if(json.soulBreakTier === cbParams.tierID) {
          SBs += formatSBJSON(json);
        }
      });
    }
    else {
      json.forEach((json) => {
        if(json.soulBreakTier === cbParams.tierID) {
          arr.push(json);
        }
      }); //TODO REFACTOR handle array out of bound exception
      SBs += formatSBJSON(arr[cbParams.index-1]);
    }

    $("#results").html(SBs); //TODO this could be bad if we wait to chain requests e.g. Squall BSB, LM
  });
}

function getLMsForCharID(charID, cbParams) {
  $.getJSON(apiBase + "/LegendMaterias/Character/" + charID, function(json) {
    let LMs = "<h3 class='character__name'>" + json[0].characterName + "</h3>"; //get the character name once
    json.forEach((json) => {
      console.log("legend materia");
      console.log(json);
      LMs += formatLMJSON(json);
    });
    $("#results").html(LMs);
  });
}

/**
 * This function will format the Soul Break JSON into a human-readable result.
 * @param json - the JSON from the API query
 * TODO add if the relic gives +element? relicName and relicId are provided
 * TODO add elements to effect? also to commands? json.elements array has numbers to indicate the elements
 */
function formatSBJSON(json) {
  console.log(json);
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
      if(i !== json.commands.length-1) { //Due to uncertainty of number of previous/next elements/features, it most likely can only be solved this way
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
        otherEffects += "<span class='bold'>" + json.otherEffects[i].description + "</span>";
        otherEffects += "<p class='otherEffects__effect'>" + json.otherEffects[i].effects + "</p>";
      }
    }
    otherEffects += "</div>";
  }
  html += name + icon + effect + statuses + otherEffects + commands + "</div>";
  return html;
}

/**
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
  //soulbreaks
  //lms?
  //record materia?
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
