"use client"

import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  autoClose?: boolean
  autoCloseDelay?: number
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
}

const bgColorMap = {
  success: "bg-green-50 border-green-200",
  error: "bg-red-50 border-red-200",
  warning: "bg-yellow-50 border-yellow-200",
  info: "bg-blue-50 border-blue-200",
}

export function NotificationModal({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose = false,
  autoCloseDelay = 3000,
}: NotificationModalProps) {
  const Icon = iconMap[type]

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              bgColorMap[type]
            )}>
              <Icon className={cn("h-5 w-5", colorMap[type])} />
            </div>
            <div>
              <DialogTitle className={cn("text-left", colorMap[type])}>
                {title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <DialogDescription className="text-left text-gray-600 dark:text-gray-300">
          {message}
        </DialogDescription>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="min-w-[80px]"
          >
            {type === "success" ? "Continue" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}