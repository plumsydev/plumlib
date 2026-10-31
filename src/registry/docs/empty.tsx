import type { ComponentDoc } from "../types"
import Default from "../demos/empty/default"
import Search from "../demos/empty/search"

export const doc: ComponentDoc = {
  slug: "empty",
  name: "Empty",
  description: "Empty states that guide the next action. The stacked media fans out when you hover the block.",
  category: "Data Display",
  dependencies: ["class-variance-authority"],
  registryDependencies: ["button"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "search", title: "No results", description: "`EmptyMedia variant=\"icon\"` for a quieter look.", component: Search },
  ],
  usage: {
    imports: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"`,
    code: `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="stack">
      <FolderGit2 />
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create your first project to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>New project</Button>
  </EmptyContent>
</Empty>`,
  },
  api: [
    {
      component: "EmptyMedia",
      props: [
        { name: "variant", type: '"default" | "icon" | "stack"', default: '"default"', description: "Plain media, an icon tile, or a fanned stack of tiles." },
      ],
    },
  ],
  notes: ["`Empty` is dashed-border ready: add `border` to show it, or leave it borderless inside a card."],
}
