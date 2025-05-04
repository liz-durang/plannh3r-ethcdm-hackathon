import Link from "next/link"
import Image from "next/image"
import { Wallet } from "lucide-react"

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-4">
          <Image src="/logo.svg" alt="PlannH3R Logo" width={120} height={120} className="mx-auto" />
          <h1 className="text-3xl font-bold text-brown">Bienvenida a PlannH3R</h1>
          <p className="text-lg text-brown/80">Planifica tu vida alineada con tu ciclo y tu propósito</p>
        </div>

        <div className="pt-8">
          <Link href="/auth" className="btn-primary block w-full flex items-center justify-center gap-2">
            <Wallet size={20} />
            Comenzar
          </Link>
          <p className="mt-6 text-sm text-brown/70">Cambia la forma en que te organizas. Con propósito.</p>
        </div>
      </div>
    </main>
  )
}
