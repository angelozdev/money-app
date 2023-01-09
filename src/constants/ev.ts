const EnvironmentVariables = {
  supabase: {
    PROJECT_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    API_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
};

export default EnvironmentVariables;
