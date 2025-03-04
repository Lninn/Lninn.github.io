import { create } from 'zustand'

const useRouteStore = create((set) => ({
  activePath: 'bookmark',
  setActivePath: (path) => set({ activePath: path })
}))

export default useRouteStore