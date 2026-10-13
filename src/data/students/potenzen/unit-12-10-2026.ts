import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// TASK 1: POTENZEN VERSTEHEN & BERECHNEN (BASIS, EXPONENT, VORZEICHEN)
// ============================================================================
const potenzenTaskPotenzenGrundlagen: Task = {
  id: 'carah-potenzen-grundlagen',
  topicSlug: 'potenzen-grundlagen',
  date: '12.10.2026',
  title: 'Potenzen verstehen & berechnen: Basis, Exponent & Vorzeichen',
  subject: 'Mathematik',
  topic: 'Potenzen Grundlagen',
  dateBadge: '12.10.2026 • Grundlagen',
  description:
    'Lerne die Grundlagen der Potenzrechnung: Basis und Exponent unterscheiden, Potenzen als mehrfache Multiplikation berechnen und die Vorzeichenregeln mit und ohne Klammern sicher anwenden.',
  type: 'input',
  readingText: {
    title: 'Wissensbox: Grundlagen der Potenzrechnung',
    content: `POTENZEN: BEGRIFFE & VORZEICHENREGELN

1. WAS IST EINE POTENZ?
Eine Potenz ist die abkürzende Schreibweise für ein Produkt aus lauter gleichen Faktoren:
   aⁿ = a · a · a · ... · a  (der Faktor a wird n-mal mit sich selbst multipliziert)

• a heißt BASIS (Grundzahl): die Zahl, die wiederholt multipliziert wird.
• n heißt EXPONENT (Hochzahl): zählt, wie oft die Basis als Faktor vorkommt.
• Das Ergebnis der Rechnung nennt man POTENZWERT.
  Beispiel: 2⁴ = 2 · 2 · 2 · 2 = 16 (Basis: 2, Exponent: 4, Potenzwert: 16).

2. BESONDERE EXPONENTEN:
• Exponent 1: Jede Zahl hoch 1 ergibt wieder die Zahl selbst: a¹ = a (z. B. 7¹ = 7).
• Exponent 0: Jede Zahl (außer 0) hoch 0 ergibt genau 1: a⁰ = 1 (z. B. 5⁰ = 1, 100⁰ = 1).

3. DIE VORZEICHENFALLE MIT KLAMMERN:
Achte genau darauf, ob das Minuszeichen mit in der Klammer steht oder davor!
• Mit Klammer: Die negative Zahl ist die Basis:
  – (-2)⁴ = (-2) · (-2) · (-2) · (-2) = +16 (Gerader Exponent: Ergebnis ist POSITIV!)
  – (-2)³ = (-2) · (-2) · (-2) = -8 (Ungerader Exponent: Ergebnis ist NEGATIV!)
• Ohne Klammer: Das Minus steht vor der Potenz:
  – -2⁴ = -(2 · 2 · 2 · 2) = -16 (Hier wird nur die 2 potenziert, das Minus bleibt davor!)
  – Merke: (-3)² = +9, aber -3² = -9!

4. POTENZEN VON BRÜCHEN UND DEZIMALZAHLEN:
• (0,2)² = 0,2 · 0,2 = 0,04 (zwei Nachkommastellen!)
• (2/3)² = (2/3) · (2/3) = 4/9 (Zähler und Nenner werden getrennt potenziert).`,
    source: 'Mathematik 7. Klasse • Potenzen & Wurzeln',
  },
  checklistItems: [
    {
      id: 'chk-cg-1',
      text: 'Ich kann Basis, Exponent und Potenzwert fehlerfrei benennen.',
      category: 'Begriffe',
    },
    {
      id: 'chk-cg-2',
      text: 'Ich kann einfache Potenzen wie 2^4, 3^3 und 5^2 im Kopf ausrechnen.',
      category: 'Kopfrechnen',
    },
    {
      id: 'chk-cg-3',
      text: 'Ich kenne den Unterschied zwischen (-a)^n und -a^n mit und ohne Klammer.',
      category: 'Vorzeichenregeln',
    },
    {
      id: 'chk-cg-4',
      text: 'Ich weiß, dass a^0 = 1 und a^1 = a für jede Basis gilt.',
      category: 'Sonderfälle',
    },
  ],
  inputQuestions: [
    {
      id: 'pot-gr-01',
      prompt: 'Wie bezeichnet man in der Potenz 5³ die Zahl 5?',
      interactionType: 'choice',
      options: ['Exponent', 'Basis   ', 'Faktor  ', 'Produkt '],
      correctAnswers: ['Basis   '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Gesucht ist der mathematische Fachbegriff für die Grundzahl einer Potenz.',
      sampleSolution: 'Basis',
    },
    {
      id: 'pot-gr-02',
      prompt: 'Berechne den Potenzwert: 2⁴',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['16'],
      hint: 'Multipliziere die Zahl 2 viermal mit sich selbst: 2 · 2 · 2 · 2.',
      sampleSolution: '16',
    },
    {
      id: 'pot-gr-03',
      prompt: 'Welche Hochzahl gehört in die Lücke, damit die Gleichung stimmt? 3 = 27',
      interactionType: 'choice',
      options: ['hoch 2', 'hoch 4', 'hoch 3', 'hoch 9'],
      correctAnswers: ['hoch 3'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Überlege: 3 · 3 · 3 ergibt welchen Wert?',
      sampleSolution: 'hoch 3',
    },
    {
      id: 'pot-gr-04',
      prompt: 'Bringe die Rechenschritte zur Auflösung von 4³ in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['als produkt', 'ergibt 64', 'die basis 4', '4 · 4 · 4'],
      correctAnswers: [
        'Die basis 4 als produkt 4 · 4 · 4 ergibt 64.',
        'Als produkt 4 · 4 · 4 ergibt die basis 4 64.',
      ],
      placeholder: 'Ordne die Rechenschritte...',
      hint: 'Beginne mit der Benennung der Basis und der Multiplikation.',
      sampleSolution: 'Die basis 4 als produkt 4 · 4 · 4 ergibt 64.',
    },
    {
      id: 'pot-gr-05',
      prompt: 'Berechne den Potenzwert: 5³',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['125'],
      hint: 'Rechne Schritt für Schritt: 5 · 5 = 25, und 25 · 5 = ?',
      sampleSolution: '125',
    },
    {
      id: 'pot-gr-06',
      prompt: 'Welcher Wert ergibt sich bei (-3)² mit Klammer?',
      interactionType: 'choice',
      options: ['-9', '+6', '-6', '+9'],
      correctAnswers: ['+9'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Minus mal Minus ergibt Plus bei einem geraden Exponenten.',
      sampleSolution: '+9',
    },
    {
      id: 'pot-gr-07',
      prompt: 'Berechne den Wert ohne Klammer: -3²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['-9'],
      hint: 'Ohne Klammer wird nur die 3 potenziert; das Minuszeichen bleibt davor stehen.',
      sampleSolution: '-9',
    },
    {
      id: 'pot-gr-08',
      prompt: 'Klicke auf den Exponenten im folgenden mathematischen Term.',
      interactionType: 'word_select',
      words: ['In', 'dem', 'Ausdruck', '7⁴', 'ist', '4', 'die', 'Hochzahl.'],
      correctAnswers: ['4'],
      placeholder: 'Klicke auf die gesuchte Zahl...',
      hint: 'Finde die Zahl, die als Hochzahl angegeben ist.',
      sampleSolution: '4',
    },
    {
      id: 'pot-gr-09',
      prompt: 'Welchen Wert hat jede beliebige Zahl ungleich null mit der Hochzahl 0?',
      interactionType: 'choice',
      options: ['0', '1', '8', '2'],
      correctAnswers: ['1'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Erinnere dich an den festen mathematischen Sonderfall für den Exponenten 0.',
      sampleSolution: '1',
    },
    {
      id: 'pot-gr-10',
      prompt: 'Berechne den Potenzwert: (-2)³',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['-8'],
      hint: 'Der Exponent 3 ist ungerade. Das Produkt aus drei negativen Faktoren ist negativ.',
      sampleSolution: '-8',
    },
    {
      id: 'pot-gr-11',
      prompt: 'Welche Aussage über Potenzen mit geradem Exponenten ist stets wahr?',
      interactionType: 'choice',
      options: [
        '(-a)⁴ ergibt immer ein negatives Ergebnis.',
        '(-a)⁴ hat immer denselben Wert wie -a⁴ hier.',
        '(-a)⁴ ergibt immer ein positives Ergebnis.',
        '(-a)⁴ ergibt stets genau den Wert Null hier.',
      ],
      correctAnswers: ['(-a)⁴ ergibt immer ein positives Ergebnis.'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Ein gerader Exponent bedeutet eine gerade Anzahl an negativen Faktoren.',
      sampleSolution: '(-a)⁴ ergibt immer ein positives Ergebnis.',
    },
    {
      id: 'pot-gr-12',
      prompt: 'Berechne den Potenzwert: 10³',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['1000', '1.000'],
      hint: '10 mal 10 mal 10 ergibt eine Eins mit drei Nullen.',
      sampleSolution: '1000',
    },
    {
      id: 'pot-gr-13',
      prompt: 'Berechne das Quadrat der Dezimalzahl: (0,3)²',
      interactionType: 'choice',
      options: ['0,90', '0,06', '0,60', '0,09'],
      correctAnswers: ['0,09'],
      placeholder: 'Wähle die passende Option...',
      hint: '0,3 · 0,3 hat insgesamt zwei Nachkommastellen.',
      sampleSolution: '0,09',
    },
    {
      id: 'pot-gr-14',
      prompt: 'Bringe die Faktoren zur Potenz 3⁴ in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['3 · 3 · 3 · 3', 'berechnet sich als', 'die potenz 3⁴', 'gleich 81'],
      correctAnswers: [
        'Die potenz 3⁴ berechnet sich als 3 · 3 · 3 · 3 gleich 81.',
        'Die potenz 3⁴ gleich 81 berechnet sich als 3 · 3 · 3 · 3.',
      ],
      placeholder: 'Ordne die Rechenbausteine...',
      hint: 'Beginne mit der Ausgangspotenz und schließe mit dem Ergebnis ab.',
      sampleSolution: 'Die potenz 3⁴ berechnet sich als 3 · 3 · 3 · 3 gleich 81.',
    },
    {
      id: 'pot-gr-15',
      prompt: 'Berechne den Potenzwert: 6²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['36'],
      hint: 'Quadriere die Zahl 6 (6 mal 6).',
      sampleSolution: '36',
    },
    {
      id: 'pot-gr-16',
      prompt: 'Welche Schreibweise stellt das Produkt 7 · 7 · 7 · 7 · 7 als Potenz dar?',
      interactionType: 'choice',
      options: ['7⁵', '5⁷', '75', '35'],
      correctAnswers: ['7⁵'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Die Basis ist der wiederholte Faktor 7, der Exponent zählt die Anzahl der Faktoren.',
      sampleSolution: '7⁵',
    },
    {
      id: 'pot-gr-17',
      prompt: 'Berechne den Potenzwert: (-1)⁶',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['1', '+1'],
      hint: '1 hoch jede Zahl bleibt 1. Da der Exponent 6 gerade ist, wird das Vorzeichen positiv.',
      sampleSolution: '1',
    },
    {
      id: 'pot-gr-18',
      prompt: 'Berechne den Potenzwert: (-1)⁷',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['-1'],
      hint: 'Da der Exponent 7 ungerade ist, bleibt das negative Vorzeichen erhalten.',
      sampleSolution: '-1',
    },
    {
      id: 'pot-gr-19',
      prompt: 'Welcher Wert ergibt sich für 12¹?',
      interactionType: 'choice',
      options: ['01', '12', '00', '24'],
      correctAnswers: ['12'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Der Exponent 1 bedeutet, dass die Basis genau einmal dasteht.',
      sampleSolution: '12',
    },
    {
      id: 'pot-gr-20',
      prompt: 'Berechne den Potenzwert der Quadratzahl: 9²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['81'],
      hint: 'Multipliziere 9 mit sich selbst.',
      sampleSolution: '81',
    },
  ],
};

// ============================================================================
// TASK 2: ZEHNERPOTENZEN & GROSSE ZAHLEN
// ============================================================================
const potenzenTaskZehnerpotenzen: Task = {
  id: 'carah-zehnerpotenzen',
  topicSlug: 'zehnerpotenzen-grosse-zahlen',
  date: '12.10.2026',
  title: 'Zehnerpotenzen & Stufenzahlen: Große Zahlen schreiben',
  subject: 'Mathematik',
  topic: 'Zehnerpotenzen & Stufenzahlen',
  dateBadge: '12.10.2026 • Zehnerpotenzen',
  description:
    'Nutze Zehnerpotenzen zur einfachen Darstellung großer Zahlen: Lerne die Nullen-Regel kennen, wandle Zahlen in die wissenschaftliche Schreibweise um und ordne Größenordnungen sicher zu.',
  type: 'input',
  readingText: {
    title: 'Wissensbox: Zehnerpotenzen & Wissenschaftliche Schreibweise',
    content: `ZEHNERPOTENZEN: STUFENZAHLEN & PRAXIS

1. DIE NULLEN-REGEL BEI ZEHNERPOTENZEN:
Bei Zehnerpotenzen mit natürlichem Exponenten n gibt der Exponent exakt an, wie viele Nullen hinter der Ziffer 1 stehen:
• 10¹ = 10 (eine Null)
• 10² = 100 (zwei Nullen)
• 10³ = 1.000 (Tausend, drei Nullen)
• 10⁴ = 10.000 (Zehntausend, vier Nullen)
• 10⁶ = 1.000.000 (Eine Million, sechs Nullen)
• 10⁹ = 1.000.000.000 (Eine Milliarde, neun Nullen)
• 10¹² = 1.000.000.000.000 (Eine Billion, zwölf Nullen)

2. GROSSE ZAHLEN ALS PRODUKT SCHREIBEN:
Man kann große Zahlen übersichtlich zerlegen in eine Vorderzahl und eine Zehnerpotenz:
• 400.000 = 4 · 100.000 = 4 · 10⁵
• 7.000.000 = 7 · 1.000.000 = 7 · 10⁶
• 35.000 = 35 · 10³ (oder in wissenschaftlicher Schreibweise: 3,5 · 10⁴)

3. VORSILBEN IN DER PHYSIK & TECHNIK:
• Kilo- (k) = 10³ = 1.000 (z. B. 1 km = 10³ m)
• Mega- (M) = 10⁶ = 1.000.000 (z. B. 1 Megabyte = 10⁶ Byte)
• Giga- (G) = 10⁹ = 1.000.000.000 (z. B. 1 Gigabyte = 10⁹ Byte)
• Tera- (T) = 10¹² = 1.000.000.000.000 (z. B. 1 Terabyte = 10¹² Byte)`,
    source: 'Mathematik 7. Klasse • Zehnerpotenzen & Große Zahlen',
  },
  checklistItems: [
    {
      id: 'chk-zp-1',
      text: 'Ich kann den Exponenten einer Zehnerpotenz direkt als Anzahl der Nullen ablesen.',
      category: 'Nullenregel',
    },
    {
      id: 'chk-zp-2',
      text: 'Ich kann Zahlen wie 5.000.000 als 5 · 10^6 schreiben.',
      category: 'Zerlegung',
    },
    {
      id: 'chk-zp-3',
      text: 'Ich kenne die Bezeichnungen Million (10^6) und Milliarde (10^9).',
      category: 'Große Zahlen',
    },
    {
      id: 'chk-zp-4',
      text: 'Ich kann Zehnerpotenzen miteinander vergleichen und der Größe nach ordnen.',
      category: 'Vergleich',
    },
  ],
  inputQuestions: [
    {
      id: 'pot-zp-01',
      prompt: 'Wie viele Nullen hat die Stufenzahl 10⁶ ausgeschrieben?',
      interactionType: 'choice',
      options: ['5 Nullen', '6 Nullen', '7 Nullen', '4 Nullen'],
      correctAnswers: ['6 Nullen'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Der Exponent bei einer Zehnerpotenz gibt direkt die Anzahl der Nullen hinter der 1 an.',
      sampleSolution: '6 Nullen',
    },
    {
      id: 'pot-zp-02',
      prompt: 'Schreibe die Zahl als Potenz mit der Basis 10: 10.000',
      interactionType: 'input',
      placeholder: 'Potenz eintragen...',
      correctAnswers: ['10^4', '10⁴'],
      hint: 'Zähle die Nullen der Zahl 10.000.',
      sampleSolution: '10^4',
    },
    {
      id: 'pot-zp-03',
      prompt: 'Welche Zahl entspricht dem Term 5 · 10⁴?',
      interactionType: 'choice',
      options: ['500.000', '5.000  ', '50.000 ', '500    '],
      correctAnswers: ['50.000 '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Hänge vier Nullen an die Ziffer 5 an.',
      sampleSolution: '50.000',
    },
    {
      id: 'pot-zp-04',
      prompt: 'Bringe die Zehnerpotenzen in aufsteigende Reihenfolge (von klein nach groß).',
      interactionType: 'sentence_builder',
      tiles: ['dann 10²', 'zuletzt 10⁵', 'zuerst 10¹', 'danach 10³'],
      correctAnswers: [
        'Zuerst 10¹ dann 10² danach 10³ zuletzt 10⁵.',
      ],
      placeholder: 'Ordne die Bausteine...',
      hint: 'Vergleiche die Hochzahlen: 1, 2, 3 und 5.',
      sampleSolution: 'Zuerst 10¹ dann 10² danach 10³ zuletzt 10⁵.',
    },
    {
      id: 'pot-zp-05',
      prompt: 'Welche Zahl ist eine Milliarde als Zehnerpotenz?',
      interactionType: 'input',
      placeholder: 'Potenz eintragen...',
      correctAnswers: ['10^9', '10⁹'],
      hint: 'Eine Milliarde hat 9 Nullen hinter der Eins.',
      sampleSolution: '10^9',
    },
    {
      id: 'pot-zp-06',
      prompt: 'Wie lautet der Name der Zahl 10⁶ im Deutschen?',
      interactionType: 'choice',
      options: ['Milliarde', 'Billion  ', 'Tausend  ', 'Million  '],
      correctAnswers: ['Million  '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Eine Zahl mit sechs Nullen hinter der Eins nennt man so.',
      sampleSolution: 'Million',
    },
    {
      id: 'pot-zp-07',
      prompt: 'Berechne das Ergebnis: 3 · 10³ + 4 · 10²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['3400', '3.400'],
      hint: 'Rechne 3000 + 400 zusammen.',
      sampleSolution: '3400',
    },
    {
      id: 'pot-zp-08',
      prompt: 'Klicke auf die größte Zahl in der folgenden Reihe.',
      interactionType: 'word_select',
      words: ['Unter', 'den', 'Zahlen', '10²', '10⁵', '10³', 'ist', '10⁵', 'die', 'größte.'],
      correctAnswers: ['10⁵'],
      placeholder: 'Klicke auf die größte Zahl...',
      hint: 'Wähle die Potenz mit dem höchsten Exponenten.',
      sampleSolution: '10⁵',
    },
    {
      id: 'pot-zp-09',
      prompt: 'Welche Zahl entspricht der Rechnung: 8 · 10⁵?',
      interactionType: 'choice',
      options: ['800.000  ', '80.000   ', '8.000.000', '8.000    '],
      correctAnswers: ['800.000  '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Der Exponent 5 bedeutet fünf Nullen hinter der Ziffer 8.',
      sampleSolution: '800.000',
    },
    {
      id: 'pot-zp-10',
      prompt: 'Wie viele Nullen hat die Zahl 10⁸?',
      interactionType: 'input',
      placeholder: 'Anzahl Nullen eintragen...',
      correctAnswers: ['8', 'acht'],
      hint: 'Lies die Anzahl direkt am Exponenten ab.',
      sampleSolution: '8',
    },
    {
      id: 'pot-zp-11',
      prompt: 'Welche Vorsilbe steht in Maßeinheiten für den Faktor 10³ (Tausend)?',
      interactionType: 'choice',
      options: ['Mega-', 'Kilo-', 'Giga-', 'Dezi-'],
      correctAnswers: ['Kilo-'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Denke an Kilometer (1.000 Meter) oder Kilogramm (1.000 Gramm).',
      sampleSolution: 'Kilo-',
    },
    {
      id: 'pot-zp-12',
      prompt: 'Schreibe 600.000 in der Form 6 · 10^n. Welcher Exponent n gehört in die Hochzahl?',
      interactionType: 'input',
      placeholder: 'Exponent eintragen...',
      correctAnswers: ['5'],
      hint: 'Zähle, wie viele Nullen auf die Ziffer 6 folgen.',
      sampleSolution: '5',
    },
    {
      id: 'pot-zp-13',
      prompt: 'Welche Zehnerpotenz entspricht einer Billion?',
      interactionType: 'choice',
      options: ['10⁰⁹', '10⁰⁶', '10¹²', '10¹⁵'],
      correctAnswers: ['10¹²'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Eine Billion hat zwölf Nullen (eine Million Millionen).',
      sampleSolution: '10¹²',
    },
    {
      id: 'pot-zp-14',
      prompt: 'Berechne den Wert: 7 · 10² - 200',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['500'],
      hint: '7 · 100 = 700. Ziehe danach 200 ab.',
      sampleSolution: '500',
    },
    {
      id: 'pot-zp-15',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['den wert 1000', 'mit drei nullen', 'bedeutet', 'eine eins'],
      correctAnswers: [
        'Eine eins mit drei nullen bedeutet den wert 1000.',
        'Den wert 1000 bedeutet eine eins mit drei nullen.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Verbinde die Aussage über die Nullen mit dem Potenzwert.',
      sampleSolution: 'Eine eins mit drei nullen bedeutet den wert 1000.',
    },
    {
      id: 'pot-zp-16',
      prompt: 'Welcher Exponent fehlt in der Gleichung: 100.000.000 = 10^?',
      interactionType: 'input',
      placeholder: 'Exponent eintragen...',
      correctAnswers: ['8'],
      hint: 'Zähle die Nullen der Zahl: 100 Millionen hat wie viele Nullen?',
      sampleSolution: '8',
    },
    {
      id: 'pot-zp-17',
      prompt: 'Welche der folgenden Zahlen ist am größten?',
      interactionType: 'choice',
      options: ['9 · 10³', '5 · 10²', '8 · 10³', '2 · 10⁴'],
      correctAnswers: ['2 · 10⁴'],
      placeholder: 'Wähle die passende Option...',
      hint: '2 · 10⁴ = 20.000, während 9 · 10³ nur 9.000 ergibt.',
      sampleSolution: '2 · 10⁴',
    },
    {
      id: 'pot-zp-18',
      prompt: 'Berechne das Produkt: 10² · 10³ als Zehnerpotenz.',
      interactionType: 'input',
      placeholder: 'Potenz eintragen...',
      correctAnswers: ['10^5', '10⁵', '100000'],
      hint: '100 · 1.000 = 100.000 (Zwei Nullen plus drei Nullen ergeben fünf Nullen).',
      sampleSolution: '10^5',
    },
  ],
};

// ============================================================================
// TASK 3: POTENZGESETZE & RECHENREGELN (POTENZ VOR PUNKT VOR STRICH)
// ============================================================================
const potenzenTaskPotenzgesetze: Task = {
  id: 'carah-potenzgesetze-rechenregeln',
  topicSlug: 'potenzgesetze-rechenregeln',
  date: '12.10.2026',
  title: 'Potenzgesetze & Rechenregeln: Potenz vor Punkt vor Strich',
  subject: 'Mathematik',
  topic: 'Potenzgesetze & Rangfolge',
  dateBadge: '12.10.2026 • Rechenregeln',
  description:
    'Lerne die Vorrangregeln beim Rechnen mit Potenzen kennen: Potenzen vor Punkt vor Strich! Entdecke zudem die ersten Potenzgesetze für Produkte und Quotienten mit gleicher Basis.',
  type: 'input',
  readingText: {
    title: 'Wissensbox: Vorrangregeln & Potenzgesetze',
    content: `RECHENREGELN BEI POTENZEN

1. DIE ERWEITERTE RANGFOLGE DER RECHENARTEN:
Klammern vor Potenzen vor Punktrechnung vor Strichrechnung!
1. KLAMMERN werden immer zuerst berechnet: (2 + 3)² = 5² = 25.
2. POTENZEN kommen vor Punkt- und Strichrechnung:
   – 3 · 2³ = 3 · 8 = 24  (Achtung: NICHT erst 3 · 2 rechnen! Das ergäbe 6³ = 216!).
   – 5 + 2⁴ = 5 + 16 = 21.
3. PUNKTRECHNUNG (Multiplikation & Division).
4. STRICHRECHNUNG (Addition & Subtraktion).

2. DIE POTENZGESETZE FÜR GLEICHE BASIS:
• Multiplikation (gleiche Basis): EXPONENTEN ADDIEREN!
  aⁿ · aᵐ = aⁿ⁺ᵐ
  Beispiel: 2³ · 2² = (2 · 2 · 2) · (2 · 2) = 2⁵ = 32.

• Division (gleiche Basis): EXPONENTEN SUBTRAHIEREN!
  aⁿ : aᵐ = aⁿ⁻ᵐ
  Beispiel: 3⁵ : 3² = 3⁵⁻² = 3³ = 27.

• Potenzen potenzieren: EXPONENTEN MULTIPLIZIEREN!
  (aⁿ)ᵐ = aⁿ ᐧ ᵐ
  Beispiel: (2²)³ = 2² ᐧ ³ = 2⁶ = 64.

3. HÄUFIGE SCHÜLERFEHLER:
• Fehler: 2³ + 2² = 2⁵? FALSCH! Bei der Addition gibt es KEIN Potenzgesetz!
  Richtig ausrechnen: 2³ + 2² = 8 + 4 = 12 (und nicht 2⁵ = 32!).
• Fehler: 3 · 4² = 12²? FALSCH! Zuerst 4² = 16, dann 3 · 16 = 48!`,
    source: 'Mathematik 7. Klasse • Potenzgesetze & Rechengesetze',
  },
  checklistItems: [
    {
      id: 'chk-pr-1',
      text: 'Ich beachte stets: Potenzrechnung kommt vor Punktrechnung und Strichrechnung.',
      category: 'Rangfolge',
    },
    {
      id: 'chk-pr-2',
      text: 'Ich multipliziere Potenzen mit gleicher Basis, indem ich die Exponenten addiere.',
      category: 'Multiplikation',
    },
    {
      id: 'chk-pr-3',
      text: 'Ich dividiere Potenzen mit gleicher Basis, indem ich die Exponenten subtrahiere.',
      category: 'Division',
    },
    {
      id: 'chk-pr-4',
      text: 'Ich weiß, dass bei der Addition von Potenzen kein Potenzgesetz gilt, sondern einzeln gerechnet werden muss.',
      category: 'Addition & Fehler',
    },
  ],
  inputQuestions: [
    {
      id: 'pot-pr-01',
      prompt: 'Welche Rechenart hat Vorrang: Potenzieren oder Multiplizieren?',
      interactionType: 'choice',
      options: ['Multiplizieren', 'Potenzieren ', 'Gleichrangig', 'Zufallsregel'],
      correctAnswers: ['Potenzieren '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Potenzen werden vor der Punktrechnung berechnet.',
      sampleSolution: 'Potenzieren',
    },
    {
      id: 'pot-pr-02',
      prompt: 'Berechne unter Beachtung der Vorrangregeln: 3 · 2³',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['24'],
      hint: 'Berechne zuerst 2³ = 8, und multipliziere anschließend mit 3.',
      sampleSolution: '24',
    },
    {
      id: 'pot-pr-03',
      prompt: 'Berechne den Wert des Terms: 5 + 3²',
      interactionType: 'choice',
      options: ['64', '11', '14', '16'],
      correctAnswers: ['14'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Zuerst 3² = 9 ausrechnen, dann 5 addieren.',
      sampleSolution: '14',
    },
    {
      id: 'pot-pr-04',
      prompt: 'Bringe die Rechenschritte für (2 + 3)² in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['= 25', '(2 + 3)²', '= 5²'],
      correctAnswers: [
        '(2 + 3)² = 5² = 25',
      ],
      placeholder: 'Ordne die Rechenschritte...',
      hint: 'Klammern haben immer die höchste Priorität.',
      sampleSolution: '(2 + 3)² = 5² = 25',
    },
    {
      id: 'pot-pr-05',
      prompt: 'Fasse mit den Potenzgesetzen zusammen und berechne: 2³ · 2²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['32'],
      hint: 'Gleiche Basis: Addiere die Exponenten zu 2⁵. 2 hoch 5 = ?',
      sampleSolution: '32',
    },
    {
      id: 'pot-pr-06',
      prompt: 'Welche Regel gilt für das Produkt zweier Potenzen mit gleicher Basis: aⁿ · aᵐ?',
      interactionType: 'choice',
      options: [
        'Die Exponenten werden multipliziert.',
        'Die Exponenten werden subtrahiert. ',
        'Die Basen werden miteinander addiert',
        'Die Exponenten werden addiert.     ',
      ],
      correctAnswers: ['Die Exponenten werden addiert.     '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Bei gleicher Basis zählt man zusammen, wie oft der Faktor insgesamt vorkommt.',
      sampleSolution: 'Die Exponenten werden addiert.',
    },
    {
      id: 'pot-pr-07',
      prompt: 'Berechne mit den Potenzgesetzen: 3⁴ : 3²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['9'],
      hint: 'Subtrahiere die Exponenten: 4 - 2 = 2. 3² = ?',
      sampleSolution: '9',
    },
    {
      id: 'pot-pr-08',
      prompt: 'Klicke auf den Fehler im folgenden Satz.',
      interactionType: 'word_select',
      words: ['Bei', 'der', 'Rechnung', '2³', '+', '2²', 'darf', 'man', 'Exponenten', 'addieren.'],
      correctAnswers: ['addieren.'],
      placeholder: 'Klicke auf das falsche Wort...',
      hint: 'Bei einer Addition von Potenzen darf man Exponenten keinesfalls addieren!',
      sampleSolution: 'addieren.',
    },
    {
      id: 'pot-pr-09',
      prompt: 'Berechne die Potenz einer Potenz: (2²)³',
      interactionType: 'choice',
      options: ['64', '32', '16', '12'],
      correctAnswers: ['64'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Multipliziere die Exponenten: 2 · 3 = 6. 2⁶ = ?',
      sampleSolution: '64',
    },
    {
      id: 'pot-pr-10',
      prompt: 'Berechne den Wert des Terms: 2 · 5² - 10',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['40'],
      hint: 'Zuerst 5² = 25, dann 2 · 25 = 50, zuletzt 50 - 10.',
      sampleSolution: '40',
    },
    {
      id: 'pot-pr-11',
      prompt: 'Welche Gleichung ist mathematisch korrekt?',
      interactionType: 'choice',
      options: [
        '4² · 4³ = 4⁶',
        '4² · 4³ = 4⁵',
        '4² + 4³ = 4⁵',
        '4² · 4³ = 8⁵',
      ],
      correctAnswers: ['4² · 4³ = 4⁵'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Basis bleibt 4, die Exponenten 2 und 3 werden addiert.',
      sampleSolution: '4² · 4³ = 4⁵',
    },
    {
      id: 'pot-pr-12',
      prompt: 'Berechne: 10⁵ : 10²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['1000', '1.000', '10^3', '10³'],
      hint: 'Subtrahiere die Exponenten: 5 - 2 = 3. 10³ = ?',
      sampleSolution: '1000',
    },
    {
      id: 'pot-pr-13',
      prompt: 'Welcher Wert ergibt sich bei (4 - 1)³?',
      interactionType: 'choice',
      options: ['09', '63', '27', '12'],
      correctAnswers: ['27'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Klammer zuerst: 4 - 1 = 3. Dann 3³ berechnen.',
      sampleSolution: '27',
    },
    {
      id: 'pot-pr-14',
      prompt: 'Bringe die Rechenschritte für 4 · 3² in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['= 36', '4 · 3²', '= 4 · 9'],
      correctAnswers: [
        '4 · 3² = 4 · 9 = 36',
      ],
      placeholder: 'Ordne die Rechenschritte...',
      hint: 'Potenz vor Punktrechnung ausführen.',
      sampleSolution: '4 · 3² = 4 · 9 = 36',
    },
    {
      id: 'pot-pr-15',
      prompt: 'Berechne das Ergebnis: 2³ + 3²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['17'],
      hint: '2³ = 8 und 3² = 9. Addiere beide Ergebnisse.',
      sampleSolution: '17',
    },
    {
      id: 'pot-pr-16',
      prompt: 'Welcher Exponent n löst die Gleichung: 5⁴ · 5ⁿ = 5⁷?',
      interactionType: 'input',
      placeholder: 'Zahl eintragen...',
      correctAnswers: ['3'],
      hint: 'Überlege: 4 + was ergibt 7?',
      sampleSolution: '3',
    },
    {
      id: 'pot-pr-17',
      prompt: 'Welche Regel gilt für das Potenzieren einer Potenz: (aⁿ)ᵐ?',
      interactionType: 'choice',
      options: [
        'Die Exponenten werden addiert hier.   ',
        'Die Exponenten werden subtrahiert jetzt',
        'Die Basis wird mit Exponent addiert.  ',
        'Die Exponenten werden multipliziert.  ',
      ],
      correctAnswers: ['Die Exponenten werden multipliziert.  '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Beim Potenzieren einer Potenz werden die Hochzahlen miteinander multipliziert.',
      sampleSolution: 'Die Exponenten werden multipliziert.',
    },
    {
      id: 'pot-pr-18',
      prompt: 'Berechne den Wert: 100 - 2 · 5²',
      interactionType: 'input',
      placeholder: 'Ergebnis eintragen...',
      correctAnswers: ['50'],
      hint: '5² = 25. Dann 2 · 25 = 50. Schließlich 100 - 50.',
      sampleSolution: '50',
    },
  ],
};

const allEmmahTasks: Task[] = [
  potenzenTaskPotenzenGrundlagen,
  potenzenTaskZehnerpotenzen,
  potenzenTaskPotenzgesetze,
];

export const unit12102026: DailyLearningUnit = {
  id: 'carah-12.10.2026',
  date: '12.10.2026',
  title: 'Tages-Lerneinheit: 12.10.2026',
  description:
    'Potenzen berechnen (7. Klasse Gymnasium): 3 interaktive Themenbereiche zu Begriffen, Vorzeichenregeln mit Klammern, Zehnerpotenzen & großen Zahlen sowie den Potenzgesetzen.',
  tasks: allEmmahTasks,
};

export { allEmmahTasks as potenzenTasks };
