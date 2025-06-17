export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

interface Database {
  public: {
    Tables: {
      archived_applications: {
        Row: {
          id: string;
          original_application_id: string;
          full_name: string;
          email: string;
          phone: string | null;
          dob: string | null;
          gender: string | null;
          nationality: string | null;
          documents: any | null;
          status: string | null;
          created_at: string | null;
          approved_by: string | null;
          approved_at: string | null;
          notes: string | null;
          priority: string | null;
          assigned_to: string | null;
          deadline: string | null;
          last_activity: string | null;
          metadata: any | null;
          archived_at: string | null;
          archived_by: string | null;
          archived_reason: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
        };
      };
    };
  };
} 