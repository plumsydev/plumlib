"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { FileArchive, FileAudio, FileText, FileVideo, File as FileIcon, RotateCw, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/motion"

type UploadStatus = "uploading" | "done" | "error"

type UploadItem = {
  id: string
  file: File
  progress: number
  status: UploadStatus
  error?: string
  preview?: string
}

type FileUploadProps = {
  /** types acceptés, meme syntaxe que l'attribut html accept */
  accept?: string
  /** taille max par fichier en octets */
  maxSize?: number
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
  /**
   * fait l'upload, appelle progress(0..100) au fil de l'eau
   * par défaut on simule un upload pr les démos
   */
  onUpload?: (file: File, progress: (percent: number) => void) => Promise<void>
  /** appelé à chaque changement de la liste des fichiers terminés */
  onFilesChange?: (files: File[]) => void
  onReject?: (file: File, reason: string) => void
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB"]
  let v = bytes / 1024
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(v < 10 ? 1 : 0)} ${units[i]}`
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase()
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r)
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1))
    return file.type === r
  })
}

// faux upload qui avance par à coups, comme sur une vraie connexion
function simulateUpload(_file: File, progress: (p: number) => void) {
  return new Promise<void>((resolve) => {
    let p = 0
    const tick = () => {
      p = Math.min(100, p + 6 + Math.random() * 18)
      progress(p)
      if (p >= 100) resolve()
      else setTimeout(tick, 120 + Math.random() * 260)
    }
    setTimeout(tick, 200)
  })
}

function iconFor(file: File) {
  if (file.type.startsWith("video/")) return FileVideo
  if (file.type.startsWith("audio/")) return FileAudio
  if (/zip|rar|tar|7z/.test(file.type) || /\.(zip|rar|7z|tar|gz)$/i.test(file.name)) return FileArchive
  if (file.type.startsWith("text/") || file.type === "application/pdf") return FileText
  return FileIcon
}

function FileUpload({
  accept,
  maxSize,
  maxFiles = Infinity,
  multiple = true,
  disabled = false,
  onUpload = simulateUpload,
  onFilesChange,
  onReject,
  title = "Drop files here or click to browse",
  description,
  className,
}: FileUploadProps) {
  const [items, setItems] = React.useState<UploadItem[]>([])
  const [dragging, setDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const depth = React.useRef(0)
  const itemsRef = React.useRef(items)
  itemsRef.current = items

  const patch = (id: string, data: Partial<UploadItem>) =>
    setItems((list) => list.map((it) => (it.id === id ? { ...it, ...data } : it)))

  // on prévient le parent seulement qd la liste des fichiers finis bouge
  const doneKey = items.filter((i) => i.status === "done").map((i) => i.id).join("|")
  const onFilesChangeRef = React.useRef(onFilesChange)
  onFilesChangeRef.current = onFilesChange
  React.useEffect(() => {
    onFilesChangeRef.current?.(itemsRef.current.filter((i) => i.status === "done").map((i) => i.file))
  }, [doneKey])

  // on libère les urls de preview sinon fuite mémoire
  React.useEffect(() => () => itemsRef.current.forEach((i) => i.preview && URL.revokeObjectURL(i.preview)), [])

  const start = (item: UploadItem) => {
    onUpload(item.file, (p) => patch(item.id, { progress: p })).then(
      () => patch(item.id, { status: "done", progress: 100 }),
      (err: unknown) => patch(item.id, { status: "error", error: err instanceof Error ? err.message : "Upload failed" })
    )
  }

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files)
    const room = maxFiles - itemsRef.current.length
    const accepted: UploadItem[] = []
    list.forEach((file, i) => {
      let reason: string | null = null
      if (!matchesAccept(file, accept)) reason = "File type not supported"
      else if (maxSize && file.size > maxSize) reason = `Larger than ${formatBytes(maxSize)}`
      else if (i >= room) reason = `Only ${maxFiles} files allowed`
      if (reason) return onReject?.(file, reason)
      accepted.push({
        id: `${file.name}-${file.size}-${Date.now()}-${i}`,
        file,
        progress: 0,
        status: "uploading",
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      })
    })
    if (!accepted.length) return
    setItems((cur) => [...cur, ...accepted])
    accepted.forEach(start)
  }

  const remove = (id: string) =>
    setItems((list) => {
      const it = list.find((i) => i.id === id)
      if (it?.preview) URL.revokeObjectURL(it.preview)
      return list.filter((i) => i.id !== id)
    })

  return (
    <div data-slot="file-upload" className={cn("grid w-full gap-3", className)}>
      <motion.div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        data-dragging={dragging || undefined}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        // compteur de profondeur car dragleave se déclenche sur chaque enfant mskn
        onDragEnter={(e) => {
          e.preventDefault()
          if (disabled) return
          depth.current++
          setDragging(true)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {
          depth.current = Math.max(0, depth.current - 1)
          if (!depth.current) setDragging(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          depth.current = 0
          setDragging(false)
          if (!disabled) addFiles(e.dataTransfer.files)
        }}
        animate={{ scale: dragging ? 1.015 : 1 }}
        transition={spring.smooth}
        className={cn(
          "group/drop relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-input bg-muted/20 px-6 py-10 text-center outline-none",
          "transition-[border-color,background-color,box-shadow] duration-300 ease-out-quart",
          "hover:border-foreground/25 hover:bg-muted/40 focus-visible:ring-[3px] focus-visible:ring-ring",
          "data-[dragging]:border-brand data-[dragging]:bg-brand/5",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50"
        )}
      >
        {/* halo qui respire pendant le drag, pr dire vas y lache */}
        <AnimatePresence>
          {dragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--brand)_14%,transparent),transparent_70%)]"
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={dragging ? { y: [-2, -8, -2], scale: 1.08 } : { y: 0, scale: 1 }}
          transition={dragging ? { y: { duration: 1.1, repeat: Infinity, ease: "easeInOut" }, scale: spring.snappy } : spring.snappy}
          className="relative grid size-11 place-items-center rounded-xl border bg-background shadow-sm transition-colors duration-300 group-data-[dragging]/drop:border-brand/40 group-data-[dragging]/drop:text-brand"
        >
          <UploadCloud className="size-5" />
        </motion.div>
        <div className="relative space-y-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={dragging ? "drop" : "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={spring.snappy}
              className="text-sm font-medium"
            >
              {dragging ? "Release to upload" : title}
            </motion.p>
          </AnimatePresence>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files)
            e.target.value = ""
          }}
        />
      </motion.div>

      <ul className="grid gap-2">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const Icon = iconFor(item.file)
            return (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
                transition={spring.smooth}
                data-status={item.status}
                className="flex items-center gap-3 rounded-lg border bg-card p-2.5 pr-2 shadow-xs"
              >
                <div className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border bg-muted/50 text-muted-foreground">
                  {item.preview ? (
                    <img src={item.preview} alt="" className="size-full object-cover" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate font-medium">{item.file.name}</span>
                    <StatusLabel item={item} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={spring.gentle}
                        className={cn(
                          "h-full rounded-full transition-colors duration-300",
                          item.status === "error" ? "bg-destructive" : item.status === "done" ? "bg-success" : "bg-primary"
                        )}
                      />
                    </div>
                    <span className="w-14 text-right text-xs text-muted-foreground tabular-nums">{formatBytes(item.file.size)}</span>
                  </div>
                </div>
                {item.status === "error" && (
                  <button
                    type="button"
                    aria-label="Retry"
                    onClick={() => {
                      patch(item.id, { status: "uploading", progress: 0, error: undefined })
                      start(item)
                    }}
                    className="grid size-7 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:[&_svg]:rotate-180 [&_svg]:transition-[rotate] [&_svg]:duration-500"
                  >
                    <RotateCw className="size-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label={`Remove ${item.file.name}`}
                  onClick={() => remove(item.id)}
                  className="grid size-7 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}

function StatusLabel({ item }: { item: UploadItem }) {
  const text =
    item.status === "done" ? "Uploaded" : item.status === "error" ? (item.error ?? "Failed") : `${Math.round(item.progress)}%`
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={item.status === "uploading" ? "up" : item.status}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={spring.snappy}
        className={cn(
          "shrink-0 text-xs tabular-nums",
          item.status === "done" ? "text-success" : item.status === "error" ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  )
}

export { FileUpload, type FileUploadProps }
