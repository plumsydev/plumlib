import type { ComponentDoc } from "../types"
import Default from "../demos/file-upload/default"
import Single from "../demos/file-upload/single"
import Errors from "../demos/file-upload/errors"
import Playground from "../playgrounds/file-upload"

export const doc: ComponentDoc = {
  slug: "file-upload",
  name: "File Upload",
  description: "A dropzone that leans in when you drag, with image previews, per-file progress, retry and validation.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "lucide-react"],
  demos: [
    { name: "default", component: Default },
    { name: "single", title: "Single file", component: Single },
    { name: "errors", title: "Errors & retry", description: "Reject the promise returned by `onUpload` to show the error state.", component: Errors },
  ],
  playground: Playground,
  usage: {
    imports: `import { FileUpload } from "@/components/ui/file-upload"`,
    code: `<FileUpload
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  onUpload={async (file, progress) => {
    // send the file, call progress(0..100) along the way
  }}
/>`,
  },
  api: [
    {
      component: "FileUpload",
      props: [
        { name: "onUpload", type: "(file: File, progress: (pct: number) => void) => Promise<void>", description: "Does the upload. Defaults to a simulation for demos." },
        { name: "accept", type: "string", description: "Same syntax as the HTML attribute." },
        { name: "maxSize", type: "number", description: "Max bytes per file." },
        { name: "maxFiles", type: "number", default: "Infinity", description: "Max files in the list." },
        { name: "multiple", type: "boolean", default: "true", description: "Allow picking several files." },
        { name: "onFilesChange", type: "(files: File[]) => void", description: "Called when the set of finished uploads changes." },
        { name: "onReject", type: "(file: File, reason: string) => void", description: "Called for files that fail validation." },
        { name: "title / description", type: "ReactNode", description: "Dropzone copy." },
      ],
    },
  ],
  notes: ["The dropzone is focusable and opens the file dialog with Enter or Space."],
}
