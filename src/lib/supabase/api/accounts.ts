import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { TSupabaseClient } from "./types";

class AccountsApi {
  private supabase: TSupabaseClient;
  private static instance: AccountsApi | null;

  private constructor(supabase: TSupabaseClient) {
    this.supabase = supabase;
  }

  static getInstance(supabase: TSupabaseClient) {
    if (!this.instance) this.instance = new AccountsApi(supabase);
    return this.instance;
  }

  async getMany() {
    const { data, error } = await this.supabase.from("accounts").select("*");

    if (error) throw error;
    return data;
  }
}

export function useAccountApi() {
  const supabase = useSupabaseClient();
  const accountApiRef = React.useRef(AccountsApi.getInstance(supabase));
  return accountApiRef.current;
}

export default AccountsApi;
