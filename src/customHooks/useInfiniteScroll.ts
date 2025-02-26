import { useEffect, useState } from 'react'

// Define a custom hook that accepts several parameters and returns an object containing two values
export const useInfiniteScroll = (
  callBack: Function,
  container: HTMLDivElement
): { count: number, loading: boolean } => {

  // Define two state variables to keep track of the current count and loading status
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  // Check if the user has scrolled to a certain point, and if not already loading and has scrolled in any direction
  if (container.scrollTop < 500 && !loading) {
    setLoading(true) // Set the loading state to true to indicate that more items should be loaded
    
  }

  // // Use the useEffect hook to update the count and loading status when the loading state changes
  // useEffect(() => {
  //   if (loading) {
  //     if (count + itemsIncrement >= numberOfItems) {
  //       setCount(numberOfItems) // If the maximum number of items has been reached, set the count to that number
  //     } else {
  //       setCount(count + itemsIncrement) // Otherwise, add the specified increment to the count
  //     }
  //     setLoading(false) // Reset the loading state to false when the new items have been loaded
  //   }
  // }, [loading])

  // Return an object containing the current count and loading status
  return { count, loading }
}
