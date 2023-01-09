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
          created_at: string | null;
          type: string;
          title: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          type: string;
          title?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          type?: string;
          title?: string;
          user_id?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          date: string;
          type: string;
          title: string;
          entity: string | null;
          account: string;
          amount: number;
        };
        Insert: {
          id?: string;
          date?: string;
          type: string;
          title?: string;
          entity?: string | null;
          account: string;
          amount?: number;
        };
        Update: {
          id?: string;
          date?: string;
          type?: string;
          title?: string;
          entity?: string | null;
          account?: string;
          amount?: number;
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
