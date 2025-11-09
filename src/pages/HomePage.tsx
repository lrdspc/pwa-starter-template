import { Link } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

export const HomePage = () => {
  const { user } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🚀 PWA Starter Template
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Template completo com Vite, React, TypeScript, Supabase e deploy Vercel
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Ir para Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Super Rápido</h3>
              <p className="text-gray-600 text-sm">
                Vite + React para desenvolvimento lightning-fast
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-lg mb-2">PWA Nativo</h3>
              <p className="text-gray-600 text-sm">
                Instalável e funciona offline
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-semibold text-lg mb-2">Auth Completo</h3>
              <p className="text-gray-600 text-sm">
                Supabase com rotas protegidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
