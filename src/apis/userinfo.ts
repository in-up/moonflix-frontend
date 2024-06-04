// src/auth/userInfo.ts
import { createClient, PostgrestResponse, PostgrestError } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''; // 환경변수 설정 필요
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // 환경변수 설정 필요
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UserMovieStatus {
  user_id: string;
  movie_id: number;
  status: string;
  user_name: string;
}

const USER_INFO_KEY = 'user_movie_status';

let cachedUserMovieStatus: UserMovieStatus | null = null;

export async function fetchUserMovieStatus(userId: string): Promise<UserMovieStatus | null> {
  try {
    const storedUserMovieStatus = localStorage.getItem(USER_INFO_KEY);
    if (storedUserMovieStatus) {
      cachedUserMovieStatus = JSON.parse(storedUserMovieStatus);
      return cachedUserMovieStatus;
    }

    const { data, error }: PostgrestResponse<UserMovieStatus> = await supabase
      .from('userdata')
      .select('user_id, movie_id, status, user_name')
      .eq('user_id', userId);

    if (error) {
      const supabaseError = error as PostgrestError;
      console.error('Error fetching user movie status:', supabaseError.message);
      return null;
    }

    cachedUserMovieStatus = data ? data[0] : null;
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(cachedUserMovieStatus));
    return cachedUserMovieStatus;
  } catch (error: any) {
    console.error('Error fetching user movie status:', error.message);
    return null;
  }
}

export function getUserId(): string | null {
    const storedUserMovieStatus = localStorage.getItem(USER_INFO_KEY);
    cachedUserMovieStatus = storedUserMovieStatus ? JSON.parse(storedUserMovieStatus) : null;
    return cachedUserMovieStatus ? cachedUserMovieStatus.user_id : null;
  }
  
  export function getMovieId(): number | null {
    const storedUserMovieStatus = localStorage.getItem(USER_INFO_KEY);
    cachedUserMovieStatus = storedUserMovieStatus ? JSON.parse(storedUserMovieStatus) : null;
    return cachedUserMovieStatus ? cachedUserMovieStatus.movie_id : null;
  }
  
  export function getStatus(): string | null {
    const storedUserMovieStatus = localStorage.getItem(USER_INFO_KEY);
    cachedUserMovieStatus = storedUserMovieStatus ? JSON.parse(storedUserMovieStatus) : null;
    return cachedUserMovieStatus ? cachedUserMovieStatus.status : null;
  }
  
  export function getUserName(): string | null {
    const storedUserMovieStatus = localStorage.getItem(USER_INFO_KEY);
    cachedUserMovieStatus = storedUserMovieStatus ? JSON.parse(storedUserMovieStatus) : null;
    return cachedUserMovieStatus ? cachedUserMovieStatus.user_name : null;
  }