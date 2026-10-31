import type { Category, ComponentDoc } from "./types"

import { doc as accordion } from "./docs/accordion"
import { doc as alert } from "./docs/alert"
import { doc as alertDialog } from "./docs/alert-dialog"
import { doc as animatedNumber } from "./docs/animated-number"
import { doc as avatar } from "./docs/avatar"
import { doc as badge } from "./docs/badge"
import { doc as breadcrumb } from "./docs/breadcrumb"
import { doc as button } from "./docs/button"
import { doc as card } from "./docs/card"
import { doc as checkbox } from "./docs/checkbox"
import { doc as collapsible } from "./docs/collapsible"
import { doc as command } from "./docs/command"
import { doc as contextMenu } from "./docs/context-menu"
import { doc as copyButton } from "./docs/copy-button"
import { doc as dialog } from "./docs/dialog"
import { doc as drawer } from "./docs/drawer"
import { doc as dropdownMenu } from "./docs/dropdown-menu"
import { doc as empty } from "./docs/empty"
import { doc as field } from "./docs/field"
import { doc as hoverCard } from "./docs/hover-card"
import { doc as input } from "./docs/input"
import { doc as inputOtp } from "./docs/input-otp"
import { doc as kbd } from "./docs/kbd"
import { doc as label } from "./docs/label"
import { doc as pagination } from "./docs/pagination"
import { doc as popover } from "./docs/popover"
import { doc as progress } from "./docs/progress"
import { doc as radioGroup } from "./docs/radio-group"
import { doc as scrollArea } from "./docs/scroll-area"
import { doc as select } from "./docs/select"
import { doc as separator } from "./docs/separator"
import { doc as sheet } from "./docs/sheet"
import { doc as skeleton } from "./docs/skeleton"
import { doc as slider } from "./docs/slider"
import { doc as spinner } from "./docs/spinner"
import { doc as switchDoc } from "./docs/switch"
import { doc as table } from "./docs/table"
import { doc as tabs } from "./docs/tabs"
import { doc as textarea } from "./docs/textarea"
import { doc as toast } from "./docs/toast"
import { doc as toggle } from "./docs/toggle"
import { doc as toggleGroup } from "./docs/toggle-group"
import { doc as tooltip } from "./docs/tooltip"

export const components: ComponentDoc[] = [
  accordion, alert, alertDialog, animatedNumber, avatar, badge, breadcrumb, button, card, checkbox,
  collapsible, command, contextMenu, copyButton, dialog, drawer, dropdownMenu, empty, field, hoverCard,
  input, inputOtp, kbd, label, pagination, popover, progress, radioGroup, scrollArea, select,
  separator, sheet, skeleton, slider, spinner, switchDoc, table, tabs, textarea, toast,
  toggle, toggleGroup, tooltip,
].sort((a, b) => a.name.localeCompare(b.name))

export const categories: Category[] = ["Inputs", "Overlays", "Feedback", "Navigation", "Data Display"]

export function getComponent(slug: string) {
  return components.find((c) => c.slug === slug)
}

export function getComponentsByCategory() {
  return categories.map((category) => ({
    category,
    items: components.filter((c) => c.category === category),
  }))
}

export function getNav(): import("./nav-types").NavGroup[] {
  return getComponentsByCategory().map(({ category, items }) => ({
    category,
    items: items.map(({ slug, name, isNew }) => ({ slug, name, isNew })),
  }))
}
