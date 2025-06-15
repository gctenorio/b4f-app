'use client'
import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

type Cliente = {
  id: string
  nome: string
  email: string
  user_id: string
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) console.error(error)
    else setClientes(data)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: userData, error: userError } = await supabase.auth.getUser()
    
    if (userError || !userData?.user) {
      alert('Erro ao obter o usuário autenticado')
      return
    }

    const userId = userData.user.id
    
    const { data, error } = await supabase
      .from('clientes')
      .insert({ nome, email, user_id: userId })
      .select()
    setLoading(false)

    if (error) {
      alert('Erro ao adicionar cliente: ' + error.message)
    } else if (data) {
      setClientes((prev) => [data[0], ...prev])
      setNome('')
      setEmail('')
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Clientes</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Lista de Clientes</h2>
      <ul className="space-y-2">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="bg-gray-100 p-2 rounded">
            <strong>{cliente.nome}</strong> — {cliente.email}
          </li>
        ))}
      </ul>
    </main>
  )
}
