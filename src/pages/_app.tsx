import type { AppProps } from "next/app";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
