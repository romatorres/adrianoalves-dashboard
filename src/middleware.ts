import { withAuth } from "next-auth/middleware";


export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      console.log('Token in middleware:', token);
      console.log('Auth header:', req.headers.get('authorization'));
      console.log('Cookie header:', req.headers.get('cookie'));
      
      if (!token) {
        console.log('No token found, redirecting to login');
        return false;
      }
      
      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"]
};
