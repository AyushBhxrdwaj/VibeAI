import React from 'react'
import { meetingStatus } from '../../types'
import { CircleCheckIcon, CircleXIcon, ClockArrowUp, LoaderIcon, VideoIcon } from 'lucide-react'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import CommandSelect from './command-select'

const options=[
    {
        id:meetingStatus.Upcoming,
        value:meetingStatus.Upcoming,
        children:(
            <div className='flex items-center gap-x-2 capitalize'>
                <ClockArrowUp/>
                {meetingStatus.Upcoming}
            </div>
        )

    },
    {

        id:meetingStatus.Completed,
        value:meetingStatus.Completed,
        children:(
            <div className='flex items-center gap-x-2 capitalize'>
                <CircleCheckIcon/>
                {meetingStatus.Completed}
            </div>
        )
    },
    {

        id:meetingStatus.Active,
        value:meetingStatus.Active,
        children:(
            <div className='flex items-center gap-x-2 capitalize'>
                <VideoIcon/>
                {meetingStatus.Active}
            </div>
        )
    },
    {

        id:meetingStatus.Processing,
        value:meetingStatus.Processing,
        children:(
            <div className='flex items-center gap-x-2 capitalize'>
                <LoaderIcon/>
                {meetingStatus.Processing}
            </div>
        )
    },
    {

        id:meetingStatus.Cancelled,
        value:meetingStatus.Cancelled,
        children:(
            <div className='flex items-center gap-x-2 capitalize'>
                <CircleXIcon/>
                {meetingStatus.Cancelled}
            </div>
        )
    }
]

const StatusFilter = () => {
    const [filters,setFilters]=useMeetingsFilters();
  return (
    <CommandSelect placeholder='status' className='h-9' options={options} onSelect={(value)=>setFilters({status:value as meetingStatus})} value={filters.status || ""}/>
  )
}

export default StatusFilter