"use client"

import { useState } from "react"
import { Plus, Bot, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { CalendarView } from "@/components/calendar-view"
import { CyclePhaseIndicator } from "@/components/cycle-phase-indicator"
import { AddActivityModal } from "@/components/add-activity-modal"
import { Chatbot } from "@/components/chatbot"

// Mock data for demonstration
const mockEvents = [
  {
    id: "1",
    title: "Yoga",
    date: new Date(),
    startTime: "08:00",
    endTime: "09:00",
    category: "personal",
    completed: false,
  },
  {
    id: "2",
    title: "Reunión de trabajo",
    date: new Date(),
    startTime: "10:30",
    endTime: "11:30",
    category: "trabajo",
    completed: true,
  },
  {
    id: "3",
    title: "Médico",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    startTime: "15:00",
    endTime: "16:00",
    category: "salud",
    completed: false,
  },
  {
    id: "4",
    title: "Compras",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "17:00",
    endTime: "18:30",
    category: "personal",
    completed: false,
  },
]

export default function HomePage() {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [events, setEvents] = useState(mockEvents)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const router = useRouter()

  // Mock data for demonstration
  const currentPhase = {
    name: "Menstrual",
    description: "Hoy es ideal para introspección y descanso",
    color: "bg-coral",
    currentDay: 3,
    totalDays: 28,
  }

  const handleEventClick = (event: any) => {
    // Handle event click - could open edit modal
    console.log("Event clicked:", event)
  }

  const toggleEventComplete = (eventId: string, completed: boolean) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, completed } : event)))
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className={`p-4 ${currentPhase.color} text-white`}>
        <CyclePhaseIndicator phase={currentPhase} />
      </header>

      <div className="flex-1 p-4">
        <CalendarView
          events={events}
          onEventClick={handleEventClick}
          onToggleComplete={toggleEventComplete}
          cycleStartDate={new Date(2023, 4, 1)} // Mock data - would come from user settings
          cycleDuration={28} // Mock data - would come from user settings
        />
      </div>

      {/* Floating action button with menu */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
        {showFloatingMenu && (
          <>
            <button
              onClick={() => {
                setIsChatbotOpen(true)
                setShowFloatingMenu(false)
              }}
              className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg"
              aria-label="Abrir chatbot"
            >
              <Bot size={22} />
            </button>
            <button
              onClick={() => {
                setIsActivityModalOpen(true)
                setShowFloatingMenu(false)
              }}
              className="w-12 h-12 rounded-full bg-mustard text-primary-foreground flex items-center justify-center shadow-lg"
              aria-label="Agregar actividad"
            >
              <Plus size={22} />
            </button>
          </>
        )}
        <button
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          className="w-14 h-14 rounded-full bg-mustard text-primary-foreground flex items-center justify-center shadow-lg z-10"
          aria-label={showFloatingMenu ? "Cerrar menú" : "Abrir menú"}
        >
          <Plus size={24} className={`transition-transform ${showFloatingMenu ? "rotate-45" : ""}`} />
        </button>
      </div>

      {/* Modals */}
      <AddActivityModal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} />

      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-cream rounded-2xl w-full max-w-md h-[600px] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-brown/20">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <h2 className="text-xl font-semibold text-brown">Asistente PlannH3R</h2>
              </div>
              <button onClick={() => setIsChatbotOpen(false)} className="p-1 rounded-full hover:bg-brown/10">
                <span className="sr-only">Cerrar</span>
                <X size={24} className="text-brown" />
              </button>
            </div>
            <div className="h-[calc(100%-64px)]">
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
