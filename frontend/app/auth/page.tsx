"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet, Mail, ArrowRight, Image as ImageIcon, X } from "lucide-react"
import Image from "next/image"

const MetaMaskIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <polygon fill="#E2761B" points="21.543 3.5 12.432 9.1 14.09 5.6" />
      <polygon fill="#E4761B" points="2.457 3.5 9.91 5.6 11.567 9.1" />
      <polygon fill="#E4761B" points="17.977 16.6 15.7 19.1 18.9 20.1 19.8 16.7" />
      <polygon fill="#E4761B" points="4.2 16.7 5.1 20.1 8.3 19.1 6.023 16.6" />
      <polygon fill="#D7C1B3" points="8.1 13.7 7.3 15.1 11.6 15.3 11.5 10.7" />
      <polygon fill="#D7C1B3" points="15.9 13.7 12.5 10.7 12.4 15.3 16.7 15.1" />
    </g>
  </svg>
)

const WalletConnectIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M7.473 11.273c5.13-4.86 13.924-4.86 19.054 0l.636.603a1.13 1.13 0 0 1 0 1.646l-2.17 2.06a.53.53 0 0 1-.72-.01l-.9-.857c-3.53-3.34-9.26-3.34-12.79 0l-.93.89a.53.53 0 0 1-.72.01l-2.17-2.06a1.13 1.13 0 0 1 0-1.646l.61-.636zm15.13 5.14c2.13 2.02 2.13 5.3 0 7.32-2.7 2.56-7.1 2.56-9.8 0a.53.53 0 0 1 0-.77l.92-.88a.53.53 0 0 1 .73-.01c1.8 1.7 4.7 1.7 6.5 0a.53.53 0 0 1 .73.01l.92.88a.53.53 0 0 1 0 .77z" fill="#3B99FC" />
    </g>
  </svg>
)

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
    // Aquí iría la lógica de conexión de wallet, pero ahora solo navegamos
    router.push("/setup")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-cream/80 p-8 rounded-2xl shadow-sm">
        <div className="flex justify-center items-center mt-4 mb-6">
          {/* Logo o placeholder */}
          <div className="w-20 h-20 rounded-full bg-[#F8F4ED] border-2 border-[#EADBC8] flex items-center justify-center">
            <ImageIcon size={40} className="text-[#BFAE99]" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-serif font-bold text-[clamp(2rem,5vw,2.5rem)] text-[#5F4B32] text-center mb-2">
            Bienvenida a PlannH3R
          </h1>
          <p className="font-sans text-[clamp(1rem,2.5vw,1.2rem)] text-[#7A6F61] text-center max-w-xl mx-auto leading-snug mb-2" style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
            Tu vida organizada, a tu ritmo natural
          </p>
        </div>

        {!showEmailForm ? (
          <div className="space-y-6 mt-8">
            <button
              onClick={handleConnectWallet}
              className="w-full flex items-center justify-center gap-3 bg-[#F4C89A] text-[#6B5743] rounded-[100px] py-4 px-8 font-medium text-lg shadow-sm hover:bg-[#F2B871] hover:shadow-md transition-all"
            >
              <Wallet size={22} className="opacity-80" />
              <span>Comenzar</span>
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
      <p className="text-center text-sm mt-8" style={{ color: '#A5978A' }}>
        Cambia la forma en que te organizas. Con propósito.
      </p>
    </main>
  )
}
