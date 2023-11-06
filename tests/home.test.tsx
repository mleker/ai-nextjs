import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: '123' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: '123',
        fullName: 'Test User',
      }
    }), 
  }
})

test('Home', async () => {
  render(await HomePage())
  expect(screen.getByText('App for tracking your mood through your life')).toBeTruthy()
})