import { Button as MantineButton } from '@mantine/core'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
}

export function Button({
  children,
  className,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <MantineButton
      className={className}
      fullWidth
      loading={isLoading}
      type="button"
      variant="filled"
      {...props}
    >
      {children}
    </MantineButton>
  )
}
