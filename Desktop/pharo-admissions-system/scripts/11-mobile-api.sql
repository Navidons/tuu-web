-- Mobile API and Progressive Web App Support

-- Create mobile sessions table
CREATE TABLE IF NOT EXISTS mobile_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    device_id TEXT NOT NULL,
    device_type TEXT NOT NULL CHECK (device_type IN ('ios', 'android', 'web')),
    app_version TEXT,
    push_token TEXT,
    is_active BOOLEAN DEFAULT true,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offline sync queue
CREATE TABLE IF NOT EXISTS offline_sync_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action_type TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    data JSONB NOT NULL,
    sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'failed')),
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE
);

-- Create push notifications table
CREATE TABLE IF NOT EXISTS push_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
    scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    delivery_receipt JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create API rate limiting table
CREATE TABLE IF NOT EXISTS api_rate_limits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_blocked BOOLEAN DEFAULT false,
    blocked_until TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE mobile_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their mobile sessions" ON mobile_sessions
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can manage their sync queue" ON offline_sync_queue
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view their push notifications" ON push_notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can manage push notifications" ON push_notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their rate limits" ON api_rate_limits
    FOR SELECT USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mobile_sessions_user_device ON mobile_sessions(user_id, device_id);
CREATE INDEX IF NOT EXISTS idx_offline_sync_queue_user_status ON offline_sync_queue(user_id, sync_status);
CREATE INDEX IF NOT EXISTS idx_push_notifications_user_status ON push_notifications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_api_rate_limits_user_endpoint ON api_rate_limits(user_id, endpoint);
