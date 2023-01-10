import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { TransactionTypes, TSupabaseClient } from "./types";

class TransactionApi {
  private supabase: TSupabaseClient;
  private static instance: TransactionApi | null;

  private constructor(supabase: TSupabaseClient) {
    this.supabase = supabase;
  }

  static getInstance(supabase: TSupabaseClient) {
    if (!this.instance) this.instance = new TransactionApi(supabase);
    return this.instance;
  }

  async getIncomesByAccount(accountId: string) {
    const { data, error } = await this.supabase
      .from("transactions")
      .select("*")
      .eq("account", accountId)
      .eq("type", TransactionTypes.INCOME);

    if (error) throw error;

    return data;
  }

  async getExpensesByAccount(accountId: string) {
    const { data, error } = await this.supabase
      .from("transactions")
      .select("*")
      .eq("account_id", accountId)
      .eq("type", TransactionTypes.EXPENSE);

    if (error) throw error;
    return data;
  }

  async getManyByAccount(accountId: string) {
    const { data, error } = await this.supabase
      .from("transactions")
      .select("*")
      .eq("account_id", accountId)
      .order("date", { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  }
}

export function useTransactionsApi() {
  const supabase = useSupabaseClient();
  const transactionApiRef = React.useRef(TransactionApi.getInstance(supabase));
  return transactionApiRef.current;
}

export default TransactionApi;
