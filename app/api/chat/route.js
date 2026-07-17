import { searchFAQ } from "../../../lib/faq";

const GEMINI_MODEL = "gemini-3.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;


const SYSTEM_PROMPT = `Ești asistentul virtual al departamentului de asigurări. Răspunzi
scurt, clar și prietenos, în limba română.

Reguli stricte:
1. Răspunde DOAR pe baza informațiilor din contextul furnizat mai jos (extras din baza
   de cunoștințe internă). Nu inventa acoperiri, sume, termene sau condiții care nu
   apar în context.
2. Dacă întrebarea nu are legătură cu contextul furnizat, spune politicos că nu ai
   această informație și recomandă contactarea unui consultant uman.
3. Nu oferi sfaturi financiare sau juridice personalizate ("ar trebui să alegi X") -
   prezinți informația neutru, ca un ghid, nu ca o recomandare definitivă.
4. Poți reformula și combina informația din mai multe intrări din context, dar nu
   adăuga fapte noi.
5. Ține răspunsul la 2-4 propoziții, fără liste inutil de lungi.`;

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Mesaj invalid." }, { status: 400 });
    }

    const recentForSearch = Array.isArray(history) ? history.slice(-3) : [];
    const searchQuery = [...recentForSearch.map((h) => h.content), message].join(" ");

    const relevant = searchFAQ(message, 4);

    const context =
      relevant.length > 0
        ? relevant
            .map(
              (r, i) =>
                `[${i + 1}] Categorie: ${r.categorie}\nÎntrebare model: ${r.intrebare}\nRăspuns: ${r.raspuns}`
            )
            .join("\n\n")
        : "Nu s-a găsit nicio informație relevantă în baza de cunoștințe pentru această întrebare.";

    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];

    const contents = [
      ...recentHistory.map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      {
        role: "user",
        parts: [
          {
            text: `Context din baza de cunoștințe:\n${context}\n\nÎntrebarea utilizatorului: ${message}`,
          },
        ],
      },
    ];

    const geminiRes = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.4,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });


    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Eroare Gemini API:", data);
      const geminiMessage = data?.error?.message || "Eroare necunoscută de la Gemini.";
      return Response.json({ error: geminiMessage }, { status: geminiRes.status });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Nu am putut genera un răspuns.";

    return Response.json({
      answer,
      sources: relevant.map((r) => ({ categorie: r.categorie, intrebare: r.intrebare })),
    });
  } catch (err) {
    console.error("Eroare /api/chat:", err);
    return Response.json(
      { error: "A apărut o eroare la procesarea mesajului. Încearcă din nou." },
      { status: 500 }
    );
  }
}
