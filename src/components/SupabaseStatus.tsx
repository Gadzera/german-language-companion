import React from 'react';
import { isSupabaseConfigured } from '@/lib/supabase-safe';
import { AlertTriangle } from 'lucide-react';

export const SupabaseStatus: React.FC = () => {
  if (isSupabaseConfigured()) {
    return null;
  }

  return (
    <div className="bg-warning/10 border-b border-warning/20 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center gap-2 text-warning text-sm">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          Demo-Modus: Backend ist nicht konfiguriert. Einige Funktionen sind eingeschränkt.
        </span>
      </div>
    </div>
  );
};
