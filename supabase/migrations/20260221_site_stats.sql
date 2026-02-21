-- ============================================================
-- 1. Create the table
-- ============================================================
CREATE TABLE IF NOT EXISTS site_stats (
  id         BIGSERIAL PRIMARY KEY,
  page_slug  TEXT UNIQUE NOT NULL,
  view_count BIGINT NOT NULL DEFAULT 0
);

-- ============================================================
-- 2. Seed the portfolio row (idempotent)
-- ============================================================
INSERT INTO site_stats (page_slug, view_count)
VALUES ('portfolio', 0)
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================================
-- 3. Enable Row Level Security (RLS)
--    Default behaviour after this: ALL operations denied.
--    We then grant exactly the minimum required permissions.
-- ============================================================
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS Policies
--
--  a) Allow ANYONE (anon + authenticated) to READ the count.
--     This lets the footer display the number to all visitors.
--
--  b) No direct INSERT / UPDATE / DELETE for anon users.
--     Mutations only happen through the SECURITY DEFINER RPC
--     below, which runs as the table owner and bypasses RLS.
-- ============================================================
CREATE POLICY "public_read_site_stats"
  ON site_stats
  FOR SELECT
  USING (true);

-- ============================================================
-- 5. Atomic increment RPC
--
--  SECURITY DEFINER: runs as the function owner (postgres),
--  bypassing RLS for the UPDATE.  This means:
--    - Anon users CAN call this function (granted below)
--    - Anon users CANNOT update the table directly
--    - Only this function can mutate the count
-- ============================================================
CREATE OR REPLACE FUNCTION increment_view_count(slug TEXT)
RETURNS BIGINT
LANGUAGE SQL
SECURITY DEFINER
-- Restrict search_path to prevent privilege-escalation attacks
SET search_path = public
AS $$
  UPDATE site_stats
  SET    view_count = view_count + 1
  WHERE  page_slug  = slug
  RETURNING view_count;
$$;

-- ============================================================
-- 6. Grant execute on the RPC to the anon role
--    (Supabase uses the "anon" role for requests made with
--     the publishable anon key)
-- ============================================================
GRANT EXECUTE ON FUNCTION increment_view_count(TEXT) TO anon;
