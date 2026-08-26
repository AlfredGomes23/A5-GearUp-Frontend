import { useEffect } from "react"
import { toast } from "sonner";

export const useFormToast = ( state: { success: boolean, message: string} ) => {
    useEffect(()=> {
        if(!state.message) return;
        if(state.success) toast.success(state.message);
        else toast.error(state.message)
    }, [state]);
};