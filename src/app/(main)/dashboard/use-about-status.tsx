import { create } from "zustand"

type StatusState = {
  isEditAbout: boolean
  setIsEditAbout: (isEditAbout: boolean) => void
}

export const useAboutStatus = create<StatusState>((set) => ({
  isEditAbout: false,
  setIsEditAbout: (isEditAbout) => set({ isEditAbout })
}))
