"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import SignatureCanvas from "react-signature-canvas"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, RefreshCw } from "lucide-react"

type FormData = {
  clientName: string
  email: string
  services: {
    ai: boolean
    webDev: boolean
    automation: boolean
    cybersecurity: boolean
    blockchain: boolean
    chatbots: boolean
  }
  description: string
  amount: string
  startDate: Date
  endDate: Date
  paymentMethod: string
  termsAccepted: boolean
}

export default function ContractForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      clientName: "",
      email: "",
      services: {
        ai: false,
        webDev: false,
        automation: false,
        cybersecurity: false,
        blockchain: false,
        chatbots: false,
      },
      description: "",
      amount: "",
      paymentMethod: "",
      termsAccepted: false,
    },
  })

  const [signature, setSignature] = useState<SignatureCanvas | null>(null)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [signatureEmpty, setSignatureEmpty] = useState(false)

  const clearSignature = () => {
    if (signature) {
      signature.clear()
      setSignatureEmpty(true)
    }
  }

  const generatePDF = async (data: FormData) => {
    if (!signature || signature.isEmpty()) {
      setSignatureEmpty(true)
      return
    }

    setIsGenerating(true)

    try {
      // Capture the contract content
      const contractElement = document.getElementById("contract-content")
      if (!contractElement) return

      const canvas = await html2canvas(contractElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#1f2937",
      })

      const imgData = canvas.toDataURL("image/png")

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const ratio = canvas.width / canvas.height
      const imgWidth = pdfWidth
      const imgHeight = pdfWidth / ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      // Add signature image
      const signatureImg = signature.toDataURL("image/png")

      // Add footer
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text(
        "Este documento es un contrato legal entre Tech Nova AI y el cliente firmante.",
        pdfWidth / 2,
        pdfHeight - 10,
        { align: "center" },
      )

      // Download PDF
      pdf.save(`Contrato_TechNovaAI_${data.clientName.replace(/\s+/g, "_")}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const onSubmit = (data: FormData) => {
    if (startDate) data.startDate = startDate
    if (endDate) data.endDate = endDate
    generatePDF(data)
  }

  const watchTerms = watch("termsAccepted")

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contract-content" className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Nombre del Cliente o Empresa</Label>
            <Input
              id="clientName"
              placeholder="Ingrese nombre completo"
              className="bg-gray-800/50 border-gray-700 text-white"
              {...register("clientName", { required: "Este campo es obligatorio" })}
            />
            {errors.clientName && <p className="text-red-400 text-sm mt-1">{errors.clientName.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="bg-gray-800/50 border-gray-700 text-white"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label>Servicios Contratados</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="ai" {...register("services.ai")} />
                <Label htmlFor="ai" className="text-sm font-normal">
                  Inteligencia Artificial
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="webDev" {...register("services.webDev")} />
                <Label htmlFor="webDev" className="text-sm font-normal">
                  Desarrollo Web
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="automation" {...register("services.automation")} />
                <Label htmlFor="automation" className="text-sm font-normal">
                  Automatización
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cybersecurity" {...register("services.cybersecurity")} />
                <Label htmlFor="cybersecurity" className="text-sm font-normal">
                  Ciberseguridad
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="blockchain" {...register("services.blockchain")} />
                <Label htmlFor="blockchain" className="text-sm font-normal">
                  Blockchain
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chatbots" {...register("services.chatbots")} />
                <Label htmlFor="chatbots" className="text-sm font-normal">
                  Chatbots
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Descripción del Servicio</Label>
            <Textarea
              id="description"
              placeholder="Describa brevemente el servicio requerido"
              className="bg-gray-800/50 border-gray-700 text-white h-32"
              {...register("description", { required: "Este campo es obligatorio" })}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="amount">Monto Acordado (MXN)</Label>
            <Input
              id="amount"
              placeholder="$0.00"
              className="bg-gray-800/50 border-gray-700 text-white"
              {...register("amount", { required: "Este campo es obligatorio" })}
            />
            {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <Label htmlFor="paymentMethod">Forma de Pago</Label>
            <Input
              id="paymentMethod"
              placeholder="Transferencia, efectivo, etc."
              className="bg-gray-800/50 border-gray-700 text-white"
              {...register("paymentMethod", { required: "Este campo es obligatorio" })}
            />
            {errors.paymentMethod && <p className="text-red-400 text-sm mt-1">{errors.paymentMethod.message}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Fecha de Inicio</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="bg-gray-800 text-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Fecha de Entrega</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className="bg-gray-800 text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
  <div>
    <Label>Firma Digital</Label>
    <div
      className={`mt-2 border-2 rounded-md ${signatureEmpty ? "border-red-500" : "border-gray-600"} bg-gray-800/30`}
    >
      <SignatureCanvas
        ref={(ref) => {
          setSignature(ref);
          if (ref) setSignatureEmpty(ref.isEmpty());
        }}
        canvasProps={{
          className: "w-full h-40 cursor-crosshair",
        }}
        backgroundColor="rgba(31, 41, 55, 0)"
        penColor="white"
        onEnd={() => setSignatureEmpty(false)}
      />
    </div>
    {signatureEmpty && <p className="text-red-400 text-sm mt-1">La firma es obligatoria</p>}
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={clearSignature}
      className="mt-2 text-gray-300 border-gray-700 hover:bg-gray-700/50"
    >
      <RefreshCw className="h-4 w-4 mr-2" />
      Limpiar firma
    </Button>
  </div>

  <div className="flex items-start space-x-3 pt-2">
    <Checkbox
      id="terms"
      checked={watchTerms}
      onCheckedChange={(checked) => {
        setValue("termsAccepted", checked === true);
      }}
    />
    <div>
      <Label htmlFor="terms" className="font-normal">
        Acepto los términos y condiciones de Tech Nova AI
      </Label>
      {errors.termsAccepted && (
        <p className="text-red-400 text-sm mt-1">Debe aceptar los términos y condiciones</p>
      )}
    </div>
  </div>
</div>

<div className="pt-4">
  <Button
    type="submit"
    className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all"
    disabled={isGenerating || !watchTerms}
  >
    {isGenerating ? "Generando PDF..." : "Firmar y Descargar Contrato en PDF"}
  </Button>
</div>
    </form>
  )
}
