export const OfflinePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Você está offline
        </h1>
        <p className="text-gray-600 mb-6">
          Parece que você perdeu a conexão com a internet. Algumas funcionalidades podem não estar disponíveis.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}
