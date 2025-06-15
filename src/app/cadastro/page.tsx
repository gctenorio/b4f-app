'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CadastroPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/home')
    })
  }, [router])

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro('')

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    })

    setCarregando(false)

    if (error) {
      setErro(error.message)
    } else {
      router.push('/home')
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>

      <form onSubmit={handleCadastro} className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {erro && <p className="text-red-600">{erro}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={carregando}
        >
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Já tem conta?{' '}
        <a href="/" className="text-blue-600 hover:underline">
          Fazer login
        </a>
      </p>
    </main>
  )
}
