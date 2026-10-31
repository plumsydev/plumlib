import type { Category } from "./types"

// version légère du registry pr le client, sans embarquer tt les démos ds le bundle
export type NavItem = { slug: string; name: string; isNew?: boolean }
export type NavGroup = { category: Category; items: NavItem[] }
