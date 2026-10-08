import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// 1. THEMA: GRUNDLAGEN & MERKSÄTZE EINES BERICHTS
// ============================================================================
const berichtTaskGrundlagen: Task = {
  id: 'bericht-bericht-grundlagen',
  topicSlug: 'bericht-grundlagen',
  date: '08.10.2026',
  title: 'Grundlagen & Merksätze: Was zeichnet einen Bericht aus?',
  subject: 'Deutsch',
  topic: 'Einen Bericht schreiben',
  dateBadge: '08.10.2026 • Grundlagen',
  description:
    'Erarbeite die wesentlichen Merkmale eines Berichts: Sachlichkeit, Objektivität, die W-Fragen und die klare Abgrenzung zur persönlichen Erzählung.',
  type: 'input',
  readingText: {
    title: 'Merkkasten: Der Bericht im Überblick (Merkmale & W-Fragen)',
    content: `DER BERICHT: MERKMALE & REGELN

1. ZIEL & FUNKTION:
Ein Bericht informiert eine dritte Person (z. B. Schulleitung, Versicherung, Polizei oder Zeitungsleser) sachlich, genau und wahrheitsgemäß über ein reales Geschehen.

2. DIE WICHTIGSTEN MERKMALE:
• Sachlichkeit & Objektivität:
  – Reine Tatsachen (Fakten) stehen im Mittelpunkt.
  – Keine Vermutungen, keine Gefühle, keine Ausschmückungen.
  – Keine persönliche Meinung oder Wertung („Ich fand das schrecklich...“).
• Sprachliche Distanz:
  – Keine wörtliche Rede mit Anführungszeichen.
  – Keine Umgangssprache oder bildhaften Übertreibungen.
  – Aussagen von Zeugen werden sachlich zusammengefasst oder in der indirekten Rede wiedergegeben.
• Zeitform:
  – Grundzeitform ist das Präteritum (Vergangenheit).
  – Für Handlungen, die vor dem Hauptgeschehen stattfanden (Vorzeitigkeit), wird das Plusquamperfekt genutzt.

3. DIE 7 W-FRAGEN:
Ein vollständiger Bericht beantwortet systematisch folgende Fragen:
• Wer? (Beteiligte Personen, Zeugen, Geschädigte)
• Was? (Das genaue Geschehen)
• Wann? (Datum, Uhrzeit, genauer Zeitpunkt)
• Wo? (Genauer Ort, Straße, Räumlichkeit)
• Wie? (Ablauf, Hergang)
• Warum? (Ursache, Auslöser)
• Welche Folgen? (Schäden, Verletzungen, getroffene Maßnahmen)`,
    source: 'Deutschunterricht: Methoden & Arbeitstechniken zum Bericht',
  },
  checklistItems: [
    {
      id: 'chk-gr-1',
      text: 'Ich kenne die Funktion eines Berichts als sachliche Information für Dritte.',
      category: 'Merkmale',
    },
    {
      id: 'chk-gr-2',
      text: 'Ich kann alle 7 W-Fragen aufzählen und ihre Funktion erklären.',
      category: 'W-Fragen',
    },
    {
      id: 'chk-gr-3',
      text: 'Ich unterscheide zuverlässig zwischen sachlichen Fakten und persönlichen Gefühlen.',
      category: 'Sachlichkeit',
    },
    {
      id: 'chk-gr-4',
      text: 'Ich verzichte auf wörtliche Rede und emotionale Schilderungen.',
      category: 'Stil',
    },
  ],
  teacherNotes:
    'Einführung in die Textform Bericht: Abgrenzung zur Erzählung, Sachlichkeit und Verinnerlichung der 7 W-Fragen.',
  inputQuestions: [
    {
      id: 'bericht-gr-q1',
      prompt: 'Welche Hauptabsicht verfolgt ein sachlicher Bericht?',
      interactionType: 'choice',
      options: [
        'Er unterhält Leser mit packenden Höhepunkten und Fantasie',
        'Er informiert Leser objektiv und präzise über ein Ereignis',
        'Er überzeugt Leser mit persönlichen Ansichten und Wertung',
        'Er begeistert Leser durch dramatische Worte und Spannung',
      ],
      correctAnswers: [
        'Er informiert Leser objektiv und präzise über ein Ereignis',
      ],
      hint: 'Überlege, welchen Zweck ein Dokument für eine Behörde oder Versicherung erfüllen muss.',
    },
    {
      id: 'bericht-gr-q2',
      prompt:
        'Finde in dem Satz das Adjektiv, das eine persönliche Wertung enthält und deshalb in einem Bericht unpassend ist.',
      interactionType: 'word_select',
      words: [
        'Der',
        'Radfahrer',
        'überquerte',
        'die',
        'gefährliche',
        'Kreuzung',
        'zügig',
      ],
      correctAnswers: ['gefährliche', 'gefährlich'],
      hint: 'Suche nach einem Wort, das ein subjektives Urteil über die Stelle ausdrückt, statt nur Fakten zu nennen.',
      sampleSolution: 'gefährliche',
    },
    {
      id: 'bericht-gr-q3',
      prompt: 'Welche Frage gehört nicht zu den zentralen W-Fragen eines Berichts?',
      interactionType: 'choice',
      options: [
        'Welche Folgen hatte das Geschehen vor Ort?',
        'Wie lief der genaue Vorfall schrittweise ab?',
        'Wie fühlte sich die beteiligte Person dabei?',
        'Warum kam es zu der plötzlichen Kollision?',
      ],
      correctAnswers: [
        'Wie fühlte sich die beteiligte Person dabei?',
      ],
      hint: 'Ein Bericht konzentriert sich auf überprüfbare Tatsachen und spart die innere Gefühlswelt aus.',
    },
    {
      id: 'bericht-gr-q4',
      prompt:
        'Wie nennt man die Eigenschaft eines Textes, der Tatsachen ohne persönliche Gefühle und Wertungen darstellt?',
      interactionType: 'input',
      correctAnswers: [
        'Sachlichkeit',
        'die Sachlichkeit',
        'Objektivität',
        'die Objektivität',
        'sachlich',
        'objektiv',
      ],
      placeholder: 'Fachbegriff eingeben...',
      hint: 'Denke an den Begriff, der beschreibt, dass nur die Sache selbst und überprüfbare Fakten im Mittelpunkt stehen.',
      sampleSolution: 'Sachlichkeit',
    },
    {
      id: 'bericht-gr-q5',
      prompt:
        'Setze den Merksatz über die Grundhaltung beim Berichten in die richtige Reihenfolge:',
      interactionType: 'sentence_builder',
      tiles: [
        'und verzichtet',
        'ein sachlicher bericht',
        'auf eigene gefühle',
        'schildert tatsachen',
      ],
      correctAnswers: [
        'ein sachlicher bericht schildert tatsachen und verzichtet auf eigene gefühle',
        'ein sachlicher bericht verzichtet auf eigene gefühle und schildert tatsachen',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne mit dem Satzgegenstand und verknüpfe die beiden Tätigkeiten mit der Konjunktion.',
      sampleSolution:
        'ein sachlicher bericht schildert tatsachen und verzichtet auf eigene gefühle',
    },
    {
      id: 'bericht-gr-q6',
      prompt:
        'Warum verzichtet ein Bericht vollständig auf wörtliche Rede mit Anführungszeichen?',
      interactionType: 'choice',
      options: [
        'Weil Zitate die sachliche Distanz stören und zu theatralisch wirken',
        'Weil Anführungszeichen in der deutschen Grammatik verboten sind',
        'Weil Berichte nur aus stichpunktartigen Aufzählungen bestehen',
        'Weil wörtliche Aussagen den Textumfang unnötig verringern würden',
      ],
      correctAnswers: [
        'Weil Zitate die sachliche Distanz stören und zu theatralisch wirken',
      ],
      hint: 'Bedenke, dass Aussagen Dritter sachlich zusammengefasst oder indirekt wiedergegeben werden.',
    },
    {
      id: 'bericht-gr-q7',
      prompt: 'Welche W-Frage klärt die zeitliche Einordnung des Geschehens?',
      interactionType: 'input',
      correctAnswers: ['Wann', 'Wann?', 'die Wann-Frage', 'wann', 'Wann-Frage'],
      placeholder: 'Fragewort eingeben...',
      hint: 'Dieses Fragewort ermittelt Datum, Uhrzeit oder den genauen Zeitpunkt eines Ereignisses.',
      sampleSolution: 'Wann',
    },
  ],
};

// ============================================================================
// 2. THEMA: AUFBAU EINES BERICHTS
// ============================================================================
const berichtTaskAufbau: Task = {
  id: 'bericht-bericht-aufbau',
  topicSlug: 'bericht-aufbau',
  date: '08.10.2026',
  title: 'Aufbau eines Berichts: Überschrift, Einleitung, Hauptteil & Schluss',
  subject: 'Deutsch',
  topic: 'Einen Bericht schreiben',
  dateBadge: '08.10.2026 • Gliederung',
  description:
    'Lerne die vier Abschnitte eines Berichts kennen: Vom sachlichen Titel über den informierenden Einstieg bis hin zum chronologischen Ablauf und den Folgen.',
  type: 'input',
  readingText: {
    title: 'Merkkasten: Die Gliederung des Berichts',
    content: `DER DREITEILIGE AUFBAU EINES BERICHTS

1. ÜBERSCHRIFT:
• Sachlich, präzise und knapp.
• Nennt das Ereignis und den Ort oder die Art des Vorfalls.
• Kein „Clickbait“ und keine reißerischen Sensationstitel.
• Beispiel: „Zusammenstoß zweier Radfahrer an der Schulkreuzung“ statt „Horror-Crash schockt Schüler!“.

2. EINLEITUNG:
• Der erste Abschnitt verschafft einen schnellen Überblick.
• Beantwortet die vier Kernfragen:
  – Wer? (Beteiligte Personen)
  – Was? (Das Ereignis in Kurzform)
  – Wann? (Datum und Uhrzeit)
  – Wo? (Genauer Ort des Geschehens)
• Der Leser erfährt sofort, worum es im Wesentlichen geht.

3. HAUPTTEIL:
• Schilderung des genauen Hergangs in streng chronologischer (zeitlicher) Reihenfolge.
• Beantwortet die vertiefenden Fragen:
  – Wie? (Der genaue Ablauf Schritt für Schritt)
  – Warum? (Ursache, Gründe oder Auslöser)
• Logische Übergänge durch abwechslungsreiche Satzverknüpfungen (z. B. „Daraufhin“, „Infolgedessen“, „Nachdem“).

4. SCHLUSS:
• Nennt die Folgen, den entstandenen Schaden und aktuelle Maßnahmen:
  – Sachschäden (z. B. beschädigte Fahrzeuge, Sachwerte)
  – Personenschäden (z. B. Verletzungen, Erstversorgung)
  – Folgemaßnahmen (z. B. polizeiliche Ermittlungen, Reparaturen)`,
    source: 'Deutschbuch: Textformen der Information',
  },
  checklistItems: [
    {
      id: 'chk-auf-1',
      text: 'Ich formuliere präzise und sachliche Überschriften ohne Reißer-Stil.',
      category: 'Überschrift',
    },
    {
      id: 'chk-auf-2',
      text: 'Ich beantworte in der Einleitung die vier Kernfragen (Wer, Was, Wann, Wo).',
      category: 'Einleitung',
    },
    {
      id: 'chk-auf-3',
      text: 'Ich ordne den Hauptteil streng chronologisch (Wie und Warum).',
      category: 'Hauptteil',
    },
    {
      id: 'chk-auf-4',
      text: 'Ich schließe mit den Folgen, Schäden oder aktuellen Maßnahmen ab.',
      category: 'Schluss',
    },
  ],
  teacherNotes:
    'Strukturierung und Gliederung: Dreiteilung (Einleitung, Hauptteil, Schluss), Funktion der Abschnitte und Überschriften.',
  inputQuestions: [
    {
      id: 'bericht-auf-q1',
      prompt:
        'Welche Überschrift entspricht den formalen Kriterien eines sachlichen Berichts?',
      interactionType: 'choice',
      options: [
        'Unglaubliches Drama am Dienstagnachmittag erschüttert alle Anwesenden',
        'Rücksichtsloser Raser sorgt für riesiges Chaos auf der Hauptstraße',
        'Glück im Unglück: Warum dieser Jugendliche heute noch am Leben ist',
        'Verkehrsunfall mit zwei beteiligten Radfahrern in der Schillerstraße',
      ],
      correctAnswers: [
        'Verkehrsunfall mit zwei beteiligten Radfahrern in der Schillerstraße',
      ],
      hint: 'Achte darauf, welche Formulierung das Geschehen neutral benennt, ohne Gefühle zu schüren.',
    },
    {
      id: 'bericht-auf-q2',
      prompt:
        'Welche vier W-Fragen müssen bereits in der Einleitung beantwortet werden?',
      interactionType: 'choice',
      options: [
        'Wer beteiligt war, was passierte, wann es geschah und wo der Vorfall war',
        'Wer schuld hatte, wie viel Geld verloren ging und warum niemand half',
        'Was die Zeugen dachten, warum es regnete und wie die Stimmung war',
        'Wie das Wetter war, wer den Notruf rief und was die Presse berichtete',
      ],
      correctAnswers: [
        'Wer beteiligt war, was passierte, wann es geschah und wo der Vorfall war',
      ],
      hint: 'Der Leser benötigt am Anfang sofort die Kerninformationen zu Personen, Geschehen, Zeit und Ort.',
    },
    {
      id: 'bericht-auf-q3',
      prompt:
        'Welcher Textteil schildert den genauen Ablauf und beantwortet die Fragen „Wie?“ und „Warum?“?',
      interactionType: 'input',
      correctAnswers: ['Hauptteil', 'der Hauptteil'],
      placeholder: 'Abschnitt eingeben...',
      hint: 'Es handelt sich um den mittleren, umfangreichsten Abschnitt der Gliederung.',
      sampleSolution: 'Hauptteil',
    },
    {
      id: 'bericht-auf-q4',
      prompt:
        'Bringe die Bestandteile eines Berichts in die richtige Gliederungsreihenfolge:',
      interactionType: 'sentence_builder',
      tiles: [
        'folgen und schluss',
        'sachliche überschrift',
        'genauer hergang im hauptteil',
        'einleitung mit kernfakten',
      ],
      correctAnswers: [
        'sachliche überschrift einleitung mit kernfakten genauer hergang im hauptteil folgen und schluss',
      ],
      placeholder: 'Abschnitte anordnen...',
      hint: 'Beginne ganz oben mit dem Titel und gehe dann vom ersten Überblick zu den Konsequenzen am Ende.',
      sampleSolution:
        'sachliche überschrift einleitung mit kernfakten genauer hergang im hauptteil folgen und schluss',
    },
    {
      id: 'bericht-auf-q5',
      prompt:
        'Was gehört typischerweise in den Schlussteil eines Schadens- oder Unfallberichts?',
      interactionType: 'choice',
      options: [
        'Eine ausführliche Warnung an alle Bürger vor ähnlichen Gefahrenstellen',
        'Angaben über den entstandenen Sachschaden und eingeleitete Maßnahmen',
        'Ein persönlicher Dank an alle fleißigen Rettungskräfte vor Ort',
        'Eine moralische Bewertung über das Fehlverhalten einzelner Personen',
      ],
      correctAnswers: [
        'Angaben über den entstandenen Sachschaden und eingeleitete Maßnahmen',
      ],
      hint: 'Der Schluss informiert über die unmittelbaren materiellen und personellen Auswirkungen des Ereignisses.',
    },
    {
      id: 'bericht-auf-q6',
      prompt:
        'Wähle in diesem Einleitungssatz das Wort aus, das den genauen Ort des Geschehens angibt.',
      interactionType: 'word_select',
      words: [
        'Am',
        'Montagmorgen',
        'ereignete',
        'sich',
        'auf',
        'dem',
        'Schulhof',
        'ein',
        'Zusammenstoß',
      ],
      correctAnswers: ['Schulhof', 'dem Schulhof'],
      hint: 'Frage mit dem Fragewort „Wo?“ nach der Ortsangabe.',
      sampleSolution: 'Schulhof',
    },
    {
      id: 'bericht-auf-q7',
      prompt:
        'Wie nennt man das Ordnungsprinzip, wenn Ereignisse im Hauptteil genau nach ihrer zeitlichen Abfolge dargestellt werden?',
      interactionType: 'input',
      correctAnswers: [
        'Chronologie',
        'die Chronologie',
        'chronologische Reihenfolge',
        'chronologisch',
        'Zeitfolge',
        'die Zeitfolge',
      ],
      placeholder: 'Fachbegriff eingeben...',
      hint: 'Das Wort leitet sich vom griechischen Begriff für Zeit ab.',
      sampleSolution: 'Chronologie',
    },
  ],
};

// ============================================================================
// 3. THEMA: SPRACHE & GRAMMATIK (TEMPORA & SATZVERKNÜPFUNGEN)
// ============================================================================
const berichtTaskGrammatik: Task = {
  id: 'bericht-bericht-grammatik',
  topicSlug: 'bericht-grammatik',
  date: '08.10.2026',
  title: 'Sprache & Grammatik: Präteritum, Plusquamperfekt & Satzgefüge',
  subject: 'Deutsch',
  topic: 'Einen Bericht schreiben',
  dateBadge: '08.10.2026 • Grammatik & Stil',
  description:
    'Vertiefe die grammatikalischen Grundlagen: Die Verwendung des Präteritums als Haupterzählzeit, des Plusquamperfekts bei Vorzeitigkeit sowie passender Verknüpfungswörter.',
  type: 'input',
  readingText: {
    title: 'Merkkasten: Zeitformen und Satzverknüpfungen im Bericht',
    content: `ZEITFORMEN & SATZVERKNÜPFUNGEN IM BERICHT

1. DIE GRUNDZEITFORM: DAS PRÄTERITUM
• Da der Bericht über ein vergangenes Geschehen informiert, steht er durchgehend im Präteritum (einfache Vergangenheit).
• Beispiele: „stieß zusammen“, „bremste“, „bemerkte“, „rief“, „traf ein“.
• Wichtig: Das Perfekt („ist zusammengestoßen“) wird vermieden, da es zur mündlichen Alltagssprache gehört.

2. DIE VORZEITIGKEIT: DAS PLUSQUAMPERFEKT
• Geschehnisse, die zeitlich VOR dem eigentlichen Hauptgeschehen stattgefunden haben, müssen im Plusquamperfekt stehen.
• Bildung: Hilfsverb „hatte“ oder „war“ im Präteritum + Partizip II.
• Typische Signalwörter: „nachdem“, „bevor“.
• Beispiel:
  – Vorzeitiges Geschehen: „Nachdem es stark geregnet hatte, ...“ (Plusquamperfekt)
  – Hauptgeschehen: „... rutschte das Fahrrad auf der nassen Fahrbahn weg.“ (Präteritum)

3. ABWECHSLUNGSREICHE SATZVERKNÜPFUNGEN:
• Vermeide eintönige Reihungen mit „und dann“ oder „danach“.
• Zeitliche Abfolge (temporal):
  – „zunächst“, „kurz darauf“, „anschließend“, „währenddessen“, „in diesem Augenblick“.
• Ursache und Begründung (kausal):
  – „weil“, „da“, „infolgedessen“, „aufgrund dessen“.`,
    source: 'Grammatik & Sprachlehre Gymnasium',
  },
  checklistItems: [
    {
      id: 'chk-grk-1',
      text: 'Ich verwende als Grundzeitform durchgehend das Präteritum.',
      category: 'Tempus',
    },
    {
      id: 'chk-grk-2',
      text: 'Ich bilde das Plusquamperfekt bei Vorzeitigkeit mit war/hatte + Partizip II.',
      category: 'Vorzeitigkeit',
    },
    {
      id: 'chk-grk-3',
      text: 'Ich verknüpfe Sätze mit abwechslungsreichen Zeit- und Ursachenwörtern.',
      category: 'Satzverknüpfung',
    },
    {
      id: 'chk-grk-4',
      text: 'Ich vermeide Wortwiederholungen wie „und dann“ oder „danach“.',
      category: 'Stil',
    },
  ],
  teacherNotes:
    'Fokus auf Tempora (Präteritum vs. Plusquamperfekt bei Vorzeitigkeit) und temporale Satzgefüge (nachdem-Sätze).',
  inputQuestions: [
    {
      id: 'bericht-grk-q1',
      prompt:
        'Welche Zeitform dient als reguläre Grundzeitform beim Verfassen eines Berichts?',
      interactionType: 'choice',
      options: [
        'Das Präsens für eine lebendige und unmittelbare Wirkung',
        'Das Perfekt für eine mündliche und lockere Unterhaltung',
        'Das Präteritum für eine sachliche und distanzierte Schilderung',
        'Das Futur für eine vorausschauende Einordnung der Tatsachen',
      ],
      correctAnswers: [
        'Das Präteritum für eine sachliche und distanzierte Schilderung',
      ],
      hint: 'Ein Bericht beschreibt ein abgeschlossenes Ereignis in der einfachen Vergangenheitsform der Schriftsprache.',
    },
    {
      id: 'bericht-grk-q2',
      prompt:
        'Welche Zeitform muss verwendet werden, wenn ein Ereignis bereits vor dem Hauptgeschehen abgeschlossen war?',
      interactionType: 'input',
      correctAnswers: [
        'Plusquamperfekt',
        'das Plusquamperfekt',
        'Vorvergangenheit',
        'die Vorvergangenheit',
      ],
      placeholder: 'Zeitform eingeben...',
      hint: 'Diese Zeitform drückt Vorzeitigkeit in der Vergangenheit aus und wird mit den Hilfsverben „hatte“ oder „war“ gebildet.',
      sampleSolution: 'Plusquamperfekt',
    },
    {
      id: 'bericht-grk-q3',
      prompt:
        'Bilde ein grammatikalisch korrektes Satzgefüge, das ein vorzeitiges Geschehen ausdrückt:',
      interactionType: 'sentence_builder',
      tiles: [
        'die polizei gerufen hatte,',
        'trafen die einsatzkräfte ein',
        'nachdem der zeuge',
      ],
      correctAnswers: [
        'nachdem der zeuge die polizei gerufen hatte, trafen die einsatzkräfte ein',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Setze den Nebensatz mit dem Signalwort für Vorzeitigkeit an den Anfang.',
      sampleSolution:
        'nachdem der zeuge die polizei gerufen hatte, trafen die einsatzkräfte ein',
    },
    {
      id: 'bericht-grk-q4',
      prompt:
        'In welchem der folgenden Sätze wird die Zeitform der Vorzeitigkeit fehlerfrei angewendet?',
      interactionType: 'choice',
      options: [
        'Nachdem der Fahrer abbiegt, übersah er das rote Signal',
        'Nachdem der Fahrer abbog, übersah er das rote Signal',
        'Nachdem der Fahrer abgebogen ist, übersah er das Signal',
        'Nachdem der Fahrer abgebogen war, übersah er das Signal',
      ],
      correctAnswers: [
        'Nachdem der Fahrer abgebogen war, übersah er das Signal',
      ],
      hint: 'Achte auf die Kombination aus Präteritum im Hauptsatz und vollendeter Vergangenheit mit war/hatte im Nebensatz.',
    },
    {
      id: 'bericht-grk-q5',
      prompt:
        'Wähle in dem folgenden Satz das Verb aus, das im Präteritum steht.',
      interactionType: 'word_select',
      words: [
        'Der',
        'Fahrradfahrer',
        'bremste',
        'vor',
        'der',
        'Kreuzung',
        'rechtzeitig',
        'ab',
      ],
      correctAnswers: ['bremste', 'bremste ab', 'bremste ... ab'],
      hint: 'Suche nach der konjugierten finiten Verbform, die die Handlung in der einfachen Vergangenheitsform ausdrückt.',
      sampleSolution: 'bremste',
    },
    {
      id: 'bericht-grk-q6',
      prompt:
        'Welche Konjunktion drückt ein klares Ursache-Wirkungs-Verhältnis zwischen zwei Teilsätzen aus?',
      interactionType: 'choice',
      options: ['weil', 'oder', 'aber', 'wenn'],
      correctAnswers: ['weil'],
      hint: 'Dieses Bindewort leitet eine Begründung für die vorangegangene Handlung ein.',
    },
    {
      id: 'bericht-grk-q7',
      prompt:
        'Wie nennt man Bindewörter wie „nachdem“, „während“ oder „bevor“, die das zeitliche Nacheinander ordnen?',
      interactionType: 'input',
      correctAnswers: [
        'temporale Konjunktionen',
        'temporale Bindewörter',
        'Zeit-Bindewörter',
        'Temporal-Konjunktionen',
        'temporale Konjunktion',
      ],
      placeholder: 'Fachbegriff eingeben...',
      hint: 'Der lateinische Fachbegriff leitet sich vom Wort für Zeit (tempus) ab.',
      sampleSolution: 'temporale Konjunktionen',
    },
  ],
};

// ============================================================================
// 4. THEMA: ZEUGENAUSSAGEN IN SACHLICHE FORM UMWANDELN
// ============================================================================
const berichtTaskAnwendung: Task = {
  id: 'bericht-bericht-anwendung',
  topicSlug: 'bericht-anwendung',
  date: '08.10.2026',
  title: 'Zeugenaussagen prüfen & in sachliche Berichtsform umwandeln',
  subject: 'Deutsch',
  topic: 'Einen Bericht schreiben',
  dateBadge: '08.10.2026 • Fallanalyse',
  description:
    'Wandle subjektive und emotionale Zeugenaussagen in objektive Tatsachenberichte um. Filtere Übertreibungen heraus und formuliere präzise.',
  type: 'input',
  readingText: {
    title: 'Fallbeispiel: Kollision auf dem Radweg am Schulzentrum',
    content: `VOM ZEUGENBERICHT ZUM SACHLICHEN BERICHT

1. DIE EMOTIONALE ZEUGENAUSSAGE (Aussage eines Schülers vor Ort):
„Ich stand da an der Bushaltestelle und plötzlich kam der eine Typ mit seinem E-Scooter angeschossen wie eine Rakete! Der hat voll auf sein Handy gestarrt und ist ohne zu gucken voll in das Mädchen auf dem Fahrrad reingekracht. Das war so ein krasser Schock! Das arme Mädchen hat mega geweint und ihr Fahrrad ist komplett Schrott. Der Scooter-Fahrer hat die alleinige Schuld, der Typ spinnt doch!“

2. ANALYSE: FAKTEN HERAUSFILTERN:
• Subjektive Wertungen & Übertreibungen (gehören NICHT in den Bericht):
  – „angeschossen wie eine Rakete“
  – „krasser Schock“
  – „mega geweint“, „das arme Mädchen“
  – „komplett Schrott“
  – Schuldzuweisung („hat die alleinige Schuld, spinnt doch“)
• Relevante Fakten (gehören IN den Bericht):
  – Wer: Ein männlicher E-Scooter-Fahrer und eine jugendliche Radfahrerin.
  – Wo: Im Bereich der Bushaltestelle am Schulzentrum.
  – Was / Wie: Kollision zwischen E-Scooter und Fahrrad.
  – Warum / Ursache: Mögliche Ablenkung des E-Scooter-Fahrers durch die Nutzung eines Mobiltelefons.
  – Folgen: Schülerin verletzt; Sachschaden am Vorderrad des Fahrrads.`,
    source: 'Praxisleitfaden Schülerberichte',
  },
  checklistItems: [
    {
      id: 'chk-anw-1',
      text: 'Ich filtere subjektive Emotionen und Umgangssprache heraus.',
      category: 'Filterung',
    },
    {
      id: 'chk-anw-2',
      text: 'Ich formuliere Zeugenaussagen sachlich und neutral im Präteritum.',
      category: 'Formulierung',
    },
    {
      id: 'chk-anw-3',
      text: 'Ich behalte die überprüfbaren Fakten (Beteiligte, Ort, Hergang, Schaden) bei.',
      category: 'Fakten',
    },
    {
      id: 'chk-anw-4',
      text: 'Ich verzichte auf Spekulationen über Schuld oder innere Gefühle.',
      category: 'Objektivität',
    },
  ],
  teacherNotes:
    'Transferleistung: Umwandlung emotionaler Zeugenaussagen in objektive Berichtsformen. Entschärfen von Umgangssprache und Vermeidung von Vorverurteilungen.',
  inputQuestions: [
    {
      id: 'bericht-anw-q1',
      prompt:
        'Ein Zeuge gibt an: „Der Fahrer raste wie eine Rakete heran!“ Wie lautet die sachliche Formulierung?',
      interactionType: 'choice',
      options: [
        'Der E-Scooter-Fahrer beschleunigte sein Gefährt auf eine unvorstellbare Reisegeschwindigkeit',
        'Der E-Scooter-Fahrer näherte sich der Unfallstelle mit mutmaßlich hoher Geschwindigkeit',
        'Der E-Scooter-Fahrer verhielt sich wie ein rücksichtsloser Rennfahrer auf einer Teststrecke',
        'Der E-Scooter-Fahrer flog förmlich wie ein abgeschossener Flugkörper über den breiten Gehweg',
      ],
      correctAnswers: [
        'Der E-Scooter-Fahrer näherte sich der Unfallstelle mit mutmaßlich hoher Geschwindigkeit',
      ],
      hint: 'Ersetze bildhafte Vergleiche und Übertreibungen durch eine nüchterne Geschwindigkeitsbeschreibung.',
    },
    {
      id: 'bericht-anw-q2',
      prompt:
        'Markiere in dem folgenden Zeugensatz den umgangssprachlichen Ausdruck, der im Bericht sachlich ersetzt werden muss.',
      interactionType: 'word_select',
      words: [
        'Das',
        'Vorderrad',
        'des',
        'Fahrrads',
        'war',
        'nach',
        'dem',
        'Sturz',
        'völlig',
        'Schrott',
      ],
      correctAnswers: ['Schrott'],
      hint: 'Suche nach dem umgangssprachlichen Wort für einen technischen Defekt oder Schaden.',
      sampleSolution: 'Schrott',
    },
    {
      id: 'bericht-anw-q3',
      prompt:
        'Welche Information aus der Zeugenaussage ist ein überprüfbarer Fakt und gehört in den Bericht?',
      interactionType: 'choice',
      options: [
        'Dass der Unfallzeuge einen unvergesslichen Schock erlitten hat',
        'Dass das verletzte Mädchen dem Zeugen unendlich leidtat',
        'Dass der E-Scooter-Fahrer während der Fahrt ein Handy bediente',
        'Dass der Unfall für den Zeugen das schlimmste Erlebnis war',
      ],
      correctAnswers: [
        'Dass der E-Scooter-Fahrer während der Fahrt ein Handy bediente',
      ],
      hint: 'Konzentriere dich auf eine konkrete, sichtbare Handlung, die die Ursache des Unfalls betrifft.',
    },
    {
      id: 'bericht-anw-q4',
      prompt:
        'Bilde aus den Einzelfakten einen sachlichen Satz für den Schlussteil des Berichts:',
      interactionType: 'sentence_builder',
      tiles: [
        'versorgten die schülerin',
        'an der unfallstelle',
        'die alarmierten rettungskräfte',
      ],
      correctAnswers: [
        'die alarmierten rettungskräfte versorgten die schülerin an der unfallstelle',
        'an der unfallstelle versorgten die alarmierten rettungskräfte die schülerin',
      ],
      placeholder: 'Satzteile anordnen...',
      hint: 'Beginne entweder mit dem Subjekt oder der Ortsangabe.',
      sampleSolution:
        'die alarmierten rettungskräfte versorgten die schülerin an der unfallstelle',
    },
    {
      id: 'bericht-anw-q5',
      prompt:
        'Warum gehört der Satz „Der rücksichtslose E-Scooter-Fahrer hat die alleinige Schuld!“ nicht in den Bericht?',
      interactionType: 'choice',
      options: [
        'Weil der Schulträger solche Unfälle grundsätzlich nicht erfasst',
        'Weil in der deutschen Sprache keine Ausrufezeichen verwendet werden',
        'Weil ein Schadensbericht niemals Namen von Fahrzeugen nennen darf',
        'Weil Schuldzuweisungen und Vorwürfe Sache von Polizei und Gericht sind',
      ],
      correctAnswers: [
        'Weil Schuldzuweisungen und Vorwürfe Sache von Polizei und Gericht sind',
      ],
      hint: 'Der Berichterstatter bleibt neutral und überlässt rechtliche Urteile den zuständigen Stellen.',
    },
    {
      id: 'bericht-anw-q6',
      prompt:
        'Wie nennt man Aussagen von Personen, die ein Ereignis selbst beobachtet haben?',
      interactionType: 'input',
      correctAnswers: [
        'Zeugenaussagen',
        'die Zeugenaussagen',
        'Zeugenaussage',
        'die Zeugenaussage',
        'Zeugenberichte',
        'der Zeugenbericht',
      ],
      placeholder: 'Fachbegriff eingeben...',
      hint: 'Der Begriff setzt sich aus den Personen, die etwas gesehen haben, und ihren Äußerungen zusammen.',
      sampleSolution: 'Zeugenaussagen',
    },
    {
      id: 'bericht-anw-q7',
      prompt:
        'Wie gibt man Aussagen von Zeugen sprachlich korrekt und distanziert in einem Bericht wieder?',
      interactionType: 'choice',
      options: [
        'In indirekter Rede oder als knappe Zusammenfassung im Konjunktiv',
        'In voller wörtlicher Rede mit bunten Ausrufezeichen im Hauptteil',
        'Ausschließlich in Form von emotionalen Sprachnachrichten im Anhang',
        'Gar nicht, da Zeugenaussagen vor Gericht immer verboten bleiben',
      ],
      correctAnswers: [
        'In indirekter Rede oder als knappe Zusammenfassung im Konjunktiv',
      ],
      hint: 'Eine distanzierte Formulierung nutzt nicht wörtliche Zitate, sondern fasst Gesagtes neutral zusammen.',
    },
  ],
};

// ============================================================================
// EXPORT ALL TASKS & DAILY UNIT
// ============================================================================
export const berichtTasks: Task[] = [
  berichtTaskGrundlagen,
  berichtTaskAufbau,
  berichtTaskGrammatik,
  berichtTaskAnwendung,
];

export const unit08102026: DailyLearningUnit = {
  id: 'bericht-08.10.2026',
  date: '08.10.2026',
  title: 'Einen Bericht schreiben: Merkmale, Aufbau & Sprache',
  description:
    'Lerne Schritt für Schritt, wie ein vollständiger, sachlicher Bericht aufgebaut ist: Von den W-Fragen und Merksätzen über die Gliederung bis hin zu Präteritum, Plusquamperfekt und der objektiven Umwandlung von Zeugenaussagen.',
  tasks: berichtTasks,
};
