import { createContext, useContext, useEffect, useReducer } from "react"

interface IAppCtx {
  name: string

  domRect: DOMRect | null
  patch: (domRect: DOMRect) => void

}

const defaultAppCtx: IAppCtx = {
  name: 'appCtx',
  domRect: null,
  patch: () => {},
}

const AppCtx = createContext(defaultAppCtx)


interface IProps {
  children: React.ReactNode
}

export const AppProvider = (props: IProps) => {
  const {
    children,
  } = props

  const [appState, dispatch] = useReducer(
    (currentState: IAppCtx, prevState: Partial<IAppCtx>) => {
      return {
        ...currentState,
        ...prevState,
      }
    },
    defaultAppCtx,
  )

  useEffect(() => {
    const patch = (domRect: DOMRect) => {
      dispatch({ domRect })
    }

    dispatch({ patch })
  }, [])

  return (
    <AppCtx.Provider value={appState}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppCtx)

  return ctx
}
