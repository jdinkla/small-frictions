import { describe, expect, it } from 'vitest';
import { mm1, headwayWait, assignJobs, compareQueues } from './queue';

describe('published queue calculations', () => {
  it('keeps queue wait, service and total time distinct with correct units', () => {
    expect(mm1(24,30).queueMinutes).toBeCloseTo(8);
    expect(mm1(27,30).queueMinutes).toBeCloseTo(18);
    expect(mm1(28.5,30).queueMinutes).toBeCloseTo(38);
    expect(mm1(48).systemMinutes).toBeCloseTo(5);
    expect(mm1(48).inSystem).toBeCloseTo(4);
    expect(mm1(0).queueMinutes).toBe(0);
    expect(() => mm1(60)).toThrow(RangeError);
    expect(() => mm1(NaN)).toThrow(RangeError);
  });
  it('weights the repeating 2/18 headways by time instead of counting gaps', () => {
    expect(headwayWait([10,10])).toEqual({meanHeadway:10,waitMinutes:5});
    expect(headwayWait([2,18])).toEqual({meanHeadway:10,waitMinutes:8.2});
    expect(headwayWait([2,18,2,18]).waitMinutes).toBeCloseTo(8.2);
    expect(() => headwayWait([0,20])).toThrow(RangeError);
  });
  it('reproduces the four-person example without changing service durations', () => {
    const separate = assignJobs([6,1,1,1],false);
    const pooled = assignJobs([6,1,1,1],true);
    expect(separate.map(j => j.start)).toEqual([0,0,6,1]);
    expect(pooled.map(j => j.start)).toEqual([0,0,1,2]);
    expect(separate.reduce((n,j)=>n+j.start,0)).toBe(7);
    expect(pooled.reduce((n,j)=>n+j.start,0)).toBe(3);
  });
  it('preserves work and prevents overlapping jobs on a server across the whole control range', () => {
    for (let long=1;long<=12;long++) {
      const result=compareQueues(long);
      for(const jobs of [result.separate,result.pooled]) {
        expect(jobs.reduce((sum,j)=>sum+j.duration,0)).toBe(long+3);
        for(let server=0;server<2;server++) {
          const assigned=jobs.filter(j=>j.server===server);
          for(let i=1;i<assigned.length;i++) expect(assigned[i].start).toBeGreaterThanOrEqual(assigned[i-1].finish);
        }
      }
    }
    expect(compareQueues(6).separateWait).toBe(3.5);
    expect(compareQueues(6).pooledWait).toBe(1.5);
    expect(compareQueues(1).separateWait).toBe(compareQueues(1).pooledWait);
  });
});
