import pool from './database.js';

const seedIssykKulTours = async () => {
  const client = await pool.connect();
  
  try {
    // Получаем ID регионов
    const regionsResult = await client.query('SELECT id, slug FROM regions');
    const chuyRegion = regionsResult.rows.find(r => r.slug === 'chuy');
    const issykKulRegion = regionsResult.rows.find(r => r.slug === 'issyk-kul');

    // Получаем ID локаций
    const locationsResult = await client.query('SELECT id, slug FROM locations');
    const locationMap = {};
    locationsResult.rows.forEach(loc => {
      locationMap[loc.slug] = loc.id;
    });

    // Получаем ID типов туров
    const typesResult = await client.query('SELECT id, code FROM tour_types');
    const typeMap = {};
    typesResult.rows.forEach(t => {
      typeMap[t.code] = t.id;
    });

    // Получаем ID форматов
    const formatsResult = await client.query('SELECT id, code FROM tour_formats');
    const formatMap = {};
    formatsResult.rows.forEach(f => {
      formatMap[f.code] = f.id;
    });

    console.log('⏳ Добавляем 12 туров по Иссык-Кулю...');

    const tours = [
      // Тур 1: 2 дня - Каньоны + кони + юрта
      {
        slug: '2-dnya-kanyony-issyk-kulya-koni-yurta',
        title: '2 дня: каньоны Иссык-Куля, конная прогулка и проживание в юрте',
        title_en: '2 Days: Issyk-Kul Canyons, Horse Riding and Yurt Stay',
        type: 'combo',
        duration: '2 дня / 1 ночь',
        difficulty: 'easy',
        price: 7500,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Двухдневный тур из Бишкека: каньоны Сказка и Конорчек, конная прогулка, шоу с орлами и ночь в юрте на берегу озера.',
        short_description_en: 'A 2-day tour from Bishkek: Skazka and Konorchek canyons, horse riding, eagle hunting show and an overnight stay in a yurt by the lake.',
        full_description: 'Этот двухдневный тур — идеальный вариант для тех, кто хочет быстро и ярко познакомиться с Иссык-Кулем. Вы увидите знаменитые красные каньоны Сказка и Конорчек, покатаетесь на лошадях по побережью, познакомитесь с традицией охоты с орлами и проведёте ночь в настоящей кыргызской юрте на берегу озера. Тур подходит для новичков и семей, не требует специальной подготовки.',
        full_description_en: 'This 2-day tour is perfect for those who want a quick and vivid introduction to Issyk-Kul. You will see the famous red Skazka and Konorchek canyons, ride horses along the lakeshore, experience the traditional eagle hunting demonstration, and spend a night in a real Kyrgyz yurt by the lake. The tour is suitable for beginners and families, no special fitness required.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        included: [
          'Трансфер Бишкек ↔ Иссык-Куль (мини-вэн)',
          'Проживание: 1 ночь в юрте (2–4 человека в юрте)',
          'Питание: 1 завтрак, 2 обеда, 1 ужин',
          'Гид (русский/английский по запросу)',
          'Конная прогулка (1–2 часа)',
          'Шоу с орлами',
          'Входные билеты (каньоны)'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые гиду'],
        available_dates: ['2026-09-20', '2026-09-27', '2026-10-04'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Иссык-Куль → каньоны → орлы → юрта',
            description: 'Выезд из Бишкека утром, трансфер через Боомское ущелье. Остановка на кофе/перекус в пути. Посещение каньона Сказка (прогулка 1–1.5 часа). Обед в кафе на южном берегу. Шоу с орлами в Боконбаево (1–2 часа). Конная прогулка 1–2 часа по побережью. Прибытие в юртовый лагерь, ужин, ночь в юрте.',
            activities: ['Трансфер', 'Каньон Сказка', 'Обед', 'Шоу с орлами', 'Конная прогулка', 'Ужин', 'Ночь в юрте']
          },
          {
            day: 2,
            title: 'Юрта → каньон Конорчек → Бишкек',
            description: 'Завтрак в юртовом лагере. Переезд к каньону Конорчек. Прогулка по каньону (2–3 часа, лёгкий/средний уровень). Обед в пути. Возвращение в Бишкек вечером.',
            activities: ['Завтрак', 'Каньон Конорчек', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['skazka-canyon'], locationMap['konorchek-canyon'], locationMap['bokonbayevo']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['weekend'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Шоу с орлами', 'Конная прогулка'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 2: 3 дня - Иссык-Куль + Чон-Кемин
      {
        slug: '3-dnya-issyk-kul-chon-kemin',
        title: '3 дня: Иссык-Куль и Чон-Кемин — орлы, кони и каньоны',
        title_en: '3 Days: Issyk-Kul and Chon-Kemin — Eagles, Horses and Canyons',
        type: 'combo',
        duration: '3 дня / 2 ночи',
        difficulty: 'medium',
        price: 12000,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 0,
        region: 'Иссык-Кульская область + Чуйская область',
        short_description: 'Трёхдневный комбо-тур: Иссык-Куль (каньоны, орлы, юрта) + Чон-Кемин (конная прогулка, гестхаус).',
        short_description_en: 'A 3-day combo tour: Issyk-Kul (canyons, eagles, yurt) and Chon-Kemin (horse riding, guesthouse).',
        full_description: 'Этот трёхдневный тур объединяет два самых живописных региона: Иссык-Куль и Чон-Кемин. Вы увидите красные каньоны, познакомитесь с охотниками с орлами, прокатитесь на лошадях по горным долинам и проведёте две ночи в разных форматах — в юрте на берегу озера и в уютном гестхаусе в горах.',
        full_description_en: 'This 3-day tour combines two of the most scenic regions: Issyk-Kul and Chon-Kemin. You will see red canyons, meet eagle hunters, ride horses through mountain valleys, and spend two nights in different formats — a yurt by the lake and a cozy guesthouse in the mountains.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        included: [
          'Трансфер Бишкек ↔ Иссык-Куль ↔ Чон-Кемин',
          'Проживание: 1 ночь в юрте + 1 ночь в гестхаусе',
          'Питание: 2 завтрака, 3 обеда, 2 ужина',
          'Гид (русский/английский)',
          'Конные прогулки (Чон-Кемин + Иссык-Куль)',
          'Шоу с орлами',
          'Входные билеты (каньоны)'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-21', '2026-09-28', '2026-10-05'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Иссык-Куль → каньоны → орлы → юрта',
            description: 'Выезд из Бишкека, трансфер через Боом. Каньон Сказка (прогулка 1–1.5 часа). Обед на южном берегу. Шоу с орлами в Боконбаево. Ночь в юртовом лагере на берегу озера.',
            activities: ['Трансфер', 'Каньон Сказка', 'Обед', 'Шоу с орлами', 'Ночь в юрте']
          },
          {
            day: 2,
            title: 'Иссык-Куль → Чон-Кемин',
            description: 'Завтрак в юрте. Переезд в Чон-Кемин (через Боом). Обед в гестхаусе. Конная прогулка 2–3 часа по ущелью. Ночь в гестхаусе в Чон-Кемине.',
            activities: ['Завтрак', 'Трансфер', 'Обед', 'Конная прогулка', 'Ночь в гестхаусе']
          },
          {
            day: 3,
            title: 'Чон-Кемин → Бишкек',
            description: 'Завтрак в гестхаусе. Лёгкая прогулка по окрестностям или свободное время. Обед в пути. Возвращение в Бишкек вечером.',
            activities: ['Завтрак', 'Прогулка', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['skazka-canyon'], locationMap['bokonbayevo'], locationMap['chon-kemin']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Шоу с орлами', 'Конная прогулка'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 3: 3 дня - Большое кольцо (плато Арбель)
      {
        slug: '3-dnya-bolshoe-koltso-issyk-kulya-arabel',
        title: '3 дня: Большое кольцо Иссык-Куля — плато Арбель, каньоны и орлы',
        title_en: '3 Days: Great Issyk-Kul Loop — Arabel Plateau, Canyons and Eagles',
        type: 'jeep',
        duration: '3 дня / 2 ночи',
        difficulty: 'medium',
        price: 15000,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Трёхдневный 4x4-тур вокруг Иссык-Куля: плато Арбель (3900 м), каньоны Ак-Сай, шоу с орлами.',
        short_description_en: 'A 3-day 4x4 tour around Issyk-Kul: Arabel Plateau (3900 m), Ak-Sai canyons, eagle show.',
        full_description: 'Этот трёхдневный 4x4-тур — для тех, кто хочет увидеть Иссык-Куль с разных сторон: от цветных каньонов до высокогорного плато Арбель на высоте 3900 метров. Вы проедете по южному и восточному берегу озера, подниметесь на джипе в высокогорье, познакомитесь с охотниками с орлами.',
        full_description_en: 'This 3-day 4x4 tour is for those who want to see Issyk-Kul from different angles: from colorful canyons to the high-mountain Arabel Plateau at 3900 meters. You will travel along the southern and eastern shores of the lake, ascend to the highlands by jeep, meet eagle hunters.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        included: [
          'Трансфер на 4x4 (мини-вэн/джип)',
          'Проживание: 1 ночь в юрте + 1 ночь в гестхаусе',
          'Питание: 2 завтрака, 3 обеда, 2 ужина',
          'Гид (русский/английский)',
          'Шоу с орлами',
          'Входные билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-22', '2026-09-29'],
        program: [
          {
            day: 1,
            title: 'Бишкек → южный берег → каньоны Ак-Сай → Боконбаево',
            description: 'Выезд из Бишкека, трансфер через Боом. Обед в пути. Панорамный хайк над каньонами Ак-Сай (1.5–2 часа). Шоу с орлами в Боконбаево. Ночь в юртовом лагере на берегу.',
            activities: ['Трансфер', 'Обед', 'Хайкинг', 'Шоу с орлами', 'Ночь в юрте']
          },
          {
            day: 2,
            title: 'Боконбаево → плато Арбель → Каракол',
            description: 'Завтрак в юрте. Переезд к подножию плато Арбель. Подъём на 4x4 до 3900 м, прогулка по плато (2–3 часа). Обед в пути. Прибытие в Каракол, ночь в гестхаусе.',
            activities: ['Завтрак', '4x4 подъём', 'Прогулка по плато', 'Обед', 'Ночь в гестхаусе']
          },
          {
            day: 3,
            title: 'Каракол → Джеты-Огуз → Бишкек',
            description: 'Завтрак в гестхаусе. Посещение ущелья Джеты-Огуз (прогулка 1–2 часа). Обед в пути. Возвращение в Бишкек вечером.',
            activities: ['Завтрак', 'Ущелье Джеты-Огуз', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['bokonbayevo'], locationMap['karakol'], locationMap['jeti-oguz']],
        tour_type_id: typeMap['jeep'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Шоу с орлами', '4x4 тур', 'Панорамный хайкинг'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 4: 4 дня - Треккинг по южному берегу
      {
        slug: '4-dnya-trekking-yuzhnyy-bereg-barskoon-jeti-oguz',
        title: '4 дня: Треккинг по южному берегу Иссык-Куля — Барскаун и Джеты-Огуз',
        title_en: '4 Days: Trekking along the Southern Shore of Issyk-Kul — Barskoon and Jeti-Oguz',
        type: 'hiking',
        duration: '4 дня / 3 ночи',
        difficulty: 'medium',
        price: 17000,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Четырёхдневный пеший тур по южному берегу: водопады Барскаун, ущелье Джеты-Огуз, ночь в гестхаусах и юрте.',
        short_description_en: 'A 4-day hiking tour along the southern shore: Barskoon waterfalls, Jeti-Oguz gorge, overnight in guesthouses and a yurt.',
        full_description: 'Этот четырёхдневный пеший тур — для тех, кто хочет глубоко познакомиться с южным берегом Иссык-Куля. Вы пройдёте по живописным ущельям Барскаун и Джеты-Огуз, увидите водопады, альпийские луга и красные скалы.',
        full_description_en: 'This 4-day hiking tour is for those who want to deeply explore the southern shore of Issyk-Kul. You will hike through the scenic Barskoon and Jeti-Oguz gorges, see waterfalls, alpine meadows and red cliffs.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b94e?w=800',
        included: [
          'Трансфер Бишкек ↔ Барскаун ↔ Джеты-Огуз',
          'Проживание: 2 ночи в гестхаусе + 1 ночь в юрте',
          'Питание: 3 завтрака, 3 обеда, 2 ужина',
          'Гид (русский/английский)',
          'Входные билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-19', '2026-09-26'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Барскаун',
            description: 'Выезд из Бишкека, трансфер через Боом. Обед в пути. Прибытие в Барскаун, лёгкая прогулка к водопаду (1.5–2 часа). Ночь в гестхаусе в Барскауне.',
            activities: ['Трансфер', 'Обед', 'Прогулка к водопаду', 'Ночь в гестхаусе']
          },
          {
            day: 2,
            title: 'Барскаун → треккинг по ущелью',
            description: 'Завтрак в гестхаусе. Треккинг по ущелью Барскаун (4–5 часов, средний уровень). Обед в пути (пикник). Возвращение в гестхаус, ужин, ночь.',
            activities: ['Завтрак', 'Треккинг', 'Пикник', 'Ужин', 'Ночь в гестхаусе']
          },
          {
            day: 3,
            title: 'Барскаун → Джеты-Огуз',
            description: 'Завтрак. Переезд в Джеты-Огуз. Обед в гестхаусе. Прогулка по ущелью Джеты-Огуз (2–3 часа). Ночь в юртовом лагере в Джеты-Огузе.',
            activities: ['Завтрак', 'Трансфер', 'Обед', 'Прогулка', 'Ночь в юрте']
          },
          {
            day: 4,
            title: 'Джеты-Огуз → Бишкек',
            description: 'Завтрак в юрте. Свободное время утром. Обед в пути. Возвращение в Бишкек вечером.',
            activities: ['Завтрак', 'Свободное время', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['barskoon'], locationMap['jeti-oguz']],
        tour_type_id: typeMap['hiking'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Треккинг', 'Водопады'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 5: 2 дня - Конный тур по южному берегу
      {
        slug: '2-dnya-konnyy-tur-yuzhnyy-bereg-bokonbayevo',
        title: '2 дня: Конный тур по южному берегу Иссык-Куля — Боконбаево и каньоны',
        title_en: '2 Days: Horse Riding Tour along the Southern Shore of Issyk-Kul — Bokonbaevo and Canyons',
        type: 'horseback',
        duration: '2 дня / 1 ночь',
        difficulty: 'easy',
        price: 9000,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Двухдневный конный тур: прогулки на лошадях по побережью, каньон Сказка, шоу с орлами, ночь в юрте.',
        short_description_en: 'A 2-day horse riding tour: horse rides along the lakeshore, Skazka Canyon, eagle show, overnight in a yurt.',
        full_description: 'Этот двухдневный конный тур — идеальный вариант для любителей лошадей и природы. Вы прокатитесь на лошадях по побережью Иссык-Куля, посетите знаменитый каньон Сказка, познакомитесь с охотниками с орлами.',
        full_description_en: 'This 2-day horse riding tour is perfect for horse lovers and nature enthusiasts. You will ride along the shores of Issyk-Kul, visit the famous Skazka Canyon, meet eagle hunters.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        included: [
          'Трансфер Бишкек ↔ Иссык-Куль',
          'Проживание: 1 ночь в юрте',
          'Питание: 1 завтрак, 2 обеда, 1 ужин',
          'Гид + инструктор по верховой езде',
          'Кони и снаряжение',
          'Шоу с орлами',
          'Входные билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-20', '2026-09-27', '2026-10-04'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Боконбаево → кони → орлы → юрта',
            description: 'Выезд из Бишкека, трансфер через Боом. Обед в пути. Конная прогулка 2–3 часа по побережью near Боконбаево. Шоу с орлами. Ночь в юртовом лагере.',
            activities: ['Трансфер', 'Обед', 'Конная прогулка', 'Шоу с орлами', 'Ночь в юрте']
          },
          {
            day: 2,
            title: 'Юрта → каньон Сказка → Бишкек',
            description: 'Завтрак в юрте. Конная прогулка к каньону Сказка (2–3 часа). Обед в пути. Возвращение в Бишкек вечером.',
            activities: ['Завтрак', 'Конная прогулка', 'Каньон Сказка', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['bokonbayevo'], locationMap['skazka-canyon']],
        tour_type_id: typeMap['horseback'],
        tour_format_id: formatMap['weekend'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Шоу с орлами', 'Конная прогулка'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 6: 3 дня - Сон-Куль + Иссык-Куль
      {
        slug: '3-dnya-son-kul-issyk-kul-dva-ozera',
        title: '3 дня: Сон-Куль и Иссык-Куль — два озера, кони и юрты',
        title_en: '3 Days: Song-Kul and Issyk-Kul — Two Lakes, Horses and Yurts',
        type: 'combo',
        duration: '3 дня / 2 ночи',
        difficulty: 'medium',
        price: 14000,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Трёхдневный тур: высокогорное озеро Сон-Куль (3000 м), конные прогулки, юрты, плюс Иссык-Куль.',
        short_description_en: 'A 3-day tour: high-mountain Song-Kul lake (3000 m), horse riding, yurts, plus Issyk-Kul.',
        full_description: 'Этот трёхдневный тур объединяет два самых известных озера Кыргызстана: высокогорное Сон-Куль (3000 м) и альпийский Иссык-Куль. Вы проведёте ночь в юрте на берегу Сон-Куля, покатаетесь на лошадях по альпийским лугам.',
        full_description_en: 'This 3-day tour combines two of Kyrgyzstan\'s most famous lakes: high-mountain Song-Kul (3000 m) and alpine Issyk-Kul. You will spend a night in a yurt on the shore of Song-Kul, ride horses across alpine meadows.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        included: [
          'Трансфер Бишкек ↔ Сон-Куль ↔ Иссык-Куль',
          'Проживание: 1 ночь в юрте + 1 ночь в гестхаусе',
          'Питание: 2 завтрака, 3 обеда, 2 ужина',
          'Гид (русский/английский)',
          'Конные прогулки',
          'Входные билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-21', '2026-09-28'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Сон-Куль',
            description: 'Выезд из Бишкека, трансфер через перевал. Обед в пути. Прибытие на Сон-Куль, конная прогулка 2–3 часа. Ночь в юртовом лагере на берегу озера.',
            activities: ['Трансфер', 'Обед', 'Конная прогулка', 'Ночь в юрте']
          },
          {
            day: 2,
            title: 'Сон-Куль → Иссык-Куль',
            description: 'Завтрак в юрте. Треккинг или конная прогулка утром. Переезд на Иссык-Куль. Обед в гестхаусе. Ночь в гестхаусе на берегу Иссык-Куля.',
            activities: ['Завтрак', 'Треккинг', 'Трансфер', 'Обед', 'Ночь в гестхаусе']
          },
          {
            day: 3,
            title: 'Иссык-Куль → Бишкек',
            description: 'Завтрак. Свободное время утром (прогулка по берегу). Обед в пути. Возвращение в Бишкек вечером.',
            activities: ['Завтрак', 'Прогулка', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['son-kul']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Конная прогулка', 'Треккинг'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 7: 1 день - Каньоны + орлы (экспресс)
      {
        slug: '1-den-kanyony-issyk-kulya-orly-ekspress',
        title: '1 день: Каньоны Иссык-Куля и шоу с орлами — экспресс-тур из Бишкека',
        title_en: '1 Day: Issyk-Kul Canyons and Eagle Show — Express Tour from Bishkek',
        type: 'combo',
        duration: '1 день',
        difficulty: 'easy',
        price: 5000,
        currency: 'KGS',
        rating: 4.7,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Однодневный тур: каньоны Сказка и Конорчек, шоу с орлами в Боконбаево, обед на берегу Иссык-Куля.',
        short_description_en: 'A 1-day tour: Skazka and Konorchek canyons, eagle show in Bokonbaevo, lunch by Issyk-Kul.',
        full_description: 'Этот однодневный экспресс-тур — для тех, у кого мало времени, но хочется увидеть Иссык-Куль. За один день вы посетите два знаменитых каньона, познакомитесь с охотниками с орлами и пообедайте на берегу озера.',
        full_description_en: 'This 1-day express tour is for those with limited time who still want to see Issyk-Kul. In one day, you will visit two famous canyons, meet eagle hunters, and have lunch by the lake.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        included: [
          'Трансфер Бишкек ↔ Иссык-Куль',
          'Питание: 1 обед',
          'Гид (русский/английский)',
          'Шоу с орлами',
          'Входные билеты'
        ],
        not_included: ['Завтрак/ужин', 'Личные расходы', 'Страховка'],
        available_dates: ['2026-09-16', '2026-09-23', '2026-09-30'],
        program: [
          {
            day: 1,
            title: 'Бишкек → каньоны → орлы → Бишкек',
            description: 'Выезд из Бишкека рано утром. Каньон Сказка (прогулка 1–1.5 часа). Обед на южном берегу. Шоу с орлами в Боконбаево. Каньон Конорчек (прогулка 1.5–2 часа). Возвращение в Бишкек вечером.',
            activities: ['Трансфер', 'Каньон Сказка', 'Обед', 'Шоу с орлами', 'Каньон Конорчек', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['skazka-canyon'], locationMap['konorchek-canyon'], locationMap['bokonbayevo']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['day_trip'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Шоу с орлами'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 8: 5 дней - Большое кольцо + Сон-Куль
      {
        slug: '5-dney-bolshoe-koltso-son-kul',
        title: '5 дней: Большое кольцо Иссык-Куля + Сон-Куль — озёра, каньоны и кони',
        title_en: '5 Days: Great Issyk-Kul Loop + Song-Kul — Lakes, Canyons and Horses',
        type: 'combo',
        duration: '5 дней / 4 ночи',
        difficulty: 'medium',
        price: 24000,
        currency: 'KGS',
        rating: 5.0,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Пятидневный тур вокруг Иссык-Куля с заездом на Сон-Куль: каньоны, кони, юрты, гестхаусы.',
        short_description_en: 'A 5-day tour around Issyk-Kul with a trip to Song-Kul: canyons, horses, yurts, guesthouses.',
        full_description: 'Этот пятидневный тур — максимальное погружение в регион Иссык-Куля и Сон-Куля. Вы объедете озеро по кругу, подниметесь на высокогорное Сон-Куль, покатаетесь на лошадях, посетите каньоны и ущелья.',
        full_description_en: 'This 5-day tour is a deep dive into the Issyk-Kul and Song-Kul regions. You will circle the lake, ascend to high-mountain Song-Kul, ride horses, visit canyons and gorges.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        included: [
          'Трансфер на всём маршруте',
          'Проживание: 2 ночи в юрте + 2 ночи в гестхаусе',
          'Питание: 4 завтрака, 5 обедов, 4 ужина',
          'Гид (русский/английский)',
          'Конные прогулки',
          'Входные билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-20', '2026-10-01'],
        program: [
          {
            day: 1,
            title: 'Бишкек → южный берег → каньоны → Боконбаево',
            description: 'Каньоны Ак-Сай, Сказка. Шоу с орлами. Ночь в юрте.',
            activities: ['Трансфер', 'Каньоны', 'Шоу с орлами', 'Ночь в юрте']
          },
          {
            day: 2,
            title: 'Боконбаево → Сон-Куль',
            description: 'Переезд на Сон-Куль. Конная прогулка. Ночь в юрте на Сон-Куле.',
            activities: ['Трансфер', 'Конная прогулка', 'Ночь в юрте']
          },
          {
            day: 3,
            title: 'Сон-Куль → восточный берег (Каракол)',
            description: 'Треккинг утром. Переезд в Каракол. Ночь в гестхаусе.',
            activities: ['Треккинг', 'Трансфер', 'Ночь в гестхаусе']
          },
          {
            day: 4,
            title: 'Каракол → Джеты-Огуз → северный берег',
            description: 'Ущелье Джеты-Огуз. Переезд на северный берег. Ночь в гестхаусе.',
            activities: ['Ущелье Джеты-Огуз', 'Трансфер', 'Ночь в гестхаусе']
          },
          {
            day: 5,
            title: 'Северный берег → Бишкек',
            description: 'Свободное время утром. Возвращение в Бишкек.',
            activities: ['Свободное время', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['bokonbayevo'], locationMap['son-kul'], locationMap['karakol'], locationMap['jeti-oguz']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Конная прогулка', 'Треккинг', 'Шоу с орлами'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 9: 3 дня - Восточный Иссык-Куль
      {
        slug: '3-dnya-vostochnyy-issyk-kul-karakol-jeti-oguz-ak-suu',
        title: '3 дня: Восточный Иссык-Куль — Каракол, Джеты-Огуз и Ак-Суу',
        title_en: '3 Days: Eastern Issyk-Kul — Karakol, Jeti-Oguz and Ak-Suu',
        type: 'hiking',
        duration: '3 дня / 2 ночи',
        difficulty: 'medium',
        price: 13000,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Трёхдневный тур по восточному берегу: ущелья Джеты-Огуз и Ак-Суу, город Каракол.',
        short_description_en: 'A 3-day tour of the eastern shore: Jeti-Oguz and Ak-Suu gorges, Karakol town.',
        full_description: 'Этот трёхдневный тур посвящён восточному берегу Иссык-Куля — одному из самых живописных участков озера. Вы посетите город Каракол, пройдёте по ущельям Джеты-Огуз и Ак-Суу.',
        full_description_en: 'This 3-day tour focuses on the eastern shore of Issyk-Kul — one of the most scenic parts of the lake. You will visit Karakol town, hike through Jeti-Oguz and Ak-Suu gorges.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b94e?w=800',
        included: [
          'Трансфер Бишкек ↔ Каракол',
          'Проживание: 1 ночь в гестхаусе + 1 ночь в юрте',
          'Питание: 2 завтрака, 3 обеда, 2 ужина',
          'Гид (русский/английский)',
          'Входные билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-22', '2026-09-29'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Каракол',
            description: 'Трансфер через Боом. Обед в пути. Прогулка по Караколу. Ночь в гестхаусе.',
            activities: ['Трансфер', 'Обед', 'Прогулка по городу', 'Ночь в гестхаусе']
          },
          {
            day: 2,
            title: 'Каракол → Джеты-Огуз → Ак-Суу',
            description: 'Завтрак. Ущелье Джеты-Огуз (прогулка 2–3 часа). Обед. Ущелье Ак-Суу (прогулка 2 часа). Ночь в юртовом лагере.',
            activities: ['Завтрак', 'Ущелье Джеты-Огуз', 'Обед', 'Ущелье Ак-Суу', 'Ночь в юрте']
          },
          {
            day: 3,
            title: 'Ак-Суу → Бишкек',
            description: 'Завтрак. Свободное время. Обед в пути. Возвращение в Бишкек.',
            activities: ['Завтрак', 'Свободное время', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['karakol'], locationMap['jeti-oguz'], locationMap['ak-suu']],
        tour_type_id: typeMap['hiking'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Треккинг'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 10: 2 дня - Северный берег (Чолпон-Ата)
      {
        slug: '2-dnya-severnyy-bereg-cholpon-ata-petroglify',
        title: '2 дня: Северный берег Иссык-Куля — Чолпон-Ата, петроглифы и кони',
        title_en: '2 Days: Northern Shore of Issyk-Kul — Cholpon-Ata, Petroglyphs and Horses',
        type: 'combo',
        duration: '2 дня / 1 ночь',
        difficulty: 'easy',
        price: 7500,
        currency: 'KGS',
        rating: 4.7,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Двухдневный тур по северному берегу: петроглифы Чолпон-Ата, конная прогулка, пляж.',
        short_description_en: 'A 2-day tour of the northern shore: Cholpon-Ata petroglyphs, horse riding, beach.',
        full_description: 'Двухдневный расслабленный тур по северному берегу с культурной программой (петроглифы) и конной прогулкой. Подходит для семей и тех, кто хочет спокойный отдых у озера.',
        full_description_en: 'A relaxed 2-day tour of the northern shore with cultural program (petroglyphs) and horse riding. Suitable for families and those seeking a calm lakeside vacation.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        included: [
          'Трансфер',
          'Проживание: 1 ночь в гестхаусе',
          'Питание: 1 завтрак, 2 обеда, 1 ужин',
          'Гид',
          'Конная прогулка',
          'Входные билеты (петроглифы)'
        ],
        not_included: ['Личные расходы', 'Страховка'],
        available_dates: ['2026-09-21', '2026-09-28'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Чолпон-Ата',
            description: 'Трансфер через Боом. Обед. Петроглифы Чолпон-Ата (экскурсия 1–2 часа). Конная прогулка по побережью (2 часа). Ночь в гестхаусе.',
            activities: ['Трансфер', 'Обед', 'Петроглифы', 'Конная прогулка', 'Ночь в гестхаусе']
          },
          {
            day: 2,
            title: 'Чолпон-Ата → Бишкек',
            description: 'Завтрак. Свободное время на пляже. Обед. Возвращение в Бишкек.',
            activities: ['Завтрак', 'Пляж', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['cholpon-ata']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['weekend'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Петроглифы', 'Конная прогулка', 'Пляж'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 11: 4 дня - Треккинг + кони
      {
        slug: '4-dnya-trekking-koni-jeti-oguz-karakol-ak-suu',
        title: '4 дня: Треккинг и кони — Джеты-Огуз, Каракол, Ак-Суу',
        title_en: '4 Days: Trekking and Horses — Jeti-Oguz, Karakol, Ak-Suu',
        type: 'combo',
        duration: '4 дня / 3 ночи',
        difficulty: 'medium',
        price: 18500,
        currency: 'KGS',
        rating: 4.8,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Четырёхдневный комбо-тур: пешие походы и конные прогулки по восточному берегу.',
        short_description_en: 'A 4-day combo tour: hiking and horse riding on the eastern shore.',
        full_description: 'Комбо-тур для тех, кто хочет и походить пешком, и покататься на лошадях по восточному берегу Иссык-Куля.',
        full_description_en: 'A combo tour for those who want both hiking and horse riding on the eastern shore of Issyk-Kul.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        included: [
          'Трансфер',
          '2 ночи в гестхаусе + 1 ночь в юрте',
          'Питание',
          'Гид',
          'Кони',
          'Билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-20', '2026-09-27'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Каракол',
            description: 'Трансфер, обед, прогулка по городу, ночь в гестхаусе.',
            activities: ['Трансфер', 'Обед', 'Прогулка', 'Ночь в гестхаусе']
          },
          {
            day: 2,
            title: 'Каракол → Джеты-Огуз (треккинг)',
            description: 'Треккинг 4–5 часов, ночь в юрте.',
            activities: ['Треккинг', 'Ночь в юрте']
          },
          {
            day: 3,
            title: 'Джеты-Огуз → Ак-Суу (кони)',
            description: 'Конная прогулка 3–4 часа, ночь в гестхаусе.',
            activities: ['Конная прогулка', 'Ночь в гестхаусе']
          },
          {
            day: 4,
            title: 'Ак-Суу → Бишкек',
            description: 'Завтрак, обед в пути, возвращение.',
            activities: ['Завтрак', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['karakol'], locationMap['jeti-oguz'], locationMap['ak-suu']],
        tour_type_id: typeMap['combo'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Треккинг', 'Конная прогулка'],
        languages_available: ['Русский', 'Английский']
      },

      // Тур 12: 3 дня - Алтын-Арашан + Джеты-Огуз
      {
        slug: '3-dnya-altyn-arashan-goryachie-istochniki-jeti-oguz',
        title: '3 дня: Алтын-Арашан — горячие источники и Джеты-Огуз',
        title_en: '3 Days: Altyn-Arashan — Hot Springs and Jeti-Oguz',
        type: 'hiking',
        duration: '3 дня / 2 ночи',
        difficulty: 'medium',
        price: 14000,
        currency: 'KGS',
        rating: 4.9,
        reviews_count: 0,
        region: 'Иссык-Кульская область',
        short_description: 'Трёхдневный тур с посещением горячих источников Алтын-Арашан и ущелья Джеты-Огуз.',
        short_description_en: 'A 3-day tour with a visit to Altyn-Arashan hot springs and Jeti-Oguz gorge.',
        full_description: 'Тур для тех, кто хочет совместить треккинг, горячие источники и живописные ущелья.',
        full_description_en: 'A tour for those who want to combine trekking, hot springs and scenic gorges.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b94e?w=800',
        included: [
          'Трансфер',
          '2 ночи в гестхаусе/юрте',
          'Питание',
          'Гид',
          'Билеты'
        ],
        not_included: ['Личные расходы', 'Страховка', 'Чаевые'],
        available_dates: ['2026-09-21', '2026-09-28'],
        program: [
          {
            day: 1,
            title: 'Бишкек → Каракол',
            description: 'Трансфер, ночь в гестхаусе.',
            activities: ['Трансфер', 'Ночь в гестхаусе']
          },
          {
            day: 2,
            title: 'Каракол → Алтын-Арашан',
            description: 'Переезд, горячие источники, треккинг, ночь в гестхаусе/юрте.',
            activities: ['Трансфер', 'Горячие источники', 'Треккинг', 'Ночь в гестхаусе']
          },
          {
            day: 3,
            title: 'Алтын-Арашан → Джеты-Огуз → Бишкек',
            description: 'Джеты-Огуз, обед, возвращение.',
            activities: ['Ущелье Джеты-Огуз', 'Обед', 'Трансфер']
          }
        ],
        region_id: issykKulRegion.id,
        location_ids: [locationMap['karakol'], locationMap['altyn-arashan'], locationMap['jeti-oguz']],
        tour_type_id: typeMap['hiking'],
        tour_format_id: formatMap['multiday'],
        pickup_locations: ['Бишкек', 'Аэропорт Манас'],
        additional_activities: ['Горячие источники', 'Треккинг'],
        languages_available: ['Русский', 'Английский']
      }
    ];

    // Добавляем все туры
    for (const tour of tours) {
      await client.query(`
        INSERT INTO tours (
          slug, title, type, duration, difficulty, price, currency, 
          rating, reviews_count, region, short_description, full_description, 
          image, included, not_included, available_dates, program,
          region_id, location_ids, tour_type_id, tour_format_id,
          pickup_locations, additional_activities, languages_available
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      `, [
        tour.slug, tour.title, tour.type, tour.duration, tour.difficulty, 
        tour.price, tour.currency, tour.rating, tour.reviews_count, tour.region,
        tour.short_description, tour.full_description, tour.image,
        tour.included, tour.not_included, tour.available_dates,
        JSON.stringify(tour.program),
        tour.region_id, tour.location_ids, tour.tour_type_id, tour.tour_format_id,
        tour.pickup_locations, tour.additional_activities, tour.languages_available
      ]);
    }

    console.log(`✅ Успешно добавлено ${tours.length} туров по Иссык-Кулю!`);
    console.log('\n Список туров:');
    tours.forEach((t, i) => {
      console.log(`${i + 1}. ${t.title} (${t.duration}, ${t.price} сом)`);
    });

  } catch (error) {
    console.error(' Ошибка добавления туров:', error.message);
  } finally {
    client.release();
  }
};

seedIssykKulTours();