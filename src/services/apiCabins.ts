import supabase, { supabaseUrl } from "./supabase";
import { Cabin, CreateCabinProps, UpdateCabinProps } from "../types";

export async function getCabins(): Promise<Cabin[]> {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data as Cabin[];
}

export async function createCabin(cabin: CreateCabinProps): Promise<Cabin> {
    let imagePath: string

    if (cabin.image instanceof File) {
        imagePath = await uploadImage(cabin.image)
    } else {
        imagePath = cabin.image
    }


    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...cabin, image: imagePath }])
        .select()
        .single()

    if (error) {
        if (cabin.image instanceof File) {
            const imageName = getImageNameFromPath(imagePath)
            if (imageName) {
                await supabase.storage.from('cabin-images').remove([imageName])
            }
        }
        throw new Error("Cabin could not be created");
    }

    return data;
}

export async function updateCabin({ id, ...cabin }: UpdateCabinProps): Promise<Cabin> {
    let imagePath = cabin.image;

    if (cabin.image instanceof File) {
        await deleteCabinImage(id)
        imagePath = await uploadImage(cabin.image)
    }

    const { data, error } = await supabase
        .from('cabins')
        .update({ ...cabin, image: imagePath })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw new Error("Cabin could not be updated");
    }

    return data;
}

export async function deleteCabin(id: number): Promise<void> {
    await deleteCabinImage(id)

    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }

}

async function getImageReferenceCount(imagePath: string): Promise<number> {
    const { data: cabinsUsingImage } = await supabase.from('cabins').select('id').eq('image', imagePath)

    return cabinsUsingImage?.length || 0
}

async function deleteCabinImage(id: number): Promise<void> {

    const { data: cabin, error: fetchError } = await supabase
        .from('cabins')
        .select('image')
        .eq('id', id)
        .single()

    if (fetchError) {
        console.error(fetchError);
        throw new Error("Cabin could not be found");
    }

    if (cabin.image) {

        await safeDeleteImage(cabin.image)

    }
}

async function safeDeleteImage(imagePath: string): Promise<void> {
    const referenceCount = await getImageReferenceCount(imagePath)

    if (referenceCount <= 1) {
        const imageName = getImageNameFromPath(imagePath)
        if (imageName) {
            await supabase.storage.from('cabin-images').remove([imageName])
        }
    }
}

async function uploadImage(image: File) {

    const imageName = `${Math.random()}-${image.name}`.replace(/\//g, '')
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, image)

    if (storageError) {
        throw new Error("Cabin image could not be uploaded");
    }
    return imagePath
}

function getImageNameFromPath(path: string) {
    const imageName = path.split('/').pop();
    return imageName
}