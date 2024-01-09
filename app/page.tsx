import Link from "next/link"
import { prisma } from "@/prisma/db"
import { CodeIcon } from "@radix-ui/react-icons"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth/auth-options"
import { Button } from "@/components/ui/button"
import AuthDrawer from "@/components/auth/auth-drawer"
import ProjectTicker from "@/components/motion/project-ticker"
import DisplayProjects from "@/components/projects"
import FilterProjects from "@/components/projects/filter-projects"

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(authOptions)
  const projectCount = await prisma.project.count()
  const sortQuery = searchParams["sort"]
  const frameworkQuery = searchParams["framework"]

  const projects = await prisma.project.findMany({
    orderBy: sortQuery
      ? {
          ProjectUpvote: {
            _count: sortQuery === "ascending" ? "asc" : "desc",
          },
        }
      : {
          createdAt: "desc",
        },
    include: {
      author: true,
      _count: {
        select: { ProjectUpvote: true },
      },
    },
  })

  const filteredProjects = frameworkQuery
    ? projects.filter((project) => project.framework === frameworkQuery)
    : projects

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4">
        <div className="flex max-w-md flex-col gap-4 py-8">
          <CodeIcon className="mx-auto h-16 w-16" />
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-2xl font-medium tracking-tight">
              Collaborate, Create, Contribute.
              <br /> Join OSS Hub and start building.
            </h1>
            <p className="text-center opacity-40">
              Discover and contribute to open source projects.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm opacity-40">
              <ProjectTicker value={projectCount} /> projects uploaded to OSS
              Hub!
            </p>
            {session ? (
              <Button asChild>
                <Link href="/upload-project">Upload Project</Link>
              </Button>
            ) : (
              <AuthDrawer text="Get Started" />
            )}
          </div>
        </div>
      </div>

      <FilterProjects projects={projects} />
      <DisplayProjects projects={filteredProjects} session={session} />
    </>
  )
}
