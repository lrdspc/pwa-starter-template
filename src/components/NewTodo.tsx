import { useState, FormEvent } from 'react'
import { supabase } from '../services/supabase'
import { useSession } from '../context/SessionContext'

interface NewTodoProps {
  onTodoAdded: () => void
}

export const NewTodo = ({ onTodoAdded }: NewTodoProps) => {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSession()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !user) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('todos')
        .insert({ title: title.trim(), user_id: user.id })

      if (error) throw error

      setTitle('')
      onTodoAdded()
    } catch (error) {
      console.error('Erro ao adicionar todo:', error)
      alert('Erro ao adicionar tarefa')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova tarefa..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Adicionando...' : 'Adicionar'}
      </button>
    </form>
  )
}
