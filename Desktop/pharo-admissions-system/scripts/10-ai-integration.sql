-- AI and Machine Learning Integration Tables

-- Create AI predictions table for application scoring
CREATE TABLE IF NOT EXISTS ai_predictions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    prediction_type TEXT NOT NULL CHECK (prediction_type IN ('approval_score', 'risk_assessment', 'document_verification', 'fraud_detection')),
    score DECIMAL(5,4) NOT NULL CHECK (score >= 0 AND score <= 1),
    confidence DECIMAL(5,4) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    factors JSONB DEFAULT '{}'::jsonb,
    model_version TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Create chatbot conversations table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    application_id UUID REFERENCES applications(id),
    message_type TEXT NOT NULL CHECK (message_type IN ('user', 'bot', 'system')),
    message TEXT NOT NULL,
    intent TEXT,
    confidence DECIMAL(5,4),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document analysis table
CREATE TABLE IF NOT EXISTS document_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    document_url TEXT NOT NULL,
    document_type TEXT NOT NULL,
    analysis_status TEXT DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'failed')),
    extracted_text TEXT,
    confidence_score DECIMAL(5,4),
    validation_results JSONB DEFAULT '{}'::jsonb,
    anomalies JSONB DEFAULT '[]'::jsonb,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create smart recommendations table
CREATE TABLE IF NOT EXISTS smart_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('approval', 'rejection', 'interview', 'additional_docs')),
    reasoning TEXT NOT NULL,
    confidence DECIMAL(5,4) NOT NULL,
    supporting_factors JSONB DEFAULT '[]'::jsonb,
    risk_factors JSONB DEFAULT '[]'::jsonb,
    created_by TEXT DEFAULT 'ai_system',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow automation rules
CREATE TABLE IF NOT EXISTS automation_rules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    trigger_conditions JSONB NOT NULL,
    actions JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 5,
    execution_count INTEGER DEFAULT 0,
    last_executed TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view AI predictions" ON ai_predictions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System can manage AI predictions" ON ai_predictions
    FOR ALL USING (true);

CREATE POLICY "Users can view their chatbot conversations" ON chatbot_conversations
    FOR SELECT USING (user_id = auth.uid() OR auth.role() = 'authenticated');

CREATE POLICY "System can manage chatbot conversations" ON chatbot_conversations
    FOR ALL USING (true);

CREATE POLICY "Users can view document analysis" ON document_analysis
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System can manage document analysis" ON document_analysis
    FOR ALL USING (true);

CREATE POLICY "Users can view smart recommendations" ON smart_recommendations
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage automation rules" ON automation_rules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'principal')
        )
    );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_predictions_application_id ON ai_predictions(application_id);
CREATE INDEX IF NOT EXISTS idx_ai_predictions_type_score ON ai_predictions(prediction_type, score);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_session ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_document_analysis_application_id ON document_analysis(application_id);
CREATE INDEX IF NOT EXISTS idx_smart_recommendations_application_id ON smart_recommendations(application_id);
CREATE INDEX IF NOT EXISTS idx_automation_rules_active ON automation_rules(is_active);
