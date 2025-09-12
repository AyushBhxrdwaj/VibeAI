import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import React, {Dispatch, SetStateAction } from 'react'

interface props{
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}

const DashboardCommand = ({open,setOpen}:props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
        placeholder='Find a meeting or agent'/>
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}

export default DashboardCommand