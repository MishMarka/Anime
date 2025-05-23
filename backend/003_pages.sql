-- Create pages table for manga pages
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chart_id UUID NOT NULL REFERENCES charts(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL CHECK (page_number > 0),
    text_content TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create unique constraint to ensure page numbers are unique within a chart
CREATE UNIQUE INDEX idx_pages_chart_id_page_number ON pages(chart_id, page_number);

-- Create index for faster lookups
CREATE INDEX idx_pages_chart_id ON pages(chart_id);