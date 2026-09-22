import pool from './database.js';

const fixPhoto = async () => {
  const client = await pool.connect();
  
  try {
    // Обновляем фото для тура Водопады Барскоон
    await client.query(`
      UPDATE tours 
      SET image = 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800'
      WHERE slug = 'vodopady-barskoon'
    `);
    
    console.log('✅ Фото для "Водопады Барскоон + перевал" обновлено!');
    
    // Проверяем результат
    const result = await client.query(
      "SELECT slug, title, image FROM tours WHERE slug = 'vodopady-barskoon'"
    );
    console.log('\n📋 Проверка:');
    console.log(`Тур: ${result.rows[0].title}`);
    console.log(`Фото: ${result.rows[0].image}`);
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    client.release();
  }
};

fixPhoto();