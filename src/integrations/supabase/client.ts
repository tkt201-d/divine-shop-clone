// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jlccgoisqkttursueaul.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsY2Nnb2lzcWt0dHVyc3VlYXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjMyMTUsImV4cCI6MjA1ODYzOTIxNX0.QccLEjuh2PX351L89y7LdUzu-KDP0mQjAL_bX6TfTwA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);