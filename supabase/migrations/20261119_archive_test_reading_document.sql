-- Optional database cleanup. Apply only after verifying the target project.
-- The app already excludes this fixture even if the database is not migrated.
UPDATE public.documents
SET status = 'archived'
WHERE slug = 'test-reading-document'
  AND status = 'published';
