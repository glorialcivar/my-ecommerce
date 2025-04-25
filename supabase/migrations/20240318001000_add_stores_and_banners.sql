-- Add image_url column to categories if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'categories' 
                  AND column_name = 'image_url') THEN
        ALTER TABLE categories ADD COLUMN image_url VARCHAR(255);
    END IF;
END $$;

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add triggers for updated_at
CREATE TRIGGER set_stores_updated_at
    BEFORE UPDATE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_banners_updated_at
    BEFORE UPDATE ON banners
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Add triggers for created_at
CREATE TRIGGER set_stores_created_at
    BEFORE INSERT ON stores
    FOR EACH ROW
    EXECUTE FUNCTION handle_created_at();

CREATE TRIGGER set_banners_created_at
    BEFORE INSERT ON banners
    FOR EACH ROW
    EXECUTE FUNCTION handle_created_at();

-- Insert sample data
INSERT INTO stores (name, address, phone) VALUES
    ('Nestora Central', 'Av. Amazonas N34-451 y Av. Atahualpa, Quito', '1800-0223-441'),
    ('Nestora Norte', 'Av. 6 de Diciembre N47-203, Quito', '1800-0223-442'),
    ('Nestora Sur', 'Av. Rodrigo de Chávez Oe3-150, Quito', '1800-0223-443');

INSERT INTO banners (title, description, image_url, link_url) VALUES
    ('Mother''s Day Magic', 'Affordable gifts for every kind of Mom', 'https://images.unsplash.com/photo-1520342868574-5fa3804e551c', '/collections/mothers-day'),
    ('Book Lovers Sales', 'Discover our curated collection of vintage books', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570', '/collections/books'),
    ('Handmade Crafts', 'Support local artisans and their unique creations', 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b', '/collections/handmade');

-- Update categories with new data
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1514866726862-0f081731e63f' WHERE slug = 'tumblers-and-glasses';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f' WHERE slug = 'digital-art';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1630019852942-f89202989a59' WHERE slug = 'earrings';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b' WHERE slug = 'craft-supplies';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69' WHERE slug = 'stickers';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38' WHERE slug = 'prints';

-- Insert new categories if they don't exist
INSERT INTO categories (name, description, slug, image_url)
SELECT 'Tumblers and water glasses', 'Handcrafted drinkware for your daily rituals', 'tumblers-and-glasses', 'https://images.unsplash.com/photo-1514866726862-0f081731e63f'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'tumblers-and-glasses');

INSERT INTO categories (name, description, slug, image_url)
SELECT 'Digital drawings and illustrations', 'Unique digital art pieces from local artists', 'digital-art', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'digital-art');

INSERT INTO categories (name, description, slug, image_url)
SELECT 'Dangle and drop earrings', 'Statement earrings for every occasion', 'earrings', 'https://images.unsplash.com/photo-1630019852942-f89202989a59'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'earrings');

INSERT INTO categories (name, description, slug, image_url)
SELECT 'Craft supplies and tools', 'Everything you need for your DIY projects', 'craft-supplies', 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'craft-supplies');

INSERT INTO categories (name, description, slug, image_url)
SELECT 'Stickers', 'Decorative stickers for any surface', 'stickers', 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'stickers');

INSERT INTO categories (name, description, slug, image_url)
SELECT 'Prints', 'Wall art and decorative prints', 'prints', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'prints'); 