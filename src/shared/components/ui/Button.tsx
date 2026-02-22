import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
}

export function Button({
  children,
  className = '',
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={disabled || isLoading}
      type="button"
      {...props}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  )
}
