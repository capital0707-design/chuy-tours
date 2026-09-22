import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchForm() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    type: '',
    startDate: '',
    duration: '',
    regions: [] as string[],
    difficulty: '',
    budgetMax: ''
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (filters.type) params.append('type', filters.type)
    if (filters.duration) params.append('duration', filters.duration)
    if (filters.difficulty) params.append('difficulty', filters.difficulty)
    if (filters.regions.length > 0) params.append('regions', filters.regions.join(','))
    
    navigate(`/tours?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Тип активности</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">Любой</option>
            <option value="hiking">Пеший тур</option>
            <option value="horseback">Конный тур</option>
            <option value="combo">Комбо</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Даты</label>
          <input 
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Длительность</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            value={filters.duration}
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
          >
            <option value="">Любая</option>
            <option value="1-2">1–2 дня</option>
            <option value="3-4">3–4 дня</option>
            <option value="5-7">5–7 дней</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Регион</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            value={filters.regions[0] || ''}
            onChange={(e) => setFilters({...filters, regions: e.target.value ? [e.target.value] : []})}
          >
            <option value="">Любой</option>
            <option value="Ала-Арча">Ала-Арча</option>
            <option value="Чон-Кемин">Чон-Кемин</option>
            <option value="Боом">Боом</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Сложность</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            value={filters.difficulty}
            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          >
            <option value="">Любая</option>
            <option value="easy">Лёгкий</option>
            <option value="medium">Средний</option>
            <option value="hard">Сложный</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Бюджет (сом)</label>
          <input 
            type="number"
            placeholder="до"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            value={filters.budgetMax}
            onChange={(e) => setFilters({...filters, budgetMax: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Язык гида</label>
          <div className="space-y-2">
            <label className="flex items-center text-gray-900">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Русский</span>
            </label>
            <label className="flex items-center text-gray-900">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Английский</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-4">
          <label className="flex items-center text-gray-900">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Трансфер</span>
          </label>
          <label className="flex items-center text-gray-900">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Проживание</span>
          </label>
          <label className="flex items-center text-gray-900">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Питание</span>
          </label>
        </div>

        <button 
          onClick={handleSearch}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Найти туры
        </button>
      </div>

      <div className="mt-4 text-center">
        <a href="#" className="text-primary-600 hover:underline text-sm">
          Не уверены, что выбрать? → Подберём тур
        </a>
      </div>
    </div>
  )
}