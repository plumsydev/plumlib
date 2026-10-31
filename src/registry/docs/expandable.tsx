import type { ComponentDoc } from "../types"
import Default from "../demos/expandable/default"
import Gallery from "../demos/expandable/gallery"
import Profile from "../demos/expandable/profile"
import ExpandablePlayground from "../playgrounds/expandable"

export const doc: ComponentDoc = {
  slug: "expandable",
  name: "Expandable",
  description:
    "A card that morphs into a full view, App Store style. Shared elements — media, title, subtitle — fly to their new place while the rest fades in.",
  category: "Overlays",
  dependencies: ["motion", "lucide-react"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "gallery", title: "Gallery", description: "Each card in a grid expands on its own.", component: Gallery },
    { name: "profile", title: "Profile", description: "Any shape works: a pill morphs into a profile card.", component: Profile },
  ],
  playground: ExpandablePlayground,
  usage: {
    imports: `import {
  Expandable,
  ExpandableClose,
  ExpandableContent,
  ExpandableDescription,
  ExpandableMedia,
  ExpandableSubtitle,
  ExpandableTitle,
  ExpandableTrigger,
} from "@/components/ui/expandable"`,
    code: `<Expandable>
  <ExpandableTrigger>
    <ExpandableMedia>…</ExpandableMedia>
    <ExpandableTitle>acme-storefront</ExpandableTitle>
    <ExpandableSubtitle>Next.js</ExpandableSubtitle>
  </ExpandableTrigger>
  <ExpandableContent>
    <ExpandableClose />
    <ExpandableMedia>…</ExpandableMedia>
    <ExpandableTitle>acme-storefront</ExpandableTitle>
    <ExpandableSubtitle>Next.js</ExpandableSubtitle>
    <ExpandableDescription>Only rendered when open.</ExpandableDescription>
  </ExpandableContent>
</Expandable>`,
  },
  api: [
    {
      component: "Expandable",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called on open and close." },
        { name: "transition", type: "Transition", default: '{ type: "spring", bounce: 0.12, duration: 0.5 }', description: "Motion transition used for the morph." },
      ],
    },
    {
      component: "ExpandableMedia / Title / Subtitle",
      description: "Shared elements. Render them in both the trigger and the content: they morph between the two.",
      props: [],
    },
    {
      component: "ExpandableDescription",
      description: "Content that only exists in the open view. Fades in after the morph.",
      props: [],
    },
  ],
  notes: [
    "The open view is a real dialog: `role=\"dialog\"`, `aria-modal`, labelled by its title, Esc to close, focus kept inside and returned to the card.",
    "Titles and subtitles animate their position only, so text never stretches mid-flight.",
  ],
}
