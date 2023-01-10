const queryKeys = {
  accounts: () => ["accounts"],
  transactionsByAccounts: (ids: string[]) => [
    "transactions",
    "byAccounts",
    ids,
  ],
};

export default queryKeys;
