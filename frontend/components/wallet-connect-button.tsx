"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"

interface WalletConnectButtonProps {
  onConnect?: (address: string) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function WalletConnectButton({ onConnect, className = "", size = "md" }: WalletConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const handleConnect = async () => {
    setIsConnecting(true)

    // Simulación de conexión a wallet
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12) + "..."
      setAddress(mockAddress)
      setIsConnecting(false)

      if (onConnect) {
        onConnect(mockAddress)
      }
    }, 1500)
  }

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6",
    lg: "py-4 px-8 text-lg",
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting || !!address}
      className={`flex items-center justify-center gap-2 rounded-full font-medium transition-all ${
        address ? "bg-olive text-white" : "bg-mustard text-primary-foreground hover:opacity-90"
      } ${sizeClasses[size]} ${className}`}
    >
      <Wallet size={size === "lg" ? 24 : size === "md" ? 20 : 16} />
      <span>{isConnecting ? "Conectando..." : address ? `Conectado: ${address}` : "Conectar Wallet"}</span>
    </button>
  )
}
