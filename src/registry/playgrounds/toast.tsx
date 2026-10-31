"use client"

import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/toast"
import { Playground, jsxProps } from "@/components/site/playground"

export default function ToastPlayground() {
  return (
    <Playground
      controls={{
        type: { type: "select", options: ["default", "success", "error", "info", "warning", "loading", "promise"], default: "success" },
        position: { type: "select", options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"], default: "bottom-right" },
        title: { type: "text", default: "Deployment ready" },
        description: { type: "text", default: "acme-web is live on production." },
        richColors: { type: "boolean", default: false },
        closeButton: { type: "boolean", default: false },
        expand: { type: "boolean", default: false },
        action: { type: "boolean", default: false },
      }}
      render={({ type, position, title, description, richColors, closeButton, expand, action }) => {
        // un toaster dédié au playground pr pouvoir changer ses props sans toucher celui du site
        const opts = {
          description: description || undefined,
          toasterId: "playground",
          action: action ? { label: "View", onClick: () => {} } : undefined,
        }
        const fire = () => {
          if (type === "promise") {
            toast.promise(new Promise((r) => setTimeout(r, 1800)), { loading: "Deploying…", success: title, error: "Failed" }, opts)
          } else if (type === "default") {
            toast(title, opts)
          } else {
            toast[type](title, opts)
          }
        }
        return (
          <>
            <Button variant="outline" onClick={fire}>
              Show toast
            </Button>
            <Toaster id="playground" position={position} richColors={richColors} closeButton={closeButton} expand={expand} />
          </>
        )
      }}
      code={({ type, position, title, description, richColors, closeButton, expand, action }) => {
        const opts = [description && `description: "${description}"`, action && `action: { label: "View", onClick: () => {} }`].filter(Boolean)
        const optStr = opts.length ? `, {\n  ${opts.join(",\n  ")},\n}` : ""
        const call =
          type === "promise"
            ? `toast.promise(deploy(), {\n  loading: "Deploying…",\n  success: "${title}",\n  error: "Failed",\n})`
            : `toast${type === "default" ? "" : `.${type}`}("${title}"${optStr})`
        return `// once, at the root of your app
<Toaster${jsxProps({ position, richColors, closeButton, expand }, { position: "bottom-right" })} />

// anywhere
${call}`
      }}
    />
  )
}
