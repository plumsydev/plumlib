import type { ComponentType } from "react"

export type Category = "Inputs" | "Overlays" | "Feedback" | "Navigation" | "Data Display"

export type PropDef = {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export type ComponentDoc = {
  slug: string
  name: string
  description: string
  category: Category
  /** lien vers la doc radix / lib sous-jacente */
  primitive?: { name: string; href: string }
  /** paquets npm à installer en plus de clsx + tailwind-merge */
  dependencies?: string[]
  /** autres composants plum dont celui-ci dépend */
  registryDependencies?: string[]
  /**
   * le 1er demo sert d'aperçu principal
   * le fichier source est src/registry/demos/<slug>/<name>.tsx
   */
  demos: { name: string; title?: string; description?: string; component: ComponentType }[]
  usage: { imports: string; code: string }
  api?: { component: string; description?: string; props: PropDef[] }[]
  notes?: string[]
  isNew?: boolean
}
