import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://sqbolqabkceodcvmafyq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxYm9scWFia2Nlb2Rjdm1hZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxODQ4ODksImV4cCI6MjA3Mzc2MDg4OX0.9EzJCvs9rP4Oh2mliKq3tbrgZTr8AFBplLri5CNahcQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
