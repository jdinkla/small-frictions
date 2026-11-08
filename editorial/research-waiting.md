# Waiting issue — contributor research ledger

Research and drafting date: 8 November 2026. Contributor: AI. These are source-linked explanatory essays, not original transport reporting. The manager should treat AI source checking as fallible; no human editorial review is implied.

## Drafts delivered

- `editorial/drafts/bus-pairs.json`: **Why buses arrive in pairs**. Three sources; mechanism and control tradeoffs. All stop inputs are invented and labelled.
- `editorial/drafts/capacity.json`: **The case for an empty minute**. Two sources; stable M/M/1 queue with independent Poisson arrivals and exponential service. Invented print kiosk. Queue time is separated from total system time.
- `editorial/drafts/average-wait.json`: **The average hides your wait**. Two sources; inspection paradox. Invented periodic 2/18-minute route distinguished from iid renewal headways.

The JSON paragraphs use `[1]`, `[2]`, `[3]` to connect the relevant passage to the corresponding item in the `sources` array. The publishing layer should render these as working references or preserve a clearly numbered source list.

## Source inspection

### Bus mechanism

1. Huff, Matute, Garcia and Zhao, *Transit Applications of Vehicle-to-Vehicle and Vehicle-to-Infrastructure Technology*, 2014 TRB submission: https://www.its.ucla.edu/wp-content/uploads/sites/6/2015/06/Transit-Applications-of-Vehicle-to-Vehicle-and-Vehicle-to-Infrastructure-Technology.pdf
   - Inspected the PDF and its anti-bunching discussion on page 5.
   - Supports positive feedback through headway, boarding and dwell time. The draft avoids the source's universal-sounding assertion that perfect spacing will invariably become irregular.
2. Carlos Daganzo, *A Headway-based Approach to Eliminate Bus Bunching*, 2009: https://its.berkeley.edu/publications/headway-based-approach-eliminate-bus-bunching-systematic-analysis-and-comparisons
   - Inspected Berkeley's institutional research record and full displayed abstract. Full journal article was not required or used.
   - Supports the narrower statement about the paper's headway-based holding scheme and comparison with conventional slack. It does not establish practical improvements on every route.
3. Chicago Transit Authority, *How we manage delays*: https://www.transitchicago.com/performance/wtgw/
   - Inspected operator's own explanation of bunching, express running, holding and passenger costs.
   - Primary evidence of the operator's description of its operations, not independent performance validation.

### M/M/1

1. MathWorks, *M/M/1 Queuing System*: https://www.mathworks.com/help/simevents/ug/m-m-1-queuing-system.html
   - Inspected official documentation; one server, Poisson arrival process, exponential service, FIFO, infinite storage and mean waiting formula.
2. MIT OpenCourseWare, *M/M/1 Queue*, 2.854 Introduction to Manufacturing Systems, fall 2016: https://ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/resources/mit2_854f16_mm1queue/
   - Inspected the three-page PDF linked from the resource page:
     https://ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/927056a1af54772a587fd84ad4951e71_MIT2_854F16_Mm1Queue.pdf
   - Verified: utilization ρ = λ/μ; λ < μ; W = 1/(μ − λ); Wq = W − 1/μ.
   - Original examples in hours, converted to minutes: μ = 30; λ = 24 → W = 10, Wq = 8; λ = 27 → W = 20, Wq = 18; λ = 28.5 → W = 40, Wq = 38.

### Residual waiting and inspection paradox

1. Karl Sigman, *Introduction to Renewal Theory*, Columbia, 2018: https://www.columbia.edu/~ks20/4106-18-Fall/Notes-Renewal-Theory.pdf
   - Inspected sections 1.3 (forward recurrence time) and 1.8 (inspection paradox).
   - Supports long-run time-average residual E[H²]/(2E[H]) and length-bias explanation. The article explicitly distinguishes the periodic 2/18 construction from iid renewal headways.
2. Edward A. Lee and contributors, *Ptolemy II: Building Models*, Appendix C, 1999: https://ptolemy.berkeley.edu/publications/papers/99/HMAD/html/models.html
   - Inspected the original documentation's problem description.
   - Supports regular-bus wait T/2 vs Poisson-bus wait T under independent Poisson passenger arrivals. No Java applet code or screenshot was copied.

## Independently checked illustrative arithmetic

- Bus stop: 2 passengers/minute × gaps of 13 and 7 minutes = 26 and 14 passengers. Baseline 20 each. At invented 3 seconds/passenger, boarding differences are +18 and −18 seconds. Departure gap shrinks by 36 seconds relative to baseline; subsequent evolution is left unspecified.
- Average wait: alternating 2 and 18 minutes yields 90% probability of landing in the long gap. Conditional residuals 1 and 9 minutes give 0.1 × 1 + 0.9 × 9 = 8.2 minutes. Equivalent sum-of-squares calculation: (4 + 324)/(2 × 20) = 8.2. Relative to 5 minutes, increase is 64%.

## Limits to preserve in publication

- No estimated audience, real route measurements, quotes from interviewed people, or personal experiences.
- No claim that holding is always beneficial or that a paired bus sighting identifies its cause.
- No universal recommended utilization target. The M/M/1 example is a mathematical baseline; service distributions, multiple servers and appointments change it.
- Average waiting results require the stated arrival/boarding assumptions. A timetable-aware passenger is a different sampling process.
- Linked teaching materials and papers were paraphrased conservatively; examples and numerical scenarios are original to this magazine.
- Failed retrievals of a TfL planning PDF and a Dundee report were not used as article sources.
