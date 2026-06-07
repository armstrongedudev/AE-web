import "./Methods.css";

/** Method pills — playful, slightly rotated, three soft tones (Figma 140:6876). */
const PILLS: { l: string; t: "mint" | "peach" | "bg"; r: number }[] = [
  { l: "Reggio Emilia", t: "mint", r: -5.81 },
  { l: "Constructivism", t: "peach", r: 4.96 },
  { l: "Social learning", t: "mint", r: -4.49 },
  { l: "Play schemas", t: "peach", r: 8.55 },
  { l: "Loose parts", t: "mint", r: 0 },
  { l: "Multiple intelligences", t: "mint", r: -7.01 },
  { l: "Emergent curriculum", t: "bg", r: 5.57 },
  { l: "Documentation", t: "mint", r: 0 },
  { l: "Reflective practice", t: "bg", r: -5.38 },
];

const IMAGES = [1, 2, 3, 4, 5, 6];

/**
 * Methods — implements Figma 140:6870.
 * 1280 content width (matches the sections above/below); vertical cream→white→cream
 * background; left copy block with rotated method pills + credentials line; right
 * 584×460 card with a continuously looping marquee of portrait (280×460) photos
 * and cream edge fades.
 */
export default function Methods() {
  const tiles = [...IMAGES, ...IMAGES]; // duplicated for a seamless loop
  return (
    <section className="methods" id="about" aria-labelledby="methods-title">
      <div className="methods__inner">
        <div className="methods__copy">
          <p className="methods__eyebrow">CAMILLE'S PHILOSOPHY</p>
          <h2 id="methods-title" className="methods__title">
            Play is research. Observation is love.
          </h2>
          <p className="methods__body">
            It's the belief behind every training. A mother of two and a Georgia
            DECAL-approved trainer with an M.A. in Educational Psychology, Camille treats
            close observation as the foundation of respect for the child — and weaves
            Reggio Emilia, schemas, loose parts and multiple intelligences into practice
            teachers can use on Monday morning.
          </p>

          <div className="methods__pills">
            {PILLS.map((p) => (
              <span
                key={p.l}
                className={`methods__pill methods__pill--${p.t}`}
                style={{ transform: `rotate(${p.r}deg)` }}
              >
                {p.l}
              </span>
            ))}
          </div>

          <p className="methods__cred">
            M.A. Educational Psychology · DECAL-Approved Trainer · 30+ years
          </p>
        </div>

        <div className="methods__media">
          <div className="methods__track">
            {tiles.map((n, i) => (
              <span className="methods__tile" key={i} aria-hidden={i >= IMAGES.length || undefined}>
                <img
                  src={`/brand/methods/m${n}.jpg`}
                  alt={i < IMAGES.length ? `Early-childhood classroom moment ${n}` : ""}
                />
              </span>
            ))}
          </div>
          <div className="methods__fade methods__fade--l" aria-hidden="true" />
          <div className="methods__fade methods__fade--r" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
