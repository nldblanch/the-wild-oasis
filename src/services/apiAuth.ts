import { UserAttributes } from "@supabase/supabase-js";
import type { Credentials, SignupCredentials, UpdateUserProps } from "../types";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ""
      }
    }
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: Credentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getAuthenticatedUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar
}: UpdateUserProps) {
  const updateData: UserAttributes = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const { id } = data.user;

  const fileName = `avatar-${id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }
  });

  if (error2) throw new Error(error2.message);

  if (data.user.user_metadata.avatar)
    await deleteAvatar(data.user.user_metadata.avatar);

  return updatedUser;
}

async function deleteAvatar(avatar: string): Promise<void> {
  const imageName = avatar.split("/").pop();
  if (!imageName) return;
  await supabase.storage.from("avatars").remove([imageName]);
}
