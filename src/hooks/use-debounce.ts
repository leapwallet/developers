import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, timeout: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout)

    return () => {
      clearTimeout(handler)
    }
  }, [value, timeout])

  return debouncedValue
}
