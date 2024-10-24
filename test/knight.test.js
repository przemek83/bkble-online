const toTest = require('../js/ops.js');

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

  test('should create row correctly knight with order', () => {
    const knight = new toTest.Knight(knightWithOrderText);
    const row = knight.createRow(1);
    
    expect(row).toBe('<td>0</td><td>62</td><td>Arcyksiążę MichalOprych </td><td>[IMP]</td><td>198</td><td>499.653.242</td><td><center><button class=\"btnIgnore\" name=\"button\" id=\"button\" onclick=\"ignoreKnight(1);\">x</button></center></td>');
  });

  test('should create row correctly knight without order', () => {
    const knight = new toTest.Knight(knightWithoutOrderText);
    const row = knight.createRow(1);
    
    expect(row).toBe('<td>0</td><td>20</td><td>Arcyksiążę William</td><td></td><td>299</td><td>1.041.479.270</td><td><center><button class=\"btnIgnore\" name=\"button\" id=\"button\" onclick=\"ignoreKnight(1);\">x</button></center></td>');
  });

  test('should print correctly knight with order', () => {
    const knight = new toTest.Knight(knightWithOrderText);
    const output = knight.print();
  
    expect(output).toBe('0 62 Arcyksiążę MichalOprych  [IMP] 198 499.653.242\n');
  });

  test('should print correctly knight without order', () => {
    const knight = new toTest.Knight(knightWithoutOrderText);
    const output = knight.print();
  
    expect(output).toBe('0 20 Arcyksiążę William  299 1.041.479.270\n');
  });
});
