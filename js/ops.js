class Knight {
  constructor(knightAsString) {
    const fields = knightAsString.trim().split(/\t/g);

    this.place = Number(fields[0])

    this.name = fields[1].replace(/\[.*\]/g, "");
    this.order = fields[1].match(/\[.*\]/g);

    if (this.order === null)
      this.order = "";
    else
      this.order = this.order[0];

    this.level = fields[fields.length - 5].trim();
    this.lootText = String(fields[fields.length - 4]);
    this.loot = Number(fields[fields.length - 4].replace(/\./g, "").trim());
    this.fights = Number(fields[fields.length - 3].replace(/\./g, "").trim());
    this.win = Number(fields[fields.length - 2].replace(/\./g, "").trim());
    this.loose = Number(
      fields[fields.length - 1]
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

function resetKnightsArray() {
  knightsArray = [];
}

function getKnights(){
  return knightsArray
}

function isNumber(value) {
  return !isNaN(value.replace(/\./g, "").trim());
}

function isValidKnightString(knightString) {
  const fields = knightString.split('\t')
  if(fields.length != 7 && fields.length != 8)
    return false

  const firstFieldIsNumber = isNumber(fields[0])
  const last5FieldsAreNumbers = isNumber(fields[fields.length - 1]) &&
                                isNumber(fields[fields.length - 2]) &&
                                isNumber(fields[fields.length - 3]) &&
                                isNumber(fields[fields.length - 4]) &&
                                isNumber(fields[fields.length - 5])

  return firstFieldIsNumber && last5FieldsAreNumbers
}

function dataPasted(textarea) {
  let textToParse = textarea.value;
  textToParse = textToParse.replace(/\t\n/g, '\t')
  const lines = textToParse.split(/\n/).filter(line => line.trim() !== "");
  console.log("splitted has " + lines.length + " lines");

  if(lines.length == 0)    
    return

  for (const line of lines) {
    if(!isValidKnightString(line))
      continue

    const knight = new Knight(line);

    if (!checkIfKnightInArrayAndUpdate(knight))
      getKnights()[knightsArray.length] = knight;
  }

  getKnights().sort(compare);

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
  for (let i = 0; i < getKnights().length; i++) {
    if (getKnights()[i].name === knight.name) {
      knight.ignore = getKnights()[i].ignore;
      knight.lootFromCheckPoint = getKnights()[i].lootFromCheckPoint;
      knight.calculateLootDiff();
      getKnights()[i] = knight;
      return true;
    }
  }
  knight.lootFromCheckPoint = knight.loot;
  return false;
}

function saveCheckpoint() {
  console.log("Checkpoint saved");

  for (const knight of getKnights()) {
    knight.lootFromCheckPoint = knight.loot;
    knight.lootDiff = 0;
  }

  document.getElementById("wrapper").innerHTML = createTable(getKnights());
}

function ignoreKnight(number) {
  getKnights()[number].ignore = true;
  document.getElementById("wrapper").innerHTML = createTable(getKnights());
}


module.exports = {
  dataPasted,
  Knight,
  compare,
  createRow,
  createTable,
  saveCheckpoint,
  ignoreKnight,
  resetKnightsArray
};

