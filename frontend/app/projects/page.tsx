"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function ProjectsPage() {
  const [projectName, setProjectName] = useState("")
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [stake, setStake] = useState<string[]>([])
  const [stakeAmount, setStakeAmount] = useState(0)
  const router = useRouter()

  const handleGenerateTasks = () => {
    if (!projectName) return

    setIsGenerating(true)

    // Mock AI generation - in a real app, this would call an AI endpoint
    setTimeout(() => {
      const mockTasks = [
        "Investigar opciones de dominio",
        "Crear wireframes básicos",
        "Definir paleta de colores",
        "Configurar repositorio Git",
        "Implementar estructura HTML básica",
      ]
      setGeneratedTasks(mockTasks)
      setIsGenerating(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the logic to save the project
    router.push("/home")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
      <div className="max-w-md w-full space-y-8 bg-cream/80 p-6 rounded-2xl shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown">Proyectos personalizados</h1>
          <p className="mt-2 text-brown/70">Un proyecto, muchos pasos pequeños que tu ciclo puede guiar</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-brown mb-1">
              Nombre del proyecto
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Ej: Lanzar mi tienda online"
              className="input-field"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleGenerateTasks}
              disabled={!projectName || isGenerating}
              className="flex items-center justify-center gap-2 btn-secondary w-full"
            >
              <Sparkles size={16} />
              <span>{isGenerating ? "Generando..." : "Generar tareas con IA"}</span>
            </button>
          </div>

          {generatedTasks.length > 0 && (
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-brown mb-2">Tareas sugeridas según tu ciclo</h3>
              <ul className="space-y-2">
                {generatedTasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`task-${index}`}
                      className="h-4 w-4 text-accent focus:ring-accent border-brown/30 rounded"
                    />
                    <label htmlFor={`task-${index}`} className="text-brown">
                      {task}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {generatedTasks.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-brown mb-1">¿Quieres stakear este proyecto?</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={0}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number.parseInt(e.target.value))}
                  placeholder="Monto"
                  className="input-field"
                />
                <span className="text-brown font-medium">USDC</span>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button type="submit" className="btn-primary w-full" disabled={generatedTasks.length === 0}>
              Guardar proyecto
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
