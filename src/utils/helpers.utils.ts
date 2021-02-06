export const getArrayLimits = (
  claimedStart: number,
  claimedEnd: number,
  collectionLength: number,
): { start: number; end: number } => ({
  start: claimedStart < 0 ? 0 : claimedStart,
  end: claimedEnd > collectionLength ? collectionLength : claimedEnd,
});