"use client"

import React, { useEffect, useState } from "react"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "@/components/auth/login-button"
import { checkIfUserUpvoted, upvotePost } from "@/app/actions"

export default function UpvoteProject({
  project,
  session,
}: {
  project: any
  session: any
}) {
  const [hasUpvoted, setHasUpvoted] = useState(false)

  useEffect(() => {
    const fetchUpvoteStatus = async () => {
      try {
        const upvoted = await checkIfUserUpvoted(project.id)
        setHasUpvoted(upvoted)
      } catch (error) {
        console.error("Failed to check upvote status:", error)
      }
    }

    fetchUpvoteStatus()
  }, [project.id])

  const handleUpvote = async () => {
    try {
      const result = await upvotePost(project.id)

      if (result.message) {
        setHasUpvoted(result.message === "Successfully upvoted the post.")

        toast.success("Successfully registered your upvote")
      }
    } catch (error) {
      toast.error("Something went wrong while upvoting the post")
      if (!session) {
        toast.error("You must be logged in to upvote a post")
      }
    }
  }

  return (
    <>
      {session ? (
        <>
          {hasUpvoted ? (
            <Badge
              variant="secondary"
              onClick={handleUpvote}
              className="cursor-pointer tabular-nums"
            >
              {project._count.ProjectUpvote} <ArrowUpIcon className="h-4 w-4" />
            </Badge>
          ) : (
            <Badge
              variant="outline"
              onClick={handleUpvote}
              className="cursor-pointer tabular-nums hover:bg-muted"
            >
              {project._count.ProjectUpvote}
              <ArrowUpIcon className="h-4 w-4" />
            </Badge>
          )}
        </>
      ) : (
        <AuthDrawer project={project} />
      )}
    </>
  )
}

function AuthDrawer({ project }: { project: any }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Badge
          variant="outline"
          className="cursor-pointer tabular-nums hover:bg-muted"
        >
          {project._count.ProjectUpvote}
          <ArrowUpIcon className="h-4 w-4" />
        </Badge>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <DrawerHeader className="mx-auto mt-4 max-w-lg gap-4">
          <DrawerTitle>Welcome to OSS Hub</DrawerTitle>
          <DrawerDescription>
            Sign in to create posts, comment on posts, upvote posts, and more!
          </DrawerDescription>
          <GithubLoginButton />
          <GoogleLoginButton />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
