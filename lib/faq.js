// Baza de cunoștințe a asistentului: un set de întrebări frecvente despre
// produsele de asigurări. Conținutul e generic/inventat pentru demo, dar
// scris în stilul unei companii reale de asigurări (sănătate, pensii, viață,
// auto, locuință) + procesul de daune.
//
// De ce FAQ static și nu o bază de date reală?
// Pentru un MVP de 2 zile, un FAQ curat, bine structurat pe categorii, e
// suficient să demonstreze fluxul complet: întrebare -> căutare în cunoștințe
// -> răspuns formulat de LLM. Într-o versiune reală, acest fișier ar deveni
// un index dintr-o bază de date sau un sistem RAG peste documentele oficiale
// ale companiei (condiții contractuale, polițe, ghiduri interne).

export const FAQ = [
  {
    id: "sanatate-1",
    categorie: "Sănătate",
    intrebare: "Ce acoperă o asigurare privată de sănătate?",
    raspuns:
      "O asigurare privată de sănătate acoperă, în funcție de pachet, consultații medicale, investigații (analize, imagistică), spitalizare, intervenții chirurgicale și uneori stomatologie sau maternitate. Pachetele de bază acoperă de regulă consultații și analize uzuale, iar cele premium adaugă spitalizare și intervenții complexe.",
    taguri: ["sănătate", "acoperire", "pachet", "consultații", "spitalizare"],
  },
  {
    id: "sanatate-2",
    categorie: "Sănătate",
    intrebare: "Bolile preexistente sunt acoperite?",
    raspuns:
      "De regulă, bolile diagnosticate înainte de semnarea poliței nu sunt acoperite în primii ani sau necesită o clauză specială. Fiecare afecțiune preexistentă se declară la înscriere și asigurătorul decide dacă o acoperă, o exclude sau aplică o perioadă de așteptare.",
    taguri: ["sănătate", "boli preexistente", "excludere", "declarație"],
  },
  {
    id: "sanatate-3",
    categorie: "Sănătate",
    intrebare: "Există perioadă de așteptare până pot folosi asigurarea de sănătate?",
    raspuns:
      "Da. Consultațiile de bază au de obicei o perioadă de așteptare de 15-30 de zile de la activarea poliței, iar procedurile mai complexe (spitalizare, intervenții) pot avea o perioadă de așteptare de câteva luni. Urgențele medicale sunt de regulă acoperite din prima zi.",
    taguri: ["sănătate", "perioadă de așteptare", "activare", "urgențe"],
  },
  {
    id: "sanatate-4",
    categorie: "Sănătate",
    intrebare: "Pot face asigurare de sănătate dacă am peste 40 de ani?",
    raspuns:
      "Da, vârsta maximă la care se poate încheia o asigurare de sănătate este 59 de ani, dacă depășiți această vârstă nu se mai poate încheia o poliță nouă.",
    taguri: ["sănătate", "vârstă maximă", "încheiere poliță"],
  },
  {
    id: "sanatate-4.1",
    categorie: "Sănătate",
    intrebare: "Pot face asigurare de sănătate la 62 de ani?De ce nu?",
    raspuns:
      "Nu puteți face asta deorace vârstele de peste 59 de ani prezintă riscuri mari pentru asigurător, iar costurile ar fi foarte mari. De aceea, majoritatea companiilor de asigurări stabilesc o limită de vârstă pentru încheierea polițelor de sănătate.",
    taguri: ["sănătate", "detalii", "încheiere poliță", "vârstă maximă"],
  },
  {
    id: "pensii-1",
    categorie: "Pensii",
    intrebare: "Care este diferența dintre Pilonul II și Pilonul III de pensii?",
    raspuns:
      "Pilonul II este obligatoriu pentru salariați și se alimentează automat dintr-un procent din contribuția la asigurările sociale, administrat de un fond privat. Pilonul III este facultativ: oricine poate contribui suplimentar, sumele fiind deductibile fiscal până la un anumit plafon anual, iar banii pot fi retrași de regulă de la vârsta de 60 de ani.",
    taguri: ["pensii", "pilon 2", "pilon 3", "contribuție", "fond privat"],
  },
  {
    id: "pensii-2",
    categorie: "Pensii",
    intrebare: "Pot să îmi retrag banii din pensia privată înainte de pensionare?",
    raspuns:
      "În general nu, sumele acumulate în Pilonul II și III sunt blocate până la vârsta legală de pensionare, cu excepția unor situații speciale, precum invaliditate permanentă sau, în anumite condiții, retragere parțială unică prevăzută de legislație. Retragerea anticipată în afara acestor cazuri nu este permisă.",
    taguri: ["pensii", "retragere", "invaliditate", "blocare fonduri"],
  },
  {
    id: "pensii-3",
    categorie: "Pensii",
    intrebare: "Cât ar trebui să contribui lunar la o pensie privată facultativă?",
    raspuns:
      "Nu există o sumă fixă recomandată — depinde de venit și de obiectivul de pensie dorit. Un reper folosit frecvent este alocarea a 5-10% din venitul net lunar către Pilonul III, ajustat în timp pe măsură ce venitul crește. Contribuțiile sunt flexibile și pot fi modificate oricând.",
    taguri: ["pensii", "contribuție lunară", "pilon 3", "sumă recomandată"],
  },
  {
    id: "viata-1",
    categorie: "Viață",
    intrebare: "Ce este o asigurare de viață și cui îi este utilă?",
    raspuns:
      "O asigurare de viață oferă o sumă asigurată beneficiarilor desemnați în cazul decesului asiguratului, sau uneori și în caz de invaliditate gravă. Este utilă mai ales celor cu persoane în întreținere (copii, partener) sau cu credite active, ca protecție financiară a familiei.",
    taguri: ["viață", "beneficiari", "deces", "protecție financiară"],
  },
  {
    id: "viata-2",
    categorie: "Viață",
    intrebare: "Pot avea mai mulți beneficiari pe o asigurare de viață?",
    raspuns:
      "Da, poți desemna mai mulți beneficiari și poți stabili ce procent din suma asigurată revine fiecăruia. Lista de beneficiari poate fi modificată oricând pe durata contractului, printr-o simplă notificare către asigurător.",
    taguri: ["viață", "beneficiari multipli", "procent", "modificare"],
  },
  {
    id: "auto-1",
    categorie: "Auto",
    intrebare: "Care e diferența dintre RCA și CASCO?",
    raspuns:
      "RCA este obligatorie prin lege și acoperă prejudiciile produse altor persoane sau vehicule într-un accident din vina ta. CASCO este facultativă și acoperă daunele propriului vehicul, inclusiv în caz de furt, vandalism sau accident produs din vina proprie.",
    taguri: ["auto", "rca", "casco", "obligatorie", "facultativă"],
  },
  {
    id: "auto-2",
    categorie: "Auto",
    intrebare: "Ce fac dacă am avut un accident auto?",
    raspuns:
      "Primul pas este să te asiguri că nu există victime și, dacă e cazul, să suni la 112. Apoi se întocmește constatarea amiabilă (sau se cheamă poliția, dacă e obligatoriu) și se notifică asigurătorul cât mai curând, de regulă în maximum 5 zile lucrătoare, cu documentele accidentului și fotografii ale daunelor.",
    taguri: ["auto", "accident", "daună", "constatare amiabilă", "notificare"],
  },
  {
    id: "locuinta-1",
    categorie: "Locuință",
    intrebare: "Asigurarea de locuință este obligatorie?",
    raspuns:
      "Există o asigurare obligatorie de bază (PAD) pentru riscuri precum cutremur, inundații și alunecări de teren, valabilă pentru orice locuință cu destinație de reședință. Pe lângă aceasta, poți încheia o asigurare facultativă, care extinde acoperirea la incendiu, furt, avarii electrice sau răspundere civilă față de vecini.",
    taguri: ["locuință", "pad", "obligatorie", "facultativă", "cutremur"],
  },
  {
    id: "daune-1",
    categorie: "Procesul de daune",
    intrebare: "Cum depun o cerere de despăgubire (daună)?",
    raspuns:
      "De obicei se depune online, prin telefon sau la un birou al asigurătorului, completând un formular de daună și atașând documentele relevante (poliță, dovezi ale evenimentului, facturi sau fotografii). Asigurătorul evaluează dosarul și comunică decizia, de regulă în termenul prevăzut în contract.",
    taguri: ["daună", "despăgubire", "formular", "documente", "proces"],
  },
  {
    id: "daune-2",
    categorie: "Procesul de daune",
    intrebare: "În cât timp primesc despăgubirea după ce depun dosarul?",
    raspuns:
      "Termenul variază în funcție de tipul asigurării și complexitatea cazului, dar majoritatea contractelor prevăd o perioadă standard de evaluare și plată de câteva săptămâni de la finalizarea dosarului complet. Dosarele incomplete sau cele care necesită expertiză suplimentară pot dura mai mult.",
    taguri: ["daună", "termen plată", "despăgubire", "dosar"],
  },
  {
    id: "general-1",
    categorie: "General",
    intrebare: "Pot avea mai multe tipuri de asigurări la același furnizor?",
    raspuns:
      "Da, majoritatea asigurătorilor oferă pachete combinate (de exemplu sănătate + viață, sau auto + locuință), adesea cu reduceri pentru clienții care au mai multe polițe active în același timp.",
    taguri: ["general", "pachete combinate", "multiple polițe", "reducere"],
  },
  {
    id: "general-2",
    categorie: "General",
    intrebare: "Pot anula o poliță de asigurare după ce am semnat-o?",
    raspuns:
      "Da, majoritatea contractelor prevăd un termen de renunțare (de obicei 14-30 de zile de la semnare) în care poți anula fără penalizări. După acest termen, anularea este posibilă, dar poate implica penalizări sau pierderea unor beneficii acumulate, în funcție de tipul poliței.",
    taguri: ["general", "anulare", "renunțare", "penalizare"],
  },
];

// Retrieval simplu bazat pe potrivire de cuvinte-cheie (nu embeddings/vector
// search - suficient pentru un FAQ de dimensiuni mici și transparent în
// funcționare, ceea ce contează pentru o demonstrație tehnică).
export function searchFAQ(query, topN = 4) {
  const normalize = (s) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // elimină diacriticele pentru matching mai robust

  const queryWords = normalize(query)
    .split(/\W+/)
    .filter((w) => w.length > 2);

  if (queryWords.length === 0) return [];

  const scored = FAQ.map((entry) => {
    const haystack = normalize(
      `${entry.intrebare} ${entry.raspuns} ${entry.taguri.join(" ")} ${entry.categorie}`
    );
    let score = 0;
    for (const word of queryWords) {
      if (haystack.includes(word)) score += 1;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.entry);
}
