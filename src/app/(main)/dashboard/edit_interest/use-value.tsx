import { create } from "zustand"

type StatusState = {
  valuesEdit: string[]
  setValuesEdit: (valuesEdit: string[]) => void
}

export const useValues = create<StatusState>((set) => ({
  valuesEdit: [],
  setValuesEdit: (valuesEdit) => set({ valuesEdit })
}))
