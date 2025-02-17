import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token, req }) {
      console.log('Device:', req.headers.get('user-agent'));
      console.log('Token:', token);
      return !!token;
    }
  }
});

export const config = {
  matcher: ["/dashboard/:path*"]
};
