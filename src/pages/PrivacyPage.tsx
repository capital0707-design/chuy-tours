import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-lg text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p>Мы уважаем вашу конфиденциальность и защищаем ваши персональные данные в соответствии с законодательством Кыргызской Республики.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Какие данные мы собираем</h2>
            <p>При бронировании туров мы собираем: имя, email, телефон, информацию о предпочтениях.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Как мы используем данные</h2>
            <p>Ваши данные используются для обработки бронирований, связи с вами и улучшения наших услуг.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Защита данных</h2>
            <p>Мы используем современные методы защиты данных и не передаём их третьим лицам без вашего согласия.</p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}