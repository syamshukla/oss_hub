import Image from "next/image"
import Link from "next/link"
import { ArrowUpIcon, ChatBubbleIcon } from "@radix-ui/react-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

import UpvoteProject from "./upvote-project"

export default function DisplayProjects({
  projects,
  session,
}: {
  projects: any[]
  session: any
}) {
  return (
    <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <div className="flex w-full justify-between  p-2">
            <div className="space-x-1">
              <UpvoteProject project={project} session={session} />
              <Badge variant="secondary" className="gap-1">
                0 <ChatBubbleIcon className="h-4 w-4" />
              </Badge>
            </div>

            <p className="flex items-center text-sm text-muted-foreground">
              by
              <span className="ml-2 flex items-center gap-0.5 text-foreground">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={project.author.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Link
                  href="/acconutsFIXTHIS"
                  className="relative before:absolute before:bottom-0 before:left-0 before:h-[0.5px] before:w-full before:origin-right before:scale-x-0 before:bg-foreground before:transition-transform before:duration-300 hover:before:origin-left hover:before:scale-x-100 "
                >
                  {project.author.name}
                </Link>
              </span>
            </p>
          </div>
          <Image
            alt="Cover image"
            className="aspect-[3/2] w-full border-b object-cover"
            height={200}
            src={project.coverImg}
            width={300}
          />
          <CardContent className="p-2 text-sm">
            <CardTitle className="flex items-center justify-between">
              {project.name}
              <Badge variant="secondary" className="w-fit">
                {project.framework}
              </Badge>
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
