import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

// 환경 변수에서 Supabase URL과 액세스 키 가져오기
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Supabase 클라이언트 초기화
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL 또는 액세스 키를 .env 파일에 설정해야 합니다.');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
