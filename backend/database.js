import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const initDatabase = async () => {
  const client = await pool.connect();
  
  try {
    // 1. Таблица регионов
    await client.query(`
      CREATE TABLE IF NOT EXISTS regions (
        id SERIAL PRIMARY KEY,
        name_ru VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Таблица локаций
    await client.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        region_id INTEGER REFERENCES regions(id),
        name_ru VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        type VARCHAR(50), -- ущелье, каньон, озеро, село, курорт
        coords_lat DECIMAL(10, 7),
        coords_lng DECIMAL(10, 7),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Таблица типов туров
    await client.query(`
      CREATE TABLE IF NOT EXISTS tour_types (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name_ru VARCHAR(100) NOT NULL,
        name_en VARCHAR(100) NOT NULL
      )
    `);

    // 4. Таблица форматов туров
    await client.query(`
      CREATE TABLE IF NOT EXISTS tour_formats (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name_ru VARCHAR(100) NOT NULL,
        name_en VARCHAR(100) NOT NULL
      )
    `);

    // 5. Обновляем таблицу туров (добавляем новые поля)
    await client.query(`
      ALTER TABLE tours 
      ADD COLUMN IF NOT EXISTS region_id INTEGER REFERENCES regions(id),
      ADD COLUMN IF NOT EXISTS location_ids INTEGER[],
      ADD COLUMN IF NOT EXISTS tour_type_id INTEGER REFERENCES tour_types(id),
      ADD COLUMN IF NOT EXISTS tour_format_id INTEGER REFERENCES tour_formats(id),
      ADD COLUMN IF NOT EXISTS season VARCHAR(20), -- high, mid, low
      ADD COLUMN IF NOT EXISTS price_per_group INTEGER,
      ADD COLUMN IF NOT EXISTS min_group_size INTEGER,
      ADD COLUMN IF NOT EXISTS max_group_size INTEGER,
      ADD COLUMN IF NOT EXISTS pickup_locations TEXT[],
      ADD COLUMN IF NOT EXISTS additional_activities TEXT[],
      ADD COLUMN IF NOT EXISTS languages_available TEXT[]
    `);

    // 6. Таблица сезонных цен
    await client.query(`
      CREATE TABLE IF NOT EXISTS tour_prices (
        id SERIAL PRIMARY KEY,
        tour_id INTEGER REFERENCES tours(id),
        date_from DATE NOT NULL,
        date_to DATE NOT NULL,
        price_per_person INTEGER NOT NULL,
        price_per_group INTEGER,
        min_group_size INTEGER DEFAULT 1,
        max_group_size INTEGER DEFAULT 12,
        season VARCHAR(20),
        currency VARCHAR(10) DEFAULT 'KGS',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Обновляем таблицу партнёров
    await client.query(`
      ALTER TABLE partners
      ADD COLUMN IF NOT EXISTS region_id INTEGER REFERENCES regions(id),
      ADD COLUMN IF NOT EXISTS location_ids INTEGER[],
      ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS working_season VARCHAR(100),
      ADD COLUMN IF NOT EXISTS services_offered TEXT[]
    `);

    // 8. Расширяем таблицу бронирований
    await client.query(`
      ALTER TABLE bookings
      ADD COLUMN IF NOT EXISTS pickup_location VARCHAR(100),
      ADD COLUMN IF NOT EXISTS pickup_address TEXT,
      ADD COLUMN IF NOT EXISTS flight_number VARCHAR(50),
      ADD COLUMN IF NOT EXISTS additional_activities TEXT[],
      ADD COLUMN IF NOT EXISTS total_price INTEGER,
      ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'unpaid'
    `);

    console.log('✅ База данных расширена для поддержки Иссык-Куля');
  } catch (error) {
    console.error('❌ Ошибка расширения базы данных:', error);
  } finally {
    client.release();
  }
};

export default pool;