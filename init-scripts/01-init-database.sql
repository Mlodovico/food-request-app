-- Create tables for food request application

-- Food Items table
CREATE TABLE food_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food Requests table
CREATE TABLE food_requests (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food Request Items table (many-to-many relationship)
CREATE TABLE food_request_items (
    id SERIAL PRIMARY KEY,
    food_request_id VARCHAR(50) NOT NULL,
    food_item_id VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (food_request_id) REFERENCES food_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES food_items(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO food_items (id, name, description, price, category) VALUES
('ITEM-001', 'Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and basil', 12.99, 'Pizza'),
('ITEM-002', 'Pepperoni Pizza', 'Pizza topped with pepperoni and mozzarella cheese', 14.99, 'Pizza'),
('ITEM-003', 'Caesar Salad', 'Fresh romaine lettuce with caesar dressing and croutons', 8.99, 'Salad'),
('ITEM-004', 'Chicken Burger', 'Grilled chicken breast with lettuce, tomato, and mayo', 11.99, 'Burger'),
('ITEM-005', 'Chocolate Cake', 'Rich chocolate cake with chocolate frosting', 6.99, 'Dessert');

-- Create indexes for better performance
CREATE INDEX idx_food_items_category ON food_items(category);
CREATE INDEX idx_food_requests_customer ON food_requests(customer_id);
CREATE INDEX idx_food_requests_status ON food_requests(status);
CREATE INDEX idx_food_request_items_request ON food_request_items(food_request_id);
CREATE INDEX idx_food_request_items_item ON food_request_items(food_item_id);
