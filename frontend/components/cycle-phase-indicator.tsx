interface CyclePhase {
  name: string
  description: string
  color: string
  currentDay?: number
  totalDays?: number
}

export function CyclePhaseIndicator({ phase }: { phase: CyclePhase }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-left py-2">
        <h2 className="text-xl font-semibold">{phase.name}</h2>
        <p className="text-sm mt-1 opacity-90">{phase.description}</p>
      </div>

      {phase.currentDay && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xl">
            {phase.currentDay}
          </div>
          <span className="text-xs mt-1 opacity-80">
            Día {phase.currentDay}/{phase.totalDays || 28}
          </span>
        </div>
      )}
    </div>
  )
}
