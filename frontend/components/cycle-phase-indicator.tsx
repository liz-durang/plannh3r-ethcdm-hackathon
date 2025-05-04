import { BatteryLow } from "lucide-react"

interface CyclePhase {
  name: string
  description: string
  color: string
  currentDay?: number
  totalDays?: number
}

export function CyclePhaseIndicator({ phase }: { phase: CyclePhase }) {
  return (
    <div className="sticky top-14 z-40 w-full flex justify-center">
      <div className="bg-[#F8E7E7] border border-[#F4C89A] rounded-2xl shadow-sm px-4 py-3 max-w-md mx-auto flex items-center gap-3">
        {/* Día del ciclo */}
        {phase.currentDay && (
          <div className="flex flex-col items-center justify-center w-14 h-14">
            <div className="w-14 h-14 rounded-full bg-[#FFF6E8] border border-[#F4C89A] flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#B35C5C] leading-none">{phase.currentDay}</span>
              <span className="text-[0.7rem] text-[#A5978A] leading-none mt-0.5">Día</span>
            </div>
          </div>
        )}
        {/* Contenido principal */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <span className="text-base font-semibold text-[#663E3E]">{phase.name}</span>
          <span className="text-xs text-[#7A6F61] mt-0.5 leading-tight">
            Hoy tu cuerpo necesita calma y tu mente reflexión.
          </span>
        </div>
        {/* Energía */}
        <div className="flex flex-col items-center justify-center">
          <BatteryLow className="text-[#B35C5C]" size={20} aria-label="Baja energía" />
          <span className="text-[0.7rem] bg-[#FCE9E5] text-[#B35C5C] rounded px-2 py-0.5 mt-1 leading-none text-center">
            Baja energía
          </span>
        </div>
      </div>
    </div>
  )
}
