import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { z } from 'zod';
import { Turnstile, useVerifyTurnstile } from '@/components/Turnstile';

const emailSchema = z.string().email('Ungültige E-Mail-Adresse');
const passwordSchema = z.string().min(6, 'Passwort muss mindestens 6 Zeichen haben');

type AuthMode = 'login' | 'register' | 'forgot' | 'reset';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword, user, loading } = useAuth();
  const { verify: verifyTurnstile } = useVerifyTurnstile();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const hasTurnstile = !!import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'reset') {
      setMode('reset');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Reset turnstile token when mode changes
  useEffect(() => {
    setTurnstileToken(null);
  }, [mode]);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    toast.error('Captcha-Fehler. Bitte versuche es erneut.');
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const validateForm = (): boolean => {
    try {
      emailSchema.parse(email);
    } catch {
      toast.error('Ungültige E-Mail-Adresse');
      return false;
    }

    if (mode !== 'forgot') {
      try {
        passwordSchema.parse(password);
      } catch {
        toast.error('Passwort muss mindestens 6 Zeichen haben');
        return false;
      }
    }

    if (mode === 'register' && password !== confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      return false;
    }

    // Require turnstile for registration if configured
    if (mode === 'register' && hasTurnstile && !turnstileToken) {
      toast.error('Bitte bestätige das Captcha');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Verify turnstile on register if configured
      if (mode === 'register' && hasTurnstile && turnstileToken) {
        const isValid = await verifyTurnstile(turnstileToken);
        if (!isValid) {
          toast.error('Captcha-Verifizierung fehlgeschlagen');
          setTurnstileToken(null);
          setIsSubmitting(false);
          return;
        }
      }

      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Ungültige E-Mail oder Passwort');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Erfolgreich angemeldet!');
          navigate('/');
        }
      } else if (mode === 'register') {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Diese E-Mail ist bereits registriert');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Erfolgreich registriert!');
          navigate('/');
        }
      } else if (mode === 'forgot') {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Passwort-Reset-Link wurde gesendet!');
          setMode('login');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 text-center border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">🇩🇪 Deutsch Quiz</h1>
        <p className="text-sm text-muted-foreground">Lerne Deutsch spielerisch</p>
      </div>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              {mode === 'login' && 'Anmelden'}
              {mode === 'register' && 'Registrieren'}
              {mode === 'forgot' && 'Passwort vergessen'}
              {mode === 'reset' && 'Neues Passwort'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Dein Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <Label htmlFor="password">Passwort</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              )}

              {mode === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Turnstile Captcha - only on registration */}
                  <Turnstile
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                  />
                </>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary text-primary-foreground"
                disabled={isSubmitting || (mode === 'register' && hasTurnstile && !turnstileToken)}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></span>
                    Laden...
                  </span>
                ) : (
                  <>
                    {mode === 'login' && 'Anmelden'}
                    {mode === 'register' && 'Registrieren'}
                    {mode === 'forgot' && 'Link senden'}
                    {mode === 'reset' && 'Passwort ändern'}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              {mode === 'login' && (
                <>
                  <button
                    onClick={() => setMode('forgot')}
                    className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Passwort vergessen?
                  </button>
                  <div className="text-center text-sm text-muted-foreground">
                    Noch kein Konto?{' '}
                    <button
                      onClick={() => setMode('register')}
                      className="text-primary font-medium hover:underline"
                    >
                      Registrieren
                    </button>
                  </div>
                </>
              )}

              {mode === 'register' && (
                <div className="text-center text-sm text-muted-foreground">
                  Bereits registriert?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-primary font-medium hover:underline"
                  >
                    Anmelden
                  </button>
                </div>
              )}

              {mode === 'forgot' && (
                <button
                  onClick={() => setMode('login')}
                  className="w-full text-sm text-primary hover:underline"
                >
                  ← Zurück zur Anmeldung
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
