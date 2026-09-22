import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TourCard from '../components/TourCard'
import { getTours, getRegions, getTourTypes, getTourFormats } from '../services/api'
import { useTranslation } from '../hooks/useTranslation'

export default function HomePage() {
  const { t } = useTranslation()
  const [tours, setTours] = useState([])
  const [regions, setRegions] = useState([])
  const [tourTypes, setTourTypes] = useState([])
  const [tourFormats, setTourFormats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [filters, setFilters] = useState({
    region_id: '',
    tour_type_id: '',
    tour_format_id: '',
    difficulty: '',
    priceMin: '',
    priceMax: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [toursData, regionsData, typesData, formatsData] = await Promise.all([
          getTours(),
          getRegions(),
          getTourTypes(),
          getTourFormats()
        ])
        setTours(toursData)
        setRegions(regionsData)
        setTourTypes(typesData)
        setTourFormats(formatsData)
      } catch (err) {
        setError(t.error)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchFilteredTours = async () => {
      try {
        const apiFilters = {
          region_id: filters.region_id || undefined,
          tour_type_id: filters.tour_type_id || undefined,
          tour_format_id: filters.tour_format_id || undefined,
          difficulty: filters.difficulty || undefined,
          price_min: filters.priceMin || undefined,
          price_max: filters.priceMax || undefined
        }
        
        const filteredTours = await getTours(apiFilters)
        setTours(filteredTours)
      } catch (err) {
        console.error('Ошибка фильтрации:', err)
      }
    }
    fetchFilteredTours()
  }, [filters])

  const resetFilters = () => {
    setFilters({
      region_id: '',
      tour_type_id: '',
      tour_format_id: '',
      difficulty: '',
      priceMin: '',
      priceMax: ''
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-4xl mx-auto">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 mb-8">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t.trustedPartners}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t.instantBooking}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t.support247}
            </span>
          </div>
          <button 
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-primary-100 hover:text-white underline"
          >
            {t.viewTours}
          </button>
        </div>
      </section>

      {/* Каталог */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{t.allTours}</h2>
          <span className="text-gray-600">{t.found}: {tours.length}</span>
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-600">{t.loading}</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="flex gap-8 flex-col lg:flex-row">
            
{/* Фильтры */}
<aside className="w-full lg:w-72 flex-shrink-0">
  <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
    <h3 className="font-semibold mb-4">{t.filters}</h3>
    
    {/* Регион */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">{t.region}</h4>
      <select 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
        value={filters.region_id}
        onChange={(e) => setFilters({...filters, region_id: e.target.value})}
      >
        <option value="">{t.allRegions}</option>
        {regions.map(region => {
          // Маппинг переводов по slug
          const regionTranslations: Record<string, string> = {
            'chuy': t.chuy,
            'issyk-kul': t.issykKul
          };
          const translatedName = regionTranslations[region.slug] || region.name_ru;
          return (
            <option key={region.id} value={region.id}>{translatedName}</option>
          );
        })}
      </select>
    </div>

    {/* Тип тура */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">{t.tourType}</h4>
      <select 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
        value={filters.tour_type_id}
        onChange={(e) => setFilters({...filters, tour_type_id: e.target.value})}
      >
        <option value="">{t.allTypes}</option>
        {tourTypes.map(type => {
          // Маппинг переводов по code
          const typeTranslations: Record<string, string> = {
            'hiking': t.hiking,
            'horseback': t.horseback,
            'combo': t.combo,
            'jeep': t.jeep,
            'lake_mountains': t.lakeMountains
          };
          const translatedName = typeTranslations[type.code] || type.name_ru;
          return (
            <option key={type.id} value={type.id}>{translatedName}</option>
          );
        })}
      </select>
    </div>

    {/* Формат */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">{t.tourFormat}</h4>
      <select 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
        value={filters.tour_format_id}
        onChange={(e) => setFilters({...filters, tour_format_id: e.target.value})}
      >
        <option value="">{t.allFormats}</option>
        {tourFormats.map(format => {
          // Маппинг переводов по code
          const formatTranslations: Record<string, string> = {
            'day_trip': t.dayTrip,
            'weekend': t.weekend,
            'multiday': t.multiday,
            'private': t.private,
            'group': t.group
          };
          const translatedName = formatTranslations[format.code] || format.name_ru;
          return (
            <option key={format.id} value={format.id}>{translatedName}</option>
          );
        })}
      </select>
    </div>

    {/* Сложность */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">{t.difficulty}</h4>
      <select 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
        value={filters.difficulty}
        onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
      >
        <option value="">{t.any}</option>
        <option value="easy">{t.easy}</option>
        <option value="medium">{t.medium}</option>
        <option value="hard">{t.hard}</option>
      </select>
    </div>

    {/* Цена */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-2">{t.price}</h4>
      <div className="flex gap-2">
        <input 
          type="number"
          placeholder={t.from}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 bg-white"
          value={filters.priceMin}
          onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
        />
        <input 
          type="number"
          placeholder={t.to}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 bg-white"
          value={filters.priceMax}
          onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
        />
      </div>
    </div>

    <button 
      onClick={resetFilters}
      className="w-full text-primary-600 hover:underline text-sm"
    >
      {t.resetFilters}
    </button>
  </div>
</aside>

            {/* Список туров */}
            <div className="flex-1">
              {tours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tours.map(tour => (
                    <TourCard key={tour.id} tour={{
                      id: tour.id.toString(),
                      slug: tour.slug,
                      title: tour.title,
                      type: tour.type,
                      duration: tour.duration,
                      difficulty: tour.difficulty,
                      price: tour.price,
                      currency: tour.currency,
                      rating: tour.rating,
                      reviewsCount: tour.reviews_count,
                      region: tour.region,
                      region_name: tour.region_name,
                      shortDescription: tour.short_description,
                      image: tour.image
                    }} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">{t.nothingFound}</h3>
                  <p className="text-gray-600 mb-4">{t.tryChangeFilters}</p>
                  <button 
                    onClick={resetFilters}
                    className="text-primary-600 hover:underline"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Как это работает */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.howItWorks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Шаг 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step1Title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.step1Desc}</p>
            </div>

            {/* Шаг 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step2Title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.step2Desc}</p>
            </div>

            {/* Шаг 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step3Title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.step3Desc}</p>
            </div>

            {/* Шаг 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.step4Title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.step4Desc}</p>
            </div>
          </div>
        </div>
      </section>

{/* Партнёры CTA - всегда на русском */}
<section className="py-16 bg-primary-600 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold mb-4">Вы гид или владеете базой?</h2>
    <p className="text-lg mb-8">
      Добавьте свои туры на платформу и получайте новых клиентов.
    </p>
    <Link to="/partner-register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
      Стать партнёром
    </Link>
  </div>
</section>

      <Footer />
    </div>
  )
}