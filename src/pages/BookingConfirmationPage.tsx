import { useLocation, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function BookingConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingData = location.state?.booking
  const tourData = location.state?.tour

  useEffect(() => {
    // Если нет данных, перенаправляем на главную
    if (!bookingData) {
      navigate('/')
    }
  }, [bookingData, navigate])

  if (!bookingData) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const transferLabels: { [key: string]: string } = {
    bishkek: 'Из Бишкека',
    airport: 'Из аэропорта Манас',
    none: 'Без трансфера'
  }

  const accommodationLabels: { [key: string]: string } = {
    standard: 'Стандарт',
    comfort: 'Комфорт'
  }

  const mealsLabels: { [key: string]: string } = {
    standard: 'Стандартное питание',
    special: 'Специальное питание'
  }

  const guideLabels: { [key: string]: string } = {
    russian: 'Русскоязычный гид',
    translator: 'Гид-переводчик'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        {/* Успешное сообщение */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Бронирование подтверждено!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Ваша заявка успешно принята. Мы свяжемся с вами в ближайшее время.
          </p>
          
          <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 inline-block">
            <p className="text-sm text-gray-600 mb-1">Номер вашего заказа</p>
            <p className="text-3xl font-bold text-primary-600">
              #{bookingData.id.toString().padStart(6, '0')}
            </p>
          </div>
        </div>

        {/* Детали бронирования */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Детали бронирования</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Тур */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Тур</p>
              <p className="text-lg font-semibold text-gray-900">
                {tourData?.title || bookingData.tour_slug}
              </p>
            </div>

            {/* Дата */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Дата тура</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(bookingData.date)}
              </p>
            </div>

            {/* Участники */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Участники</p>
              <p className="text-lg font-semibold text-gray-900">
                Взрослых: {bookingData.adults}
                {bookingData.children > 0 && `, Детей: ${bookingData.children}`}
              </p>
            </div>

            {/* Трансфер */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Трансфер</p>
              <p className="text-lg font-semibold text-gray-900">
                {transferLabels[bookingData.transfer] || bookingData.transfer}
              </p>
              {bookingData.transfer_details && (
                <p className="text-sm text-gray-600 mt-1">{bookingData.transfer_details}</p>
              )}
            </div>

            {/* Размещение */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Размещение</p>
              <p className="text-lg font-semibold text-gray-900">
                {accommodationLabels[bookingData.accommodation] || bookingData.accommodation}
              </p>
            </div>

            {/* Питание */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Питание</p>
              <p className="text-lg font-semibold text-gray-900">
                {mealsLabels[bookingData.meals] || bookingData.meals}
              </p>
              {bookingData.special_meals_details && (
                <p className="text-sm text-gray-600 mt-1">{bookingData.special_meals_details}</p>
              )}
            </div>

            {/* Гид */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Гид</p>
              <p className="text-lg font-semibold text-gray-900">
                {guideLabels[bookingData.guide] || bookingData.guide}
              </p>
              {bookingData.translator_language && (
                <p className="text-sm text-gray-600 mt-1">Язык: {bookingData.translator_language}</p>
              )}
            </div>

            {/* Дополнительные опции */}
            <div className="border-l-4 border-primary-600 pl-4">
              <p className="text-sm text-gray-600 mb-1">Дополнительные опции</p>
              <div className="space-y-1">
                {bookingData.equipment_rental && (
                  <p className="text-sm text-gray-900">✓ Аренда снаряжения</p>
                )}
                {bookingData.insurance && (
                  <p className="text-sm text-gray-900">✓ Туристическая страховка</p>
                )}
                {!bookingData.equipment_rental && !bookingData.insurance && (
                  <p className="text-sm text-gray-600">Нет дополнительных опций</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Имя</p>
              <p className="text-lg font-semibold text-gray-900">{bookingData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-900">{bookingData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Телефон</p>
              <p className="text-lg font-semibold text-gray-900">{bookingData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Предпочтительный способ связи</p>
              <p className="text-lg font-semibold text-gray-900">
                {bookingData.contact_method?.join(', ') || 'Не указан'}
              </p>
            </div>
          </div>

          {bookingData.comment && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Комментарий</p>
              <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{bookingData.comment}</p>
            </div>
          )}
        </div>

        {/* Что дальше */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Что дальше?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <span className="font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Проверьте email</p>
                <p className="text-primary-100 text-sm">
                  Мы отправили подтверждение на {bookingData.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <span className="font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Ожидайте звонка</p>
                <p className="text-primary-100 text-sm">
                  Наш координатор свяжется с вами в течение 24 часов
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <span className="font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold mb-1">Подготовьтесь к туру</p>
                <p className="text-primary-100 text-sm">
                  После подтверждения вы получите список вещей и детали маршрута
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center"
            >
              На главную
            </Link>
            <Link 
              to="/tours"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition text-center"
            >
              Посмотреть другие туры
            </Link>
            <button 
              onClick={() => window.print()}
              className="bg-white border-2 border-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Распечатать
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нужна помощь? Свяжитесь с нами:{' '}
              <a href="tel:+996555123456" className="text-primary-600 hover:underline">
                +996 555 123 456
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}