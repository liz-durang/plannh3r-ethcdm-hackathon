"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Gift, ChevronLeft, ChevronRight } from "lucide-react"

export default function StakingPage() {
  const [amount, setAmount] = useState(100)
  const [lockPeriod, setLockPeriod] = useState(1)
  const [activeTab, setActiveTab] = useState("configure")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to handle staking
    router.push("/home")
  }

  // Calculate potential earnings (mock calculation)
  const potentialEarnings = amount * 0.05 * lockPeriod

  // Mock data for staking history
  const stakingHistory = [
    { id: 1, amount: 50, startDate: "01/05/2023", endDate: "01/06/2023", status: "Completado", reward: 2.5 },
    { id: 2, amount: 100, startDate: "01/06/2023", endDate: "01/07/2023", status: "Activo", reward: 5 },
    { id: 3, amount: 75, startDate: "01/07/2023", endDate: "01/08/2023", status: "Bloqueado", reward: 0 },
  ]

  // Mock data for progress
  const progress = 65

  // Mock data for tokens
  const tokens = [
    { name: "USDC", balance: 157.5, icon: "💲" },
    { name: "ETH", balance: 0.05, icon: "Ξ" },
    { name: "PlannH3R", balance: 250, icon: "🌸" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "configure":
        return (
          <div className="space-y-6">
            <div className="bg-white/70 p-4 rounded-lg">
              <h2 className="font-semibold text-brown flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-mustard text-white flex items-center justify-center text-sm">
                  1
                </span>
                Configurar cada ciclo
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-brown mb-1">
                    Monto a stakear
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
                    <span className="text-brown font-medium">USDC</span>
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
                  <label htmlFor="lockPeriod" className="block text-sm font-medium text-brown mb-1">
                    Tiempo de bloqueo si no se cumple
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

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium text-brown mb-2 flex items-center gap-2">
                    <Gift size={16} className="text-coral" />
                    Ganancias potenciales
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-brown/70">Si cumples tus objetivos:</span>
                    <span className="text-xl font-semibold text-brown">{potentialEarnings.toFixed(2)} USDC</span>
                  </div>
                  <p className="text-xs text-brown/60 mt-2">
                    Recibes rewards provenientes de los rendimientos que dejaron de ganar las que no hicieron sus
                    actividades y se quedó bloqueado.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium text-brown mb-2">Progreso actual del ciclo</h3>
                  <Progress value={progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-brown/70">
                    <span>Actividades completadas: {progress}%</span>
                    <span>Meta: 100%</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full" style={{ backgroundColor: "#E7C97B" }}>
                    Stakear ahora
                  </button>
                  <p className="text-center text-xs text-brown/70 mt-2">Esto es un voto de confianza en ti</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "withdraw":
        return (
          <div className="space-y-6">
            <div className="bg-white/70 p-4 rounded-lg">
              <h2 className="font-semibold text-brown flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-mustard text-white flex items-center justify-center text-sm">
                  2
                </span>
                Retirarlo
              </h2>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-brown">Total disponible:</span>
                    <span className="text-xl font-semibold text-brown">157.50 USDC</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-brown/70">
                    <span>Bloqueado:</span>
                    <span>75.00 USDC</span>
                  </div>
                </div>

                <button className="btn-primary w-full" style={{ backgroundColor: "#E7C97B" }}>
                  Retirar fondos disponibles
                </button>
              </div>
            </div>
          </div>
        )
      case "history":
        return (
          <div className="space-y-6">
            <div className="bg-white/70 p-4 rounded-lg">
              <h2 className="font-semibold text-brown flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-mustard text-white flex items-center justify-center text-sm">
                  3
                </span>
                Visual monto / tiempo (ciclos)
              </h2>

              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {stakingHistory.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-brown">{item.amount} USDC</span>
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
                    <div className="text-xs text-brown/70 mt-1">
                      <div className="flex justify-between">
                        <span>Periodo:</span>
                        <span>
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Recompensa:</span>
                        <span>{item.reward} USDC</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "donate":
        return (
          <div className="space-y-6">
            <div className="bg-white/70 p-4 rounded-lg">
              <h2 className="font-semibold text-brown flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-mustard text-white flex items-center justify-center text-sm">
                  4
                </span>
                Donaciones
              </h2>

              <div className="space-y-4">
                <p className="text-sm text-brown/80">
                  Puedes donar fondos no reclamados o expirar stakes vencidos para apoyar a la comunidad.
                </p>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-brown">Fondos disponibles para donar:</span>
                    <span className="text-lg font-semibold text-brown">25.00 USDC</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="donationAmount" className="block text-sm font-medium text-brown mb-1">
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
                  <label htmlFor="donationTarget" className="block text-sm font-medium text-brown mb-1">
                    Destino de la donación
                  </label>
                  <select id="donationTarget" className="input-field">
                    <option value="community">Fondo comunitario</option>
                    <option value="rewards">Pool de recompensas</option>
                    <option value="charity">Organización benéfica</option>
                  </select>
                </div>

                <button className="btn-primary w-full" style={{ backgroundColor: "#E7C97B" }}>
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
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  token.name === "USDC"
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

        {/* Navigation tabs */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                const tabs = ["configure", "withdraw", "history", "donate"]
                const currentIndex = tabs.indexOf(activeTab)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
                setActiveTab(tabs[prevIndex])
              }}
              className="p-2 rounded-full hover:bg-brown/10"
            >
              <ChevronLeft size={20} className="text-brown" />
            </button>

            <div className="text-center">
              <button
                onClick={() => setActiveTab("configure")}
                className={`px-3 py-1 mx-1 rounded-full text-sm ${
                  activeTab === "configure" ? "bg-mustard text-primary-foreground" : "text-brown"
                }`}
              >
                1
              </button>
              <button
                onClick={() => setActiveTab("withdraw")}
                className={`px-3 py-1 mx-1 rounded-full text-sm ${
                  activeTab === "withdraw" ? "bg-mustard text-primary-foreground" : "text-brown"
                }`}
              >
                2
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-3 py-1 mx-1 rounded-full text-sm ${
                  activeTab === "history" ? "bg-mustard text-primary-foreground" : "text-brown"
                }`}
              >
                3
              </button>
              <button
                onClick={() => setActiveTab("donate")}
                className={`px-3 py-1 mx-1 rounded-full text-sm ${
                  activeTab === "donate" ? "bg-mustard text-primary-foreground" : "text-brown"
                }`}
              >
                4
              </button>
            </div>

            <button
              onClick={() => {
                const tabs = ["configure", "withdraw", "history", "donate"]
                const currentIndex = tabs.indexOf(activeTab)
                const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
                setActiveTab(tabs[nextIndex])
              }}
              className="p-2 rounded-full hover:bg-brown/10"
            >
              <ChevronRight size={20} className="text-brown" />
            </button>
          </div>

          {renderTabContent()}
        </div>

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
