import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// 1. THEMA: CONDITIONAL SENTENCES TYPE 1 (REALE BEDINGUNGEN)
// ============================================================================
const fridaTaskConditionalType1Day4: Task = {
  id: 'conditionals-conditional-type-1-1210',
  topicSlug: 'conditional-type-1-praxis',
  date: '12.10.2026',
  title: 'Conditional Sentences Type 1 (Reale Bedingungen)',
  subject: 'Englisch',
  topic: 'If-Clauses Type 1',
  dateBadge: '12.10.2026 • Type 1',
  description:
    'Trainiere reale Bedingungen in Alltagssituationen: Simple Present im if-Satz (Achtung he/she/it -s und don’t/doesn’t) und will-future, Modalverben oder Imperativ im Hauptsatz.',
  type: 'input',
  teacherNotes:
    'Schwerpunkte Type 1 Vertiefung: He/she/it -s im if-Satz, Verneinungen mit don’t / doesn’t, Modalverben (can, must, should) und Imperative im Hauptsatz. Merksatz: Niemals "will" im if-Teil!',
  readingText: {
    title: 'Wissensbox: Conditional Sentences Type 1 (Reale Bedingungen)',
    content: `CONDITIONAL SENTENCES TYPE 1: SYSTEM & PRAXIS

1. VERWENDUNG:
Typ 1 drückt Bedingungen aus, die in der Gegenwart oder Zukunft realisierbar, wahrscheinlich oder sehr gut erfüllbar sind.

2. DER SATZBAU:
• IF-SATZ (Bedingung): Simple Present
  – "If the sun shines..."
  – Achtung bei 3. Person Singular (he, she, it): Das Verb braucht ein -s! ("If he calls me...")
  – Verneinung: don't / doesn't + Infinitiv ("If you don't hurry...", "If she doesn't study...")
• HAUPTSATZ (Folge / Konsequenz): will-future (will / won't + Infinitiv)
  – "... we will ride our bikes to the lake."
  – Kurzformen: 'll / won't ("... we'll be late.")
• Alternativen im Hauptsatz:
  – Modalverben: can, must, should, may ("... you can join us.")
  – Imperativ (Aufforderung): ("... call me immediately!")

3. DIE GOLDENEN REGELN:
• NIEMALS "will" oder "won't" im if-Satz! ("If it rains...", NIEMALS: "If it will rain...")
• Kommasetzung:
  – Steht der if-Satz vorne -> KOMMA nach dem if-Satz!
    "If you leave now, you will catch the train."
  – Steht der Hauptsatz vorne -> KEIN KOMMA vor if!
    "You will catch the train if you leave now."`,
    source: 'English Grammar • Conditional Sentences Type 1',
  },
  checklistItems: [
    {
      id: 'chk-f1-1',
      text: 'Ich verwende im if-Satz immer das Simple Present (und denke an das he/she/it -s).',
      category: 'If-Satz',
    },
    {
      id: 'chk-f1-2',
      text: 'Ich verneine im if-Satz mit don’t oder doesn’t (niemals mit won’t).',
      category: 'Verneinung',
    },
    {
      id: 'chk-f1-3',
      text: 'Ich bilde den Hauptsatz mit will / won’t + Infinitiv oder passenden Modalverben.',
      category: 'Hauptsatz',
    },
    {
      id: 'chk-f1-4',
      text: 'Ich setze ein Komma nur dann, wenn der if-Satz am Satzanfang steht.',
      category: 'Kommasetzung',
    },
  ],
  inputQuestions: [
    {
      id: 'c1-01',
      prompt: 'Welche Zeitform gehört in den if-Satz bei einem Conditional Sentence Type 1?',
      interactionType: 'choice',
      options: ['Simple Past   ', 'Simple Present', 'Past Perfect  ', 'will-future   '],
      correctAnswers: ['Simple Present'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Überlege, welche grammatikalische Gegenwartsform für Tatsachen genutzt wird.',
      sampleSolution: 'Simple Present',
    },
    {
      id: 'c1-02',
      prompt: 'Ergänze das Verb im if-Satz: "If the train ... (arrive) late, we will miss our connection."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['arrives'],
      hint: '"The train" ist 3. Person Singular (it) – denke an das passende End-s.',
      sampleSolution: 'arrives',
    },
    {
      id: 'c1-03',
      prompt: 'Welche Verbform passt in die Lücke? "If Liam practices daily, he ... the tournament."',
      interactionType: 'choice',
      options: ['would win', 'will win ', 'won      ', 'winning  '],
      correctAnswers: ['will win '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Im Hauptsatz von Typ 1 steht die Zukunftsform mit will + Infinitiv.',
      sampleSolution: 'will win',
    },
    {
      id: 'c1-04',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['if you help me,', 'finish much faster', 'we will', 'with the project'],
      correctAnswers: [
        'If you help me, we will finish much faster with the project.',
        'We will finish much faster with the project if you help me.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit der Bedingung ("If you help me,") und setze den Hauptsatz fort.',
      sampleSolution: 'If you help me, we will finish much faster with the project.',
    },
    {
      id: 'c1-05',
      prompt: 'Ergänze die Verneinung im if-Satz: "If we ... (not / hurry) up, the museum will close."',
      interactionType: 'input',
      placeholder: 'Verneinte Form eintragen...',
      correctAnswers: ["don't hurry", 'do not hurry'],
      hint: 'Verneine im Simple Present mit "don\'t" vor dem Infinitiv.',
      sampleSolution: "don't hurry",
    },
    {
      id: 'c1-06',
      prompt: 'Klassischer Fehler: Welcher Satz verstößt gegen die Grundregel von Typ 1?',
      interactionType: 'choice',
      options: [
        'If she comes here, we will bake a cake.',
        'If she will come, we will bake a cake.',
        'We will bake cake if she comes to us. ',
        'If she visits us, we can bake cupcakes.',
      ],
      correctAnswers: ['If she will come, we will bake a cake.'],
      placeholder: 'Wähle die fehlerhafte Option...',
      hint: 'Im if-Satz darf niemals ein "will" stehen.',
      sampleSolution: 'If she will come, we will bake a cake.',
    },
    {
      id: 'c1-07',
      prompt: 'Ergänze das Verb im Hauptsatz: "If it gets dark soon, I ... (turn on) the garden lights."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['will turn on', "'ll turn on", 'can turn on'],
      hint: 'Bilde das Futur mit will + Infinitiv.',
      sampleSolution: 'will turn on',
    },
    {
      id: 'c1-08',
      prompt: 'Welche Verneinung passt in den Hauptsatz? "If you forget your jacket, you ... stay warm outside."',
      interactionType: 'choice',
      options: ["don't   ", "didn't  ", "wouldn't", "won't   "],
      correctAnswers: ["won't   "],
      placeholder: 'Wähle die passende Option...',
      hint: 'Gesucht ist die verneinte Form von will im Hauptsatz.',
      sampleSolution: "won't",
    },
    {
      id: 'c1-09',
      prompt: 'Klicke auf das falsche Wort im folgenden Satz.',
      interactionType: 'word_select',
      words: ['If', 'Ben', 'will', 'call', 'you', 'tonight,', 'tell', 'him', 'about', 'the', 'party.'],
      correctAnswers: ['will'],
      placeholder: 'Klicke auf das unzulässige Wort...',
      hint: 'Finde das Zukunfts-Hilfsverb, das im Bedingungsteil verboten ist.',
      sampleSolution: 'will',
    },
    {
      id: 'c1-10',
      prompt: 'Ergänze das Verb be im if-Satz: "If the weather ... (be) sunny tomorrow, we can go hiking."',
      interactionType: 'input',
      placeholder: 'Form von be eintragen...',
      correctAnswers: ['is'],
      hint: '"The weather" entspricht dem Pronomen it in der 3. Person Singular.',
      sampleSolution: 'is',
    },
    {
      id: 'c1-11',
      prompt: 'Bringe die Satzteile in die korrekte Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['the bus on time', 'if she runs', 'maya will catch', 'to the stop'],
      correctAnswers: [
        'Maya will catch the bus on time if she runs to the stop.',
        'If she runs to the stop Maya will catch the bus on time.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Der Hauptsatz mit "Maya will catch" steht hier am Satzanfang.',
      sampleSolution: 'Maya will catch the bus on time if she runs to the stop.',
    },
    {
      id: 'c1-12',
      prompt: 'Welche Verneinung gehört in den if-Satz bei der 3. Person Singular: "If Tom ... (not / eat) lunch, he will be tired."',
      interactionType: 'choice',
      options: ["don't  ", "won't  ", "doesn't", "isn't  "],
      correctAnswers: ["doesn't"],
      placeholder: 'Wähle die passende Option...',
      hint: 'Denke an das verneinte Hilfsverb der 3. Person Singular (he, she, it).',
      sampleSolution: "doesn't",
    },
    {
      id: 'c1-13',
      prompt: 'Ergänze das passende Modalverb für eine Empfehlung: "If you feel tired, you ... (should) take a rest."',
      interactionType: 'input',
      placeholder: 'Modalverb eintragen...',
      correctAnswers: ['should', 'can', 'must'],
      hint: 'Welches englische Hilfsverb drückt "solltest" oder "sollte" aus?',
      sampleSolution: 'should',
    },
    {
      id: 'c1-14',
      prompt: 'Kommasetzung: In welchem Fall wird im Englischen ein Komma gesetzt?',
      interactionType: 'choice',
      options: [
        'Hauptsatz steht ganz vorne im Satz hier',
        'In allen englischen Bedingungssätzen ',
        'If-Satz steht ganz vorne im Gesamtsatz',
        'Nur bei Sätzen mit mehr als zwei Verben',
      ],
      correctAnswers: ['If-Satz steht ganz vorne im Gesamtsatz'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Nur wenn der if-Satz vorangeht, trennt ein Komma die beiden Teilsätze.',
      sampleSolution: 'If-Satz steht ganz vorne im Gesamtsatz',
    },
    {
      id: 'c1-15',
      prompt: 'Ergänze das Verb im if-Satz: "If Noah ... (study) for two hours, he will ace the test."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['studies'],
      hint: 'Bei study wird das y nach einem Konsonanten in der 3. Person Singular zu -ies.',
      sampleSolution: 'studies',
    },
    {
      id: 'c1-16',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['we can bake cookies', 'if we have', 'enough sugar and flour,'],
      correctAnswers: [
        'If we have enough sugar and flour, we can bake cookies.',
        'We can bake cookies if we have enough sugar and flour.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Bedingung mit den Zutaten zuerst, dann das Backen.',
      sampleSolution: 'If we have enough sugar and flour, we can bake cookies.',
    },
    {
      id: 'c1-17',
      prompt: 'Welche Verbform ist im Hauptsatz grammatikalisch korrekt? "If you come over, we ... multiplayer games."',
      interactionType: 'choice',
      options: ['could play ', 'played     ', 'are playing', 'can play   '],
      correctAnswers: ['can play   '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Ein Modalverb der Gegenwart ("können") drückt die reale Möglichkeit aus.',
      sampleSolution: 'can play',
    },
    {
      id: 'c1-18',
      prompt: 'Ergänze den Hauptsatz mit will: "If she saves her pocket money, she ... (buy) a new bike."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['will buy', "'ll buy", 'can buy'],
      hint: 'Kombiniere das Zukunfts-Hilfsverb will mit dem Grundverb buy.',
      sampleSolution: 'will buy',
    },
    {
      id: 'c1-19',
      prompt: 'Klicke auf das Verb im Simple Present im folgenden Satz.',
      interactionType: 'word_select',
      words: ['If', 'Emma', 'scores', 'a', 'goal,', 'the', 'team', 'will', 'celebrate.'],
      correctAnswers: ['scores'],
      placeholder: 'Klicke auf das Verb...',
      hint: 'Suche nach dem Vollverb im if-Teil, das mit einem -s endet.',
      sampleSolution: 'scores',
    },
    {
      id: 'c1-20',
      prompt: 'Welche logische Konsequenz passt zu Typ 1: "If the alarm rings at six o\'clock..."',
      interactionType: 'choice',
      options: [
        'I would have woken up yesterday early',
        'I will get out of bed immediately.   ',
        'the bed flew out of the open window. ',
        'yesterday was a very quiet morning.  ',
      ],
      correctAnswers: ['I will get out of bed immediately.   '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Finde die reale und grammatikalisch passende Folge im will-future.',
      sampleSolution: 'I will get out of bed immediately.',
    },
    {
      id: 'c1-21',
      prompt: 'Ergänze das verneinte Verb im Hauptsatz: "If you don\'t wear a coat, you ... (not / be) warm."',
      interactionType: 'input',
      placeholder: 'Verneinte Zukunftsform eintragen...',
      correctAnswers: ["won't be", 'will not be'],
      hint: 'Nutze die Kurzform von will not zusammen mit be.',
      sampleSolution: "won't be",
    },
    {
      id: 'c1-22',
      prompt: 'Bringe die Bausteine in die korrekte Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['please call me,', 'if you find my keys', 'on the playground'],
      correctAnswers: [
        'If you find my keys on the playground, please call me.',
        'Please call me if you find my keys on the playground.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Der Hauptsatz ist hier eine Bitte bzw. Aufforderung (Imperativ).',
      sampleSolution: 'If you find my keys on the playground, please call me.',
    },
    {
      id: 'c1-23',
      prompt: 'Welche Antwort passt auf die Frage: "What will you do if it rains this weekend?"',
      interactionType: 'choice',
      options: [
        'I would fly to the moon in rocket. ',
        'I stayed at home all day yesterday.',
        'I am sleeping since last night now.',
        'I will read a book in my room.     ',
      ],
      correctAnswers: ['I will read a book in my room.     '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Die Antwort auf eine Typ-1-Frage formuliert die Zukunft mit will + Infinitiv.',
      sampleSolution: 'I will read a book in my room.',
    },
    {
      id: 'c1-24',
      prompt: 'Ergänze das Verb im if-Satz: "If they ... (listen) carefully, they will understand the task."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['listen'],
      hint: 'Subjekt "they" verlangt den reinen Infinitiv ohne -s.',
      sampleSolution: 'listen',
    },
    {
      id: 'c1-25',
      prompt: 'Welcher Satz hat die vollkommen fehlerfreie Zeichensetzung und Grammatik?',
      interactionType: 'choice',
      options: [
        'If you will ask kindly, she helps you. ',
        'She will help you, if you ask kindly.  ',
        'If you ask kindly, she will help you. ',
        'If she will help you she asks kindly.  ',
      ],
      correctAnswers: ['If you ask kindly, she will help you. '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Achte auf den if-Satz im Simple Present und das Komma vor dem Hauptsatz.',
      sampleSolution: 'If you ask kindly, she will help you.',
    },
  ],
};

// ============================================================================
// 2. THEMA: CONDITIONAL SENTENCES TYPE 2 (HYPOTHETISCHE BEDINGUNGEN)
// ============================================================================
const fridaTaskConditionalType2Day4: Task = {
  id: 'conditionals-conditional-type-2-1210',
  topicSlug: 'conditional-type-2-praxis',
  date: '12.10.2026',
  title: 'Conditional Sentences Type 2 (Hypothetische Situationen)',
  subject: 'Englisch',
  topic: 'If-Clauses Type 2',
  dateBadge: '12.10.2026 • Type 2',
  description:
    'Meistere Träume, hypothetische Gedankenexperimente und Ratschläge: Simple Past im if-Satz (inklusive "If I were you") und would / wouldn’t + Infinitiv im Hauptsatz.',
  type: 'input',
  teacherNotes:
    'Schwerpunkte Type 2 Vertiefung: Simple Past im if-Satz (unregelmäßige Verben & Verneinung mit didn’t), Hauptsatz mit would / wouldn’t oder could + Infinitiv. Feste Wendung für Ratschläge: "If I were you, I would...". Merksatz: Niemals "would" im if-Teil!',
  readingText: {
    title: 'Wissensbox: Conditional Sentences Type 2 (Hypothetische Bedingungen)',
    content: `CONDITIONAL SENTENCES TYPE 2: FORM & VERWENDUNG

1. VERWENDUNG:
Typ 2 drückt Bedingungen aus, die in der Gegenwart oder Zukunft unwahrscheinlich, rein hypothetisch oder unmöglich sind (Wunschträume, Gedankenexperimente, Ratschläge).

2. DER SATZBAU:
• IF-SATZ (Bedingung): Simple Past
  – Regelmäßige Verben: Infinitiv + -ed ("If I lived in London...")
  – Unregelmäßige Verben: 2. Spalte ("If I had a million euros...", "If I knew his address...")
  – Verneinung: didn't + Infinitiv ("If I didn't have so much homework...")
  – Das Verb "be": Häufig wird "were" für alle Personen verwendet, besonders bei Ratschlägen:
    "If I were you, I would talk to her."
• HAUPTSATZ (Hypothetische Folge): would + Infinitiv
  – "I would travel around the world."
  – Kurzform: 'd ("I'd travel...")
  – Verneinung: wouldn't + Infinitiv ("I wouldn't buy that jacket.")
• Alternative Modalverben im Hauptsatz: could / might + Infinitiv
  – "If you practiced more, you could win the game."

3. DIE GOLDENEN REGELN:
• NIEMALS "would" oder "wouldn't" im if-Satz! ("If I had...", NIEMALS: "If I would have...")
• Kommasetzung: Genau wie bei Typ 1 gilt das Komma nur, wenn der if-Satz vorne steht.`,
    source: 'English Grammar • Conditional Sentences Type 2',
  },
  checklistItems: [
    {
      id: 'chk-f2-1',
      text: 'Ich verwende im if-Satz das Simple Past (regelmäßig mit -ed oder unregelmäßig).',
      category: 'If-Satz',
    },
    {
      id: 'chk-f2-2',
      text: 'Ich kenne die feste Wendung "If I were you, I would..." für Ratschläge.',
      category: 'Ratschläge',
    },
    {
      id: 'chk-f2-3',
      text: 'Ich bilde den Hauptsatz mit would / wouldn’t oder could + Infinitiv.',
      category: 'Hauptsatz',
    },
    {
      id: 'chk-f2-4',
      text: 'Ich vermeide den typischen Fehler "would im if-Satz".',
      category: 'Fehlervermeidung',
    },
  ],
  inputQuestions: [
    {
      id: 'c2-01',
      prompt: 'Welche Zeitform steht im if-Satz eines Conditional Sentence Type 2?',
      interactionType: 'choice',
      options: ['Simple Present', 'Simple Past   ', 'Past Perfect  ', 'will-future   '],
      correctAnswers: ['Simple Past   '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Gesucht ist die einfache Vergangenheitsform des Verbs.',
      sampleSolution: 'Simple Past',
    },
    {
      id: 'c2-02',
      prompt: 'Ergänze das unregelmäßige Verb im if-Satz: "If I ... (have) a time machine, I would visit ancient Rome."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['had'],
      hint: 'Die Vergangenheitsform von have hat drei Buchstaben.',
      sampleSolution: 'had',
    },
    {
      id: 'c2-03',
      prompt: 'Welche Form passt in die Ratschlag-Wendung? "If I ... you, I would apologize."',
      interactionType: 'choice',
      options: ['was ', 'am  ', 'were', 'be  '],
      correctAnswers: ['were'],
      placeholder: 'Wähle die passende Option...',
      hint: 'In der festen Redewendung für Ratschläge nutzt man traditionell "were" bei "I".',
      sampleSolution: 'were',
    },
    {
      id: 'c2-04',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für einen Wunschtraum.',
      interactionType: 'sentence_builder',
      tiles: ['i would fly to space tomorrow', 'a spaceship,', 'if i owned'],
      correctAnswers: [
        'If i owned a spaceship, i would fly to space tomorrow.',
        'I would fly to space tomorrow if i owned a spaceship.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit der hypothetischen Bedingung ("If I owned...").',
      sampleSolution: 'If i owned a spaceship, i would fly to space tomorrow.',
    },
    {
      id: 'c2-05',
      prompt: 'Ergänze das Verb im Hauptsatz: "If Lernende won the lottery, she ... (buy) a house by the sea."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['would buy', "'d buy", 'could buy'],
      hint: 'Setze das Hilfsverb would zusammen mit dem Infinitiv ein.',
      sampleSolution: 'would buy',
    },
    {
      id: 'c2-06',
      prompt: 'Welcher Satz enthält einen schweren Grammatikfehler bei Typ 2?',
      interactionType: 'choice',
      options: [
        'If I had wings, I would fly very high.  ',
        'I would fly high if I had large wings.  ',
        'If you were a bird, you could fly away. ',
        'If I would have wings, I would fly high.',
      ],
      correctAnswers: ['If I would have wings, I would fly high.'],
      placeholder: 'Wähle die fehlerhafte Option...',
      hint: 'Niemals darf "would" im if-Satz stehen.',
      sampleSolution: 'If I would have wings, I would fly high.',
    },
    {
      id: 'c2-07',
      prompt: 'Ergänze die unregelmäßige Vergangenheitsform: "If they ... (know) the answer, they would raise their hands."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['knew'],
      hint: 'Die Simple-Past-Form von know wechselt das o zu einem e.',
      sampleSolution: 'knew',
    },
    {
      id: 'c2-08',
      prompt: 'Welche verneinte Form gehört in den Hauptsatz? "If we lived closer to school, we ... need the bus."',
      interactionType: 'choice',
      options: ["wouldn't", "won't   ", "didn't  ", "don't   "],
      correctAnswers: ["wouldn't"],
      placeholder: 'Wähle die passende Option...',
      hint: 'Gesucht ist die Verneinung von would im hypothetischen Hauptsatz.',
      sampleSolution: "wouldn't",
    },
    {
      id: 'c2-09',
      prompt: 'Klicke auf das falsche Hilfsverb im folgenden Satz.',
      interactionType: 'word_select',
      words: ['If', 'Leo', 'would', 'train', 'harder,', 'he', 'would', 'win', 'every', 'race.'],
      correctAnswers: ['would'],
      placeholder: 'Klicke auf das unzulässige Wort...',
      hint: 'Finde das Wort, das im if-Teil der Bedingung nichts zu suchen hat.',
      sampleSolution: 'would',
    },
    {
      id: 'c2-10',
      prompt: 'Ergänze die verneinte Form im if-Satz: "If you ... (not / eat) so much sugar, you could feel much healthier."',
      interactionType: 'input',
      placeholder: 'Verneinte Form eintragen...',
      correctAnswers: ["didn't eat", 'did not eat'],
      hint: 'Verneine im Simple Past mit dem Hilfsverb didn\'t + Grundform.',
      sampleSolution: "didn't eat",
    },
    {
      id: 'c2-11',
      prompt: 'Bringe die Satzteile in die korrekte Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['more free time', 'if he had', 'tim would read books', 'every evening'],
      correctAnswers: [
        'Tim would read books every evening if he had more free time.',
        'If he had more free time Tim would read books every evening.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Der Hauptsatz mit "Tim would read" steht am Anfang.',
      sampleSolution: 'Tim would read books every evening if he had more free time.',
    },
    {
      id: 'c2-12',
      prompt: 'Was drückt ein Conditional Sentence Type 2 inhaltlich aus?',
      interactionType: 'choice',
      options: [
        'Eine vollkommen sichere Tatsache in der nahen Zukunft',
        'Eine hypothetische oder unwahrscheinliche Vorstellung',
        'Ein bereits unveränderlich abgeschlossenes Ereignis  ',
        'Ein festes allgemeingültiges Naturgesetz der Physik  ',
      ],
      correctAnswers: ['Eine hypothetische oder unwahrscheinliche Vorstellung'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Typ 2 befasst sich mit Gedankenexperimenten und Wunschvorstellungen.',
      sampleSolution: 'Eine hypothetische oder unwahrscheinliche Vorstellung',
    },
    {
      id: 'c2-13',
      prompt: 'Ergänze das unregelmäßige Verb im if-Satz: "If she ... (speak) fluent Japanese, she would move to Tokyo."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['spoke'],
      hint: 'Simple-Past-Form von speak mit fünf Buchstaben.',
      sampleSolution: 'spoke',
    },
    {
      id: 'c2-14',
      prompt: 'Welche Kurzform von "would" wird in der Umgangssprache häufig genutzt?',
      interactionType: 'choice',
      options: ["'ll ", "'ve ", "'d  ", "'re "],
      correctAnswers: ["'d  "],
      placeholder: 'Wähle die passende Option...',
      hint: 'Denke an Sätze wie "I\'d love to come".',
      sampleSolution: "'d",
    },
    {
      id: 'c2-15',
      prompt: 'Ergänze das Modalverb für eine hypothetische Möglichkeit: "If we had tickets, we ... (could) go to the concert."',
      interactionType: 'input',
      placeholder: 'Modalverb eintragen...',
      correctAnswers: ['could', 'would'],
      hint: 'Welches Vergangenheits-Modalverb bedeutet "könnten"?',
      sampleSolution: 'could',
    },
    {
      id: 'c2-16',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für einen Ratschlag.',
      interactionType: 'sentence_builder',
      tiles: ['i would ask the teacher', 'for some advice', 'if i were you,', 'after class'],
      correctAnswers: [
        'If i were you, i would ask the teacher for some advice after class.',
        'I would ask the teacher for some advice after class if i were you.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit der Ratschlagsformel "If I were you,".',
      sampleSolution: 'If i were you, i would ask the teacher for some advice after class.',
    },
    {
      id: 'c2-17',
      prompt: 'Welche Verbform passt in die Lücke? "If it ... on Saturday, we would build a giant snowman."',
      interactionType: 'choice',
      options: ['snows     ', 'would snow', 'is snowing', 'snowed    '],
      correctAnswers: ['snowed    '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Im if-Satz von Typ 2 steht die regelmäßige Vergangenheitsform auf -ed.',
      sampleSolution: 'snowed',
    },
    {
      id: 'c2-18',
      prompt: 'Ergänze das Verb im Hauptsatz: "If animals could talk, they ... (tell) us funny stories."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['would tell', 'could tell'],
      hint: 'Kombiniere would mit dem Verb tell.',
      sampleSolution: 'would tell',
    },
    {
      id: 'c2-19',
      prompt: 'Klicke auf das Verb im Simple Past im folgenden Satz.',
      interactionType: 'word_select',
      words: ['If', 'I', 'found', 'a', 'wallet', 'on', 'the', 'street,', 'I', 'would', 'return', 'it.'],
      correctAnswers: ['found'],
      placeholder: 'Klicke auf das Verb...',
      hint: 'Suche nach der unregelmäßigen Vergangenheitsform von "find".',
      sampleSolution: 'found',
    },
    {
      id: 'c2-20',
      prompt: 'Vervollständige die hypothetische Folge: "If I could fly like a bird..."',
      interactionType: 'choice',
      options: [
        'I would explore all the mountain peaks.',
        'I will walk to the school bus station. ',
        'I walked five miles yesterday morning. ',
        'my shoes would have melted last summer.',
      ],
      correctAnswers: ['I would explore all the mountain peaks.'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Suche nach der passenden Typ-2-Formulierung mit would + Infinitiv.',
      sampleSolution: 'I would explore all the mountain peaks.',
    },
    {
      id: 'c2-21',
      prompt: 'Ergänze das unregelmäßige Verb im if-Satz: "If we ... (see) a ghost, we would run away screaming."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['saw'],
      hint: 'Die Simple-Past-Form von see hat drei Buchstaben.',
      sampleSolution: 'saw',
    },
    {
      id: 'c2-22',
      prompt: 'Bringe die Satzbausteine in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['that expensive jacket', 'if i were you', 'i would not buy', 'in that shop'],
      correctAnswers: [
        'I would not buy that expensive jacket in that shop if i were you.',
        'If i were you i would not buy that expensive jacket in that shop.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Verneinter Ratschlag mit would not buy.',
      sampleSolution: 'I would not buy that expensive jacket in that shop if i were you.',
    },
    {
      id: 'c2-23',
      prompt: 'Welche Antwort passt grammatikalisch auf: "What would you do if you met an alien?"',
      interactionType: 'choice',
      options: [
        'I will call my mother on the phone',
        'I would take a selfie with it.    ',
        'I ran away yesterday very quickly.',
        'I am going to hide under bed now. ',
      ],
      correctAnswers: ['I would take a selfie with it.    '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Auf eine Frage im Typ 2 antwortet man mit would + Infinitiv.',
      sampleSolution: 'I would take a selfie with it.',
    },
    {
      id: 'c2-24',
      prompt: 'Ergänze die verneinte Form im if-Satz: "If Mia ... (not / live) so far away, we would meet every day."',
      interactionType: 'input',
      placeholder: 'Verneinte Form eintragen...',
      correctAnswers: ["didn't live", 'did not live'],
      hint: 'Verneinung im Simple Past mit didn\'t.',
      sampleSolution: "didn't live",
    },
    {
      id: 'c2-25',
      prompt: 'Welcher Satz drückt einen korrekten Typ-2-Ratschlag aus?',
      interactionType: 'choice',
      options: [
        'If I will be you, I would take a bath.  ',
        'If I am you, I will take a warm bath now.',
        'If I were you, I would take a warm bath.',
        'If I would be you, I took a warm bath.  ',
      ],
      correctAnswers: ['If I were you, I would take a warm bath.'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Achte auf "If I were you" und "would take".',
      sampleSolution: 'If I were you, I would take a warm bath.',
    },
  ],
};

// ============================================================================
// 3. THEMA: CONDITIONAL MIX & VERGLEICH (TYPE 1 VS. TYPE 2)
// ============================================================================
const fridaTaskConditionalComparisonDay4: Task = {
  id: 'conditionals-conditional-comparison-1210',
  topicSlug: 'conditional-mix-training',
  date: '12.10.2026',
  title: 'Conditional Sentences Mix & Vergleich: Type 1 vs. Type 2',
  subject: 'Englisch',
  topic: 'If-Clauses Vergleich',
  dateBadge: '12.10.2026 • Mix & Check',
  description:
    'Gegenüberstellung und Fehlersuche: Entscheide sicher zwischen realen Bedingungen (Typ 1) und Gedankenexperimenten (Typ 2), korrigiere typische Fehler und meistere anspruchsvolle Lückensätze.',
  type: 'input',
  teacherNotes:
    'Schwerpunkte: Direkter Vergleich Type 1 vs Type 2. Erkennen von Signal-Kontexten (real vs. hypothetisch), Umwandlung von Sätzen zwischen beiden Typen, Vermeidung von Zeitenmischungen (z. B. Simple Present mit would).',
  readingText: {
    title: 'Wissensbox: Type 1 vs. Type 2 im direkten Vergleich',
    content: `TYPE 1 VS. TYPE 2: DIE ENTSCHEIDUNGSTABELLE

1. GEGENÜBERSTELLUNG DER STRUKTUREN:

MERKMAL         TYPE 1 (Reale Bedingung)            TYPE 2 (Hypothetische Bedingung)
Bedeutung:      Erfüllbar, wahrscheinlich, real     Unwahrscheinlich, Wunschtraum, Ratschlag
if-Satz:        Simple Present (play / plays)       Simple Past (played / saw / had)
Hauptsatz:      will / won't + Infinitiv            would / wouldn't + Infinitiv
Modalverben:    can, must, should, Imperativ        could, might

2. BEISPIEL-PAARE ZUM VERSTÄNDNIS:
• Typ 1 (Reale Wetterprognose für morgen):
  "If it rains tomorrow, we will stay at home."
• Typ 2 (Rein hypothetischer Wunschtraum in der Wüste):
  "If it rained here in the Sahara, flowers would grow everywhere."

3. DIE HÄUFIGSTEN FEHLERQUELLEN:
• Fehler 1: Zeitformen mischen!
  Falsch: "If I have time, I would call you." (Present + would gemischt!)
  Richtig (Typ 1): "If I have time, I will call you."
  Richtig (Typ 2): "If I had time, I would call you."
• Fehler 2: will oder would im if-Satz!
  Merke: In den if-Satz gehört NIEMALS ein will oder would!`,
    source: 'English Grammar • Conditional Comparison',
  },
  checklistItems: [
    {
      id: 'chk-fc-1',
      text: 'Ich kann an der Wahrscheinlichkeit erkennen, ob Typ 1 oder Typ 2 gefordert ist.',
      category: 'Kontext',
    },
    {
      id: 'chk-fc-2',
      text: 'Ich mische niemals Simple Present mit would oder Simple Past mit will.',
      category: 'Zeitenharmonie',
    },
    {
      id: 'chk-fc-3',
      text: 'Ich kann Typ-1-Sätze in Typ-2-Sätze umformen und umgekehrt.',
      category: 'Umformung',
    },
    {
      id: 'chk-fc-4',
      text: 'Ich entlarve fehlerhafte Sätze mit will oder would im if-Teil sofort.',
      category: 'Fehlersuche',
    },
  ],
  inputQuestions: [
    {
      id: 'cc-01',
      prompt: 'Um welchen Typ handelt es sich? "If we miss the bus, we will walk to school."',
      interactionType: 'choice',
      options: ['Type 2', 'Type 1', 'Type 0', 'Type 3'],
      correctAnswers: ['Type 1'],
      placeholder: 'Wähle den passenden Typ...',
      hint: 'Simple Present im if-Satz und will-future im Hauptsatz kennzeichnen diesen Typ.',
      sampleSolution: 'Type 1',
    },
    {
      id: 'cc-02',
      prompt: 'Um welchen Typ handelt es sich? "If I had a private jet, I would travel to Hawaii."',
      interactionType: 'choice',
      options: ['Type 1', 'Type 0', 'Type 2', 'Type 3'],
      correctAnswers: ['Type 2'],
      placeholder: 'Wähle den passenden Typ...',
      hint: 'Simple Past (had) und would im Hauptsatz drücken eine hypothetische Vorstellung aus.',
      sampleSolution: 'Type 2',
    },
    {
      id: 'cc-03',
      prompt: 'Ergänze den Typ-1-Hauptsatz: "If you study hard for the test, you ... (pass) it easily."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['will pass', "'ll pass", 'can pass'],
      hint: 'Typ 1 erfordert will + Infinitiv.',
      sampleSolution: 'will pass',
    },
    {
      id: 'cc-04',
      prompt: 'Wandle denselben Satz in Typ 2 um: "If you studied hard for the test, you ... (pass) it easily."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['would pass', "'d pass", 'could pass'],
      hint: 'Typ 2 verlangt would + Infinitiv im Hauptsatz.',
      sampleSolution: 'would pass',
    },
    {
      id: 'cc-05',
      prompt: 'Welcher Satz leidet unter einer unzulässigen Zeitenmischung?',
      interactionType: 'choice',
      options: [
        'If I have time, I will help you. ',
        'If I had time, I would help you.  ',
        'If you ask me, I can help you now.',
        'If I have time, I would help you.',
      ],
      correctAnswers: ['If I have time, I would help you.'],
      placeholder: 'Wähle den fehlerhaften Satz...',
      hint: 'Simple Present im if-Teil darf nicht mit would kombiniert werden.',
      sampleSolution: 'If I have time, I would help you.',
    },
    {
      id: 'cc-06',
      prompt: 'Bringe die Bausteine zu einem korrekten Typ-1-Satz zusammen.',
      interactionType: 'sentence_builder',
      tiles: ['she will join our club', 'if emma has time,', 'next monday'],
      correctAnswers: [
        'If emma has time, she will join our club next monday.',
        'She will join our club next monday if emma has time.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Reale Bedingung mit has im if-Satz und will join im Hauptsatz.',
      sampleSolution: 'If emma has time, she will join our club next monday.',
    },
    {
      id: 'cc-07',
      prompt: 'Ergänze die passende Form für die unwahrscheinliche Hypothese: "If dinosaurs still ... (live), our cities would look different."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['lived'],
      hint: 'Weil im Hauptsatz would steht (Typ 2), muss das Verb im if-Satz im Simple Past stehen.',
      sampleSolution: 'lived',
    },
    {
      id: 'cc-08',
      prompt: 'Welche Form passt grammatikalisch zum if-Satz? "If it rains tomorrow, we ... inside."',
      interactionType: 'choice',
      options: ['will stay  ', 'would stay ', 'stayed     ', 'were staying'],
      correctAnswers: ['will stay  '],
      placeholder: 'Wähle die passende Option...',
      hint: '"rains" steht im Simple Present (Typ 1) -> Folge mit will + Infinitiv.',
      sampleSolution: 'will stay',
    },
    {
      id: 'cc-09',
      prompt: 'Klicke auf das falsche Wort im folgenden Satz.',
      interactionType: 'word_select',
      words: ['If', 'I', 'was', 'a', 'superhero,', 'I', 'will', 'save', 'the', 'world.'],
      correctAnswers: ['will'],
      placeholder: 'Klicke auf das falsche Hilfsverb...',
      hint: 'In einer hypothetischen Superhelden-Situation (Typ 2) gehört would statt dieses Wortes in den Hauptsatz.',
      sampleSolution: 'will',
    },
    {
      id: 'cc-10',
      prompt: 'Ergänze das Verb im if-Satz (Typ 1): "If Clara ... (not / eat) breakfast, she can feel hungry during classes."',
      interactionType: 'input',
      placeholder: 'Verneinte Form eintragen...',
      correctAnswers: ["doesn't eat", 'does not eat'],
      hint: 'Verneine im Simple Present bei 3. Person Singular (Clara = she).',
      sampleSolution: "doesn't eat",
    },
    {
      id: 'cc-11',
      prompt: 'Bringe die Bausteine zu einem korrekten Typ-2-Satz zusammen.',
      interactionType: 'sentence_builder',
      tiles: ['i would adopt five dogs', 'a big house with a garden,', 'if i bought'],
      correctAnswers: [
        'If i bought a big house with a garden, i would adopt five dogs.',
        'I would adopt five dogs if i bought a big house with a garden.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Hypothetischer Satz mit bought und would adopt.',
      sampleSolution: 'If i bought a big house with a garden, i would adopt five dogs.',
    },
    {
      id: 'cc-12',
      prompt: 'Entscheide: Welcher Satz drückt einen freundlichen Ratschlag aus?',
      interactionType: 'choice',
      options: [
        'If you drink water, you will feel fine. ',
        'If I were you, I would drink more water.',
        'You drink water if you are thirsty now. ',
        'If I drink water, I would feel better.  ',
      ],
      correctAnswers: ['If I were you, I would drink more water.'],
      placeholder: 'Wähle den passenden Ratschlag...',
      hint: 'Suche nach der klassischen Formulierung "If I were you...".',
      sampleSolution: 'If I were you, I would drink more water.',
    },
    {
      id: 'cc-13',
      prompt: 'Ergänze den Hauptsatz (Typ 2): "If my cat could speak German, it ... (order) tuna every single day."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['would order', 'could order'],
      hint: 'Nutze would + Infinitiv für diese fantasievolle Vorstellung.',
      sampleSolution: 'would order',
    },
    {
      id: 'cc-14',
      prompt: 'Welche Kombination von Zeitformen gehört verbindlich zu Typ 1?',
      interactionType: 'choice',
      options: [
        'Simple Past im if-Satz und would-Konstruktion hinten  ',
        'Simple Present im if-Satz und would-Konstruktion hinten',
        'Simple Present im if-Satz und will-future im Hauptsatz',
        'Simple Past im if-Satz und will-future im Hauptsatz hier',
      ],
      correctAnswers: ['Simple Present im if-Satz und will-future im Hauptsatz'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Präsens für die Bedingung und Futur für die Konsequenz.',
      sampleSolution: 'Simple Present im if-Satz und will-future im Hauptsatz',
    },
    {
      id: 'cc-15',
      prompt: 'Ergänze das Verb im if-Satz (Typ 2): "If we ... (win) the championship, the coach would invite us for pizza."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['won'],
      hint: 'Simple-Past-Form des unregelmäßigen Verbs win.',
      sampleSolution: 'won',
    },
    {
      id: 'cc-16',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['if you go to bed early,', 'tomorrow morning', 'you will not feel tired'],
      correctAnswers: [
        'If you go to bed early, you will not feel tired tomorrow morning.',
        'You will not feel tired tomorrow morning if you go to bed early.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Reale Ursache-Wirkung-Kette im Typ 1.',
      sampleSolution: 'If you go to bed early, you will not feel tired tomorrow morning.',
    },
    {
      id: 'cc-17',
      prompt: 'Welcher Satz bedeutet: "Ich habe kein Fahrrad, deshalb kann ich nicht mitfahren" als Typ 2 formuliert?',
      interactionType: 'choice',
      options: [
        'If I have a bike, I will ride with you. ',
        'If I ride with you, I will buy a bike.  ',
        'If I would have a bike, I rode with you.',
        'If I had a bike, I would ride with you. ',
      ],
      correctAnswers: ['If I had a bike, I would ride with you. '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Die hypothetische Umkehrung einer realen Einschränkung steht im Typ 2.',
      sampleSolution: 'If I had a bike, I would ride with you.',
    },
    {
      id: 'cc-18',
      prompt: 'Ergänze den verneinten Hauptsatz (Typ 1): "If it stays sunny, we ... (not / need) our jackets today."',
      interactionType: 'input',
      placeholder: 'Verneinte Form eintragen...',
      correctAnswers: ["won't need", 'will not need'],
      hint: 'Verneine mit won\'t + Infinitiv.',
      sampleSolution: "won't need",
    },
    {
      id: 'cc-19',
      prompt: 'Klicke auf das falsche Wort im Satz.',
      interactionType: 'word_select',
      words: ['If', 'she', 'invited', 'me,', 'I', 'will', 'gladly', 'come', 'to', 'her', 'party.'],
      correctAnswers: ['will'],
      placeholder: 'Klicke auf das fehlerhafte Hilfsverb...',
      hint: 'Da im if-Satz "invited" (Simple Past) steht, passt im Hauptsatz nur would.',
      sampleSolution: 'will',
    },
    {
      id: 'cc-20',
      prompt: 'Welche Ergänzung vervollständigt den Satz logisch und grammatikalisch korrekt als Typ 1: "If you drop that glass bowl..."',
      interactionType: 'choice',
      options: [
        'it will break into a hundred pieces.',
        'it would shatter into pieces easily.',
        'it broke into pieces yesterday noon.',
        'a bowl would had cracked last night.',
      ],
      correctAnswers: ['it will break into a hundred pieces.'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Reale physikalische Konsequenz mit will + Infinitiv.',
      sampleSolution: 'it will break into a hundred pieces.',
    },
    {
      id: 'cc-21',
      prompt: 'Ergänze das unregelmäßige Verb im if-Satz (Typ 2): "If I ... (know) how to play the guitar, I would join a rock band."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['knew'],
      hint: 'Simple-Past-Form von know.',
      sampleSolution: 'knew',
    },
    {
      id: 'cc-22',
      prompt: 'Bringe die Bausteine in die korrekte Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['my brother would learn spanish', 'if he moved to madrid,', 'next year'],
      correctAnswers: [
        'If he moved to madrid, my brother would learn spanish next year.',
        'My brother would learn spanish next year if he moved to madrid.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Hypothetische Situation mit would learn und moved.',
      sampleSolution: 'If he moved to madrid, my brother would learn spanish next year.',
    },
    {
      id: 'cc-23',
      prompt: 'Welcher dieser Sätze ist zu 100 Prozent grammatikalisch fehlerfrei?',
      interactionType: 'choice',
      options: [
        'If you would listen carefully, you understand.',
        'If you listen carefully, you will understand. ',
        'You will understand, if you listen carefully. ',
        'If you listen carefully, you would understand. ',
      ],
      correctAnswers: ['If you listen carefully, you will understand. '],
      placeholder: 'Wähle die fehlerfreie Option...',
      hint: 'Achte auf die korrekte Zeitenharmonie und die Kommasetzung.',
      sampleSolution: 'If you listen carefully, you will understand.',
    },
    {
      id: 'cc-24',
      prompt: 'Ergänze das Verb im if-Satz (Typ 1): "If our teacher ... (give) us no homework today, we will play outside."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['gives'],
      hint: '"Our teacher" ist 3. Person Singular (he/she) -> Vergiß nicht das -s!',
      sampleSolution: 'gives',
    },
    {
      id: 'cc-25',
      prompt: 'Zusammenfassung: Was ist der entscheidende Unterschied zwischen Typ 1 und Typ 2?',
      interactionType: 'choice',
      options: [
        'Typ 1 bezieht sich auf die Vergangenheit, Typ 2 auf Zukunft',
        'Typ 1 ist real und machbar, Typ 2 ist hypothetisch gedacht',
        'Typ 1 verlangt immer ein Komma, Typ 2 darf nie ein Komma haben',
        'Typ 1 nutzt immer Hilfsverben, Typ 2 verzichtet auf Hilfsverb',
      ],
      correctAnswers: ['Typ 1 ist real und machbar, Typ 2 ist hypothetisch gedacht'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Erinnere dich an den grundlegenden Bedeutungsunterschied: reale Wahrscheinlichkeit vs. Gedankenexperiment.',
      sampleSolution: 'Typ 1 ist real und machbar, Typ 2 ist hypothetisch gedacht',
    },
  ],
};

const allLernendeTasksDay4: Task[] = [
  fridaTaskConditionalType1Day4,
  fridaTaskConditionalType2Day4,
  fridaTaskConditionalComparisonDay4,
];

export const unit12102026: DailyLearningUnit = {
  id: 'conditionals-12.10.2026',
  date: '12.10.2026',
  title: 'Tages-Lerneinheit: 12.10.2026',
  description:
    'Conditional Sentences Type 1 & Type 2 (Vertiefung & Training): 3 interaktive Themenbereiche zu realen Bedingungen, hypothetischen Situationen und dem direkten Zeitenvergleich mit 75 neuen Übungen.',
  tasks: allLernendeTasksDay4,
};

export { allLernendeTasksDay4 as conditionalsTasksDay4 };
