import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { supabase } from '../services/supabase'
import { NewTodo } from '../components/NewTodo'
import { useNavigate } from 'react-router-dom'

interface Todo {
  id: number
  title: string
  is_complete: boolean
  created_at: string
}

export const DashboardPage = () => {
  const { user, signOut } = useSession()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      console.error('Erro ao buscar todos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const toggleTodo = async (id: number, is_complete: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ is_complete: !is_complete })
        .eq('id', id)

      if (error) throw error
      fetchTodos()
    } catch (error) {
      console.error('Erro ao atualizar todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const { error } = await supabase.from('todos').delete().eq('id', id)

      if (error) throw error
      fetchTodos()
    } catch (error) {
      console.error('Erro ao deletar todo:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">📋 Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Nova Tarefa</h2>
            <NewTodo onTodoAdded={fetchTodos} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Suas Tarefas ({todos.length})
            </h2>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma tarefa ainda. Adicione uma acima! 🚀
              </div>
            ) : (
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={todo.is_complete}
                      onChange={() => toggleTodo(todo.id, todo.is_complete)}
                      className="h-5 w-5 text-primary-600 rounded cursor-pointer"
                    />
                    <span
                      className={`flex-1 ${
                        todo.is_complete ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {todo.title}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Deletar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
