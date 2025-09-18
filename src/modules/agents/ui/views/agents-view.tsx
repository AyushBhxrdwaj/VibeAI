'use client'
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

import React from 'react'
import { DataTable } from "../components/data-table"
import { columns} from "../components/columns"
import EmptyState from "@/components/empty-state"

const AgentsView = () => {
    const trpc=useTRPC()
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions())
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns}/>
      {data.length===0&&(
        <EmptyState title="No Agents Found,Create your first Agent" description="Create an agent to join your meeting.Each agent will follow your instructions and can interact with participants during call."/>
      )}
    </div>
  )
}

export default AgentsView