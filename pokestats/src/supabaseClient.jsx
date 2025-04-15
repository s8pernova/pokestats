import { createClient } from "@supabase/supabase-js";

const URL = "https://ccxmwlrczjtyalnwwcrq.supabase.co";
const API_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjeG13bHJjemp0eWFsbnd3Y3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3Mjc0NDQsImV4cCI6MjA2MDMwMzQ0NH0.484yxfNA9rjgfcxNvPoiPkSY9PBTWhRtcG6lSABbQVI";

export const supabase = createClient(URL, API_KEY);
