import { useEffect, useState } from 'react';
import { mm1, headwayWait, compareQueues } from '../../lib/queue';
import { withBase } from '../../lib/base';
const fmt = (n: number) => n.toFixed(1).replace(/\.0$/, '');

export default function QueueLab() {
  const [ready, setReady] = useState(false);
  const [arrivals, setArrivals] = useState(48);
  const [spread, setSpread] = useState(8);
  const [longJob, setLongJob] = useState(6);
  useEffect(() => { setReady(true); }, []);
  const capacity = mm1(arrivals);
  const gaps = [10 - spread, 10 + spread];
  const headway = headwayWait(gaps);
  const lines = compareQueues(longJob);
  return <>
    <section className="experiment" id="capacity" aria-labelledby="capacity-title">
      <h2 id="capacity-title">Leave a little room.</h2>
      <p className="experiment-intro">One server can complete 60 jobs an hour on average. Change the arrival rate and see why the final bit of capacity is so expensive to fill.</p>
      <div className="experiment-grid"><div>
        <label className="control-label" htmlFor="arrival-rate">Arrivals per hour <output htmlFor="arrival-rate">{arrivals}</output></label>
        <input id="arrival-rate" type="range" min="6" max="57" step="1" value={arrivals} disabled={!ready} onChange={e => setArrivals(Number(e.target.value))} aria-describedby="capacity-hint" />
        <div className="range-ends"><span>6 / hour</span><span>57 / hour</span></div>
        <p id="capacity-hint" className="result-detail">Service capacity stays at 60 per hour: one minute per job on average. Try 30 arrivals, then 54.</p>
        <div className="meter" aria-hidden="true"><div className="meter-fill" style={{width:`${capacity.utilization*100}%`}} /></div>
        <p className="result-detail">{fmt(capacity.utilization*100)}% utilization</p>
      </div><div className="experiment-result" aria-live="polite" aria-atomic="true">
        <p className="result-number" data-result="capacity">{fmt(capacity.queueMinutes)}<small>min</small></p>
        <p className="result-label">Average waiting before service</p><p className="result-detail">{fmt(capacity.systemMinutes)} min including service · {fmt(capacity.inSystem)} jobs in the system on average.</p>
      </div></div>
      <details className="model-limits"><summary>What this model assumes</summary><p>A stable M/M/1 queue: independent Poisson arrivals, independent exponential service times, one first-come first-served server, unlimited waiting space and nobody leaving. W = 60 / (60 − arrivals) minutes; queue wait subtracts the one-minute mean service time. These are long-run analytical means, not a simulated sample or a prediction for your local café. The article uses a different service rate to illustrate the same formula.</p><p><a href={withBase('/articles/capacity/')}>Read the explanation and sources</a></p></details>
    </section>
    <section className="experiment" id="headways" aria-labelledby="headway-title">
      <h2 id="headway-title">Same buses. Different gaps.</h2>
      <p className="experiment-intro">Two buses pass every 20 minutes. Make the spacing uneven without changing the number of buses. A randomly arriving passenger feels the difference.</p>
      <div className="experiment-grid"><div>
        <label className="control-label" htmlFor="gap-spread">Unevenness <output htmlFor="gap-spread">{gaps[0]} / {gaps[1]} min</output></label>
        <input id="gap-spread" type="range" min="0" max="9" step="1" value={spread} disabled={!ready} onChange={e=>setSpread(Number(e.target.value))} aria-describedby="headway-hint" />
        <div className="range-ends"><span>Even: 10 / 10</span><span>Bunched: 1 / 19</span></div>
        <div className="headway-bars"><div className="headway-track" role="img" aria-label={`Repeating gaps of ${gaps[0]} and ${gaps[1]} minutes`}><span style={{width:`${gaps[0]*5}%`}}>{gaps[0]}</span><span style={{width:`${gaps[1]*5}%`}}>{gaps[1]}</span></div></div>
        <p id="headway-hint" className="result-detail">Every gap gets one vote in the frequency average. Longer gaps occupy more of the passenger’s clock.</p>
      </div><div className="experiment-result" aria-live="polite" aria-atomic="true"><p className="result-number" data-result="headway">{fmt(headway.waitMinutes)}<small>min</small></p><p className="result-label">Average wait for a random arrival</p><p className="result-detail">A {headway.meanHeadway}-minute mean headway throughout. Even spacing gives a 5-minute wait. In this pattern, {fmt(gaps[1]*5)}% of the clock is inside the longer gap{spread === 0 ? ' (the two gaps are equal)' : ''}.</p></div></div>
      <details className="model-limits"><summary>What this model assumes</summary><p>The two headways repeat forever. Passengers arrive uniformly over clock time, independently of the buses, and can always board the next one. Mean wait = sum of squared gaps / (2 × sum of gaps). This is a direct time-average calculation for a periodic pattern; its headways are not independent random draws. There is no timetable-aware arrival, crowding or missing bus.</p><p><a href={withBase('/articles/average-wait/')}>Read the explanation and sources</a></p></details>
    </section>
    <section className="experiment" id="pooling" aria-labelledby="pooling-title">
      <h2 id="pooling-title">Connect the next free counter.</h2>
      <p className="experiment-intro">Four jobs arrive at once. Two begin immediately: one long task at counter A and a one-minute task at B. The other two need one minute each. Separate lines commit one waiting person to each counter. A shared line sends the next person to whichever counter becomes free.</p>
      <div className="experiment-grid"><div>
        <label className="control-label" htmlFor="long-job">Long task duration <output htmlFor="long-job">{longJob} min</output></label>
        <input id="long-job" type="range" min="1" max="12" step="1" value={longJob} disabled={!ready} onChange={e=>setLongJob(Number(e.target.value))} aria-describedby="pooling-hint" />
        <div className="range-ends"><span>1 min (all equal)</span><span>12 min</span></div>
        <p id="pooling-hint" className="result-detail">Two interchangeable counters, no switching or walking delay. The same four jobs and durations appear in both comparisons. The results average only the two people initially waiting.</p>
      </div><div className="experiment-result" aria-live="polite" aria-atomic="true"><p className="result-number" data-result="pooling">{fmt(lines.pooledWait)}<small>min</small></p><p className="result-label">Average wait for the two initially waiting, shared line</p><p className="result-detail">Separate lines: {fmt(lines.separateWait)} min. {longJob > 2 ? 'B can take both waiting people while A is busy.' : 'Both counters become free soon enough to share the waiting work.'} This illustrates one mechanism; it does not establish a universal saving.</p></div></div>
      <details className="model-limits"><summary>Inspect every job and its wait</summary><p>All arrivals occur at minute zero, so waiting time equals service-start time. In a tie, counter A takes the next job. Fixed service durations, no priorities, abandonment or travel time. Every result is deterministic.</p><table className="comparison"><caption>Same jobs; different assignment rules. Times in minutes.</caption><thead><tr><th scope="col">Job</th><th scope="col">Service</th><th scope="col">Separate wait</th><th scope="col">Shared wait</th></tr></thead><tbody>{lines.separate.map((job,i)=><tr key={job.id}><th scope="row">{job.id}</th><td>{job.duration}</td><td>{job.start}</td><td>{lines.pooled[i].start}</td></tr>)}</tbody></table><p><a href={withBase('/articles/one-queue/')}>Read the explanation and sources</a></p></details>
    </section>
    <div className="lab-actions"><button type="button" className="reset-button" disabled={!ready} onClick={()=>{setArrivals(48);setSpread(8);setLongJob(6)}}>Reset all experiments</button><a className="text-link" href="https://github.com/jdinkla/small-frictions/blob/main/site/src/lib/queue.ts">Inspect the model code</a></div>
  </>;
}
