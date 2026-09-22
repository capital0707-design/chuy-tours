import pool from './database.js';

const fixPhoto = async () => {
  const client = await pool.connect();
  
  try {
    // Обновляем фото для велотура
    await client.query(`
      UPDATE tours 
      SET image = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'
      WHERE slug = 'velotur-chuyskaya-dolina'
    `);
    
    console.log('✅ Фото для велотура обновлено!');
    
    // Проверяем все туры
    const result = await client.query('SELECT slug, title, image FROM tours');
    console.log('\n📋 Все туры и их фото:');
    result.rows.forEach(tour => {
      const hasPhoto = tour.image && tour.image.length > 0 ? '✓' : '✗';
      console.log(`${hasPhoto} ${tour.title}`);
    });
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    client.release();
  }
};

fixPhoto();