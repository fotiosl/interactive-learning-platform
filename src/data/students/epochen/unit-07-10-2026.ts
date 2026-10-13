import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// 1. EPOCHE: AUFKLÄRUNG (ca. 1720–1785)
// ============================================================================
const epochenTaskAufklaerung: Task = {
  id: 'epochen-aufklaerung',
  topicSlug: 'aufklaerung',
  date: '07.10.2026',
  title: 'Epoche der Aufklärung: Vernunft, Tugend & Gedichtanalyse',
  subject: 'Deutsch',
  topic: 'Aufklärung (1720–1785)',
  dateBadge: '07.10.2026 • 11. Klasse',
  description:
    'Lerne die Kernideen der Aufklärung kennen (Vernunft, Sapere aude, Toleranz) und analysiere Schritt für Schritt Christian Fürchtegott Gellerts Lehrgedicht.',
  type: 'input',
  readingText: {
    title: 'Epochenüberblick Aufklärung & Gedichttext: Christian Fürchtegott Gellert',
    content: `DAS ZEITALTER DER AUFKLÄRUNG (ca. 1720–1785)
Historischer Kontext & Leitgedanken:
• Leitspruch: „Habe Mut, dich deines eigenen Verstandes zu bedienen!“ (Immanuel Kant: „Sapere aude!“)
• Weltbild: Der Mensch besitzt Vernunft (Ratio). Mit seinem Verstand kann er Vorurteile, Aberglauben und alte Bevormundung überwinden.
• Menschenbild: Der Mensch ist erziehbar. Ziel ist ein selbstbestimmter, toleranter und moralisch handelnder Bürger.
• Literaturverständnis: Literatur soll nützen und erfreuen („prodesse et delectare“). Gedichte und Fabeln wollen den Leser belehren und zum Nachdenken anregen.

GEDICHTTEXT: Christian Fürchtegott Gellert (1715–1769)
„Die Ehre der Natur“ (1757)

1  Die Himmel rühmen des Ewigen Ehre,
2  Ihr Schall pflanzt seinen Namen fort.
3  Ihn rühmt der Erdkreis, ihn preisen die Meere;
4  Vernimm, o Mensch, ihr göttlich Wort!

5  Wer hält die unzählbar viel heitern Sterne?
6  Wer führt die Sonn aus ihrem Zelt?
7  Sie wandelt, leuchtet und lacht uns von ferne,
8  Und geht ein Held durch alle Welt.

9  Vernimmst du, Mensch, der Weisheit Stimmen,
10 Die durch die ganze Schöpfung wehn?
11 O lass dein Herz in Andacht glimmen,
12 Und lerne Gott im Geist verstehn!`,
    source: 'Christian Fürchtegott Gellert: Geistliche Oden und Lieder (Leipzig 1757)',
  },
  checklistItems: [
    { id: 'aufk-chk-1', text: 'Ich kenne Kants Leitspruch und die Rolle der menschlichen Vernunft.', category: 'Epochenwissen' },
    { id: 'aufk-chk-2', text: 'Ich kann Strophenbau, Reimschema und das Metrum (Jambus) bestimmen.', category: 'Formanalyse' },
    { id: 'aufk-chk-3', text: 'Ich erkenne rhetorische Mittel wie Anapher, Personifikation und rhetorische Frage.', category: 'Sprachanalyse' },
    { id: 'aufk-chk-4', text: 'Ich verstehe den belehrenden Charakter des Gedichts (Deismus/Vernunftreligion).', category: 'Interpretation' },
  ],
  teacherNotes:
    'Sekundarstufe II (Oberstufe, Deutsch LK): Zeitalter-Erkennung & Gedichtanalyse. Schwerpunkt Aufklärung: Vernunftoptimismus, Deismus/Naturordnung, lehrhafte Appelle an den Menschen.',
  inputQuestions: [
    // ------------------------------------------------------------------------
    // AUFGABE 1: EPOCHENMERKMALE & WELTBILD DER AUFKLÄRUNG
    // ------------------------------------------------------------------------
    {
      id: 'aufk-q1',
      prompt: 'Welcher Leitgedanke steht im Mittelpunkt des Zeitalters der Aufklärung?',
        interactionType: 'choice',
      options: [
        'Der Rückzug in den Glauben an Vorhersehung und übernatürliche Wunder',
        'Der eigenständige Gebrauch der Vernunft zur Überwindung von Vorurteilen',
        'Die Verherrlichung wilder Gefühle und das Ausleben spontaner Triebe',
        'Die Resignation vor einer Welt, die sich durch den Menschen nicht verbessern lässt',
      ],
      correctAnswers: [
        'Der eigenständige Gebrauch der Vernunft zur Überwindung von Vorurteilen',
      ],
      hint: 'Die Aufklärer setzten auf den Verstand (die Vernunft), um die Welt logisch zu begreifen.',
    },
    {
      id: 'aufk-q2',
      prompt: 'Welche Hauptaufgabe sollte die Literatur nach Ansicht der Aufklärer erfüllen?',
        interactionType: 'choice',
      options: [
        'Sie sollte reine Unterhaltung bieten, ohne jede erzieherische Absicht',
        'Sie sollte düstere Schauergeschichten erzählen, um das Volk einzuschüchtern',
        'Sie sollte den Leser moralisch bilden und zu vernünftigem Handeln anleiten',
        'Sie sollte ausschließlich die Macht des absolutistischen Königs verherrlichen',
      ],
      correctAnswers: [
        'Sie sollte den Leser moralisch bilden und zu vernünftigem Handeln anleiten',
      ],
      hint: 'Literatur sollte die Menschen belehren, klüger und tugendhafter machen.',
    },
    {
      id: 'aufk-q3',
      prompt: 'Bringe die Bausteine für einen klaren Einleitungssatz (TATTE) in die richtige Reihenfolge:',
        interactionType: 'sentence_builder',
      tiles: [
        'thematisiert die vernünftige ordnung der welt',
        'von christian fürchtegott gellert',
        'das lehrgedicht die ehre der natur',
        'aus dem jahr 1757',
      ],
      correctAnswers: [
        'das lehrgedicht die ehre der natur von christian fürchtegott gellert aus dem jahr 1757 thematisiert die vernünftige ordnung der welt',
        'das lehrgedicht die ehre der natur aus dem jahr 1757 von christian fürchtegott gellert thematisiert die vernünftige ordnung der welt',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit dem Gedichttitel („das lehrgedicht...“), nenne Autor und Entstehungsjahr und schließe mit dem Thema.',
      sampleSolution:
        'das lehrgedicht die ehre der natur von christian fürchtegott gellert aus dem jahr 1757 thematisiert die vernünftige ordnung der welt',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 2: FORMALE & SPRACHLICHE GEDICHTANALYSE
    // ------------------------------------------------------------------------
    {
      id: 'aufk-q4',
      prompt: 'Welchen formalen Aufbau (Strophen und Reimschema) hat Gellerts Gedicht?',
        interactionType: 'choice',
      options: [
        'Drei Strophen mit je vier Versen und durchgehendem Kreuzreim (abab)',
        'Vier Strophen mit je drei Versen und durchgehendem Paarreim (aabb)',
        'Zwei lange Strophen mit fünf Versen und umarmendem Reim (abba)',
        'Freie Verse ohne feste Stropheneinteilung und ganz ohne Reime',
      ],
      correctAnswers: [
        'Drei Strophen mit je vier Versen und durchgehendem Kreuzreim (abab)',
      ],
      hint: 'Zähle die Strophen und prüfe, wie sich die Endworte kreuzen: a b a b.',
    },
    {
      id: 'aufk-q5',
      prompt: 'Welches Metrum (Versmaß) liegt in Vers 1 vor: „Die Him-mel rüh-men des E-wi-gen Eh-re“?',
        interactionType: 'input',
      correctAnswers: ['Jambus', 'jambisch', 'vierhebiger Jambus', 'Jambus (vierhebig)'],
      placeholder: 'Metrum eingeben...',
      hint: 'Der Takt beginnt unbetont und steigt an: x X x X (wie im Wort „Ge-dicht“).',
      sampleSolution: 'Jambus (vierhebiger Jambus)',
    },
    {
      id: 'aufk-q6',
      prompt: 'Welches sprachliche Mittel nutzt Gellert in den Versen 5 und 6 („Wer hält...? / Wer führt...?“)?',
        interactionType: 'choice',
      options: [
        'Einen Chiasmus mit klanglicher Überkreuzung gegensätzlicher Begriffe',
        'Ein Oxymoron zur Verdeutlichung eines unlösbaren inneren Widerspruchs',
        'Eine Litotes zur doppelten Verneinung einer unangenehmen Wahrheit',
        'Eine Anapher kombiniert mit rhetorischen Fragen zur Einbindung des Lesers',
      ],
      correctAnswers: [
        'Eine Anapher kombiniert mit rhetorischen Fragen zur Einbindung des Lesers',
      ],
      hint: 'Wiederholung am Versanfang = Anapher; Scheinfrage = rhetorische Frage.',
    },
    {
      id: 'aufk-q7',
      prompt: 'Welches Stilmittel liegt vor, wenn die Sonne wie ein lebendiger Mensch beschrieben wird („wandelt, leuchtet und lacht“)?',
        interactionType: 'input',
      correctAnswers: ['Personifikation', 'personifiziert', 'Personifizierung', 'Vermenschlichung'],
      placeholder: 'Stilmittel eingeben...',
      hint: 'Überlege, welches rhetorische Mittel unbelebten Dingen menschliche Eigenschaften verleiht.',
      sampleSolution: 'Personifikation',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 3: INTERPRETATION, DEUTUNGSHYPOTHESE & EPOCHENZUORDNUNG
    // ------------------------------------------------------------------------
    {
      id: 'aufk-q8',
      prompt: 'Welche Kernaussage (Deutungshypothese) passt am besten zu Gellerts Gedicht?',
        interactionType: 'choice',
      options: [
        'Die Natur ist ein unberechenbares Chaos, vor dem der Mensch sich fürchten muss',
        'Die geordnete Natur beweist dem Menschen, dass die Welt von Vernunft geleitet ist',
        'Der Dichter will aus der Welt fliehen und sein Heil in einsamen Träumen finden',
        'Das Gedicht warnt vor den Gefahren neuer Maschinen für das einfache Landvolk',
      ],
      correctAnswers: [
        'Die geordnete Natur beweist dem Menschen, dass die Welt von Vernunft geleitet ist',
      ],
      hint: 'Die Aufklärung sieht in der Natur Gesetze und Harmonie, die der Mensch mit dem Verstand begreifen kann.',
    },
    {
      id: 'aufk-q9',
      prompt: 'Wie nennt man die Vernunftreligion der Aufklärung, nach der Gott die Welt wie ein Uhrmacher perfekt geschaffen hat, danach aber nicht mehr durch Wunder eingreift?',
        interactionType: 'input',
      correctAnswers: ['Deismus', 'deistisch', 'der Deismus', 'Vernunftreligion'],
      placeholder: 'Begriff eingeben...',
      hint: 'Der Begriff leitet sich vom lateinischen Wort für Gott (deus) ab.',
      sampleSolution: 'Deismus',
    },
    {
      id: 'aufk-q10',
      prompt: 'Woran erkennt man eindeutig, dass Gellerts Gedicht zur Aufklärung gehört und noch nicht zur Romantik?',
        interactionType: 'choice',
      options: [
        'Es schildert finstere Schauerwelten und die Sehnsucht nach dem eigenen Tod',
        'Es verwendet eine radikal vulgäre Sprache ohne jede Rücksicht auf Reimregeln',
        'Es zeigt die Schöpfung als harmonische Ordnung und appelliert an den Verstand',
        'Es beschreibt die Ausbeutung von Fabrikarbeitern in modernen Großstädten',
      ],
      correctAnswers: [
        'Es zeigt die Schöpfung als harmonische Ordnung und appelliert an den Verstand',
      ],
      hint: 'Aufklärung sucht Klarheit und Vernunft; Romantik sucht Geheimnis und Nacht.',
    },
  ],
};

// ============================================================================
// 2. EPOCHE: STURM UND DRANG (ca. 1767–1785)
// ============================================================================
const epochenTaskSturmUndDrang: Task = {
  id: 'epochen-sturm-und-drang',
  topicSlug: 'sturm-und-drang',
  date: '07.10.2026',
  title: 'Sturm und Drang: Geniekult, Erlebnislyrik & Goethes „Mailied“',
  subject: 'Deutsch',
  topic: 'Sturm und Drang (1767–1785)',
  dateBadge: '07.10.2026 • 11. Klasse',
  description:
    'Lerne die Jugendbewegung des Sturm und Drang kennen: das Konzept des „Originalgenies“, den Protest gegen steife Regeln und Goethes mitreißende Erlebnislyrik in „Mailied“.',
  type: 'input',
  readingText: {
    title: 'Epochenüberblick Sturm und Drang & Gedichttext: Johann Wolfgang von Goethe',
    content: `DER STURM UND DRANG (ca. 1767–1785)
Historischer Kontext & Leitgedanken:
• Leitbegriff: Genieepoche! Junge Dichter sehen sich als „Originalgenies“, die frei aus ihrer inneren Schöpferkraft dichten und starre Regeln ablehnen.
• Protest: Aufbegehren gegen gesellschaftliche Zwänge, fürstliche Willkür und die kühle Verstandesherrschaft der Aufklärung.
• Menschenbild: Das fühlende Herz, echte Leidenschaft und persönliche Freiheit stehen an erster Stelle.
• Literaturverständnis: Erlebnislyrik! Gedichte sind nicht mehr belehrende Verse, sondern unmittelbarer Ausdruck von persönlichem Erleben, Liebesglück und Naturbegeisterung.

GEDICHTTEXT: Johann Wolfgang von Goethe (1749–1832)
„Mailied“ (1771, Friederike Brion gewidmet)

1   Wie herrlich leuchtet
2   Mir die Natur!
3   Wie glänzt die Sonne!
4   Wie lacht die Flur!

5   Es dringen Blüten
6   Aus jedem Zweig
7   Und tausend Stimmen
8   Aus dem Gesträuch,

9   Und Freud und Wonne
10  Aus jeder Brust.
11  O Erd, o Sonne!
12  O Glück, o Lust!

13  O Lieb, o Liebe!
14  So golden schön,
15  Wie Morgenwolken
16  Auf jenen Höhn!`,
    source: 'Johann Wolfgang von Goethe: Gedichte (1771 / Erstdruck 1775)',
  },
  checklistItems: [
    { id: 'sud-chk-1', text: 'Ich kenne den Begriff des Originalgenies und den Protest gegen Regeln.', category: 'Epochenwissen' },
    { id: 'sud-chk-2', text: 'Ich bestimme Volksliedstrophe, Reime und den schwungvollen Rhythmus.', category: 'Formanalyse' },
    { id: 'sud-chk-3', text: 'Ich erkenne sprachliche Mittel wie Anaphern, Ausrufe und Naturmetaphern.', category: 'Sprachanalyse' },
    { id: 'sud-chk-4', text: 'Ich verstehe das Konzept der Erlebnislyrik am Zusammenspiel von Natur und Liebe.', category: 'Interpretation' },
  ],
  teacherNotes:
    'Sekundarstufe II (Oberstufe, Deutsch LK): Zeitalter Sturm und Drang. Schwerpunkte: Geniekult, Erlebnislyrik, Verschmelzung von Liebes- und Naturrausch, Ablehnung der Regelpoetik.',
  inputQuestions: [
    // ------------------------------------------------------------------------
    // AUFGABE 1: EPOCHENMERKMALE & DAS KONZEPT DES ORIGINALGENIES
    // ------------------------------------------------------------------------
    {
      id: 'sud-q1',
      prompt: 'Was verstanden die jungen Autoren des Sturm und Drang unter einem „Originalgenie“?',
        interactionType: 'choice',
      options: [
        'Einen Dichter, der sich streng an alle Vorgaben der antiken Poetik hält',
        'Einen Schöpfer, der aus eigener Gefühlskraft dichtet und Regeln sprengt',
        'Einen Gelehrten, der Gedichte vor allem für den absolutistischen Adel schreibt',
        'Einen Mathematiker, der Sprache mit formaler Logik und Zahlen analysiert',
      ],
      correctAnswers: [
        'Einen Schöpfer, der aus eigener Gefühlskraft dichtet und Regeln sprengt',
      ],
      hint: 'Das Genie folgt seiner inneren Naturkraft und setzt eigene Maßstäbe.',
    },
    {
      id: 'sud-q2',
      prompt: 'Wogegen richtete sich der Protest des Sturm und Drang im Vergleich zur Aufklärung?',
        interactionType: 'choice',
      options: [
        'Gegen jede Form von Kunstausübung und für ein schweigsames Einsiedlerleben',
        'Gegen das Verfassen deutscher Texte und für die Rückkehr zur lateinischen Sprache',
        'Gegen die Vorherrschaft des Verstandes und für die Freiheit starker Gefühle',
        'Gegen die Beschäftigung mit der Natur und für das Leben am luxuriösen Hof',
      ],
      correctAnswers: [
        'Gegen die Vorherrschaft des Verstandes und für die Freiheit starker Gefühle',
      ],
      hint: 'Die jungen Autoren fanden reine Vernunft kalt und lebensfern; sie wollten echte Gefühle.',
    },
    {
      id: 'sud-q3',
      prompt: 'Bringe die Bausteine zur Definition von Erlebnislyrik in die richtige Reihenfolge:',
        interactionType: 'sentence_builder',
      tiles: [
        'im mittelpunkt',
        'persönlicher empfindungen',
        'steht der unmittelbare ausdruck',
        'in der erlebnislyrik',
      ],
      correctAnswers: [
        'in der erlebnislyrik steht der unmittelbare ausdruck persönlicher empfindungen im mittelpunkt',
        'in der erlebnislyrik steht im mittelpunkt der unmittelbare ausdruck persönlicher empfindungen',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit „in der erlebnislyrik“, setze das Prädikat an zweiter Stelle und schließe mit „im mittelpunkt“.',
      sampleSolution:
        'in der erlebnislyrik steht der unmittelbare ausdruck persönlicher empfindungen im mittelpunkt',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 2: FORMALE & SPRACHLICHE ANALYSE VON GOETHES „MAILIED“
    // ------------------------------------------------------------------------
    {
      id: 'sud-q4',
      prompt: 'Welche Strophenform nutzt Goethe in seinem Gedicht „Mailied“?',
        interactionType: 'choice',
      options: [
        'Vierzeilige Volksliedstrophen mit kurzen Versen und leichtem Reimfluss',
        'Klassische Sonette mit zwei Quartetten und zwei dreizeiligen Terzetten',
        'Feierliche Odenstrophen in antiken Hexametern ohne jeden Endreim',
        'Lange Doppelstrophen mit komplizierten achtzeiligen Schweifreimen',
      ],
      correctAnswers: [
        'Vierzeilige Volksliedstrophen mit kurzen Versen und leichtem Reimfluss',
      ],
      hint: 'Goethe orientierte sich am einfachen, sangbaren Volkslied.',
    },
    {
      id: 'sud-q5',
      prompt: 'Welches Metrum prägt den schwungvollen Rhythmus der Verse („Wie herr-lich leuch-tet / Mir die Na-tur“)?',
        interactionType: 'input',
      correctAnswers: ['Trochäus', 'trochäisch', 'zweihebiger Trochäus', 'Trochäus (zweihebig)'],
      placeholder: 'Metrum eingeben...',
      hint: 'Bestimme die Silbenfolge: eine betonte Silbe gefolgt von einer unbetonten Silbe (X x).',
      sampleSolution: 'Trochäus (zweihebiger Trochäus)',
    },
    {
      id: 'sud-q6',
      prompt: 'Welches sprachliche Mittel fällt in der ersten Strophe sofort ins Auge („Wie herrlich...! / Wie glänzt...! / Wie lacht...!“)?',
        interactionType: 'choice',
      options: [
        'Eine feine Litotes zur doppelten Verneinung einer ungemütlichen Wetterlage',
        'Ein bitterer Euphemismus zur bewussten Verharmlosung einer großen Gefahr',
        'Ein gelehrter Pleonasmus zur überflüssigen Verdopplung eines Gedankens',
        'Eine Anapher kombiniert mit Ausrufen voller persönlicher Begeisterung',
      ],
      correctAnswers: [
        'Eine Anapher kombiniert mit Ausrufen voller persönlicher Begeisterung',
      ],
      hint: 'Gleicher Versanfang = Anapher; emotionale Ausrufezeichen = Ausruf (Exclamatio).',
    },
    {
      id: 'sud-q7',
      prompt: 'Wie nennt man die enge Verbindung in Strophe 1 bis 3, bei der das Aufblühen der Natur die inneren Gefühle des lyrischen Ichs widerspiegelt?',
        interactionType: 'input',
      correctAnswers: ['Natur-Seelen-Einklang', 'Beseelung der Natur', 'Spiegelung', 'Einklang', 'Naturseeleneinklang', 'Parallele'],
      placeholder: 'Begriff eingeben...',
      hint: 'Beschreibt die harmonische Übereinstimmung zwischen äußerer Landschaft und innerer Gefühlswelt.',
      sampleSolution: 'Natur-Seelen-Einklang (Beseelung der Natur)',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 3: INHALTLICHE INTERPRETATION & ZEITALTER-VERORTUNG
    // ------------------------------------------------------------------------
    {
      id: 'sud-q8',
      prompt: 'Wie hängen Natur und Liebe in Goethes „Mailied“ inhaltlich zusammen?',
        interactionType: 'choice',
      options: [
        'Die grausame Natur zerstört die Hoffnungen des verlassenen lyrischen Ichs',
        'Der erwachende Frühling und das Liebesglück verschmelzen zu einem Gefühlstaumel',
        'Das lyrische Ich verabscheut die Liebe und will nur noch in der Kälte verharren',
        'Die Liebe wird als kühle gesellschaftliche Pflichtaufgabe ohne Freude dargestellt',
      ],
      correctAnswers: [
        'Der erwachende Frühling und das Liebesglück verschmelzen zu einem Gefühlstaumel',
      ],
      hint: 'Natur und Liebe beflügeln sich gegenseitig – die ganze Welt scheint verliebt zu sein.',
    },
    {
      id: 'sud-q9',
      prompt: 'Wie nennt man die Naturanschauung, wonach das Göttliche kein fernes Wesen ist, sondern die gesamte Natur beseelt und durchdringt?',
        interactionType: 'input',
      correctAnswers: ['Pantheismus', 'pantheistisch', 'der Pantheismus'],
      placeholder: 'Begriff eingeben...',
      hint: 'Zusammengesetzt aus pan (alles) und theos (Gott).',
      sampleSolution: 'Pantheismus',
    },
    {
      id: 'sud-q10',
      prompt: 'Warum gilt Goethes „Mailied“ als Meilenstein der deutschen Literatur?',
        interactionType: 'choice',
      options: [
        'Weil es zum ersten Mal in der Geschichte englische Fremdwörter einführte',
        'Weil es den Menschen als willenloses Rädchen in einer Fabrik beschreibt',
        'Weil es echte persönliche Empfindungen lebendig und unbeschwert ausdrückt',
        'Weil es als erstes Werk alle Reime strich und nur noch Prosa enthielt',
      ],
      correctAnswers: [
        'Weil es echte persönliche Empfindungen lebendig und unbeschwert ausdrückt',
      ],
      hint: 'Statt starrer Gelehrsamkeit steht hier das echte, lebendige Dichtererlebnis im Zentrum.',
    },
  ],
};

// ============================================================================
// 3. EPOCHE: WEIMARER KLASSIK (ca. 1786–1805)
// ============================================================================
const epochenTaskKlassik: Task = {
  id: 'epochen-weimarer-klassik',
  topicSlug: 'weimarer-klassik',
  date: '07.10.2026',
  title: 'Weimarer Klassik: Humanitätsideal, Harmonie & Goethes „Das Göttliche“',
  subject: 'Deutsch',
  topic: 'Weimarer Klassik (1786–1805)',
  dateBadge: '07.10.2026 • 11. Klasse',
  description:
    'Lerne das Humanitätsideal von Goethe und Schiller kennen: Warum die Klassik Maß, sittliche Bildung und Harmonie forderte, und analysiere Goethes philosophische Verse in „Das Göttliche“.',
  type: 'input',
  readingText: {
    title: 'Epochenüberblick Weimarer Klassik & Gedichttext: Johann Wolfgang von Goethe',
    content: `DIE WEIMARER KLASSIK (ca. 1786–1805)
Historischer Kontext & Leitgedanken:
• Epochengrenzen: Reicht von Goethes Italienreise (1786) bis zu Friedrich Schillers Tod (1805).
• Historische Erfahrung: Nach dem blutigen Terror der Französischen Revolution wollten Goethe und Schiller keine gewaltsamen Umstürze. Der Mensch sollte stattdessen durch Kunst und Kultur sittlich erzogen werden.
• Leitideal: Humanität, Harmonie, Maß und sittliche Vollendung. Ziel ist die Ausgewogenheit von Pflicht und Neigung, von Verstand und Gefühl.
• Antike als Vorbild: Winckelmanns Ideal der „edlen Einfalt und stillen Größe“. Die Kunst soll zeitlos schöne Vorbilder schaffen.

GEDICHTTEXT: Johann Wolfgang von Goethe (1749–1832)
„Das Göttliche“ (1783) – Zentrale Strophen

1   Edel sei der Mensch,
2   Hilfreich und gut!
3   Denn das allein
4   Unterscheidet ihn
5   Von allen Wesen,
6   Die wir kennen.

7   Denn unfühlend
8   Ist die Natur:
9   Es leuchtet die Sonne
10  Über Bös und Gute,
11  Und dem Verbrecher
12  Glänzen wie dem Besten
13  Der Mond und die Sterne.

14  Wind und Ströme,
15  Donner und Hagel
16  Rauschen ihren Weg
17  Und ergreifen
18  Vorüber eilend
19  Einen um den andern,
20  Die Jungfrau und den Knaben.

21  Nur allein der Mensch
22  Vermag das Unmögliche:
23  Er unterscheidet,
24  Wählet und richtet;
25  Er kann dem Augenblick
26  Dauer verleihen.`,
    source: 'Johann Wolfgang von Goethe: Vermischte Gedichte (1783)',
  },
  checklistItems: [
    { id: 'kla-chk-1', text: 'Ich kenne das Humanitätsideal und die Suche nach Harmonie und Maß.', category: 'Epochenwissen' },
    { id: 'kla-chk-2', text: 'Ich erkenne freie Rhythmen und den getragenen Ton der Gedankenlyrik.', category: 'Formanalyse' },
    { id: 'kla-chk-3', text: 'Ich analysiere die Antithese zwischen gleichgültiger Natur und moralischem Menschen.', category: 'Sprachanalyse' },
    { id: 'kla-chk-4', text: 'Ich deute Goethes Botschaft zur Vorbildfunktion des Guten.', category: 'Interpretation' },
  ],
  teacherNotes:
    'Sekundarstufe II (Oberstufe, Deutsch LK): Zeitalter Weimarer Klassik. Schwerpunkte: Humanitätsideal („Edel sei der Mensch“), Gedankenlyrik, ethische Vorbildfunktion, Synthese aus Pflicht und Neigung.',
  inputQuestions: [
    // ------------------------------------------------------------------------
    // AUFGABE 1: DAS HUMANITÄTSIDEAL DER WEIMARER KLASSIK
    // ------------------------------------------------------------------------
    {
      id: 'kla-q1',
      prompt: 'Welche zentrale Botschaft vermittelt Goethe im berühmten Eingangsvers von „Das Göttliche“ („Edel sei der Mensch, / Hilfreich und gut!“)?',
        interactionType: 'choice',
      options: [
        'Der Mensch soll sich selbst durch moralisches Handeln und Mitgefühl veredeln',
        'Der Mensch soll seine Wut in gewaltsamen Aufständen gegen den Staat entladen',
        'Der Mensch soll sich blind dem Schicksal beugen und auf Bildung verzichten',
        'Der Mensch soll vor allem materiellen Wohlstand auf Kosten anderer anhäufen',
      ],
      correctAnswers: [
        'Der Mensch soll sich selbst durch moralisches Handeln und Mitgefühl veredeln',
      ],
      hint: 'In der Klassik soll der Mensch durch Vernunft und Herz zu einem sittlich vorbildlichen Wesen heranreifen.',
    },
    {
      id: 'kla-q2',
      prompt: 'Inwiefern verbindet die Weimarer Klassik Gedanken aus der Aufklärung und dem Sturm und Drang?',
        interactionType: 'choice',
      options: [
        'Sie wirft alle Regeln über Bord und setzt ausschließlich auf wilde Raserei',
        'Sie verbietet jedes persönliche Gefühl und fordert rein logische Reime',
        'Sie verbindet die Vernunft der Aufklärung mit der Gefühlstiefe des Sturm und Drang',
        'Sie lehnt Bildung und Gefühl gleichermaßen ab und preist das reine Überleben',
      ],
      correctAnswers: [
        'Sie verbindet die Vernunft der Aufklärung mit der Gefühlstiefe des Sturm und Drang',
      ],
      hint: 'Weder kühler Verstand allein noch blinde Leidenschaft genügen: Die Klassik sucht das harmonische Gleichgewicht.',
    },
    {
      id: 'kla-q3',
      prompt: 'Bringe die Bausteine zum Harmonie-Ideal der Weimarer Klassik in die richtige Reihenfolge:',
        interactionType: 'sentence_builder',
      tiles: [
        'von vernunft und gefühl',
        'die weimarer klassik',
        'strebt nach einer',
        'harmonischen verbindung',
      ],
      correctAnswers: [
        'die weimarer klassik strebt nach einer harmonischen verbindung von vernunft und gefühl',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit dem Subjekt („die weimarer klassik“), nenne das Prädikat und schließe mit dem Objekt.',
      sampleSolution:
        'die weimarer klassik strebt nach einer harmonischen verbindung von vernunft und gefühl',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 2: FORMALE & SPRACHLICHE ANALYSE VON „DAS GÖTTLICHE“
    // ------------------------------------------------------------------------
    {
      id: 'kla-q4',
      prompt: 'Welche Form wählt Goethe für das Gedicht „Das Göttliche“?',
        interactionType: 'choice',
      options: [
        'Reimlose freie Rhythmen mit feierlichem und philosophischem Klang',
        'Ein französisches Sonett mit festen Reimen und zwölfhebigen Versen',
        'Ein volkstümliches Schunkellied mit kurzen Versen und lustigem Refrain',
        'Ein strenges Hexameter-Gedicht nach dem exakten Vorbild Homers',
      ],
      correctAnswers: [
        'Reimlose freie Rhythmen mit feierlichem und philosophischem Klang',
      ],
      hint: 'Reimlose, unregelmäßige Verse mit starkem Rhythmus nennt man freie Rhythmen.',
    },
    {
      id: 'kla-q5',
      prompt: 'Welcher wirkungsvolle gedankliche Gegensatz (Stilmittel) wird in den Strophen 2 bis 4 zwischen der Natur und dem Menschen aufgebaut?',
        interactionType: 'input',
      correctAnswers: ['Antithese', 'antithetisch', 'Antithetik', 'Gegensatz', 'Kontrast'],
      placeholder: 'Stilmittel eingeben...',
      hint: 'Gesucht ist der rhetorische Fachbegriff für eine wirkungsvolle Gegenüberstellung gegensätzlicher Gedanken.',
      sampleSolution: 'Antithese (Gegenüberstellung von gleichgültiger Natur und wertendem Menschen)',
    },
    {
      id: 'kla-q6',
      prompt: 'Wie wird die Natur in den Strophen 2 und 3 beschrieben („Denn unfühlend ist die Natur...“)?',
        interactionType: 'choice',
      options: [
        'Als grausamer Dämon, der sich gezielt an unschuldigen Menschen rächt',
        'Als gütige Mutter, die jeden Menschen liebevoll tröstet und beschützt',
        'Als mächtige Kraft, die blind nach Gesetzen wirkt und keine Moral kennt',
        'Als schwache Kulisse, die jederzeit vom Menschen umgebaut werden kann',
      ],
      correctAnswers: [
        'Als mächtige Kraft, die blind nach Gesetzen wirkt und keine Moral kennt',
      ],
      hint: 'Naturgesetze kennen weder Gut noch Böse – erst der Mensch bringt Moral in die Welt.',
    },
    {
      id: 'kla-q7',
      prompt: 'Welches rhetorische Mittel liegt in Vers 23/24 vor, wenn drei Verben ohne Bindewort aneinandergereiht werden: „Er unterscheidet, / Wählet und richtet“?',
        interactionType: 'input',
      correctAnswers: ['Asyndeton', 'Trikolon', 'Akkumulation', 'Dreigliedrigkeit', 'Klimax'],
      placeholder: 'Stilmittel eingeben...',
      hint: 'Achte auf die unverbundene Reihung ohne Konjunktionen sowie die dreiteilige Satzfigur.',
      sampleSolution: 'Asyndeton (bzw. Trikolon)',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 3: PHILOSOPHISCHE DEUTUNG & ZEITALTER-VERORTUNG
    // ------------------------------------------------------------------------
    {
      id: 'kla-q8',
      prompt: 'Was meint Goethe mit der Zeile: „Er kann dem Augenblick / Dauer verleihen“?',
        interactionType: 'choice',
      options: [
        'Der Mensch kann den Ablauf der Uhren mit Willenskraft anhalten',
        'Durch gute Taten, Kultur und Kunstwerke schafft der Mensch Bleibendes',
        'Man soll jeden kurzen Genuss auskosten, ohne an morgen zu denken',
        'Ärzte werden den menschlichen Körper bald unsterblich machen',
      ],
      correctAnswers: [
        'Durch gute Taten, Kultur und Kunstwerke schafft der Mensch Bleibendes',
      ],
      hint: 'In seinen guten Taten und Kunstwerken überwindet der Mensch die Vergänglichkeit.',
    },
    {
      id: 'kla-q9',
      prompt: 'Zu welcher Untergattung der Lyrik zählt man Gedichte wie „Das Göttliche“, die nicht private Gefühle, sondern philosophische Einsichten behandeln?',
        interactionType: 'input',
      correctAnswers: ['Gedankenlyrik', 'Ideenlyrik', 'philosophische Lyrik', 'Reflexionslyrik'],
      placeholder: 'Gattung eingeben...',
      hint: 'Im Gegensatz zur Erlebnislyrik steht hier der Gedanke im Mittelpunkt.',
      sampleSolution: 'Gedankenlyrik (Ideenlyrik)',
    },
    {
      id: 'kla-q10',
      prompt: 'Warum passt „Das Göttliche“ perfekt zur Weimarer Klassik und unterscheidet sich vom Sturm und Drang?',
        interactionType: 'choice',
      options: [
        'Es ruft zum bewaffneten Sturz aller bestehenden Regierungen auf',
        'Es flieht vor der Gesellschaft in eine dunkle Welt voller Gespenster',
        'Es verherrlicht schrankenlose Wut und lehnt jedes Mitgefühl streng ab',
        'Es überwindet den jugendlichen Trotz und setzt auf sittliche Vorbildlichkeit',
      ],
      correctAnswers: [
        'Es überwindet den jugendlichen Trotz und setzt auf sittliche Vorbildlichkeit',
      ],
      hint: 'Die Klassik rebelliert nicht mehr wütend, sondern sucht das Edle und Harmonische im Menschen.',
    },
  ],
};

// ============================================================================
// 4. EPOCHE: ROMANTIK (ca. 1795–1848)
// ============================================================================
const epochenTaskRomantik: Task = {
  id: 'epochen-romantik',
  topicSlug: 'romantik',
  date: '07.10.2026',
  title: 'Romantik: Sehnsucht, Nacht & Eichendorffs „Mondnacht“',
  subject: 'Deutsch',
  topic: 'Romantik (1795–1848)',
  dateBadge: '07.10.2026 • 11. Klasse',
  description:
    'Tauche ein in die Welt der Romantik: Erforsche Motive wie Sehnsucht, die Blaue Blume, Nacht und Natur, und analysiere Eichendorffs Meisterwerk „Mondnacht“ im Detail.',
  type: 'input',
  readingText: {
    title: 'Epochenüberblick Romantik & Gedichttext: Joseph von Eichendorff',
    content: `DIE EPOCHE DER ROMANTIK (ca. 1795–1848)
Historischer Kontext & Leitgedanken:
• Gegenbewegung: Protest gegen die Nüchternheit der Aufklärung, gegen bürgerliche Spießigkeit und die beginnende Industrialisierung. Novalis: „Indem ich dem Gemeinen einen hohen Sinn gebe, so romantisiere ich es.“
• Zentrale Motive:
  – Die Blaue Blume: Symbol für Sehnsucht nach dem Unerreichbaren, Poesie und Liebe.
  – Nacht & Mond: Raum für Träume, Fantasie, das Unbewusste und seelische Ahnungen.
  – Wandermotiv: Aufbruch ins Unbekannte, Suche nach Heimat im Geistigen.
  – Natur als Seelenspiegel: Die Landschaft ist nicht vermessen, sondern magisch und geheimnisvoll beseelt.

GEDICHTTEXT: Joseph von Eichendorff (1788–1857)
„Mondnacht“ (1837)

1   Es war, als hätt der Himmel
2   Die Erde still geküsst,
3   Dass sie im Blütenschimmer
4   Von ihm nun träumen müsst.

5   Die Luft ging durch die Felder,
6   Die Ähren wogten sacht,
7   Es rauschten leis die Wälder,
8   So sternklar war die Nacht.

9   Und meine Seele spannte
10  Weit ihre Flügel aus,
11  Flog durch die stillen Lande,
12  Als flöge sie nach Haus.`,
    source: 'Joseph von Eichendorff: Gedichte (1837)',
  },
  checklistItems: [
    { id: 'rom-chk-1', text: 'Ich kenne romantische Motive wie Sehnsucht, Nacht und Entgrenzung.', category: 'Epochenwissen' },
    { id: 'rom-chk-2', text: 'Ich bestimme Volksliedton, Kreuzreim und abwechselnde Kadenzen.', category: 'Formanalyse' },
    { id: 'rom-chk-3', text: 'Ich analysiere Konjunktiv II, Lautmalerei und zarte Personifikationen.', category: 'Sprachanalyse' },
    { id: 'rom-chk-4', text: 'Ich verstehe den Flug der Seele als Suche nach metaphysischer Heimat.', category: 'Interpretation' },
  ],
  teacherNotes:
    'Sekundarstufe II (Oberstufe, Deutsch LK): Zeitalter Romantik. Schwerpunkte: Eichendorffs „Mondnacht“, Transzendenz, Konjunktiv der Möglichkeit, Natur als Seelenraum, Kritik am Nützlichkeitsdenken.',
  inputQuestions: [
    // ------------------------------------------------------------------------
    // AUFGABE 1: LEITMOTIVE & WELTBILD DER ROMANTIK
    // ------------------------------------------------------------------------
    {
      id: 'rom-q1',
      prompt: 'Wofür steht das berühmte Symbol der „Blauen Blume“ in der Romantik?',
        interactionType: 'choice',
      options: [
        'Für den wirtschaftlichen Wohlstand reicher Kaufmannsfamilien',
        'Für die unstillbare Sehnsucht nach Liebe, Poesie und dem Unendlichen',
        'Für den wissenschaftlichen Beweis einer seltenen Gebirgspflanze',
        'Für den militärischen Sieg im Kampf gegen ausländische Truppen',
      ],
      correctAnswers: [
        'Für die unstillbare Sehnsucht nach Liebe, Poesie und dem Unendlichen',
      ],
      hint: 'Die Blaue Blume verbindet Liebe, Natur und das Fernweh nach dem Übersinnlichen.',
    },
    {
      id: 'rom-q2',
      prompt: 'Warum faszinierte das Motiv der „Nacht“ die Dichter der Romantik so sehr?',
        interactionType: 'choice',
      options: [
        'Weil die Nacht Raum für Träume, Ahnungen, Fantasie und die Seele öffnet',
        'Weil nachts keine Steuern an den regierenden Fürsten gezahlt werden mussten',
        'Weil die Romantiker nachts physikalische Experimente im Labor machten',
        'Weil nachts die Fabrikschlote stillstanden und die Produktion ruhte',
      ],
      correctAnswers: [
        'Weil die Nacht Raum für Träume, Ahnungen, Fantasie und die Seele öffnet',
      ],
      hint: 'Der Tag stand für Alltag und Nutzen; die Nacht für Geheimnis und Seelentiefe.',
    },
    {
      id: 'rom-q3',
      prompt: 'Bringe die Bausteine zum romantischen Natur- und Poesieverständnis in die richtige Reihenfolge:',
        interactionType: 'sentence_builder',
      tiles: [
        'in ein geheimnis',
        'verwandelt die poesie',
        'in der romantik',
        'die alltägliche welt',
      ],
      correctAnswers: [
        'in der romantik verwandelt die poesie die alltägliche welt in ein geheimnis',
        'in der romantik verwandelt die poesie in ein geheimnis die alltägliche welt',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit „in der romantik“, nenne das Prädikat („verwandelt die poesie“) und das Ziel.',
      sampleSolution:
        'in der romantik verwandelt die poesie die alltägliche welt in ein geheimnis',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 2: FORMALE & SPRACHLICHE ANALYSE VON EICHENDORFFS „MONDNACHT“
    // ------------------------------------------------------------------------
    {
      id: 'rom-q4',
      prompt: 'Wie ist Eichendorffs Gedicht „Mondnacht“ formal aufgebaut?',
        interactionType: 'choice',
      options: [
        'Zwei lange Strophen mit je sechs Zeilen und reinem Paarreim (aabbcc)',
        'Vier Strophen mit fünf Versen in freien Rhythmen ganz ohne Reime',
        'Drei vierzeilige Strophen mit regelmäßigem Kreuzreim (abab)',
        'Ein klassisches Sonett mit zwei Quartetten und zwei Terzetten',
      ],
      correctAnswers: [
        'Drei vierzeilige Strophen mit regelmäßigem Kreuzreim (abab)',
      ],
      hint: '3 Strophen mit je 4 Versen = 12 Verse; Reimschema abab.',
    },
    {
      id: 'rom-q5',
      prompt: 'Welche Verbform (Modus) nutzt Eichendorff in Vers 1, 4 und 12 („als hätt... / träumen müsst / als flöge sie“)?',
        interactionType: 'input',
      correctAnswers: ['Konjunktiv II', 'Konjunktiv', 'der Konjunktiv II', 'Konjunktiv 2', 'Irrealis'],
      placeholder: 'Verbform eingeben...',
      hint: 'Die Möglichkeitsform: hätte, müsste, flöge.',
      sampleSolution: 'Konjunktiv II (Möglichkeitsform des Ahnens)',
    },
    {
      id: 'rom-q6',
      prompt: 'Welches Sprachbild eröffnet das Gedicht in Strophe 1 („Es war, als hätt der Himmel / Die Erde still geküsst“)?',
        interactionType: 'choice',
      options: [
        'Eine Übertreibung, die vor einem drohenden Unwetter warnen soll',
        'Eine zarte Personifikation, die Himmel und Erde wie ein Liebespaar zeigt',
        'Eine zynische Ironie, die sich über Liebesbeziehungen lustig macht',
        'Ein Wortspiel, das auf die landwirtschaftliche Ernte anspielt',
      ],
      correctAnswers: [
        'Eine zarte Personifikation, die Himmel und Erde wie ein Liebespaar zeigt',
      ],
      hint: 'Himmel und Erde küssen sich: eine liebevolle Personifikation zweier Welten.',
    },
    {
      id: 'rom-q7',
      prompt: 'Wie nennt man die sprachliche Wirkung in Strophe 2 („Es rauschten leis die Wälder“), bei der Wörter das Geräusch klanglich nachahmen?',
        interactionType: 'input',
      correctAnswers: ['Lautmalerei', 'Klangmalerei', 'Onomatopoesie', 'Lautmalerisch', 'Klangmalerisch'],
      placeholder: 'Begriff eingeben...',
      hint: 'Überlege, wie man die akustische Nachahmung von Naturgeräuschen durch Sprache fachsprachlich nennt.',
      sampleSolution: 'Klangmalerei (Onomatopoesie)',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 3: INTERPRETATION, TRANSZENDENZ & ZEITALTER-VERORTUNG
    // ------------------------------------------------------------------------
    {
      id: 'rom-q8',
      prompt: 'Wie lässt sich das Bild der fliegenden Seele am Schluss verstehen („Als flöge sie nach Haus“)?',
        interactionType: 'choice',
      options: [
        'Der Wanderer freut sich darauf, bald wieder in seinem Bett zu schlafen',
        'Das lyrische Ich fürchtet sich vor wilden Tieren im dunklen Wald',
        'Der Dichter plant eine Auswanderung in ein fernes fremdes Land',
        'Die Seele spürt im Einklang mit der Natur eine tiefe Geborgenheit im Kosmos',
      ],
      correctAnswers: [
        'Die Seele spürt im Einklang mit der Natur eine tiefe Geborgenheit im Kosmos',
      ],
      hint: '„Nach Haus“ bedeutet hier nicht das reale Haus, sondern die seelische Heimat im Göttlichen.',
    },
    {
      id: 'rom-q9',
      prompt: 'Wie lautet der Fachbegriff für das typisch romantische Überschreiten und Auflösen von Grenzen zwischen Mensch, Natur und Kosmos?',
        interactionType: 'input',
      correctAnswers: ['Entgrenzung', 'Transzendenz', 'die Entgrenzung', 'Verschmelzung', 'All-Einheit'],
      placeholder: 'Begriff eingeben...',
      hint: 'Der Begriff beschreibt das Aufheben fester Schranken und Grenzen.',
      sampleSolution: 'Entgrenzung (Transzendenz)',
    },
    {
      id: 'rom-q10',
      prompt: 'Inwiefern unterscheidet sich Eichendorffs Naturgefühl von der Haltung der Aufklärung?',
        interactionType: 'choice',
      options: [
        'Eichendorff will die Natur physikalisch vermessen und wissenschaftlich nutzen',
        'Eichendorff erlebt die Natur als zauberhaften und geheimnisvollen Seelenraum',
        'Eichendorff hält die Natur für völlig bedeutungslos gegenüber Maschinen',
        'Eichendorff fordert die sofortige Rodung aller Wälder für neue Fabriken',
      ],
      correctAnswers: [
        'Eichendorff erlebt die Natur als zauberhaften und geheimnisvollen Seelenraum',
      ],
      hint: 'Aufklärung will die Natur berechnen; Romantik will ihren Zauber erfühlen.',
    },
  ],
};

// ============================================================================
// 5. EPOCHE: EXPRESSIONISMUS (ca. 1910–1925)
// ============================================================================
const epochenTaskExpressionismus: Task = {
  id: 'epochen-expressionismus',
  topicSlug: 'expressionismus',
  date: '07.10.2026',
  title: 'Expressionismus: Großstadt, Ich-Zerfall & Georg Heyms „Der Gott der Stadt“',
  subject: 'Deutsch',
  topic: 'Expressionismus (1910–1925)',
  dateBadge: '07.10.2026 • 11. Klasse',
  description:
    'Lerne die Schockwirkung der Moderne kennen: Wie Industrialisierung, Großstadt und Kriegsvorahnung den Expressionismus prägten, und untersuche Heyms Gedicht „Der Gott der Stadt“.',
  type: 'input',
  readingText: {
    title: 'Epochenüberblick Expressionismus & Gedichttext: Georg Heym',
    content: `DER EXPRESSIONISMUS (ca. 1910–1925)
Historischer Kontext & Leitgedanken:
• Zeitgeschichtlicher Hintergrund: Rasantes Wachstum der Großstädte (Berlin), Technisierung, Anonymität und die düstere Vorahnung einer weltweiten Katastrophe (Erster Weltkrieg 1914–1918).
• Weltbild: Krisengefühl. Die moderne Welt wird als entfremdet, kalt und bedrohlich empfunden. Das bequeme Bürgertum wird radikal kritisiert.
• Menschenbild: Ich-Zerfall! Der Einzelne fühlt sich in der Masse einsam, austauschbar und ausgeliefert.
• Ästhetik & Stil:
  – Reihungsstil: Bilder werden unverbunden wie Filmschnitte aneinandergereiht.
  – Farbmetaphorik: Signal- und Todesfarben (Schwarz, Rot, Gelb).
  – Feste Form vs. Chaos: Wilde, chaotische Inhalte werden oft in strenge Strophen gepresst, um die Spannung zu steigern.

GEDICHTTEXT: Georg Heym (1887–1912)
„Der Gott der Stadt“ (1910)

1   Auf einem Häuserblocke sitzt er breit.
2   Die Winde lagern schwarz um seine Stirn.
3   Er schaut voll Wut, wo fern in Einsamkeit
4   Die letzten Häuser in das Land verirrn.

5   Vom Abend glänzt der rote Bauch dem Baal,
6   Die großen Städte knien um ihn her.
7   Der Kirchenglocken ungeheure Zahl
8   Wogt auf zu ihm aus schwarzem Wolkenmeer.

9   Wie Korybanten-Tanz dröhnt die Musik
10  Der Millionen durch die Straßen laut.
11  Der Schlote Rauch, die Wolken der Fabrik
12  Ziehn auf zum Duft, der ihm die Stirne blaut.

13  Der Tag verdämmert im Gebirgs-Gestell.
14  Die Nacht erglänzt vom Brande rot und wild.
15  Er streckt die Faust: Ein Meer von Flammen schwillt
16  Und frisst die Straßen, eine Glut, die brennt.`,
    source: 'Georg Heym: Der ewige Tag (Berlin 1911)',
  },
  checklistItems: [
    { id: 'exp-chk-1', text: 'Ich kenne Großstadtmotive, Anonymität und die Krisenerfahrung der Epoche.', category: 'Epochenwissen' },
    { id: 'exp-chk-2', text: 'Ich erkenne den Reihungsstil und den Gegensatz aus strenger Form und Chaos.', category: 'Formanalyse' },
    { id: 'exp-chk-3', text: 'Ich analysiere düstere Farbmetaphern und die Baal-Dämonisierung.', category: 'Sprachanalyse' },
    { id: 'exp-chk-4', text: 'Ich deute die Zivilisationskritik und die Vorahnung der Katastrophe.', category: 'Interpretation' },
  ],
  teacherNotes:
    'Sekundarstufe II (Oberstufe, Deutsch LK): Zeitalter Expressionismus. Schwerpunkte: Georg Heym, Baal als Götzengott der Industrie-Großstadt, Reihungsstil, Apokalypse, Zivilisationskritik.',
  inputQuestions: [
    // ------------------------------------------------------------------------
    // AUFGABE 1: DIE KRISENERFAHRUNG DES EXPRESSIONISMUS
    // ------------------------------------------------------------------------
    {
      id: 'exp-q1',
      prompt: 'Welches Lebensgefühl prägte die Generation der expressionistischen Dichter um 1910 am stärksten?',
        interactionType: 'choice',
      options: [
        'Eine heitere Zufriedenheit mit den Errungenschaften der modernen Gesellschaft',
        'Die unberührte Ruhe und Geborgenheit des traditionellen Dorflebens',
        'Das Schockerlebnis von Reizüberflutung, Entfremdung und drohender Katastrophe',
        'Das Vertrauen in die ewige Weisheit und Fürsorge adeliger Herrscher',
      ],
      correctAnswers: [
        'Das Schockerlebnis von Reizüberflutung, Entfremdung und drohender Katastrophe',
      ],
      hint: 'Die Dichter reagierten schockiert auf die Kälte der Großstadt und spürten den nahenden Krieg.',
    },
    {
      id: 'exp-q2',
      prompt: 'Was versteht man unter dem typisch expressionistischen „Reihungsstil“?',
        interactionType: 'choice',
      options: [
        'Das Nebeneinanderstellen einzelner Bilder ohne logische Satzverbindung',
        'Das strenge Einhalten einer langen, zusammenhängenden Erzählung',
        'Die alphabetische Sortierung aller Verse nach dem ersten Buchstaben',
        'Die feierliche Wiederholung desselben Refrains nach jeder einzelnen Strophe',
      ],
      correctAnswers: [
        'Das Nebeneinanderstellen einzelner Bilder ohne logische Satzverbindung',
      ],
      hint: 'Zeile für Zeile wird ein neues drastisches Bild montiert – wie Schnitte in einem modernen Film.',
    },
    {
      id: 'exp-q3',
      prompt: 'Bringe die Bausteine zum expressionistischen Lebensgefühl in der Großstadt in die richtige Reihenfolge:',
        interactionType: 'sentence_builder',
      tiles: [
        'das gefühl von geborgenheit',
        'verliert der mensch',
        'in der modernen großstadt',
        'und seine eigene identität',
      ],
      correctAnswers: [
        'in der modernen großstadt verliert der mensch das gefühl von geborgenheit und seine eigene identität',
        'in der modernen großstadt verliert der mensch seine eigene identität und das gefühl von geborgenheit',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit „in der modernen großstadt“, nenne das Prädikat und Subjekt und verbinde die beiden Objekte.',
      sampleSolution:
        'in der modernen großstadt verliert der mensch das gefühl von geborgenheit und seine eigene identität',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 2: FORMALE & SPRACHLICHE ANALYSE VON HEYMS „DER GOTT DER STADT“
    // ------------------------------------------------------------------------
    {
      id: 'exp-q4',
      prompt: 'Welchen antiken Götzen beschwört Heym in Vers 5 als Herrscher über die Stadt („glänzt der rote Bauch dem Baal“)?',
        interactionType: 'input',
      correctAnswers: ['Baal', 'der Baal', 'Götze Baal', 'Gott Baal'],
      placeholder: 'Name eingeben...',
      hint: 'Ein vierbuchstabiger Name aus Vers 5 des Textes.',
      sampleSolution: 'Baal',
    },
    {
      id: 'exp-q5',
      prompt: 'Welche Signalwirkung haben die Leitfarben Schwarz und Rot in Heyms Gedicht?',
        interactionType: 'choice',
      options: [
        'Sie symbolisieren die zarte Unschuld und Heiterkeit eines Sommertags',
        'Sie stehen für den Reichtum und den festlichen Prunk der Bürgerhäuser',
        'Sie vermitteln eine friedliche Stimmung von Ruhe und Besinnlichkeit',
        'Sie erzeugen eine bedrohliche Atmosphäre von Ruß, Blut, Glut und Zerstörung',
      ],
      correctAnswers: [
        'Sie erzeugen eine bedrohliche Atmosphäre von Ruß, Blut, Glut und Zerstörung',
      ],
      hint: 'Schwarz (Kohlerauch, Tod) und Rot (Feuer, Glut, Blut) sind Farben des Untergangs.',
    },
    {
      id: 'exp-q6',
      prompt: 'Welche formale Spannung fällt bei Heyms Gedicht „Der Gott der Stadt“ auf?',
        interactionType: 'choice',
      options: [
        'Das Gedicht verzichtet völlig auf Verse und besteht nur aus loser Prosa',
        'Das chaotische Grauen wird in eine disziplinierte, feste Strophenform gepresst',
        'Jede Strophe wechselt willkürlich zwischen verschiedenen Sprachen hin und her',
        'Der Text ist als heiteres Tanzlied für festliche Anlässe angelegt',
      ],
      correctAnswers: [
        'Das chaotische Grauen wird in eine disziplinierte, feste Strophenform gepresst',
      ],
      hint: 'Regelmäßige Strophen und Reime bändigen das Grauen formal, wodurch es noch unerbittlicher wirkt.',
    },
    {
      id: 'exp-q7',
      prompt: 'Welches Stilmittel liegt vor, wenn die Städte wie unterwürfige Diener dargestellt werden („Die großen Städte knien um ihn her“)?',
        interactionType: 'input',
      correctAnswers: ['Personifikation', 'personifiziert', 'Personifizierung', 'Metapher'],
      placeholder: 'Stilmittel eingeben...',
      hint: 'Die Stadt handelt wie ein Mensch (knien / anbeten).',
      sampleSolution: 'Personifikation',
    },

    // ------------------------------------------------------------------------
    // AUFGABE 3: INTERPRETATION, ZIVILISATIONSKRITIK & VERGLEICH
    // ------------------------------------------------------------------------
    {
      id: 'exp-q8',
      prompt: 'Welche Deutungshypothese trifft den Kern von Heyms Zivilisationskritik?',
        interactionType: 'choice',
      options: [
        'Die Großstadt wird als zerstörerischer Moloch entlarvt, der die Menschen verschlingt',
        'Der Dichter fordert die sofortige Verdopplung aller Schornsteine und Fabriken',
        'Das Gedicht preist die moderne Technik als größte Wohltat für die Menschheit',
        'Der Text wirbt für den Ausbau neuer Grünanlagen und breiterer Spazierwege',
      ],
      correctAnswers: [
        'Die Großstadt wird als zerstörerischer Moloch entlarvt, der die Menschen verschlingt',
      ],
      hint: 'Die Stadt ist kein Ort der Freiheit, sondern ein Ungeheuer, das seine Schöpfer zerstört.',
    },
    {
      id: 'exp-q9',
      prompt: 'Welche welthistorische Katastrophe ahnten Heym und andere Expressionisten um 1910 in ihren Gedichten voraus?',
        interactionType: 'input',
      correctAnswers: ['Erster Weltkrieg', '1. Weltkrieg', 'Weltkrieg', 'den Ersten Weltkrieg', 'der Erste Weltkrieg'],
      placeholder: 'Ereignis eingeben...',
      hint: 'Die Urkatastrophe des 20. Jahrhunderts (1914–1918).',
      sampleSolution: 'Erster Weltkrieg (1914–1918)',
    },
    {
      id: 'exp-q10',
      prompt: 'Worin besteht der größte Unterschied zwischen Eichendorffs Romantik („Mondnacht“) und Heyms Expressionismus („Der Gott der Stadt“)?',
        interactionType: 'choice',
      options: [
        'Eichendorff schreibt auf Latein, während Heym nur englische Wörter verwendet',
        'Eichendorff preist die Fabriken, während Heym das einfache Landleben feiert',
        'Romantik sucht Geborgenheit im Kosmos; Expressionismus zeigt brutale Entfremdung',
        'Romantik verzichtet auf Metaphern, während Expressionismus keine Reime nutzt',
      ],
      correctAnswers: [
        'Romantik sucht Geborgenheit im Kosmos; Expressionismus zeigt brutale Entfremdung',
      ],
      hint: 'Eichendorff: Die Seele fliegt geborgen nach Haus; Heym: Ein Feuermeer frisst die Straßen.',
    },
  ],
};

// ============================================================================
// EXPORT ALL TASKS & DAILY LEARNING UNIT
// ============================================================================
export const epochenTasks: Task[] = [
  epochenTaskAufklaerung,
  epochenTaskSturmUndDrang,
  epochenTaskKlassik,
  epochenTaskRomantik,
  epochenTaskExpressionismus,
];

export const unit07102026: DailyLearningUnit = {
  id: 'epochen-07-10-2026',
  date: '07.10.2026',
  title: 'Epochen der Literatur & Gedichtanalyse (Oberstufe)',
  description:
    'Gezieltes Training für die 11. Klasse (Deutsch LK) zu den 5 Kernepochen: Aufklärung, Sturm und Drang, Weimarer Klassik, Romantik und Expressionismus. Mit je 3 verständlichen Aufgabenmodulen pro Zeitalter (Epochenwissen, formale & sprachliche Analyse, Deutungshypothesen).',
  tasks: epochenTasks,
};
