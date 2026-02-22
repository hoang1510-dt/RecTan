import { PasswordInput, TextInput } from '@mantine/core'
import type { InputHTMLAttributes } from 'react'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  const { type, ...inputProps } = props
  const isPassword = type === 'password'

  if (isPassword) {
    return (
      <PasswordInput
        className={className}
        error={error}
        label={label}
        radius="md"
        size="md"
        {...inputProps}
      />
    )
  }

  return (
    <TextInput
      className={className}
      error={error}
      label={label}
      radius="md"
      size="md"
      type={type}
      {...inputProps}
    />
  )
}
