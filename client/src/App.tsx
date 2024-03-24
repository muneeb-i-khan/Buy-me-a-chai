import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ProfilePage from './components/ProfilePage'
import ProfileListPage from './components/ProfileListPage'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from 'react';
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App: React.FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl('devnet')

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/funding" element={<ProfileListPage />} />
          </Routes>
        </WalletModalProvider>
      </WalletProvider>s
    </ConnectionProvider>
  )
}

export default App