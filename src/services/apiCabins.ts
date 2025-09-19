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
    const imageName = `${Math.random()}-${cabin.image.name}`.replace(/\//g, '')
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, cabin.image)

    if (storageError) {
        throw new Error("Cabin image could not be uploaded");
    }

    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...cabin, image: imagePath }])
        .select()
        .single()

    if (error) {
        await supabase.storage.from('cabin-images').remove([imageName])
        throw new Error("Cabin could not be created");
    }

    return data;
}

export async function updateCabin({ id, ...cabin }: UpdateCabinProps): Promise<Cabin> {
    let imagePath = cabin.image;

    if (cabin.image instanceof File) {
        await deleteCabinImage(id)
        const imageName = `${Math.random()}-${cabin.image.name}`.replace(/\//g, '')
        imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

        const { error: storageError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, cabin.image)

        if (storageError) {
            throw new Error("Cabin image could not be uploaded");
        }
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
        const imageName = cabin.image.split('/').pop();
        if (imageName) {
            await supabase
                .storage
                .from('cabin-images')
                .remove([imageName])
        }
    }
}