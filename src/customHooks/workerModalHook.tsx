import { useEffect, useState } from "react";
import { searchWorkers } from "../queries/searchWorkers";
import { workerResponse } from "../types/searchWorkersTypes";

export function useSearchDebounce(value:string, time=250){
    const [debounceValue, setDebounce] = useState(value)
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebounce(value)
        }, time)
        return () => {
            clearTimeout(timeout)
        }
    },[value, time])

    return debounceValue
}

export function useSearchWorker(value: string) {
    const [workers, setWorkers] = useState<workerResponse>();
    const searchDebounce = useSearchDebounce(value)
    console.log(searchDebounce)
    useEffect(() => {
        (async()=>{
            const data = await searchWorkers(searchDebounce);
            setWorkers(data)
        })()
  }, [searchDebounce]);

  return workers
}