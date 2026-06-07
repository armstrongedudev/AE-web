import "./StatsStrip.css";

/**
 * Stats strip — implements Figma 140:6856.
 * Cream band; 4 credential markers spaced across the 1280 row; green labels.
 * Responsive: row (desktop) → 2×2 grid (tablet/phone).
 */
export default function StatsStrip() {
  return (
    <section className="stats" aria-label="Credentials">
      <div className="stats__bar">
        <div className="stats__item stats__item--logo">
          <span className="stats__heart">
            <img src="/brand/reggio-heart.png" alt="" />
          </span>
          <span className="stats__label">
            Reggio Emilia
            <br />
            Approach
          </span>
        </div>

        <div className="stats__item">
          <span className="stats__label">
            DECAL-Approved
            <br />
            Trainer
          </span>
        </div>

        <div className="stats__item">
          <span className="stats__label">
            M.A. Educational
            <br />
            Psychology
          </span>
        </div>

        <div className="stats__item stats__item--num">
          <span className="stats__big">+30</span>
          <span className="stats__label">
            Years in
            <br />
            the field
          </span>
        </div>
      </div>
    </section>
  );
}
