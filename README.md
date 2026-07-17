# InsurAI — Asistent conversațional pentru asigurări

Temă pentru interviu — prototip funcțional construit în ~1 zi de lucru efectiv,
cu Claude ca partener de dezvoltare.

## 1. De ce acest proiect

Am ales un chatbot pentru domeniul asigurărilor în loc de o pagină de prezentare
generică, din două motive:

- Departamentul menționează explicit **chatbots** și **automatizare procese**
  printre ariile de lucru — deci proiectul e direct relevant, nu doar o
  demonstrație de cod izolată.
- Un chatbot de tip întrebări-răspunsuri e suficient de mic ca să fie realizabil
  în timp scurt, dar suficient de complex ca să arate mai multe decizii de
  arhitectură (frontend, backend, integrare LLM, controlul halucinațiilor) —
  ceea ce cred că spune mai multe despre modul meu de gândire decât un simplu
  landing page.

## 2. Decizia arhitecturală principală

Cerința a fost explicit "simplu: FAQ + LLM pentru formulare de răspunsuri", nu
un RAG complet cu embeddings. Am respectat asta intenționat, dar am construit
căutarea în FAQ ca un modul separat (`lib/faq.js`), izolat de partea de LLM —
astfel încât, dacă aș vrea să trec la o căutare vectorială reală, aș înlocui
doar `searchFAQ()`, fără să ating restul aplicației.

Fluxul e:

```
întrebare utilizator
      │
      ▼
căutare prin cuvinte-cheie în FAQ (lib/faq.js)
      │
      ▼
top 4 intrări relevante devin "context"
      │
      ▼
Claude primește context + întrebare, cu instrucțiuni stricte
să răspundă DOAR pe baza contextului (app/api/chat/route.js)
      │
      ▼
răspuns natural + sursele folosite, afișate în UI
```

Motivul pentru care am insistat pe "răspunde doar din context, altfel spune că
nu știi": într-un domeniu ca asigurările, un chatbot care inventează încrezător
condiții sau sume e mai periculos decât unul care nu răspunde deloc. Prefer să
arăt că am gândit la asta explicit, în promptul de sistem, decât să las modelul
să improvizeze.

## 3. Cum am folosit AI-ul (Claude)

- **Ca partener de proiectare**: am discutat cu Claude ideile de proiect
  posibile pentru acest task, am ales una împreună pe baza fitului cu
  departamentul, apoi am clarificat scope-ul (deployment live, conținut
  inventat de mine, nivel tehnic simplu) înainte de a scrie cod — ca să nu
  pierd timp construind ceva ce ar fi trebuit refăcut.
- **Ca implementator**: structura Next.js, componenta de chat, ruta API și
  logica de căutare au fost generate de Claude pe baza deciziilor de mai sus,
  apoi revizuite de mine (am ajustat conținutul FAQ-ului, promptul de sistem
  și limitele de siguranță ale răspunsurilor).
- **Ca designer**: direcția vizuală (navy instituțional + accent auriu,
  tipografie serif/sans, elementul de "ștampil") a fost gândită explicit ca să
  evite aspectul generic de "AI chatbot demo" și să semene cu identitatea unei
  companii de asigurări.

Unde am intervenit eu, nu doar am acceptat output-ul: conținutul FAQ (am vrut
răspunsuri credibile, nu genericisme), promptul de sistem (regulile de
siguranță — să nu dea sfaturi financiare personalizate, să nu inventeze
acoperiri), și decizia de a păstra căutarea simplă (cuvinte-cheie) în loc de a
adăuga complexitate inutilă pentru un MVP de 1-2 zile.

## 6. Ce aș face într-o versiune 2

- Înlocuirea FAQ-ului static cu un index RAG peste documente reale (condiții
  generale, ghiduri interne) — arhitectura curentă e pregătită pentru asta.
- Logare a întrebărilor fără răspuns găsit în FAQ, ca semnal pentru echipă
  despre ce lipsește din baza de cunoștințe.
- Escaladare către un consultant uman (ex: buton "vorbește cu un agent") atunci
  când modelul nu are context suficient.
