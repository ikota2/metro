import {Station} from '../types';

export const dijkstra = (stations: Station[], startId: string | null, endId: string | null): { time: number, path: string[] } => {
  if (startId === null || endId === null) {
    return { time: Infinity, path: [] };
  }

  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const queue: Station[] = [...stations];

  queue.forEach(station => {
    distances[station.id] = Infinity;
    previous[station.id] = null;
  });

  distances[startId] = 0;

  while (queue.length !== 0) {
    queue.sort((a, b) => distances[a.id] - distances[b.id]);
    const closestStation = queue.shift();

    if (closestStation?.id === endId) {
      break;
    }

    closestStation?.neighbours.forEach((neighbour) => {
      const alt = distances[closestStation.id] + neighbour.timeInMinutes;
      if (alt < distances[neighbour.neighbourId]) {
        distances[neighbour.neighbourId] = alt;
        previous[neighbour.neighbourId] = closestStation.id;
      }
    });
  }

  const path: string[] = [];
  let currentId: string | null = previous[endId] === null ? null : endId;

  while (currentId !== null) {
    path.unshift(currentId);
    currentId = previous[currentId];
  }

  if (path.length === 0) {
    return { time: Infinity, path: [] };
  } else {
    return { time: distances[endId], path };
  }
};
