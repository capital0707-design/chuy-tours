import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <svg 
                className="w-8 h-8 text-primary-500" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z"/>
                <path d="M12 8l-4 8h8l-4-8z" opacity="0.6"/>
              </svg>
              <span className="text-xl font-bold text-white">Canyon</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footerAbout}
            </p>
          </div>

          {/* Разделы */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.sections}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link to="/#catalog" className="hover:text-white transition">
                  {t.tours}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-white transition">
                  {t.contacts}
                </Link>
              </li>
<li>
  <Link to="/partner-register" className="hover:text-white transition">
    Стать партнёром
  </Link>
</li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.support}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@canyontours.kg" className="hover:text-white transition">
                  info@canyontours.kg
                </a>
              </li>
              <li>
                <a href="tel:+996555123456" className="hover:text-white transition">
                  +996 555 123 456
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  @canyontours
                </a>
              </li>
            </ul>
          </div>

          {/* Документы */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.documents}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  {t.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  {t.termsOfUse}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          {t.copyright}
        </div>
      </div>
    </footer>
  )
}