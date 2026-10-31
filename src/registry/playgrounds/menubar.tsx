"use client"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Playground } from "@/components/site/playground"

export default function MenubarPlayground() {
  return (
    <Playground
      previewClassName="items-start pt-12"
      controls={{
        shortcuts: { type: "boolean", default: true },
        checkboxes: { type: "boolean", default: true },
        loop: { type: "boolean", default: true },
      }}
      render={({ shortcuts, checkboxes, loop }) => (
        <Menubar loop={loop}>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New tab {shortcuts && <MenubarShortcut>⌘T</MenubarShortcut>}</MenubarItem>
              <MenubarItem>New window {shortcuts && <MenubarShortcut>⌘N</MenubarShortcut>}</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print {shortcuts && <MenubarShortcut>⌘P</MenubarShortcut>}</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              {checkboxes ? (
                <>
                  <MenubarCheckboxItem defaultChecked>Show bookmarks</MenubarCheckboxItem>
                  <MenubarCheckboxItem>Show full URLs</MenubarCheckboxItem>
                </>
              ) : (
                <MenubarItem>Reload {shortcuts && <MenubarShortcut>⌘R</MenubarShortcut>}</MenubarItem>
              )}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentation</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
      code={({ shortcuts, checkboxes, loop }) => `<Menubar${loop ? "" : " loop={false}"}>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New tab${shortcuts ? " <MenubarShortcut>⌘T</MenubarShortcut>" : ""}
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>${
      checkboxes
        ? `
      <MenubarCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
        Show bookmarks
      </MenubarCheckboxItem>`
        : `
      <MenubarItem>Reload</MenubarItem>`
    }
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
    />
  )
}
