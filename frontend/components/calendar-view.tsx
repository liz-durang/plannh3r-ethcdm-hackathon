"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, List, CalendarIcon } from "lucide-react"
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from "date-fns"
import { es } from "date-fns/locale"

interface Event {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  category: string
  completed?: boolean
}

interface CalendarViewProps {
  events: Event[]
  onEventClick: (event: Event) => void
  onToggleComplete?: (eventId: string, completed: boolean) => void
  cycleStartDate?: Date
  cycleDuration?: number
}

export function CalendarView({
  events,
  onEventClick,
  onToggleComplete,
  cycleStartDate = new Date(2023, 4, 1), // Default for demo
  cycleDuration = 28, // Default cycle duration
}: CalendarViewProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [viewType, setViewType] = useState<"calendar" | "tasks">("calendar")

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

  // Get events for the current week
  const weekEvents = events.filter((event) => {
    const eventDate = event.date
    return eventDate >= weekStart && eventDate <= weekEnd
  })

  // Get events for today (for tasks view)
  const today = new Date()
  const todayEvents = events.filter((event) => isSameDay(event.date, today))

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "personal":
        return "bg-coral"
      case "trabajo":
        return "bg-olive"
      case "salud":
        return "bg-terracotta"
      default:
        return "bg-mustard"
    }
  }

  // Calendar view (week)
  const renderCalendarView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`text-center py-2 ${isToday(day) ? "bg-accent/10 rounded-lg font-bold" : ""}`}
          >
            <div className="text-sm font-medium text-brown/70">{format(day, "EEE", { locale: es })}</div>
            <div className="text-lg">{format(day, "d")}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dayEvents = weekEvents.filter((event) => isSameDay(event.date, day))

          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] rounded-lg border p-1 ${
                isToday(day) ? "border-accent bg-accent/10" : "border-brown/20"
              }`}
            >
              <div className="flex flex-col gap-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`${getCategoryColor(
                      event.category,
                    )} text-white text-xs p-1 rounded mb-1 cursor-pointer truncate`}
                  >
                    <div className="font-medium">{event.startTime}</div>
                    <div className="truncate">{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Tasks view (today's tasks as a to-do list)
  const renderTasksView = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brown">
        Tareas para hoy - {format(today, "d 'de' MMMM", { locale: es })}
      </h3>

      {todayEvents.length === 0 ? (
        <p className="text-center py-8 text-brown/60">No hay tareas programadas para hoy</p>
      ) : (
        <ul className="space-y-2">
          {todayEvents.map((event) => (
            <li
              key={event.id}
              className="flex items-center p-3 border border-brown/20 rounded-lg hover:bg-cream/80 transition-colors"
            >
              <input
                type="checkbox"
                checked={event.completed}
                onChange={(e) => onToggleComplete?.(event.id, e.target.checked)}
                className="h-5 w-5 rounded border-brown/30 text-accent mr-3"
              />
              <div className="flex-1" onClick={() => onEventClick(event)}>
                <div className="flex justify-between">
                  <span className={`font-medium ${event.completed ? "line-through text-brown/50" : ""}`}>
                    {event.title}
                  </span>
                  <span className="text-sm text-brown/70">
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                <div
                  className={`text-sm ${getCategoryColor(event.category)} text-white px-2 py-0.5 rounded-full mt-1 inline-block`}
                >
                  {event.category}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <div className="bg-cream rounded-lg shadow p-4">
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

      {viewType === "calendar" ? renderCalendarView() : renderTasksView()}
    </div>
  )
}
