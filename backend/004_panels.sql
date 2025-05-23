-- Create panels table for manga panels
CREATE TABLE panels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    panel_number INTEGER NOT NULL CHECK (panel_number > 0),
    image_url TEXT,
    text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create unique constraint to ensure panel numbers are unique within a page
CREATE UNIQUE INDEX idx_panels_page_id_panel_number ON panels(page_id, panel_number);

-- Create index for faster lookups
CREATE INDEX idx_panels_page_id ON panels(page_id);