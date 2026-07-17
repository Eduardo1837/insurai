"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculatePensionGrowth, formatRON } from "../../lib/pension";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const balance = payload.find((p) => p.dataKey === "balance")?.value ?? 0;
  const contributed = payload.find((p) => p.dataKey === "contributed")?.value ?? 0;
  return (
    <div
      style={{
        background: "#0c1526",
        border: "1px solid rgba(237,239,243,0.2)",
        borderRadius: 8,
        padding: "10px 12px",
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 12,
        color: "#edeff3",
      }}
    >
      <div style={{ marginBottom: 4, color: "#a6b0c3" }}>Vârstă {label} ani</div>
      <div style={{ color: "#c9a24b" }}>Total acumulat: {formatRON(balance)}</div>
      <div style={{ color: "#6c7690" }}>Contribuit: {formatRON(contributed)}</div>
    </div>
  );
}

export default function PensionSimulator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(400);
  const [initialAmount, setInitialAmount] = useState(0);
  const [annualReturnRate, setAnnualReturnRate] = useState(5);

  const result = useMemo(
    () =>
      calculatePensionGrowth({
        currentAge: Number(currentAge) || 0,
        retirementAge: Number(retirementAge) || 0,
        monthlyContribution: Number(monthlyContribution) || 0,
        initialAmount: Number(initialAmount) || 0,
        annualReturnRate: Number(annualReturnRate) || 0,
      }),
    [currentAge, retirementAge, monthlyContribution, initialAmount, annualReturnRate]
  );

  const invalidRange = Number(retirementAge) <= Number(currentAge);

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <span className="brand-mark" />
            InsurAI
          </div>
          <nav className="topbar-nav">
            <Link href="/" className="nav-link">
              ← Asistent conversațional
            </Link>
          </nav>
        </div>
      </header>

      <section className="sim-hero">
        <div className="container">
          <span className="sim-badge">Calcul instant · fără AI</span>
          <p className="eyebrow">Simulator · Pilon III</p>
          <h1 style={{ maxWidth: "16ch" }}>Cât ai putea acumula până la pensie?</h1>
          <p className="lede">
            Un calcul determinist de dobândă compusă, rulat direct în browser — nu
            trece prin niciun model AI, deci e instant și nu are cost per interogare.
            Util pentru estimări rapide, nu constituie consultanță financiară.
          </p>
        </div>
      </section>

      <section className="sim-section">
        <div className="container">
          <div className="sim-grid">
            <div className="sim-panel">
              <h3>Parametrii tăi</h3>

              <div className="sim-field">
                <label>
                  Vârstă curentă <b>{currentAge} ani</b>
                </label>
                <input
                  type="range"
                  min="18"
                  max="64"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                />
              </div>

              <div className="sim-field">
                <label>
                  Vârstă țintă de pensionare <b>{retirementAge} ani</b>
                </label>
                <input
                  type="range"
                  min="50"
                  max="70"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                />
              </div>

              <div className="sim-field">
                <label>
                  Contribuție lunară <b>{formatRON(monthlyContribution)}</b>
                </label>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>

              <div className="sim-field">
                <label>Sumă deja acumulată (opțional)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="sim-field">
                <label>
                  Randament anual estimat <b>{annualReturnRate}%</b>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={annualReturnRate}
                  onChange={(e) => setAnnualReturnRate(e.target.value)}
                />
              </div>

              <p className="sim-note">
                Randamentul e o ipoteză de calcul, nu o garanție — fondurile de
                pensii private au performanțe reale variabile de la an la an.
                Ajustează valoarea ca să vezi cum influențează suma finală.
              </p>
            </div>

            <div>
              {invalidRange ? (
                <div className="sim-panel">
                  <p style={{ color: "var(--text-muted)", margin: 0 }}>
                    Vârsta de pensionare trebuie să fie mai mare decât vârsta curentă
                    ca să pot calcula o simulare.
                  </p>
                </div>
              ) : (
                <>
                  <div className="sim-results">
                    <div className="sim-stat total">
                      <span>Sumă estimată la pensie</span>
                      <b>{formatRON(result.finalBalance)}</b>
                    </div>
                    <div className="sim-stat">
                      <span>Total contribuit</span>
                      <b>{formatRON(result.totalContributed)}</b>
                    </div>
                    <div className="sim-stat gain">
                      <span>Din care câștig din dobândă</span>
                      <b>{formatRON(result.totalGain)}</b>
                    </div>
                  </div>

                  <div className="sim-chart-panel">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.timeline} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c9a24b" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#c9a24b" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="contribFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6c7690" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#6c7690" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(237,239,243,0.08)" />
                        <XAxis
                          dataKey="age"
                          stroke="#6c7690"
                          fontSize={11}
                          tickLine={false}
                          axisLine={{ stroke: "rgba(237,239,243,0.15)" }}
                        />
                        <YAxis
                          stroke="#6c7690"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="contributed"
                          stroke="#6c7690"
                          strokeWidth={1.5}
                          fill="url(#contribFill)"
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="#c9a24b"
                          strokeWidth={2}
                          fill="url(#balanceFill)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>InsurAI — prototip demonstrativ, nu constituie consultanță financiară.</span>
          <span className="disclaimer">
            Calculul rulează integral în server-ul aplicației (matematică pură), fără
            niciun apel către un model AI — zero cost per simulare.
          </span>
        </div>
      </footer>
    </div>
  );
}
