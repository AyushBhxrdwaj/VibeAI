import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import CommandSelect from './command-select';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';


const AgentsIdFilter = () => {
    const [filters, setfilters] = useMeetingsFilters()
    const trpc=useTRPC();
    const [agentSearch, setagentSearch] = useState('');
    const {data}=useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize:100,
            search:agentSearch
        }),
    );
  return (
    <CommandSelect className='h-9' placeholder='Agent' options={(data?.items??[]).map((agent) => (
        {id:agent.id,
        value:agent.id,
        children:(
            <div className='flex items-center gap-x-2'>
                <GeneratedAvatar variant='botttsNeutral' seed={agent.name} className='size-4'/>
                {agent.name}
            </div>
        )

        }
    ))}
    onSelect={(value)=>setfilters({agentId:value})}
    onSearch={setagentSearch}
    value={filters.agentId??""}/>
  )
}

export default AgentsIdFilter