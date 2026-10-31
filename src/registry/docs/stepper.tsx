import type { ComponentDoc } from "../types"
import Default from "../demos/stepper/default"
import Vertical from "../demos/stepper/vertical"
import Compact from "../demos/stepper/compact"
import StepperPlayground from "../playgrounds/stepper"

export const doc: ComponentDoc = {
  slug: "stepper",
  name: "Stepper",
  description: "Multi-step progress for wizards and pipelines. Connectors fill in the direction of travel and completed steps draw their check mark.",
  category: "Navigation",
  dependencies: ["motion"],
  isNew: true,
  demos: [
    { name: "default", component: Default },
    { name: "vertical", title: "Vertical", description: "`orientation=\"vertical\"` with descriptions, here driven by a timer like a CI run.", component: Vertical },
    { name: "compact", title: "Compact", description: "Indicators only, for quizzes and short flows.", component: Compact },
  ],
  playground: StepperPlayground,
  usage: {
    imports: `import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"`,
    code: `<Stepper value={step} onValueChange={setStep}>
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Account</StepperTitle>
    </StepperTrigger>
    <StepperSeparator />
  </StepperItem>
  <StepperItem step={2} last>…</StepperItem>
</Stepper>`,
  },
  api: [
    {
      component: "Stepper",
      props: [
        { name: "value / defaultValue", type: "number", default: "1", description: "The active step (1-based). Steps below it are completed." },
        { name: "onValueChange", type: "(step: number) => void", description: "Called when a trigger is clicked." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
      ],
    },
    {
      component: "StepperItem",
      props: [
        { name: "step", type: "number", required: true, description: "Position of the step." },
        { name: "completed", type: "boolean", description: "Force the completed state." },
        { name: "disabled", type: "boolean", description: "Disable the trigger." },
        { name: "last", type: "boolean", description: "Hide the connector after this step." },
      ],
    },
  ],
  notes: ["Set `value` to `steps + 1` to mark every step as completed."],
}
