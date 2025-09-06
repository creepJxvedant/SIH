
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "../ui/label"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }
  
  if (!mounted) {
    // On the server or during initial client render, don't render the switch
    // to avoid hydration mismatch. You can render a placeholder or nothing.
    return (
        <div className="flex items-center justify-between px-2 h-8">
            <div className="flex items-center gap-2">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </div>
        </div>
    )
  }


  return (
    <div className="flex items-center justify-between px-2 h-8">
       <div className="flex items-center gap-2">
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
         <Label htmlFor="theme-switch" className="sr-only">Toggle Theme</Label>
       </div>
      <Switch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
        aria-label="Toggle theme"
      />
    </div>
  )
}
