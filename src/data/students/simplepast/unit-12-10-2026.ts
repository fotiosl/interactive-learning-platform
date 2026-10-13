import { Task, DailyLearningUnit } from '@/types/student';

// ============================================================================
// TASK 1: SIMPLE PAST (REGULAR & IRREGULAR VERBS, NEGATION, QUESTIONS)
// ============================================================================
const simplePastTaskSimplePast: Task = {
  id: 'pauln-simple-past',
  topicSlug: 'simple-past',
  date: '12.10.2026',
  title: 'Simple Past: Regelmäßige & unregelmäßige Verben, Verneinung und Fragen',
  subject: 'Englisch',
  topic: 'Simple Past',
  dateBadge: '12.10.2026 • Simple Past',
  description:
    'Wiederhole und vertiefe das Simple Past für deine Klassenarbeit: Bildung regelmäßiger Verben mit -ed, die wichtigsten unregelmäßigen Verben, Formen von be (was/were), Verneinungen mit didn’t sowie Fragen mit did.',
  type: 'input',
  readingText: {
    title: 'Wissensbox: Das Simple Past im Überblick',
    content: `DAS SIMPLE PAST: REGELN & STRUKTUREN

1. VERWENDUNG & SIGNALWÖRTER:
Das Simple Past beschreibt Handlungen und Ereignisse, die in der Vergangenheit begonnen haben und abgeschlossen sind.
Wichtige Signalwörter: yesterday, last week / last month, two days ago, in 2021, when I was ten.

2. POSITIVE AUSSAGEN:
• Regelmäßige Verben: Infinitiv + -ed
  – play -> played, watch -> watched
  – Endet das Verb auf -e, kommt nur -d hinzu: live -> lived, arrive -> arrived
  – Endet ein Verb nach kurzem betonten Vokal auf einen Konsonanten, wird dieser verdoppelt: stop -> stopped, clap -> clapped
  – Endet ein Verb auf Konsonant + y, wird das y zu ied: study -> studied, carry -> carried (aber: play -> played)
• Unregelmäßige Verben (2. Spalte der Verbtabelle):
  – go -> went, see -> saw, have -> had, buy -> bought, eat -> ate, write -> wrote
• Das Verb "be":
  – I / he / she / it -> was
  – we / you / they -> were

3. VERNEINUNG:
• Im Simple Past verneint man mit "did not" (Kurzform: "didn't") + Infinitiv (Grundform):
  – He didn't play tennis yesterday. (NIEMALS: He didn't played!)
  – They didn't go to school on Sunday.
• Ausnahme "be": was not (wasn't) / were not (weren't) – ganz ohne "did"!

4. FRAGEN & KURZANTWORTEN:
• Entscheidungsfragen: Did + Subjekt + Infinitiv?
  – "Did you see the match?" -> "Yes, I did." / "No, I didn't."
• W-Fragen: Fragewort + did + Subjekt + Infinitiv?
  – "Where did you go yesterday?" – "Why did he call you?"`,
    source: 'English Grammar • 6. Schuljahr',
  },
  checklistItems: [
    {
      id: 'chk-sp-1',
      text: 'Ich kenne die Signalwörter des Simple Past (yesterday, last ..., ... ago).',
      category: 'Signalwörter',
    },
    {
      id: 'chk-sp-2',
      text: 'Ich kann regelmäßige Verben auf -ed korrekt bilden und kenne die Rechtschreibregeln (stop -> stopped, carry -> carried).',
      category: 'Regelmäßige Verben',
    },
    {
      id: 'chk-sp-3',
      text: 'Ich beherrsche wichtige unregelmäßige Verben (went, saw, ate, had, made, came).',
      category: 'Unregelmäßige Verben',
    },
    {
      id: 'chk-sp-4',
      text: 'Ich verwende was für I/he/she/it und were für we/you/they.',
      category: 'Verb be',
    },
    {
      id: 'chk-sp-5',
      text: 'Ich verneine mit didn’t + Infinitiv und stelle Fragen mit Did + Subjekt + Infinitiv.',
      category: 'Verneinung & Fragen',
    },
  ],
  inputQuestions: [
    {
      id: 'sp-sp-01',
      prompt: 'Welche Endung erhalten regelmäßige Verben im Simple Past?',
      interactionType: 'choice',
      options: ['-ing', '-est', '-ed ', '-ies'],
      correctAnswers: ['-ed '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Denke an die Standardendung der Vergangenheit bei regelmäßigen englischen Verben.',
      sampleSolution: '-ed',
    },
    {
      id: 'sp-sp-02',
      prompt: 'Ergänze das regelmäßige Verb im Simple Past: "Yesterday, Sarah ... (play) tennis with her brother."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['played'],
      hint: 'Hänge an den unveränderten Infinitiv die regelmäßige Vergangenheitsendung an.',
      sampleSolution: 'played',
    },
    {
      id: 'sp-sp-03',
      prompt: 'Welche Form von "be" passt in die Lücke? "Ben and Emma ... at the cinema last Saturday."',
      interactionType: 'choice',
      options: ['was ', 'were', 'are ', 'been'],
      correctAnswers: ['were'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Ben and Emma bilden die Mehrzahl (they). Welche Vergangenheitsform gehört zu they?',
      sampleSolution: 'were',
    },
    {
      id: 'sp-sp-04',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für eine Aussage im Simple Past.',
      interactionType: 'sentence_builder',
      tiles: ['yesterday', 'visited', 'their grandparents', 'the children'],
      correctAnswers: [
        'The children visited their grandparents yesterday.',
        'Yesterday the children visited their grandparents.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit dem Subjekt und setze das Prädikat direkt danach.',
      sampleSolution: 'The children visited their grandparents yesterday.',
    },
    {
      id: 'sp-sp-05',
      prompt: 'Wie lautet die unregelmäßige Simple-Past-Form des Verbs "go"?',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['went'],
      hint: 'Dieses Verb ist unregelmäßig und verändert im Simple Past seine gesamte Lautgestalt.',
      sampleSolution: 'went',
    },
    {
      id: 'sp-sp-06',
      prompt: 'Welcher Satz ist grammatikalisch vollkommen korrekt formuliert?',
      interactionType: 'choice',
      options: [
        'He did not played soccer.',
        'He not did play soccer.  ',
        'He played not soccer yet.',
        'He did not play soccer.  ',
      ],
      correctAnswers: ['He did not play soccer.  '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Nach dem Hilfsverb "did not" muss das Vollverb immer im reinen Infinitiv stehen.',
      sampleSolution: 'He did not play soccer.',
    },
    {
      id: 'sp-sp-07',
      prompt: 'Ergänze die passende Vergangenheitsform von "see": "Last night, I ... (see) a shooting star."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['saw'],
      hint: 'Unregelmäßiges Verb mit drei Buchstaben, das mit s beginnt und mit w endet.',
      sampleSolution: 'saw',
    },
    {
      id: 'sp-sp-08',
      prompt: 'Klicke auf das unregelmäßige Verb im folgenden Satz.',
      interactionType: 'word_select',
      words: ['Liam', 'bought', 'a', 'new', 'skateboard', 'last', 'Friday.'],
      correctAnswers: ['bought'],
      placeholder: 'Klicke auf das gesuchte Wort...',
      hint: 'Suche nach dem Prädikat, das von "buy" abgeleitet ist.',
      sampleSolution: 'bought',
    },
    {
      id: 'sp-sp-09',
      prompt: 'Wie lautet die korrekte Rechtschreibung von "stop" im Simple Past?',
      interactionType: 'choice',
      options: ['stoped ', 'stoppt ', 'stopped', 'stopied'],
      correctAnswers: ['stopped'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Nach einem kurzen, betonten Vokal wird der Endkonsonant vor der Endung verdoppelt.',
      sampleSolution: 'stopped',
    },
    {
      id: 'sp-sp-10',
      prompt: 'Ergänze die verneinte Form im Simple Past: "We ... (not / eat) pizza for lunch yesterday."',
      interactionType: 'input',
      placeholder: 'Verneinte Form eintragen...',
      correctAnswers: ["didn't eat", 'did not eat'],
      hint: 'Nutze das verneinte Hilfsverb "didn\'t" zusammen mit der Grundform des Verbs.',
      sampleSolution: "didn't eat",
    },
    {
      id: 'sp-sp-11',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für eine Frage im Simple Past.',
      interactionType: 'sentence_builder',
      tiles: ['your homework', 'finish', 'did you', 'in time'],
      correctAnswers: [
        'Did you finish your homework in time?',
        'In time did you finish your homework?',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Entscheidungsfragen im Simple Past beginnen mit dem Hilfsverb "did".',
      sampleSolution: 'Did you finish your homework in time?',
    },
    {
      id: 'sp-sp-12',
      prompt: 'Welche Kurzantwort passt auf die Frage: "Did you enjoy the concert yesterday?"',
      interactionType: 'choice',
      options: [
        'Yes, I had.  ',
        'Yes, I was.  ',
        'Yes, I do.   ',
        'Yes, I did.  ',
      ],
      correctAnswers: ['Yes, I did.  '],
      placeholder: 'Wähle die passende Option...',
      hint: 'In der Kurzantwort wird das Hilfsverb aus der Frage ("did") wiederholt.',
      sampleSolution: 'Yes, I did.',
    },
    {
      id: 'sp-sp-13',
      prompt: 'Ergänze die richtige Form von "be": "I ... (be) very tired after the long journey."',
      interactionType: 'input',
      placeholder: 'Form von be eintragen...',
      correctAnswers: ['was'],
      hint: 'Welche Vergangenheitsform von be gehört zur 1. Person Singular (I)?',
      sampleSolution: 'was',
    },
    {
      id: 'sp-sp-14',
      prompt: 'Welches Signalwort zeigt typischerweise die Verwendung des Simple Past an?',
      interactionType: 'choice',
      options: [
        'tomorrow ',
        'right now',
        'at moment',
        'yesterday',
      ],
      correctAnswers: ['yesterday'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Suche nach dem Zeitausdruck, der einen vergangenen Tag bezeichnet.',
      sampleSolution: 'yesterday',
    },
    {
      id: 'sp-sp-15',
      prompt: 'Ergänze das unregelmäßige Verb im Simple Past: "Noah ... (have) a great idea for the project."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['had'],
      hint: 'Die Vergangenheitsform von have hat drei Buchstaben.',
      sampleSolution: 'had',
    },
    {
      id: 'sp-sp-16',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für eine verneinte Aussage.',
      interactionType: 'sentence_builder',
      tiles: ['the bus', 'they', "didn't catch", 'this morning'],
      correctAnswers: [
        "They didn't catch the bus this morning.",
        "This morning they didn't catch the bus.",
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Stelle das Subjekt nach vorne, gefolgt von der verneinten Verbverbindung.',
      sampleSolution: "They didn't catch the bus this morning.",
    },
    {
      id: 'sp-sp-17',
      prompt: 'Welche Frage mit Fragewort ist grammatikalisch fehlerfrei gebildet?',
      interactionType: 'choice',
      options: [
        'Where went you to? ',
        'Where did you go?  ',
        'Where did you went?',
        'Where you did go?  ',
      ],
      correctAnswers: ['Where did you go?  '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Reihenfolge: Fragewort + did + Subjekt + Infinitiv.',
      sampleSolution: 'Where did you go?',
    },
    {
      id: 'sp-sp-18',
      prompt: 'Ergänze die richtige Simple-Past-Form von "write": "She ... (write) an email to her pen pal."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['wrote'],
      hint: 'Dieses unregelmäßige Verb wechselt den Vokal i zu o.',
      sampleSolution: 'wrote',
    },
    {
      id: 'sp-sp-19',
      prompt: 'Klicke auf das fehlerhafte Wort im folgenden Satz.',
      interactionType: 'word_select',
      words: ['Did', 'you', 'watched', 'the', 'football', 'match', 'yesterday?'],
      correctAnswers: ['watched'],
      placeholder: 'Klicke auf das fehlerhafte Wort...',
      hint: 'In einer Frage mit "did" muss das Vollverb im reinen Infinitiv stehen.',
      sampleSolution: 'watched',
    },
    {
      id: 'sp-sp-20',
      prompt: 'Ergänze das unregelmäßige Verb im Simple Past: "We ... (make) delicious pancakes on Sunday."',
      interactionType: 'input',
      placeholder: 'Verbform eintragen...',
      correctAnswers: ['made'],
      hint: 'Der Buchstabe k im Verb make wird in der Vergangenheit durch ein d ersetzt.',
      sampleSolution: 'made',
    },
  ],
};

// ============================================================================
// TASK 2: DEMONSTRATIVE PRONOUNS (THIS, THAT, THESE, THOSE)
// ============================================================================
const simplePastTaskDemonstratives: Task = {
  id: 'pauln-demonstrative-pronouns',
  topicSlug: 'demonstrative-pronouns',
  date: '12.10.2026',
  title: 'Demonstrative Pronouns: This, That, These, Those',
  subject: 'Englisch',
  topic: 'Demonstrative Pronouns',
  dateBadge: '12.10.2026 • Demonstratives',
  description:
    'Lerne den sicheren Umgang mit Hinweiswörtern im Englischen: this & these für Gegenstände in der Nähe, that & those für Gegenstände in der Ferne. Achte auf Einzahl und Mehrzahl sowie die passende Verbform!',
  type: 'input',
  readingText: {
    title: 'Wissensbox: This, That, These, Those im Vergleich',
    content: `DEMONSTRATIVPRONOMEN IM ENGLISCHEN

1. DAS SYSTEM (NÄHE VS. FERNE & EINZAHL VS. MEHRZAHL):

                IN DER NÄHE (hier)         IN DER FERNE (dort / drüben)
EINZAHL (1 Ding):   THIS  (dieser/diese/dieses)   THAT  (jener/jene/jenes / das da)
MEHRZAHL (ab 2):    THESE (diese hier)            THOSE (jene dort / die da)

2. BEISPIELE ZUR ORIENTIERUNG:
• THIS (Einzahl, nah):
  – "This apple here in my hand is delicious."
  – "I really like this book." (das Buch, das ich gerade halte oder lese)
• THAT (Einzahl, fern):
  – "Look at that bird over there in the tall tree."
  – "That house on the hill is very old."
• THESE (Mehrzahl, nah):
  – "These shoes I am wearing are brand new."
  – "Are these your pens on the table?"
• THOSE (Mehrzahl, fern):
  – "Those cars across the street are very fast."
  – "Can you see those clouds in the sky?"

3. DIE RICHTIGE VERBFORM:
• Einzahl verlangt Einzahl-Verben:
  – This is / That is (oder Vergangenheit: This was / That was)
• Mehrzahl verlangt Mehrzahl-Verben:
  – These are / Those are (oder Vergangenheit: These were / Those were)

4. TYPISCHE FEHLER VERMEIDEN:
• "This" und "these" klingen ähnlich, bedeuten aber Einzahl vs. Mehrzahl:
  – this car (1 Auto) vs. these cars (mehrere Autos).
• Niemals "these is" oder "that are" kombinieren!`,
    source: 'English Grammar • Demonstratives',
  },
  checklistItems: [
    {
      id: 'chk-dp-1',
      text: 'Ich verwende this für einzelne Gegenstände in meiner Nähe (hier).',
      category: 'Einzahl Nähe',
    },
    {
      id: 'chk-dp-2',
      text: 'Ich verwende that für einzelne Gegenstände in der Ferne (dort/drüben).',
      category: 'Einzahl Ferne',
    },
    {
      id: 'chk-dp-3',
      text: 'Ich verwende these für mehrere Gegenstände in meiner Nähe.',
      category: 'Mehrzahl Nähe',
    },
    {
      id: 'chk-dp-4',
      text: 'Ich verwende those für mehrere Gegenstände in der Ferne.',
      category: 'Mehrzahl Ferne',
    },
  ],
  inputQuestions: [
    {
      id: 'sp-dp-01',
      prompt: 'Welches Demonstrativpronomen bezeichnet einen einzelnen Gegenstand in unmittelbarer Nähe?',
      interactionType: 'choice',
      options: ['that ', 'this ', 'these', 'those'],
      correctAnswers: ['this '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Überlege, welches Wort für die Einzahl und räumliche Nähe ("hier") steht.',
      sampleSolution: 'this',
    },
    {
      id: 'sp-dp-02',
      prompt: 'Ergänze das passende Hinweiswort für den Stift in der Hand: "... pencil in my hand is blue."',
      interactionType: 'input',
      placeholder: 'Pronomen eintragen...',
      correctAnswers: ['This', 'this'],
      hint: 'Da der Stift direkt in der eigenen Hand liegt, handelt es sich um räumliche Nähe.',
      sampleSolution: 'This',
    },
    {
      id: 'sp-dp-03',
      prompt: 'Welches Wort passt zur Einzahl in der Ferne? "Look at ... kite high up in the sky!"',
      interactionType: 'choice',
      options: ['these', 'those', 'that ', 'this '],
      correctAnswers: ['that '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Der Drachen ist ein einzelner Gegenstand, der weit oben am Himmel schwebt.',
      sampleSolution: 'that',
    },
    {
      id: 'sp-dp-04',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['on my desk', 'these books', 'are heavy', 'here'],
      correctAnswers: [
        'These books here on my desk are heavy.',
        'These books on my desk here are heavy.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit der Wortgruppe "These books" und beschreibe dann den Ort.',
      sampleSolution: 'These books here on my desk are heavy.',
    },
    {
      id: 'sp-dp-05',
      prompt: 'Ergänze das passende Pronomen für mehrere Dinge in der Ferne: "Can you see ... (these / those) sheep on the distant hill?"',
      interactionType: 'input',
      placeholder: 'Pronomen eintragen...',
      correctAnswers: ['those', 'Those'],
      hint: 'Die Schafe sind in der Mehrzahl und befinden sich weit entfernt auf dem Hügel.',
      sampleSolution: 'those',
    },
    {
      id: 'sp-dp-06',
      prompt: 'Welche Verbform passt grammatikalisch in die Lücke? "These cupcakes on the plate ... delicious."',
      interactionType: 'choice',
      options: ['is  ', 'are ', 'was ', 'be  '],
      correctAnswers: ['are '],
      placeholder: 'Wähle die passende Option...',
      hint: '"These cupcakes" steht in der Mehrzahl. Welches Hilfsverb gehört zur Mehrzahl im Präsens?',
      sampleSolution: 'are',
    },
    {
      id: 'sp-dp-07',
      prompt: 'Klicke auf das Demonstrativpronomen im folgenden Satz.',
      interactionType: 'word_select',
      words: ['Can', 'you', 'pass', 'me', 'that', 'water', 'bottle,', 'please?'],
      correctAnswers: ['that'],
      placeholder: 'Klicke auf das gesuchte Wort...',
      hint: 'Finde das Hinweiswort, das vor "water bottle" steht.',
      sampleSolution: 'that',
    },
    {
      id: 'sp-dp-08',
      prompt: 'Ergänze das passende Pronomen: "I love ... shoes I am wearing right now."',
      interactionType: 'input',
      placeholder: 'Pronomen eintragen...',
      correctAnswers: ['these', 'These'],
      hint: 'Schuhe stehen in der Mehrzahl und die Person trägt sie im Moment am eigenen Fuß.',
      sampleSolution: 'these',
    },
    {
      id: 'sp-dp-09',
      prompt: 'Welches Demonstrativpronomen gehört zur Mehrzahl in räumlicher Ferne?',
      interactionType: 'choice',
      options: ['these', 'that ', 'this ', 'those'],
      correctAnswers: ['those'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Gesucht ist das Wort für mehrere Gegenstände, die nicht hier, sondern drüben sind.',
      sampleSolution: 'those',
    },
    {
      id: 'sp-dp-10',
      prompt: 'Bringe die Bausteine in die korrekte Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['across the street', 'is very old', 'that house', 'over there'],
      correctAnswers: [
        'That house across the street is very old over there.',
        'That house over there across the street is very old.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit dem Bezugswort "that house".',
      sampleSolution: 'That house over there across the street is very old.',
    },
    {
      id: 'sp-dp-11',
      prompt: 'Welcher Satz ist grammatikalisch korrekt formuliert?',
      interactionType: 'choice',
      options: [
        'This apples is sweet.  ',
        'These apples are sweet. ',
        'Those apple is sweet.  ',
        'That apples are sweet. ',
      ],
      correctAnswers: ['These apples are sweet. '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Achte darauf, dass Begleiter, Nomen und Verb alle einheitlich in der Mehrzahl stehen.',
      sampleSolution: 'These apples are sweet.',
    },
    {
      id: 'sp-dp-12',
      prompt: 'Ergänze das passende Wort: "... is my new bicycle right in front of me."',
      interactionType: 'input',
      placeholder: 'Pronomen eintragen...',
      correctAnswers: ['This', 'this'],
      hint: 'Ein Fahrrad in der Einzahl, das direkt vor einem steht.',
      sampleSolution: 'This',
    },
    {
      id: 'sp-dp-13',
      prompt: 'Welches Wortpaar drückt beide Formen für Gegenstände in der Nähe aus?',
      interactionType: 'choice',
      options: [
        'that and those',
        'this and that ',
        'this and these',
        'these and that',
      ],
      correctAnswers: ['this and these'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Beide Wörter beziehen sich auf Dinge, die sich hier bei der sprechenden Person befinden.',
      sampleSolution: 'this and these',
    },
    {
      id: 'sp-dp-14',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für eine Frage.',
      interactionType: 'sentence_builder',
      tiles: ['whose keys', 'on the floor', 'are these', 'over here'],
      correctAnswers: [
        'Whose keys are these on the floor over here?',
        'Whose keys on the floor are these over here?',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Beginne mit dem Fragewort "Whose keys" gefolgt von der Verbverbindung.',
      sampleSolution: 'Whose keys are these on the floor over here?',
    },
    {
      id: 'sp-dp-15',
      prompt: 'Ergänze das passende Demonstrativpronomen: "Who are ... children playing in the park across the road?"',
      interactionType: 'input',
      placeholder: 'Pronomen eintragen...',
      correctAnswers: ['those', 'Those'],
      hint: 'Mehrere Kinder auf der gegenüberliegenden Straßenseite (Mehrzahl in der Ferne).',
      sampleSolution: 'those',
    },
    {
      id: 'sp-dp-16',
      prompt: 'Klicke auf das falsche Wort im folgenden Satz.',
      interactionType: 'word_select',
      words: ['This', 'shoes', 'under', 'the', 'bed', 'are', 'very', 'dirty.'],
      correctAnswers: ['This'],
      placeholder: 'Klicke auf das fehlerhafte Wort...',
      hint: 'Vor dem Mehrzahlnomen "shoes" darf kein Einzahlbegleiter stehen.',
      sampleSolution: 'This',
    },
    {
      id: 'sp-dp-17',
      prompt: 'Welches Pronomen ersetzt die Lücke? "I dislike my green shirt, but I really like ... red one over there."',
      interactionType: 'choice',
      options: ['these', 'those', 'this ', 'that '],
      correctAnswers: ['that '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Das rote Hemd ist ein einzelnes Kleidungsstück drüben auf der anderen Seite.',
      sampleSolution: 'that',
    },
    {
      id: 'sp-dp-18',
      prompt: 'Ergänze das passende Hinweiswort für Vögel am weiten Himmel: "Look at ... birds flying in the distance."',
      interactionType: 'input',
      placeholder: 'Mehrzahlform eintragen...',
      correctAnswers: ['those', 'Those'],
      hint: 'Wende die Vokaländerung bei Hinweiswörtern für die Mehrzahl in der Ferne an.',
      sampleSolution: 'those',
    },
  ],
};

// ============================================================================
// TASK 3: CONNECTIVES (AND, BUT, OR, SO, BECAUSE)
// ============================================================================
const simplePastTaskConnectives: Task = {
  id: 'pauln-connectives',
  topicSlug: 'connectives',
  date: '12.10.2026',
  title: 'Connectives: And, But, Or, So, Because',
  subject: 'Englisch',
  topic: 'Connectives & Conjunctions',
  dateBadge: '12.10.2026 • Connectives',
  description:
    'Verbinde Sätze sinnvoll miteinander: Lerne die Funktionen von and (hinzufügen), but (Gegensatz), or (Wahlmöglichkeit), so (Folge) und because (Begründung) kennen und meistere den Unterschied zwischen Ursache und Konsequenz.',
  type: 'input',
  readingText: {
    title: 'Wissensbox: Bindewörter (Conjunctions / Connectives)',
    content: `SATZVERBINDER IM ENGLISCHEN: BEDEUTUNG & EINSATZ

1. DIE FÜNF WICHTIGSTEN VERBINDER:
• AND (und):
  – Fügt eine ähnliche oder zusätzliche Information hinzu.
  – Beispiel: "Tom likes pizza and he loves pasta."
• BUT (aber):
  – Drückt einen Gegensatz oder eine unerwartete Einschränkung aus.
  – Beispiel: "I wanted to play outside, but it started to rain."
• OR (oder):
  – Bietet eine Wahlmöglichkeit oder Alternative zwischen zwei Optionen an.
  – Beispiel: "Would you like tea or hot chocolate?"
• SO (deshalb / so dass):
  – Nennt das Ergebnis oder die Folge einer vorangehenden Situation.
  – Aufbau: [Ursache], so [Folge / Konsequenz].
  – Beispiel: "I was very tired, so I went to bed early."
• BECAUSE (weil / da):
  – Nennt den Grund oder die Ursache für eine Handlung.
  – Aufbau: [Handlung], because [Begründung / Ursache].
  – Beispiel: "I went to bed early because I was very tired."

2. DER SCHLÜSSELUNTERSCHIED ZWISCHEN "SO" UND "BECAUSE":
Vergleiche genau die Satzreihenfolge:
• Situation: Es regnet. Folge: Wir nehmen einen Regenschirm.
  – Mit SO: "It was raining, so we took our umbrellas." (Ursache zuerst -> dann die Folge)
  – Mit BECAUSE: "We took our umbrellas because it was raining." (Folge zuerst -> dann die Ursache)`,
    source: 'English Grammar • Connectives & Conjunctions',
  },
  checklistItems: [
    {
      id: 'chk-co-1',
      text: 'Ich verwende and, um zwei Gedanken oder Elemente aneinanderzureihen.',
      category: 'Hinzufügen',
    },
    {
      id: 'chk-co-2',
      text: 'Ich verwende but für gegensätzliche Aussagen und Überraschungen.',
      category: 'Gegensatz',
    },
    {
      id: 'chk-co-3',
      text: 'Ich verwende or für Alternativen und Entscheidungen.',
      category: 'Alternative',
    },
    {
      id: 'chk-co-4',
      text: 'Ich unterscheide sicher zwischen so (Folge/Ergebnis) und because (Grund/Ursache).',
      category: 'Kausalität',
    },
  ],
  inputQuestions: [
    {
      id: 'sp-co-01',
      prompt: 'Welches Bindewort drückt einen inhaltlichen Gegensatz aus?',
      interactionType: 'choice',
      options: ['and', 'but', 'so ', 'or '],
      correctAnswers: ['but'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Überlege, welches Bindewort auf Deutsch "aber" bedeutet.',
      sampleSolution: 'but',
    },
    {
      id: 'sp-co-02',
      prompt: 'Ergänze das passende Bindewort: "We stayed at home yesterday ... it was raining heavily."',
      interactionType: 'input',
      placeholder: 'Bindewort eintragen...',
      correctAnswers: ['because'],
      hint: 'Der zweite Teilsatz liefert die Begründung, warum wir zu Hause geblieben sind.',
      sampleSolution: 'because',
    },
    {
      id: 'sp-co-03',
      prompt: 'Welches Bindewort passt in die Lücke? "She was feeling sick, ... she did not go to school."',
      interactionType: 'choice',
      options: ['and', 'or ', 'so ', 'but'],
      correctAnswers: ['so '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Der zweite Satz beschreibt die logische Folge (deshalb / darum) der Krankheit.',
      sampleSolution: 'so',
    },
    {
      id: 'sp-co-04',
      prompt: 'Bringe die Bausteine in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['and played videogames', 'lucas did his homework', 'in the afternoon'],
      correctAnswers: [
        'Lucas did his homework and played videogames in the afternoon.',
        'In the afternoon Lucas did his homework and played videogames.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Der Satz verbindet zwei aufeinanderfolgende Aktionen mit "and".',
      sampleSolution: 'Lucas did his homework and played videogames in the afternoon.',
    },
    {
      id: 'sp-co-05',
      prompt: 'Ergänze das Bindewort für eine Wahlmöglichkeit: "Do you want to play tennis ... football after school?"',
      interactionType: 'input',
      placeholder: 'Bindewort eintragen...',
      correctAnswers: ['or'],
      hint: 'Gesucht ist das Bindewort für zwei verschiedene Auswahlmöglichkeiten ("oder").',
      sampleSolution: 'or',
    },
    {
      id: 'sp-co-06',
      prompt: 'Welches Bindewort verbindet die beiden Sätze sinnvoll? "David studied hard, ... he did not pass the exam."',
      interactionType: 'choice',
      options: ['and', 'so ', 'or ', 'but'],
      correctAnswers: ['but'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Es liegt ein überraschender Gegensatz vor: Trotz des Lernens hat er nicht bestanden.',
      sampleSolution: 'but',
    },
    {
      id: 'sp-co-07',
      prompt: 'Klicke auf das Bindewort im folgenden Satz.',
      interactionType: 'word_select',
      words: ['I', 'drank', 'two', 'glasses', 'of', 'water', 'because', 'I', 'was', 'very', 'thirsty.'],
      correctAnswers: ['because'],
      placeholder: 'Klicke auf das gesuchte Wort...',
      hint: 'Finde das Wort, das den Grund für das Wassertrinken einleitet.',
      sampleSolution: 'because',
    },
    {
      id: 'sp-co-08',
      prompt: 'Ergänze das Bindewort: "The alarm clock did not ring, ... I arrived late at school."',
      interactionType: 'input',
      placeholder: 'Bindewort eintragen...',
      correctAnswers: ['so'],
      hint: 'Das Zuspätkommen ist die direkte Folge des ausgefallenen Weckers.',
      sampleSolution: 'so',
    },
    {
      id: 'sp-co-09',
      prompt: 'Welcher Satz drückt denselben Sinn aus wie: "Because it was cold, we wore our jackets."?',
      interactionType: 'choice',
      options: [
        'It was cold, but we wore jackets now.',
        'It was cold, so we wore our jackets.',
        'We wore our jackets or it was cold.  ',
        'It was cold, and we wore no jacket.  ',
      ],
      correctAnswers: ['It was cold, so we wore our jackets.'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Wenn die Ursache vorne steht, leitet "so" die Konsequenz ein.',
      sampleSolution: 'It was cold, so we wore our jackets.',
    },
    {
      id: 'sp-co-10',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['he forgot the ticket', 'tim wanted to enter', 'but', 'the cinema,'],
      correctAnswers: [
        'Tim wanted to enter the cinema, but he forgot the ticket.',
        'Tim wanted to enter the cinema but he forgot the ticket.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Zuerst der Wunsch ("Tim wanted to enter..."), gefolgt vom Gegensatz mit "but".',
      sampleSolution: 'Tim wanted to enter the cinema, but he forgot the ticket.',
    },
    {
      id: 'sp-co-11',
      prompt: 'Ergänze das passende Bindewort: "Mia likes apples, bananas ... strawberries."',
      interactionType: 'input',
      placeholder: 'Bindewort eintragen...',
      correctAnswers: ['and'],
      hint: 'Hier wird ein weiteres Lieblingsobst hinzugefügt.',
      sampleSolution: 'and',
    },
    {
      id: 'sp-co-12',
      prompt: 'Welches Bindewort passt am besten in die Lücke? "You can drink apple juice ... orange juice."',
      interactionType: 'choice',
      options: ['or ', 'so ', 'but', 'and'],
      correctAnswers: ['or '],
      placeholder: 'Wähle die passende Option...',
      hint: 'Es handelt sich um ein Angebot zwischen zwei Getränke-Optionen.',
      sampleSolution: 'or',
    },
    {
      id: 'sp-co-13',
      prompt: 'Ergänze das passende Bindewort: "We ran very fast, ... we still missed the school bus."',
      interactionType: 'input',
      placeholder: 'Bindewort eintragen...',
      correctAnswers: ['but'],
      hint: 'Das Verpassen des Busses ist eine Enttäuschung im Gegensatz zum schnellen Rennen.',
      sampleSolution: 'but',
    },
    {
      id: 'sp-co-14',
      prompt: 'Bringe die Bausteine in die korrekte Reihenfolge.',
      interactionType: 'sentence_builder',
      tiles: ['so we stayed inside', 'the rain was heavy,', 'all afternoon'],
      correctAnswers: [
        'The rain was heavy, so we stayed inside all afternoon.',
        'The rain was heavy so we stayed inside all afternoon.',
      ],
      placeholder: 'Ordne die Satzbausteine...',
      hint: 'Die Ursache steht am Anfang, die Folge wird mit "so" angeschlossen.',
      sampleSolution: 'The rain was heavy, so we stayed inside all afternoon.',
    },
    {
      id: 'sp-co-15',
      prompt: 'Klicke auf das falsche Bindewort im folgenden Satz.',
      interactionType: 'word_select',
      words: ['Emma', 'put', 'on', 'her', 'warm', 'coat', 'so', 'it', 'was', 'very', 'cold', 'outside.'],
      correctAnswers: ['so'],
      placeholder: 'Klicke auf das fehlerhafte Wort...',
      hint: 'Weil die Kälte der Grund für den Mantel ist, müsste hier "because" anstelle dieses Wortes stehen.',
      sampleSolution: 'so',
    },
    {
      id: 'sp-co-16',
      prompt: 'Welche Begründung ist logisch und grammatikalisch korrekt ergänzt? "He smiled happily..."',
      interactionType: 'choice',
      options: [
        'so he received a great mark in math.',
        'or he received a great mark in math.',
        'because he got a great mark in math.',
        'but he received a great mark in math.',
      ],
      correctAnswers: ['because he got a great mark in math.'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Die gute Note ist der Grund für das fröhliche Lächeln.',
      sampleSolution: 'because he got a great mark in math.',
    },
    {
      id: 'sp-co-17',
      prompt: 'Ergänze das passende Bindewort: "The train was late, ... we waited at the station for twenty minutes."',
      interactionType: 'input',
      placeholder: 'Bindewort eintragen...',
      correctAnswers: ['so'],
      hint: 'Das Warten am Bahnsteig ist die Folge der Zugverspätung.',
      sampleSolution: 'so',
    },
    {
      id: 'sp-co-18',
      prompt: 'Welches Bindewort eignet sich für eine Aneinanderreihung zweier Handlungen?',
      interactionType: 'choice',
      options: ['but', 'so ', 'or ', 'and'],
      correctAnswers: ['and'],
      placeholder: 'Wähle die passende Option...',
      hint: 'Dieses Wort verbindet gleichwertige Satzteile ohne Gegensatz.',
      sampleSolution: 'and',
    },
  ],
};

const allLeonTasks: Task[] = [
  simplePastTaskSimplePast,
  simplePastTaskDemonstratives,
  simplePastTaskConnectives,
];

export const unit12102026: DailyLearningUnit = {
  id: 'pauln-12.10.2026',
  date: '12.10.2026',
  title: 'Tages-Lerneinheit: 12.10.2026',
  description:
    'Klassenarbeitsvorbereitung Englisch: 3 interaktive Themenbereiche zu Simple Past (Verben, Verneinung & Fragen), Demonstrative Pronouns (this, that, these, those) und Connectives (and, but, or, so, because).',
  tasks: allLeonTasks,
};

export { allLeonTasks as simplePastTasks };
