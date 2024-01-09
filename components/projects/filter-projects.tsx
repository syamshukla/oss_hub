"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import FrameworkButtons from "./framework-buttons"

export default function FilterProjects({ projects }: { projects: any }) {
  const frameworks = [
    //   @ts-ignore
    ...new Set(projects.map((project: any) => project.framework)),
  ]
  const router = useRouter()

  const searchParams = useSearchParams()!

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  return (
    <div className="flex gap-4">
      <Select
        onValueChange={(value) => {
          if (value === "default") {
            const params = new URLSearchParams(searchParams)
            params.delete("sort")
            router.push("?" + params.toString())
            return
          }

          router.push("?" + createQueryString("sort", value))
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
          <span className="sr-only">Sort by</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="ascending">Ascending</SelectItem>
          <SelectItem value="descending">Descending</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-8" />
      {/* <Button>Filter</Button> */}
      <ScrollArea>
        <div className="flex space-x-1 overflow-x-auto">
          {frameworks.map((framework: any) => (
            <FrameworkButtons key={framework} framework={framework} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
