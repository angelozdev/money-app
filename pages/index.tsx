import React from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import {
  AccountsApi,
  TransactionsApi,
  useAccountApi,
  useTransactionsApi,
} from "@/lib/supabase/api";
import { Button, Card, Loading } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  accounts: Awaited<ReturnType<AccountsApi["getMany"]>>;
  transactionsByAccount: Awaited<
    ReturnType<TransactionsApi["getManyByAccount"]>
  >[];
}

export default function Home({ accounts, transactionsByAccount }: Props) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const accountsApi = useAccountApi();
  const transactionsApi = useTransactionsApi();

  const accountsQuery = useQuery(
    queryKeys.accounts(),
    () => accountsApi.getMany(),
    {
      initialData: accounts,
      staleTime: 1000 * 60 * 60,
    }
  );

  const haveAccounts = accountsQuery.data.length > 0;

  const transactionsQuery = useQuery(
    queryKeys.transactionsByAccounts(
      accountsQuery.data.map((account) => account.id)
    ),
    () =>
      Promise.all(
        accounts.map((account) => transactionsApi.getManyByAccount(account.id))
      ),
    {
      initialData: transactionsByAccount,
      staleTime: 1000 * 60 * 60,
      enabled: haveAccounts,
    }
  );

  const refetch = () => {
    accountsQuery.refetch();
    transactionsQuery.refetch();
  };

  React.useEffect(() => {
    supabase.auth.signInWithPassword({
      email: "fokof17465@cnxcoin.com",
      password: "Admin.1234",
    });
  }, [supabase.auth]);

  if (!user) return <Loading />;

  return (
    <>
      <Head>
        <title>Money App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <h1>Welcome to Next.js!</h1>
        <Button onClick={refetch}>Refetch</Button>

        <ul>
          {accountsQuery.data?.map((account, index) => (
            <Card as="li" key={account.id}>
              <Card.Header>
                <span>
                  {account.name} - {account.amount}
                </span>
              </Card.Header>

              <Card.Body as="ul" css={{ p: "sm", m: 0 }}>
                {transactionsQuery.data[index]?.map((transaction) => (
                  <li key={transaction.id}>
                    {transaction.name} - {transaction.amount} -{" "}
                    {transaction.type}
                  </li>
                ))}
              </Card.Body>
            </Card>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const supabase = createServerSupabaseClient(context);
  const accountsApi = AccountsApi.getInstance(supabase);
  const transactionsApi = TransactionsApi.getInstance(supabase);

  const accounts = await accountsApi.getMany();
  const transactionsByAccount = await Promise.all(
    accounts.map((account) => transactionsApi.getManyByAccount(account.id))
  );

  return {
    props: {
      accounts,
      transactionsByAccount,
    },
  };
};
