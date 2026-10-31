import { highlight } from "@/lib/highlight"
import { cn } from "@/lib/utils"
import { CopyIconButton } from "./copy"
import { CodeCollapse } from "./code-collapse"

type CodeBlockProps = {
  code: string
  lang?: string
  title?: string
  className?: string
  /** replie les longs fichiers avec un bouton "expand" */
  collapsible?: boolean
}

export async function CodeBlock({ code, lang = "tsx", title, className, collapsible }: CodeBlockProps) {
  const html = await highlight(code, lang)
  const long = collapsible && code.split("\n").length > 18

  const body = (
    <div
      className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.7] [&_pre]:outline-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  return (
    <div data-code-block className={cn("group/code relative overflow-hidden rounded-xl border bg-muted/40 dark:bg-card", className)}>
      {title ? (
        <div className="flex h-10 items-center justify-between border-b px-4 text-xs text-muted-foreground">
          <span className="font-mono">{title}</span>
          <CopyIconButton value={code} className="-mr-2" />
        </div>
      ) : (
        <CopyIconButton
          value={code}
          className="absolute top-2.5 right-2.5 z-10 bg-background/60 opacity-0 backdrop-blur transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
        />
      )}
      {long ? <CodeCollapse>{body}</CodeCollapse> : body}
    </div>
  )
}
