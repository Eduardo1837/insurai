"use client";

import { useState, useRef, useEffect } from "react";

const QUICK_QUESTIONS = [
  "Diferența dintre RCA și CASCO?",
  "Bolile preexistente sunt acoperite?",
  "Cum depun o cerere de despăgubire?",
  "Pilon II vs Pilon III?",
];

const CATEGORIES = [
  { title: "Sănătate", desc: "Consultații, spitalizare" },
  { title: "Viață", desc: "Protecție financiară" },
  { title: "Pensii", desc: "Pilon II & III" },
  { title: "Auto", desc: "RCA, CASCO, daune" },
  { title: "Locuință", desc: "PAD & facultativă" },
];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bună! Sunt asistentul departamentului de asigurări. Întreabă-mă orice despre sănătate, viață, pensii, auto sau locuință.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-8),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "error", content: data.error || "A apărut o eroare." },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.answer, sources: data.sources },
        ]);
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "error", content: "Nu am putut contacta serverul. Încearcă din nou." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <span className="brand-mark" />
            InsurAI
          </div>
          <span className="brand-tag">Departament produse digitale</span>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div style={{ position: "relative" }}>
            <div className="stamp">
              <span className="stamp-text">
                Răspuns
                <br />
                Ancorat
                <br />
                În FAQ
              </span>
            </div>
            <p className="eyebrow">Asistent conversațional · Asigurări</p>
            <h1>Întrebări clare despre asigurări, răspunsuri fără jargon.</h1>
            <p className="lede">
              Un prototip care caută răspunsul potrivit într-o bază de cunoștințe despre
              produsele de asigurări și îl formulează natural, fără să inventeze acoperiri
              sau termene care nu există.
            </p>
            <div className="stat-strip">
              <div className="stat">
                <b>5</b>
                <span>categorii acoperite</span>
              </div>
              <div className="stat">
                <b>16</b>
                <span>intrări în baza de cunoștințe</span>
              </div>
              <div className="stat">
                <b>0</b>
                <span>răspunsuri în afara contextului</span>
              </div>
            </div>
          </div>

          <div className="chat-panel">
            <div className="chat-header">
              <span className="chat-dot" />
              <div className="chat-header-text">
                <b>Asistent asigurări</b>
                <span>răspunde pe baza FAQ intern</span>
              </div>
            </div>

            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  {m.content}
                  {m.sources && m.sources.length > 0 && (
                    <div className="msg-sources">
                      Surse: {m.sources.map((s) => s.categorie).join(" · ")}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="msg assistant">
                  <div className="typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            <div className="quick-questions">
              {QUICK_QUESTIONS.map((q) => (
                <button key={q} className="quick-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>

            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                className="chat-input"
                placeholder="Scrie o întrebare despre asigurări..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="send-btn" type="submit" disabled={loading || !input.trim()}>
                Trimite
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="how">
        <div className="container">
          <h2>Cum funcționează</h2>
          <p className="lede">
            Fluxul e simplu în mod deliberat: căutare transparentă în cunoștințe, apoi
            formulare naturală. Fără magie ascunsă, fără halucinații necontrolate.
          </p>
          <div className="ledger">
            <div className="ledger-row">
              <span className="ledger-num">01</span>
              <span className="ledger-title">Întrebarea ta</span>
              <span className="ledger-desc">
                Scrii o întrebare liberă, în română, exact cum ai întreba un coleg de la
                ghișeu.
              </span>
            </div>
            <div className="ledger-row">
              <span className="ledger-num">02</span>
              <span className="ledger-title">Căutare în FAQ</span>
              <span className="ledger-desc">
                Serverul caută prin cuvinte-cheie intrările relevante din baza de
                cunoștințe despre asigurări și le selectează pe cele mai apropiate.
              </span>
            </div>
            <div className="ledger-row">
              <span className="ledger-num">03</span>
              <span className="ledger-title">Formulare cu LLM</span>
              <span className="ledger-desc">
                Modelul primește doar acele intrări ca context și are instrucțiuni stricte
                să răspundă exclusiv pe baza lor, nu din cunoștințe generale.
              </span>
            </div>
            <div className="ledger-row">
              <span className="ledger-num">04</span>
              <span className="ledger-title">Răspuns + surse</span>
              <span className="ledger-desc">
                Utilizatorul primește răspunsul și categoriile din care a fost extras, ca
                să existe trasabilitate.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2>Ce acoperă baza de cunoștințe</h2>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <div className="cat-card" key={c.title}>
                <b>{c.title}</b>
                <span>{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>InsurAI — prototip demonstrativ, nu constituie consultanță financiară.</span>
          <span className="disclaimer">
            Conținutul FAQ este ilustrativ, folosit pentru a demonstra arhitectura
            asistentului, nu reprezintă oferta reală a unei companii de asigurări.
          </span>
        </div>
      </footer>
    </div>
  );
}
