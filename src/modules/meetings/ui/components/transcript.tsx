import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateAvatarUri } from '@/lib/avatar';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react'

interface Props{
    meetingId:string
}

const Transcript = ({meetingId}:Props) => {
    const trpc = useTRPC();
    const {data}= useQuery(trpc.meetings.gettranscript.queryOptions({id:meetingId}))

    const [searchQuery,SetsearchQuery]= useState("")
    const filtereData = (data??[]).filter((item)=>{
        item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
    })
  return (
    <div className='bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full'>
        <p className='text-sm font-medium'>Transcript</p>
        <div className='relative'>
            <Input
            placeholder='Search transcript'
            className='pl-7 h-9 w-[240px]'
            value={searchQuery}
            onChange={(e)=>SetsearchQuery(e.target.value)}/>

            <SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground'/>
        </div>
        <ScrollArea>
            <div className='flex flex-col gap-y-4'>
                {filtereData.map((item)=>{
                    return(
                        <div key={item.start_ts} className='flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border'>
                            <div className='flex gap-x-2 items-center'>
                                <Avatar className='size-6'>
                                    <AvatarImage alt='user avatar'
                                    src={item.user.image??generateAvatarUri({seed:item.user.name,variant:'initials'})}/>
                                </Avatar>
                                <p className='text-sm font-medium'>{item.user.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    </div>
  )
}

export default Transcript