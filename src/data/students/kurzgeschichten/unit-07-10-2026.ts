import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// 1. THEMA: EINE INHALTSANGABE SCHREIBEN (Buch, S. 164)
// ============================================================================
const kurzgeschichtenTaskInhaltsangabe: Task = {
  id: 'kurzgeschichten-inhaltsangabe',
  topicSlug: 'inhaltsangabe',
  date: '07.10.2026',
  title: 'Inhaltsangabe schreiben: Aufbau, Zeitform & Sprache',
  subject: 'Deutsch',
  topic: 'Inhaltsangabe schreiben',
  dateBadge: '07.10.2026 • 8. Klasse',
  description:
    'Wiederhole die Grundlagen einer gelungenen Inhaltsangabe: Den Basissatz (TATTE), sachliche Sprache im Präsens, Sinnabschnitte und logische Satzverknüpfungen.',
  type: 'input',
  readingText: {
    title: 'Infokasten: Eine Inhaltsangabe verfassen (Deutschbuch S. 164)',
    content: `EINE INHALTSANGABE SCHREIBEN

1. ZIEL & FUNKTION:
Eine Inhaltsangabe informiert den Leser knapp, sachlich und objektiv über den wesentlichen Handlungsverlauf eines literarischen Textes oder Sachtextes.

2. AUFBAU:
• Einleitung (Basissatz nach TATTE):
  – T = Textsorte (z. B. Kurzgeschichte, Fabel, Novelle)
  – A = Autor / Verfasser
  – T = Titel des Werkes
  – T = Thema (Worum geht es im Kern in einem prägnanten Satz?)
  – E = Erscheinungsjahr / Entstehungszeit
• Hauptteil:
  – Gliederung des Textes in überschaubare Sinnabschnitte
  – Knappe, chronologische Wiedergabe der Haupthandlung
  – Beantwortung der W-Fragen: Wer handelt? Wo und wann? Was geschieht? Warum?
• Schluss (nur wenn ausdrücklich verlangt):
  – Kurze Deutung oder Gesamtaussage der Geschichte.

3. SPRACHLICHE REGELN:
• Zeitform: Immer im Präsens (Gegenwart)! Bei Vorzeitigkeit verwendet man das Perfekt.
• Stil: Sachlich, nüchtern, präzise und distanziert.
• Keine wörtliche Rede: Dialoge werden zusammengefasst oder in die indirekte Rede gesetzt.
• Keine eigene Meinung: Wertungen („Ich finde...“) gehören nicht in die Inhaltsangabe.
• Satzverknüpfungen: Abwechslungsreiche Konjunktionen und Satzanfänge (nachdem, während, obwohl, daraufhin).`,
    source: 'Deutschbuch 8, Infokasten S. 164',
  },
  checklistItems: [
    { id: 'inh-chk-1', text: 'Ich kenne alle 5 Bestandteile des Einleitungssatzes (TATTE).', category: 'Aufbau' },
    { id: 'inh-chk-2', text: 'Ich schreibe durchgehend im Präsens (und Perfekt bei Vorzeitigkeit).', category: 'Sprache' },
    { id: 'inh-chk-3', text: 'Ich verzichte auf wörtliche Rede und persönliche Wertungen.', category: 'Stil' },
    { id: 'inh-chk-4', text: 'Ich gliedere die Handlung in logische Sinnabschnitte.', category: 'Gliederung' },
  ],
  teacherNotes:
    'Sekundarstufe I (Klasse 8, Deutsch): Vorbereitung auf die Deutscharbeit am 08.10.2026. Thema 1: Inhaltsangabe (Buch S. 164).',
  inputQuestions: [
    {
      id: 'kurzgeschichten-inh-q1',
      prompt: 'Was ist das Hauptziel einer Inhaltsangabe im Deutschunterricht?',
      interactionType: 'choice',
      options: [
        'Eine spannende Nacherzählung mit vielen überraschenden Wendungen zu liefern',
        'Den Leser sachlich und knapp über die wesentliche Handlung zu informieren',
        'Eine persönliche Kritik mit eigener Meinung über das Buch aufzuschreiben',
        'Den gesamten Text wortgetreu abzuschreiben und mit Bildern zu verzieren',
      ],
      correctAnswers: [
        'Den Leser sachlich und knapp über die wesentliche Handlung zu informieren',
      ],
      hint: 'Eine Inhaltsangabe informiert sachlich und neutral, ohne Spannung künstlich aufzubauen.',
    },
    {
      id: 'kurzgeschichten-inh-q2',
      prompt: 'In welcher Zeitform (Tempus) muss die Inhaltsangabe grundsätzlich verfasst werden?',
      interactionType: 'choice',
      options: [
        'Immer im Präteritum, da die erzählten Ereignisse bereits vergangen sind',
        'Immer im Futur I, um die zukünftige Wirkung auf den Leser anzudeuten',
        'Immer im Präsens, wobei Vorzeitiges im Perfekt wiedergegeben wird',
        'Immer im Plusquamperfekt, um den zeitlichen Abstand zu verdeutlichen',
      ],
      correctAnswers: [
        'Immer im Präsens, wobei Vorzeitiges im Perfekt wiedergegeben wird',
      ],
      hint: 'Die Gegenwart (Präsens) ist die Pflichtzeitform jeder Inhaltsangabe.',
    },
    {
      id: 'kurzgeschichten-inh-q3',
      prompt: 'Bringe die Bausteine für einen vollständigen Einleitungssatz (TATTE) in die richtige Reihenfolge:',
      interactionType: 'sentence_builder',
      tiles: [
        'aus dem jahr 1998',
        'von etgar keret',
        'die kurzgeschichte der höfliche junge',
        'thematisiert einen familiären konflikt',
      ],
      correctAnswers: [
        'die kurzgeschichte der höfliche junge von etgar keret aus dem jahr 1998 thematisiert einen familiären konflikt',
        'die kurzgeschichte der höfliche junge aus dem jahr 1998 von etgar keret thematisiert einen familiären konflikt',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit Textsorte und Titel, nenne danach Autor und Jahr und ende mit dem Thema.',
      sampleSolution:
        'die kurzgeschichte der höfliche junge von etgar keret aus dem jahr 1998 thematisiert einen familiären konflikt',
    },
    {
      id: 'kurzgeschichten-inh-q4',
      prompt: 'Was darf in einer Inhaltsangabe auf keinen Fall vorkommen?',
      interactionType: 'choice',
      options: [
        'Wörtliche Rede mit Anführungszeichen und persönliche Wertungen',
        'Konjunktionen wie nachdem und obwohl zur Verknüpfung der Sätze',
        'Die Nennung von Namen der wichtigsten handelnden Hauptfiguren',
        'Eine Gliederung des Textes in mehrere überschaubare Abschnitte',
      ],
      correctAnswers: [
        'Wörtliche Rede mit Anführungszeichen und persönliche Wertungen',
      ],
      hint: 'Wörtliche Zitate und Ausrufe wie „Ich finde, dass...“ sind streng verboten.',
    },
    {
      id: 'kurzgeschichten-inh-q5',
      prompt: 'Welche Zeitform verwendet man in einer Inhaltsangabe für Ereignisse, die vor der Haupthandlung geschehen sind (Vorzeitigkeit)?',
      interactionType: 'input',
      correctAnswers: ['Perfekt', 'das Perfekt'],
      placeholder: 'Zeitform eingeben...',
      hint: 'Die vollendete Gegenwart: gebildet mit haben/sein + Partizip II.',
      sampleSolution: 'Perfekt',
    },
    {
      id: 'kurzgeschichten-inh-q6',
      prompt: 'Welche Satzverknüpfungen eignen sich besonders gut, um Zusammenhänge im Hauptteil sprachlich abwechslungsreich zu gestalten?',
      interactionType: 'choice',
      options: [
        'Umgangssprachliche Floskeln wie irgendwie oder voll krass',
        'Ausschließlich kurze Hauptsätze, die mit und dann beginnen',
        'Gereimte Verse und klangvolle Sprichwörter aus alten Fabeln',
        'Unterordnende Konjunktionen wie nachdem, da, während und obwohl',
      ],
      correctAnswers: [
        'Unterordnende Konjunktionen wie nachdem, da, während und obwohl',
      ],
      hint: 'Gute Bindewörter (Konjunktionen) zeigen zeitliche oder begründende Zusammenhänge.',
    },
    {
      id: 'kurzgeschichten-inh-q7',
      prompt: 'Welcher Bestandteil gehört neben Textsorte, Autor, Titel und Erscheinungsjahr zwingend in den Basissatz (TATTE)?',
      interactionType: 'input',
      correctAnswers: ['Thema', 'das Thema', 'Kernthema', 'Hauptthema'],
      placeholder: 'Begriff eingeben...',
      hint: 'Dieser Begriff bezeichnet den inhaltlichen Kern, worum es im Werk geht.',
      sampleSolution: 'Thema',
    },
    {
      id: 'kurzgeschichten-inh-q8',
      prompt: 'Wie gliedert man den Hauptteil einer Inhaltsangabe am sinnvollsten?',
      interactionType: 'choice',
      options: [
        'Man schreibt jeden Satz der Geschichte einzeln mit eigenen Worten um',
        'Man zählt die Buchstaben im Text und teilt sie durch drei Teile',
        'Man teilt die Handlung in Sinnabschnitte ein und fasst diese zusammen',
        'Man würfelt die Absätze durcheinander, um die Spannung zu erhöhen',
      ],
      correctAnswers: [
        'Man teilt die Handlung in Sinnabschnitte ein und fasst diese zusammen',
      ],
      hint: 'Ein Sinnabschnitt umfasst einen Handlungsabschnitt mit einer klaren Teilhandlung.',
    },
  ],
};

// ============================================================================
// 2. THEMA: MERKMALE EINER KURZGESCHICHTE (Buch, S. 151)
// ============================================================================
const kurzgeschichtenTaskKurzgeschichte: Task = {
  id: 'kurzgeschichten-kurzgeschichten-merkmale',
  topicSlug: 'kurzgeschichten-merkmale',
  date: '07.10.2026',
  title: 'Merkmale einer Kurzgeschichte erkennen und benennen',
  subject: 'Deutsch',
  topic: 'Merkmale der Kurzgeschichte',
  dateBadge: '07.10.2026 • 8. Klasse',
  description:
    'Lerne die typischen Eigenschaften von Kurzgeschichten kennen: Unmittelbarer Einstieg (in medias res), offenes Ende, alltägliche Figuren, Wendepunkt und sprachliche Verdichtung.',
  type: 'input',
  readingText: {
    title: 'Infokasten: Merkmale einer Kurzgeschichte (Deutschbuch S. 151)',
    content: `MERKMALE EINER KURZGESCHICHTE

1. ENTSTEHUNG & NAME:
Die Kurzgeschichte entstand nach dem Zweiten Weltkrieg in Deutschland nach dem Vorbild der amerikanischen „short story“. Die Menschen wollten nach 1945 keine langen, verklärenden Romane mehr, sondern kurze, wahrhaftige Momentaufnahmen.

2. DIE ZENTRALEN MERKMALE:
• Unmittelbarer Einstieg („in medias res“):
  – Keine lange Einleitung, keine ausführliche Vorstellung der Figuren.
  – Der Leser wird mitten in das Geschehen hineingeworfen.
• Offenes Ende:
  – Der Konflikt wird meist nicht vollständig gelöst.
  – Die Geschichte bricht an einem entscheidenden Punkt ab.
  – Der Leser muss selbst weiterdenken und Schlüsse ziehen.
• Alltägliche Figuren & Situationen:
  – Keine Helden oder Könige, sondern ganz normale Menschen aus dem Alltag.
  – Typische Lebenskonflikte (Streit, Angst, Missverständnisse, Einsamkeit).
• Wendepunkt / Höhepunkt:
  – Ein scheinbar kleines Ereignis verändert das Denken oder Verhalten einer Figur grundlegend.
• Knappe Zeit & begrenzter Raum:
  – Die Handlung umfasst oft nur wenige Minuten oder Stunden an einem einzigen Ort.
• Verdichtete Sprache & Leerstellen:
  – Wenige Worte, dafür viele Andeutungen, Symbole und Lücken (Leerstellen), die der Leser entschlüsseln muss.`,
    source: 'Deutschbuch 8, Infokasten S. 151',
  },
  checklistItems: [
    { id: 'kg-chk-1', text: 'Ich kenne den unmittelbaren Einstieg (in medias res).', category: 'Einstieg' },
    { id: 'kg-chk-2', text: 'Ich kann erklären, warum das Ende oft offen bleibt.', category: 'Schluss' },
    { id: 'kg-chk-3', text: 'Ich erkenne Wendepunkte und alltägliche Konflikte im Text.', category: 'Handlung' },
    { id: 'kg-chk-4', text: 'Ich verstehe den Begriff der Leerstelle und die Symbolik.', category: 'Sprache' },
  ],
  teacherNotes:
    'Sekundarstufe I (Klasse 8, Deutsch): Vorbereitung auf die Deutscharbeit am 08.10.2026. Thema 2: Kurzgeschichten-Merkmale (Buch S. 151).',
  inputQuestions: [
    {
      id: 'kurzgeschichten-kg-q1',
      prompt: 'Wie beginnt eine typische Kurzgeschichte?',
      interactionType: 'choice',
      options: [
        'Mit einer ausführlichen Beschreibung aller Verwandten der Hauptfigur',
        'Mitten im Geschehen ohne lange Vorgeschichte oder ausführliche Einleitung',
        'Mit einer feierlichen Erklärung des Autors über den tieferen Sinn',
        'Mit einer genauen Auflistung aller Gegenstände im Zimmer der Hauptfigur',
      ],
      correctAnswers: [
        'Mitten im Geschehen ohne lange Vorgeschichte oder ausführliche Einleitung',
      ],
      hint: 'Kurzgeschichten verzichten auf Vorreden und werfen den Leser direkt ins Geschehen.',
    },
    {
      id: 'kurzgeschichten-kg-q2',
      prompt: 'Wie lautet der lateinische Fachbegriff für den unvermittelten Einstieg mitten in die Handlung?',
      interactionType: 'input',
      correctAnswers: ['in medias res', 'In medias res'],
      placeholder: 'Fachbegriff eingeben...',
      hint: 'Bedeutet wörtlich: „mitten in die Dinge“.',
      sampleSolution: 'in medias res',
    },
    {
      id: 'kurzgeschichten-kg-q3',
      prompt: 'Welche Funktion hat das typische offene Ende einer Kurzgeschichte?',
      interactionType: 'choice',
      options: [
        'Es beweist dem Leser, dass dem Autor beim Schreiben das Papier ausging',
        'Es sorgt dafür, dass die Geschichte automatisch als Fortsetzungsroman gilt',
        'Es garantiert, dass alle Figuren am Ende glücklich und zufrieden sind',
        'Es regt den Leser zum eigenen Nachdenken über den Konflikt an',
      ],
      correctAnswers: [
        'Es regt den Leser zum eigenen Nachdenken über den Konflikt an',
      ],
      hint: 'Das offene Ende fordert den Leser heraus, selbst über Lösungen nachzudenken.',
    },
    {
      id: 'kurzgeschichten-kg-q4',
      prompt: 'Bringe die Bausteine zu den Merkmalen von Kurzgeschichten in die richtige Reihenfolge:',
      interactionType: 'sentence_builder',
      tiles: [
        'einen entscheidenden wendepunkt',
        'eine kurzgeschichte zeigt',
        'im alltag normaler menschen',
      ],
      correctAnswers: [
        'eine kurzgeschichte zeigt einen entscheidenden wendepunkt im alltag normaler menschen',
        'eine kurzgeschichte zeigt im alltag normaler menschen einen entscheidenden wendepunkt',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit dem Subjekt („eine kurzgeschichte zeigt“) und setze die Ergänzungen an.',
      sampleSolution:
        'eine kurzgeschichte zeigt einen entscheidenden wendepunkt im alltag normaler menschen',
    },
    {
      id: 'kurzgeschichten-kg-q5',
      prompt: 'Welche Art von Figuren steht in Kurzgeschichten fast immer im Mittelpunkt?',
      interactionType: 'choice',
      options: [
        'Übernatürliche Fabelwesen mit Zauberkräften und unendlichem Reichtum',
        'Alltägliche Personen mit nachvollziehbaren Sorgen und Konflikten',
        'Historische Kaiser und Könige aus weit entfernten Jahrhunderten',
        'Unbesiegbare Superhelden im Kampf gegen außerirdische Monster',
      ],
      correctAnswers: [
        'Alltägliche Personen mit nachvollziehbaren Sorgen und Konflikten',
      ],
      hint: 'Die Figuren sind normale Menschen wie du und ich in einer schwierigen Lage.',
    },
    {
      id: 'kurzgeschichten-kg-q6',
      prompt: 'Wie nennt man den entscheidenden Moment in einer Kurzgeschichte, an dem sich die Handlung oder die Einsicht einer Figur plötzlich verändert?',
      interactionType: 'input',
      correctAnswers: ['Wendepunkt', 'der Wendepunkt', 'Höhepunkt', 'der Höhepunkt'],
      placeholder: 'Begriff eingeben...',
      hint: 'Das Wort setzt sich aus „Wende“ und „Punkt“ zusammen.',
      sampleSolution: 'Wendepunkt',
    },
    {
      id: 'kurzgeschichten-kg-q7',
      prompt: 'Was versteht man unter „Leerstellen“ in einer Kurzgeschichte?',
      interactionType: 'choice',
      options: [
        'Lücken und Aussparungen im Text, die der Leser selbst deuten muss',
        'Druckfehler im Buch, bei denen ganze Wörter versehentlich fehlen',
        'Leerzeichen zwischen den Wörtern zur besseren Lesbarkeit des Textes',
        'Pausen, in denen der Leser das Buch für mehrere Tage weglegen soll',
      ],
      correctAnswers: [
        'Lücken und Aussparungen im Text, die der Leser selbst deuten muss',
      ],
      hint: 'Der Autor sagt nicht alles direkt; der Leser muss zwischen den Zeilen lesen.',
    },
    {
      id: 'kurzgeschichten-kg-q8',
      prompt: 'Warum erstreckt sich die erzählte Zeit in einer Kurzgeschichte meist nur über wenige Minuten oder Stunden?',
      interactionType: 'choice',
      options: [
        'Weil Kurzgeschichten ausschließlich von Zugfahrten und Uhren handeln',
        'Weil der Autor keine Lust hatte, eine längere Handlung aufzuschreiben',
        'Weil die Handlung stark verdichtet ist und einen Ausschnitt beleuchtet',
        'Weil man Kurzgeschichten nur am späten Nachmittag lesen darf',
      ],
      correctAnswers: [
        'Weil die Handlung stark verdichtet ist und einen Ausschnitt beleuchtet',
      ],
      hint: 'Ein kurzer Zeitausschnitt ermöglicht maximale emotionale Schärfe und Dichte.',
    },
  ],
};

// ============================================================================
// 3. THEMA: FIGURENANALYSE: „DER HÖFLICHE JUNGE“ (Etgar Keret)
// ============================================================================
const kurzgeschichtenTaskFigurenanalyse: Task = {
  id: 'kurzgeschichten-figurenanalyse-keret',
  topicSlug: 'figurenanalyse-keret',
  date: '07.10.2026',
  title: 'Figuren & Beziehungen: „Der höfliche Junge“ (Etgar Keret)',
  subject: 'Deutsch',
  topic: 'Figurenanalyse: Der höfliche Junge',
  dateBadge: '07.10.2026 • 8. Klasse',
  description:
    'Untersuche die Charaktere und ihre Beziehungen in Etgar Kerets Kurzgeschichte: direkte vs. indirekte Charakterisierung, die Flucht des Sohnes und die Höflichkeit als Schutzschild.',
  type: 'input',
  readingText: {
    title: 'Textübersicht & Figurenanalyse: „Der höfliche Junge“ von Etgar Keret',
    content: `„DER HÖFLICHE JUNGE“ (Etgar Keret) – INHALT & FIGUREN

1. HANDLUNGSÜBERBLICK:
• Einstieg: Der Ich-Erzähler, ein Junge, wird Zeuge eines heftigen Ehestreits seiner Eltern im Schlafzimmer. Sie schreien und beschimpfen sich gegenseitig. Der Streit eskaliert, als die Mutter dem Vater eine Ohrfeige verpasst.
• Reaktion des Sohnes: Der Junge weint nicht, schreit nicht und greift nicht ein. Stattdessen verhält er sich übertrieben höflich und ruhig.
• Rückzug: Er verlässt die bedrückende Wohnung, geht hinaus in den Innenhof und baut ein Spielzeugflugzeug. Als das Flugzeug fliegt, beobachtet er es aufmerksam.
• Begegnung: Draußen trifft er auf ein rothaariges Mädchen. Auch ihr gegenüber bleibt er ausgesprochen höflich und zurückhaltend.
• Rückkehr & offenes Ende: Bei seiner Rückkehr in die Wohnung versucht der Vater krampfhaft, Normalität vorzuspielen. Die Atmosphäre bleibt angespannt. Der Konflikt ist ungelöst.

2. DIE FIGUREN & IHRE CHARAKTERISIERUNG:
• Der Junge (Ich-Erzähler):
  – Er wirkt nach außen ruhig, kontrolliert und stets wohlerzogen („der höfliche Junge“).
  – Seine Höflichkeit ist jedoch kein Zeichen von innerer Zufriedenheit, sondern ein seelischer Schutzmechanismus (Schutzschild). Er flieht vor der Aggression der Erwachsenen in formelhafte Höflichkeit.
  – Das Flugzeug symbolisiert seinen Wunsch nach Freiheit und Flucht aus der Enge.
• Die Eltern:
  – Befinden sich in einer tiefen Ehekrise. Sie verlieren die Kontrolle, werden beleidigend und handgreiflich (Ohrfeige).
  – Sie nehmen die seelische Belastung ihres Kindes in ihrer Wut kaum wahr.
• Die Beziehung zwischen Sohn und Eltern:
  – Gestörtes Verhältnis: Es gibt keine offene, ehrliche Kommunikation über Gefühle. Der Junge distanziert sich innerlich von den Eltern.

3. METHODEN DER CHARAKTERISIERUNG:
• Direkte Charakterisierung: Der Erzähler oder andere Personen nennen Eigenschaften direkt beim Namen (z. B. „Er war höflich“).
• Indirekte Charakterisierung: Eigenschaften erschließen sich aus Taten, Körpersprache, Gestik und Wortwahl (z. B. Rückzug in den Hof = Einsamkeit/Fluchtwunsch).`,
    source: 'Etgar Keret: Der höfliche Junge (Unterrichtslektüre Deutsch Klasse 8)',
  },
  checklistItems: [
    { id: 'fig-chk-1', text: 'Ich unterscheide direkte und indirekte Charakterisierung.', category: 'Methoden' },
    { id: 'fig-chk-2', text: 'Ich kann den Konflikt zwischen den Eltern und dem Jungen erklären.', category: 'Konflikt' },
    { id: 'fig-chk-3', text: 'Ich verstehe die Höflichkeit des Jungen als Schutzmechanismus.', category: 'Figuren' },
    { id: 'fig-chk-4', text: 'Ich erkenne Symbole wie das Spielzeugflugzeug.', category: 'Deutung' },
  ],
  teacherNotes:
    'Sekundarstufe I (Klasse 8, Deutsch): Vorbereitung auf die Deutscharbeit am 08.10.2026. Thema 3: Figuren und Beziehungen in „Der höfliche Junge“ von E. Keret.',
  inputQuestions: [
    {
      id: 'kurzgeschichten-fig-q1',
      prompt: 'Worin liegt der Unterschied zwischen direkter und indirekter Charakterisierung einer Figur?',
      interactionType: 'choice',
      options: [
        'Direkt bedeutet die Nennung von Eigenschaften; indirekt erschließt man sie aus Taten',
        'Direkt meint die Beschreibung von Tieren; indirekt meint die Beschreibung von Menschen',
        'Direkt verwendet ausschließlich Verben; indirekt verwendet ausschließlich Fremdwörter',
        'Direkt bezieht sich auf Nebenfiguren; indirekt bezieht sich stets auf den Haupthelden',
      ],
      correctAnswers: [
        'Direkt bedeutet die Nennung von Eigenschaften; indirekt erschließt man sie aus Taten',
      ],
      hint: 'Direkt = ausdrücklich gesagt; indirekt = aus Handlungen, Sprache und Gesten gefolgert.',
    },
    {
      id: 'kurzgeschichten-fig-q2',
      prompt: 'Welcher dramatische Konflikt löst die seelische Belastung des Jungen zu Beginn der Geschichte aus?',
      interactionType: 'choice',
      options: [
        'Ein Streit zwischen Lehrern an der Schule über die Vergabe schlechter Zeugnisnoten',
        'Ein Raubüberfall auf der Straße, bei dem der Junge sein Taschengeld verliert',
        'Ein heftiger Ehestreit der Eltern, der in einer Ohrfeige der Mutter gipfelt',
        'Ein Missverständnis beim Einkaufen im Supermarkt mit einer fremden Kassiererin',
      ],
      correctAnswers: [
        'Ein heftiger Ehestreit der Eltern, der in einer Ohrfeige der Mutter gipfelt',
      ],
      hint: 'Der Junge beobachtet den eskalierenden Streit seiner Eltern zu Hause.',
    },
    {
      id: 'kurzgeschichten-fig-q3',
      prompt: 'Wofür steht das Spielzeugflugzeug, das der Junge im Hof baut und fliegen lässt, symbolisch?',
      interactionType: 'input',
      correctAnswers: ['Flucht', 'Freiheit', 'Freiheitsdrang', 'Wunsch nach Flucht', 'Rückzug', 'Befreiung'],
      placeholder: 'Bedeutung eingeben...',
      hint: 'Es symbolisiert den Drang, der belastenden Enge der Familie zu entfliehen.',
      sampleSolution: 'Freiheit (oder Fluchtwunsch aus der familiären Enge)',
    },
    {
      id: 'kurzgeschichten-fig-q4',
      prompt: 'Warum verhält sich der Junge in dieser dramatischen Situation so auffallend höflich?',
      interactionType: 'choice',
      options: [
        'Weil er sich über die streitenden Eltern lustig machen und sie verspotten will',
        'Weil er in der Schule eine schlechte Note in Benimm und Anstand verbessern muss',
        'Weil er hofft, von den Eltern eine finanzielle Belohnung für gutes Benehmen zu bekommen',
        'Weil er die Höflichkeit als Schutzschild nutzt, um Distanz zum Streit zu halten',
      ],
      correctAnswers: [
        'Weil er die Höflichkeit als Schutzschild nutzt, um Distanz zum Streit zu halten',
      ],
      hint: 'Höflichkeit dient ihm als Maske und Schutzmauer gegen das emotionale Chaos.',
    },
    {
      id: 'kurzgeschichten-fig-q5',
      prompt: 'Bringe die Bausteine zur Beziehung zwischen dem Jungen und seinen Eltern in die richtige Reihenfolge:',
      interactionType: 'sentence_builder',
      tiles: [
        'und der hilflosigkeit seiner eltern',
        'schützt ihn vor der aggression',
        'die höflichkeit des jungen',
      ],
      correctAnswers: [
        'die höflichkeit des jungen schützt ihn vor der aggression und der hilflosigkeit seiner eltern',
        'die höflichkeit des jungen schützt ihn vor der hilflosigkeit und der aggression seiner eltern',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit „die höflichkeit des jungen“, gefolgt vom Prädikat.',
      sampleSolution:
        'die höflichkeit des jungen schützt ihn vor der aggression und der hilflosigkeit seiner eltern',
    },
    {
      id: 'kurzgeschichten-fig-q6',
      prompt: 'Wie lässt sich die Beziehung der Eltern zueinander beschreiben?',
      interactionType: 'choice',
      options: [
        'Als tief vertrauensvoll und von gegenseitigem liebevollem Respekt getragen',
        'Als zerrüttet und überfordert, geprägt von verletzender Sprachlosigkeit und Wut',
        'Als rein geschäftlich, da beide gemeinsam ein erfolgreiches Unternehmen leiten',
        'Als völlig gleichgültig, da die Eltern seit vielen Jahren kein Wort wechseln',
      ],
      correctAnswers: [
        'Als zerrüttet und überfordert, geprägt von verletzender Sprachlosigkeit und Wut',
      ],
      hint: 'Die Eltern sind überfordert und verletzen sich gegenseitig verbal und körperlich.',
    },
    {
      id: 'kurzgeschichten-fig-q7',
      prompt: 'Welche Art von Charakterisierung liegt vor, wenn wir aus dem Flugzeugspiel des Jungen auf seinen Wunsch nach innerer Freiheit schließen?',
      interactionType: 'input',
      correctAnswers: ['indirekte Charakterisierung', 'indirekt', 'die indirekte Charakterisierung'],
      placeholder: 'Begriff eingeben...',
      hint: 'Gegenteil von direkter Charakterisierung.',
      sampleSolution: 'indirekte Charakterisierung',
    },
    {
      id: 'kurzgeschichten-fig-q8',
      prompt: 'Warum lässt Etgar Keret das Ende der Geschichte offen, anstatt ein klares Familien-Happy-End zu erzählen?',
      interactionType: 'choice',
      options: [
        'Weil der Vater am Ende die Familie verlässt und auf eine einsame Insel zieht',
        'Weil der Verlag ihm verboten hatte, mehr als zwei Seiten Text zu drucken',
        'Um zu zeigen, dass schwere Familienkonflikte nicht einfach per Knopfdruck gelöst sind',
        'Um den Lesern anzukündigen, dass im nächsten Monat ein Kinofilm dazu erscheint',
      ],
      correctAnswers: [
        'Um zu zeigen, dass schwere Familienkonflikte nicht einfach per Knopfdruck gelöst sind',
      ],
      hint: 'Ein offenes Ende spiegelt die realistische Ungewissheit des Lebens wider.',
    },
  ],
};

// ============================================================================
// 4. THEMA: RECHTSCHREIBUNG & GRAMMATIK: DAS ODER DASS? (Aufgabenblatt)
// ============================================================================
const kurzgeschichtenTaskDasOderDass: Task = {
  id: 'kurzgeschichten-das-oder-dass',
  topicSlug: 'das-oder-dass',
  date: '07.10.2026',
  title: 'Rechtschreibung: das oder dass? mit Ersatzprobe',
  subject: 'Deutsch',
  topic: 'Rechtschreibung: das oder dass?',
  dateBadge: '07.10.2026 • 8. Klasse',
  description:
    'Lerne den sicheren Unterschied zwischen das und dass: Die Ersatzprobe (dieses, jenes, welches), Artikel und Pronomen vs. Konjunktion und die korrekte Kommasetzung.',
  type: 'input',
  readingText: {
    title: 'Regelblatt: das oder dass? (Wiederholung für die Deutscharbeit)',
    content: `RECHTSCHREIBUNG: DAS ODER DASS?

DIE GOLDENE REGEL (ERSATZPROBE):
Kannst du das Wort durch „dieses“, „jenes“ oder „welches“ ersetzen, ohne dass der Satz seinen Sinn verliert?
• JA  ➜ Du schreibst „das“ (mit EINEM s)!
• NEIN ➜ Du schreibst „dass“ (mit DOPPEL-s)!

1. WANN SCHREIBT MAN „DAS“ (mit einem s)?
• Als Artikel (Begleiter eines Nomens):
  Beispiel: Das Buch liegt auf dem Tisch.
• Als Demonstrativpronomen (hinweisendes Fürwort):
  Beispiel: Das habe ich nicht gewusst! (Ersatzprobe: Dieses habe ich nicht gewusst!)
• Als Relativpronomen (bezügliches Fürwort):
  Beispiel: Das Flugzeug, das der Junge baute, flog weit. (Ersatzprobe: welches der Junge baute)

2. WANN SCHREIBT MAN „DASS“ (mit Doppel-s)?
• Als unterordnende Konjunktion (Bindewort):
  „dass“ verbindet einen Hauptsatz mit einem Nebensatz.
  Beispiel: Ich hoffe, dass morgen schönes Wetter ist.
  (Hier funktioniert weder „dieses“, „jenes“ noch „welches“: „Ich hoffe, welches morgen schönes Wetter ist“ ergibt keinen Sinn!)
• Merke: Vor der Konjunktion „dass“ steht im Satzgefüge immer ein Komma!`,
    source: 'Regelblatt Grammatik Klasse 8: das oder dass?',
  },
  checklistItems: [
    { id: 'dass-chk-1', text: 'Ich kenne die Ersatzprobe: dieses, jenes, welches.', category: 'Ersatzprobe' },
    { id: 'dass-chk-2', text: 'Ich erkenne das Relativpronomen nach dem Komma (welches).', category: 'Pronomen' },
    { id: 'dass-chk-3', text: 'Ich erkenne die Konjunktion dass als Bindewort.', category: 'Konjunktion' },
    { id: 'dass-chk-4', text: 'Ich setze vor dass zuverlässig ein Komma.', category: 'Kommasetzung' },
  ],
  teacherNotes:
    'Sekundarstufe I (Klasse 8, Deutsch): Vorbereitung auf die Deutscharbeit am 08.10.2026. Thema 4: das oder dass? mit Ersatzprobe.',
  inputQuestions: [
    {
      id: 'kurzgeschichten-dass-q1',
      prompt: 'Mit welchen drei Wörtern funktioniert die Ersatzprobe für „das“ mit einem einfachen s?',
      interactionType: 'choice',
      options: [
        'Mit den Signalwörtern weil, obwohl und indem',
        'Mit den Ersatzwörtern dieses, jenes oder welches',
        'Mit den Zeitwörtern gestern, heute oder morgen',
        'Mit den Fragewörtern wer, wie und warum',
      ],
      correctAnswers: [
        'Mit den Ersatzwörtern dieses, jenes oder welches',
      ],
      hint: 'Merkspruch: Wenn du dieses, jenes, welches sagen kannst, schreibst du das nur mit einem s!',
    },
    {
      id: 'kurzgeschichten-dass-q2',
      prompt: 'Welche Wortart ist „dass“ mit Doppel-s grammatikalisch?',
      interactionType: 'choice',
      options: [
        'Ein persönliches Fürwort (Personalpronomen)',
        'Ein hinweisendes Eigenschaftswort (Adjektiv)',
        'Eine unterordnende Konjunktion (Bindewort)',
        'Ein bestimmter sächlicher Begleiter (Artikel)',
      ],
      correctAnswers: [
        'Eine unterordnende Konjunktion (Bindewort)',
      ],
      hint: 'Ein Bindewort, das Sätze verbindet, nennt man Konjunktion.',
    },
    {
      id: 'kurzgeschichten-dass-q3',
      prompt: 'Welches Wort gehört in die Lücke: „Er bemerkte sofort, ___ die Stimmung im Raum sehr angespannt war.“?',
      interactionType: 'input',
      correctAnswers: ['dass'],
      placeholder: 'Wort eingeben...',
      hint: 'Prüfe mit der Ersatzprobe, ob ein Relativpronomen oder eine Konjunktion vorliegt.',
      sampleSolution: 'dass',
    },
    {
      id: 'kurzgeschichten-dass-q4',
      prompt: 'Welches Wort gehört in die Lücke: „Das Flugzeug, ___ der Junge bastelte, flog erstaunlich weit.“?',
      interactionType: 'input',
      correctAnswers: ['das'],
      placeholder: 'Wort eingeben...',
      hint: 'Wende die Ersatzprobe auf das vorangehende Nomen an.',
      sampleSolution: 'das',
    },
    {
      id: 'kurzgeschichten-dass-q5',
      prompt: 'Bringe die Bausteine zu einem korrekten Satzgefüge mit „dass“ in die richtige Reihenfolge:',
      interactionType: 'sentence_builder',
      tiles: [
        'bald ein ende finden würde',
        'dass der streit seiner eltern',
        'der junge hoffte,',
      ],
      correctAnswers: [
        'der junge hoffte, dass der streit seiner eltern bald ein ende finden würde',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit dem Hauptsatz, gefolgt vom Nebensatz mit dass.',
      sampleSolution:
        'der junge hoffte, dass der streit seiner eltern bald ein ende finden würde',
    },
    {
      id: 'kurzgeschichten-dass-q6',
      prompt: 'Welcher der folgenden Sätze ist rechtschreiblich und grammatikalisch VOLLSTÄNDIG RICHTIG?',
      interactionType: 'choice',
      options: [
        'Ich weiß, dass das Buch, das auf dem Tisch liegt, dir gehört',
        'Ich weiß, das dass Buch, das auf dem Tisch liegt, dir gehört',
        'Ich weiß, dass das Buch, dass auf dem Tisch liegt, dir gehört',
        'Ich weiß, das das Buch, dass auf dem Tisch liegt, dir gehört',
      ],
      correctAnswers: [
        'Ich weiß, dass das Buch, das auf dem Tisch liegt, dir gehört',
      ],
      hint: 'Wende die Ersatzprobe für jedes Vorkommen einzeln an.',
    },
    {
      id: 'kurzgeschichten-dass-q7',
      prompt: 'Welches Wort gehört an den Satzanfang: „___ Buch gefällt mir außerordentlich gut.“?',
      interactionType: 'input',
      correctAnswers: ['Das', 'das'],
      placeholder: 'Wort eingeben...',
      hint: 'Bestimmter Artikel vor dem Substantiv.',
      sampleSolution: 'Das',
    },
    {
      id: 'kurzgeschichten-dass-q8',
      prompt: 'Warum muss im Satz „Es ist wichtig, dass wir pünktlich sind.“ das Wort „dass“ mit Doppel-s geschrieben werden?',
      interactionType: 'choice',
      options: [
        'Weil man es durch die Wörter dieses, jenes oder welches ersetzen kann',
        'Weil es ein Nomen begleitet und dessen sächliches Geschlecht anzeigt',
        'Weil Wörter nach einem Komma im Deutschen grundsätzlich mit ss enden',
        'Weil es eine Konjunktion ist und die Ersatzprobe nicht funktioniert',
      ],
      correctAnswers: [
        'Weil es eine Konjunktion ist und die Ersatzprobe nicht funktioniert',
      ],
      hint: 'Überlege, ob die Ersatzprobe sinnvoll klappt oder scheitert.',
    },
    {
      id: 'kurzgeschichten-dass-q9',
      prompt: 'Welches Wort gehört in die Lücke: „Das Mädchen, ___ rote Haare hatte, lächelte ihn freundlich an.“?',
      interactionType: 'input',
      correctAnswers: ['das'],
      placeholder: 'Wort eingeben...',
      hint: 'Prüfe, worauf sich das Wort im Hauptsatz bezieht.',
      sampleSolution: 'das',
    },
    {
      id: 'kurzgeschichten-dass-q10',
      prompt: 'In welchem Satz ist „das“ ein Relativpronomen, das durch „welches“ ersetzt werden kann?',
      interactionType: 'choice',
      options: [
        'Ich glaube fest daran, dass wir die Klassenarbeit morgen bestehen',
        'Das ist ja eine wirklich wunderbare Überraschung für die ganze Klasse',
        'Sie versicherte ihrer Mutter, dass sie die Hausaufgaben bereits erledigt hat',
        'Das neue Fahrrad, das im Hof steht, hat eine praktische Gangschaltung',
      ],
      correctAnswers: [
        'Das neue Fahrrad, das im Hof steht, hat eine praktische Gangschaltung',
      ],
      hint: 'Suche den Relativsatz, der ein Nomen näher beschreibt.',
    },
  ],
};

// ============================================================================
// EXPORT ALL TASKS & DAILY LEARNING UNIT
// ============================================================================
export const kurzgeschichtenTasks: Task[] = [
  kurzgeschichtenTaskInhaltsangabe,
  kurzgeschichtenTaskKurzgeschichte,
  kurzgeschichtenTaskFigurenanalyse,
  kurzgeschichtenTaskDasOderDass,
];

export const unit07102026: DailyLearningUnit = {
  id: 'kurzgeschichten-07-10-2026',
  date: '07.10.2026',
  title: 'Vorbereitung Deutscharbeit Klasse 8: Inhaltsangabe, Kurzgeschichten & Grammatik',
  description:
    'Gezielte Vorbereitung auf die Deutscharbeit am 08.10.2026 zu den 4 zentralen Themen: 1. Inhaltsangabe (Aufbau & TATTE), 2. Merkmale der Kurzgeschichte, 3. Figurenanalyse zu „Der höfliche Junge“ (Etgar Keret), 4. Rechtschreibung das oder dass mit Ersatzprobe.',
  tasks: kurzgeschichtenTasks,
};
