import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

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

  // 유저 정보 확인
  const { data: { user } } = await supabase.auth.getUser()

  const isLoginPage = request.nextUrl.pathname.startsWith('/login')
  const protectedPaths = ['/dashboard', '/inquiry', '/instructors', '/programs']
  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // 1. 이미 로그인된 유저가 로그인 페이지에 접근할 경우 -> 대시보드로 리다이렉트
  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 2. 로그인되지 않은 유저가 보호된 페이지에 접근할 경우 -> 로그인 페이지로 리다이렉트
  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/inquiry/:path*',
    '/instructors/:path*',
    '/programs/:path*',
  ],
}