"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export default function ButtonLoading() {
  const [loading, setLoading] = React.useState(false)

  // on simule une requête bien lente façon wifi de train
  const save = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <Button onClick={save} loading={loading} className="min-w-28">
      {loading ? "Saving" : "Save changes"}
    </Button>
  )
}
