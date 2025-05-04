import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Coins, Folder, Image as ImageIcon, Menu, X, Wallet } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/staking", label: "Staking", icon: Coins },
  { href: "/projects", label: "Mis proyectos", icon: Folder },
]

export const TopNavBar = () => {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Cierra el drawer al hacer click fuera
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setDrawerOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-14 bg-[#FFFDF8] shadow-md shadow-[#EADBC8]/20 flex items-center justify-center z-50">
      <div className="absolute left-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-[#F8F4ED] border-2 border-[#EADBC8] flex items-center justify-center">
          <ImageIcon size={24} className="text-[#BFAE99]" />
        </div>
      </div>
      <ul className="flex gap-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                tabIndex={0}
                aria-label={label}
                className={`flex items-center gap-2 px-3 py-2 rounded-full font-light text-base transition-colors focus:outline-none focus:ring-2 focus:ring-[#F6B980]/40 focus:ring-offset-2
                  ${isActive ? "bg-[#F6B980] text-[#7C5C3B]" : "text-[#7C5C3B] hover:bg-[#F8F4ED]"}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      {/* Estado de wallet conectada */}
      <div className="absolute right-16 flex items-center">
        <div className="flex items-center gap-2 bg-[#F4C89A] text-[#6B5743] rounded-full px-3 py-1 shadow-sm font-medium text-sm">
          <Wallet size={18} className="text-[#BFAE99]" />
          <span>0.42 ETH</span>
          <span className="font-mono bg-[#FFF6E8] text-[#7C5C3B] rounded px-2 py-0.5 text-xs">0x23…9e</span>
        </div>
      </div>
      {/* Botón menú hamburguesa */}
      <button
        className="absolute right-4 p-2 rounded-full hover:bg-[#F8F4ED] focus:outline-none focus:ring-2 focus:ring-[#F6B980]/40"
        aria-label="Abrir menú"
        tabIndex={0}
        onClick={() => setDrawerOpen(true)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setDrawerOpen(true)}
      >
        <Menu size={28} className="text-[#BFAE99]" />
      </button>
      {/* Drawer lateral */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex justify-end"
          onClick={handleOverlayClick}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          <div className="w-64 h-full bg-[#FFFDF8] shadow-lg p-6 flex flex-col gap-6 relative animate-slide-in-right">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F8F4ED] focus:outline-none"
              aria-label="Cerrar menú"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={24} className="text-[#BFAE99]" />
            </button>
            <nav className="mt-8 flex flex-col gap-4">
              <button className="text-left px-4 py-2 rounded-lg text-[#7C5C3B] hover:bg-[#F4C89A]/40 font-medium transition-colors" onClick={() => setDrawerOpen(false)}>
                Configuración
              </button>
              <button className="text-left px-4 py-2 rounded-lg text-[#7C5C3B] hover:bg-[#F4C89A]/40 font-medium transition-colors" onClick={() => setDrawerOpen(false)}>
                Comunidad
              </button>
              <button className="text-left px-4 py-2 rounded-lg text-[#7C5C3B] hover:bg-[#F4C89A]/40 font-medium transition-colors" onClick={() => setDrawerOpen(false)}>
                Feedback
              </button>
              <button className="text-left px-4 py-2 rounded-lg text-[#B35C5C] hover:bg-[#F7C8C0]/60 font-medium transition-colors" onClick={() => setDrawerOpen(false)}>
                Cerrar sesión
              </button>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
} 