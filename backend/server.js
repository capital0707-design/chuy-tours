import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { initDatabase } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Инициализация базы данных
initDatabase();

// ============ СПРАВОЧНИКИ ============

// Получить все регионы
app.get('/api/regions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM regions WHERE is_active = TRUE ORDER BY name_ru');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения регионов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить все локации
app.get('/api/locations', async (req, res) => {
  try {
    const { region_id } = req.query;
    let query = 'SELECT * FROM locations ORDER BY name_ru';
    const params = [];
    
    if (region_id) {
      query = 'SELECT * FROM locations WHERE region_id = $1 ORDER BY name_ru';
      params.push(region_id);
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения локаций:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить типы туров
app.get('/api/tour-types', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tour_types ORDER BY name_ru');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения типов туров:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить форматы туров
app.get('/api/tour-formats', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tour_formats ORDER BY name_ru');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения форматов туров:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============ ТУРЫ ============

// Получить все туры с фильтрами
app.get('/api/tours', async (req, res) => {
  try {
    const {
      region_id,
      location_id,
      tour_type_id,
      tour_format_id,
      difficulty,
      price_min,
      price_max,
      search
    } = req.query;

    let query = `
      SELECT t.*, r.name_ru as region_name, r.slug as region_slug
      FROM tours t
      LEFT JOIN regions r ON t.region_id = r.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    // Фильтр по региону
    if (region_id) {
      query += ` AND t.region_id = $${paramIndex}`;
      params.push(region_id);
      paramIndex++;
    }

    // Фильтр по локации
    if (location_id) {
      query += ` AND $${paramIndex} = ANY(t.location_ids)`;
      params.push(location_id);
      paramIndex++;
    }

    // Фильтр по типу тура
    if (tour_type_id) {
      query += ` AND t.tour_type_id = $${paramIndex}`;
      params.push(tour_type_id);
      paramIndex++;
    }

    // Фильтр по формату
    if (tour_format_id) {
      query += ` AND t.tour_format_id = $${paramIndex}`;
      params.push(tour_format_id);
      paramIndex++;
    }

    // Фильтр по сложности
    if (difficulty) {
      query += ` AND t.difficulty = $${paramIndex}`;
      params.push(difficulty);
      paramIndex++;
    }

// Фильтр по цене (преобразуем в числа)
if (price_min && !isNaN(parseFloat(price_min))) {
  query += ` AND t.price >= $${paramIndex}`;
  params.push(parseFloat(price_min));
  paramIndex++;
}
if (price_max && !isNaN(parseFloat(price_max))) {
  query += ` AND t.price <= $${paramIndex}`;
  params.push(parseFloat(price_max));
  paramIndex++;
}

    // Поиск по названию
    if (search) {
      query += ` AND (t.title ILIKE $${paramIndex} OR t.short_description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY t.rating DESC, t.price ASC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения туров:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить тур по slug
app.get('/api/tours/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(`
      SELECT t.*, r.name_ru as region_name, r.slug as region_slug
      FROM tours t
      LEFT JOIN regions r ON t.region_id = r.id
      WHERE t.slug = $1
    `, [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Тур не найден' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка получения тура:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============ БРОНИРОВАНИЯ ============

app.post('/api/bookings', async (req, res) => {
  try {
    const {
      tour_slug,
      date,
      adults,
      children,
      transfer,
      transfer_details,
      accommodation,
      meals,
      special_meals_details,
      guide,
      translator_language,
      equipment_rental,
      insurance,
      name,
      email,
      phone,
      contact_method,
      comment
    } = req.body;

    const result = await pool.query(`
      INSERT INTO bookings (
        tour_slug, date, adults, children, transfer, transfer_details,
        accommodation, meals, special_meals_details, guide, translator_language,
        equipment_rental, insurance, name, email, phone, contact_method, comment
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `, [
      tour_slug, date, adults, children, transfer, transfer_details,
      accommodation, meals, special_meals_details, guide, translator_language,
      equipment_rental, insurance, name, email, phone, contact_method, comment
    ]);

    res.status(201).json({
      success: true,
      booking: result.rows[0],
      message: 'Бронирование создано'
    });
  } catch (error) {
    console.error('Ошибка создания бронирования:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============ ПАРТНЁРЫ ============

app.post('/api/partners', async (req, res) => {
  try {
    const {
      partner_type,
      name,
      email,
      phone,
      experience,
      languages,
      certifications,
      driving_experience,
      license_categories,
      car_brand,
      car_model,
      car_year,
      capacity,
      has_ac,
      neatness,
      additional_language,
      description,
      agree_to_terms
    } = req.body;

    const result = await pool.query(`
      INSERT INTO partners (
        partner_type, name, email, phone, experience, languages, certifications,
        driving_experience, license_categories, car_brand, car_model, car_year,
        capacity, has_ac, neatness, additional_language, description, agree_to_terms
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `, [
      partner_type, name, email, phone, experience, languages, certifications,
      driving_experience, license_categories, car_brand, car_model, car_year,
      capacity, has_ac, neatness, additional_language, description, agree_to_terms
    ]);

    res.status(201).json({
      success: true,
      partner: result.rows[0],
      message: 'Заявка партнёра создана'
    });
  } catch (error) {
    console.error('Ошибка создания заявки партнёра:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ============ КОНТАКТЫ ============

app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const result = await pool.query(`
      INSERT INTO contacts (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, email, message]);

    res.status(201).json({
      success: true,
      contact: result.rows[0],
      message: 'Сообщение отправлено'
    });
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Backend сервер запущен на http://localhost:${PORT}`);
});