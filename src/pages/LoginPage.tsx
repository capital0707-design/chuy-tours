import Header from '../components/Header'
import Footer from '../components/Footer'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <h1 className="text-3xl font-bold mb-8 text-center">Вход в личный кабинет</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
            <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          
          <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700">
            Войти
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Нет аккаунта? <a href="/register" className="text-primary-600 hover:underline">Зарегистрироваться</a>
          </p>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}
