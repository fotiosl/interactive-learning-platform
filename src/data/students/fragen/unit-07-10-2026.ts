import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// TOPIC 1: FRAGEN (QUESTIONS IN ENGLISH: FORMATION, AUXILIARIES & QUESTION WORDS)
// ============================================================================
const fragenTaskFragen: Task = {
  id: 'fragen-fragen',
  topicSlug: 'fragen',
  date: '07.10.2026',
  title: 'Questions in English: Fragewörter, Hilfsverben & QuASV-Schema',
  subject: 'Englisch',
  topic: 'Fragen',
  dateBadge: '07.10.2026',
  description:
    'Meistere die englische Fragenbildung: Entscheidungsfragen und W-Fragen im Simple Present und Simple Past, Hilfsverben (do/does/did, be, can) sowie das QuASV-Muster.',
  type: 'input',
  readingText: {
    title: 'Grammar Guide: Fragen im Englischen sicher bilden',
    content: `Im Englischen bildet man Fragen nach klaren Grundregeln:

1. Die QuASV-Regel für Fragen mit Fragewort:
   • Qu = Question Word (Who, What, Where, When, Why, How, Which, Whose)
   • A = Auxiliary verb (Hilfsverb: do, does, did, be, can)
   • S = Subject (die handelnde Person oder Sache: you, Emily, they)
   • V = Verb (das Vollverb im reinen Infinitiv: play, live, go)
   Beispiel: Where (Qu) + does (A) + your brother (S) + live (V)?

2. Entscheidungsfragen (Ja/Nein-Fragen):
   Hier entfällt das Fragewort, die Frage beginnt direkt mit dem Hilfsverb:
   • Simple Present: „Do you like music?“ / „Does he play tennis?“ (he/she/it: das -s wandert zu does!)
   • Simple Past: „Did you see the film yesterday?“ ('did' zeigt die Vergangenheit, das Vollverb bleibt im Infinitiv!)

3. Fragen mit 'be' (am/is/are/was/were) und Modalverben ('can'):
   Diese Verben brauchen kein zusätzliches 'do/does/did' – Subjekt und Verb tauschen einfach die Plätze:
   • „Are your friends at home?“ / „Were you happy yesterday?“ / „Can you swim?“

4. Subjektfragen vs. Objektfragen:
   • Fragt 'Who' oder 'What' nach dem Subjekt (wer die Handlung ausführt), gibt es KEIN do/does/did:
     „Who called you?“ (Wer rief dich an?)
   • Fragt 'Who' nach dem Objekt (wen man trifft/anruft), braucht man das Hilfsverb:
     „Who did you call?“ (Wen hast du angerufen?)`,
    source: 'Englisch Grammatik-Training • 2. Lernjahr',
  },
  checklistItems: [
    { id: 'q-chk-1', text: 'Ich kenne die QuASV-Regel (Question word + Auxiliary + Subject + Verb).', category: 'Fragenbildung' },
    { id: 'q-chk-2', text: 'Ich weiß, wann im Simple Present „do“ und wann „does“ (he/she/it) verwendet wird.', category: 'Simple Present' },
    { id: 'q-chk-3', text: 'Ich verwende im Simple Past „did“ und lasse das Hauptverb im Infinitiv.', category: 'Simple Past' },
    { id: 'q-chk-4', text: 'Ich kann Fragewörter (Who, Where, When, Why, How, Whose, Which) passend einsetzen.', category: 'Fragewörter' },
  ],
  teacherNotes:
    'Sekundarstufe I (Klasse 6, Englisch): Gezieltes Training der Fragebildung. Schwerpunkte: do/does/did-Unterscheidung, Infinitiv nach did, Fragewörter und QuASV-Wortstellung.',
  inputQuestions: [
    // 1. Choice: Does + Infinitiv
    {
      id: 'q-01',
      prompt: 'Welche Frage im Simple Present ist grammatikalisch korrekt formuliert?',
      context: 'Achte auf das Hilfsverb für die 3. Person Singular (your brother = he) und die Form des Hauptverbs.',
      interactionType: 'choice',
      options: [
        'Does your brother like pizza?',
        'Does your brother likes pizza?',
        'Do your brother like pizza?',
        'Is your brother like pizza?',
      ],
      correctAnswers: ['Does your brother like pizza?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Bei he/she/it wandert das -s zum Hilfsverb does. Das Vollverb bleibt im reinen Infinitiv.',
      sampleSolution: 'Does your brother like pizza? (Nach does steht der Infinitiv like ohne zusätzliches -s).',
    },
    // 2. Input: Who
    {
      id: 'q-02',
      prompt: 'Setze das passende Fragewort ein: „___ is your English teacher?“ – „Mrs Higgins.“',
      interactionType: 'input',
      placeholder: 'Fragewort eingeben...',
      correctAnswers: ['Who', 'who'],
      hint: 'Gesucht wird das Fragewort, mit dem man nach einer Person fragt.',
      sampleSolution: 'Who',
    },
    // 3. Choice: Did + Infinitiv
    {
      id: 'q-03',
      prompt: 'Welche Frage im Simple Past (Vergangenheit) ist grammatikalisch richtig?',
      context: 'Überlege, was mit dem Hauptverb passiert, wenn das Hilfsverb did bereits die Zeitform anzeigt.',
      interactionType: 'choice',
      options: [
        'Did you saw the new film yesterday?',
        'Did you see the new film yesterday?',
        'Do you saw the new film yesterday?',
        'Were you see the new film yesterday?',
      ],
      correctAnswers: ['Did you see the new film yesterday?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Das Hilfsverb did zeigt bereits die Vergangenheit an. Das Vollverb muss daher im Infinitiv stehen.',
      sampleSolution: 'Did you see the new film yesterday?',
    },
    // 4. Input: Do
    {
      id: 'q-04',
      prompt: 'Vervollständige die Frage mit dem passenden Hilfsverb im Simple Present: „___ they play football in the afternoon?“',
      interactionType: 'input',
      placeholder: 'Hilfsverb eingeben...',
      correctAnswers: ['Do', 'do'],
      hint: 'Bei they (3. Person Plural) verwendet man im Simple Present do, nicht does.',
      sampleSolution: 'Do',
    },
    // 5. Choice: QuASV rule
    {
      id: 'q-05',
      prompt: 'Nach welcher Formel werden englische Fragen mit Fragewort gebildet (QuASV-Regel)?',
      interactionType: 'choice',
      options: [
        'Question word + Auxiliary + Subject + Verb',
        'Question word + Verb + Subject + Auxiliary',
        'Subject + Auxiliary + Question word + Verb',
        'Auxiliary + Question word + Subject + Verb',
      ],
      correctAnswers: ['Question word + Auxiliary + Subject + Verb'],
      placeholder: 'Wähle die passende Option...',
      hint: 'QuASV steht für Question word, Auxiliary verb, Subject, Verb.',
      sampleSolution: 'Question word + Auxiliary + Subject + Verb',
    },
    // 6. Input: How
    {
      id: 'q-06',
      prompt: 'Setze das passende Fragewort ein: „___ do you get to school?“ – „By bus.“',
      interactionType: 'input',
      placeholder: 'Fragewort eingeben...',
      correctAnswers: ['How', 'how'],
      hint: 'Gesucht wird das Fragewort nach der Art und Weise (Wie?).',
      sampleSolution: 'How',
    },
    // 7. Choice: Where does Emily go
    {
      id: 'q-07',
      prompt: 'Welche Frage nach dem Schulort im Simple Present ist grammatikalisch korrekt?',
      interactionType: 'choice',
      options: [
        'Where Emily does go to school?',
        'Where do Emily goes to school?',
        'Where does Emily go to school?',
        'Where is Emily go to school?',
      ],
      correctAnswers: ['Where does Emily go to school?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Wende die QuASV-Regel an: Fragewort (Where) + Hilfsverb (does) + Subjekt (Emily) + Infinitiv (go).',
      sampleSolution: 'Where does Emily go to school?',
    },
    // 8. Input: What
    {
      id: 'q-08',
      prompt: 'Vervollständige die Frage mit dem passenden Fragewort: „___ time does the concert start?“ – „At seven o\'clock.“',
      interactionType: 'input',
      placeholder: 'Fragewort eingeben...',
      correctAnswers: ['What', 'what'],
      hint: 'Überlege, welches englische Fragewort zusammen mit "time" nach der Uhrzeit fragt.',
      sampleSolution: 'What',
    },
    // 9. Choice: Were your friends
    {
      id: 'q-09',
      prompt: 'Welche Frage mit dem Hilfsverb „be“ (sein) im Simple Past ist richtig?',
      interactionType: 'choice',
      options: [
        'Was your friends at home last night?',
        'Did your friends be at home last night?',
        'Are your friends at home last night?',
        'Were your friends at home last night?',
      ],
      correctAnswers: ['Were your friends at home last night?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Achte darauf, dass das Subjekt "your friends" in der 3. Person Plural steht.',
      sampleSolution: 'Were your friends at home last night?',
    },
    // 10. Input: Why
    {
      id: 'q-10',
      prompt: 'Setze das passende Fragewort ein: „___ are you crying?“ – „Because I lost my keys.“',
      interactionType: 'input',
      placeholder: 'Fragewort eingeben...',
      correctAnswers: ['Why', 'why'],
      hint: 'Wenn die Antwort mit Because (weil) begründet wird, fragt man nach dem Grund (Warum?).',
      sampleSolution: 'Why',
    },
    // 11. Choice: Whose vs Who's
    {
      id: 'q-11',
      prompt: 'Welche Frage erkundigt sich korrekt nach dem Besitzer der Schultasche (Wessen Schultasche)?',
      interactionType: 'choice',
      options: [
        'Who’s schoolbag is on the desk?',
        'Whose schoolbag is on the desk?',
        'Which schoolbag is on the desk?',
        'Where schoolbag is on the desk?',
      ],
      correctAnswers: ['Whose schoolbag is on the desk?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Who\'s bedeutet Who is (Wer ist). Das Besitz-Fragewort Wessen heißt Whose.',
      sampleSolution: 'Whose schoolbag is on the desk?',
    },
    // 12. Input: Does
    {
      id: 'q-12',
      prompt: 'Vervollständige die Frage mit dem passenden Hilfsverb im Simple Present: „___ your sister have a pet?“',
      interactionType: 'input',
      placeholder: 'Hilfsverb eingeben...',
      correctAnswers: ['Does', 'does'],
      hint: 'Beachte die He/She/It-Regel im Simple Present für die 3. Person Singular.',
      sampleSolution: 'Does',
    },
    // 13. Choice: Subject question without did
    {
      id: 'q-13',
      prompt: 'Welche Frage ist eine Subjektfrage (nach dem Handelnden) und benötigt DAHER KEIN Hilfsverb „did“?',
      context: 'Wenn das Fragewort Who selbst das Subjekt des Satzes ist, steht das Verb direkt in der Vergangenheitsform.',
      interactionType: 'choice',
      options: [
        'Who did call you yesterday afternoon?',
        'Who did you call yesterday afternoon?',
        'Who called you yesterday afternoon?',
        'Who was call you yesterday afternoon?',
      ],
      correctAnswers: ['Who called you yesterday afternoon?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Bei Subjektfragen mit Who steht das Vollverb direkt im Simple Past ohne did.',
      sampleSolution: 'Who called you yesterday afternoon? (Who ist hier das Subjekt: Wer hat angerufen?).',
    },
    // 14. Input: When
    {
      id: 'q-14',
      prompt: 'Setze das passende Fragewort ein: „___ did you go to bed yesterday?“ – „At ten o\'clock.“',
      interactionType: 'input',
      placeholder: 'Fragewort eingeben...',
      correctAnswers: ['When', 'when'],
      hint: 'Gesucht wird das Fragewort nach dem zeitlichen Zeitpunkt (Wann?).',
      sampleSolution: 'When',
    },
    // 15. Choice: Can question
    {
      id: 'q-15',
      prompt: 'Welche Frage mit dem Modalverb „can“ (können) ist grammatikalisch korrekt?',
      interactionType: 'choice',
      options: [
        'Can you play the electric guitar?',
        'Do you can play the electric guitar?',
        'Can you plays the electric guitar?',
        'Are you can play the electric guitar?',
      ],
      correctAnswers: ['Can you play the electric guitar?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Can bildet Fragen durch einfaches Voranstellen ohne do oder does.',
      sampleSolution: 'Can you play the electric guitar?',
    },
    // 16. Input: Did
    {
      id: 'q-16',
      prompt: 'Setze das passende Hilfsverb der Vergangenheit ein: „___ you find your lost jacket yesterday?“',
      interactionType: 'input',
      placeholder: 'Hilfsverb eingeben...',
      correctAnswers: ['Did', 'did'],
      hint: 'Das Signalwort yesterday erfordert das Hilfsverb der einfachen Vergangenheit (Simple Past).',
      sampleSolution: 'Did',
    },
    // 17. Choice: Preposition at end
    {
      id: 'q-17',
      prompt: 'Welche Frage mit einer Präposition am Satzende ist im Englischen typisch und korrekt?',
      interactionType: 'choice',
      options: [
        'To what are you listening?',
        'What do you listen to it?',
        'What are you listen for?',
        'What are you listening to?',
      ],
      correctAnswers: ['What are you listening to?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Im Alltagsenglisch wandert die Präposition (hier: to) ganz ans Ende der Frage.',
      sampleSolution: 'What are you listening to?',
    },
    // 18. Input: Which
    {
      id: 'q-18',
      prompt: 'Setze das passende Fragewort für eine Auswahl ein: „___ T-shirt do you prefer, the blue one or the red one?“',
      interactionType: 'input',
      placeholder: 'Fragewort eingeben...',
      correctAnswers: ['Which', 'which'],
      hint: 'Überlege, welches englische Fragewort gezielt bei einer begrenzten Auswahl verwendet wird.',
      sampleSolution: 'Which',
    },
    // 19. Choice: Have you got
    {
      id: 'q-19',
      prompt: 'Welche Frage mit dem Hilfsverb „have got“ (besitzen/haben) ist richtig formuliert?',
      interactionType: 'choice',
      options: [
        'Do you have got brothers or sisters?',
        'Have you got any brothers or sisters?',
        'Have you get any brothers or sisters?',
        'Has you got any brothers or sisters?',
      ],
      correctAnswers: ['Have you got any brothers or sisters?'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Have got bildet Fragen durch Inversion: Have + Subjekt + got.',
      sampleSolution: 'Have you got any brothers or sisters?',
    },
    // 20. Input: many
    {
      id: 'q-20',
      prompt: 'Setze das Wort für die Anzahl zählbarer Dinge ein: „How ___ books did you read during the holidays?“',
      interactionType: 'input',
      placeholder: 'Wort eingeben...',
      correctAnswers: ['many', 'Many'],
      hint: 'Überlege, welches Wort bei zählbaren Nomen im Plural für die Frage nach der Anzahl verwendet wird.',
      sampleSolution: 'many',
    },
  ],
};

// ============================================================================
// TOPIC 2: READ THE SENTENCES AND PUT THE WORDS IN THE RIGHT ORDER (SENTENCE BUILDER)
// ============================================================================
const fragenTaskWordOrder: Task = {
  id: 'fragen-word-order',
  topicSlug: 'word-order',
  date: '07.10.2026',
  title: 'Word Order: Read the Sentences and Put the Words in the Right Order',
  subject: 'Englisch',
  topic: 'Sentence Builder & Word Order',
  dateBadge: '07.10.2026',
  description:
    'Trainiere den englischen Satzbau interaktiv: Subjekt – Verb – Objekt (SPO-Regel), Häufigkeitsadverbien (always, usually, often, never) sowie Ort vor Zeit (Place before Time).',
  type: 'input',
  readingText: {
    title: 'Grammar Guide: Englischer Satzbau (Word Order)',
    content: `Die wichtigsten Regeln für die Wortstellung im englischen Aussagesatz:

1. Die Grundregel SPO:
   • S = Subject (Wer handelt?)
   • P / V = Predicate / Verb (Was geschieht?)
   • O = Object (Mit wem oder was?)
   Im Englischen darf man Subjekt und Objekt im Aussagesatz nicht vertauschen!

2. Häufigkeitsadverbien (Adverbs of Frequency: always, usually, often, sometimes, never):
   • Sie stehen VOR dem normalen Vollverb:
     „Sarah often reads books.“
   • Aber sie stehen NACH dem Hilfsverb 'be' (am, is, are, was, were):
     „Tom is always late.“

3. Ort vor Zeit (Place before Time):
   Stehen Ort und Zeitangabe am Satzende, gilt immer: zuerst der Ort, dann die Zeit!
   • „We play football in the park (Ort) on Saturdays (Zeit).“

4. Zeitangaben an den Satzanfang:
   Man kann eine Zeitangabe zur Betonung an den Satzanfang stellen:
   • „On Saturdays, we play football in the park.“`,
    source: 'Englisch Grammatik-Training • 2. Lernjahr',
  },
  checklistItems: [
    { id: 'wo-chk-1', text: 'Ich beachte die feste SPO-Reihenfolge (Subject – Verb – Object).', category: 'Satzbau' },
    { id: 'wo-chk-2', text: 'Ich platziere Häufigkeitsadverbien vor Vollverben und nach Formen von „be“.', category: 'Adverbien' },
    { id: 'wo-chk-3', text: 'Ich wende die Regel „Ort vor Zeit“ (Place before Time) an.', category: 'Orts- & Zeitangaben' },
    { id: 'wo-chk-4', text: 'Ich kann Zeitangaben flexibel an den Satzanfang oder das Satzende setzen.', category: 'Satzanfänge' },
  ],
  teacherNotes:
    'Sekundarstufe I (Klasse 6, Englisch): 20 interaktive Sentence-Builder-Aufgaben zur Festigung der Wortstellung (SVO, Place before Time, Häufigkeitsadverbien, Verneinungen und Fragesätze).',
  inputQuestions: [
    // 1. Sarah reads books in the library
    {
      id: 'sb-01',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Häufigkeitsadverb vor dem Vollverb + Ort am Ende.',
      interactionType: 'sentence_builder',
      tiles: ['interesting books', 'sarah', 'in the library', 'often reads'],
      correctAnswers: [
        'sarah often reads interesting books in the library',
        'in the library sarah often reads interesting books',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt zuerst, dann das Häufigkeitsadverb often mit dem Verb reads, danach das Objekt und der Ort.',
      sampleSolution: 'sarah often reads interesting books in the library',
    },
    // 2. We usually play football in the park on saturdays
    {
      id: 'sb-02',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Beachte die Regel: Ort vor Zeit (in the park vor on saturdays).',
      interactionType: 'sentence_builder',
      tiles: ['on saturdays', 'we usually play', 'in the park', 'football'],
      correctAnswers: [
        'we usually play football in the park on saturdays',
        'on saturdays we usually play football in the park',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Place before Time: Der Ort (in the park) steht vor der Zeitangabe (on saturdays).',
      sampleSolution: 'we usually play football in the park on saturdays',
    },
    // 3. My brother never eats vegetables for dinner
    {
      id: 'sb-03',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Häufigkeitsadverb never vor dem Vollverb eats.',
      interactionType: 'sentence_builder',
      tiles: ['vegetables', 'never eats', 'for dinner', 'my brother'],
      correctAnswers: [
        'my brother never eats vegetables for dinner',
        'for dinner my brother never eats vegetables',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit dem Subjekt my brother. Danach folgt never eats.',
      sampleSolution: 'my brother never eats vegetables for dinner',
    },
    // 4. The students did their homework quietly yesterday
    {
      id: 'sb-04',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Art und Weise (quietly) vor der Zeitangabe (yesterday).',
      interactionType: 'sentence_builder',
      tiles: ['quietly', 'yesterday', 'did their homework', 'the students'],
      correctAnswers: [
        'the students did their homework quietly yesterday',
        'yesterday the students did their homework quietly',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt the students, dann Verb und Objekt did their homework, danach wie (quietly) und wann (yesterday).',
      sampleSolution: 'the students did their homework quietly yesterday',
    },
    // 5. Tom is always late for his english lesson
    {
      id: 'sb-05',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Häufigkeitsadverb always NACH der Verbform is.',
      interactionType: 'sentence_builder',
      tiles: ['for his english lesson', 'tom', 'late', 'is always'],
      correctAnswers: [
        'tom is always late for his english lesson',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Nach einer Form von be steht always dahinter: tom is always late...',
      sampleSolution: 'tom is always late for his english lesson',
    },
    // 6. Why did you arrive at the bus stop so late
    {
      id: 'sb-06',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'QuASV-Reihenfolge bei einer Frage in der Vergangenheit.',
      interactionType: 'sentence_builder',
      tiles: ['at the bus stop', 'did you arrive', 'why', 'so late'],
      correctAnswers: [
        'why did you arrive at the bus stop so late',
        'why did you arrive so late at the bus stop',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Fragewort why zuerst, gefolgt von did you arrive.',
      sampleSolution: 'why did you arrive at the bus stop so late',
    },
    // 7. They visited their grandparents in london last summer
    {
      id: 'sb-07',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Ort vor Zeit: in london vor last summer.',
      interactionType: 'sentence_builder',
      tiles: ['in london', 'visited their grandparents', 'they', 'last summer'],
      correctAnswers: [
        'they visited their grandparents in london last summer',
        'last summer they visited their grandparents in london',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt they + Prädikat mit Objekt + Ort (in london) + Zeit (last summer).',
      sampleSolution: 'they visited their grandparents in london last summer',
    },
    // 8. Can you help me with my project this afternoon
    {
      id: 'sb-08',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Entscheidungsfrage mit dem Modalverb can.',
      interactionType: 'sentence_builder',
      tiles: ['this afternoon', 'can you help me', 'with my project'],
      correctAnswers: [
        'can you help me with my project this afternoon',
        'this afternoon can you help me with my project',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit can you help me, dann worbei (with my project) und wann (this afternoon).',
      sampleSolution: 'can you help me with my project this afternoon',
    },
    // 9. Our dog sometimes barks at the mailman in the morning
    {
      id: 'sb-09',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Häufigkeitsadverb sometimes vor dem Vollverb barks.',
      interactionType: 'sentence_builder',
      tiles: ['in the morning', 'at the mailman', 'our dog', 'sometimes barks'],
      correctAnswers: [
        'our dog sometimes barks at the mailman in the morning',
        'in the morning our dog sometimes barks at the mailman',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt our dog + Adverb und Verb sometimes barks + Objekt + Zeitangabe.',
      sampleSolution: 'our dog sometimes barks at the mailman in the morning',
    },
    // 10. Where does your sister buy her cool clothes
    {
      id: 'sb-10',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'QuASV-Schema: Fragewort + does + Subjekt + Verb + Objekt.',
      interactionType: 'sentence_builder',
      tiles: ['her cool clothes', 'where', 'your sister buy', 'does'],
      correctAnswers: [
        'where does your sister buy her cool clothes',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Where steht am Anfang, dann das Hilfsverb does, danach Subjekt mit Infinitiv und Objekt.',
      sampleSolution: 'where does your sister buy her cool clothes',
    },
    // 11. We did not watch television after school yesterday
    {
      id: 'sb-11',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Verneinung im Simple Past mit did not.',
      interactionType: 'sentence_builder',
      tiles: ['after school', 'yesterday', 'did not watch television', 'we'],
      correctAnswers: [
        'we did not watch television after school yesterday',
        'yesterday we did not watch television after school',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt we + verneintes Prädikat did not watch television + Zeitangaben.',
      sampleSolution: 'we did not watch television after school yesterday',
    },
    // 12. Lucy and ben are playing table tennis in the garden now
    {
      id: 'sb-12',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Ort vor Zeit: in the garden vor now.',
      interactionType: 'sentence_builder',
      tiles: ['in the garden', 'now', 'lucy and ben', 'are playing table tennis'],
      correctAnswers: [
        'lucy and ben are playing table tennis in the garden now',
        'now lucy and ben are playing table tennis in the garden',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt lucy and ben + Verbform are playing table tennis + Ort + Zeit.',
      sampleSolution: 'lucy and ben are playing table tennis in the garden now',
    },
    // 13. How often do you clean your bedroom at the weekend
    {
      id: 'sb-13',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Frage nach der Häufigkeit mit how often.',
      interactionType: 'sentence_builder',
      tiles: ['your bedroom', 'how often', 'do you clean', 'at the weekend'],
      correctAnswers: [
        'how often do you clean your bedroom at the weekend',
        'at the weekend how often do you clean your bedroom',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Fragewort how often + Hilfsverb mit Subjekt und Verb do you clean + Objekt + Zeitangabe.',
      sampleSolution: 'how often do you clean your bedroom at the weekend',
    },
    // 14. My parents bought a new car two weeks ago
    {
      id: 'sb-14',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'SPO-Grundregel: Subjekt + Verb + Objekt + Zeitangabe.',
      interactionType: 'sentence_builder',
      tiles: ['a new car', 'my parents bought', 'two weeks ago'],
      correctAnswers: [
        'my parents bought a new car two weeks ago',
        'two weeks ago my parents bought a new car',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt und Prädikat my parents bought + Objekt a new car + Zeit two weeks ago.',
      sampleSolution: 'my parents bought a new car two weeks ago',
    },
    // 15. Emma is never tired before nine o'clock
    {
      id: 'sb-15',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Das Adverb never steht direkt hinter der Form is.',
      interactionType: 'sentence_builder',
      tiles: ['before nine o\'clock', 'tired', 'is never', 'emma'],
      correctAnswers: [
        'emma is never tired before nine o\'clock',
        'before nine o\'clock emma is never tired',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Emma + is never + Eigenschaft tired + Zeitangabe.',
      sampleSolution: 'emma is never tired before nine o\'clock',
    },
    // 16. What did you eat for breakfast this morning
    {
      id: 'sb-16',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Frage im Simple Past nach der QuASV-Regel.',
      interactionType: 'sentence_builder',
      tiles: ['this morning', 'what did you eat', 'for breakfast'],
      correctAnswers: [
        'what did you eat for breakfast this morning',
        'this morning what did you eat for breakfast',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'What did you eat steht am Satzanfang.',
      sampleSolution: 'what did you eat for breakfast this morning',
    },
    // 17. The children happily sang a song at the party
    {
      id: 'sb-17',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Adverb der Art und Weise (happily) im Prädikat + Ortsangabe am Ende.',
      interactionType: 'sentence_builder',
      tiles: ['at the party', 'happily sang a song', 'the children'],
      correctAnswers: [
        'the children happily sang a song at the party',
        'at the party the children happily sang a song',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt the children + Prädikat happily sang a song + Ort at the party.',
      sampleSolution: 'the children happily sang a song at the party',
    },
    // 18. I do not understand this difficult exercise at all
    {
      id: 'sb-18',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Verneinter Aussagesatz im Simple Present.',
      interactionType: 'sentence_builder',
      tiles: ['at all', 'this difficult exercise', 'i do not understand'],
      correctAnswers: [
        'i do not understand this difficult exercise at all',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt und verneintes Verb i do not understand + Objekt + verstärkender Zusatz at all.',
      sampleSolution: 'i do not understand this difficult exercise at all',
    },
    // 19. Who told you the exciting secret during the break
    {
      id: 'sb-19',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Subjektfrage mit who ohne Hilfsverb.',
      interactionType: 'sentence_builder',
      tiles: ['during the break', 'the exciting secret', 'who told you'],
      correctAnswers: [
        'who told you the exciting secret during the break',
        'during the break who told you the exciting secret',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit who told you, dann das Objekt the exciting secret und die Zeit during the break.',
      sampleSolution: 'who told you the exciting secret during the break',
    },
    // 20. We will meet our friends at the cinema tomorrow evening
    {
      id: 'sb-20',
      prompt: 'Bringe die Satzbausteine in die richtige englische Reihenfolge:',
      context: 'Zukunft mit will + Ort vor Zeit (at the cinema vor tomorrow evening).',
      interactionType: 'sentence_builder',
      tiles: ['at the cinema', 'we will meet our friends', 'tomorrow evening'],
      correctAnswers: [
        'we will meet our friends at the cinema tomorrow evening',
        'tomorrow evening we will meet our friends at the cinema',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Subjekt und Prädikat we will meet our friends + Ort (at the cinema) + Zeit (tomorrow evening).',
      sampleSolution: 'we will meet our friends at the cinema tomorrow evening',
    },
  ],
};

// ============================================================================
// EXPORT DAILY UNIT & TASKS
// ============================================================================
export const fragenTasks: Task[] = [fragenTaskFragen, fragenTaskWordOrder];

export const unit07102026: DailyLearningUnit = {
  id: 'fragen-07-10-2026',
  date: '07.10.2026',
  title: 'Englisch-Intensivtraining: Fragen & Word Order',
  description:
    '40 interaktive Übungen zu den zwei Kernbereichen: Fragenbildung (Fragewörter, Hilfsverben do/does/did, be, can) und englischer Satzbau (Sentence Builder, SPO, Häufigkeitsadverbien, Ort vor Zeit).',
  tasks: fragenTasks,
};
