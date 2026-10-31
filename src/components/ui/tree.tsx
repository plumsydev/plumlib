"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronRight, File, FileCode2, FileImage, FileJson, FileText, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type TreeNode = {
  id: string
  name: string
  children?: TreeNode[]
  icon?: React.ReactNode
  disabled?: boolean
}

type TreeProps = Omit<React.ComponentProps<"ul">, "onSelect"> & {
  data: TreeNode[]
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (ids: string[]) => void
  selected?: string | null
  defaultSelected?: string | null
  onSelect?: (node: TreeNode) => void
  /** lignes verticales qui relient les niveaux */
  guides?: boolean
}

type Flat = { node: TreeNode; level: number; parent: string | null }

// icone auto selon l'extension, ça évite que tt le monde réinvente ça
function iconFor(node: TreeNode, open: boolean) {
  if (node.icon) return node.icon
  if (node.children) return open ? <FolderOpen /> : <Folder />
  const ext = node.name.split(".").pop()?.toLowerCase() ?? ""
  if (["ts", "tsx", "js", "jsx", "mjs", "css", "html"].includes(ext)) return <FileCode2 />
  if (["json", "lock"].includes(ext)) return <FileJson />
  if (["png", "jpg", "jpeg", "svg", "webp", "gif"].includes(ext)) return <FileImage />
  if (["md", "mdx", "txt"].includes(ext)) return <FileText />
  return <File />
}

function Tree({
  data,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  selected: selectedProp,
  defaultSelected = null,
  onSelect,
  guides = true,
  className,
  ...props
}: TreeProps) {
  const [innerExpanded, setInnerExpanded] = React.useState(defaultExpanded)
  const [innerSelected, setInnerSelected] = React.useState(defaultSelected)
  const expanded = expandedProp ?? innerExpanded
  const selected = selectedProp !== undefined ? selectedProp : innerSelected
  const [focused, setFocused] = React.useState<string | null>(null)
  const refs = React.useRef(new Map<string, HTMLDivElement>())
  const layoutId = React.useId()

  const setExpanded = (ids: string[]) => {
    if (expandedProp === undefined) setInnerExpanded(ids)
    onExpandedChange?.(ids)
  }
  const toggle = (id: string, open?: boolean) => {
    const isOpen = expanded.includes(id)
    const next = open ?? !isOpen
    if (next === isOpen) return
    setExpanded(next ? [...expanded, id] : expanded.filter((e) => e !== id))
  }
  const select = (node: TreeNode) => {
    if (node.disabled) return
    if (selectedProp === undefined) setInnerSelected(node.id)
    onSelect?.(node)
  }

  // liste à plat des items visibles, sert à la nav clavier
  const visible = React.useMemo(() => {
    const out: Flat[] = []
    const walk = (nodes: TreeNode[], level: number, parent: string | null) => {
      for (const node of nodes) {
        out.push({ node, level, parent })
        if (node.children && expanded.includes(node.id)) walk(node.children, level + 1, node.id)
      }
    }
    walk(data, 1, null)
    return out
  }, [data, expanded])

  const current = focused ?? selected ?? visible[0]?.node.id
  const focusItem = (id: string | undefined) => {
    if (!id) return
    setFocused(id)
    refs.current.get(id)?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = visible.findIndex((f) => f.node.id === current)
    const item = visible[i]
    if (!item) return
    const { node } = item
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusItem(visible[i + 1]?.node.id),
      ArrowUp: () => focusItem(visible[i - 1]?.node.id),
      Home: () => focusItem(visible[0]?.node.id),
      End: () => focusItem(visible[visible.length - 1]?.node.id),
      ArrowRight: () => {
        if (!node.children) return
        if (!expanded.includes(node.id)) toggle(node.id, true)
        else focusItem(node.children[0]?.id)
      },
      ArrowLeft: () => {
        if (node.children && expanded.includes(node.id)) toggle(node.id, false)
        else focusItem(item.parent ?? undefined)
      },
      Enter: () => (node.children ? toggle(node.id) : select(node)),
      " ": () => select(node),
    }
    if (keys[e.key]) {
      e.preventDefault()
      keys[e.key]()
    }
  }

  const renderNodes = (nodes: TreeNode[], level: number): React.ReactNode =>
    nodes.map((node) => {
      const open = !!node.children && expanded.includes(node.id)
      const isSelected = selected === node.id
      return (
        <li key={node.id} role="none">
          <div
            ref={(el) => {
              if (el) refs.current.set(node.id, el)
              else refs.current.delete(node.id)
            }}
            role="treeitem"
            aria-level={level}
            aria-expanded={node.children ? open : undefined}
            aria-selected={isSelected}
            aria-disabled={node.disabled || undefined}
            tabIndex={current === node.id ? 0 : -1}
            onFocus={() => setFocused(node.id)}
            onClick={() => {
              setFocused(node.id)
              if (node.children) toggle(node.id)
              select(node)
            }}
            data-selected={isSelected || undefined}
            style={{ paddingLeft: `calc(${level - 1} * 1.125rem + 0.375rem)` }}
            className={cn(
              "group/item relative flex h-8 cursor-pointer items-center gap-1.5 rounded-md pr-2 text-sm text-muted-foreground outline-none select-none",
              "transition-colors duration-150 hover:bg-accent/60 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring",
              "data-[selected]:text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50",
              "[&_svg]:size-4 [&_svg]:shrink-0"
            )}
          >
            {isSelected && (
              // la sélection glisse d'un fichier à l'autre au lieu de clignoter
              <motion.span layoutId={`${layoutId}-selected`} transition={spring.snappy} className="absolute inset-0 rounded-md bg-accent" />
            )}
            <span className="relative flex w-4 items-center justify-center">
              {node.children && (
                <ChevronRight
                  className={cn("!size-3.5 transition-transform duration-300 ease-out-expo", open && "rotate-90")}
                />
              )}
            </span>
            <span className={cn("relative", node.children ? "text-foreground/70" : "text-muted-foreground", isSelected && "text-foreground")}>
              {iconFor(node, open)}
            </span>
            <span className="relative truncate">{node.name}</span>
          </div>
          <AnimatePresence initial={false}>
            {open && node.children && (
              <motion.ul
                role="group"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ height: { type: "spring", stiffness: 380, damping: 38 }, opacity: { duration: 0.2 } }}
                className="relative overflow-hidden"
              >
                {guides && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-0 bottom-1 z-10 w-px bg-foreground/12"
                    style={{ left: `calc(${level - 1} * 1.125rem + 0.375rem + 0.5rem - 0.5px)` }}
                  />
                )}
                {renderNodes(node.children, level + 1)}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      )
    })

  return (
    <ul data-slot="tree" role="tree" onKeyDown={onKeyDown} className={cn("text-sm", className)} {...props}>
      {renderNodes(data, 1)}
    </ul>
  )
}

export { Tree, type TreeNode, type TreeProps }
