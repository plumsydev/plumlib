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
import { doc as textEffect } from "./docs/text-effect"
import { doc as textShimmer } from "./docs/text-shimmer"
import { doc as typewriter } from "./docs/typewriter"
import { doc as magnetic } from "./docs/magnetic"
import { doc as spotlight } from "./docs/spotlight"
import { doc as tilt } from "./docs/tilt"
import { doc as marquee } from "./docs/marquee"
import { doc as dock } from "./docs/dock"
import { doc as borderBeam } from "./docs/border-beam"
import { doc as animatedList } from "./docs/animated-list"
import { doc as numberInput } from "./docs/number-input"
import { doc as tagInput } from "./docs/tag-input"
import { doc as passwordInput } from "./docs/password-input"
import { doc as rating } from "./docs/rating"
import { doc as colorPicker } from "./docs/color-picker"
import { doc as fileUpload } from "./docs/file-upload"
import { doc as combobox } from "./docs/combobox"
import { doc as calendar } from "./docs/calendar"
import { doc as datePicker } from "./docs/date-picker"
import { doc as navigationMenu } from "./docs/navigation-menu"
import { doc as menubar } from "./docs/menubar"
import { doc as expandable } from "./docs/expandable"
import { doc as carousel } from "./docs/carousel"
import { doc as timeline } from "./docs/timeline"
import { doc as stepper } from "./docs/stepper"
import { doc as tree } from "./docs/tree"
import { doc as resizable } from "./docs/resizable"
import { doc as sortable } from "./docs/sortable"
import { doc as chart } from "./docs/chart"

export const components: ComponentDoc[] = [
  accordion, alert, alertDialog, animatedNumber, avatar, badge, breadcrumb, button, card, checkbox,
  collapsible, command, contextMenu, copyButton, dialog, drawer, dropdownMenu, empty, field, hoverCard,
  input, inputOtp, kbd, label, pagination, popover, progress, radioGroup, scrollArea, select,
  separator, sheet, skeleton, slider, spinner, switchDoc, table, tabs, textarea, toast,
  toggle, toggleGroup, tooltip,
  textEffect, textShimmer, typewriter, magnetic, spotlight, tilt, marquee, dock, borderBeam, animatedList,
  numberInput, tagInput, passwordInput, rating, colorPicker, fileUpload, combobox,
  calendar, datePicker, navigationMenu, menubar, expandable,
  carousel, timeline, stepper, tree, resizable, sortable, chart,
].sort((a, b) => a.name.localeCompare(b.name))

export const categories: Category[] = ["Inputs", "Overlays", "Feedback", "Navigation", "Data Display", "Motion"]

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
