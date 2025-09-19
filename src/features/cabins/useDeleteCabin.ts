import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useDeleteCabin() {
    const queryClient = useQueryClient()
    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success('Cabin successfully deleted')

            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: err => {
            if (err instanceof Error) {
                toast.error(err.message)
            }
            else {
                toast.error('Failed to delete cabin')
            }
        }
    })

    return { isDeleting, deleteCabin }

}

