class Knight {
  constructor(knightAsString) {
    var afterSplit = knightAsString.trim().split(/\t/g);
    this.name = afterSplit[0].replace(/\[.*\]/g, "");
    this.order = afterSplit[0].match(/\[.*\]/g);

    if (this.order === null)
      this.order = "";

    else
      this.order = this.order[0];

    var fromIndex;
    if (afterSplit.length === 7) fromIndex = 2;
    else fromIndex = 1;
    this.level = afterSplit[fromIndex].trim();
    this.lootText = String(afterSplit[fromIndex + 1]);
    this.loot = Number(afterSplit[fromIndex + 1].replace(/\./g, "").trim());
    this.fights = Number(afterSplit[fromIndex + 2].replace(/\./g, "").trim());
    this.win = Number(afterSplit[fromIndex + 3].replace(/\./g, "").trim());
    this.place = Number(afterSplit[fromIndex + 4].match(/\n.*/g)) - 1;
    this.loose = Number(
      afterSplit[fromIndex + 4]
        .replace(/\./g, "")
        .replace(/\n.*/g, "")
        .trim()
    );
    this.lootFromCheckPoint = 0;
    this.lootDiff = 0;
    this.ignore = false;

    this.print = function () {
      return (
        this.lootDiff +
        " " +
        this.place +
        " " +
        this.name +
        " " +
        this.order +
        " " +
        this.level +
        " " +
        this.lootText +
        "\n"
      );
    };
  }

  calculateLootDiff() {
    this.lootDiff = this.loot - this.lootFromCheckPoint;
  };
}

function createRow(knight, row) {
  var tbodyString = "";
  tbodyString += "<td>";
  tbodyString += knight.lootDiff;
  tbodyString += "</td><td>";
  tbodyString += knight.place;
  tbodyString += "</td><td>";
  tbodyString += knight.name;
  tbodyString += "</td><td>";
  tbodyString += knight.order;
  tbodyString += "</td><td>";
  tbodyString += knight.level;
  tbodyString += "</td><td>";
  tbodyString += knight.lootText;
  tbodyString += "</td><td>";
  tbodyString +=
    '<center><button class="btnIgnore" name="button" id="button" onclick="ignoreKnight(' +
    row +
    ');">x</button></center>';
  tbodyString += "</td>";
  return tbodyString;
};

var knightsArray = new Array();

function dataPasted(textarea) {
  var textToParse = textarea.value;
  var console = document.getElementById("console");

  var splitted = textToParse.split(RegExp("\t\n"));
  if (console !== null)
    console.value =
      console.value + "splitted has " + splitted.length + " lines\n";

  if (splitted.length !== 103 && splitted.length !== 107) {
    if (console !== null) console.value = console.value + "error of split\n";
    textarea.value = "";
    return;
  }

  var slip = 0;
  if (splitted.length === 103) slip = 3;
  else slip = 7;

  var lastPlace = 0;
  for (var i = 0; i < 100; i++) {
    var knight = new Knight(splitted[slip + i]);

    if (i === 98) lastPlace = knight.place;

    if (i === 99) knight.place = lastPlace + 1;

    if (false === checkIfKnightInArrayAndUpdate(knight)) {
      knightsArray[knightsArray.length] = knight;
    }
  }

  knightsArray.sort(compare);

  createTable();

  textarea.value = "";
}

function compare(a, b) {
  if (a.lootDiff < b.lootDiff) {
    return 1;
  }
  if (a.lootDiff > b.lootDiff) {
    return -1;
  }
  return 0;
}

function createTable() {
  var theader = '<table id="rounded-corner" >';
  var tbody = "<tbody>";
  tbody += "<thead><tr>";
  tbody += '<th scope="col">Increase</th>';
  tbody += '<th scope="col">Place</th>';
  tbody += '<th scope="col">Knight</th>';
  tbody += '<th scope="col">Order</th>';
  tbody += '<th scope="col">Level</th>';
  tbody += '<th scope="col">Loot</th>';
  tbody += '<th scope="col">Ignore</th>';
  tbody += "</tr>";
  tbody += "</thead>";
  for (var i = 0; i < knightsArray.length; i++) {
    if (knightsArray[i].ignore === true) continue;

    tbody += "<tr>";
    tbody += createRow(knightsArray[i], i);
    tbody += "</tr>\n";
  }
  tbody += "</tbody>";
  var tfooter = "</table>";
  document.getElementById("wrapper").innerHTML = theader + tbody + tfooter;
}

function checkIfKnightInArrayAndUpdate(knight) {
  for (var i = 0; i < knightsArray.length; i++) {
    if (knightsArray[i].name === knight.name) {
      knight.ignore = knightsArray[i].ignore;
      knight.lootFromCheckPoint = knightsArray[i].lootFromCheckPoint;
      knight.calculateLootDiff();
      knightsArray[i] = knight;
      return true;
    }
  }
  knight.lootFromCheckPoint = knight.loot;
  return false;
}

function saveCheckpoint() {
  var console = document.getElementById("console");
  if (console !== null) console.value = console.value + "Checkpoint saved\n";
  for (var i = 0; i < knightsArray.length; i++) {
    knightsArray[i].lootFromCheckPoint = knightsArray[i].loot;
    knightsArray[i].lootDiff = 0;
  }

  createTable();
}

function ignoreKnight(number) {
  knightsArray[number].ignore = true;
  createTable();
}


module.exports = {
  dataPasted,
  Knight,
  compare,
  createRow
};

