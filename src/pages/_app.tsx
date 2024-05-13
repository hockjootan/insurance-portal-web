import "src/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { makeStore } from "../store";

export default function App({ Component, pageProps }: AppProps) {
  const store = makeStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
