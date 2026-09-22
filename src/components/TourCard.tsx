import { Link } from 'react-router-dom'

interface Tour {
  id: string
  slug: string
  title: string
  type: 'hiking' | 'horseback' | 'combo' | 'jeep' | 'lake_mountains'
  duration: string
  difficulty: 'easy' | 'medium' | 'hard'
  price: number
  currency: 'KGS' | 'USD'
  rating: number
  reviewsCount: number
  region: string
  region_name?: string
  shortDescription: string
  image: string
}

export default function TourCard({ tour }: { tour: Tour }) {
  const typeLabels = {
    hiking: 'Пеший',
    horseback: 'Конный',
    combo: 'Комбо',
    jeep: 'Авто-тур',
    lake_mountains: 'Озеро + горы'
  }

  const difficultyLabels = {
    easy: 'Лёгкий',
    medium: 'Средний',
    hard: 'Сложный'
  }

  const typeColors = {
    hiking: 'bg-blue-100 text-blue-700',
    horseback: 'bg-amber-100 text-amber-700',
    combo: 'bg-purple-100 text-purple-700',
    jeep: 'bg-red-100 text-red-700',
    lake_mountains: 'bg-cyan-100 text-cyan-700'
  }

  const regionColors = {
    'Чуйская область': 'bg-green-100 text-green-700',
    'Иссык-Кульская область': 'bg-blue-100 text-blue-700',
    'Иссык-Кульская область + Чуйская область': 'bg-indigo-100 text-indigo-700'
  }

  return (
    <Link to={`/tours/${tour.slug}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="relative">
          <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 left-2 flex gap-2">
            <span className={`${typeColors[tour.type]} px-2 py-1 rounded-full text-xs font-medium`}>
              {typeLabels[tour.type]}
            </span>
            {tour.region_name && (
              <span className={`${regionColors[tour.region_name] || 'bg-gray-100 text-gray-700'} px-2 py-1 rounded-full text-xs font-medium`}>
                {tour.region_name.includes('Иссык-Куль') ? 'Иссык-Куль' : 'Чуй'}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{tour.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.shortDescription}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 text-xs text-gray-600">
              <span>{tour.duration}</span>
              <span>•</span>
              <span>{difficultyLabels[tour.difficulty]}</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-sm font-medium ml-1">{tour.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({tour.reviewsCount})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-primary-600">{tour.price.toLocaleString()}</span>
              <span className="text-gray-600 text-sm"> {tour.currency}</span>
            </div>
            <span className="text-primary-600 text-sm font-medium hover:underline">Подробнее →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}