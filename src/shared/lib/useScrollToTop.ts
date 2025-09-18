import { useEffect } from 'react'

/**
 * Scroll to top when dependency changes
 * @param dependency - value to watch for changes
 * @param condition - optional condition to check before scrolling
 */
export function useScrollToTop(dependency: unknown, condition?: boolean) {
  useEffect(() => {
    if (condition === false) return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [dependency, condition])
}
