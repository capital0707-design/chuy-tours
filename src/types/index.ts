export interface Tour {
  id: string
  slug: string
  title: string
  type: 'hiking' | 'horseback' | 'combo'
  duration: string
  difficulty: 'easy' | 'medium' | 'hard'
  price: number
  currency: 'KGS' | 'USD'
  rating: number
  reviewsCount: number
  region: string
  shortDescription: string
  fullDescription: string
  image: string
  included: string[]
  notIncluded: string[]
  availableDates: string[]
  program: DayProgram[]
}

export interface DayProgram {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface SearchFilters {
  type?: string
  dates?: {
    start?: string
    end?: string
  }
  duration?: string
  region?: string[]
  difficulty?: string
  budget?: {
    min?: number
    max?: number
  }
  language?: string[]
  included?: string[]
}

export interface BookingForm {
  tourId: string
  date: string
  adults: number
  children: number
  childrenAges?: number[]
  transfer: 'bishkek' | 'airport' | 'none'
  transferDetails?: string
  accommodation: 'standard' | 'comfort'
  meals: 'standard' | 'special'
  specialMealsDetails?: string
  guide: 'russian' | 'translator'
  translatorLanguage?: string
  equipmentRental: boolean
  insurance: boolean
  name: string
  email: string
  phone: string
  contactMethod: string[]
  comment?: string
  agreeToTerms: boolean
}