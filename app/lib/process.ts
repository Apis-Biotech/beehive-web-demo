export function calculatePercentageIncrease(data: number[], xSmallest: number, xLargest: number): number {
    // Sort the data in ascending order
    data.sort((a, b) => a - b);

    const smallestValues = data.slice(0, xSmallest);
    const largestValues = data.slice(-xLargest);
    const avgSmallest = smallestValues.reduce((a, b) => a + b) / xSmallest;
    const avgLargest = largestValues.reduce((a, b) => a + b) / xLargest;
  
    const percentageIncrease = ((avgLargest - avgSmallest) / avgSmallest);

    return percentageIncrease;
}