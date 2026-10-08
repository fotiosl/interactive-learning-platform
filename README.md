# Interactive Learning Platform

Eine moderne, webbasierte Lernplattform für interaktive Schulaufgaben, automatisierte Feedback-Schleifen, Probetests und Programmierübungen. Entwickelt mit **Next.js (App Router)**, **TypeScript** und **Tailwind CSS**.

---

## 🎯 Was die Plattform kann

### 💡 Interaktive Aufgabentypen
- **Freitext-Aufgaben (`input`)**: Automatische Auswertung von Antworten mit intelligenter Toleranz für Tippfehler, alternative Schreibweisen, Groß-/Kleinschreibung, Dezimaltrennzeichen (Komma und Punkt) sowie Maßeinheiten.
- **Satz- und Formelbau (`sentence_builder`)**: Wörter, Satzbausteine oder Rechenschritte als Kacheln per Klick oder Drag & Drop interaktiv in die richtige Reihenfolge bringen (mit flexibler Erkennung aller gültigen grammatikalischen Satzstellungen).
- **Wortauswahl im Satz (`word_select`)**: Klickbare Satzbausteine zur schnellen Identifikation grammatikalischer Satzglieder (z. B. Prädikate, Verben) oder Fehlerstellen direkt im Fließtext.
- **Multiple-Choice (`choice`)**: Auswahlabfragen mit didaktisch balancierten Optionen (strikte *Option Symmetry*), variierender Antwortverteilung und sofortiger visueller Rückmeldung.
- **Java-Code-Runner (`code`)**: Browserbasierte Java-Entwicklungsumgebung mit **Syntax-Highlighting**, integriertem Code-Editor (ohne Cursor-Drift), automatischem Klammer- und Semikolon-Check sowie simulierter Konsolenausführung.

### 📊 Test- und Übungsfunktionen
- **Probetest-Generator**: Erstellt aus den Aufgaben ausgewählter Themengebiete einen gezielten 10-Fragen-Test mit anschließender Punktauswertung, Erfolgsquote und detaillierter Lösungsübersicht.
- **Lösungshinweise & Musterlösungen**: Zu jeder Aufgabe können gestaffelt Denkanstöße (Hints) und fertige Musterlösungen eingeblendet werden.
- **Kann-Listen**: Strukturierte Checklisten zur Selbsteinschätzung und Überprüfung des individuellen Lernstands pro Thema.
- **Lehrermodus**: Ein geschützter Bereich für Lehrkräfte mit direkter Einsicht in alle Aufgaben, Lösungen und didaktischen Notizen.

---

## 📚 Enthaltene Lernmodule

Die Plattform umfasst 12 modulare Übungseinheiten für verschiedene Fächer und Schulstufen:

### 🇩🇪 Deutsch
1. **Einen Bericht schreiben & W-Fragen** (`/deutsch-bericht`):
   - Aufbau eines sachlichen Berichts (Überschrift, Einleitung mit den 4 W-Fragen Wer, Was, Wann, Wo; Hauptteil mit Wie und Warum; Schluss mit Folgen).
   - Sachlicher, objektiver Schreibstil ohne persönliche Wertung oder Ausschmückungen.
   - Zeitformen: Präteritum für das Hauptgeschehen, Plusquamperfekt für die Vorzeitigkeit.
   - Umwandlung emotionaler Zeugenaussagen in distanzierten, sachlichen Berichtstext. *(Klasse 7)*
2. **Literatur-Epochen & Gedichtanalyse** (`/deutsch-epochen`):
   - 5 Kernepochen: *Aufklärung* (Gellert), *Sturm und Drang* (Goethes „Mailied“), *Weimarer Klassik* (Goethes „Das Göttliche“), *Romantik* (Eichendorffs „Mondnacht“) und *Expressionismus* (Heyms „Der Gott der Stadt“).
   - Je 3 Module pro Zeitalter: Historischer Kontext/Leitideen, metrische & sprachliche Formanalyse, TATTE-Interpretation. *(Sekundarstufe II / Oberstufe)*
3. **Kurzgeschichten & Inhaltsangabe** (`/deutsch-kurzgeschichten`):
   - Inhaltsangabe nach TATTE (sachlicher Stil, Präsens, Sinnabschnitte, Konjunktionen).
   - Merkmale der Kurzgeschichte (*in medias res*, offenes Ende, Wendepunkt, Leerstellen).
   - Figurenanalyse & Schutzmechanismen zu Etgar Kerets *„Der höfliche Junge“*.
   - Rechtschreibung: *das* oder *dass* mit Ersatzprobe (*dieses, jenes, welches*). *(Klasse 8)*
4. **Balladen & Gedichtanalyse** (`/deutsch-balladen`):
   - Merkmale von Balladen (Ur-Ei der Dichtung: Lyrik, Epik, Dramatik).
   - Metrum (Jambus, Trochäus, Daktylus), Reimschemata und Kadenzen.
   - Textanalysen: Goethes *„Erlkönig“* & *„Zauberlehrling“*, Schillers *„Der Handschuh“*. *(Klasse 7-8)*
5. **Argumentation & Erörterung** (`/deutsch-eroerterung`):
   - These, Argument und Beleg unterscheiden (3B-Regel).
   - Lineare vs. dialektische Erörterung, Sanduhr-Prinzip und begründeter Schluss. *(Klasse 9-10)*
6. **Satzglieder & Wortbildung** (`/deutsch-grammatik`):
   - Prädikate, Prädikatsklammer, Subjekte und Satzbau.
   - Nominalisierungen und Wortbausteine (*-heit, -keit, -ung, -nis, -schaft*). *(Klasse 5-6)*

### 🇬🇧 Englisch
7. **Fragenbildung & Satzbau** (`/englisch-fragen-satzbau`):
   - Entscheidungsfragen, W-Fragen, QuASV-Muster (*Question word - Auxiliary - Subject - Verb*), Hilfsverben *do/does/did*, *be*, *can*.
   - Satzstellung: SPO-Grundregel, Häufigkeitsadverbien (*always, often, never*) und *Place before Time*. *(Klasse 6)*
8. **Conditional Sentences (Type 1 & 2)** (`/englisch-conditionals`):
   - Reale Bedingungen (*Type 1*: Simple Present + will-future).
   - Hypothetische Bedingungen (*Type 2*: Simple Past + would/could).
   - Ratschläge mit *„If I were you“*, Verneinungen und Fehlersuche. *(Klasse 7-8)*
9. **New York City (Green Words)** (`/englisch-new-york`):
   - Wortschatz rund um Reisevorbereitung, Flughafen, Hotel und Stadtleben.
   - Gefühle, Gegenteile und Satzstrukturen. *(Klasse 8)*

### 🔢 Mathematik & Wirtschaft
10. **Statistik & Geometrie** (`/mathematik-statistik-geometrie`):
    - Statistische Kenngrößen: Minimum, Maximum, Spannweite, arithmetisches Mittel, Modalwert, Median.
    - Quantile, Quartilsabstand und Boxplot-Verständnis.
    - Satz des Pythagoras (Katheten, Hypotenuse, Umkehrung).
    - Flächen- und Umfangsberechnung (Quadrate, Trapeze, Dreiecke). *(Klasse 8)*
11. **BWL & Rechnungswesen** (`/rechnungswesen`):
    - Doppelte Buchführung, Kontenarten (Aktiv-/Passivkonten).
    - Buchungsregel (*Soll an Haben*), Inventur und Bilanzaufbau nach HGB.
    - Buchungssätze auf T-Konten und Eigenkapitalermittlung. *(Kaufmännische Bildung / WG)*

### 💻 Informatik
12. **Java-Programmierung** (`/informatik-java`):
    - Konsolenausgaben (`System.out.println`), Datentypen und Berechnungen.
    - Verzweigungen (`if` / `else`) und while-Schleifen (Zählschleifen & Akkumulatoren).
    - Interaktiver Editor mit Live-Code-Ausführung im Browser.

---

## 🛠️ Tech-Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Frontend**: React 19, Tailwind CSS v4
- **Typisierung**: TypeScript 5
- **Code-Editor**: `react-simple-code-editor`, `prismjs`
- **Icons**: Lucide React
- **Animationen**: `canvas-confetti`

---

## 🚀 Installation & Lokaler Start

### Voraussetzungen
- Node.js 20+
- npm oder pnpm

### Schritte
```bash
# Repository klonen
git clone https://github.com/fotiosl/interactive-learning-platform.git
cd interactive-learning-platform

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Plattform ist danach im Browser unter [http://localhost:3000](http://localhost:3000) erreichbar.

### Konfiguration
Für den geschützten Lehrerbereich kann eine `.env.local`-Datei angelegt werden:
```env
ADMIN_PASSWORD=dein_passwort
```
*(Standard-Demopasswort im öffentlichen Modus: `demo2026`)*

---

## 📄 Lizenz
MIT
