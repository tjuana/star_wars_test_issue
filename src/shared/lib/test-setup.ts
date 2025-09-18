import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch globally for tests
global.fetch = vi.fn()

// Mock window.scrollTo for tests
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
})

// Mock Element.prototype.scrollIntoView for tests
Element.prototype.scrollIntoView = vi.fn()
