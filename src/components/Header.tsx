import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '../hooks/useTranslation'

export default function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <svg 
              className="w-8 h-8 text-primary-600" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z"/>
              <path d="M12 8l-4 8h8l-4-8z" opacity="0.6"/>
            </svg>
            <span className="text-xl font-bold text-primary-600">Canyon</span>
          </Link>
          
          {/* Меню */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600">{t.home}</Link>
            <Link to="/contacts" className="text-gray-700 hover:text-primary-600">{t.contacts}</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/login" className="text-sm text-gray-700 hover:text-primary-600 hidden sm:block">{t.login}</Link>
            {/* Кнопка всегда на русском */}
            <Link to="/partner-register" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 whitespace-nowrap">
              Стать партнёром
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}