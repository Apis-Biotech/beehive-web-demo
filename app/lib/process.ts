export function calculatePercentageIncrease(data: number[], xSmallest: number, xLargest: number): number {
    const dataToSort = data

    // Sort the data in ascending order
    dataToSort.sort((a, b) => a - b);

    const smallestValues = data.slice(0, xSmallest);
    const largestValues = data.slice(-xLargest);
    const avgSmallest = smallestValues.reduce((a, b) => a + b) / xSmallest;
    const avgLargest = largestValues.reduce((a, b) => a + b) / xLargest;

    const diff = avgLargest - avgSmallest

    return diff
}