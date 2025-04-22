"use client"
 
 import { useLanguage } from "@/context/language-context"
 import { Mail, Phone } from "lucide-react"
 import Link from "next/link"
 import { usePathname } from "next/navigation"
 // Importar el componente de botones sociales
 import { SocialButtonsRow } from "./social-buttons"
 
 export default function Footer() {
   const { t } = useLanguage()
   const currentYear = new Date().getFullYear()
   const pathname = usePathname()
   const isHomePage = pathname === "/"
 
   // Función para construir URLs correctamente
   const getUrl = (sectionId: string) => {
     return isHomePage ? `#${sectionId}` : `/#${sectionId}`
   }
 
   return (
     <footer className="bg-black border-t border-gray-800 py-12">
       <div className="container mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div>
             <Link href="/" className="flex items-center mb-4">
               <img src="https://i.ibb.co/DDG1m3mY/ai-smart-logo.jpg" alt="TechNova AI Logo" className="rounded-full h-10 w-10 mr-2" />
               <h3 className="text-xl font-exo2 font-bold gold-text">TechNova AI</h3>
             </Link>
             <p className="text-gray-400 mb-4">{t("about.description").substring(0, 120)}...</p>
           </div>
 
           <div>
             <h3 className="text-xl font-bold mb-4">{t("footer.contact")}</h3>
             <ul className="space-y-2 text-gray-400">
               <li className="flex items-center">
                 <Mail size={16} className="mr-2 text-blue-500" />
                 <span>info@aismarttech.com</span>
               </li>
               <li className="flex items-center">
                 <Phone size={16} className="mr-2 text-blue-500" />
                 <span>+1 (555) 123-4567</span>
               </li>
             </ul>
             <div className="mt-4">
               <h4 className="text-sm font-medium text-gray-300 mb-2">{t("footer.follow")}</h4>
               <SocialButtonsRow />
             </div>
           </div>
 
           <div>
             <h3 className="text-xl font-bold mb-4">Navegación</h3>
             <ul className="space-y-2 text-gray-400">
               <li>
                 <Link href="/" className="hover:text-blue-400 transition-colors">
                   {t("nav.home")}
                 </Link>
               </li>
               <li>
                 <Link href={getUrl("services")} className="hover:text-blue-400 transition-colors">
                   {t("nav.services")}
                 </Link>
               </li>
               <li>
                 <Link href={getUrl("about")} className="hover:text-blue-400 transition-colors">
                   {t("nav.about")}
                 </Link>
               </li>
               <li>
                 <Link href="/equipo" className="hover:text-blue-400 transition-colors">
                   {t("nav.team")}
                 </Link>
               </li>
               <li>
                 <Link href={getUrl("contact")} className="hover:text-blue-400 transition-colors">
                   {t("nav.contact")}
                 </Link>
               </li>
             </ul>
           </div>
         </div>
 
         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
           <p>
             © {currentYear} TechNova AI. {t("footer.rights")}.
           </p>
         </div>
       </div>
     </footer>
   )
 }