"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns"
import { es } from "date-fns/locale"

export function MonthlyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Mock data for demonstration
  const events = [
    { date: new Date(2023, 4, 15), title: "Yoga", category: "personal" },
    { date: new Date(2023, 4, 18), title: "Reunión", category: "trabajo" },
    { date: new Date(2023, 4, 22), title: "Médico", category: "salud" },
  ]

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

  return (
    <div className="bg-cream rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brown">{format(currentMonth, "MMMM yyyy", { locale: es })}</h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-brown/10">
            <ChevronLeft size={20} className="text-brown" />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-brown/10">
            <ChevronRight size={20} className="text-brown" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-brown/70">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="h-12 rounded-lg"></div>
          ))}

        {days.map((day) => {
          const dayEvents = events.filter(
            (event) =>
              event.date.getDate() === day.getDate() &&
              event.date.getMonth() === day.getMonth() &&
              event.date.getFullYear() === day.getFullYear(),
          )

          return (
            <div
              key={day.toString()}
              className={`h-12 rounded-lg border p-1 ${
                isToday(day) ? "border-accent bg-accent/10" : "border-brown/20"
              }`}
            >
              <div className="text-right text-sm mb-1">{format(day, "d")}</div>
              <div className="flex flex-col gap-1">
                {dayEvents.slice(0, 2).map((event, index) => (
                  <div
                    key={index}
                    className={`${getCategoryColor(event.category)} h-1 rounded-full`}
                    title={event.title}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-center text-brown/70">+{dayEvents.length - 2}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
