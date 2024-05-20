import "src/styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { makeStore } from "src/store";
import { useRouter } from "next/router";
import { fetchProfile } from "src/store/profileSlice";

export default function App({ Component, pageProps }: AppProps) {
  const store = makeStore(pageProps.initialReduxState);
  const { dispatch } = store;
  const router = useRouter();

  useEffect(() => {
    // get logged-in profile in protected routes
    if (["/dashboard"].includes(router.pathname)) {
      dispatch(fetchProfile());
    }
  }, [router.pathname, dispatch]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
