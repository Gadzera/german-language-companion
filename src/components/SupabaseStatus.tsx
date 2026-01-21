import { isSupabaseConfigured } from '@/lib/supabase-config';

interface SupabaseStatusProps {
  children: React.ReactNode;
  showWarning?: boolean;
}

/**
 * Wrapper component that checks Supabase configuration status
 * Shows a warning banner if Supabase is not configured
 */
export const SupabaseStatus: React.FC<SupabaseStatusProps> = ({ 
  children, 
  showWarning = false 
}) => {
  const configured = isSupabaseConfigured();

  return (
    <>
      {!configured && showWarning && (
        <div className="bg-warning/10 border-b border-warning/20 px-4 py-2 text-center text-sm text-warning-foreground">
          ⚠️ Backend not configured. Some features may be unavailable.
        </div>
      )}
      {children}
    </>
  );
};

export default SupabaseStatus;
