import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hidlkklhoppegvxwdcrz.supabase.co";
const supabaseAnonKey = "sb_publishable_PBqG9Ox3j19VtyEM-WRvIQ_VTIe6klo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
