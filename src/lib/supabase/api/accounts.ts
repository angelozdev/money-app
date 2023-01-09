import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

type TSupabaseClient = SupabaseClient<Database, "public">;

export async function getMany(supabase: TSupabaseClient) {
  const { data, error } = await supabase.from("accounts").select("*");
  if (error) throw new Error(error.message);
  return data;
}
