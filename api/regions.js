import pool from '../backend/database.js';

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT * FROM regions WHERE is_active = TRUE ORDER BY name_ru');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Ошибка получения регионов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
