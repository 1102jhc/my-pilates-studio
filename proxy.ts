import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Next.js 16 표준에 따라 함수 이름을 'proxy'로 설정합니다.
 * 이 함수는 모든 요청이 서버 본진에 닿기 전 '에지(Edge)'에서 실행됩니다.
 */
export async function proxy(request: NextRequest) {
  // 1. 기본 응답 객체 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Supabase 클라이언트 초기화 (쿠키 동기화 로직 포함)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  /**
   * 3. 유저 정보 및 세션 확인
   * getUser()를 호출할 때마다 활동이 감지되어 세션 만료 시간이 자동으로 연장됩니다.
   */
  const { data: { user }, error } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isLoginPage = pathname.startsWith('/login')
  
  // 보호가 필요한 경로들
  const protectedPaths = ['/dashboard', '/inquiry', '/instructors', '/programs']
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  /**
   * 4. 자동 로그아웃 및 접근 제어 로직
   */

  // 상황 A: 세션이 만료되었거나 로그인하지 않은 유저가 보호된 페이지에 접근할 때
  if ((!user || error) && isProtected) {
    const loginUrl = new URL('/login', request.url)
    // 보안을 위해 기존 토큰 쿠키를 완전히 지우고 로그인으로 보냅니다.
    const redirectResponse = NextResponse.redirect(loginUrl)
    redirectResponse.cookies.delete('sb-access-token') 
    return redirectResponse
  }

  // 상황 B: 이미 로그인된 유저가 로그인 페이지(`/login`)에 다시 접근할 때
  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 활동 중이라면 갱신된 쿠키가 담긴 response를 반환하여 세션을 유지합니다.
  return response
}

/**
 * 5. 설정(Config): 이 프록시가 작동할 경로를 지정합니다.
 */
export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/inquiry/:path*',
    '/instructors/:path*',
    '/programs/:path*',
  ],
}