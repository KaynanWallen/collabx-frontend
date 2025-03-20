import { create } from "zustand";
import { ProfileType } from "~/@types/profile";

interface useMyProfileInterface {
  profile: ProfileType | null;
  setProfile: (profile: ProfileType | null) => void;
}

const useMyProfileStore = create<useMyProfileInterface>((set) => ({
  profile: null,
  setProfile: (profile) =>
    set((state) => ({
      ...state, // Corrigido: Envolvido entre parênteses
      profile: profile,
    })),
}));

export default useMyProfileStore;