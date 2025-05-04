"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, List, CalendarIcon, Plus, Clock, Coins, Lock, MoreVertical, Bot } from "lucide-react"
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Chatbot } from "@/components/chatbot"

interface Event {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  category: string
  completed?: boolean
  isStaking?: boolean
  isImportant?: boolean
}

interface CalendarViewProps {
  events: Event[]
  onEventClick: (event: Event) => void
  onToggleComplete?: (eventId: string, completed: boolean) => void
  cycleStartDate?: Date
  cycleDuration?: number
}

const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const hours = Array.from({ length: 15 }, (_, i) => `${6 + i}:00`)

// Mock events for demo
const mockEvents = [
  { id: 1, title: "Yoga", day: 0, hour: 8, category: "personal", startTime: "08:00", endTime: "09:00" },
  { id: 2, title: "Reunión", day: 1, hour: 10, category: "trabajo", startTime: "10:00", endTime: "11:00" },
  { id: 3, title: "Médico", day: 2, hour: 15, category: "salud", startTime: "15:00", endTime: "17:00" },
  { id: 4, title: "Compras", day: 4, hour: 17, category: "personal", startTime: "17:00", endTime: "18:00" },
]

export function CalendarView({
  events,
  onEventClick,
  onToggleComplete,
  cycleStartDate = new Date(2023, 4, 1), // Default for demo
  cycleDuration = 28, // Default cycle duration
}: CalendarViewProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [viewType, setViewType] = useState<"calendar" | "tasks">("calendar")
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showAddActivityModal, setShowAddActivityModal] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const prevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1))
  }

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1))
  }

  // Calculate current cycle day
  const calculateCycleDay = (date: Date) => {
    if (!cycleStartDate) return null

    const diffTime = date.getTime() - cycleStartDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    // Handle negative days (before cycle start)
    if (diffDays < 0) {
      const previousCycleDays = (Math.floor(diffDays / cycleDuration) - 1) * cycleDuration
      return cycleDuration + (diffDays - previousCycleDays)
    }

    // Calculate day within cycle (1 to cycleDuration)
    return (diffDays % cycleDuration) + 1
  }

  const currentCycleDay = calculateCycleDay(new Date())

  // Get days of current week
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Start on Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
  // Mostrar solo 2 días (hoy y mañana, o los dos primeros de la semana)
  const visibleDays = days.slice(0, 2)

  // Get events for the current week
  const weekEvents = events.filter((event) => {
    const eventDate = event.date
    return eventDate >= weekStart && eventDate <= weekEnd
  })

  // Get events for today (for tasks view)
  const today = new Date()
  const todayEvents = events.filter((event) => isSameDay(event.date, today))

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "personal":
        return "bg-[#F8B2A5]"
      case "trabajo":
        return "bg-[#BFD8B8]"
      case "familia":
        return "bg-[#F9F6F2]"
      case "salud":
        return "bg-[#F4C89A]"
      default:
        return "bg-[#FCE9E5]"
    }
  }

  const openEventModal = (event: any) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
  }

  // Calendar view (week)
  const renderCalendarView = () => (
    <div className="relative bg-white rounded-lg shadow p-2 px-4 max-w-md mx-auto">
      {/* Header días de la semana */}
      <div className="flex mb-2 px-1">
        <div className="w-12" /> {/* Columna vacía para las horas */}
        {visibleDays.map(day => (
          <div key={day.toString()} className="flex-1 text-xs font-medium text-brown/70 text-center">
            {daysOfWeek[day.getDay()]}
          </div>
        ))}
      </div>
      {/* Horas y eventos */}
      <div className="overflow-y-auto max-h-[70vh] pb-20">
        {hours.map((hour, hourIdx) => (
          <div key={hour} className="flex min-h-[44px]">
            <div className="w-12 text-xs text-brown/40 text-right pr-2 pt-2 flex-shrink-0">{hour}</div>
            {visibleDays.map((day, dayIdx) => (
              <div key={dayIdx} className="flex-1 relative min-h-[44px]">
                {weekEvents.filter(e => {
                  const eventHour = parseInt(e.startTime.split(":")[0], 10)
                  return isSameDay(e.date, day) && eventHour === 6 + hourIdx
                }).map(event => {
                  const start = parseInt(event.startTime.split(":")[0], 10)
                  const end = parseInt(event.endTime.split(":")[0], 10)
                  const duration = Math.max(1, end - start)
                  return (
                    <div
                      key={event.id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 shadow-sm mb-1 ${getCategoryBg(event.category)}`}
                      style={{ minHeight: `${44 * duration}px` }}
                    >
                      {/* Info principal */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-base font-semibold text-[#5A4A42] truncate">{event.title}</span>
                          {event.isStaking && <Coins size={14} className="text-[#B35C5C]" aria-label="Evento de staking" />}
                          {event.isImportant && <Lock size={14} className="text-[#B35C5C]" aria-label="Evento importante" />}
                        </div>
                        <span className="text-xs bg-white/60 text-[#A5978A] rounded-full px-2 py-0.5">{event.category}</span>
                      </div>
                      {/* Checkbox y menú */}
                      <input
                        type="checkbox"
                        checked={event.completed}
                        aria-label="Marcar como completado"
                        className="w-5 h-5 accent-[#F4C89A] rounded"
                        onChange={() => onToggleComplete?.(event.id, !event.completed)}
                      />
                      <button className="p-1 rounded-full hover:bg-[#F8F4ED]" aria-label="Más opciones">
                        <MoreVertical size={18} className="text-[#BFAE99]" />
                      </button>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* FAB expandible dentro del calendario */}
      <div className="flex justify-end py-4">
        {fabOpen ? (
          <div className="flex flex-row items-center">
            {/* Labels column (only visible when fabOpen) */}
            <div className="flex flex-col items-end justify-center gap-3 w-28 mr-2">
              <span className="text-xs text-[#7A6F61] bg-white/80 rounded px-2 py-0.5 shadow-sm">Nueva consulta</span>
              <span className="text-xs text-[#7A6F61] bg-white/80 rounded px-2 py-0.5 shadow-sm">Agregar actividad</span>
              <span className="text-xs text-[#7A6F61] bg-white/80 rounded px-2 py-0.5 shadow-sm">Cerrar menú</span>
            </div>
            {/* Buttons column */}
            <div className="flex flex-col items-center gap-3">
              <button
                className="w-14 h-14 rounded-full bg-[#F4C89A] flex items-center justify-center shadow-lg transition-all"
                aria-label="Nueva consulta"
                tabIndex={0}
                onClick={() => setShowChatbot(true)}
              >
                <Bot size={28} className="text-[#B35C5C]" />
              </button>
              <button
                className="w-14 h-14 rounded-full bg-[#F4C89A] flex items-center justify-center shadow-lg transition-all z-10"
                aria-label="Cerrar menú"
                tabIndex={0}
                onClick={() => setFabOpen(false)}
              >
                <span className="text-3xl text-[#5A4A42]">+</span>
              </button>
              <button
                className="w-14 h-14 rounded-full bg-[#F4C89A] flex items-center justify-center shadow-lg transition-all"
                aria-label="Cerrar menú"
                tabIndex={0}
                onClick={() => setFabOpen(false)}
              >
                <span className="text-2xl text-[#5A4A42]">×</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              className="w-14 h-14 rounded-full bg-[#F4C89A] flex items-center justify-center shadow-lg transition-all z-10"
              aria-label="Agregar nueva actividad"
              tabIndex={0}
              onClick={() => setFabOpen(true)}
            >
              <span className="text-3xl text-[#5A4A42]">+</span>
            </button>
          </div>
        )}
      </div>
      {/* Modal de evento (flujo visual) */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl p-6 max-w-xs w-full shadow-xl text-center relative">
            <button onClick={closeModal} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#F4CDA2]">
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2 text-[#6B5743]">{selectedEvent.title}</h2>
            <div className="text-xs text-[#A5978A] mb-4">{daysOfWeek[selectedEvent.date.getDay()]}, {selectedEvent.startTime} - {selectedEvent.endTime}</div>
            <div className="flex flex-col gap-2">
              <button className="w-full py-2 rounded bg-[#F4C89A] text-[#6B5743] font-medium">Marcar como realizada</button>
              <button className="w-full py-2 rounded bg-[#FCE9E5] text-[#B35C5C] font-medium">Reprogramar</button>
              <button className="w-full py-2 rounded bg-[#F9F6F2] text-[#7A6F61] font-medium">Editar</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de agregar actividad (flujo visual) */}
      {showAddActivityModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl p-6 max-w-xs w-full shadow-xl text-center relative">
            <button onClick={() => setShowAddActivityModal(false)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#F4CDA2]">
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2 text-[#6B5743]">Agregar nueva actividad</h2>
            {/* Aquí iría el formulario real */}
          </div>
        </div>
      )}
      {/* Modal de chatbot (flujo visual) */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
          <div className="bg-cream rounded-2xl w-full max-w-md mx-auto my-8 p-4 shadow-xl flex flex-col" style={{ minHeight: 400, maxHeight: 600 }}>
            <div className="flex items-center justify-between pb-4 border-b border-brown/20">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <h2 className="text-xl font-semibold text-brown">Asistente PlannH3R</h2>
              </div>
              <button onClick={() => setShowChatbot(false)} className="p-1 rounded-full hover:bg-brown/10">
                <span className="sr-only">Cerrar</span>
                <span className="text-2xl text-brown">×</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // To-do list view (today's tasks)
  const renderTasksView = () => (
    <div className="max-w-md mx-auto px-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-brown mb-2">
          Tareas para hoy - {format(today, "d 'de' MMMM", { locale: es })}
        </h3>
        {todayEvents.length === 0 ? (
          <p className="text-center py-8 text-brown/60">No hay tareas programadas para hoy</p>
        ) : (
          todayEvents.map(event => {
            const start = parseInt(event.startTime.split(":")[0], 10)
            const end = parseInt(event.endTime.split(":")[0], 10)
            const duration = Math.max(1, end - start)
            return (
              <div
                key={event.id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 shadow-sm ${getCategoryBg(event.category)}`}
                style={{ minHeight: `${44 * duration}px` }}
              >
                {/* Info principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-semibold text-[#5A4A42] truncate">{event.title}</span>
                    {event.isStaking && <Coins size={14} className="text-[#B35C5C]" aria-label="Evento de staking" />}
                    {event.isImportant && <Lock size={14} className="text-[#B35C5C]" aria-label="Evento importante" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs bg-white/60 text-[#A5978A] rounded-full px-2 py-0.5">{event.category}</span>
                    <span className="text-xs text-[#A5978A]">{event.startTime} - {event.endTime}</span>
                  </div>
                </div>
                {/* Checkbox y menú */}
                <input
                  type="checkbox"
                  checked={event.completed}
                  aria-label="Marcar como completado"
                  className="w-5 h-5 accent-[#F4C89A] rounded"
                  onChange={() => onToggleComplete?.(event.id, !event.completed)}
                />
                <button className="p-1 rounded-full hover:bg-[#F8F4ED]" aria-label="Más opciones">
                  <MoreVertical size={18} className="text-[#BFAE99]" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-cream rounded-lg shadow p-4">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-brown">
              {format(weekStart, "d MMM", { locale: es })} - {format(weekEnd, "d MMM yyyy", { locale: es })}
            </h2>
            <div className="flex space-x-2">
              <button onClick={prevWeek} className="p-2 rounded-full hover:bg-brown/10">
                <ChevronLeft size={20} className="text-brown" />
              </button>
              <button onClick={nextWeek} className="p-2 rounded-full hover:bg-brown/10">
                <ChevronRight size={20} className="text-brown" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewType("tasks")}
              className={`p-2 rounded-full ${viewType === "tasks" ? "bg-brown/10" : "hover:bg-brown/5"}`}
              aria-label="Vista de tareas"
            >
              <List size={20} className="text-brown" />
            </button>
            <button
              onClick={() => setViewType("calendar")}
              className={`p-2 rounded-full ${viewType === "calendar" ? "bg-brown/10" : "hover:bg-brown/5"}`}
              aria-label="Vista de calendario"
            >
              <CalendarIcon size={20} className="text-brown" />
            </button>
          </div>
        </div>
      </div>
      {viewType === "calendar" && renderCalendarView()}
      {viewType === "tasks" && renderTasksView()}
    </div>
  )
}

