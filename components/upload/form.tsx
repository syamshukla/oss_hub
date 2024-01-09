"use client"

import React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AuthDrawer from "@/components/auth/auth-drawer"
import BlobUploader from "@/components/upload/blob-uploader"
import FrameworkSelector from "@/components/upload/framework-selector"
import { createProject } from "@/app/actions"

export default function UploadForm({ session }: { session: any }) {
  const [formData, setFormData] = React.useState<{
    name: string
    description: string
    framework: string
    githubUrl: string
    siteUrl: string
    coverImg: string
  }>({
    name: "",
    description: "",
    framework: "",
    githubUrl: "",
    siteUrl: "",
    coverImg: "",
  })
  return (
    <form
      className="mx-auto mb-6 mt-4 max-w-xl"
      action={async (formData: FormData) => {
        const result = await createProject(formData)
        if (result?.error) {
          toast.error("Error uploading project.")
        } else {
          toast.success("Created project!")
        }
      }}
    >
      <div className="space-y-12">
        <div className="border-b pb-12">
          <h2 className="text-base font-semibold leading-7">
            Upload a project to OSS Hub
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Just a few more steps to get your project listed on OSS Hub.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                Project Name
              </Label>
              <div className="mt-2">
                <div className="flex rounded-md sm:max-w-md">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    autoComplete="off"
                    placeholder="Ex. OSS Hub"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="description"
                className="block text-sm font-medium leading-6"
              >
                Description
              </Label>
              <div className="mt-2">
                <Textarea
                  id="description"
                  name="description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Write a few sentences about your project."
                />
              </div>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6"
              >
                Cover Image
              </Label>

              <BlobUploader />
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="framework"
                className="block text-sm font-medium leading-6"
              >
                Framework
              </Label>
              <div className="mt-2 flex items-center gap-x-3">
                <FrameworkSelector />
              </div>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="githubUrl"
                className="block text-sm font-medium leading-6"
              >
                Github URL
              </Label>
              <div className="mt-2 flex items-center gap-x-3">
                <Input
                  name="githubUrl"
                  id="githubUrl"
                  autoComplete="off"
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  placeholder="ex"
                />
              </div>
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="siteUrl"
                className="block text-sm font-medium leading-6"
              >
                Github URL
              </Label>
              <div className="mt-2 flex items-center gap-x-3">
                <Input
                  name="siteUrl"
                  id="siteUrl"
                  autoComplete="off"
                  onChange={(e) =>
                    setFormData({ ...formData, siteUrl: e.target.value })
                  }
                  placeholder="siteUrl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* <Button
          disabled={
            !formData.name ||
            !formData.description ||
            !formData.githubUrl ||
            !formData.siteUrl
          }
          type="submit"
        >
          Upload
        </Button> */}
        {session ? (
          <Button
            disabled={
              !formData.name ||
              !formData.description ||
              !formData.githubUrl ||
              !formData.siteUrl
            }
            type="submit"
          >
            Upload
          </Button>
        ) : (
          <AuthDrawer text="Upload" />
        )}
      </div>
    </form>
  )
}
