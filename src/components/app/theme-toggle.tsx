
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center justify-between p-2">
       <div className="flex items-center gap-2">
         <Sun className="h-[1.2rem] w-[1.2rem]" />
         <span className="group-data-[collapsible=icon]:hidden">Toggle Theme</span>
       </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
        aria-label="Toggle theme"
      />
       <Moon className="h-[1.2rem] w-[1.2rem] opacity-50 group-data-[collapsible=icon]:hidden" />
    </div>
  )
}
