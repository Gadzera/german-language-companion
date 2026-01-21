import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase-config';

export type SubscriptionType = 'free' | 'weekly' | 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: SubscriptionType;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Kostenlos',
    price: 0,
    period: '',
    features: [
      '3 Quizze pro Tag',
      'Grundlegende Statistiken',
      'Werbung anzeigen',
    ],
  },
  {
    id: 'weekly',
    name: 'Woche',
    price: 2.99,
    period: '/Woche',
    features: [
      'Unbegrenzte Quizze',
      'Alle Statistiken',
      'Keine Werbung',
      'Prioritäts-Support',
    ],
  },
  {
    id: 'monthly',
    name: 'Monat',
    price: 7.99,
    period: '/Monat',
    features: [
      'Unbegrenzte Quizze',
      'Alle Statistiken',
      'Keine Werbung',
      'Prioritäts-Support',
      'Offline-Modus',
    ],
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Jahr',
    price: 59.99,
    period: '/Jahr',
    features: [
      'Alles aus Monat',
      '2 Monate kostenlos',
      'Exklusive Inhalte',
      'Früher Zugang zu neuen Features',
    ],
  },
];

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionType>('free');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase is not configured, return free plan immediately
    if (!isSupabaseConfigured()) {
      setSubscription('free');
      setExpiresAt(null);
      setLoading(false);
      return;
    }

    if (!user) {
      setSubscription('free');
      setExpiresAt(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('subscription_type, subscription_expires_at')
          .eq('user_id', user.id)
          .single();

        if (!error && data) {
          setSubscription((data.subscription_type as SubscriptionType) || 'free');
          setExpiresAt(data.subscription_expires_at ? new Date(data.subscription_expires_at) : null);
        }
      } catch (err) {
        console.warn('[useSubscription] Failed to fetch subscription:', err);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [user]);

  const isActive = () => {
    if (subscription === 'free') return true;
    if (!expiresAt) return false;
    return new Date() < expiresAt;
  };

  const getCurrentPlan = () => {
    return subscriptionPlans.find(p => p.id === subscription) || subscriptionPlans[0];
  };

  return {
    subscription,
    expiresAt,
    loading,
    isActive,
    getCurrentPlan,
    plans: subscriptionPlans,
  };
}
