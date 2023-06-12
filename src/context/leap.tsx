import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import toast from 'react-hot-toast'

type SupportedChainsRecord = Record<string, boolean>

const LeapContext = createContext<{
  supportedChains: QueryData<SupportedChainsRecord>
  fetchSupportedChains: () => Promise<void>
} | null>(null)

type QueryData<T> =
  | { status: 'success'; data: T }
  | { status: 'loading' }
  | { status: 'error'; error: Error }

export const LeapProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const retryCount = useRef(0)

  const [supportedChains, setSupportedChains] = useState<
    QueryData<SupportedChainsRecord>
  >({ status: 'loading' })

  const fetchSupportedChains = useCallback(async () => {
    if (!window.leap) {
      setSupportedChains({
        status: 'error',
        error: new Error('Leap Wallet not found')
      })
      return
    }
    window.leap
      .getSupportedChains()
      .then((chains) => {
        const supportedChainsObject: SupportedChainsRecord = {}
        chains.forEach((chain) => {
          supportedChainsObject[chain] = true
        })
        setSupportedChains({
          status: 'success',
          data: supportedChainsObject
        })
      })
      .catch((err) => {
        if (err instanceof Error) {
          toast.error(() => {
            return (
              <div className="flex flex-col">
                <strong>Failed to Fetch Supported Chains</strong>
                <p className="text-sm">{err.message}</p>
              </div>
            )
          })
          setSupportedChains({
            status: 'error',
            error: err
          })
        } else {
          toast.error('Failed to fetch supported chains')
          setSupportedChains({
            status: 'error',
            error: new Error('Failed to fetch supported chains')
          })
        }
      })
  }, [])

  useEffect(() => {
    fetchSupportedChains()
  }, [fetchSupportedChains])

  useEffect(() => {
    if (supportedChains.status === 'error' && retryCount.current < 3) {
      const timeoutId = setTimeout(() => {
        fetchSupportedChains()
        retryCount.current += 1
      }, 500)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [supportedChains, fetchSupportedChains])

  const value = useMemo(
    () => ({
      supportedChains,
      fetchSupportedChains
    }),
    [supportedChains, fetchSupportedChains]
  )

  return <LeapContext.Provider value={value}>{children}</LeapContext.Provider>
}

export const useLeapContext = () => {
  const leap = useContext(LeapContext)
  if (!leap) {
    throw new Error('useLeap must be used within a LeapProvider')
  }
  return leap
}
