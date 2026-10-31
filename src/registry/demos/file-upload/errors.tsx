"use client"

import { FileUpload } from "@/components/ui/file-upload"

// un upload sur trois plante, pr voir l'état erreur et le bouton retry
function flakyUpload(_file: File, progress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const fail = Math.random() < 0.35
    let p = 0
    const tick = () => {
      p += 8 + Math.random() * 14
      if (fail && p > 55) return reject(new Error("Network error"))
      progress(Math.min(100, p))
      if (p >= 100) resolve()
      else setTimeout(tick, 150 + Math.random() * 200)
    }
    setTimeout(tick, 200)
  })
}

export default function FileUploadErrors() {
  return (
    <FileUpload
      className="max-w-md"
      onUpload={flakyUpload}
      title="Drop anything"
      description="About a third of uploads fail on purpose. Hit retry."
    />
  )
}
