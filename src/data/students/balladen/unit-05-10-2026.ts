import { Task, DailyLearningUnit } from '@/types/student';

const balladenTasksDay2: Task[] = [
  // =========================================================================
  // 1. NEUE BALLADE: GOETHES „DER ZAUBERLEHRLING“ (1797)
  // TATTZ-Satz, Metrum, Reimschema & 6 W-Fragen
  // =========================================================================
  {
    id: 'balladen-zauberlehrling',
    topicSlug: 'zauberlehrling',
    date: '05.10.2026',
    title: 'Goethes „Der Zauberlehrling“ – Text, TATTZ, Form & W-Fragen',
    subject: 'Deutsch',
    topic: 'Goethe: Der Zauberlehrling',
    dateBadge: 'Balladenanalyse zur Klassenarbeit',
    description:
      'Das dritte große Meisterwerk neben Schillers „Handschuh“ und Goethes „Erlkönig“: Lies Johann Wolfgang von Goethes Ballade „Der Zauberlehrling“ (1797) und bestimme TATTZ-Einleitungssatz, Versmaß (Metrum), Reimschema sowie alle 6 W-Fragen für die perfekte Inhaltsangabe.',
    type: 'input',
    hideSampleSolution: true,
    readingText: {
      title: 'Johann Wolfgang von Goethe: Der Zauberlehrling (1797)',
      content: `Hat der alte Hexenmeister
sich doch einmal wegbegeben!
Und nun sollen seine Geister
auch nach meinem Willen leben.
Seine Wort’ und Werke
merkt ich und den Brauch,
und mit Geistesstärke
tu ich Wunder auch.

Walle! walle
Manche Strecke,
dass, zum Zwecke,
Wasser fließe
und mit reichem, vollem Schwalle
zu dem Bade sich ergieße!

Und nun komm, du alter Besen!
Nimm die schlechten Lumpenhüllen;
bist schon lange Knecht gewesen;
nun erfülle meinen Willen!
Auf zwei Beinen stehe,
oben sei ein Kopf,
eile nun und gehe
mit dem Wassertopf!

Walle! walle
Manche Strecke,
dass, zum Zwecke,
Wasser fließe
und mit reichem, vollem Schwalle
zu dem Bade sich ergieße!

Seht, er läuft zum Ufer nieder;
wahrlich! ist schon an dem Flusse,
und mit Blitzesschnelle wieder
ist er hier mit raschem Gusse.
Schon zum zweiten Male!
Wie das Becken schwillt!
Wie sich jede Schale
voll mit Wasser füllt!

Stehe! stehe!
denn wir haben
deiner Gaben
vollgemessen! –
Ach, ich merk es! Wehe! wehe!
Hab ich doch das Wort vergessen!

Ach, das Wort, worauf am Ende
er das wird, was er gewesen!
Ach, er läuft und bringt behende!
Wärst du doch der alte Besen!
Immer neue Güsse
bringt er schnell herein,
ach! und hundert Flüsse
stürzen auf mich ein!

Nein, nicht länger
kann ichs lassen;
will ihn fassen!
Das ist Tücke!
Ach! nun wird mir immer bänger!
Welche Miene! welche Blicke!

O, du Ausgeburt der Hölle!
Soll das ganze Haus ersaufen?
Seh ich über jede Schwelle
doch schon Wasserströme laufen.
Ein verruchter Besen,
der nicht hören will!
Stock, der du gewesen,
steh doch wieder still!

Willsts am Ende
gar nicht lassen?
Will dich fassen,
will dich halten
und das alte Holz behende
mit dem scharfen Beile spalten!

Seht, da kommt er schleppend wieder!
Wie ich mich nur auf dich werfe,
gleich, o Wicht! liegt du darnieder;
krachend trifft die glatte Schärfe!
Wahrlich! brav getroffen!
Seht, er ist entzwei!
Und nun kann ich hoffen,
und ich atme frei!

Wehe! wehe!
Beide Teile
stehn in Eile
schon als Knechte
völlig fertig in die Höhe!
Helft mir, ach! ihr hohen Mächte!

Und sie laufen! Nass und nässer
wirds im Saal und auf den Stufen.
Welch entsetzliches Gewässer!
Herr und Meister! hör mich rufen! –
Ach, da kommt der Meister!
Herr, die Not ist groß!
Die ich rief, die Geister
werd ich nun nicht los.

„In die Ecke,
Besen! Besen!
Seids gewesen!
Denn als Geister
ruft euch nur zu seinem Zwecke,
erst hervor der alte Meister.“`,
      source: 'Johann Wolfgang von Goethe, Balladenjahr 1797 (Weimarer Klassik)',
    },
    inputQuestions: [
      {
        id: 'z1',
        prompt: '1. TATTZ – Textart: Um welche literarische Textform handelt es sich bei Goethes Werk?',
        interactionType: 'choice',
        options: [
          'Sachtext',
          'Ballade',
          'Märchen',
          'Schauspiel',
        ],
        correctAnswers: [
          'Ballade',
        ],
        hint: 'Verse, Reime, eine spannende Geschichte und direkte Figurenrede vereinen sich hier.',
      },
      {
        id: 'z2',
        prompt: '2. TATTZ – Autor: Welcher berühmte Dichter hat das Werk verfasst?',
        interactionType: 'choice',
        options: [
          'Theodor Fontane',
          'Friedrich Schiller',
          'Johann Wolfgang von Goethe',
          'Heinrich Heine',
        ],
        correctAnswers: ['Johann Wolfgang von Goethe'],
        hint: 'Er schuf auch den „Erlkönig“ und den „Faust“.',
      },
      {
        id: 'z3',
        prompt: '3. TATTZ – Titel: Wie lautet der exakte Titel des Werkes?',
        interactionType: 'choice',
        options: [
          '„Der böse Besen“',
          '„Der Hexenmeister am Fluss“',
          '„Die Zauberstunde“',
          '„Der Zauberlehrling“',
        ],
        correctAnswers: ['„Der Zauberlehrling“'],
        hint: 'Der Titel benennt die Hauptfigur, die das magische Experiment wagt.',
      },
      {
        id: 'z4',
        prompt: '4. TATTZ – Zeit: In welchem Entstehungsjahr (Balladenjahr der Weimarer Klassik) wurde das Werk vollendet?',
        interactionType: 'choice',
        options: [
          '1797',
          '1914',
          '1848',
          '1600',
        ],
        correctAnswers: ['1797'],
        hint: 'Im selben berühmten Balladenjahr dichtete auch Friedrich Schiller seinen „Handschuh“.',
      },
      {
        id: 'z5',
        prompt: '5. TATTZ – Satzbau: Setze einen vollständigen TATTZ-Einleitungssatz für die Inhaltsangabe zusammen:',
        interactionType: 'sentence_builder',
        tiles: [
          'geht es um einen übermütigen zauberschüler, der die gerufenen geister nicht mehr bändigen kann',
          'aus dem jahr 1797',
          'von johann wolfgang von goethe',
          'in der ballade',
          '„der zauberlehrling“',
        ],
        correctAnswers: [
          'In der Ballade „Der Zauberlehrling“ von Johann Wolfgang von Goethe aus dem Jahr 1797 geht es um einen übermütigen Zauberschüler, der die gerufenen Geister nicht mehr bändigen kann.',
          'In der Ballade "Der Zauberlehrling" von Johann Wolfgang von Goethe aus dem Jahr 1797 geht es um einen übermütigen Zauberschüler, der die gerufenen Geister nicht mehr bändigen kann.',
        ],
        hint: 'Beginne mit: In der Ballade...',
      },
      {
        id: 'z6',
        prompt: '6. METRUM: Welches Versmaß (Metrum) bestimmt den Rhythmus der ersten Strophe („Hát der álte Héxenmeíster“)?',
        context: 'Betonungsmuster: – v – v – v – v (betont, unbetont im Wechsel)',
        interactionType: 'choice',
        options: [
          'Trochäus (– v)',
          'Jambus (v –)',
          'Daktylus (– v v)',
          'Anapäst (v v –)',
        ],
        correctAnswers: ['Trochäus (– v)'],
        hint: 'Folge dem Wechsel von Hebung und Senkung: Zuerst eine betonte, danach eine unbetonte Silbe.',
      },
      {
        id: 'z7',
        prompt: '7. REIMSCHEMA: Welches Reimschema liegt in den ersten vier Versen vor (Hexenmeister / wegbegeben / Geister / leben)?',
        interactionType: 'choice',
        options: [
          'Paarreim (aabb)',
          'Umarmender Reim (abba)',
          'Kreuzreim (abab)',
          'Schweifreim (aabccb)',
        ],
        correctAnswers: ['Kreuzreim (abab)'],
        hint: 'Zeile 1 reimt sich auf Zeile 3, Zeile 2 auf Zeile 4.',
      },
      {
        id: 'z8',
        prompt: '8. W-Frage WER & WO: Wer sind die handelnden Figuren und wo findet die Handlung statt?',
        interactionType: 'choice',
        options: [
          'Drei Seeleute auf einem fernen Handelsschiff',
          'Der Zauberlehrling und der Meister im Haus',
          'König Franz und Delorges in der Arena',
          'Ein Vater und sein Sohn auf dem Waldweg',
        ],
        correctAnswers: [
          'Der Zauberlehrling und der Meister im Haus',
        ],
        hint: 'Ein ungeduldiger Schüler nutzt die Abwesenheit seines Meisters in dessen Gemächern.',
      },
      {
        id: 'z9',
        prompt: '9. W-Frage WAS & WARUM: Was bringt das Unheil ins Rollen?',
        interactionType: 'choice',
        options: [
          'Der Meister verliert seinen Zauberstab bei einem Ausflug',
          'Der Lehrling verzaubert einen Besen, vergisst aber den Zauberspruch',
          'Ein plötzlicher Gewittersturm setzt die Werkstatt in Brand',
          'Ein fremder Zauberer bricht heimlich in das Meisterhaus ein',
        ],
        correctAnswers: [
          'Der Lehrling verzaubert einen Besen, vergisst aber den Zauberspruch',
        ],
        hint: 'Er wollte sich die schwere Arbeit sparen, beherrscht aber den Rückzauber nicht.',
      },
      {
        id: 'z10',
        prompt: '10. W-Frage WIE (Höhepunkt / Klimax): Wie versucht der Lehrling in Panik die Flut zu stoppen und was passiert?',
        interactionType: 'choice',
        options: [
          'Er spaltet den Besen mit einer Axt, doch beide Teile tragen weiter Wasser',
          'Er rennt panisch zum Fluss und versucht das Wasser mit Eimern zurückzuhalten',
          'Er versteckt sich auf dem Dachboden, bis der Meister am Abend heimkehrt',
          'Er spricht einen erfundenen Schutzzauber, der das Haus vollständig einfriert',
        ],
        correctAnswers: [
          'Er spaltet den Besen mit einer Axt, doch beide Teile tragen weiter Wasser',
        ],
        hint: 'Aus eins werden zwei: Die Zerstörung des Besens macht die Katastrophe doppelt so schlimm.',
      },
      {
        id: 'z11',
        prompt: '11. W-Frage WELCHE FOLGEN (Lehre): Welche moralische Lehre vermittelt das Ende der Ballade?',
        interactionType: 'choice',
        options: [
          'Dass magische Kunststücke nur im Beisein von Zeugen gelingen',
          'Wer unbedacht fremde Mächte ruft, richtet ohne Beherrschung großes Unheil an',
          'Dass handwerkliche Arbeiten stets ohne fremde Hilfsmittel verrichtet werden müssen',
          'Dass junge Menschen sich niemals dem Willen ihrer Vorbilder widersetzen dürfen',
        ],
        correctAnswers: [
          'Wer unbedacht fremde Mächte ruft, richtet ohne Beherrschung großes Unheil an',
        ],
        hint: 'Goethe warnt vor Selbstüberschätzung und unbedachter Machtausübung.',
      },
      {
        id: 'z12',
        prompt: '12. ZITAT: Setze den berühmtesten Ausruf des Zauberlehrlings aus den Bausteinen zusammen:',
        interactionType: 'sentence_builder',
        tiles: [
          'nicht los',
          'die geister,',
          'die ich rief,',
          'werd ich nun',
        ],
        correctAnswers: [
          'Die ich rief, die Geister, werd ich nun nicht los.',
        ],
        hint: 'Beginne mit: Die ich rief...',
      },
    ],
    teacherNotes:
      'Mit den Lernenden hervorheben: Der Zauberlehrling bildet mit Handschuh und Erlkönig das klassische Balladen-Trio. Perfekt für die morgige Prüfung!',
  },

  // =========================================================================
  // 2. SPEZIAL-TRAINING: METRUM (VERSMASS) – 10 AUFGABEN
  // Jambus, Trochäus, Daktylus, Anapäst
  // =========================================================================
  {
    id: 'balladen-spezial-metrum',
    topicSlug: 'spezial-metrum',
    date: '05.10.2026',
    title: 'Intensivtraining 1: Metrum (Versmaß) sicher bestimmen',
    subject: 'Deutsch',
    topic: 'Metrum & Versmaß',
    dateBadge: '10 Spezialaufgaben: Metrum',
    description:
      'Hier trainierst du gezielt das Erkennen von Hebungen (betonte Silbe) und Senkungen (unbetonte Silbe) bei den vier wichtigsten Versmaßen: Jambus, Trochäus, Daktylus und Anapäst.',
    type: 'input',
    hideSampleSolution: true,
    inputQuestions: [
      {
        id: 'sm1',
        prompt: '1. Was bedeuten in der Verslehre die Begriffe „Hebung“ und „Senkung“?',
        interactionType: 'choice',
        options: [
          'Hebung bedeutet leise flüstern, Senkung bedeutet laut sprechen',
          'Hebung bedeutet die Schriftgröße, Senkung den Zeilenabstand',
          'Hebung bezeichnet eine betonte Silbe, Senkung eine unbetonte Silbe',
          'Hebung nennt das Reimschema, Senkung nennt das Versmaß',
        ],
        correctAnswers: [
          'Hebung bezeichnet eine betonte Silbe, Senkung eine unbetonte Silbe',
        ],
        hint: 'Achte auf die Betonung beim natürlichen Sprechen der Wörter.',
      },
      {
        id: 'sm2',
        prompt: '2. Welches Taktschema gehört zum JAMBUS?',
        interactionType: 'choice',
        options: [
          'v – (unbetont, betont)',
          '– v (betont, unbetont)',
          '– v v (betont, unbetont, unbetont)',
          'v v – (unbetont, unbetont, betont)',
        ],
        correctAnswers: ['v – (unbetont, betont)'],
        hint: 'Der Jambus steigt auf: Erst unbetont, dann betont.',
      },
      {
        id: 'sm3',
        prompt: '3. Welches Taktschema gehört zum TROCHÄUS?',
        interactionType: 'choice',
        options: [
          '– v (betont, unbetont)',
          'v – (unbetont, betont)',
          '– v v (betont, unbetont, unbetont)',
          'v v – (unbetont, unbetont, betont)',
        ],
        correctAnswers: ['– v (betont, unbetont)'],
        hint: 'Der Trochäus fällt ab: Erst betont, dann unbetont.',
      },
      {
        id: 'sm4',
        prompt: '4. Welches Taktschema gehört zum DAKTYLUS (auch als Dreiertakt/Walzertakt bekannt)?',
        interactionType: 'choice',
        options: [
          '– v v (betont, unbetont, unbetont)',
          'v v – (unbetont, unbetont, betont)',
          '– v (betont, unbetont)',
          'v – (unbetont, betont)',
        ],
        correctAnswers: [
          '– v v (betont, unbetont, unbetont)',
        ],
        hint: 'Ein Dreiertakt, der mit einer kräftigen Hebung beginnt, gefolgt von zwei Senkungen (Ta-ta-ta).',
      },
      {
        id: 'sm5',
        prompt: '5. Welches Taktschema gehört zum ANAPÄST?',
        interactionType: 'choice',
        options: [
          'v v – (unbetont, unbetont, betont)',
          '– v v (betont, unbetont, unbetont)',
          '– v (betont, unbetont)',
          'v – (unbetont, betont)',
        ],
        correctAnswers: [
          'v v – (unbetont, unbetont, betont)',
        ],
        hint: 'Zwei unbetonte Silben vor der abschließenden Hebung.',
      },
      {
        id: 'sm6',
        prompt: '6. Welches Metrum liegt in diesem Vers vor: „Es schlúg mein Hérz, geschwínd zu Pférde!“?',
        context: 'Silbenbetonung: Es schlúg (v –) mein Hérz (v –) ge-schwínd (v –) zu Pfér-(v –) de (v)',
        interactionType: 'choice',
        options: [
          'Trochäus',
          'Daktylus',
          'Jambus',
          'Hexameter',
        ],
        correctAnswers: ['Jambus'],
        hint: 'Jeder Takt beginnt unbetont und endet betont (v –).',
      },
      {
        id: 'sm7',
        prompt: '7. Welches Metrum liegt in diesem Vers vor: „Freúde, schöner Gótterfúnken“?',
        context: 'Silbenbetonung: Freú-de (– v) schö-ner (– v) Gót-ter-(– v) fun-ken (– v)',
        interactionType: 'choice',
        options: [
          'Trochäus',
          'Jambus',
          'Anapäst',
          'Daktylus',
        ],
        correctAnswers: ['Trochäus'],
        hint: 'Jeder Takt beginnt betont und endet unbetont (– v).',
      },
      {
        id: 'sm8',
        prompt: '8. Welches Metrum bestimmt die Zauberformel: „Wálle! wálle / Mánche Strécke“?',
        context: 'Wál-le (– v) wál-le (– v) / Mán-che (– v) Strék-ke (– v)',
        interactionType: 'choice',
        options: [
          'Jambus',
          'Trochäus',
          'Anapäst',
          'Kein Metrum',
        ],
        correctAnswers: ['Trochäus'],
        hint: 'Betont auf der ersten Silbe, unbetont auf der zweiten.',
      },
      {
        id: 'sm9',
        prompt: '9. Welcher rhythmische Effekt wird in Goethes „Erlkönig“ durch den unruhigen Vers „Wer reitet so spät durch Nacht und Wind?“ erzielt?',
        interactionType: 'choice',
        options: [
          'Ein gleichmäßiger Wiegenrhythmus, der die Ruhe des schlafenden Kindes betont',
          'Ein holpriger, treibender Galopprhythmus, der die Hektik und Todesangst spürbar macht',
          'Ein feierlicher Marschrhythmus, der die Erhabenheit des stolzen Reiters zeigt',
          'Ein heiterer, beschwingter Tanzrhythmus, der eine ausgelassene Stimmung im Wald malt',
        ],
        correctAnswers: [
          'Ein holpriger, treibender Galopprhythmus, der die Hektik und Todesangst spürbar macht',
        ],
        hint: 'Der Rhythmus ahmt das galoppierende Pferdehuf-Klopfen im Wald nach.',
      },
      {
        id: 'sm10',
        prompt: '10. Wie viele Hebungen (betonte Silben) besitzt der Vers: „Der Maí ist gekómmen“?',
        context: 'Klatsche den Rhythmus: Der MAI (1) ist ge-KOM-(2)-men.',
        placeholder: 'Zahl der Hebungen eingeben...',
        correctAnswers: ['2', 'zwei', '2 Hebungen', 'zwei Hebungen'],
        hint: 'Zähle nur die Silben, auf die die natürliche Hauptbetonung fällt.',
      },
    ],
    teacherNotes:
      'Lernende sollen sich die Eselsbrücke merken: JAM-bus hüpft heran (v –), TRO-chäus stolpert voran (– v).',
  },

  // =========================================================================
  // 3. SPEZIAL-TRAINING: REIMSCHEMA – 10 AUFGABEN
  // Paarreim, Kreuzreim, Umarmender Reim, Schweifreim, Haufenreim
  // =========================================================================
  {
    id: 'balladen-spezial-reimschema',
    topicSlug: 'spezial-reimschema',
    date: '05.10.2026',
    title: 'Intensivtraining 2: Reimschema im Schlaf beherrschen',
    subject: 'Deutsch',
    topic: 'Reimschema & Reimformen',
    dateBadge: '10 Spezialaufgaben: Reimschema',
    description:
      'Hier trainierst du die sichere Zuordnung aller Reimschemata: Paarreim, Kreuzreim, umarmender Reim, Schweifreim und Haufenreim mit konkreten Textbeispielen.',
    type: 'input',
    hideSampleSolution: true,
    inputQuestions: [
      {
        id: 'sr1',
        prompt: '1. Welches Reimschema entspricht dem Buchstabenmuster aabb?',
        interactionType: 'choice',
        options: [
          'Kreuzreim',
          'Umarmender Reim',
          'Paarreim',
          'Schweifreim',
        ],
        correctAnswers: ['Paarreim'],
        hint: 'Jeweils zwei Zeilen hintereinander bilden ein Paar.',
      },
      {
        id: 'sr2',
        prompt: '2. Welches Reimschema entspricht dem Buchstabenmuster abab?',
        interactionType: 'choice',
        options: [
          'Kreuzreim',
          'Paarreim',
          'Umarmender Reim',
          'Haufenreim',
        ],
        correctAnswers: ['Kreuzreim'],
        hint: 'Die Reime wechseln sich kreuzweise ab.',
      },
      {
        id: 'sr3',
        prompt: '3. Welches Reimschema entspricht dem Buchstabenmuster abba?',
        interactionType: 'choice',
        options: [
          'Paarreim',
          'Kreuzreim',
          'Schweifreim',
          'Umarmender Reim',
        ],
        correctAnswers: ['Umarmender Reim'],
        hint: 'Die äußeren Verse umschließen die beiden mittleren Verse.',
      },
      {
        id: 'sr4',
        prompt: '4. Welches sechsteilige Reimschema besitzt das Muster aabccb?',
        interactionType: 'choice',
        options: [
          'Schweifreim',
          'Kreuzreim',
          'Haufenreim',
          'Kettenreim',
        ],
        correctAnswers: ['Schweifreim'],
        hint: 'Besteht aus einem Paarreim (aa) mit nachfolgendem umschließendem Reim (bccb).',
      },
      {
        id: 'sr5',
        prompt: '5. Welches Reimschema liegt vor, wenn sich vier Zeilen hintereinander alle auf denselben Laut reimen (aaaa)?',
        interactionType: 'choice',
        options: [
          'Haufenreim',
          'Kreuzreim',
          'Umarmender Reim',
          'Stabreim',
        ],
        correctAnswers: ['Haufenreim'],
        hint: 'Alle Reime liegen auf einem einzigen großen „Haufen“.',
      },
      {
        id: 'sr6',
        prompt: '6. Welche Reimart liegt in Schillers Handschuh vor: „Der Löwe tritt mit leisem Tritt (a) / Und sieht sich stumm im Kreise um (b) / Und gähnt und dehnt die Glieder...“?',
        interactionType: 'choice',
        options: [
          'Ein durchgehend strenger Kreuzreim mit festen Endsilben',
          'Ein unregelmäßiger Reim mit Binnenreimen und freien Versen',
          'Ein regelmäßiger Paarreim mit durchgehenden Endreimen',
          'Ein klassischer Schweifreim mit einheitlicher Strophenform',
        ],
        correctAnswers: [
          'Ein unregelmäßiger Reim mit Binnenreimen und freien Versen',
        ],
        hint: 'Schiller variiert die Reimform passend zu den Bewegungen der Raubtiere.',
      },
      {
        id: 'sr7',
        prompt: '7. Welches Reimschema hat diese Strophe: „Wer reitet so spät durch Nacht und Wind? (a) / Es ist der Vater mit seinem Kind; (a) / Er hat den Knaben wohl in dem Arm, (b) / Er fasst ihn sicher, er hält ihn warm. (b)“?',
        interactionType: 'choice',
        options: [
          'Kreuzreim (abab)',
          'Umarmender Reim (abba)',
          'Paarreim (aabb)',
          'Schweifreim (aabccb)',
        ],
        correctAnswers: ['Paarreim (aabb)'],
        hint: 'Wind/Kind und Arm/warm bilden zwei aufeinanderfolgende Paare.',
      },
      {
        id: 'sr8',
        prompt: '8. Welches Reimschema hat diese Strophe: „Die Nacht war kalt und sternenklar, (a) / Der Wind durch alte Bäume weht, (b) / Wie seltsam doch die Fremde war, (a) / Als einsam er am Fenster steht. (b)“?',
        interactionType: 'choice',
        options: [
          'Kreuzreim (abab)',
          'Paarreim (aabb)',
          'Umarmender Reim (abba)',
          'Haufenreim (aaaa)',
        ],
        correctAnswers: ['Kreuzreim (abab)'],
        hint: 'Zeile 1 reimt sich auf 3 (sternenklar/war), Zeile 2 auf 4 (weht/steht).',
      },
      {
        id: 'sr9',
        prompt: '9. Welches Reimschema hat diese Strophe: „Ein leises Rauschen in der Nacht, (a) / Wo dunkle Schatten stumm verweilen (b) / Und durch das tiefe Schweigen eilen, (b) / Bis jäh ein neuer Tag erwacht. (a)“?',
        interactionType: 'choice',
        options: [
          'Kreuzreim (abab)',
          'Umarmender Reim (abba)',
          'Paarreim (aabb)',
          'Haufenreim (aaaa)',
        ],
        correctAnswers: ['Umarmender Reim (abba)'],
        hint: 'Nacht (a) und erwacht (a) umarmen verweilen (b) und eilen (b).',
      },
      {
        id: 'sr10',
        prompt: '10. Was unterscheidet einen REINEN Reim von einem UNREINEN Reim?',
        interactionType: 'choice',
        options: [
          'Beim reinen Reim reimen sich nur Substantive, beim unreinen auch Verben und Adjektive',
          'Beim reinen Reim klingen Endsilben exakt gleich, beim unreinen klingen sie nur ähnlich',
          'Beim reinen Reim stehen Reimwörter in einer Zeile, beim unreinen in getrennten Versen',
          'Beim reinen Reim gibt es immer vier Hebungen, beim unreinen schwankt das Metrum stark',
        ],
        correctAnswers: [
          'Beim reinen Reim klingen Endsilben exakt gleich, beim unreinen klingen sie nur ähnlich',
        ],
        hint: 'Klassische Dichter nutzten unreine Reime oft bei Umlauten (ä/e oder ö/e).',
      },
    ],
    teacherNotes:
      'In der Klassenarbeit Buchstaben (a, b, c) sauber an den rechten Rand jeder Gedichtzeile schreiben lassen.',
  },

  // =========================================================================
  // 4. SPEZIAL-TRAINING: STILMITTEL & WIRKUNG – 10 AUFGABEN
  // Alliteration, Anapher, Personifikation, Metapher, Vergleich, Hyperbel
  // =========================================================================
  {
    id: 'balladen-spezial-stilmittel',
    topicSlug: 'spezial-stilmittel',
    date: '05.10.2026',
    title: 'Intensivtraining 3: Stilmittel & Wirkung blitzschnell erkennen',
    subject: 'Deutsch',
    topic: 'Stilmittel & Textwirkung',
    dateBadge: '10 Spezialaufgaben: Stilmittel',
    description:
      'Hier trainierst du die 6 wichtigsten Stilmittel der Klassenarbeit und deren exakte Wirkung: Alliteration, Anapher, Personifikation, Metapher, Vergleich und Hyperbel.',
    type: 'input',
    hideSampleSolution: true,
    inputQuestions: [
      {
        id: 'ss1',
        prompt: '1. „Wind und Wellen wüten wild.“ Welches sprachliche Stilmittel liegt in dieser Zeile vor?',
        interactionType: 'choice',
        options: [
          'Metapher',
          'Alliteration',
          'Hyperbel',
          'Vergleich',
        ],
        correctAnswers: ['Alliteration'],
        hint: 'Vier Wörter hintereinander beginnen mit demselben Buchstaben „W“.',
      },
      {
        id: 'ss2',
        prompt: '2. WIRKUNG: Welche Wirkung erzielt diese Lautfigur in „Wind und Wellen wüten wild“ auf den Hörer?',
        interactionType: 'choice',
        options: [
          'Sie verlangsamt das Lesetempo deutlich und erzeugt eine feierliche Stimmung',
          'Sie erzeugt durch den wiederholten Anlaut einen stürmischen, packenden Klang',
          'Sie stellt zwei sachliche Argumente für eine spätere Erörterung gegenüber',
          'Sie schwächt die Dramatik komplett ab und lässt Naturgewalten harmlos wirken',
        ],
        correctAnswers: [
          'Sie erzeugt durch den wiederholten Anlaut einen stürmischen, packenden Klang',
        ],
        hint: 'Der wiederholte W-Laut malt das Rauschen des Sturms klanglich nach.',
      },
      {
        id: 'ss3',
        prompt: '3. „Er sieht hinauf, / Er sieht hinab, / Er wendet sich zum Tor.“ Welches Stilmittel erkennst du an den Zeilenanfängen?',
        interactionType: 'choice',
        options: [
          'Anapher',
          'Alliteration',
          'Personifikation',
          'Rhetorische Frage',
        ],
        correctAnswers: ['Anapher'],
        hint: 'Die Zeilen beginnen mit exakt denselben Worten („Er sieht...“).',
      },
      {
        id: 'ss4',
        prompt: '4. WIRKUNG: Welche Wirkung erzielt diese gezielte Wiederholung an den Zeilenanfängen auf die Stimmung?',
        interactionType: 'choice',
        options: [
          'Sie unterbricht den Erzählfluss komplett und führt zu einem Themawechsel',
          'Sie steigert die Eindringlichkeit, erzeugt Spannung und treibt die Handlung voran',
          'Sie beruhigt die dramatische Szene und erzeugt eine heitere Grundstimmung',
          'Sie schwächt die Kernaussage ab und distanziert den Erzähler vom Geschehen',
        ],
        correctAnswers: [
          'Sie steigert die Eindringlichkeit, erzeugt Spannung und treibt die Handlung voran',
        ],
        hint: 'Die wiederholte Satzstruktur erzeugt einen pochenden, dringlichen Rhythmus.',
      },
      {
        id: 'ss5',
        prompt: '5. „Die Flammen leckten gierig an den Schlossmauern.“ Welches Stilmittel liegt hier vor?',
        interactionType: 'choice',
        options: [
          'Personifikation',
          'Alliteration',
          'Hyperbel',
          'Vergleich',
        ],
        correctAnswers: ['Personifikation'],
        hint: 'Dem leblosen Feuer werden menschliche/tierische Eigenschaften („leckten gierig“) verliehen.',
      },
      {
        id: 'ss6',
        prompt: '6. WIRKUNG: Warum setzt der Dichter die Vermenschlichung in „Die Flammen leckten gierig“ ein?',
        interactionType: 'choice',
        options: [
          'Damit das Feuer wie ein lebendiges, gefährliches Raubtier wirkt und Angst erzeugt',
          'Damit die chemische Entstehung des Brandes physikalisch exakt beschrieben wird',
          'Damit der Leser erfährt, aus welchen Baustoffen die Schlossmauer beschaffen ist',
          'Damit das Brandgeschehen als harmloses, friedlich wärmendes Licht erscheint',
        ],
        correctAnswers: [
          'Damit das Feuer wie ein lebendiges, gefährliches Raubtier wirkt und Angst erzeugt',
        ],
        hint: 'Die Vermenschlichung macht die Gefahr lebendig und bedrohlich.',
      },
      {
        id: 'ss7',
        prompt: '7. „Sein Zorn war ein Vulkan, der plötzlich ausbrach.“ Welches Stilmittel liegt hier vor?',
        interactionType: 'choice',
        options: [
          'Vergleich',
          'Metapher',
          'Alliteration',
          'Anapher',
        ],
        correctAnswers: [
          'Metapher',
        ],
        hint: 'Der Zorn WIRD bildlich als Vulkan bezeichnet (ohne das Wörtchen „wie“).',
      },
      {
        id: 'ss8',
        prompt: '8. Wie unterscheidet sich eine direkte bildhafte Übertragung von einem sprachlichen Vergleich?',
        interactionType: 'choice',
        options: [
          'Ein Vergleich verknüpft mit Signalwörtern wie „wie“, die Übertragung setzt das Bild direkt',
          'Ein Vergleich nutzt immer Reime am Versende, die Übertragung verzichtet komplett auf Reime',
          'Ein Vergleich kommt nur in Prosatexten vor, die Übertragung steht nur in lyrischen Balladen',
          'Ein Vergleich beschreibt reale Personen, die Übertragung nur erfundene Märchengestalten',
        ],
        correctAnswers: [
          'Ein Vergleich verknüpft mit Signalwörtern wie „wie“, die Übertragung setzt das Bild direkt',
        ],
        hint: 'Suche immer nach dem Vergleichswort „wie“!',
      },
      {
        id: 'ss9',
        prompt: '9. „Ein Meer von Tränen floss die Wangen herab.“ Welches Stilmittel liegt vor?',
        interactionType: 'choice',
        options: [
          'Alliteration',
          'Hyperbel',
          'Anapher',
          'Rhetorische Frage',
        ],
        correctAnswers: [
          'Hyperbel',
        ],
        hint: 'Niemand kann buchstäblich ein ganzes Meer weinen – das Gefühl wird gigantisch übersteigert.',
      },
      {
        id: 'ss10',
        prompt: '10. „Wer könnte bei solch einem traurigen Anblick noch tatenlos zusehen?“ Welches Stilmittel liegt vor?',
        interactionType: 'choice',
        options: [
          'Rhetorische Frage',
          'Metapher',
          'Personifikation',
          'Paarreim',
        ],
        correctAnswers: [
          'Rhetorische Frage',
        ],
        hint: 'Der Dichter erwartet keine Antwort, sondern bindet die Zuhörer emotional ein.',
      },
    ],
    teacherNotes:
      'Immer das 3-Schritt-Verfahren üben: 1. Stilmittel mit Zitat benennen, 2. Textstelle übersetzen, 3. Konkrete Wirkung auf den Leser begründen.',
  },
];

export const unit05102026: DailyLearningUnit = {
  id: 'balladen-05.10.2026',
  date: '05.10.2026',
  title: 'Tages-Lerneinheit: 05.10.2026',
  description:
    'Finale Vorbereitung auf die Klassenarbeit morgen: Goethes Meisterballade „Der Zauberlehrling“ (TATTZ, Metrum, Reimschema, W-Fragen) sowie 3 Spezial-Trainings mit je 10 Aufgaben zu Metrum, Reimschema und Stilmitteln.',
  tasks: balladenTasksDay2,
};

export { balladenTasksDay2 };
