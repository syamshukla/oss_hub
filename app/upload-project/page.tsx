import React from "react"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth/auth-options"
import UploadForm from "@/components/upload/form"

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <UploadForm session={session} />
    </div>
  )
}
