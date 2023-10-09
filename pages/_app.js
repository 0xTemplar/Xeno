import "@/styles/globals.css";
import { darkTheme } from "@rainbow-me/rainbowkit";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import merge from "lodash.merge";

// import { DomainContextProvider } from "@/context/context";

const scrollSepolia = {
  id: 534351,
  name: "Scroll Sepolia",
  network: "scroll-sepolia",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Scroll Sepolia Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://scroll-sepolia.chainstacklabs.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Scroll Sepolia Testnet Explorer",
      url: "https://sepolia-blockscout.scroll.io/",
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [scrollSepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Xeno",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#A020F0",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme} coolMode>
        {/* <DomainContextProvider> */}
        <Component {...pageProps} />
        {/* </DomainContextProvider> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
