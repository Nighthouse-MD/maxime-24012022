import { useState } from "react";
import useInterval from "./useInterval";

const useThrottleTick = (throttleInterval: number) => {
    const [throttleTick, setThrottleTick] = useState(false);
    useInterval(() => {
        setThrottleTick(!throttleTick);
    }, throttleInterval);

    return throttleTick;
}

export default useThrottleTick;