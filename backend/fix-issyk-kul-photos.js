import pool from './database.js';

const fixPhotos = async () => {
  const client = await pool.connect();
  
  try {
    // Обновляем фото для тура "Алтын-Арашан"
    await client.query(`
      UPDATE tours 
      SET image = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
      WHERE slug = '3-dnya-altyn-arashan-goryachie-istochniki-jeti-oguz'
    `);
    console.log('✅ Обновлено фото: Алтын-Арашан');

    // Обновляем фото для тура "Треккинг по южному берегу"
    await client.query(`
      UPDATE tours 
      SET image = 'https://images.unsplash.com/photo-1432405972618-c60b0225b94e?w=800'
      WHERE slug = '4-dnya-trekking-yuzhnyy-bereg-barskoon-jeti-oguz'
    `);
    console.log('✅ Обновлено фото: Треккинг по южному берегу');

    // Обновляем фото для тура "Восточный Иссык-Куль"
    await client.query(`
      UPDATE tours 
      SET image = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
      WHERE slug = '3-dnya-vostochnyy-issyk-kul-karakol-jeti-oguz-ak-suu'
    `);
    console.log('✅ Обновлено фото: Восточный Иссык-Куль');

    console.log('\n Все фото обновлены!');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    client.release();
  }
};

fixPhotos();