import ResponsiveDialog from '@/components/responsive-dialog'
import React from 'react'

interface props{
    open:boolean,
    onOpenChange:(open:boolean)=>void,
}
const NewMeetingDialog = ({open,onOpenChange}:props) => {
  return (
    <ResponsiveDialog title='New Meeting' description='Create a new meeting' open={open} onOpenChange={onOpenChange}>
        To do meeting form
    </ResponsiveDialog>
  )
}

export default NewMeetingDialog