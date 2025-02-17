import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      console.log('Token in middleware:', token);
      console.log('Request path:', req.nextUrl.pathname);
      console.log('Request headers:', req.headers);
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"]
};
