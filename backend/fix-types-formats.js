import pool from './database.js';

const fixTypesFormats = async () => {
  const client = await pool.connect();
  
  try {
    // Проверяем типы туров
    const typesResult = await client.query('SELECT code FROM tour_types');
    const existingTypes = typesResult.rows.map(r => r.code);
    
    console.log('Существующие типы туров:', existingTypes);

    // Добавляем "Озеро+горы" если нет
    if (!existingTypes.includes('lake_mountains')) {
      await client.query(`
        INSERT INTO tour_types (code, name_ru, name_en) 
        VALUES ('lake_mountains', 'Озеро + горы', 'Lake + Mountains')
      `);
      console.log('✅ Добавлен тип: Озеро + горы');
    }

    // Проверяем форматы
    const formatsResult = await client.query('SELECT code FROM tour_formats');
    const existingFormats = formatsResult.rows.map(r => r.code);
    
    console.log('Существующие форматы:', existingFormats);

    // Добавляем "Индивидуальный" если нет
    if (!existingFormats.includes('private')) {
      await client.query(`
        INSERT INTO tour_formats (code, name_ru, name_en) 
        VALUES ('private', 'Индивидуальный', 'Private tour')
      `);
      console.log('✅ Добавлен формат: Индивидуальный');
    }

    // Добавляем "Групповой" если нет
    if (!existingFormats.includes('group')) {
      await client.query(`
        INSERT INTO tour_formats (code, name_ru, name_en) 
        VALUES ('group', 'Групповой', 'Group tour')
      `);
      console.log('✅ Добавлен формат: Групповой');
    }

    console.log('\n✅ Все типы и форматы проверены!');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    client.release();
  }
};

fixTypesFormats();