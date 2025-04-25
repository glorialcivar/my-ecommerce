-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id UUID REFERENCES categories(id),
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO stores (name, address, phone) VALUES
    ('Nestora Central', 'Av. Amazonas N34-451 y Av. Atahualpa, Quito', '1800-0223-441'),
    ('Nestora Norte', 'Av. 6 de Diciembre N47-203, Quito', '1800-0223-442'),
    ('Nestora Sur', 'Av. Rodrigo de Chávez Oe3-150, Quito', '1800-0223-443');

INSERT INTO banners (title, description, image_url, link_url) VALUES
    ('Mother''s Day Magic', 'Affordable gifts for every kind of Mom', 'https://i.ibb.co/mothers-day-banner.jpg', '/collections/mothers-day'),
    ('Book Lovers Sales', 'Discover our curated collection of vintage books', 'https://i.ibb.co/book-lovers-banner.jpg', '/collections/books'),
    ('Handmade Crafts', 'Support local artisans and their unique creations', 'https://i.ibb.co/handmade-crafts-banner.jpg', '/collections/handmade');

INSERT INTO categories (name, description, slug, image_url) VALUES
    ('Tumblers and water glasses', 'Handcrafted drinkware for your daily rituals', 'tumblers-and-glasses', 'https://i.ibb.co/tumblers-category.jpg'),
    ('Digital drawings and illustrations', 'Unique digital art pieces from local artists', 'digital-art', 'https://i.ibb.co/digital-art-category.jpg'),
    ('Dangle and drop earrings', 'Statement earrings for every occasion', 'earrings', 'https://i.ibb.co/earrings-category.jpg'),
    ('Craft supplies and tools', 'Everything you need for your DIY projects', 'craft-supplies', 'https://i.ibb.co/craft-supplies-category.jpg'),
    ('Stickers', 'Decorative stickers for any surface', 'stickers', 'https://i.ibb.co/stickers-category.jpg'),
    ('Prints', 'Wall art and decorative prints', 'prints', 'https://i.ibb.co/prints-category.jpg');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to all tables
CREATE TRIGGER update_stores_updated_at
    BEFORE UPDATE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at
    BEFORE UPDATE ON banners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 