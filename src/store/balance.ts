import create from 'zustand';
import { getBalance } from '@/firebase';


type BalanceStore = {
    balance: number;
    setBalance: (newBalance: number) => void;
};


const useBalanceStore = create<BalanceStore>((set) => ({
    balance: 0,
    setBalance: (newBalance) => set({ balance: newBalance }),
}));

export default useBalanceStore;