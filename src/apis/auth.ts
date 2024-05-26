// src/auth/auth.ts
import { createClient, AuthChangeEvent, AuthResponse, User } from '@supabase/supabase-js';
import { fetchUserMovieStatus } from './userinfo';

const supabaseUrl = process.env.SUPABASE_URL || ''; // 환경변수 설정 필요
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''; // 환경변수 설정 필요
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SessionData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

let sessionData: SessionData | null = null;

supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: any) => {
  if (session) {
    sessionData = {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      userId: session.user.id,
    };
  } else {
    sessionData = null;
  }
});

function saveTokenDataToStorage(tokenData: SessionData): void {
    localStorage.setItem('token_data', JSON.stringify(tokenData));
}

export async function signIn(email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error logging in:', error.message);
    return false;
  } else {
    fetchUserMovieStatus(sessionData?.userId ?? '');
    if(sessionData){
        saveTokenDataToStorage(sessionData);
    }
    return true;
  }
}

export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      localStorage.removeItem('token_data');
      sessionData = null;
      console.log('Token invalidated and local storage cleared.');
    }
}

export async function signUp(email: string, password: string): Promise<boolean> {
    try {
      const { data, error }: AuthResponse = await supabase.auth.signUp({ email, password });
  
      if (error) {
        console.error('Error signing up:', error.message);
        return false;
      }
  
      if (data && data.user) {
        console.log('User signed up successfully:', data.user);
        return true;
      }
  
      return false;
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      return false;
    }
  }

function getTokenDataFromStorage(): SessionData | null {
  const storedData = localStorage.getItem('token_data');
  return storedData ? JSON.parse(storedData) : null;
}

export function getUserId(): string | undefined {
  const tokenData = getTokenDataFromStorage();
  return tokenData?.userId;
}

export function getSessionData(): SessionData | null {
  return getTokenDataFromStorage();
}

export function isAuthenticated(): boolean {
  return !!getTokenDataFromStorage();
}


