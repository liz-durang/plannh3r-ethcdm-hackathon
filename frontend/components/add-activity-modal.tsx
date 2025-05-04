"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface AddActivityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddActivityModal({ isOpen, onClose }: AddActivityModalProps) {
  const [activity, setActivity] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    isFlexible: false,
    category: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement
      setActivity({ ...activity, [name]: checked })
    } else {
      setActivity({ ...activity, [name]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to save the activity
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFDF8] rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#EADBC8]/20">
        <div className="flex items-center justify-between p-6 border-b border-[#EADBC8]">
          <h2 className="text-2xl font-light font-serif text-[#7C5C3B] tracking-wide">Agregar Actividad</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F8F4ED] focus:outline-none focus:ring-2 focus:ring-[#F6B980]/40">
            <X size={22} className="text-[#BFAE99]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-light text-[#BFAE99] tracking-wide mb-1">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-[#F8F4ED] px-4 py-2.5 border-0 border-b border-[#EADBC8] rounded-none rounded-b-lg focus:outline-none focus:border-b-2 focus:border-[#F6B980] text-[#7C5C3B] placeholder-[#BFAE99] font-light"
              value={activity.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-light text-[#BFAE99] tracking-wide mb-1">
              Fecha
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="w-full bg-[#F4C89A] text-[#6B5743] px-4 py-2.5 border-0 border-b border-[#EADBC8] rounded-none rounded-b-lg focus:outline-none focus:border-b-2 focus:border-[#F6B980] font-light"
              value={activity.date}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-light text-[#BFAE99] tracking-wide mb-1">
                Hora inicio
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                required
                className="w-full bg-[#F8F4ED] px-4 py-2.5 border-0 border-b border-[#EADBC8] rounded-none rounded-b-lg focus:outline-none focus:border-b-2 focus:border-[#F6B980] text-[#7C5C3B] font-light"
                value={activity.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-light text-[#BFAE99] tracking-wide mb-1">
                Hora fin
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                required
                className="w-full bg-[#F8F4ED] px-4 py-2.5 border-0 border-b border-[#EADBC8] rounded-none rounded-b-lg focus:outline-none focus:border-b-2 focus:border-[#F6B980] text-[#7C5C3B] font-light"
                value={activity.endTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input
              id="isFlexible"
              name="isFlexible"
              type="checkbox"
              className="h-5 w-5 border-[#EADBC8] bg-[#FFFDF8] accent-[#F6B980] focus:ring-2 focus:ring-[#F6B980]/40 rounded-md mr-2"
              checked={activity.isFlexible}
              onChange={handleChange}
            />
            <label htmlFor="isFlexible" className="block text-sm font-light text-[#BFAE99]">
              Esta actividad tiene un horario fijo y no debe reprogramarse
            </label>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-light text-[#BFAE99] tracking-wide mb-1">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full bg-[#F8F4ED] px-4 py-2.5 border-0 border-b border-[#EADBC8] rounded-none rounded-b-lg focus:outline-none focus:border-b-2 focus:border-[#F6B980] text-[#7C5C3B] font-light"
              value={activity.category}
              onChange={handleChange}
            >
              <option value="">Seleccionar categoría</option>
              <option value="personal">Personal</option>
              <option value="trabajo">Trabajo</option>
              <option value="salud">Salud</option>
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full py-2.5 px-6 bg-[#F6B980] text-[#7C5C3B] rounded-full font-light text-base shadow-sm hover:bg-[#F3A75B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6B980]/40 focus:ring-offset-2">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
