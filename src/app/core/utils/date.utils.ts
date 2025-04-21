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

export function filterUpcomingProjection(projections: ProjectionWithDate[]): ProjectionWithDate[] {
  const now = new Date();
  const sixDaysLeter = new Date();
  sixDaysLeter.setDate(now.getDate() + 5);

  return projections.filter((p) => p.dateTime >= startOfDay(now) && p.dateTime <= endOfDay(sixDaysLeter));
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
