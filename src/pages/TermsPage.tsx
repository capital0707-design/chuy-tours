import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <h1 className="text-3xl font-bold mb-8">Условия использования</h1>
        
        <div className="prose prose-lg text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Принятие условий</h2>
            <p>Используя наш сайт, вы соглашаетесь с настоящими условиями использования.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Бронирование туров</h2>
            <p>Бронирование считается подтверждённым после получения вами подтверждения по email.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Отмена и изменение бронирования</h2>
            <p>Отмена возможна не позднее чем за 7 дней до начала тура с полным возвратом средств.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Ответственность</h2>
            <p>Мы несём ответственность за качество предоставляемых услуг в рамках действующего законодательства.</p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}