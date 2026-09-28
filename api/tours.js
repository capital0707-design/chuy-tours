import pool from '../backend/database.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query(`
        SELECT t.*, r.name_ru as region_name, r.slug as region_slug
        FROM tours t
        LEFT JOIN regions r ON t.region_id = r.id
        ORDER BY t.rating DESC, t.price ASC
      `);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Ошибка получения туров:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
