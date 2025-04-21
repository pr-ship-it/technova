"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <div className="relative h-12 w-48">
          <Image src="/images/tech-nova-logo.png" alt="Tech Nova AI Logo" fill className="object-contain" priority />
        </div>
      </div>
    </header>
  )
}
