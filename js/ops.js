class Knight {
  constructor(knightAsString) {
    const fields = knightAsString.trim().split(/\t/g);

    this.place = Number(fields[0]);
    this.name = fields[1].replace(/\[.*\]/g, '').trim();
    this.order = fields[1].match(/\[.*\]/g);

    if (this.order === null)
      this.order = '';
    else
      this.order = this.order[0];

    this.level = fields[fields.length - 5].trim();
    this.lootText = String(fields[fields.length - 4]);
    this.loot = Number(fields[fields.length - 4].replace(/\./g, '').trim());
    this.fights = Number(fields[fields.length - 3].replace(/\./g, '').trim());
    this.win = Number(fields[fields.length - 2].replace(/\./g, '').trim());
    this.loose = Number(fields[fields.length - 1].replace(/\./g, '').trim());
    this.lootFromCheckPoint = this.loot;
    this.lootDiff = 0;
    this.ignore = false;
  }

  calculateLootDiff() {
    this.lootDiff = this.loot - this.lootFromCheckPoint;
  };
}

function createCell(content) {
  return '<td>' + content + '</td>'
}

function createRow(knight) {
  let row = '';
  row += createCell(knight.lootDiff)
  row += createCell(knight.place)
  row += createCell(knight.name)
  row += createCell(knight.order)
  row += createCell(knight.level)
  row += createCell(knight.lootText)
  const ignoreButton =
      '<center><button class="btnIgnore" name="button" id="button" onclick="ignoreKnight(\'' +
      knight.name + '\');">x</button></center>';
  row += createCell(ignoreButton)
  return row;
};

var knightsMap = new Map();
knightsMap[Symbol.iterator] = function*() {
  yield* [...this.entries()].sort((a, b) => b[1].lootDiff - a[1].lootDiff);
};

function resetKnightsArray() {
  knightsMap.clear()
}

function getKnights() {
  return knightsMap
}

function isNumber(value) {
  return !isNaN(value.replace(/\./g, '').trim());
}

function isValidKnightString(knightString) {
  const fields = knightString.split('\t')
  if (fields.length != 7 && fields.length != 8) return false;

  const firstFieldIsNumber = isNumber(fields[0])
  const last5FieldsAreNumbers = isNumber(fields[fields.length - 1]) &&
      isNumber(fields[fields.length - 2]) &&
      isNumber(fields[fields.length - 3]) &&
      isNumber(fields[fields.length - 4]) && isNumber(fields[fields.length - 5])

  return firstFieldIsNumber && last5FieldsAreNumbers
}

function addKnight(knight) {
  const knights = getKnights()
  if (knights.has(knight.name)) {
    knight.ignore = knights.get(knight.name).ignore;
    knight.lootFromCheckPoint = knights.get(knight.name).lootFromCheckPoint;
    knight.calculateLootDiff();
  }
  knights.set(knight.name, knight);
}

function dataPasted(textarea) {
  let textToParse = textarea.value;
  textToParse = textToParse.replace(/\t\n/g, '\t')
  const lines = textToParse.split(/\n/).filter(line => line.trim() !== '');
  console.log('splitted has ' + lines.length + ' lines');

  if (lines.length == 0) return;

  for (const line of lines) {
    if (!isValidKnightString(line)) continue;
    addKnight(new Knight(line))
  }

  document.getElementById('wrapper').innerHTML = createTable(getKnights());

  textarea.value = '';
}

function createTable(knights) {
  const theader = '<table id="rounded-corner" >';
  let tbody = '<tbody>';
  tbody += '<thead><tr>';
  tbody += '<th scope="col">Increase</th>';
  tbody += '<th scope="col">Place</th>';
  tbody += '<th scope="col">Knight</th>';
  tbody += '<th scope="col">Order</th>';
  tbody += '<th scope="col">Level</th>';
  tbody += '<th scope="col">Loot</th>';
  tbody += '<th scope="col">Ignore</th>';
  tbody += '</tr>';
  tbody += '</thead>\n';
  for (const [, knight] of knights) {
    if (knight.ignore === true) continue;

    tbody += '<tr>';
    tbody += createRow(knight);
    tbody += '</tr>\n';
  }

  tbody += '</tbody>';
  const tfooter = '</table>';
  return theader + tbody + tfooter;
}

function saveCheckpoint() {
  console.log('Checkpoint saved');

  for (const [, knight] of getKnights()) {
    knight.lootFromCheckPoint = knight.loot;
    knight.lootDiff = 0;
  }

  document.getElementById('wrapper').innerHTML = createTable(getKnights());
}

function ignoreKnight(name) {
  console.log(getKnights().get(name))
  getKnights().get(name).ignore = true;
  document.getElementById('wrapper').innerHTML = createTable(getKnights());
}


module.exports = {
  dataPasted,
  Knight,
  createRow,
  createTable,
  saveCheckpoint,
  ignoreKnight,
  resetKnightsArray
};
