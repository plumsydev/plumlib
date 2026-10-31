"use client"

import { FileUpload } from "@/components/ui/file-upload"
import { toast } from "@/components/ui/toast"

export default function FileUploadSingle() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <p className="text-sm font-medium">Company logo</p>
      <FileUpload
        accept="image/png,image/svg+xml"
        multiple={false}
        maxFiles={1}
        title="Upload a logo"
        description="SVG or PNG, square works best"
        onReject={(_, reason) => toast.error(reason)}
        onFilesChange={(files) => files.length && toast.success("Logo updated")}
      />
    </div>
  )
}
