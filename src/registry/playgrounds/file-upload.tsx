"use client"

import { FileUpload } from "@/components/ui/file-upload"
import { toast } from "@/components/ui/toast"
import { Playground, jsxProps } from "@/components/site/playground"

const accepts = { any: undefined, images: "image/*", documents: ".pdf,.doc,.docx" } as const

export default function FileUploadPlayground() {
  return (
    <Playground
      controls={{
        accept: { type: "select", options: ["any", "images", "documents"], default: "any" },
        maxFiles: { type: "number", default: 5, min: 1, max: 10 },
        multiple: { type: "boolean", default: true },
        disabled: { type: "boolean", default: false },
        title: { type: "text", default: "Drop files here or click to browse" },
      }}
      render={({ accept, ...p }) => (
        <FileUpload {...p} accept={accepts[accept]} className="max-w-md" onReject={(f, r) => toast.error(r, { description: f.name })} />
      )}
      code={({ accept, ...p }) =>
        `<FileUpload${jsxProps({ accept: accepts[accept], ...p }, { multiple: true, title: "Drop files here or click to browse" }).replace(/ (\w+)=/g, "\n  $1=").replace(/ disabled/, "\n  disabled")}
  onUpload={async (file, progress) => {
    await upload(file, progress)
  }}
/>`
      }
    />
  )
}
