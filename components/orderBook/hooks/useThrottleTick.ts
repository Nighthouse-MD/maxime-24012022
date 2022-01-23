import { useState } from "react";
import useInterval from "./useInterval";

export default function useThrottleTick(throttleInterval: number) {
    const [throttleTick, setThrottleTick] = useState(false);
    useInterval(() => {
        setThrottleTick(!throttleTick);
    }, throttleInterval);

    return throttleTick;
}