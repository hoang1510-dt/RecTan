import { Button as MantineButton } from '@mantine/core'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  variant?: 'filled' | 'light' | 'outline' | 'default' | 'subtle' | 'gradient'
}

export function Button({
  children,
  className,
  isLoading = false,
  variant = 'filled',
  ...props
}: ButtonProps) {
  return (
    <MantineButton
      className={className}
      fullWidth
      loading={isLoading}
      type="button"
      variant={variant}
      {...props}
    >
      {children}
    </MantineButton>
  )
}
