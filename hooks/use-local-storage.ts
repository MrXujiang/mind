"use client"

import { useState, useCallback, useEffect } from "react"

export function useLocalStorage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getItem = useCallback(
    (key: string, defaultValue: any = null) => {
      if (!isClient) return defaultValue

      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } catch (error) {
        console.error(`Error getting item ${key} from localStorage`, error)
        return defaultValue
      }
    },
    [isClient],
  )

  const setItem = useCallback(
    (key: string, value: any) => {
      if (!isClient) return

      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`Error setting item ${key} to localStorage`, error)
      }
    },
    [isClient],
  )

  const removeItem = useCallback(
    (key: string) => {
      if (!isClient) return

      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.error(`Error removing item ${key} from localStorage`, error)
      }
    },
    [isClient],
  )

  const getAll = useCallback(() => {
    if (!isClient) return []

    try {
      return Object.keys(window.localStorage)
    } catch (error) {
      console.error("Error getting all items from localStorage", error)
      return []
    }
  }, [isClient])

  return { getItem, setItem, removeItem, getAll }
}
