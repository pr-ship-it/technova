"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/context/language-context"
import "./navigation.css"

export default function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu)
  }

  const navItems = [
    {
      name: t("nav.home"),
      href: "/",
    },
    {
      name: t("nav.services"),
      href: "#",
      submenu: [
        { name: t("nav.ai"), href: "/services/ai" },
        { name: t("nav.marketing"), href: "/services/marketing" },
        { name: t("nav.security"), href: "/services/security" },
      ],
    },
    {
      name: t("nav.about"),
      href: "/about",
    },
    {
      name: t("nav.contact"),
      href: "/contact",
    },
  ]

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-header">
          {/* Logo */}
          <Link href="/" className={`navigation-logo ${isMobile ? "navigation-logo-mobile" : ""}`} onClick={closeMenu}>
            <span className="navigation-logo-text">{isMobile ? "AI Smart Tech" : "TechNova AI"}</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="navigation-desktop">
              {navItems.map((item) => (
                <div key={item.name} className="navigation-item-wrapper">
                  {item.submenu ? (
                    <button
                      className="navigation-item navigation-submenu-button"
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="navigation-icon-small" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`navigation-item ${pathname === item.href ? "navigation-item-active" : ""}`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Submenu for desktop */}
                  {item.submenu && (
                    <div className="navigation-submenu">
                      <div className="navigation-submenu-content">
                        {item.submenu.map((subItem) => (
                          <Link key={subItem.name} href={subItem.href} className="navigation-submenu-item">
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button asChild variant="default" className="navigation-cta-button">
                <Link href="/demo">{t("nav.demo")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="navigation-mobile-button-container">
            <button
              onClick={toggleMenu}
              className="navigation-mobile-button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="navigation-icon" /> : <Menu className="navigation-icon" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="navigation-mobile-menu">
          <div className="navigation-mobile-menu-content">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      className="navigation-mobile-item navigation-mobile-submenu-button"
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`navigation-icon-small ${openSubmenu === item.name ? "navigation-icon-rotate" : ""}`}
                      />
                    </button>

                    {/* Submenu for mobile */}
                    {openSubmenu === item.name && (
                      <div className="navigation-mobile-submenu">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="navigation-mobile-submenu-item"
                            onClick={closeMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`navigation-mobile-item ${
                      pathname === item.href ? "navigation-mobile-item-active" : ""
                    }`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="navigation-mobile-cta-container">
              <Button asChild variant="default" className="navigation-mobile-cta-button">
                <Link href="/demo" onClick={closeMenu}>
                  {t("nav.demo")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
