import { useEffect, useState } from 'react';
import { boxEnvelope, DELIVERY_DEFAULTS, deliveryNetwork, gs1CheckDigit } from '../../lib/delivery';
import { withBase } from '../../lib/base';
import '../../styles/delivery.css';

const fmt = (value: number, digits = 1) => value.toFixed(digits).replace(/\.0$/, '');

export default function DeliveryLab() {
  const [ready, setReady] = useState(false);
  const [hubOffset, setHubOffset] = useState<number>(DELIVERY_DEFAULTS.hubOffset);
  const [boxHeight, setBoxHeight] = useState<number>(DELIVERY_DEFAULTS.boxHeight);
  const [payload, setPayload] = useState<string>(DELIVERY_DEFAULTS.payload);
  useEffect(() => { setReady(true); }, []);
  const network = deliveryNetwork(hubOffset);
  const box = boxEnvelope(boxHeight);
  const checksum = gs1CheckDigit(payload);
  const distanceScale = Math.max(network.direct.vehicleKm, network.viaHub.vehicleKm);
  const resetAll = () => { setHubOffset(DELIVERY_DEFAULTS.hubOffset); setBoxHeight(DELIVERY_DEFAULTS.boxHeight); setPayload(DELIVERY_DEFAULTS.payload); };

  return <div className="delivery-lab">
    <section className="experiment" id="hub" aria-labelledby="hub-title">
      <h2 id="hub-title">A detour can combine loads.</h2>
      <p className="experiment-intro">Four origins each send one parcel to each of four destinations: 16 parcels. Give every parcel a direct vehicle leg, then compare a hub that combines four parcels on each leg. Move the hub away and watch the loaded distance change.</p>
      <div className="experiment-grid"><div>
        <label className="control-label" htmlFor="hub-offset">Hub offset <output htmlFor="hub-offset">{hubOffset} km</output></label>
        <input id="hub-offset" type="range" min="0" max="30" step="1" value={hubOffset} disabled={!ready} onChange={event => setHubOffset(Number(event.target.value))} aria-describedby="hub-hint" />
        <div className="range-ends"><span>0 km</span><span>30 km</span></div>
        <p className="delivery-mobile-feedback" aria-hidden="true"><span>Hub <strong>{fmt(network.viaHub.vehicleKm)} km</strong> · Direct {fmt(network.direct.vehicleKm)} km</span><span>{fmt(Math.abs(network.differenceKm))} {network.differenceKm >= 0 ? 'fewer' : 'more'} loaded vehicle km via hub.</span></p>
        <p id="hub-hint" className="result-detail">The hub stays at x = 6 km; its y coordinate is {hubOffset} km. Try 0, then 30. Vehicles can carry at least four parcels.</p>
        <div className="delivery-loads"><p><strong>Direct</strong><span>16 loaded legs · 1 parcel each</span></p><p><strong>Via hub</strong><span>8 loaded legs · 4 parcels each</span></p></div>
        <button type="button" className="reset-button delivery-reset" disabled={!ready} onClick={() => setHubOffset(DELIVERY_DEFAULTS.hubOffset)}>Reset hub</button>
      </div><div className="experiment-result" aria-live="polite" aria-atomic="true">
        <h3>Loaded vehicle distance</h3>
        <dl className="delivery-results"><div><dt>Direct</dt><dd data-result="direct-km">{fmt(network.direct.vehicleKm)} km</dd></div><div><dt>Via hub</dt><dd data-result="hub-km">{fmt(network.viaHub.vehicleKm)} km</dd></div></dl>
        <div className="delivery-distance-bars" aria-hidden="true"><span style={{ width: `${network.direct.vehicleKm / distanceScale * 100}%` }} /><span style={{ width: `${network.viaHub.vehicleKm / distanceScale * 100}%` }} /></div>
        <p className="delivery-outcome" data-result="hub-difference">Hub uses {fmt(Math.abs(network.differenceKm))} {network.differenceKm >= 0 ? 'fewer' : 'more'} loaded vehicle km.</p>
        <p className="result-detail">Same 16 parcels. This synthetic network comparison counts each loaded vehicle leg once, however many parcels it carries.</p>
      </div></div>
      <details className="model-limits"><summary>Inspect the network and its limits</summary>
        <p>Coordinates and straight-line distances are in kilometres. Origins O1–O4 are (0, −3), (0, −1), (0, 1), (0, 3). Destinations D1–D4 are (12, −3), (12, −1), (12, 1), (12, 3). Hub H is (6, {hubOffset}). Distance = √((x₂ − x₁)² + (y₂ − y₁)²).</p>
        <p>Each origin’s inbound leg carries its four parcels. At the hub they are sorted into four outbound loads, each containing one parcel from every origin. There are 16 parcels entering and 16 leaving. Eight legs do not mean eight vehicles: fleet assignments are outside this comparison.</p>
        <p>No empty or return legs, service at stops, congestion, time, costs or emissions are counted. Roads and practical constraints are absent. Vehicle distance is not parcel distance: a four-parcel leg counts once here, rather than four times. This compares two specified arrangements; it does not optimize routes or establish that a hub is better in a real network.</p>
        <table className="comparison delivery-leg-table"><caption>Every hub leg, loaded with four parcels. Distances rounded to one decimal km.</caption><thead><tr><th scope="col">Leg</th><th scope="col">Parcels</th><th scope="col">km</th></tr></thead><tbody>{network.viaHub.legs.map(leg => <tr key={`${leg.from.id}-${leg.to.id}`}><th scope="row">{leg.from.id} → {leg.to.id}</th><td>{leg.parcels}</td><td>{fmt(leg.km)}</td></tr>)}</tbody></table>
        <table className="comparison delivery-direct-table"><caption>Direct single-parcel legs: each cell is one loaded leg in km. Coordinates appear above.</caption><thead><tr><th scope="col">From / to</th>{network.destinations.map(destination => <th scope="col" key={destination.id}>{destination.id}</th>)}</tr></thead><tbody>{network.origins.map(origin => <tr key={origin.id}><th scope="row">{origin.id}</th>{network.destinations.map(destination => <td key={destination.id}>{fmt(network.direct.legs.find(leg => leg.from.id === origin.id && leg.to.id === destination.id)!.km)}</td>)}</tr>)}</tbody></table>
        <p><a href={withBase('/articles/parcel-detour/')}>Read why parcels travel through hubs</a></p>
      </details>
    </section>

    <section className="experiment" id="box" aria-labelledby="box-title">
      <h2 id="box-title">A few centimetres multiply.</h2>
      <p className="experiment-intro">Keep a rectangular product envelope at 20 × 10 × 5 cm. Change the height of a shipping box whose external length and width stay at 30 × 20 cm. Compare their rectangular volumes.</p>
      <div className="experiment-grid"><div>
        <label className="control-label" htmlFor="box-height">External box height <output htmlFor="box-height">{boxHeight} cm</output></label>
        <input id="box-height" type="range" min="6" max="40" step="1" value={boxHeight} disabled={!ready} onChange={event => setBoxHeight(Number(event.target.value))} aria-describedby="box-hint" />
        <div className="range-ends"><span>6 cm</span><span>40 cm</span></div>
        <p className="delivery-mobile-feedback" aria-hidden="true"><span>External box <strong>{fmt(box.boxLitres)} L</strong> · Product 1 L</span><span>Product envelope: {fmt(box.productRatio * 100, 2)}% of outside volume.</span></p>
        <p id="box-hint" className="result-detail">External box: 30 × 20 × {boxHeight} cm. Product envelope: 20 × 10 × 5 cm = 1 litre throughout.</p>
        <button type="button" className="reset-button delivery-reset" disabled={!ready} onClick={() => setBoxHeight(DELIVERY_DEFAULTS.boxHeight)}>Reset box</button>
      </div><div className="experiment-result" aria-live="polite" aria-atomic="true">
        <h3>Rectangular envelopes</h3>
        <dl className="delivery-results"><div><dt>External box</dt><dd data-result="box-litres">{fmt(box.boxLitres)} L</dd></div><div><dt>Product</dt><dd>1 L</dd></div><div><dt>Difference</dt><dd data-result="box-difference">{fmt(box.differenceLitres)} L</dd></div></dl>
        <p className="delivery-outcome" data-result="box-ratio">Product envelope is {fmt(box.productRatio * 100, 2)}% of the external box volume.</p>
        <p className="result-detail">The difference includes box material, protection and other unmodelled contents. It is not a measurement of air.</p>
      </div></div>
      <details className="model-limits"><summary>Inspect the volume calculation and its limits</summary>
        <p>Volume = length × width × height. 1,000 cm³ = 1 litre. Product: 20 × 10 × 5 = 1,000 cm³ = 1 L. Box: 30 × 20 × {boxHeight} = {box.boxCm3.toLocaleString('en-GB')} cm³ = {fmt(box.boxLitres)} L. Envelope ratio = 1 ÷ {fmt(box.boxLitres)} × 100 = {fmt(box.productRatio * 100, 3)}%.</p>
        <p>The product envelope is an assumed rectangular bounding volume. The box uses external dimensions; wall thickness and internal dimensions are unspecified. Subtraction is an envelope comparison, not a packing feasibility guarantee or a carrier’s dimensional-weight formula, price or emissions estimate.</p>
        <p><a href={withBase('/articles/box-space/')}>Read what a large box can and cannot tell you</a></p>
      </details>
    </section>

    <section className="experiment" id="check-digit" aria-labelledby="check-digit-title">
      <h2 id="check-digit-title">One digit checks the arithmetic.</h2>
      <p className="experiment-intro">Start with 12 synthetic digits. Alternate weights of 3 and 1 from the right, add the products, then find the digit that brings the total to a multiple of ten.</p>
      <div className="experiment-grid"><div>
        <label className="control-label" htmlFor="check-payload">Synthetic 12-digit payload</label>
        <input id="check-payload" className="delivery-payload" type="text" inputMode="numeric" autoComplete="off" spellCheck={false} pattern="[0-9]{12}" value={payload} disabled={!ready} onChange={event => setPayload(event.target.value)} aria-invalid={checksum.status === 'invalid'} aria-describedby="payload-hint payload-message" />
        <p className="delivery-mobile-feedback" aria-hidden="true">{checksum.status === 'valid' ? <span>Weighted sum {checksum.sum} · Check digit <strong>{checksum.checkDigit}</strong></span> : <span>{checksum.message}</span>}</p>
        <p id="payload-hint" className="result-detail">Use digits 0–9, including leading zeros. Enter the 12 digits before the check digit. Nothing is sent or saved.</p>
        <button type="button" className="reset-button delivery-reset" disabled={!ready} onClick={() => setPayload(DELIVERY_DEFAULTS.payload)}>Reset digits</button>
      </div><div className="experiment-result" aria-live="polite" aria-atomic="true">
        <h3>GS1 Modulo 10 calculation</h3>
        {checksum.status === 'valid' ? <>
          <dl className="delivery-results"><div><dt>Weighted sum</dt><dd data-result="check-sum">{checksum.sum}</dd></div><div><dt>Check digit</dt><dd data-result="check-digit">{checksum.checkDigit}</dd></div></dl>
          <p className="delivery-outcome delivery-completed" data-result="completed-digits">{checksum.completed}</p>
          <p id="payload-message" className="result-detail">Synthetic payload plus check digit. {checksum.sum} + {checksum.checkDigit} = {checksum.sum + checksum.checkDigit}, a multiple of ten.</p>
        </> : <p id="payload-message" className={checksum.status === 'invalid' ? 'delivery-input-error' : 'delivery-empty'}>{checksum.message}</p>}
        <p className="result-detail">This does not allocate a GTIN, authenticate a product or track a parcel. No barcode image is generated.</p>
      </div></div>
      <details className="model-limits"><summary>Inspect every weight and the source method</summary>
        <p>The rightmost payload digit has weight 3, the next has weight 1, repeating leftwards. For a 12-digit payload this reads 1, 3, 1, 3, …, 1, 3 from the left. Check digit = (10 − (weighted sum mod 10)) mod 10. A sum already divisible by ten gives check digit zero.</p>
        {checksum.status === 'valid' ? <table className="comparison delivery-check-table"><caption>Payload positions count from the left. The check digit is excluded from this table.</caption><thead><tr><th scope="col">Position</th><th scope="col">Digit</th><th scope="col">Weight</th><th scope="col">Product</th></tr></thead><tbody>{checksum.terms.map(term => <tr key={term.position}><th scope="row">{term.position}</th><td>{term.digit}</td><td>{term.weight}</td><td>{term.product}</td></tr>)}</tbody><tfoot><tr><th scope="row" colSpan={3}>Weighted sum</th><td>{checksum.sum}</td></tr></tfoot></table> : <p>Enter a valid 12-digit payload to show its weighted terms.</p>}
        <p>Method: <a href="https://www.gs1.at/sites/default/files/2020-04/Algorithmus-GS1-Pruefziffernberechnung.pdf">GS1 Austria’s standard check-digit calculation (PDF, page 3)</a>. Scope: <a href="https://www.gs1.dk/vaerktojer/beregn-dit-kontrolciffer">GS1 Denmark’s calculator notes</a> distinguish a correct check digit from correct identifier allocation. We implement the arithmetic locally; neither service receives your input.</p>
        <p>The synthetic example follows the numeric length used before a GTIN-13 check digit. The resulting string is not presented as an allocated GS1 identifier. A check digit can miss some errors; arithmetic agreement does not prove identity or shipment status.</p>
        <p><a href={withBase('/articles/barcode/')}>Read about identity and tracking events</a></p>
      </details>
    </section>
    <div className="lab-actions"><button type="button" className="reset-button" disabled={!ready} onClick={resetAll}>Reset all experiments</button><a className="text-link" href="https://github.com/jdinkla/small-frictions/blob/main/site/src/lib/delivery.ts">Inspect the delivery model code</a></div>
  </div>;
}
