import { useState, useEffect } from 'react'
import { useDebounce } from '~/hooks/use-debounce'

export const DebouncedInput = ({
  value,
  onChange,
  timeout,
  ...props
}: {
  value: string
  onChange: (value: string) => void
  timeout?: number
  [key: string]: any
}) => {
  const [localValue, setLocalValue] = useState<string>(value)

  const debouncedValue = useDebounce(localValue, timeout ?? 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue, onChange])

  return (
    <input
      {...props}
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value)
      }}
    />
  )
}
