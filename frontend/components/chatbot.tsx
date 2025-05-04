"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ImageIcon, Paperclip, Smile, Mic, X, Bot } from "lucide-react"

type MessageContent =
  | { type: "text"; text: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "file"; name: string; url: string; size: string }

interface Message {
  id: string
  content: MessageContent[]
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: [{ type: "text", text: "Hola, soy tu asistente de PlannH3R. ¿En qué puedo ayudarte hoy?" }],
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [showAttachOptions, setShowAttachOptions] = useState(false)
  const [attachments, setAttachments] = useState<MessageContent[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: [...(input.trim() ? [{ type: "text" as const, text: input }] : []), ...attachments],
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setAttachments([])
    setShowAttachOptions(false)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Basado en tu ciclo actual, es un buen momento para actividades creativas.",
        "¿Has considerado ajustar tu horario para incluir más descanso esta semana?",
        "Recuerda que estás en fase lútea, es normal sentir menos energía.",
        "He notado que cumples más objetivos durante tu fase folicular. ¡Aprovecha esa energía!",
        "¿Necesitas ayuda para reprogramar alguna actividad?",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: [{ type: "text", text: randomResponse }],
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)

      // Simulate file upload
      setTimeout(() => {
        const file = e.target.files![0]
        const fileSize = formatFileSize(file.size)
        const fileType = file.type.split("/")[0]

        if (fileType === "image") {
          const reader = new FileReader()
          reader.onload = (event) => {
            if (event.target?.result) {
              setAttachments([
                ...attachments,
                {
                  type: "image",
                  url: event.target.result as string,
                  alt: file.name,
                },
              ])
              setIsUploading(false)
            }
          }
          reader.readAsDataURL(file)
        } else {
          setAttachments([
            ...attachments,
            {
              type: "file",
              name: file.name,
              url: "#", // In a real app, this would be the URL to the file
              size: fileSize,
            },
          ])
          setIsUploading(false)
        }

        // Clear the input
        e.target.value = ""
      }, 1000)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
    setShowAttachOptions(false)
  }

  const triggerImageInput = () => {
    imageInputRef.current?.click()
    setShowAttachOptions(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
            {message.sender === "bot" && (
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white mr-2 flex-shrink-0">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-mustard text-primary-foreground" : "bg-white text-brown"
              }`}
            >
              {message.content.map((content, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  {content.type === "text" && <p>{content.text}</p>}

                  {content.type === "image" && (
                    <div className="mt-2">
                      <img
                        src={content.url || "/placeholder.svg"}
                        alt={content.alt || "Imagen adjunta"}
                        className="max-w-full rounded-md max-h-48 object-contain"
                      />
                    </div>
                  )}

                  {content.type === "file" && (
                    <div className="mt-2 flex items-center p-2 bg-brown/10 rounded-md">
                      <Paperclip size={16} className="mr-2 text-brown/70" />
                      <div>
                        <p className="text-sm font-medium">{content.name}</p>
                        <p className="text-xs text-brown/70">{content.size}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {message.sender === "user" && (
              <div className="h-8 w-8 rounded-full bg-mustard/80 flex items-center justify-center text-white ml-2 flex-shrink-0">
                <span className="text-sm font-medium">Tú</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-brown/10">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative">
                {attachment.type === "image" ? (
                  <div className="relative">
                    <img
                      src={attachment.url || "/placeholder.svg"}
                      alt={attachment.alt || "Vista previa"}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeAttachment(index)}
                      className="absolute -top-2 -right-2 bg-brown/80 text-white rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="relative flex items-center p-2 bg-brown/10 rounded-md">
                    <Paperclip size={14} className="mr-1 text-brown/70" />
                    <div className="max-w-[100px]">
                      <p className="text-xs font-medium truncate">{attachment.name}</p>
                      <p className="text-xs text-brown/70">{attachment.size}</p>
                    </div>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="absolute -top-2 -right-2 bg-brown/80 text-white rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-3 border-t border-brown/20">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="w-full p-3 pr-12 rounded-lg border border-brown/30 focus:outline-none focus:ring-2 focus:ring-accent resize-none min-h-[50px] max-h-[120px]"
            rows={1}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setShowAttachOptions(!showAttachOptions)}
                className="p-2 rounded-full hover:bg-brown/10 text-brown/70"
              >
                <Paperclip size={18} />
              </button>

              {showAttachOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex gap-2">
                  <button
                    onClick={triggerImageInput}
                    className="p-2 rounded-full hover:bg-brown/10 text-brown/70 flex flex-col items-center text-xs"
                  >
                    <ImageIcon size={18} />
                    <span>Imagen</span>
                  </button>
                  <button
                    onClick={triggerFileInput}
                    className="p-2 rounded-full hover:bg-brown/10 text-brown/70 flex flex-col items-center text-xs"
                  >
                    <Paperclip size={18} />
                    <span>Archivo</span>
                  </button>
                  <button
                    onClick={() => setShowAttachOptions(false)}
                    className="p-2 rounded-full hover:bg-brown/10 text-brown/70 flex flex-col items-center text-xs"
                  >
                    <Mic size={18} />
                    <span>Audio</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowAttachOptions(false)}
              className="p-2 rounded-full hover:bg-brown/10 text-brown/70"
            >
              <Smile size={18} />
            </button>

            <button
              onClick={handleSend}
              disabled={(!input.trim() && attachments.length === 0) || isUploading}
              className={`p-2 rounded-full ${
                (!input.trim() && attachments.length === 0) || isUploading
                  ? "bg-accent/50 text-white/70"
                  : "bg-accent text-white"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
        />
        <input type="file" ref={imageInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

        {isUploading && (
          <div className="mt-2 text-xs text-brown/70 flex items-center">
            <div className="animate-spin mr-1">
              <svg className="h-3 w-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            Subiendo archivo...
          </div>
        )}
      </div>
    </div>
  )
}
