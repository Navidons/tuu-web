-- Verify Customer Creation Trigger
-- This script checks if the trigger is working and creates a test if needed

-- First, check if the trigger exists
SELECT 'Checking if trigger exists:' as info;
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'trigger_handle_confirmed_paid_booking';

-- Check if customers table exists
SELECT 'Checking if customers table exists:' as info;
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_name = 'customers';

-- Check if customer_booking_history table exists
SELECT 'Checking if customer_booking_history table exists:' as info;
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_name = 'customer_booking_history';

-- Check current customers
SELECT 'Current customers:' as info;
SELECT id, name, email, total_bookings, total_spent, customer_type FROM customers ORDER BY id;

-- Check confirmed and paid bookings
SELECT 'Confirmed and paid bookings:' as info;
SELECT 
    id, 
    booking_reference, 
    customer_name, 
    customer_email, 
    status, 
    payment_status, 
    total_amount,
    created_at
FROM bookings 
WHERE status = 'confirmed' AND payment_status = 'paid'
ORDER BY created_at DESC;

-- Verify and create the customer creation trigger if it doesn't exist
-- This script checks if the trigger exists and creates it if missing

-- First, let's check if the trigger exists
DO $$
BEGIN
    -- Check if the trigger exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'create_customer_on_booking_confirmed'
    ) THEN
        -- Create the function first
        CREATE OR REPLACE FUNCTION create_customer_on_booking_confirmed()
        RETURNS TRIGGER AS $$
        DECLARE
            customer_exists BOOLEAN;
            customer_id INTEGER;
            total_spent DECIMAL(10,2);
            booking_count INTEGER;
            customer_classification TEXT;
        BEGIN
            -- Only proceed if booking is confirmed and paid
            IF NEW.status = 'confirmed' AND NEW.payment_status = 'paid' THEN
                -- Check if customer already exists
                SELECT EXISTS(
                    SELECT 1 FROM customers 
                    WHERE email = NEW.customer_email
                ) INTO customer_exists;
                
                IF customer_exists THEN
                    -- Update existing customer
                    UPDATE customers 
                    SET 
                        total_spent = total_spent + NEW.total_amount,
                        booking_count = booking_count + 1,
                        last_booking_date = NEW.created_at,
                        updated_at = NOW()
                    WHERE email = NEW.customer_email
                    RETURNING id INTO customer_id;
                    
                    -- Update loyalty points
                    UPDATE customers 
                    SET loyalty_points = loyalty_points + FLOOR(NEW.total_amount / 10)
                    WHERE id = customer_id;
                    
                ELSE
                    -- Create new customer
                    INSERT INTO customers (
                        name,
                        email,
                        phone,
                        country,
                        total_spent,
                        booking_count,
                        first_booking_date,
                        last_booking_date,
                        loyalty_points,
                        customer_classification,
                        created_at,
                        updated_at
                    ) VALUES (
                        NEW.customer_name,
                        NEW.customer_email,
                        NEW.customer_phone,
                        NEW.customer_country,
                        NEW.total_amount,
                        1,
                        NEW.created_at,
                        NEW.created_at,
                        FLOOR(NEW.total_amount / 10),
                        CASE 
                            WHEN NEW.total_amount >= 1000 THEN 'Premium'
                            WHEN NEW.total_amount >= 500 THEN 'Gold'
                            ELSE 'Standard'
                        END,
                        NOW(),
                        NOW()
                    ) RETURNING id INTO customer_id;
                END IF;
                
                -- Update customer classification based on total spent
                SELECT 
                    total_spent,
                    booking_count,
                    CASE 
                        WHEN total_spent >= 2000 THEN 'Premium'
                        WHEN total_spent >= 1000 THEN 'Gold'
                        WHEN total_spent >= 500 THEN 'Silver'
                        ELSE 'Standard'
                    END
                INTO total_spent, booking_count, customer_classification
                FROM customers 
                WHERE id = customer_id;
                
                -- Update classification if it changed
                UPDATE customers 
                SET customer_classification = customer_classification
                WHERE id = customer_id;
                
                RAISE NOTICE 'Customer record % for booking %', 
                    CASE WHEN customer_exists THEN 'updated' ELSE 'created' END,
                    NEW.booking_reference;
            END IF;
            
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        -- Create the trigger
        CREATE TRIGGER create_customer_on_booking_confirmed
        AFTER UPDATE ON bookings
        FOR EACH ROW
        EXECUTE FUNCTION create_customer_on_booking_confirmed();
        
        RAISE NOTICE 'Trigger create_customer_on_booking_confirmed created successfully';
    ELSE
        RAISE NOTICE 'Trigger create_customer_on_booking_confirmed already exists';
    END IF;
END $$;

-- Test the trigger by updating a booking to confirmed and paid
-- Uncomment the lines below to test the trigger
/*
UPDATE bookings 
SET status = 'confirmed', payment_status = 'paid' 
WHERE id = (SELECT id FROM bookings LIMIT 1);

-- Check if customer was created
SELECT * FROM customers ORDER BY created_at DESC LIMIT 5;
*/

-- Now test with an existing confirmed and paid booking
SELECT 'Testing trigger with existing confirmed and paid bookings:' as info;

-- Update a confirmed and paid booking to trigger the customer creation
UPDATE bookings 
SET status = 'confirmed', payment_status = 'paid' 
WHERE id = (
    SELECT id FROM bookings 
    WHERE status = 'confirmed' AND payment_status = 'paid' 
    LIMIT 1
);

-- Check if customers were created
SELECT 'Customers after trigger test:' as info;
SELECT id, name, email, total_bookings, total_spent, customer_type FROM customers ORDER BY id;

-- Check customer booking history
SELECT 'Customer booking history:' as info;
SELECT 
    cbh.id,
    c.name as customer_name,
    cbh.booking_reference,
    cbh.tour_title,
    cbh.amount,
    cbh.booking_date,
    cbh.status,
    cbh.payment_status
FROM customer_booking_history cbh
JOIN customers c ON cbh.customer_id = c.id
ORDER BY cbh.booking_date DESC; 