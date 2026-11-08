/** Exact explanatory models. No measured route or service data is used. */
export function mm1(arrivalsPerHour: number, servicesPerHour = 60) {
  if (![arrivalsPerHour, servicesPerHour].every(Number.isFinite) || arrivalsPerHour < 0 || servicesPerHour <= arrivalsPerHour) throw new RangeError('Use finite rates with 0 ≤ arrivals < service capacity.');
  const utilization = arrivalsPerHour / servicesPerHour;
  const systemMinutes = 60 / (servicesPerHour - arrivalsPerHour);
  const queueMinutes = systemMinutes - 60 / servicesPerHour;
  return { utilization, systemMinutes, queueMinutes, inSystem: arrivalsPerHour * systemMinutes / 60 };
}

/** Repeating headways, uniform independent arrival over clock time, immediate boarding. */
export function headwayWait(gaps: number[]) {
  if (!gaps.length || gaps.some(h => !Number.isFinite(h) || h <= 0)) throw new RangeError('Headways must be positive finite minutes.');
  const sum = gaps.reduce((a, b) => a + b, 0);
  return { meanHeadway: sum / gaps.length, waitMinutes: gaps.reduce((a, b) => a + b * b, 0) / (2 * sum) };
}

export interface Job { id: number; duration: number; server: number; start: number; finish: number; }
/** All jobs arrive at t=0. Separate lines alternate assignment; pooled takes first-free server. */
export function assignJobs(durations: number[], pooled: boolean, servers = 2): Job[] {
  if (!Number.isInteger(servers) || servers < 1 || durations.some(x => !Number.isFinite(x) || x <= 0)) throw new RangeError('Use positive durations and at least one server.');
  const freeAt = Array<number>(servers).fill(0);
  return durations.map((duration, id) => {
    const server = pooled ? freeAt.indexOf(Math.min(...freeAt)) : id % servers;
    const start = freeAt[server];
    freeAt[server] += duration;
    return { id: id + 1, duration, server, start, finish: freeAt[server] };
  });
}
export function compareQueues(longJob: number) {
  const durations = [longJob, 1, 1, 1];
  const separate = assignJobs(durations, false);
  const pooled = assignJobs(durations, true);
  const mean = (jobs: Job[]) => jobs.slice(2).reduce((sum, j) => sum + j.start, 0) / 2;
  return { durations, separate, pooled, separateWait: mean(separate), pooledWait: mean(pooled) };
}
