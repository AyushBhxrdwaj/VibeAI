import ResponsiveDialog from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import React, { JSX, useState } from 'react'

const useConfirm = (title:string,desc:string):[()=>JSX.Element,()=>Promise<unknown>] => {
    const [promise, setpromise] = useState<{
        resolve:(value:boolean)=>void;
    }|null>(null)
    const confirm=()=>{
        return new Promise((resolve)=>{
            setpromise({resolve})
        })
    }
    const handleClose=()=>{
        setpromise(null)
    };
    const handleConfirm=()=>{
        promise?.resolve(true);
        handleClose();
    };
    const handleCancel=()=>{
        promise?.resolve(false);
        handleClose();
    }
    const conformationDialog=()=>(
        <ResponsiveDialog open={promise!=null}
        onOpenChange={handleClose}
        title={title}
        description={desc}>
            <div className='pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end '>
                <Button onClick={handleCancel} variant={'outline'} className='w-full lg:w-auto'>Cancel</Button>
                <Button onClick={handleConfirm}  className='w-full lg:w-auto'>Confirm</Button>
            </div>

        </ResponsiveDialog>


    )

return [conformationDialog,confirm]
}

export default useConfirm