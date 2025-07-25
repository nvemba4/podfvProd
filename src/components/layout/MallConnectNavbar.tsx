import * as React from "react"
import Image from "next/image"
import { ShoppingCart, User, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EpisodiosRecentes from "@/components/EpisodiosRecentes"
import Link from "next/link";


const NAV_ITEMS = [
  { label: "HOME", dropdown: null },
  { label: "SOBRE PODFÉ", dropdown: null },
  { label: "EVENTOS", dropdown: null },
  { label: "SERVIÇOS", dropdown: null },
  { label: "TESTEMUNHOS", dropdown: null },
  { label: "NOTÍCIAS", dropdown: null },
  { label: "CONTACTOS", dropdown: null },
  { label: "LOJA PODFÉ", dropdown: null },
]

const MallConnectNavbar = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [scrolled, setScrolled] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [scrollDirection, setScrollDirection] = React.useState<"up" | "down">("up");
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (searchOpen) {
      setShowModal(true)
    } else {
      const timeout = setTimeout(() => setShowModal(false), 250)
      return () => clearTimeout(timeout)
    }
  }, [searchOpen])

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fullscreen blur overlay when submenu is open */}
      {/* Removed expanded state and its related logic */}
      <header
          className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
            scrolled ? "bg-white" : "bg-white"
          }`}
          style={{
            height: 40,
            transform: scrollDirection === "down" ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 0.3s ease",
            boxShadow: scrolled ? "0 4px 32px 0 rgba(0,0,0,0.08)" : undefined,
          }}
          /* Removed onMouseEnter and onMouseLeave */
        >
        <nav className="relative flex flex-col h-full max-w-7xl mx-auto px-4 z-50">
          {/* Main menu row */}
          <div className="flex h-14 items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center min-w-[120px]">
              <Image src="/images/LogoPodFFE.png" alt="Logo" width={120} height={40} priority />
            </Link>
            {/* Podfé Nav Links - Right aligned */}
            <div className="hidden md:flex items-center gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={
                    item.label === "HOME" ? "/" :
                    item.label === "SOBRE PODFÉ" ? "/sobre" :
                    item.label === "EVENTOS" ? "/eventos" :
                    item.label === "SERVIÇOS" ? "/servicos" :
                    item.label === "TESTEMUNHOS" ? "/episodioRecentes" :
                    item.label === "NOTÍCIAS" ? "/noticias" :
                    item.label === "CONTACTOS" ? "/contactos" :
                    item.label === "LOJA PODFÉ" ? "/loja" : "#"
                  }
                  className="text-xs font-medium px-1 py-1 rounded transition-colors duration-200 text-gray-800 hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Right Side Icons */}
            <div className="flex items-center gap-4 min-w-[120px] justify-end">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal with animation */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-center transition-opacity duration-500 ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500" />
          <div
            className={`mt-24 w-full max-w-lg bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 relative transition-all duration-500 ${searchOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center gap-2">
              <Input
                autoFocus
                type="text"
                placeholder="Search for products, malls, brands..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 rounded-full bg-gray-50 border border-gray-200 px-4 py-2 text-base focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <span className="sr-only">Close</span>
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Apple dropdown animation keyframes */}
      <style jsx global>{`
        @keyframes appleDropdownIn {
          0% {
            opacity: 0;
            transform: translateY(-32px) scaleY(0.98);
          }
          100% {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) scaleY(1);
          }
        }
      `}</style>
    </>
  )
})

MallConnectNavbar.displayName = "MallConnectNavbar"

export { MallConnectNavbar }