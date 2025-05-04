"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { Plus, X, Pencil, Calendar as CalendarIcon, Clock, ArrowLeft, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
  const [errors, setErrors] = useState<{date?: string; cycle?: string; flex?: string}>({})
  const [showExitModal, setShowExitModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let newErrors: typeof errors = {}
    if (!selectedDates || selectedDates.length === 0) newErrors.date = "Por favor, selecciona un día de inicio"
    if (!cycleDuration || cycleDuration < 21 || cycleDuration > 35) newErrors.cycle = "Ingresa una duración válida (21-35 días)"
    if (hasFlexibleSchedule === null) newErrors.flex = "Selecciona una opción"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
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
    <main className="flex min-h-screen flex-col items-center justify-start p-6 bg-[#FAF5F0] relative">
      {/* Botón Cerrar */}
      <div className="absolute right-4 top-4 group">
        <button
          type="button"
          onClick={() => setShowExitModal(true)}
          className="p-2 rounded-full bg-white shadow hover:bg-[#F4C89A]/60 transition-colors focus:outline-none"
          aria-label="Cerrar configuración"
        >
          <X size={22} className="text-[#A5978A]" />
        </button>
        <span className="absolute right-0 top-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F4C89A] text-[#6B5743] text-xs rounded px-3 py-1 shadow font-medium whitespace-nowrap pointer-events-none">
          Volver al inicio
        </span>
      </div>
      {/* Modal de confirmación de salida */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-xl text-center">
            <h2 className="text-lg font-semibold text-[#5A4A42] mb-2">¿Deseas salir sin terminar la configuración?</h2>
            <p className="text-[#A5978A] text-sm mb-6">Podrás completarla más tarde desde tu perfil.</p>
            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-[#F4CDA2] text-[#6C5F58] rounded-[100px] py-3 px-6 font-medium shadow-sm hover:bg-[#F2B871] transition-all"
                onClick={() => router.push("/auth")}
              >
                Sí, volver al inicio
              </button>
              <button
                className="w-full bg-transparent border border-[#E6DED6] text-[#6C5F58] rounded-[100px] py-3 px-6 font-medium hover:bg-[#F9F6F2] transition-all"
                onClick={() => setShowExitModal(false)}
              >
                No, continuar aquí
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-md w-full space-y-8 bg-[#FAF5F0] p-6 rounded-2xl shadow-sm">
        <div className="flex justify-center items-center mt-2 mb-4">
          <div className="w-20 h-20 rounded-full bg-[#F9F6F2] border border-[#E6DED6] flex items-center justify-center">
            <ImageIcon size={40} className="text-[#A5978A]" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-serif font-bold text-[clamp(2rem,5vw,2.5rem)] text-[#6B5743] text-center mb-2">
            Personaliza tu experiencia
          </h1>
          <p className="font-sans text-[clamp(1rem,2.5vw,1.2rem)] text-[#A5978A] text-center max-w-xl mx-auto leading-snug mb-2" style={{overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
            Solo unos pasos para conocerte mejor 💛
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-[1.1rem] font-semibold text-[#5A4A42] mb-1">¿Cuándo comenzó tu último periodo?</label>
            <div className="bg-white rounded-lg p-3 mx-auto flex justify-center">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates as any}
                locale={es}
                className="rounded-md border-0"
              />
            </div>
            <p className="text-xs text-[#A5978A] text-center">✨ Seleccionaste {selectedDates.length} días para tu ciclo menstrual</p>
            <p className="text-xs text-[#A5978A] text-center mt-2">🛈 Puedes estimar la fecha si no lo recuerdas exactamente.</p>
            {errors.date && <p className="text-xs text-[#F7C8C0] text-center mt-1">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="cycleDuration" className="block text-[1.1rem] font-semibold text-[#5A4A42] mb-1">
              Duración promedio de tu ciclo (días)
            </label>
            <input
              id="cycleDuration"
              type="number"
              min={21}
              max={35}
              value={cycleDuration}
              onChange={(e) => setCycleDuration(Number.parseInt(e.target.value))}
              className={`w-full bg-white text-[#6B5743] px-4 py-2.5 border rounded-lg focus:outline-none focus:border-2 font-light ${errors.cycle ? 'border-[#F7C8C0] focus:border-[#F7C8C0]' : 'border-[#E6DED6] focus:border-[#F4C89A]'}`}
            />
            {errors.cycle && <p className="text-xs text-[#F7C8C0] mt-1">{errors.cycle}</p>}
          </div>

          <div>
            <label className="block text-[1.1rem] font-semibold text-[#5A4A42] mb-3">¿Tienes flexibilidad para organizar tu día?</label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full border transition-colors font-medium text-base ${
                  hasFlexibleSchedule === true
                    ? "bg-[#F4C89A] border-[#F4C89A] text-[#6B5743] shadow-sm hover:bg-[#F2B871]"
                    : errors.flex ? "border-[#F7C8C0] text-[#6B5743] bg-white hover:bg-[#F4C89A]/30" : "border-[#E6DED6] text-[#6B5743] bg-white hover:bg-[#F4C89A]/30"
                }`}
                onClick={() => setHasFlexibleSchedule(true)}
              >
                Sí
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-full border transition-colors font-medium text-base ${
                  hasFlexibleSchedule === false
                    ? "bg-[#F4C89A] border-[#F4C89A] text-[#6B5743] shadow-sm hover:bg-[#F2B871]"
                    : errors.flex ? "border-[#F7C8C0] text-[#6B5743] bg-white hover:bg-[#F4C89A]/30" : "border-[#E6DED6] text-[#6B5743] bg-white hover:bg-[#F4C89A]/30"
                }`}
                onClick={() => setHasFlexibleSchedule(false)}
              >
                No
              </button>
            </div>
            {errors.flex && <p className="text-xs text-[#F7C8C0] mt-1 text-center">{errors.flex}</p>}
          </div>

          <p className="text-xs text-[#A5978A] text-center mt-2">Así podremos ayudarte a crear una agenda más realista y personalizada.</p>

          {hasFlexibleSchedule === false && (
            <div className="space-y-4">
              <label className="block text-[1.1rem] font-semibold text-[#5A4A42] mb-1">Agrega tus actividades con horario Fijo</label>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="flex items-center gap-1 mb-1">
                      <Pencil size={18} className="text-[#A5978A]" />
                      <label htmlFor="eventTitle" className="block text-xs text-[#A5978A]">
                        Actividad
                      </label>
                    </div>
                    <input
                      id="eventTitle"
                      type="text"
                      placeholder="Ej: Yoga, Trabajo..."
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full bg-[#F9F6F2] text-[#6B5743] placeholder-[#A5978A] px-4 py-3 border border-[#E6DED6] rounded-lg focus:outline-none focus:border-2 focus:border-[#F4C89A] font-light text-sm"
                    />
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-1 mb-1">
                      <CalendarIcon size={18} className="text-[#A5978A]" />
                      <label htmlFor="eventDay" className="block text-xs text-[#A5978A]">
                        Día
                      </label>
                    </div>
                    <select
                      id="eventDay"
                      value={newEvent.day}
                      onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                      className="w-full bg-[#F9F6F2] text-[#6C5F58] px-4 py-3 border border-[#E6DED6] rounded-lg focus:outline-none focus:border-2 focus:border-[#F4CDA2] font-light text-sm appearance-none"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                    >
                      <option value="">Seleccionar</option>
                      {weekdays.map((day) => (
                        <option
                          key={day}
                          value={day}
                          style={newEvent.day === day ? { background: '#F4CDA2', color: '#6C5F58' } : {}}
                        >
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock size={18} className="text-[#A5978A]" />
                      <label htmlFor="eventTime" className="block text-xs text-[#A5978A]">
                        Horario
                      </label>
                    </div>
                    <input
                      id="eventTime"
                      type="text"
                      placeholder="Ej: 6:00 - 7:30 PM"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full bg-[#F9F6F2] text-[#6B5743] placeholder-[#A5978A] px-4 py-3 border border-[#E6DED6] rounded-lg focus:outline-none focus:border-2 focus:border-[#F4C89A] font-light text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={addScheduleEvent}
                    disabled={!newEvent.title || !newEvent.day || !newEvent.time}
                    className="w-10 h-10 min-w-0 min-h-0 p-0 flex items-center justify-center rounded-full bg-[#F4C89A] shadow hover:bg-[#F2B871] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4C89A]/50 disabled:opacity-50"
                    aria-label="Agregar actividad"
                  >
                    <Plus size={22} className="text-[#6A4E42]" />
                  </Button>
                </div>
              </div>

              {scheduleEvents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-[#6B5743]">Actividades agregadas:</h4>
                  <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                    <ul className="space-y-2">
                      {scheduleEvents.map((event) => (
                        <li key={event.id} className="flex items-center justify-between bg-[#FAF5F0] p-2 rounded-md">
                          <div>
                            <span className="text-sm font-medium">{event.title}</span>
                            <p className="text-xs text-[#A5978A]">
                              {event.day}, {event.time}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeScheduleEvent(event.id)}
                            className="text-[#A5978A] hover:text-[#6B5743] transition-colors"
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
            <button type="submit" className="w-full bg-[#F4C89A] text-[#6B5743] rounded-[100px] py-4 px-8 font-medium text-base shadow-sm hover:bg-[#F2B871] transition-all">
              Seguir con mi planificación →
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
