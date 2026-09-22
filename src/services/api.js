const API_BASE_URL = 'http://localhost:3001/api';

// Получить все регионы
export const getRegions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/regions`);
    if (!response.ok) throw new Error('Ошибка получения регионов');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Получить все локации
export const getLocations = async (regionId = null) => {
  try {
    const url = regionId 
      ? `${API_BASE_URL}/locations?region_id=${regionId}`
      : `${API_BASE_URL}/locations`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка получения локаций');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Получить типы туров
export const getTourTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-types`);
    if (!response.ok) throw new Error('Ошибка получения типов туров');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Получить форматы туров
export const getTourFormats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-formats`);
    if (!response.ok) throw new Error('Ошибка получения форматов туров');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Получить все туры с фильтрами
export const getTours = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.region_id) params.append('region_id', filters.region_id);
    if (filters.location_id) params.append('location_id', filters.location_id);
    if (filters.tour_type_id) params.append('tour_type_id', filters.tour_type_id);
    if (filters.tour_format_id) params.append('tour_format_id', filters.tour_format_id);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.price_min) params.append('price_min', filters.price_min);
    if (filters.price_max) params.append('price_max', filters.price_max);
    if (filters.search) params.append('search', filters.search);

    const url = `${API_BASE_URL}/tours?${params.toString()}`;
    console.log('API запрос:', url); // Для отладки
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка получения туров');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Получить тур по slug
export const getTourBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/${slug}`);
    if (!response.ok) throw new Error('Тур не найден');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Создать бронирование
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error('Ошибка создания бронирования');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Создать заявку партнёра
export const createPartner = async (partnerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/partners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerData),
    });
    if (!response.ok) throw new Error('Ошибка создания заявки');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};

// Отправить контактное сообщение
export const createContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error('Ошибка отправки сообщения');
    return await response.json();
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
};