export const Toggle: React.FC<{
  checked: boolean
  onChange: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
}> = ({ checked, onChange, disabled }) => {
  return (
    <button
      className={`rounded-full w-8 h-5 p-[2px] ${
        checked ? 'bg-green-400' : 'bg-gray-400'
      }`}
      disabled={disabled}
      onClick={() => onChange((v) => !v)}
    >
      <div
        className={`rounded-full transition-transform h-full aspect-square bg-white ${
          checked ? 'translate-x-3' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
