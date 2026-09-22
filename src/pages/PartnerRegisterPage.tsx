import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

type PartnerType = 'guide' | 'driver' | 'horse-base' | 'guesthouse' | 'yurt-camp' | 'other'

interface FormData {
  name: string
  email: string
  phone: string
  experience: string
  languages: string[]
  certifications: string
  drivingExperience: string
  licenseCategories: string[]
  carBrand: string
  carModel: string
  carYear: string
  capacity: string
  hasAC: boolean
  neatness: boolean
  additionalLanguage: string
  description: string
  agreeToTerms: boolean
}

interface Errors {
  [key: string]: string
}

const PHONE_PREFIX = '+996 '

export default function PartnerRegisterPage() {
  const [partnerType, setPartnerType] = useState<PartnerType>('guide')
  const [errors, setErrors] = useState<Errors>({})
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    languages: [],
    certifications: '',
    drivingExperience: '',
    licenseCategories: [],
    carBrand: '',
    carModel: '',
    carYear: '',
    capacity: '',
    hasAC: false,
    neatness: false,
    additionalLanguage: '',
    description: '',
    agreeToTerms: false
  })

  const handleLanguageChange = (lang: string) => {
    if (formData.languages.includes(lang)) {
      setFormData({...formData, languages: formData.languages.filter(l => l !== lang)})
    } else {
      setFormData({...formData, languages: [...formData.languages, lang]})
    }
    if (errors.languages) setErrors({...errors, languages: ''})
  }

  const handleCategoryChange = (cat: string) => {
    if (formData.licenseCategories.includes(cat)) {
      setFormData({...formData, licenseCategories: formData.licenseCategories.filter(c => c !== cat)})
    } else {
      setFormData({...formData, licenseCategories: [...formData.licenseCategories, cat]})
    }
    if (errors.licenseCategories) setErrors({...errors, licenseCategories: ''})
  }

  const handleNameChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s'-]/g, '')
    setFormData({...formData, name: filtered})
    if (errors.name) setErrors({...errors, name: ''})
  }

  const handleEmailChange = (value: string) => {
    // Разрешаем только допустимые символы для email
    const filtered = value.replace(/[^a-zA-Z0-9._%+\-@]/g, '')
    setFormData({...formData, email: filtered})
    if (errors.email) setErrors({...errors, email: ''})
  }

// Валидация email при потере фокуса
const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'Введите email'
  }
  
  if (!email.includes('@')) {
    return 'Email должен содержать символ @'
  }
  
  const parts = email.split('@')
  if (parts.length !== 2) {
    return 'Email должен содержать один символ @'
  }
  
  const [localPart, domain] = parts
  
  if (localPart.length < 2) {
    return 'Имя пользователя должно содержать минимум 2 символа'
  }
  
  if (!domain || domain.length === 0) {
    return 'Введите домен после @'
  }
  
  if (!domain.includes('.')) {
    return 'Домен должен содержать точку (например: example.com)'
  }
  
  const domainParts = domain.split('.')
  const tld = domainParts[domainParts.length - 1]
  
  if (!tld || tld.length < 2) {
    return 'Доменная зона должна содержать минимум 2 символа'
  }
  
  return ''
}

const handleEmailBlur = () => {
  const error = validateEmail(formData.email)
  if (error) {
    setErrors({...errors, email: error})
  } else {
    if (errors.email) {
      setErrors({...errors, email: ''})
    }
  }
}


  const handlePhoneChange = (value: string) => {
    // Сначала удаляем все буквы и недопустимые символы
    let filtered = value.replace(/[^0-9+\s\-\(\)]/g, '')
    
    // Если нет префикса +996, добавляем его
    if (!filtered.trim().startsWith('+996')) {
      // Извлекаем только цифры
      const digits = filtered.replace(/\D/g, '')
      filtered = '+996 ' + digits
    }
    
    // Считаем количество цифр после префикса
    const digitsAfterPrefix = filtered.substring(5).replace(/\D/g, '')
    
    // Если цифр больше 9, обрезаем
    if (digitsAfterPrefix.length > 9) {
      const prefix = filtered.substring(0, 5) // +996 
      const limitedDigits = digitsAfterPrefix.substring(0, 9)
      filtered = prefix + limitedDigits
    }
    
    setFormData({...formData, phone: filtered})
    if (errors.phone) setErrors({...errors, phone: ''})
  }

  const handlePhoneFocus = () => {
    if (!formData.phone.trim()) {
      setFormData({...formData, phone: PHONE_PREFIX})
    }
  }

  const handlePhoneBlur = () => {
    if (!formData.phone.trim() || formData.phone === '+996' || formData.phone === '+996 ') {
      setFormData({...formData, phone: ''})
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Errors = {}

    // Имя
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(formData.name)) {
      newErrors.name = 'Имя должно содержать только буквы'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    // Email
    const email = formData.email.trim()
    if (!email) {
      newErrors.email = 'Введите email'
    } else {
      // Проверяем наличие @
      if (!email.includes('@')) {
        newErrors.email = 'Email должен содержать символ @'
      } else {
        const parts = email.split('@')
        if (parts.length !== 2) {
          newErrors.email = 'Email должен содержать один символ @'
        } else {
          const [localPart, domain] = parts
          
          // Проверяем имя пользователя
          if (localPart.length < 2) {
            newErrors.email = 'Имя пользователя должно содержать минимум 2 символа'
          } else if (!/^[a-zA-Z0-9._%+\-]+$/.test(localPart)) {
            newErrors.email = 'Имя пользователя содержит недопустимые символы'
          }
          
          // Проверяем домен
          if (!domain || domain.length === 0) {
            newErrors.email = 'Введите домен после @'
          } else if (!domain.includes('.')) {
            newErrors.email = 'Домен должен содержать точку (например: example.com)'
          } else {
            const domainParts = domain.split('.')
            const tld = domainParts[domainParts.length - 1]
            
            if (!tld || tld.length < 2) {
              newErrors.email = 'Доменная зона должна содержать минимум 2 символа'
            } else if (!/^[a-zA-Z]+$/.test(tld)) {
              newErrors.email = 'Доменная зона должна содержать только буквы'
            }
            
            // Проверяем весь домен
            if (!/^[a-zA-Z0-9][a-zA-Z0-9.\-]*\.[a-zA-Z]{2,}$/.test(domain)) {
              newErrors.email = 'Некорректный формат домена'
            }
          }
        }
      }
    }

    // Телефон
    const phone = formData.phone.trim()
    if (!phone || phone === PHONE_PREFIX.trim()) {
      newErrors.phone = 'Введите номер телефона'
    } else {
      const digits = phone.replace(/\D/g, '')
      const digitsAfterPrefix = digits.substring(3) // убираем 996
      
      if (digitsAfterPrefix.length < 9) {
        newErrors.phone = `Номер должен содержать 9 цифр после +996 (сейчас: ${digitsAfterPrefix.length})`
      } else if (digitsAfterPrefix.length > 9) {
        newErrors.phone = 'Номер должен содержать ровно 9 цифр после +996'
      }
    }

    // Гид
    if (partnerType === 'guide') {
      if (formData.languages.length === 0) {
        newErrors.languages = 'Выберите хотя бы один язык'
      }
    }

    // Водитель
    if (partnerType === 'driver') {
      if (!formData.drivingExperience.trim()) {
        newErrors.drivingExperience = 'Укажите водительский стаж'
      } else if (Number(formData.drivingExperience) < 1) {
        newErrors.drivingExperience = 'Минимальный стаж — 1 год'
      }

      if (formData.licenseCategories.length === 0) {
        newErrors.licenseCategories = 'Выберите хотя бы одну категорию'
      }

      if (!formData.carBrand.trim()) {
        newErrors.carBrand = 'Укажите марку автомобиля'
      }

      if (!formData.carModel.trim()) {
        newErrors.carModel = 'Укажите модель автомобиля'
      }

      if (!formData.capacity.trim()) {
        newErrors.capacity = 'Укажите вместимость'
      } else if (Number(formData.capacity) < 1) {
        newErrors.capacity = 'Вместимость должна быть не менее 1'
      }

      if (formData.carYear && (Number(formData.carYear) < 1990 || Number(formData.carYear) > 2026)) {
        newErrors.carYear = 'Укажите корректный год (1990-2026)'
      }
    }

    // Другие типы
    if (['horse-base', 'guesthouse', 'yurt-camp', 'other'].includes(partnerType)) {
      if (!formData.description.trim()) {
        newErrors.description = 'Расскажите о вашем бизнесе'
      }
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Расскажите о вашем опыте работы'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необходимо согласиться с условиями'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.\n\n(Демо: данные сохранены в консоли)')
      console.log('Form Data:', formData)
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        languages: [],
        certifications: '',
        drivingExperience: '',
        licenseCategories: [],
        carBrand: '',
        carModel: '',
        carYear: '',
        capacity: '',
        hasAC: false,
        neatness: false,
        additionalLanguage: '',
        description: '',
        agreeToTerms: false
      })
      setPartnerType('guide')
    } else {
      const firstError = document.querySelector('.error-message')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const inputClass = (fieldName: string) => {
    return `w-full border rounded-lg px-3 py-2 text-gray-900 ${
      errors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-600'
    } focus:outline-none focus:ring-2 focus:ring-primary-100`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <h1 className="text-3xl font-bold mb-4 text-center">Стать партнёром</h1>
        <p className="text-gray-600 mb-8 text-center">
          Заполните форму, и мы свяжемся с вами в ближайшее время
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Контактные данные</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  placeholder="Иван Иванов"
                  className={inputClass('name')}
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  maxLength={50}
                />
                {errors.name && <p className="error-message text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email <span className="text-red-500">*</span>
  </label>
  <input 
    type="email"
    placeholder="name@example.com"
    className={inputClass('email')}
    value={formData.email}
    onChange={(e) => handleEmailChange(e.target.value)}
    onBlur={handleEmailBlur}
    maxLength={100}
    autoComplete="email"
  />
  {errors.email && <p className="error-message text-red-500 text-xs mt-1">{errors.email}</p>}
</div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">
                    +996
                  </span>
                  <input 
                    type="tel"
                    placeholder="555 123 456"
                    className={`${inputClass('phone')} pl-14`}
                    value={formData.phone.startsWith(PHONE_PREFIX) ? formData.phone.slice(PHONE_PREFIX.length) : formData.phone}
                    onChange={(e) => handlePhoneChange(PHONE_PREFIX + e.target.value)}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    maxLength={12}
                  />
                </div>
                {errors.phone && <p className="error-message text-red-500 text-xs mt-1">{errors.phone}</p>}
                <p className="text-xs text-gray-500 mt-1">Формат: 555 123 456 (9 цифр)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип партнёрства <span className="text-red-500">*</span>
                </label>
                <select 
                  className={inputClass('partnerType')}
                  value={partnerType}
                  onChange={(e) => {
                    setPartnerType(e.target.value as PartnerType)
                    setErrors({})
                  }}
                >
                  <option value="guide">Гид-переводчик</option>
                  <option value="driver">Водитель (трансфер)</option>
                  <option value="horse-base">Конная база</option>
                  <option value="guesthouse">Гестхаус</option>
                  <option value="yurt-camp">Владелец юртового лагеря</option>
                  <option value="other">Другое</option>
                </select>
              </div>
            </div>
          </div>

          {partnerType === 'guide' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Информация о гиде</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Языки, которыми владеете <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Русский', 'Английский', 'Кыргызский', 'Китайский', 'Турецкий', 'Немецкий', 'Французский', 'Другой'].map(lang => (
                    <label key={lang} className="flex items-center">
                      <input 
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={() => handleLanguageChange(lang)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{lang}</span>
                    </label>
                  ))}
                </div>
                {errors.languages && <p className="error-message text-red-500 text-xs mt-2">{errors.languages}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Сертификаты и лицензии</label>
                <textarea 
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                  placeholder="Номера сертификатов, курсы, лицензии"
                  value={formData.certifications}
                  onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                />
              </div>
            </div>
          )}

          {partnerType === 'driver' && (
            <>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Информация о водителе</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Водительский стаж (лет) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number"
                      min="1"
                      className={inputClass('drivingExperience')}
                      value={formData.drivingExperience}
                      onChange={(e) => {
                        setFormData({...formData, drivingExperience: e.target.value})
                        if (errors.drivingExperience) setErrors({...errors, drivingExperience: ''})
                      }}
                    />
                    {errors.drivingExperience && <p className="error-message text-red-500 text-xs mt-1">{errors.drivingExperience}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Вместимость авто (пассажиров) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number"
                      min="1"
                      className={inputClass('capacity')}
                      value={formData.capacity}
                      onChange={(e) => {
                        setFormData({...formData, capacity: e.target.value})
                        if (errors.capacity) setErrors({...errors, capacity: ''})
                      }}
                    />
                    {errors.capacity && <p className="error-message text-red-500 text-xs mt-1">{errors.capacity}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категории водительского удостоверения <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['B', 'C', 'D'].map(cat => (
                      <label key={cat} className="flex items-center">
                        <input 
                          type="checkbox"
                          checked={formData.licenseCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Категория {cat}</span>
                      </label>
                    ))}
                  </div>
                  {errors.licenseCategories && <p className="error-message text-red-500 text-xs mt-2">{errors.licenseCategories}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Марка авто <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="Toyota, Mercedes, Hyundai..."
                      className={inputClass('carBrand')}
                      value={formData.carBrand}
                      onChange={(e) => {
                        setFormData({...formData, carBrand: e.target.value})
                        if (errors.carBrand) setErrors({...errors, carBrand: ''})
                      }}
                    />
                    {errors.carBrand && <p className="error-message text-red-500 text-xs mt-1">{errors.carBrand}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Модель авто <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="Hiace, Sprinter, H-1..."
                      className={inputClass('carModel')}
                      value={formData.carModel}
                      onChange={(e) => {
                        setFormData({...formData, carModel: e.target.value})
                        if (errors.carModel) setErrors({...errors, carModel: ''})
                      }}
                    />
                    {errors.carModel && <p className="error-message text-red-500 text-xs mt-1">{errors.carModel}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Год выпуска</label>
                    <input 
                      type="number"
                      min="1990"
                      max="2026"
                      placeholder="2020"
                      className={inputClass('carYear')}
                      value={formData.carYear}
                      onChange={(e) => {
                        setFormData({...formData, carYear: e.target.value})
                        if (errors.carYear) setErrors({...errors, carYear: ''})
                      }}
                    />
                    {errors.carYear && <p className="error-message text-red-500 text-xs mt-1">{errors.carYear}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Дополнительный язык (преимущество)</label>
                    <input 
                      type="text"
                      placeholder="Английский, турецкий..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-600"
                      value={formData.additionalLanguage}
                      onChange={(e) => setFormData({...formData, additionalLanguage: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={formData.hasAC}
                      onChange={(e) => setFormData({...formData, hasAC: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Кондиционер в автомобиле</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={formData.neatness}
                      onChange={(e) => setFormData({...formData, neatness: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Гарантирую опрятный внешний вид и чистый салон</span>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-primary-600 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary-700">📋 Требования к водителям</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Водительский стаж от 5 лет</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Исправный автомобиль не старше 10 лет</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Опрятный внешний вид и чистый салон</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Пунктуальность и вежливость</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Знание маршрутов Чуйской области</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Владение английским языком — преимущество</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>Наличие медицинской аптечки и огнетушителя</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {['horse-base', 'guesthouse', 'yurt-camp', 'other'].includes(partnerType) && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">О вашем бизнесе</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Расскажите о себе <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={4}
                  className={inputClass('description')}
                  placeholder="Описание услуг, опыт работы, количество мест, особенности..."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({...formData, description: e.target.value})
                    if (errors.description) setErrors({...errors, description: ''})
                  }}
                />
                {errors.description && <p className="error-message text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Опыт работы</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {partnerType === 'driver' ? 'Опыт работы водителем' : 'Опыт работы в туризме'} <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={3}
                className={inputClass('experience')}
                placeholder="Где работали, с какими группами, особенности..."
                value={formData.experience}
                onChange={(e) => {
                  setFormData({...formData, experience: e.target.value})
                  if (errors.experience) setErrors({...errors, experience: ''})
                }}
              />
              {errors.experience && <p className="error-message text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="flex items-start">
              <input 
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => {
                  setFormData({...formData, agreeToTerms: e.target.checked})
                  if (errors.agreeToTerms) setErrors({...errors, agreeToTerms: ''})
                }}
                className="mr-2 mt-1"
              />
              <span className="text-sm text-gray-700">
                Я согласен(на) с условиями сотрудничества и политикой обработки персональных данных <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.agreeToTerms && <p className="error-message text-red-500 text-xs mt-2">{errors.agreeToTerms}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Отправить заявку
          </button>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}