const toTest = require('../js/ops.js');
const fs = require('fs');
const path = require('path');

describe('Knight', () => {
  const knightWithOrderText = 'Arcyksiążę MichalOprych [IMP]\t198\t499.653.242\t169.323\t150.225\t15.954\n63';
  const knightWithoutOrderText = 'Arcyksiążę William\t299\t1.041.479.270\t130.162\t127.406\t2.209\n21';

  test('Knight in order creation', () => {
    const knight = new toTest.Knight(knightWithOrderText);
    
    expect(knight.name).toBe('Arcyksiążę MichalOprych ');
    expect(knight.order).toBe('[IMP]');
    expect(knight.level).toBe('198');
    expect(knight.lootText).toBe("499.653.242");
    expect(knight.loot).toBe(499653242);
    expect(knight.fights).toBe(169323);
    expect(knight.win).toBe(150225);
    expect(knight.place).toBe(62);
    expect(knight.loose).toBe(15954);
    expect(knight.lootFromCheckPoint).toBe(0);
    expect(knight.lootDiff).toBe(0);
    expect(knight.ignore).toBe(false);
  });

  test('Knight without order creation', () => {
    const knight = new toTest.Knight(knightWithoutOrderText);
    
    expect(knight.name).toBe('Arcyksiążę William');
    expect(knight.order).toBe('');
    expect(knight.level).toBe('299');
    expect(knight.lootText).toBe("1.041.479.270");
    expect(knight.loot).toBe(1041479270);
    expect(knight.fights).toBe(130162);
    expect(knight.win).toBe(127406);
    expect(knight.place).toBe(20);
    expect(knight.loose).toBe(2209);
    expect(knight.lootFromCheckPoint).toBe(0);
    expect(knight.lootDiff).toBe(0);
    expect(knight.ignore).toBe(false);
  });

  test('should calculate loot difference correctly', () => {
    const knight = new toTest.Knight(knightWithOrderText);
    knight.lootFromCheckPoint = 499651242;
    knight.calculateLootDiff();
    
    expect(knight.lootDiff).toBe(2000);
  });

  test('should print correctly for knight with order', () => {
    const knight = new toTest.Knight(knightWithOrderText);
    const output = knight.print();
  
    expect(output).toBe('0 62 Arcyksiążę MichalOprych  [IMP] 198 499.653.242\n');
  });

  test('should print correctly for knight without order', () => {
    const knight = new toTest.Knight(knightWithoutOrderText);
    const output = knight.print();
  
    expect(output).toBe('0 20 Arcyksiążę William  299 1.041.479.270\n');
  });
});

describe('Output', () => {
  const knightWithOrderText = 'Arcyksiążę MichalOprych [IMP]\t198\t499.653.242\t169.323\t150.225\t15.954\n63';
  const knightWithoutOrderText = 'Arcyksiążę William\t299\t1.041.479.270\t130.162\t127.406\t2.209\n21';

   test('should create row correctly for knight with order', () => {
    const knight = new toTest.Knight(knightWithOrderText);
    const row = toTest.createRow(knight, 1);
    
    expect(row).toBe('<td>0</td><td>62</td><td>Arcyksiążę MichalOprych </td><td>[IMP]</td><td>198</td><td>499.653.242</td><td><center><button class=\"btnIgnore\" name=\"button\" id=\"button\" onclick=\"ignoreKnight(1);\">x</button></center></td>');
  });

  test('should create row correctly for knight without order', () => {
    const knight = new toTest.Knight(knightWithoutOrderText);
    const row = toTest.createRow(knight, 1);
    
    expect(row).toBe('<td>0</td><td>20</td><td>Arcyksiążę William</td><td></td><td>299</td><td>1.041.479.270</td><td><center><button class=\"btnIgnore\" name=\"button\" id=\"button\" onclick=\"ignoreKnight(1);\">x</button></center></td>');
  });

  const knights = new Array();
  knights[0] = new toTest.Knight(knightWithOrderText);
  knights[1] = new toTest.Knight(knightWithoutOrderText);

  test('should create table with 2 knights', () => {
    const table = toTest.createTable(knights)
    
    expect(table).toBe('<table id=\"rounded-corner\" ><tbody><thead><tr><th scope=\"col\">Increase</th><th scope=\"col\">Place</th><th scope=\"col\">Knight</th><th scope=\"col\">Order</th><th scope=\"col\">Level</th><th scope=\"col\">Loot</th><th scope=\"col\">Ignore</th></tr></thead><tr><td>0</td><td>62</td><td>Arcyksiążę MichalOprych </td><td>[IMP]</td><td>198</td><td>499.653.242</td><td><center><button class=\"btnIgnore\" name=\"button\" id=\"button\" onclick=\"ignoreKnight(0);\">x</button></center></td></tr>\n\
<tr><td>0</td><td>20</td><td>Arcyksiążę William</td><td></td><td>299</td><td>1.041.479.270</td><td><center><button class=\"btnIgnore\" name=\"button\" id=\"button\" onclick=\"ignoreKnight(1);\">x</button></center></td></tr>\n\
</tbody></table>');
  });
});

describe('Data pasting', () => {
  let originalConsole;

  beforeAll(() => {
    originalConsole = { ...console };
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsole.log;
  });

  document.body.innerHTML = '<div id="wrapper"></div>';

  const filePath = path.join(__dirname, 'data/Top100_base.txt');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const input = document.createElement('textarea');
  input.value = fileContent

  test('should process pasted data and set "" as textarea content', () => {
    toTest.dataPasted(input)
    expect(input.value).toBe('')
  });

  test('should create table with 100 knights', () => {
    toTest.dataPasted(input)

    const filePath = path.join(__dirname, 'data/Top100_base_expected.txt');
    const expected = fs.readFileSync(filePath, 'utf8');
    
    expect(document.getElementById("wrapper").innerHTML).toBe(expected)
  });

  test('paste second time rank without changes', () => {
    toTest.dataPasted(input)
    toTest.dataPasted(input)

    const filePath = path.join(__dirname, 'data/Top100_base_expected.txt');
    const expected = fs.readFileSync(filePath, 'utf8');
    
    expect(document.getElementById("wrapper").innerHTML).toBe(expected)
  });
});

describe('Utils', () => {
  const knightWithOrderText = 'Arcyksiążę MichalOprych [IMP]\t198\t499.653.242\t169.323\t150.225\t15.954\n63';
  const knightWithoutOrderText = 'Arcyksiążę William\t299\t1.041.479.270\t130.162\t127.406\t2.209\n21';

  const firstKnight = new toTest.Knight(knightWithOrderText)
  firstKnight.lootDiff = 1
  const secondKnight = new toTest.Knight(knightWithoutOrderText)
  secondKnight.lootDiff = 2

   test('compare left loot diff greater', () => {
    expect(toTest.compare(firstKnight,secondKnight)).toBe(1)
  });

  test('compare left loot diff lower', () => {
    expect(toTest.compare(secondKnight,firstKnight)).toBe(-1)
  });

  test('compare left loot diff greater', () => {
    expect(toTest.compare(firstKnight,firstKnight)).toBe(0)
  });
});
