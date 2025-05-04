"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Gift, ChevronLeft, ChevronRight, Wallet, Clock, Heart } from "lucide-react"

export default function StakingConfigPage() {
  const [amount, setAmount] = useState(100)
  const [lockPeriod, setLockPeriod] = useState(1)
  const [activeSection, setActiveSection] = useState(1)
  const [selectedToken, setSelectedToken] = useState("USDC")
  const router = useRouter()

  // Calculate potential earnings (mock calculation)
  const potentialEarnings = amount * 0.05 * lockPeriod

  // Mock data for staking history
  const stakingHistory = [
    {
      id: 1,
      amount: 50,
      token: "USDC",
      startDate: "01/05/2023",
      endDate: "01/06/2023",
      status: "Completado",
      reward: 2.5,
    },
    { id: 2, amount: 100, token: "USDC", startDate: "01/06/2023", endDate: "01/07/2023", status: "Activo", reward: 5 },
    {
      id: 3,
      amount: 75,
      token: "USDC",
      startDate: "01/07/2023",
      endDate: "01/08/2023",
      status: "Bloqueado",
      reward: 0,
    },
    {
      id: 4,
      amount: 0.01,
      token: "ETH",
      startDate: "15/07/2023",
      endDate: "15/08/2023",
      status: "Activo",
      reward: 0.0005,
    },
  ]

  // Mock data for tokens
  const tokens = [
    { name: "USDC", balance: 157.5, icon: "💲" },
    { name: "ETH", balance: 0.05, icon: "Ξ" },
    { name: "PlannH3R", balance: 250, icon: "🌸" },
  ]

  // Mock data for wallet balances
  const walletBalances = {
    total: 232.5,
    available: 157.5,
    locked: 75,
    pending: 15,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to handle staking
    alert("Staking configurado con éxito")
  }

  const renderSection = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brown flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-coral text-white flex items-center justify-center text-sm">
                1
              </span>
              Configurar cada ciclo
            </h2>

            <div className="bg-white/80 p-5 rounded-xl shadow-sm">
              <div className="space-y-5">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-brown mb-2">
                    Monto de staking
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="amount"
                      type="number"
                      min={10}
                      max={1000}
                      value={amount}
                      onChange={(e) => setAmount(Number.parseInt(e.target.value))}
                      className="input-field"
                    />
                    <span className="text-brown font-medium">{selectedToken}</span>
                  </div>
                  <Slider
                    defaultValue={[amount]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setAmount(value[0])}
                    className="mt-4"
                  />
                </div>

                <div>
                  <label htmlFor="lockPeriod" className="block text-sm font-medium text-brown mb-2">
                    Tiempo de bloqueo en caso de incumplimiento
                  </label>
                  <select
                    id="lockPeriod"
                    value={lockPeriod}
                    onChange={(e) => setLockPeriod(Number.parseInt(e.target.value))}
                    className="input-field"
                  >
                    <option value={1}>1 ciclo</option>
                    <option value={2}>2 ciclos</option>
                    <option value={3}>3 ciclos</option>
                    <option value={6}>6 ciclos</option>
                  </select>
                </div>

                <div className="bg-cream/50 p-4 rounded-lg border border-brown/10">
                  <h3 className="font-medium text-brown mb-3">¿Cómo funciona?</h3>
                  <ul className="space-y-2 text-sm text-brown/80">
                    <li className="flex items-start gap-2">
                      <span className="text-coral">•</span>
                      <span>Si no cumples tus objetivos, tu staking se bloquea un ciclo más.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-olive">•</span>
                      <span>
                        Si cumples, recibes rewards provenientes de los rendimientos que dejaron de ganar las que no
                        hicieron sus actividades.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-brown/10">
                  <h3 className="font-medium text-brown mb-2 flex items-center gap-2">
                    <Gift size={16} className="text-coral" />
                    Ganancias potenciales
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-brown/70">Si cumples tus objetivos:</span>
                    <span className="text-xl font-semibold text-brown">
                      {potentialEarnings.toFixed(2)} {selectedToken}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-mustard text-primary-foreground rounded-full py-3 px-6 font-medium shadow-sm hover:opacity-90 transition-all"
                >
                  Configurar staking
                </button>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brown flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-coral text-white flex items-center justify-center text-sm">
                2
              </span>
              Retirarlo
            </h2>

            <div className="bg-white/80 p-5 rounded-xl shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-cream/50 rounded-lg border border-brown/10">
                  <div className="flex items-center gap-3">
                    <Wallet size={24} className="text-coral" />
                    <div>
                      <h3 className="font-medium text-brown">Tu wallet</h3>
                      <p className="text-sm text-brown/70">Fondos disponibles para retirar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brown">{walletBalances.available} USDC</p>
                    <p className="text-xs text-brown/70">De un total de {walletBalances.total} USDC</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-brown/10">
                    <h4 className="text-sm font-medium text-brown/70 mb-1">Bloqueado</h4>
                    <p className="text-lg font-semibold text-brown">{walletBalances.locked} USDC</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-brown/10">
                    <h4 className="text-sm font-medium text-brown/70 mb-1">Pendiente</h4>
                    <p className="text-lg font-semibold text-brown">{walletBalances.pending} USDC</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-mustard text-primary-foreground rounded-full py-3 px-6 font-medium shadow-sm hover:opacity-90 transition-all">
                    Retirar fondos disponibles
                  </button>
                  <button className="w-full bg-transparent border border-brown/30 text-brown rounded-full py-3 px-6 font-medium hover:bg-brown/5 transition-all">
                    Ver historial de retiros
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brown flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-coral text-white flex items-center justify-center text-sm">
                3
              </span>
              Visual monto / tiempo (ciclos)
            </h2>

            <div className="bg-white/80 p-5 rounded-xl shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-brown flex items-center gap-2">
                    <Clock size={18} className="text-coral" />
                    Historial de staking
                  </h3>
                  <select className="text-sm p-1 rounded border border-brown/20">
                    <option>Todos los tokens</option>
                    <option>USDC</option>
                    <option>ETH</option>
                    <option>PlannH3R</option>
                  </select>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {stakingHistory.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded-lg border border-brown/10">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-brown">
                          {item.amount} {item.token}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "Completado"
                              ? "bg-olive/20 text-olive"
                              : item.status === "Activo"
                                ? "bg-mustard/20 text-mustard"
                                : "bg-coral/20 text-coral"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs text-brown/70 mt-2">
                        <div className="flex justify-between">
                          <span>Periodo:</span>
                          <span>
                            {item.startDate} - {item.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Recompensa:</span>
                          <span>
                            {item.reward} {item.token}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-cream/50 p-4 rounded-lg border border-brown/10">
                  <h3 className="font-medium text-brown mb-2">Resumen de ganancias</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-brown/70">Total ganado:</span>
                    <span className="text-xl font-semibold text-brown">7.50 USDC</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-brown/70">Rendimiento promedio:</span>
                    <span className="font-medium text-brown">5% por ciclo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-brown flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-coral text-white flex items-center justify-center text-sm">
                4
              </span>
              Donaciones
            </h2>

            <div className="bg-white/80 p-5 rounded-xl shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center gap-3 p-4 bg-cream/50 rounded-lg border border-brown/10">
                  <Heart size={24} className="text-coral" />
                  <div>
                    <h3 className="font-medium text-brown">Apoya a la comunidad</h3>
                    <p className="text-sm text-brown/70">Puedes donar fondos no reclamados o expirar stakes vencidos</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-brown/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-brown">Fondos disponibles para donar:</span>
                    <span className="text-lg font-semibold text-brown">25.00 USDC</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="donationAmount" className="block text-sm font-medium text-brown mb-2">
                    Monto a donar
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="donationAmount"
                      type="number"
                      min={1}
                      max={25}
                      defaultValue={10}
                      className="input-field"
                    />
                    <span className="text-brown font-medium">USDC</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="donationTarget" className="block text-sm font-medium text-brown mb-2">
                    Destino de la donación
                  </label>
                  <select id="donationTarget" className="input-field">
                    <option value="community">Fondo comunitario</option>
                    <option value="rewards">Pool de recompensas</option>
                    <option value="charity">Organización benéfica</option>
                  </select>
                </div>

                <button className="w-full bg-mustard text-primary-foreground rounded-full py-3 px-6 font-medium shadow-sm hover:opacity-90 transition-all">
                  Realizar donación
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6" style={{ backgroundColor: "#D18C85" }}>
      <div className="max-w-md w-full space-y-8 bg-cream/90 p-6 rounded-2xl shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown">Staking</h1>
          <p className="mt-2 text-brown/70">Recompénsate por mantener tu compromiso contigo misma</p>
        </div>

        {/* Token selector */}
        <div className="bg-white/70 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-brown mb-2">Staking con diferentes tokens</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tokens.map((token) => (
              <button
                key={token.name}
                onClick={() => setSelectedToken(token.name)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  token.name === selectedToken
                    ? "bg-mustard text-primary-foreground"
                    : "bg-brown/10 text-brown hover:bg-brown/20"
                }`}
              >
                <span>{token.icon}</span>
                <span>{token.name}</span>
                <span className="font-medium">({token.balance})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveSection(activeSection > 1 ? activeSection - 1 : 4)}
            className="p-2 rounded-full hover:bg-brown/10"
          >
            <ChevronLeft size={20} className="text-brown" />
          </button>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setActiveSection(num)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeSection === num
                    ? "bg-mustard text-primary-foreground"
                    : "bg-brown/10 text-brown hover:bg-brown/20"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveSection(activeSection < 4 ? activeSection + 1 : 1)}
            className="p-2 rounded-full hover:bg-brown/10"
          >
            <ChevronRight size={20} className="text-brown" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">{renderSection()}</div>

        <div className="flex justify-center pt-4">
          <button onClick={() => router.push("/home")} className="flex items-center text-brown hover:underline text-sm">
            <ArrowRight size={16} className="rotate-180 mr-1" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>
    </main>
  )
}
