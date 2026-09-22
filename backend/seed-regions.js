import pool from './database.js';

const seedRegions = async () => {
  const client = await pool.connect();
  
  try {
    // Проверяем, есть ли уже регионы
    const checkResult = await client.query('SELECT COUNT(*) FROM regions');
    if (parseInt(checkResult.rows[0].count) > 0) {
      console.log('ℹ️ Регионы уже существуют. Пропускаем.');
      return;
    }

    console.log(' Добавляем регионы и локации...');

    // Добавляем регионы
    const regions = await client.query(`
      INSERT INTO regions (name_ru, name_en, slug) VALUES
      ('Чуйская область', 'Chuy Region', 'chuy'),
      ('Иссык-Кульская область', 'Issyk-Kul Region', 'issyk-kul')
      RETURNING id, slug
    `);

    const chuyId = regions.rows.find(r => r.slug === 'chuy').id;
    const issykKulId = regions.rows.find(r => r.slug === 'issyk-kul').id;

    // Добавляем локации Чуйской области
    await client.query(`
      INSERT INTO locations (region_id, name_ru, name_en, slug, type) VALUES
      ($1, 'Ала-Арча', 'Ala-Archa', 'ala-archa', 'ущелье'),
      ($1, 'Чон-Кемин', 'Chon-Kemin', 'chon-kemin', 'ущелье'),
      ($1, 'Боом', 'Boom', 'boom', 'ущелье'),
      ($1, 'Чуйская долина', 'Chuy Valley', 'chuy-valley', 'долина')
    `, [chuyId]);

    // Добавляем локации Иссык-Кульской области
    await client.query(`
      INSERT INTO locations (region_id, name_ru, name_en, slug, type) VALUES
      ($1, 'Каракол', 'Karakol', 'karakol', 'город'),
      ($1, 'Чолпон-Ата', 'Cholpon-Ata', 'cholpon-ata', 'курорт'),
      ($1, 'Боконбаево', 'Bokonbayevo', 'bokonbayevo', 'село'),
      ($1, 'Тамга', 'Tamga', 'tamga', 'село'),
      ($1, 'Джеты-Огуз', 'Jeti-Oguz', 'jeti-oguz', 'ущелье'),
      ($1, 'Барскоон', 'Barskoon', 'barskoon', 'ущелье'),
      ($1, 'Ак-Суу', 'Ak-Suu', 'ak-suu', 'ущелье'),
      ($1, 'Каньон Сказка', 'Skazka Canyon', 'skazka-canyon', 'каньон'),
      ($1, 'Каньон Конорчек', 'Konorchek Canyon', 'konorchek-canyon', 'каньон'),
      ($1, 'Сон-Куль', 'Son-Kul', 'son-kul', 'озеро'),
      ($1, 'Алтын-Арашан', 'Altyn-Arashan', 'altyn-arashan', 'горячие источники')
    `, [issykKulId]);

    // Добавляем типы туров
    await client.query(`
      INSERT INTO tour_types (code, name_ru, name_en) VALUES
      ('hiking', 'Пеший тур', 'Hiking tour'),
      ('horseback', 'Конный тур', 'Horseback tour'),
      ('jeep', 'Авто-тур (4x4)', 'Jeep tour (4x4)'),
      ('combo', 'Комбо', 'Combo tour'),
      ('lake_mountains', 'Озеро + горы', 'Lake + Mountains')
    `);

    // Добавляем форматы туров
    await client.query(`
      INSERT INTO tour_formats (code, name_ru, name_en) VALUES
      ('day_trip', 'Однодневный', 'Day trip'),
      ('weekend', 'Выходного дня', 'Weekend tour'),
      ('multiday', 'Многодневный', 'Multiday tour'),
      ('private', 'Индивидуальный', 'Private tour'),
      ('group', 'Групповой', 'Group tour')
    `);

    console.log('✅ Регионы, локации, типы и форматы туров добавлены!');
    console.log(`   - Регионы: ${regions.rowCount}`);
    console.log(`   - Локации Чуй: 4`);
    console.log(`   - Локации Иссык-Куль: 11`);
    console.log(`   - Типы туров: 5`);
    console.log(`   - Форматы туров: 5`);

  } catch (error) {
    console.error(' Ошибка:', error.message);
  } finally {
    client.release();
  }
};

seedRegions();