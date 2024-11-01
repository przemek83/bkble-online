class Knight {
  constructor(knightAsString) {
    const afterSplit = knightAsString.trim().split(/\t/g);
    this.name = afterSplit[0].replace(/\[.*\]/g, "");
    this.order = afterSplit[0].match(/\[.*\]/g);

    if (this.order === null)
      this.order = "";

    else
      this.order = this.order[0];

    let fromIndex;
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
  let tbodyString = "";
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
  const textToParse = textarea.value;
  const splitted = textToParse.split(/\t\n/);
  console.log("splitted has " + splitted.length + " lines");

  if (splitted.length !== 103 && splitted.length !== 107) {
    console.log("error of split");
    textarea.value = "";
    return;
  }

  let slip = 0;
  if (splitted.length === 103) slip = 3;
  else slip = 7;

  let lastPlace = 0;
  for (let i = 0; i < 100; i++) {
    const knight = new Knight(splitted[slip + i]);

    if (i === 98) lastPlace = knight.place;

    if (i === 99) knight.place = lastPlace + 1;

    if (false === checkIfKnightInArrayAndUpdate(knight)) {
      knightsArray[knightsArray.length] = knight;
    }
  }

  knightsArray.sort(compare);

  document.getElementById("wrapper").innerHTML = createTable(knightsArray);

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

function createTable(knights) {
  const theader = '<table id="rounded-corner" >';
  let tbody = "<tbody>";
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
  for (let i = 0; i < knights.length; i++) {
    if (knights[i].ignore === true) continue;

    tbody += "<tr>";
    tbody += createRow(knights[i], i);
    tbody += "</tr>\n";
  }
  tbody += "</tbody>";
  const tfooter = "</table>";
  return theader + tbody + tfooter;
}

function checkIfKnightInArrayAndUpdate(knight) {
  for (let i = 0; i < knightsArray.length; i++) {
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
  console.log("Checkpoint saved");

  for (const knight of knightsArray) {
    knight.lootFromCheckPoint = knight.loot;
    knight.lootDiff = 0;
  }

  document.getElementById("wrapper").innerHTML = createTable(knightsArray);
}

function ignoreKnight(number) {
  knightsArray[number].ignore = true;
  document.getElementById("wrapper").innerHTML = createTable(knightsArray);
}


module.exports = {
  dataPasted,
  Knight,
  compare,
  createRow,
  createTable,
  saveCheckpoint,
  ignoreKnight
};

