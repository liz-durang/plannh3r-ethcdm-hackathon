"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { Bell, CalendarDays } from "lucide-react"

export default function ProfilePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [notifications, setNotifications] = useState({
    daily: true,
    weekly: false,
    achievements: true,
  })
  const [calendarSync, setCalendarSync] = useState(false)
  const router = useRouter()

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to save the profile settings
    router.push("/home")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <div className="max-w-md w-full space-y-8 bg-cream/80 p-6 rounded-2xl shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown">Perfil y Configuración</h1>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-brown">Fecha de tu último periodo</label>
            <div className="bg-white rounded-lg p-3">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={es} className="rounded-md border-0" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-brown flex items-center gap-2">
              <Bell size={18} />
              Preferencias de notificación
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="daily" className="text-brown">
                  Recordatorios diarios
                </label>
                <input
                  id="daily"
                  type="checkbox"
                  checked={notifications.daily}
                  onChange={() => handleNotificationChange("daily")}
                  className="h-4 w-4 text-accent focus:ring-accent border-brown/30 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="weekly" className="text-brown">
                  Resumen semanal
                </label>
                <input
                  id="weekly"
                  type="checkbox"
                  checked={notifications.weekly}
                  onChange={() => handleNotificationChange("weekly")}
                  className="h-4 w-4 text-accent focus:ring-accent border-brown/30 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="achievements" className="text-brown">
                  Logros y celebraciones
                </label>
                <input
                  id="achievements"
                  type="checkbox"
                  checked={notifications.achievements}
                  onChange={() => handleNotificationChange("achievements")}
                  className="h-4 w-4 text-accent focus:ring-accent border-brown/30 rounded"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-brown flex items-center gap-2">
              <CalendarDays size={18} />
              Integración con calendario externo
            </h3>

            <div className="flex items-center justify-between">
              <label htmlFor="calendarSync" className="text-brown">
                Sincronizar con Google Calendar
              </label>
              <input
                id="calendarSync"
                type="checkbox"
                checked={calendarSync}
                onChange={() => setCalendarSync(!calendarSync)}
                className="h-4 w-4 text-accent focus:ring-accent border-brown/30 rounded"
              />
            </div>

            {calendarSync && (
              <p className="text-sm text-brown/70 italic">
                Próximamente: Esta función estará disponible en futuras actualizaciones.
              </p>
            )}
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary w-full">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
