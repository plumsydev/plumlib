import type { ComponentDoc } from "../types"
import Default from "../demos/password-input/default"
import Strength from "../demos/password-input/strength"
import Signup from "../demos/password-input/signup"
import Playground from "../playgrounds/password-input"

export const doc: ComponentDoc = {
  slug: "password-input",
  name: "Password Input",
  description: "A password field with a hand-drawn eye toggle, a strength meter that fills segment by segment, and a live checklist.",
  category: "Inputs",
  isNew: true,
  dependencies: ["motion", "class-variance-authority"],
  registryDependencies: ["input"],
  demos: [
    { name: "default", component: Default },
    { name: "strength", title: "Strength & requirements", component: Strength },
    { name: "signup", title: "Sign up form", description: "Use the exported `getStrength()` to gate the submit button.", component: Signup },
  ],
  playground: Playground,
  usage: {
    imports: `import { PasswordInput } from "@/components/ui/password-input"`,
    code: `<PasswordInput showStrength requirements />`,
  },
  api: [
    {
      component: "PasswordInput",
      description: "Extends `Input`, except `type`.",
      props: [
        { name: "showStrength", type: "boolean", default: "false", description: "Show the four-segment strength meter." },
        { name: "requirements", type: "boolean | { label: string; test: (v: string) => boolean }[]", default: "false", description: "Show a checklist. Pass your own rules or `true` for the defaults." },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Height of the field." },
        { name: "containerClassName", type: "string", description: "Classes for the wrapper." },
      ],
    },
    {
      component: "getStrength",
      description: "`getStrength(value, rules?)` returns a score from 0 to 4.",
      props: [],
    },
  ],
  notes: ["The toggle sets `aria-pressed` and swaps its label between Show and Hide password."],
}
