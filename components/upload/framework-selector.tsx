"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const groups = [
  {
    label: "Frameworks",
    teams: [
      {
        value: "next.js",
        label: "Next.js",
      },
      {
        value: "sveltekit",
        label: "SvelteKit",
      },
      {
        value: "nuxt.js",
        label: "Nuxt.js",
      },
      {
        value: "remix",
        label: "Remix",
      },
      {
        value: "astro",
        label: "Astro",
      },
    ],
  },
]

type Team = (typeof groups)[number]["teams"][number]

export default function FrameworkSelector() {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    groups[0].teams[0]
  )
  const [customFramework, setCustomFramework] = React.useState("")
  const [otherSelected, setOtherSelected] = React.useState(false)
  return (
    <>
      {otherSelected ? (
        <Input
          type="text"
          name="framework"
          id="framework"
          defaultValue={customFramework}
          placeholder="Ex. HTMX"
        />
      ) : (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a team"
                className="w-[200px] justify-between"
              >
                {selectedTeam.label}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search team..." />
                  <CommandEmpty>No team found.</CommandEmpty>
                  {groups.map((group) => (
                    <CommandGroup key={group.label} heading={group.label}>
                      {group.teams.map((team) => (
                        <CommandItem
                          key={team.value}
                          onSelect={() => {
                            setSelectedTeam(team)
                            setOpen(false)
                          }}
                          className="text-sm"
                        >
                          {team.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedTeam.value === team.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <DialogTrigger asChild>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false)
                          setShowNewTeamDialog(true)
                        }}
                      >
                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                        Other
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add custom framework</DialogTitle>
              <DialogDescription>
                Add a framework that was not listed in the dropdown.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="framework">Framework</Label>
                  <Input
                    id="framework"
                    placeholder="Ex. HTMX"
                    onChange={(e) => setCustomFramework(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setOtherSelected(true)
                  setShowNewTeamDialog(false)
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Input
        type="hidden"
        name="framework"
        id="framework"
        placeholder="Ex. HTMX"
        value={selectedTeam.label}
      />
    </>
  )
}
