export function Footer() {
  return (
    <footer className="py-6 bg-blue-950 border-t border-blue-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-blue-300 text-sm">TechNova AI – Contrato v1.0</p>
        <p className="text-blue-400 mt-2 text-xs">
          © {new Date().getFullYear()} TechNova AI. Todos los derechos reservados.
        </p>
        <div className="mt-3 text-blue-400 text-xs">
          <a href="#" className="hover:text-gold-400 transition-colors duration-200 mx-2">
            Contacto
          </a>
          <a href="#" className="hover:text-gold-400 transition-colors duration-200 mx-2">
            Términos y Condiciones
          </a>
          <a href="#" className="hover:text-gold-400 transition-colors duration-200 mx-2">
            Política de Privacidad
          </a>
        </div>
      </div>
    </footer>
  )
}
