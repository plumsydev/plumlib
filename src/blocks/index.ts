import type { ComponentType } from "react"
import Auth from "./auth"
import Settings from "./settings"
import Tasks from "./tasks"

export type Block = { slug: string; title: string; description: string; component: ComponentType; uses: string[] }

export const blocks: Block[] = [
  {
    slug: "auth",
    title: "Passwordless sign in",
    description: "Email, one-time code, success. Each step slides in the direction you're going and the card eases to its new height.",
    component: Auth,
    uses: ["field", "input", "input-otp", "button", "separator", "toast"],
  },
  {
    slug: "settings",
    title: "Settings with save bar",
    description: "Edit anything and a save bar rises from the bottom. Reset puts everything back, save confirms with a toast.",
    component: Settings,
    uses: ["tabs", "field", "input", "textarea", "select", "switch", "avatar", "toast"],
  },
  {
    slug: "tasks",
    title: "Task list",
    description: "Add, complete, filter, prioritize, duplicate and delete — with undo that puts the task back where it was.",
    component: Tasks,
    uses: ["checkbox", "progress", "toggle-group", "dropdown-menu", "badge", "input", "toast"],
  },
]
