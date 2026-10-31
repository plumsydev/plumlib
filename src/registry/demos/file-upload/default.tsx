"use client"

import { FileUpload, formatBytes } from "@/components/ui/file-upload"
import { toast } from "@/components/ui/toast"

const MAX = 5 * 1024 * 1024

export default function FileUploadDemo() {
  return (
    <FileUpload
      className="max-w-md"
      accept="image/*,application/pdf"
      maxSize={MAX}
      maxFiles={6}
      description={`PNG, JPG or PDF up to ${formatBytes(MAX)}`}
      onReject={(file, reason) => toast.error(reason, { description: file.name })}
    />
  )
}
