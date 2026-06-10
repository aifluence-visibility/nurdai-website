/** Force www → apex with 301 (WhatsApp crawlers handle 301 better than 308). */
export default function middleware(request) {
  const url = new URL(request.url);
  if (url.hostname === 'www.nurdai.com') {
    url.hostname = 'nurdai.com';
    return Response.redirect(url.href, 301);
  }
}

export const config = {
  matcher: '/:path*',
};
