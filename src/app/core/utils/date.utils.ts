import { Projection, ProjectionWithDate } from "../models";

export function parseProjectionDates(
  projections: Projection[]
): ProjectionWithDate[] {
  return projections.map((p) => {
    const dateTime = new Date(p.dateTime);
    return {
      ...p,
      dateTime,
    };
  });
}
