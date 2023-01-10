import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

export type TSupabaseClient = SupabaseClient<Database, "public">;

export enum TransactionTypes {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
}

export enum AccountTypes {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  SAVINGS = "SAVINGS",
  PAYMENT = "PAYMENT",
  INVESTMENT = "INVESTMENT",
}
