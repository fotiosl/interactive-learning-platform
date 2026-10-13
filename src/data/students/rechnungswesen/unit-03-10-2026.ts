import { Task, DailyLearningUnit } from '@/types/student';

const rechnungswesenTasks: Task[] = [
  {
    id: 'rechnungswesen-buchen-grundlagen',
    topicSlug: 'buchen',
    date: '03.10.2026',
    title: 'Buchungsregeln & Bestandskonten: Soll an Haben',
    subject: 'Rechnungswesen',
    topic: 'Buchungsregeln & T-Konten',
    dateBadge: 'Grundlagen des Buchens',
    description:
      'Hier trainierst du das Fundament der doppelten Buchführung: Die goldene Buchungsregel, das Buchen auf aktiven und passiven Bestandskonten sowie die 4 Denkschritte bei jedem Geschäftsvorfall.',
    type: 'input',
    hideSampleSolution: true,
    inputQuestions: [
      {
        id: 'k1',
        prompt: '1. Wie lautet die grundlegende Buchungsregel für jeden Geschäftsvorfall in der Buchhaltung?',
        placeholder: 'Buchungsregel eingeben...',
        correctAnswers: [
          'Soll an Haben',
          'Soll an haben',
          'soll an haben',
          'Soll an Haben!',
          '„Soll an Haben“',
          '"Soll an Haben"',
        ],
        hint: 'Nenne die beiden Kontoseiten in der richtigen Reihenfolge, verbunden mit dem Wort „an“.',
      },
      {
        id: 'k2',
        prompt: '2. Bringe die 4 Denkschritte beim Bilden eines Buchungssatzes in die richtige logische Reihenfolge:',
        interactionType: 'sentence_builder',
        tiles: [
          'auf welcher kontoseite gebucht wird',
          'welche konten berührt werden',
          'ob eine mehrung oder minderung vorliegt',
          'welchen charakter die konten haben',
        ],
        correctAnswers: [
          'welche konten berührt werden welchen charakter die konten haben ob eine mehrung oder minderung vorliegt auf welcher kontoseite gebucht wird',
        ],
        hint: 'Beginne damit, die beiden betroffenen Konten im Geschäftsfall aufzuspüren.',
      },
      {
        id: 'k3',
        prompt: '3. Auf welcher Seite eines AKTIVEN Bestandskontos wird der Anfangsbestand (AB) erfasst?',
        interactionType: 'choice',
        options: [
          'Auf der Habenseite rechts',
          'Im Inventarverzeichnis',
          'Auf der Sollseite links',
          'Auf gar keinem Konto',
        ],
        correctAnswers: ['Auf der Sollseite links'],
        hint: 'Aktive Konten spiegeln die Vermögensseite der Bilanz wider – der Anfangsbestand steht daher links.',
      },
      {
        id: 'k4',
        prompt: '4. Auf welcher Seite eines PASSIVEN Bestandskontos werden ZUGÄNGE (+) gebucht?',
        interactionType: 'choice',
        options: [
          'Auf der Sollseite links',
          'Auf der Habenseite rechts',
          'Auf der Inventarseite',
          'Auf gar keinem Konto',
        ],
        correctAnswers: ['Auf der Habenseite rechts'],
        hint: 'Passive Konten stehen auf der rechten Bilanzseite: Zugänge stehen immer auf derselben Seite wie der Anfangsbestand.',
      },
      {
        id: 'k5',
        prompt: '5. Auf welcher Seite wird der ABGANG (-) von flüssigen Mitteln auf dem aktiven Konto „Bank“ gebucht?',
        interactionType: 'choice',
        options: [
          'Auf der Sollseite',
          'Auf der Habenseite',
          'Im Inventarbuch',
          'Auf beiden Seiten',
        ],
        correctAnswers: ['Auf der Habenseite'],
        hint: 'Wenn Guthaben abfließt (Minderung), buchst du auf der dem Anfangsbestand gegenüberliegenden Seite.',
      },
      {
        id: 'k6',
        prompt: '6. Welcher mathematische Grundsatz muss bei jedem Buchungssatz ausnahmslos erfüllt sein?',
        interactionType: 'choice',
        options: [
          'Der Sollbetrag muss exakt mit dem Habenbetrag übereinstimmen',
          'Der Habenbetrag muss immer doppelt so hoch sein wie der Sollbetrag',
          'Es dürfen nur runde Hundert-Euro-Beträge gebucht werden',
          'Der Gewinn muss mindestens 10 Prozent betragen',
        ],
        correctAnswers: [
          'Der Sollbetrag muss exakt mit dem Habenbetrag übereinstimmen',
        ],
        hint: 'Die Summe aller Buchungen im Soll muss der Summe aller Buchungen im Haben entsprechen.',
      },
      {
        id: 'k7',
        prompt: '7. Welcher Kontenwechsel liegt vor, wenn Bargeld aus der Kasse auf das betriebliche Bankkonto eingezahlt wird?',
        interactionType: 'choice',
        options: [
          'Passivtausch',
          'Bilanzverlängerung',
          'Aktiv-Passiv-Minderung',
          'Aktivtausch',
        ],
        correctAnswers: [
          'Aktivtausch',
        ],
        hint: 'Sowohl Kasse als auch Bank sind Aktivkonten: Das eine steigt, das andere sinkt um genau denselben Betrag.',
      },
    ],
    teacherNotes:
      'Wichtig für Lernende: Immer zuerst die 4 Schritte klären. Aufschreiben: [Konto im Soll] an [Konto im Haben] [Betrag].',
  },
  {
    id: 'rechnungswesen-bilanz-inventur',
    topicSlug: 'bilanz-inventur',
    date: '03.10.2026',
    title: 'Inventur, Inventar & Bilanz: Aktiva und Passiva',
    subject: 'Rechnungswesen',
    topic: 'Inventur & Bilanzaufbau',
    dateBadge: 'Bilanz & HGB',
    description:
      'Trainiere die Grundlagen aus deinen Unterrichtsunterlagen: Rechtsvorschriften nach dem Handelsgesetzbuch (HGB), Inventurverfahren, Reinvermögen sowie Aufbau und Seiten der Bilanz.',
    type: 'input',
    hideSampleSolution: true,
    inputQuestions: [
      {
        id: 'bi1',
        prompt: '1. Nach welchem Gesetz ist jeder Kaufmann in Deutschland grundsätzlich zur Buchführung verpflichtet?',
        interactionType: 'choice',
        options: [
          'Bürgerliches Gesetzbuch (BGB)',
          'Handelsgesetzbuch (HGB)',
          'Gewerbeordnung (GewO)',
          'Grundgesetz (GG)',
        ],
        correctAnswers: ['Handelsgesetzbuch (HGB)'],
        hint: 'Achte auf das zentrale Gesetzeswerk für Kaufleute (§ 238 HGB).',
      },
      {
        id: 'bi2',
        prompt: '2. Das betriebliche Rechnungswesen gliedert sich in vier Teilbereiche. Welche Aufgabe hat die Finanzbuchhaltung (Geschäftsbuchführung)?',
        interactionType: 'choice',
        options: [
          'Die Ermittlung des Gesamterfolges und die lückenlose Erfassung aller Geschäftsfälle',
          'Die innerbetriebliche Kosten- und Leistungsrechnung zur Preiskalkulation der Waren',
          'Die betriebswirtschaftliche Statistik und Kennzahlenanalyse vergangener Perioden',
          'Die unternehmerische Planungsrechnung und Budgetierung für zukünftige Geschäftsjahre',
        ],
        correctAnswers: [
          'Die Ermittlung des Gesamterfolges und die lückenlose Erfassung aller Geschäftsfälle',
        ],
        hint: 'Die Buchführung dokumentiert alle Vermögensänderungen nach außen und berechnet den Jahreserfolg.',
      },
      {
        id: 'bi3',
        prompt: '3. Welche Aussage zur LINKEN Seite der Bilanz (Aktiva) ist fachlich korrekt?',
        interactionType: 'choice',
        options: [
          'Sie heißt Aktiva und zeigt das Vermögen sowie die Verwendung der finanziellen Mittel',
          'Sie heißt Passiva und zeigt das Fremdkapital sowie die Herkunft aller Finanzmittel',
          'Sie heißt Passiva und dokumentiert alle Schulden gegenüber Banken und Lieferanten',
          'Sie heißt Aktiva und erfasst ausschließlich das Reinvermögen nach Schuldenabzug',
        ],
        correctAnswers: [
          'Sie heißt Aktiva und zeigt das Vermögen sowie die Verwendung der finanziellen Mittel',
        ],
        hint: 'Links steht, wie das vorhandene Geld im Unternehmen angelegt (investiert) wurde.',
      },
      {
        id: 'bi4',
        prompt: '4. Welche Aussage zur RECHTEN Seite der Bilanz (Passiva) ist fachlich korrekt?',
        interactionType: 'choice',
        options: [
          'Sie heißt Aktiva und listet alle Sachanlagen sowie das gesamte Umlaufvermögen auf',
          'Sie heißt Passiva und erfasst die konkrete Verwendung der investierten Finanzmittel',
          'Sie heißt Passiva und zeigt die Herkunft der Mittel aus Eigen- und Fremdkapital',
          'Sie heißt Aktiva und zeigt ausschließlich flüssige Mittel und Forderungsbestände',
        ],
        correctAnswers: [
          'Sie heißt Passiva und zeigt die Herkunft der Mittel aus Eigen- und Fremdkapital',
        ],
        hint: 'Rechts steht, woher das Geld stammt (von den Eigentümern oder von Gläubigern geliehen).',
      },
      {
        id: 'bi5',
        prompt: '5. Nach welchem Prinzip sind die Vermögensposten auf der AKTIVSEITE der Bilanz gegliedert?',
        interactionType: 'choice',
        options: [
          'Nach dem Alphabet der Postenbezeichnungen von A bis Z im Kontenplan',
          'Nach dem Anschaffungswert vom teuersten zum günstigsten Gegenstand',
          'Nach steigender Liquidität vom Anlagevermögen hin zum Umlaufvermögen',
          'Nach fallender Fälligkeit vom Eigenkapital zu den Verbindlichkeiten',
        ],
        correctAnswers: [
          'Nach steigender Liquidität vom Anlagevermögen hin zum Umlaufvermögen',
        ],
        hint: 'Oben steht, was dem Betrieb dauerhaft dient (schwer verkäuflich); unten steht, was schnell zu Geld wird (Kasse, Bank).',
      },
      {
        id: 'bi6',
        prompt: '6. Wie berechnet sich im Inventar das Reinvermögen (Eigenkapital)?',
        interactionType: 'sentence_builder',
        tiles: [
          '= reinvermögen eigenkapital',
          'summe des vermögens',
          '- summe der schulden fremdkapital',
        ],
        correctAnswers: [
          'summe des vermögens - summe der schulden fremdkapital = reinvermögen eigenkapital',
        ],
        hint: 'Ziehe von allen Vermögenswerten die bestehenden Verbindlichkeiten ab.',
      },
      {
        id: 'bi7',
        prompt: '7. Wie viele Jahre müssen Eröffnungsbilanzen, Jahresabschlüsse und Inventare nach § 257 HGB gesetzlich aufbewahrt werden?',
        interactionType: 'choice',
        options: [
          '2 Jahre',
          '10 Jahre',
          '5 Jahre',
          '30 Jahre',
        ],
        correctAnswers: ['10 Jahre'],
        hint: 'Für Handelsbücher, Inventare und Jahresabschlüsse gilt die zehnjährige Aufbewahrungspflicht.',
      },
      {
        id: 'bi8',
        prompt: '8. Was zeichnet eine STICHTAGSINVENTUR aus?',
        interactionType: 'choice',
        options: [
          'Die Bestandsaufnahme erfolgt am Bilanzstichtag oder in einem engen Zeitraum darum',
          'Die Bestandsaufnahme erfolgt laufend über das gesamte Geschäftsjahr im Lager',
          'Die Bestandsaufnahme wird rechnerisch vorverlegt und über Belege hochgerechnet',
          'Die Bestandsaufnahme erfasst nur Stichproben anhand mathematischer Schätzungen',
        ],
        correctAnswers: [
          'Die Bestandsaufnahme erfolgt am Bilanzstichtag oder in einem engen Zeitraum darum',
        ],
        hint: 'Hier wird zeitnah um den 31. Dezember herum gezählt, gemessen und gewogen.',
      },
    ],
    teacherNotes:
      'Gegenüberstellung: Inventar = ausführliches Bestandsverzeichnis mit Einzelposten; Bilanz = kurzgefasste Gegenüberstellung in Kontenform.',
  },
  {
    id: 'rechnungswesen-buchungssaetze-ueben',
    topicSlug: 'geschaeftsvorfaelle-buchen',
    date: '03.10.2026',
    title: 'Geschäftsvorfälle buchen: Training mit Beispielen',
    subject: 'Rechnungswesen',
    topic: 'Geschäftsvorfälle in Buchungssätze umwandeln',
    dateBadge: 'Buchungssätze üben',
    description:
      'Wende die 4 Schritte an konkreten Geschäftsvorfällen aus deinen Übungsblättern an: Von Kassenkäufen über Banküberweisungen bis hin zu Einkäufen und Verkäufen auf Ziel.',
    type: 'input',
    hideSampleSolution: true,
    inputQuestions: [
      {
        id: 'bu1',
        prompt: '1. Geschäftsfall: Bareinkauf von Büromaterial für 100,00 €. Wie lautet der vollständige Buchungssatz?',
        interactionType: 'choice',
        options: [
          'Kasse an Büromaterial 100,00 €',
          'Büromaterial an Kasse 100,00 €',
          'Bank an Geschäftskasse 100,00 €',
          'BGA an Verbindlichkeit 100,00 €',
        ],
        correctAnswers: ['Büromaterial an Kasse 100,00 €'],
        hint: 'Büromaterial nimmt zu (Soll), die Barkasse nimmt durch die Bezahlung ab (Haben).',
      },
      {
        id: 'bu2',
        prompt: '2. Geschäftsfall: Zieleinkauf von Rohstoffen im Wert von 2.000,00 €. Wie lautet der Buchungssatz?',
        interactionType: 'choice',
        options: [
          'Rohstoffe an Verbindlichkeiten a.LL. 2.000,00 €',
          'Verbindlichkeiten a.LL. an Rohstoffe 2.000,00 €',
          'Rohstoffe an Forderungen aus L.L. 2.000,00 €',
          'Verbindlichkeiten a.LL. an Bankkonto 2.000,00 €',
        ],
        correctAnswers: [
          'Rohstoffe an Verbindlichkeiten a.LL. 2.000,00 €',
        ],
        hint: '„Auf Ziel“ bedeutet gegen spätere Rechnung: Rohstoffe nehmen im Soll zu, Verbindlichkeiten aus Lieferungen und Leistungen (a.LL.) steigen im Haben.',
      },
      {
        id: 'bu3',
        prompt: '3. Geschäftsfall: Wir begleichen eine offene Lieferantenrechnung per Banküberweisung in Höhe von 1.500,00 €. Wie lautet der Buchungssatz?',
        interactionType: 'choice',
        options: [
          'Forderungen a.LL. an Bankkonto 1.500,00 €',
          'Bankkonto an Forderungen a.LL. 1.500,00 €',
          'Verbindlichkeiten a.LL. an Bank 1.500,00 €',
          'Bank an Verbindlichkeiten a.LL. 1.500,00 €',
        ],
        correctAnswers: [
          'Verbindlichkeiten a.LL. an Bank 1.500,00 €',
        ],
        hint: 'Die Schulden (Verbindlichkeiten) sinken im Soll; das Bankguthaben sinkt im Haben.',
      },
      {
        id: 'bu4',
        prompt: '4. Geschäftsfall: Ein Kunde begleicht eine offene Rechnung per Banküberweisung auf unser Geschäftskonto über 800,00 €. Wie lautet der Buchungssatz?',
        interactionType: 'choice',
        options: [
          'Bank an Forderungen a.LL. 800,00 €',
          'Forderungen a.LL. an Bank 800,00 €',
          'Kasse an Bank 800,00 €',
          'Umsatzerlöse an Kasse 800,00 €',
        ],
        correctAnswers: ['Bank an Forderungen a.LL. 800,00 €'],
        hint: 'Bankguthaben steigt im Soll; die offenen Forderungen gegenüber dem Kunden sinken im Haben.',
      },
      {
        id: 'bu5',
        prompt: '5. Geschäftsfall: Barabhebung von 500,00 € vom Bankkonto für die Geschäftskasse. Wie lautet der Buchungssatz?',
        interactionType: 'choice',
        options: [
          'Bank an Kasse 500,00 €',
          'Kasse an Bank 500,00 €',
          'Eigenkapital an Kasse 500,00 €',
          'Kasse an Umsatzerlöse 500,00 €',
        ],
        correctAnswers: ['Kasse an Bank 500,00 €'],
        hint: 'In der Kasse liegt mehr Bargeld (+ im Soll), auf der Bank ist weniger Geld (- im Haben).',
      },
      {
        id: 'bu6',
        prompt: '6. Geschäftsfall: Kauf eines neuen Firmenlaptops (Büroausstattung / BGA) auf Ziel für 1.200,00 €. Welcher Buchungssatz entsteht?',
        interactionType: 'choice',
        options: [
          'BGA an Verbindlichkeiten a.LL. 1.200,00 €',
          'Verbindlichkeiten a.LL. an BGA 1.200,00 €',
          'BGA an sonstige Verbindlichkeit 1.200,00 €',
          'Geschäftsausstattung an Kasse 1.200,00 €',
        ],
        correctAnswers: [
          'BGA an Verbindlichkeiten a.LL. 1.200,00 €',
        ],
        hint: 'BGA (Betriebs- und Geschäftsausstattung) wächst im Soll; Verbindlichkeiten a.LL. wachsen im Haben.',
      },
      {
        id: 'bu7',
        prompt: '7. Geschäftsfall: Die Bank schreibt unserem Geschäftskonto Zinserträge in Höhe von 20,00 € gut. Wie lautet der Buchungssatz?',
        interactionType: 'choice',
        options: [
          'Zinserträge an Bank 20,00 €',
          'Kasse an Zinserträge 20,00 €',
          'Bank an Zinserträge 20,00 €',
          'Bank an Verbindlichkeiten 20,00 €',
        ],
        correctAnswers: ['Bank an Zinserträge 20,00 €'],
        hint: 'Das Bankkonto steigt im Soll; der Ertrag (Zinserträge) wird im Haben verbucht.',
      },
      {
        id: 'bu8',
        prompt: '8. Setze den Buchungssatz für die Begleichung der monatlichen Büromiete per Banküberweisung (380,00 €) zusammen:',
        interactionType: 'sentence_builder',
        tiles: [
          'an bank',
          '380,00 €',
          'mietaufwand',
        ],
        correctAnswers: [
          'mietaufwand an bank 380,00 €',
        ],
        hint: 'Folge der Regel: Aufwandskonto im Soll an flüssiges Mittel im Haben mit Betrag.',
      },
    ],
    teacherNotes:
      'Immer darauf hinweisen: Wer bucht (Soll) an Wen bucht (Haben). Beträge auf beiden Seiten identisch.',
  },
];

export const unit03102026: DailyLearningUnit = {
  id: 'rechnungswesen-03.10.2026',
  date: '03.10.2026',
  title: 'Tages-Lerneinheit: 03.10.2026',
  description:
    'Rechnungswesen: Buchungsregeln, Inventur & Bilanz nach HGB sowie praktische Buchungssätze für typische Geschäftsvorfälle.',
  tasks: rechnungswesenTasks,
};

export { rechnungswesenTasks };
