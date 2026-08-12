const SUPABASE_URL = "https://mzocomoeznxsrrkewtbk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_RurkJMX0wkN12_d7tnOpTg_4TJsVOiw";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

window.supabaseClient = supabaseClient;