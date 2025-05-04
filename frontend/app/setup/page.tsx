"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScheduleEvent {
  id: string
  title: string
  day: string
  time: string
}

export default function SetupPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()])
  const [cycleDuration, setCycleDuration] = useState(28)
  const [hasFlexibleSchedule, setHasFlexibleSchedule] = useState<boolean | null>(null)
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "",
    time: "",
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to save the configuration
    router.push("/home")
  }

  const addScheduleEvent = () => {
    if (newEvent.title && newEvent.day && newEvent.time) {
      const event: ScheduleEvent = {
        id: Date.now().toString(),
        ...newEvent,
      }
      setScheduleEvents([...scheduleEvents, event])
      // No resetear el formulario completamente, solo limpiar los campos
      setNewEvent({ title: "", day: newEvent.day, time: "" })
    }
  }

  const removeScheduleEvent = (id: string) => {
    setScheduleEvents(scheduleEvents.filter((event) => event.id !== id))
  }

  const weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Todos los días"]

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <div className="max-w-md w-full space-y-8 bg-cream/80 p-6 rounded-2xl shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown">Configuración Personal</h1>
          <p className="mt-2 text-brown/70">Cuéntanos sobre tu ciclo y rutina para personalizar tu experiencia</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-brown">Selecciona los días de tu último periodo</label>
            <div className="bg-white rounded-lg p-3 mx-auto flex justify-center">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates as any}
                locale={es}
                className="rounded-md border-0"
              />
            </div>
            <p className="text-xs text-brown/70 text-center">Has seleccionado {selectedDates.length} día(s)</p>
          </div>

          <div>
            <label htmlFor="cycleDuration" className="block text-sm font-medium text-brown mb-1">
              Duración promedio de tu ciclo (días)
            </label>
            <input
              id="cycleDuration"
              type="number"
              min={21}
              max={35}
              value={cycleDuration}
              onChange={(e) => setCycleDuration(Number.parseInt(e.target.value))}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown mb-3">¿Tienes libertad de horarios?</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full border ${
                  hasFlexibleSchedule === true
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-brown/30 text-brown"
                }`}
                onClick={() => setHasFlexibleSchedule(true)}
              >
                Sí
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full border ${
                  hasFlexibleSchedule === false
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-brown/30 text-brown"
                }`}
                onClick={() => setHasFlexibleSchedule(false)}
              >
                No
              </button>
            </div>
          </div>

          {hasFlexibleSchedule === false && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-brown mb-1">Agrega tus actividades recurrentes</label>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="eventTitle" className="block text-xs text-brown/70 mb-1">
                      Actividad
                    </label>
                    <input
                      id="eventTitle"
                      type="text"
                      placeholder="Ej: Yoga, Trabajo..."
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDay" className="block text-xs text-brown/70 mb-1">
                      Día
                    </label>
                    <select
                      id="eventDay"
                      value={newEvent.day}
                      onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                      className="input-field text-sm"
                    >
                      <option value="">Seleccionar</option>
                      {weekdays.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label htmlFor="eventTime" className="block text-xs text-brown/70 mb-1">
                      Horario
                    </label>
                    <input
                      id="eventTime"
                      type="text"
                      placeholder="Ej: 6:00 - 7:30 PM"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="input-field text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={addScheduleEvent}
                    disabled={!newEvent.title || !newEvent.day || !newEvent.time}
                    className="bg-secondary h-10 px-3"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>

              {scheduleEvents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-brown">Actividades agregadas:</h4>
                  <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                    <ul className="space-y-2">
                      {scheduleEvents.map((event) => (
                        <li key={event.id} className="flex items-center justify-between bg-cream/50 p-2 rounded-md">
                          <div>
                            <span className="text-sm font-medium">{event.title}</span>
                            <p className="text-xs text-brown/70">
                              {event.day}, {event.time}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeScheduleEvent(event.id)}
                            className="text-brown/50 hover:text-brown"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-4">
            <button type="submit" className="btn-primary w-full">
              Guardar y continuar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
