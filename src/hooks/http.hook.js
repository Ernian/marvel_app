import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = {
            'Content-Type': 'application/json'
        }) => {
        try {
            setLoading(true)
            setError(false)
            const response = await fetch(url, { method, body, headers })
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }
            const data = await response.json()
            return data
        }
        catch (error) {
            setError(error.message)
            throw error
        }
        finally {
            setLoading(false)
        }
    }, [])

    return { loading, request, error }
}