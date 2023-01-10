export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          amount: number;
          type: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name?: string;
          amount?: number;
          type: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          amount?: number;
          type?: string;
          user_id?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          created_at: string;
          type: string;
          amount: number;
          date: string;
          name: string;
          description: string | null;
          entity: string | null;
          account_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          type: string;
          amount: number;
          date?: string;
          name: string;
          description?: string | null;
          entity?: string | null;
          account_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          type?: string;
          amount?: number;
          date?: string;
          name?: string;
          description?: string | null;
          entity?: string | null;
          account_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
