import pool from './database.js';

const fixPhotos = async () => {
  const client = await pool.connect();
  
  try {
    // Получаем все туры без фото или с проблемными фото
    const result = await client.query(`
      SELECT slug, title FROM tours 
      WHERE slug IN (
        '3-dnya-altyn-arashan-goryachie-istochniki-jeti-oguz',
        '4-dnya-trekking-yuzhnyy-bereg-barskoon-jeti-oguz',
        '3-dnya-vostochnyy-issyk-kul-karakol-jeti-oguz-ak-suu'
      )
    `);

    console.log('Найдено туров для обновления:', result.rows.length);

    // Обновляем фото для каждого тура
    for (const tour of result.rows) {
      // Генерируем случайное фото природы/гор
      const randomId = Math.floor(Math.random() * 1000);
      const imageUrl = `https://picsum.photos/seed/${tour.slug}/800/600`;
      
      await client.query(`
        UPDATE tours 
        SET image = $1
        WHERE slug = $2
      `, [imageUrl, tour.slug]);
      
      console.log(`✅ Обновлено фото: ${tour.title}`);
      console.log(`   URL: ${imageUrl}`);
    }

    console.log('\n Все фото обновлены!');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    client.release();
  }
};

fixPhotos();