# Interactive Learning Platform

Eine moderne, ressourceneffiziente Lernplattform für interaktive Schulaufgaben, automatisierte Feedback-Schleifen, Probetests und Programmierübungen. Entwickelt mit **Next.js 16 (App Router)**, **React 19**, **TypeScript 7**, **ESLint 10** und **Tailwind CSS v4**.

---

## 🎯 Was die Plattform kann

### 💡 Interaktive Aufgabentypen
- **Freitext-Aufgaben (`input`)**: Automatische Auswertung von Antworten mit intelligenter Toleranz für Tippfehler, alternative Schreibweisen, Groß-/Kleinschreibung, Dezimaltrennzeichen (Komma und Punkt) sowie Maßeinheiten.
- **Satz- und Formelbau (`sentence_builder`)**: Wörter, Satzbausteine oder Rechenschritte als Kacheln interaktiv in die richtige Reihenfolge bringen (mit flexibler Erkennung aller gültigen grammatikalischen Satzstellungen).
- **Wortauswahl im Satz (`word_select`)**: Klickbare Satzbausteine zur schnellen Identifikation grammatikalischer Satzglieder (z. B. Prädikate, Verben) oder Fehlerstellen direkt im Fließtext.
- **Multiple-Choice (`choice`)**: Auswahlabfragen mit didaktisch balancierten Optionen (strikte *Option Symmetry*), variierender Antwortverteilung und sofortiger visueller Rückmeldung.
- **Mathematische Rechnungen (`rechnung`)**: Strukturierte Berechnungsaufgaben mit Symbol-Tastatur, neutralem Rechenweg-Notizfeld, schrittweiser Musterlösung sowie toleranter Komma-, Punkt- und Einheiten-Auswertung.
- **Java-Code-Runner (`code`)**: Browserbasierte Java-Entwicklungsumgebung mit leichtgewichtigem Zero-Dependency-Syntax-Highlighting, integriertem Code-Editor (ohne Cursor-Drift), automatischem Klammer- und Semikolon-Check sowie isolierter **Web-Worker-Ausführung** mit hartem Endlosschleifenschutz (optional auch mit lokaler Piston-Server-Sandbox via `docker-compose.sandbox.yml`).

### 📊 Test- und Übungsfunktionen
- **Probetest-Generator**: Erstellt aus den Aufgaben ausgewählter Themengebiete einen gezielten 10-Fragen-Test mit anschließender Punktauswertung, Erfolgsquote und detaillierter Lösungsübersicht.
- **Lösungshinweise & Musterlösungen**: Zu jeder Aufgabe können gestaffelt Denkanstöße (Hints) und fertige Musterlösungen eingeblendet werden.
- **Kann-Listen**: Strukturierte Checklisten zur Selbsteinschätzung und Überprüfung des individuellen Lernstands pro Thema.
- **Demo-Lehrermodus**: Geschützter Bereich mit direkter Einsicht in alle Module, Lösungen und didaktischen Schwerpunkte (HMAC-SHA256-Session-Signatur).

---

## 📚 Enthaltene Lernmodule (14 Fachmodule)

Die Plattform umfasst 14 modulare JSON-Übungseinheiten unter `src/data/students/`:

### 🇩🇪 Deutsch
1. **Einen Bericht schreiben & W-Fragen** (`/deutsch-bericht`)
2. **Literatur-Epochen & Gedichtanalyse** (`/deutsch-epochen`)
3. **Kurzgeschichten & Inhaltsangabe** (`/deutsch-kurzgeschichten`)
4. **Balladen & Gedichtanalyse** (`/deutsch-balladen`)
5. **Argumentation & Erörterung** (`/deutsch-eroerterung`)
6. **Satzglieder & Wortbildung** (`/deutsch-grammatik`)

### 🇬🇧 Englisch
7. **Fragenbildung & Satzbau** (`/englisch-fragen-satzbau`)
8. **Simple Past & Demonstrative Pronouns** (`/englisch-simple-past`)
9. **Conditional Sentences (Type 1 & 2)** (`/englisch-conditionals`)
10. **New York City (Wortschatz & Kontext)** (`/englisch-new-york`)

### 🔢 Mathematik, Wirtschaft & Informatik
11. **Potenzen & Zehnerpotenzen** (`/mathematik-potenzen`)
12. **Statistik, Geometrie & Algebra** (`/mathematik-statistik-geometrie`) — inklusive `Modul 2` mit 32 `rechnung`-Übungen
13. **BWL & Rechnungswesen** (`/rechnungswesen`)
14. **Java-Programmierung** (`/informatik-java`)

---

## 🛠️ Tech-Stack & Architektur

- **Framework**: Next.js 16 (App Router, Turbopack, Server-Component-First mit minimalen DTOs)
- **Datenhaltung**: Reine JSON-Module (`meta.json` + `unit-*.json`) mit On-Demand-Server-Caching (`mtimeMs`-Invalidierung)
- **Qualitätssicherung & Tests**:
  - `npm run typecheck` (TypeScript 7 Native Preview)
  - `npm run lint` (ESLint 10 + `eslint-config-next`)
  - `npm test` (Unit-Tests für Auth, Normalisierung, Java-Interpreter & DAL)
  - `npm run audit` & `npm run audit:comprehensive` (Automatisierte Regel-, Anti-Spoiler- & DSGVO-Audits vor jedem Build)
- **Frontend**: React 19, Tailwind CSS v4, Lucide Icons
- **Code-Editor & Laufzeit**: `react-simple-code-editor`, eigener Java-Tokenizer & isolierter Browser Web Worker
- **Effekte**: Lazy-geladene `canvas-confetti`-Animationen

---

## 🚀 Installation & Lokaler Start

```bash
git clone https://github.com/fotiosl/interactive-learning-platform.git
cd interactive-learning-platform
cp .env.example .env.local
npm install
npm run dev
```

Die Plattform ist danach im Browser unter `http://localhost:3000` erreichbar (Standard-Demopasswort für den Lehrermodus: `demo2026`, anpassbar über `ADMIN_PASSWORD` und `AUTH_SECRET` in `.env.local`).

### Qualitätssicherung lokal ausführen

```bash
npm run typecheck
npm run lint
npm test
npm run audit:comprehensive
npm run build
```

---

## 📄 Lizenz
MIT
