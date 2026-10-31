import type { ComponentDoc } from "../types"
import Default from "../demos/field/default"
import Validation from "../demos/field/validation"
import Horizontal from "../demos/field/horizontal"

export const doc: ComponentDoc = {
  slug: "field",
  name: "Field",
  description: "Wires a label, control, description and error together — ids and aria attributes included. Errors slide in, never jump.",
  category: "Inputs",
  dependencies: ["radix-ui", "motion", "lucide-react"],
  registryDependencies: ["label"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    {
      name: "validation",
      title: "Validation",
      description: "Set `invalid` on the field and the error animates its height in. Try submitting empty.",
      component: Validation,
    },
    { name: "horizontal", title: "Horizontal", description: "Use `orientation=\"horizontal\"` for settings rows.", component: Horizontal },
  ],
  usage: {
    imports: `import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"`,
    code: `<Field invalid={!!error}>
  <FieldLabel>Email</FieldLabel>
  <FieldControl>
    <Input type="email" />
  </FieldControl>
  <FieldDescription>We’ll never share it.</FieldDescription>
  <FieldError>{error}</FieldError>
</Field>`,
  },
  api: [
    {
      component: "Field",
      description: "The context provider. Generates ids for its parts.",
      props: [
        { name: "invalid", type: "boolean", default: "false", description: "Marks the control as invalid and reveals FieldError." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the control and dims the field." },
        { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Stack or row layout." },
        { name: "id", type: "string", description: "Override the generated control id." },
      ],
    },
    {
      component: "FieldControl",
      description: "A Slot that passes `id`, `aria-describedby`, `aria-invalid` and `disabled` to its child.",
      props: [],
    },
    {
      component: "FieldError",
      description: "Renders only when the field is invalid and it has children. Announced with role=\"alert\".",
      props: [],
    },
    { component: "FieldSet / FieldLegend / FieldGroup / FieldContent", description: "Layout helpers for grouping fields.", props: [] },
  ],
}
