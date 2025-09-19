import toast from "react-hot-toast"
import { createCabin as createCabinApi } from "../../services/apiCabins"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateCabin() {
    const queryClient = useQueryClient()

    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () => {
            toast.success('Cabin successfully created')

            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (error: Error) => toast.error(error.message)
    })

    return { isCreating, createCabin }
}