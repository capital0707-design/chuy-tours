import pool from './database.js';

const addTranslations = async () => {
  const client = await pool.connect();
  
  try {
    console.log('⏳ Добавляем поля для переводов...');

    // 1. Добавляем английские поля
    await client.query(`
      ALTER TABLE tours 
      ADD COLUMN IF NOT EXISTS title_en TEXT,
      ADD COLUMN IF NOT EXISTS short_description_en TEXT,
      ADD COLUMN IF NOT EXISTS full_description_en TEXT
    `);
    console.log('✅ Добавлены английские поля');

    // 2. Добавляем немецкие поля
    await client.query(`
      ALTER TABLE tours 
      ADD COLUMN IF NOT EXISTS title_de TEXT,
      ADD COLUMN IF NOT EXISTS short_description_de TEXT,
      ADD COLUMN IF NOT EXISTS full_description_de TEXT
    `);
    console.log('✅ Добавлены немецкие поля');

    // 3. Для существующих туров копируем русские тексты в английские и немецкие
    const result = await client.query(`
      SELECT id, title, slug FROM tours 
      WHERE title_en IS NULL OR title_de IS NULL
    `);

    console.log(`Найдено ${result.rows.length} туров для обновления переводов`);

    for (const tour of result.rows) {
      // Копируем русские тексты как временные английские/немецкие
      await client.query(`
        UPDATE tours 
        SET 
          title_en = COALESCE(title_en, title),
          short_description_en = COALESCE(short_description_en, short_description),
          full_description_en = COALESCE(full_description_en, full_description),
          title_de = COALESCE(title_de, title),
          short_description_de = COALESCE(short_description_de, short_description),
          full_description_de = COALESCE(full_description_de, full_description)
        WHERE id = $1
      `, [tour.id]);
    }

    console.log('✅ Переводы скопированы из русских текстов');
    console.log('\n💡 Теперь нужно добавить реальные английские и немецкие переводы для каждого тура');

    // 4. Проверяем результат
    const checkResult = await client.query(`
      SELECT COUNT(*) as count FROM tours
    `);
    
    console.log(`\n📊 Всего туров в базе: ${checkResult.rows[0].count}`);

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.error(error.stack);
  } finally {
    client.release();
  }
};

addTranslations();