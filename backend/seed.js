import pool from './database.js';

const seedTours = async () => {
  const client = await pool.connect();
  
  try {
    // Очищаем существующие данные (если нужно)
    await client.query('DELETE FROM bookings');
    await client.query('DELETE FROM tours');
    
    console.log(' Добавляем тестовые туры...');

    const tours = [
      // 1. Конный уикенд в Чон-Кемине
      {
        slug: 'konnyy-uykend-v-chon-kemine',
        title: 'Конный уикенд в Чон-Кемине',
        type: 'horseback',
        duration: '2 дня / 1 ночь',
        difficulty: 'medium',
        price: 3500,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 24,
        region: 'Чон-Кемин',
        short_description: '2 дня / 1 ночь в юрте, трансфер из Бишкека, питание включено',
        full_description: 'Двухдневный конный тур из Бишкека с ночёвкой в юрте. Всё включено: трансфер, питание, гид, кони. Маршрут проходит по живописным местам Чон-Кеминского ущелья с остановками у озёр и водопадов.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        included: ['Трансфер: Бишкек ↔ Чон-Кемин', 'Проживание: 1 ночь в юрте', 'Питание: 1 завтрак, 2 обеда, 1 ужин', 'Гид: русскоязычный гид-инструктор', 'Кони и снаряжение'],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-20', '2026-09-27', '2026-10-04'],
        program: [
          { day: 1, title: 'Бишкек → Чон-Кемин → первое озеро', description: 'Время сбора, трансфер. Начало конного маршрута. Обед в пути. Прибытие в лагерь, ужин, ночёвка в юрте.', activities: ['Конный', 'Обед', 'Ужин', 'Ночёвка в юрте'] },
          { day: 2, title: 'Озеро → перевал → возвращение в Бишкек', description: 'Завтрак. Конный переход к перевалу. Обед, обратный трансфер. Прибытие в Бишкек вечером.', activities: ['Завтрак', 'Обед', 'Конный', 'Трансфер'] }
        ]
      },

      // 2. Пеший трек в Ала-Арче
      {
        slug: 'peshiy-trek-ala-archa',
        title: 'Пеший трек в Ала-Арче',
        type: 'hiking',
        duration: '1 день',
        difficulty: 'easy',
        price: 2000,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 45,
        region: 'Ала-Арча',
        short_description: 'Однодневный пеший трек для новичков, трансфер включён',
        full_description: 'Однодневный пеший трек по живописным тропам Ала-Арчинского ущелья. Подходит для новичков и семей с детьми. Посетим водопад и смотровые площадки с панорамными видами.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        included: ['Трансфер из Бишкека', 'Услуги гида', 'Обед в кафе'],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-15', '2026-09-22', '2026-09-29'],
        program: [
          { day: 1, title: 'Бишкек → Ала-Арча → Бишкек', description: 'Утренний трансфер, пеший маршрут к водопаду, обед, возвращение в Бишкек.', activities: ['Пеший', 'Обед', 'Трансфер'] }
        ]
      },

      // 3. Комбо-тур по ущелью Боом
      {
        slug: 'kombo-tur-boom',
        title: 'Комбо-тур по ущелью Боом',
        type: 'combo',
        duration: '3 дня / 2 ночи',
        difficulty: 'medium',
        price: 5500,
        currency: 'KGS',
        rating: 4.7,
        reviews_count: 18,
        region: 'Боом',
        short_description: 'Пеший + конный тур, 3 дня, всё включено',
        full_description: 'Комбинированный тур по ущелью Боом: пешие переходы и конные прогулки. Ночёвки в гестхаусах. Исследуем каньон, древние петроглифы и горные озёра.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        included: ['Трансфер', 'Проживание в гестхаусе', 'Питание (полный пансион)', 'Гид', 'Кони на 1 день'],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-25', '2026-10-02'],
        program: [
          { day: 1, title: 'Бишкек → Боом → гестхаус', description: 'Трансфер, заселение, пеший маршрут.', activities: ['Пеший', 'Ужин', 'Гестхаус'] },
          { day: 2, title: 'Конный день', description: 'Конный маршрут по ущелью.', activities: ['Конный', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 3, title: 'Возвращение', description: 'Пеший переход, обед, трансфер в Бишкек.', activities: ['Пеший', 'Обед', 'Трансфер'] }
        ]
      },

      // 4. Восхождение на пик Аламедин
      {
        slug: 'voshozhdenie-na-pik-alamidin',
        title: 'Восхождение на пик Аламедин (4000м)',
        type: 'hiking',
        duration: '4 дня / 3 ночи',
        difficulty: 'hard',
        price: 8500,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 12,
        region: 'Ала-Арча',
        short_description: 'Сложный треккинг для опытных, восхождение на вершину',
        full_description: 'Четырёхдневный треккинг с восхождением на пик Аламедин (4000м). Требуется хорошая физическая подготовка. Ночёвки в палатках, полное снаряжение включено.',
        image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800',
        included: ['Трансфер', 'Проживание в палатках', 'Питание (полный пансион)', 'Опытный гид-альпинист', 'Групповое снаряжение', 'Страховка'],
        not_included: ['Личное снаряжение', 'Аренда спальника (500 сом)'],
        available_dates: ['2026-09-18', '2026-09-25'],
        program: [
          { day: 1, title: 'Бишкек → базовый лагерь', description: 'Трансфер, пеший переход к базовому лагерю (3200м).', activities: ['Пеший', 'Ужин', 'Палатка'] },
          { day: 2, title: 'Акклиматизация', description: 'Подъём на высоту 3600м, возвращение в лагерь.', activities: ['Пеший', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 3, title: 'Восхождение', description: 'Ранний подъём, восхождение на пик (4000м), спуск в лагерь.', activities: ['Пеший', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 4, title: 'Возвращение', description: 'Спуск, трансфер в Бишкек.', activities: ['Пеший', 'Завтрак', 'Трансфер'] }
        ]
      },

      // 5. Семейный тур в Чон-Кемин
      {
        slug: 'semeynyy-tur-v-chon-kemine',
        title: 'Семейный отдых в Чон-Кемине',
        type: 'combo',
        duration: '2 дня / 1 ночь',
        difficulty: 'easy',
        price: 4000,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 31,
        region: 'Чон-Кемин',
        short_description: 'Идеально для семей с детьми, конные прогулки и природа',
        full_description: 'Специальный семейный тур с комфортным проживанием в гестхаусе. Короткие конные прогулки, игры на природе, баня. Подходит для детей от 5 лет.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        included: ['Трансфер', 'Проживание в гестхаусе (семейный номер)', 'Питание (завтрак, обед, ужин)', 'Конная прогулка (1 час)', 'Баня', 'Аниматор для детей'],
        not_included: ['Личные расходы', 'Дополнительные активности'],
        available_dates: ['2026-09-21', '2026-09-28', '2026-10-05'],
        program: [
          { day: 1, title: 'Бишкек → Чон-Кемин', description: 'Трансфер, заселение, обед, конная прогулка, ужин, баня.', activities: ['Конный', 'Обед', 'Ужин', 'Баня'] },
          { day: 2, title: 'Отдых и возвращение', description: 'Завтрак, игры на природе, обед, трансфер.', activities: ['Завтрак', 'Обед', 'Трансфер'] }
        ]
      },

      // 6. Тур по каньону Сказка
      {
        slug: 'tur-po-kanyon-skazka',
        title: 'Каньон Сказка + озеро Иссык-Куль',
        type: 'hiking',
        duration: '1 день',
        difficulty: 'easy',
        price: 2500,
        currency: 'KGS',
        rating: 4.7,
        reviews_count: 56,
        region: 'Иссык-Куль',
        short_description: 'Поездка к знаменитому каньону и берегу озера',
        full_description: 'Однодневная экскурсия к красному каньону Сказка и берегу Иссык-Куля. Фотосессия, прогулка, обед на берегу озера.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        included: ['Трансфер из Бишкека', 'Услуги гида', 'Обед', 'Входные билеты'],
        not_included: ['Личные расходы', 'Аренда лошадок (опционально)'],
        available_dates: ['2026-09-16', '2026-09-23', '2026-09-30'],
        program: [
          { day: 1, title: 'Бишкек → Каньон Сказка → Иссык-Куль', description: 'Трансфер, посещение каньона, фотосессия, обед на берегу озера, возвращение.', activities: ['Пеший', 'Обед', 'Трансфер'] }
        ]
      },

      // 7. Многодневный конный тур
      {
        slug: 'mnogodnevnyy-konnyy-tur',
        title: 'Конное путешествие по горам (5 дней)',
        type: 'horseback',
        duration: '5 дней / 4 ночи',
        difficulty: 'medium',
        price: 12000,
        currency: 'KGS',
        rating: 5.0,
        reviews_count: 8,
        region: 'Чон-Кемин',
        short_description: 'Настоящее приключение на лошадях через горные перевалы',
        full_description: 'Пятидневный конный тур через горные перевалы с ночёвками в юртовых лагерях. Пройдём более 100 км по живописным маршрутам. Требуется базовый опыт верховой езды.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        included: ['Трансфер', 'Проживание в юртах', 'Питание (полный пансион)', 'Лошади и снаряжение', 'Гид-инструктор', 'Палатка для вещей'],
        not_included: ['Личные расходы', 'Страховка', 'Аренда спальника'],
        available_dates: ['2026-09-20', '2026-10-01'],
        program: [
          { day: 1, title: 'Бишкек → первое озеро', description: 'Трансфер, начало конного маршрута (20 км), ночёвка у озера.', activities: ['Конный', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 2, title: 'Перевал Ак-Терек', description: 'Переход через перевал (3200м), ночёвка в долине.', activities: ['Конный', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 3, title: 'Горное озеро', description: 'Переход к высокогорному озеру, отдых.', activities: ['Конный', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 4, title: 'Обратный путь', description: 'Начало обратного пути, ночёвка в лагере.', activities: ['Конный', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 5, title: 'Возвращение', description: 'Завершение маршрута, трансфер в Бишкек.', activities: ['Конный', 'Завтрак', 'Трансфер'] }
        ]
      },

      // 8. Водопады Барскоон
      {
        slug: 'vodopady-barskoon',
        title: 'Водопады Барскоон + перевал',
        type: 'hiking',
        duration: '2 дня / 1 ночь',
        difficulty: 'medium',
        price: 4500,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 22,
        region: 'Иссык-Куль',
        short_description: 'Посещение знаменитых водопадов в ущелье Барскоон',
        full_description: 'Двухдневный треккинг к водопадам Барскоонского ущелья. Увидим водопады высотой до 70 метров, горные озёра и панорамы Тянь-Шаня.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b94e?w=800',
        included: ['Трансфер', 'Проживание в гестхаусе', 'Питание', 'Услуги гида', 'Входные билеты'],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-19', '2026-09-26'],
        program: [
          { day: 1, title: 'Бишкек → Барскоон', description: 'Трансфер, пеший маршрут к первому водопаду, ночёвка.', activities: ['Пеший', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 2, title: 'Водопады и возвращение', description: 'Посещение верхних водопадов, обед, трансфер.', activities: ['Пеший', 'Завтрак', 'Обед', 'Трансфер'] }
        ]
      },

      // 9. Тур в Ак-Суу
      {
        slug: 'tur-v-ak-suu',
        title: 'Ак-Суу: гранитный каньон',
        type: 'hiking',
        duration: '1 день',
        difficulty: 'medium',
        price: 2800,
        currency: 'KGS',
        rating: 4.6,
        reviews_count: 15,
        region: 'Иссык-Куль',
        short_description: 'Исследование уникального гранитного каньона',
        full_description: 'Однодневный тур в Ак-Сууский гранитный каньон. Увидим причудливые скальные образования, водопады и горные пейзажи.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        included: ['Трансфер', 'Обед', 'Услуги гида'],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-17', '2026-09-24'],
        program: [
          { day: 1, title: 'Бишкек → Ак-Суу', description: 'Трансфер, trekking по каньону, обед, возвращение.', activities: ['Пеший', 'Обед', 'Трансфер'] }
        ]
      },

      // 10. Велотур по Чуйской долине
      {
        slug: 'velotur-chuyskaya-dolina',
        title: 'Велотур по Чуйской долине',
        type: 'combo',
        duration: '2 дня / 1 ночь',
        difficulty: 'easy',
        price: 3800,
        currency: 'KGS',
        rating: 4.7,
        reviews_count: 19,
        region: 'Чуйская долина',
        short_description: 'Велопрогулка по равнине с посещением достопримечательностей',
        full_description: 'Двухдневный велотур по Чуйской долине. Прокатимся по равнине, посетим древние городища и гостеприимные сёла. Велосипеды включены.',
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800',
        included: ['Трансфер', 'Велосипеды и шлемы', 'Проживание', 'Питание', 'Гид'],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-22', '2026-09-29'],
        program: [
          { day: 1, title: 'Бишкек → Чуйская долина', description: 'Трансфер, велопрогулка (30 км), ночёвка в гестхаусе.', activities: ['Вело', 'Завтрак', 'Обед', 'Ужин'] },
          { day: 2, title: 'Возвращение', description: 'Велопрогулка, посещение достопримечательностей, трансфер.', activities: ['Вело', 'Завтрак', 'Трансфер'] }
        ]
      }
    ];

    // Добавляем все туры
    for (const tour of tours) {
      await client.query(`
        INSERT INTO tours (
          slug, title, type, duration, difficulty, price, currency, 
          rating, reviews_count, region, short_description, full_description, 
          image, included, not_included, available_dates, program
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      `, [
        tour.slug, tour.title, tour.type, tour.duration, tour.difficulty, 
        tour.price, tour.currency, tour.rating, tour.reviews_count, tour.region,
        tour.short_description, tour.full_description, tour.image,
        tour.included, tour.not_included, tour.available_dates,
        JSON.stringify(tour.program)
      ]);
    }

    console.log(`✅ Успешно добавлено ${tours.length} туров!`);
    console.log('\n📋 Список туров:');
    tours.forEach((t, i) => {
      console.log(`${i + 1}. ${t.title} (${t.duration}, ${t.price} сом)`);
    });

  } catch (error) {
    console.error('❌ Ошибка добавления туров:', error.message);
  } finally {
    client.release();
  }
};

seedTours();