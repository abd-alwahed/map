export const calculateDiameter = (points: [number, number][]): number => {
  let maxDistance = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = calculateDistance(points[i], points[j]);
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    }
  }

  return maxDistance * 1000;
};

export const calculateDistance = (
  coord1: [number, number],
  coord2: [number, number],
): number => {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = deg2rad(coord1[1]);
  const lat2 = deg2rad(coord2[1]);
  const lon1 = deg2rad(coord1[0]);
  const lon2 = deg2rad(coord2[0]);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
