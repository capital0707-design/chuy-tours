import { useLanguage } from '../context/LanguageContext'
import { tourTranslations } from '../data/tourTranslations'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getTourBySlug, createBooking } from '../services/api'

interface Tour {
  id: number
  slug: string
  title: string
  type: 'hiking' | 'horseback' | 'combo'
  duration: string
  difficulty: 'easy' | 'medium' | 'hard'
  price: number
  currency: 'KGS' | 'USD'
  rating: number
  reviews_count: number
  region: string
  short_description: string
  full_description: string
  image: string
  included: string[]
  not_included: string[]
  available_dates: string[]
  program: { day: number; title: string; description: string; activities: string[] }[]
}

interface Errors {
  [key: string]: string
}

const PHONE_PREFIX = '+996 '

export default function TourDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  
  const [booking, setBooking] = useState({
    date: '',
    adults: 1,
    children: 0,
    transfer: 'bishkek',
    transferDetails: '',
    accommodation: 'standard',
    meals: 'standard',
    specialMealsDetails: '',
    guide: 'russian',
    translatorLanguage: '',
    equipmentRental: false,
    insurance: false,
    name: '',
    email: '',
    phone: '',
    contactMethod: ['telegram'] as string[],
    comment: '',
    agreeToTerms: false
  })

const { language } = useLanguage()
const t = tourTranslations[language]


  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true)
        const data = await getTourBySlug(slug!)
        setTour(data)
      } catch (err) {
        setError('Тур не найден или произошла ошибка загрузки.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchTour()
  }, [slug])

  // ============ ВАЛИДАЦИЯ (из PartnerRegisterPage) ============

  const handleNameChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s'-]/g, '')
    setBooking({...booking, name: filtered})
    if (errors.name) setErrors({...errors, name: ''})
  }

  const handleEmailChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-Z0-9._%+\-@]/g, '')
    setBooking({...booking, email: filtered})
    if (errors.email) setErrors({...errors, email: ''})
  }

  const handlePhoneChange = (value: string) => {
    let filtered = value.replace(/[^0-9+\s\-\(\)]/g, '')
    
    if (!filtered.trim().startsWith('+996')) {
      const digits = filtered.replace(/\D/g, '')
      filtered = '+996 ' + digits
    }
    
    const digitsAfterPrefix = filtered.substring(5).replace(/\D/g, '')
    
    if (digitsAfterPrefix.length > 9) {
      const prefix = filtered.substring(0, 5)
      const limitedDigits = digitsAfterPrefix.substring(0, 9)
      filtered = prefix + limitedDigits
    }
    
    setBooking({...booking, phone: filtered})
    if (errors.phone) setErrors({...errors, phone: ''})
  }

  const handlePhoneFocus = () => {
    if (!booking.phone.trim()) {
      setBooking({...booking, phone: PHONE_PREFIX})
    }
  }

  const handlePhoneBlur = () => {
    if (!booking.phone.trim() || booking.phone === '+996' || booking.phone === '+996 ') {
      setBooking({...booking, phone: ''})
    }
  }

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Введите email'
    if (!email.includes('@')) return 'Email должен содержать символ @'
    
    const parts = email.split('@')
    if (parts.length !== 2) return 'Email должен содержать один символ @'
    
    const [localPart, domain] = parts
    
    if (localPart.length < 2) return 'Имя пользователя должно содержать минимум 2 символа'
    if (!domain || domain.length === 0) return 'Введите домен после @'
    if (!domain.includes('.')) return 'Домен должен содержать точку (например: example.com)'
    
    const domainParts = domain.split('.')
    const tld = domainParts[domainParts.length - 1]
    
    if (!tld || tld.length < 2) return 'Доменная зона должна содержать минимум 2 символа'
    if (!/^[a-zA-Z]+$/.test(tld)) return 'Доменная зона должна содержать только буквы'
    
    return ''
  }

  const validateName = (name: string): string => {
    if (!name.trim()) return 'Введите ваше имя'
    if (!/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(name)) return 'Имя должно содержать только буквы'
    if (name.trim().length < 2) return 'Имя должно содержать минимум 2 символа'
    return ''
  }

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return 'Введите номер телефона'
    const digits = phone.replace(/\D/g, '')
    const digitsAfterPrefix = digits.substring(3)
    if (digitsAfterPrefix.length < 9) return `Номер должен содержать 9 цифр после +996 (сейчас: ${digitsAfterPrefix.length})`
    if (digitsAfterPrefix.length > 9) return 'Номер должен содержать ровно 9 цифр после +996'
    return ''
  }

  const handleNameBlur = () => {
    const error = validateName(booking.name)
    setErrors({...errors, name: error})
  }

  const handleEmailBlur = () => {
    const error = validateEmail(booking.email)
    setErrors({...errors, email: error})
  }

  const handlePhoneBlurValidation = () => {
    const error = validatePhone(booking.phone)
    setErrors({...errors, phone: error})
  }

  const validateBookingForm = (): boolean => {
    const newErrors: Errors = {}

    if (!booking.date) newErrors.date = 'Выберите дату тура'
    
    const nameError = validateName(booking.name)
    if (nameError) newErrors.name = nameError

    const emailError = validateEmail(booking.email)
    if (emailError) newErrors.email = emailError

    const phoneError = validatePhone(booking.phone)
    if (phoneError) newErrors.phone = phoneError

    if (!booking.agreeToTerms) newErrors.agreeToTerms = 'Необходимо согласиться с условиями'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const inputClass = (fieldName: string) => {
    return `w-full border rounded-lg px-3 py-2 text-gray-900 ${
      errors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-600'
    } focus:outline-none focus:ring-2 focus:ring-primary-100`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-600">Загрузка информации о туре...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">{error || 'Тур не найден'}</h1>
            <Link to="/" className="text-primary-600 hover:underline">Вернуться на главную</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const typeLabels = { hiking: 'Пеший тур', horseback: 'Конный тур', combo: 'Комбо-тур' }
  const difficultyLabels = { easy: 'Лёгкий', medium: 'Средний', hard: 'Сложный' }

  const toggleContactMethod = (method: string) => {
    if (booking.contactMethod.includes(method)) {
      setBooking({...booking, contactMethod: booking.contactMethod.filter(m => m !== method)})
    } else {
      setBooking({...booking, contactMethod: [...booking.contactMethod, method]})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateBookingForm()) {
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    try {
      const bookingData = {
        tour_slug: tour.slug,
        date: booking.date,
        adults: booking.adults,
        children: booking.children,
        transfer: booking.transfer,
        transfer_details: booking.transferDetails,
        accommodation: booking.accommodation,
        meals: booking.meals,
        special_meals_details: booking.specialMealsDetails,
        guide: booking.guide,
        translator_language: booking.translatorLanguage,
        equipment_rental: booking.equipmentRental,
        insurance: booking.insurance,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        contact_method: booking.contactMethod,
        comment: booking.comment
      }

      const result = await createBooking(bookingData)
      
      if (result.success) {
        navigate('/booking-confirmation', { 
          state: { 
            booking: result.booking,
            tour: tour
          } 
        })
      }
    } catch (error) {
      alert('❌ Ошибка при создании бронирования. Попробуйте позже.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary-600">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/" className="hover:text-primary-600">Туры</Link>
          <span className="mx-2">/</span>
          <span>{tour.title}</span>
        </div>

        <div className="mb-8">
          <img src={tour.image} alt={tour.title} className="w-full h-96 object-cover rounded-xl" />
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
            
            <div className="flex gap-3 mb-4 flex-wrap">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">{typeLabels[tour.type]}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{tour.duration}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{difficultyLabels[tour.difficulty]}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{tour.region}</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="ml-2 text-xl font-semibold">{tour.rating}</span>
              <span className="text-gray-600 ml-2">({tour.reviews_count} отзывов)</span>
            </div>

            <p className="text-gray-700 mb-8">{tour.full_description}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Программа по дням</h2>
              <div className="space-y-4">
                {tour.program.map((day) => (
                  <div key={day.day} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">День {day.day}. {day.title}</h3>
                    <p className="text-gray-700 mb-3">{day.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {day.activities.map((activity, idx) => (
                        <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{activity}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Что включено в стоимость</h2>
              <ul className="space-y-2">
                {tour.included.map((item, idx) => (
                  <li key={idx} className="flex items-start"><span className="text-green-500 mr-2">✓</span><span>{item}</span></li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Что не включено</h2>
              <ul className="space-y-2">
                {tour.not_included.map((item, idx) => (
                  <li key={idx} className="flex items-start"><span className="text-red-500 mr-2">✗</span><span>{item}</span></li>
                ))}
              </ul>
            </section>

            <section id="booking" className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{t.bookingForm}</h2>
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Дата тура <span className="text-red-500">*</span></label>
                    <input 
                      type="date"
                      className={inputClass('date')}
                      value={booking.date}
                      onChange={(e) => {
                        setBooking({...booking, date: e.target.value})
                        if (errors.date) setErrors({...errors, date: ''})
                      }}
                      required
                    />
                    {errors.date && <p className="error-message text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Взрослые</label>
                    <input type="number" min="1" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.adults} onChange={(e) => setBooking({...booking, adults: Number(e.target.value)})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Дети</label>
                    <input type="number" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.children} onChange={(e) => setBooking({...booking, children: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Трансфер</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.transfer} onChange={(e) => setBooking({...booking, transfer: e.target.value as any})}>
                      <option value="bishkek">Из Бишкека</option>
                      <option value="airport">Из аэропорта Манас</option>
                      <option value="none">Без трансфера</option>
                    </select>
                  </div>
                </div>

                {booking.transfer !== 'none' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Детали трансфера</label>
                    <input type="text" placeholder="Адрес отеля / номер рейса" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.transferDetails} onChange={(e) => setBooking({...booking, transferDetails: e.target.value})} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Тип размещения</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.accommodation} onChange={(e) => setBooking({...booking, accommodation: e.target.value as any})}>
                      <option value="standard">Стандарт</option>
                      <option value="comfort">Комфорт</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Питание</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.meals} onChange={(e) => setBooking({...booking, meals: e.target.value as any})}>
                      <option value="standard">Стандартное</option>
                      <option value="special">Спецпитание</option>
                    </select>
                  </div>
                </div>

                {booking.meals === 'special' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Опишите требования к питанию</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} value={booking.specialMealsDetails} onChange={(e) => setBooking({...booking, specialMealsDetails: e.target.value})} placeholder="Вегетарианское, аллергии, халяль и т.д." />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Гид</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="guide" value="russian" checked={booking.guide === 'russian'} onChange={() => setBooking({...booking, guide: 'russian'})} className="mr-2" />
                      <span>Русскоязычный гид (включено)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="guide" value="translator" checked={booking.guide === 'translator'} onChange={() => setBooking({...booking, guide: 'translator'})} className="mr-2" />
                      <span>Нужен гид-переводчик</span>
                    </label>
                  </div>
                </div>

                {booking.guide === 'translator' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Язык перевода</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={booking.translatorLanguage} onChange={(e) => setBooking({...booking, translatorLanguage: e.target.value})}>
                      <option value="">Выберите язык</option>
                      <option value="english">Английский</option>
                      <option value="other">Другой</option>
                    </select>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Дополнительные опции</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" checked={booking.equipmentRental} onChange={(e) => setBooking({...booking, equipmentRental: e.target.checked})} className="mr-2" />
                      <span>Аренда снаряжения</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={booking.insurance} onChange={(e) => setBooking({...booking, insurance: e.target.checked})} className="mr-2" />
                      <span>Туристическая страховка</span>
                    </label>
                  </div>
                </div>

                {/* Контактные данные с валидацией */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Контактные данные</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя <span className="text-red-500">*</span></label>
                      <input 
                        type="text"
                        placeholder="Иван Иванов"
                        className={inputClass('name')}
                        value={booking.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        onBlur={handleNameBlur}
                        maxLength={50}
                      />
                      {errors.name && <p className="error-message text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email"
                        placeholder="name@example.com"
                        className={inputClass('email')}
                        value={booking.email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={handleEmailBlur}
                        maxLength={100}
                        autoComplete="email"
                      />
                      {errors.email && <p className="error-message text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">
                          +996
                        </span>
                        <input 
                          type="tel"
                          placeholder="555 123 456"
                          className={`${inputClass('phone')} pl-14`}
                          value={booking.phone.startsWith(PHONE_PREFIX) ? booking.phone.slice(PHONE_PREFIX.length) : booking.phone}
                          onChange={(e) => handlePhoneChange(PHONE_PREFIX + e.target.value)}
                          onFocus={handlePhoneFocus}
                          onBlur={() => {
                            handlePhoneBlur()
                            handlePhoneBlurValidation()
                          }}
                          maxLength={12}
                        />
                      </div>
                      {errors.phone && <p className="error-message text-red-500 text-xs mt-1">{errors.phone}</p>}
                      <p className="text-xs text-gray-500 mt-1">Формат: 555 123 456 (9 цифр)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Способ связи</label>
                      <div className="space-y-2">
                        {['Telegram', 'WhatsApp', 'Звонок', 'Email'].map(method => (
                          <label key={method} className="flex items-center">
                            <input type="checkbox" checked={booking.contactMethod.includes(method.toLowerCase())} onChange={() => toggleContactMethod(method.toLowerCase())} className="mr-2" />
                            <span className="text-sm">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Комментарий</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} value={booking.comment} onChange={(e) => setBooking({...booking, comment: e.target.value})} placeholder="Пожелания, ограничения по здоровью, опыт и т.д." />
                </div>

                <div className="mb-6">
                  <label className="flex items-start">
                    <input type="checkbox" checked={booking.agreeToTerms} onChange={(e) => {
                      setBooking({...booking, agreeToTerms: e.target.checked})
                      if (errors.agreeToTerms) setErrors({...errors, agreeToTerms: ''})
                    }} className="mr-2 mt-1" required />
                    <span className="text-sm">Я согласен(на) с условиями бронирования и политикой отмены <span className="text-red-500">*</span></span>
                  </label>
                  {errors.agreeToTerms && <p className="error-message text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400">
                  {isSubmitting ? 'Отправка...' : 'Оплатить и забронировать'}
                </button>
              </form>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-600">от {tour.price.toLocaleString()}</span>
                <span className="text-gray-600"> {tour.currency} / чел.</span>
              </div>
              <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition mb-4">
                Забронировать
              </button>
              <div className="text-center text-sm text-gray-600">Мгновенное подтверждение • Безопасная оплата</div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )
}