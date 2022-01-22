import { useEffect, useLayoutEffect, useRef } from 'react'
export const isBrowser = typeof window !== "undefined";

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // if (isBrowser)
    // Remember the latest callback if it changes.
    useLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }

        const id = setInterval(() => savedCallback.current(), delay)

        return () => clearInterval(id)
    }, [delay])
}

export default useInterval
