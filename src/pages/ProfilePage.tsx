import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription, subscriptionPlans } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut, Crown, Check, User, Settings, Star } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentLanguage } = useLanguage();
  const { user, signOut, loading: authLoading } = useAuth();
  const { subscription, expiresAt, getCurrentPlan, loading: subLoading } = useSubscription();
  const currentLang = getCurrentLanguage();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Erfolgreich abgemeldet');
    navigate('/auth');
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') return;
    toast.info('Zahlungssystem wird bald verfügbar sein!');
  };

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header title="Profil" />
        <main className="max-w-md mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Nicht angemeldet</h2>
            <p className="text-muted-foreground mb-6">Melde dich an, um deinen Fortschritt zu speichern</p>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-primary text-primary-foreground"
            >
              Anmelden / Registrieren
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const currentPlan = getCurrentPlan();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Profil" />

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {user.user_metadata?.full_name || 'Benutzer'}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Current Subscription */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Aktuelles Abo</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">{currentPlan.name}</p>
                {expiresAt && subscription !== 'free' && (
                  <p className="text-sm text-muted-foreground">
                    Gültig bis: {expiresAt.toLocaleDateString('de-DE')}
                  </p>
                )}
              </div>
              {subscription !== 'free' && (
                <span className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                  Aktiv
                </span>
              )}
            </div>
          </div>

          {/* Subscription Plans */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Tarife
            </h3>
            <div className="space-y-3">
              {subscriptionPlans.filter(p => p.id !== 'free').map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-card rounded-xl p-4 border-2 transition-all ${
                    plan.popular 
                      ? 'border-primary shadow-lg' 
                      : 'border-border'
                  } ${subscription === plan.id ? 'ring-2 ring-success' : ''}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Beliebt
                    </span>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{plan.name}</h4>
                      <p className="text-2xl font-bold text-foreground">
                        €{plan.price}
                        <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                      </p>
                    </div>
                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      variant={subscription === plan.id ? "outline" : "default"}
                      className={subscription === plan.id ? 'border-success text-success' : 'bg-primary text-primary-foreground'}
                      disabled={subscription === plan.id}
                    >
                      {subscription === plan.id ? 'Aktiv' : 'Wählen'}
                    </Button>
                  </div>
                  
                  <ul className="space-y-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Language setting */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Übersetzungssprache</h3>
            </div>
            <LanguageSelector />
          </div>

          {/* Stats placeholder */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-3">Statistik</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Abgeschlossen</div>
              </div>
              <div className="text-center p-3 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-foreground">108</div>
                <div className="text-xs text-muted-foreground">Gesamt</div>
              </div>
            </div>
          </div>

          {/* Current language display */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Aktuelle Einstellungen</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentLang.flag}</span>
              <span className="text-foreground">{currentLang.name}</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
