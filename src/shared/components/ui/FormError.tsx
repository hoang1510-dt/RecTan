import { Alert } from '@mantine/core'

type FormErrorProps = {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null
  }

  return <Alert color="red" title="Request error">{message}</Alert>
}
