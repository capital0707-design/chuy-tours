import pool from './database.js';

const fixChuyTours = async () => {
  const client = await pool.connect();
  
  try {
    // Получаем ID регионов
    const regionsResult = await client.query('SELECT id, slug FROM regions');
    const chuyRegion = regionsResult.rows.find(r => r.slug === 'chuy');
    
    if (!chuyRegion) {
      console.error('❌ Регион Чуйская область не найден!');
      return;
    }

    // Получаем ID типов туров
    const typesResult = await client.query('SELECT id, code FROM tour_types');
    const typeMap = {};
    typesResult.rows.forEach(t => {
      typeMap[t.code] = t.id;
    });

    // Получаем ID форматов
    const formatsResult = await client.query('SELECT id, code FROM tour_formats');
    const formatMap = {};
    formatsResult.rows.forEach(f => {
      formatMap[f.code] = f.id;
    });

    console.log('⏳ Исправляем туры Чуйской области...');

    // Находим все туры без region_id или с region_id = NULL
    const chuyToursResult = await client.query(`
      SELECT id, slug, title, type, duration FROM tours 
      WHERE region_id IS NULL OR region_id = 0
    `);

    console.log(`Найдено туров для исправления: ${chuyToursResult.rows.length}`);

    // Обновляем каждый тур
    for (const tour of chuyToursResult.rows) {
      // Определяем тип тура
      let tourTypeId = null;
      if (tour.type === 'hiking') tourTypeId = typeMap['hiking'];
      else if (tour.type === 'horseback') tourTypeId = typeMap['horseback'];
      else if (tour.type === 'combo') tourTypeId = typeMap['combo'];
      else if (tour.type === 'jeep') tourTypeId = typeMap['jeep'];

      // Определяем формат тура по длительности
      let formatId = null;
      if (tour.duration.includes('1 день')) formatId = formatMap['day_trip'];
      else if (tour.duration.includes('2 дня') || tour.duration.includes('3 дня')) formatId = formatMap['weekend'];
      else if (tour.duration.includes('4 дня') || tour.duration.includes('5 дней') || tour.duration.includes('7 дней')) formatId = formatMap['multiday'];

      await client.query(`
        UPDATE tours 
        SET region_id = $1, tour_type_id = $2, tour_format_id = $3
        WHERE id = $4
      `, [chuyRegion.id, tourTypeId, formatId, tour.id]);

      console.log(`✅ Исправлен: ${tour.title}`);
    }

    console.log('\n✅ Все туры Чуйской области исправлены!');

    // Проверяем результат
    const checkResult = await client.query(`
      SELECT COUNT(*) as count FROM tours WHERE region_id = $1
    `, [chuyRegion.id]);
    
    console.log(` Туров в Чуйской области: ${checkResult.rows[0].count}`);

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    client.release();
  }
};

fixChuyTours();