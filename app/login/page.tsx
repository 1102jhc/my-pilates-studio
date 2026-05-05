'use client';

import React, { useEffect, useRef, useState } from 'react';
// 💡 중요: 기존의 lib/supabase 대신 새로운 브라우저 클라이언트를 사용합니다.
import { createClient } from '@/lib/supabase/client'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient(); // 클라이언트 생성

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 💡 최신 표준 방식으로 로그인 시도
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('로그인 실패: ' + error.message);
        setLoading(false);
        return;
      }

      // 💡 로그인 성공 시 페이지 이동
      // SSR 방식에서는 router.push보다 새로고침이 포함된 이동이 쿠키 동기화에 더 안전합니다.
      window.location.href = '/dashboard';
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900">Admin Console</h1>
          <p className="text-gray-500 mt-2 text-sm">관리자 및 직원 전용 로그인</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일 주소</label>
            <input 
              ref={emailRef}
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="admin@studio.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-colors shadow-lg text-white ${
              loading ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {loading ? '인증 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}