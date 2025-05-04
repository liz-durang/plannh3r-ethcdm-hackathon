"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet, Mail, ArrowRight } from "lucide-react"

export default function AuthPage() {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be authentication logic
    router.push("/setup")
  }

  const handleConnectWallet = () => {
    // Here would be wallet connection logic
    router.push("/setup")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-cream/80 p-8 rounded-2xl shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown">Accede a PlannH3R</h1>
          <p className="mt-2 text-brown/70">Tu mundo planeado contigo en el centro</p>
        </div>

        {!showEmailForm ? (
          <div className="space-y-6 mt-8">
            <button
              onClick={handleConnectWallet}
              className="w-full flex items-center justify-center gap-3 bg-mustard text-primary-foreground rounded-full py-4 px-6 font-medium shadow-sm hover:opacity-90 transition-all text-lg"
            >
              <Wallet size={24} />
              <span>Conectar con Wallet</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-brown/20 w-full"></div>
              <span className="bg-cream px-4 text-sm text-brown/60 absolute">o</span>
            </div>

            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full flex items-center justify-center gap-3 border-2 border-brown/30 rounded-full py-3 px-6 text-brown hover:bg-brown/5 transition-all"
            >
              <Mail size={18} />
              <span>Continuar con correo</span>
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowEmailForm(false)}
              className="flex items-center text-accent hover:underline mb-4"
            >
              <ArrowRight size={16} className="rotate-180 mr-1" />
              <span>Volver</span>
            </button>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brown mb-1">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-brown mb-1">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button type="submit" className="btn-primary w-full">
                  {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-sm text-accent hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
