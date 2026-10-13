import { Task, DailyLearningUnit } from '@/types/student';

const eroerterungTasksDay2: Task[] = [
  {
    id: 'eroerterung-schreibtraining-schulbeginn',
    topicSlug: 'schreibtraining-schulbeginn',
    date: '05.10.2026',
    title: 'Beispielthema & Schreibtraining: Späterer Schulbeginn ab 8:30 Uhr',
    subject: 'Deutsch',
    topic: 'Erörterung: Schreibtraining',
    dateBadge: 'Schreibtraining zur Klassenarbeit',
    description:
      'Vorbereitung auf die Klassenarbeit: Schritt-für-Schritt-Leitfaden anhand des Themas „Späterer Schulbeginn“ – Einleitung mit Problemfrage, Hauptteil (Sanduhr-Prinzip & 3B-Schema) und überzeugender Schlussteil.',
    type: 'input',
    hideSampleSolution: true,
    readingText: {
      title: 'Themenstellung & Leitfaden zur Erörterung für die Klassenarbeit',
      content: `THEMA FÜR DEINE ERÖRTERUNG:
„Sollte der Unterricht an weiterführenden Schulen morgens erst um 8:30 Uhr (oder 9:00 Uhr) beginnen?“

═══════════════════════════════════════════════════════════
DEIN SCHREIB-LEITFADEN FÜR DIE KLASSENARBEIT
═══════════════════════════════════════════════════════════

1. DIE EINLEITUNG (ca. 10–15 % des Gesamttextes)
• Aufhänger aus dem Alltag: Wie sieht der typische Schulmorgen aus? Der Wecker klingelt um 6:00 Uhr im Dunkeln, gähnende Gesichter an der Bushaltestelle, die erste Stunde Mathe im Halbschlaf.
• Hinführung zum Problem: Viele Schlafforscher und Schüler fordern deshalb einen späteren Schulstart, während Eltern und Sportvereine organisatorische Bedenken äußern.
• Die Problemfrage (am Ende der Einleitung): Formuliere eine neutrale, ergebnisoffene Entscheidungsfrage:
  „Daher stellt sich die Frage: Sollte der Unterricht an weiterführenden Schulen morgens erst um 8:30 Uhr beginnen?“
⚠️ Wichtig: Deine eigene Meinung hat in der Einleitung noch nichts verloren!

2. DER HAUPTTEIL: DAS SANDUHR-PRINZIP (ca. 70–75 % des Gesamttextes)
Entscheide dich vor dem Schreiben für deine eigene Haltung (z. B. Pro = für den späteren Beginn).

BLOCK 1: DIE GEGENSEITE (CONTRA) – VOM STÄRKSTEN ZUM SCHWÄCHSTEN ARGUMENT
• 1. Stärkstes Gegenargument: Nachmittagsunterricht kollidiert mit Freizeit & Sport
  (Wenn die Schule erst um 8:30 oder 9:00 Uhr startet, verschiebt sich das Schulende nach hinten. Für Sportvereine, Musikunterricht, Hobbys und Hausaufgaben bleibt am Nachmittag kaum noch Zeit).
• 2. Mittleres Gegenargument: Abstimmung mit den Arbeitszeiten berufstätiger Eltern
  (Viele Eltern müssen früh aus dem Haus; jüngere Geschwister müssten morgens allein zurechtkommen).
• 3. Schwächstes Gegenargument: Schulbusse und Verkehrsbetriebe müssten ihre Fahrpläne anpassen.

DER WENDEPUNKT (GEDANKLICHE BRÜCKE)
• Verbinde beide Blöcke mit einem klaren Übergangssatz, z. B.:
  „Auch wenn die Bedenken hinsichtlich der Nachmittagsgestaltung nachvollziehbar sind, sprechen dennoch gewichtige Gründe für einen späteren Unterrichtsbeginn...“

BLOCK 2: DEINE EIGENE SEITE (PRO) – VOM SCHWÄCHSTEN ZUM STÄRKSTEN (STEIGERUNG ZUM HÖHEPUNKT!)
• 1. Schwächstes Pro-Argument: Mehr Ruhe und weniger Hektik am morgendlichen Frühstückstisch.
• 2. Mittleres Pro-Argument: Erhöhte Aufmerksamkeit und bessere Beteiligung in den ersten beiden Schulstunden.
• 3. STÄRKSTES Pro-Argument (direkt vor dem Schluss!): Der biologische Schlafrhythmus von Jugendlichen
  (Medizinische Studien belegen, dass Jugendliche in der Pubertät durch die hormonelle Umstellung abends später müde werden und morgens physiologisch mehr Schlaf benötigen. Zu früher Schulbeginn führt zu chronischem Schlafmangel und Konzentrationsproblemen).

DAS 3B-SCHEMA FÜR JEDES ARGUMENT:
1. Behauptung: Deine klare Kernaussage.
2. Begründung: Warum ist das so? (Signalwörter: weil, da, denn...)
3. Beispiel / Beleg: Ein konkretes, anschauliches Alltagsbeispiel oder eine nachvollziehbare Beobachtung aus der Schule.

3. DER SCHLUSSTEIL (ca. 10–15 % des Gesamttextes)
• Zusammenfassung & Wertung: Die wichtigsten Argumente beider Seiten kurz abwägen.
• Eigene begründete Meinung: Jetzt darfst du „Ich“ sagen! Beziehe klar Stellung und begründe, welches Argument für dich persönlich den Ausschlag gibt.
• Kompromiss / Ausblick: Finde eine alltagstaugliche Lösung (z. B. 8:30 Uhr als maßvoller Mittelweg statt 9:00 Uhr, oder eine freiwillige Gleitzeit/Selbstlernzeit ab 8:00 Uhr für Frühaufsteher).
• Kreis schließen: Schlage den Bogen zurück zu deiner Problemfrage aus der Einleitung!`,
      source: 'Schreibwerkstatt Deutsch: Vorbereitung auf die dialektische Erörterung',
    },
    inputQuestions: [
      {
        id: 't_sb_q1',
        prompt: '1. Welche Formulierung eignet sich am besten als neutrale, ergebnisoffene Problemfrage für die Einleitung?',
        interactionType: 'choice',
        options: [
          '„Warum ist der Beginn um 8:00 Uhr die reinste Schikane für alle Jugendlichen?“',
          '„Sollte der Unterricht an weiterführenden Schulen morgens erst um 8:30 Uhr beginnen?“',
          '„Wie viele Stunden schlafen Jugendliche durchschnittlich an freien Schultagen?“',
          '„Zu welcher genauen Uhrzeit begann der reguläre Schulbetrieb in früheren Zeiten?“',
        ],
        correctAnswers: [
          '„Sollte der Unterricht an weiterführenden Schulen morgens erst um 8:30 Uhr beginnen?“',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Eine gelungene Problemfrage formuliert eine Entscheidungsfrage mit „Sollte...“, ohne die Antwort vorwegzunehmen.',
        sampleSolution: '„Sollte der Unterricht an weiterführenden Schulen morgens erst um 8:30 Uhr beginnen?“',
      },
      {
        id: 't_sb_q2',
        prompt: '2. Wie ordnest du die Gegenargumente im Hauptteil nach dem Sanduhr-Prinzip an, wenn du persönlich FÜR den späteren Schulbeginn argumentierst?',
        interactionType: 'choice',
        options: [
          'Gegenargumente (stark nach schwach), Wendepunkt, eigene Argumente (schwach nach stark)',
          'Eigene Argumente (stark nach schwach), Wendepunkt, Gegenargumente (schwach nach stark)',
          'Alle Argumente völlig durcheinander, ohne erkennbare Wertung oder Reihenfolge',
          'Nur die eigene Meinung aufschreiben und Gegenargumente komplett weglassen',
        ],
        correctAnswers: [
          'Gegenargumente (stark nach schwach), Wendepunkt, eigene Argumente (schwach nach stark)',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Beim Sanduhr-Prinzip entkräftest du zuerst die Gegenseite und steigerst dich danach zu deinem eigenen stärksten Argument.',
        sampleSolution:
          'Gegenargumente (stark nach schwach), Wendepunkt, eigene Argumente (schwach nach stark)',
      },
      {
        id: 't_sb_q3',
        prompt: '3. Baue ein vollständiges Pro-Argument nach dem 3B-Schema aus den Bausteinen zusammen:',
        interactionType: 'sentence_builder',
        tiles: [
          'wie müde gesichter in der ersten stunde beweisen',
          'weil der biologische schlafrhythmus morgens mehr schlaf verlangt,',
          'ein späterer schulstart fördert das lernen',
        ],
        correctAnswers: [
          'Ein späterer Schulstart fördert das Lernen, weil der biologische Schlafrhythmus morgens mehr Schlaf verlangt, wie müde Gesichter in der ersten Stunde beweisen.',
          'Weil der biologische Schlafrhythmus morgens mehr Schlaf verlangt, fördert ein späterer Schulstart das Lernen, wie müde Gesichter in der ersten Stunde beweisen.',
        ],
        placeholder: 'Ordne die Satzbausteine...',
        hint: 'Beginne mit der Behauptung („Ein späterer Schulstart...“), schließe die Begründung mit Komma an und beende mit dem anschaulichen Beleg.',
        sampleSolution:
          'Ein späterer Schulstart fördert das Lernen, weil der biologische Schlafrhythmus morgens mehr Schlaf verlangt, wie müde Gesichter in der ersten Stunde beweisen.',
      },
      {
        id: 't_sb_q4',
        prompt: '4. Welcher Übergang markiert den perfekten Wendepunkt zwischen dem Contra-Block und deinem Pro-Block?',
        interactionType: 'choice',
        options: [
          '„Auch wenn die Bedenken berechtigt sind, sprechen gewichtigere Gründe für einen späteren Beginn.“',
          '„Damit sind die Bedenken erledigt, weshalb die Gegenseite hier vollkommen im Unrecht ist.“',
          '„Obwohl beide Seiten recht haben, breche ich den Hauptteil an dieser Stelle ab.“',
          '„Nachdem nun alles gesagt wurde, folgt hier der Schlussteil mit meiner persönlichen Note.“',
        ],
        correctAnswers: [
          '„Auch wenn die Bedenken berechtigt sind, sprechen gewichtigere Gründe für einen späteren Beginn.“',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Der Wendepunkt erkennt das stärkste Gegenargument sachlich an („Auch wenn...“), leitet aber zur eigenen Argumentation über („dennoch...“).',
        sampleSolution:
          '„Auch wenn die Bedenken berechtigt sind, sprechen gewichtigere Gründe für einen späteren Beginn.“',
      },
      {
        id: 't_sb_q5',
        prompt: '5. Welcher Kompromissvorschlag verbindet im Schlussteil die Interessen von Schülern, Eltern und Vereinen am sinnvollsten?',
        interactionType: 'choice',
        options: [
          'Schulstart maßvoll auf 8:30 Uhr legen und davor eine betreute Lernzeit ab 8:00 Uhr anbieten',
          'Schulstart unverändert lassen und die Hausaufgaben an allen Wochentagen komplett streichen',
          'Schulstart flexibel jedem einzelnen Schüler selbst überlassen, ohne feste Stundenpläne',
          'Schulstart auf den späten Nachmittag verlegen und den gesamten Unterricht abends abhalten',
        ],
        correctAnswers: [
          'Schulstart maßvoll auf 8:30 Uhr legen und davor eine betreute Lernzeit ab 8:00 Uhr anbieten',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Ein gelungener Kompromiss schlägt eine Brücke: Mehr Schlaf für Jugendliche, aber verlässliche Randzeiten für Eltern und Vereine.',
        sampleSolution:
          'Schulstart maßvoll auf 8:30 Uhr legen und davor eine betreute Lernzeit ab 8:00 Uhr anbieten',
      },
      {
        id: 't_sb_q6',
        prompt:
          '6. Deine eigene Erörterung schreiben (Schreibtraining für die Klassenarbeit):\nFormuliere jetzt deine eigene Kurz-Erörterung zum Thema „Späterer Schulbeginn ab 8:30 Uhr“.\n\nOrientiere dich an diesen drei Bausteinen:\n1. Einleitung: Schilderung des typischen Schulmorgens + neutrale Problemfrage\n2. Hauptteil: Dein stärkstes Argument nach dem 3B-Schema (Behauptung, Begründung mit „weil/da“, anschauliches Alltagsbeispiel)\n3. Schluss: Dein persönliches Fazit mit Begründung und einem alltagstauglichen Kompromissvorschlag',
        isOpenEnded: true,
        placeholder:
          '1. Einleitung:\nJeden Morgen klingelt der Wecker...\nDaher stellt sich die Frage:...\n\n2. Mein stärkstes Argument (3B-Schema):\nBehauptung: Ein späterer Schulbeginn führt zu...\nBegründung: Denn Jugendliche...\nBeispiel: Das merkt man daran, dass...\n\n3. Mein Fazit & Kompromiss:\nMeiner Ansicht nach überwiegen...\nAls sinnvollen Kompromiss schlage ich vor:...',
        hint: 'Schreibe in eigenen Worten. Achte auf den roten Faden: Alltagsaufhänger in der Einleitung, ein klares 3B-Argument im Hauptteil und dein begründetes Fazit mit Kompromiss am Schluss.',
        sampleSolution:
          'Musterbeispiel für die Klassenarbeit:\n\n1. Einleitung:\nUm 6:00 Uhr morgens klingelt der Wecker, draußen ist es noch stockdunkel. Viele Schülerinnen und Schüler schleppen sich übermüdet zur Bushaltestelle und sitzen in den ersten beiden Stunden wie betäubt auf ihren Plätzen. Daher stellt sich die berechtigte Frage: Sollte der Unterricht an weiterführenden Schulen morgens erst um 8:30 Uhr beginnen?\n\n2. Hauptteil (3B-Schema):\nFür einen späteren Unterrichtsbeginn spricht vor allem die verbesserte Leistungsfähigkeit im Unterricht. Dies liegt daran, dass der biologische Schlafrhythmus Jugendlicher in der Pubertät nachweislich nach hinten verschoben ist und der Körper um 8:00 Uhr morgens schlicht noch nicht auf Höchstleistung eingestellt ist. An meiner eigenen Schule sieht man das deutlich daran, dass in den ersten Stunden kaum jemand die Hand hebt und schlechtere Noten in unangekündigten Tests geschrieben werden als in der vierten oder fünften Stunde.\n\n3. Schluss:\nZusammenfassend lässt sich sagen, dass ein Unterrichtsbeginn um 8:30 Uhr die Konzentration und Gesundheit der Jugendlichen enorm fördern würde. Auch wenn sich der Schultag dadurch um eine halbe Stunde nach hinten verschiebt, halte ich diesen Schritt für dringend notwendig. Als Kompromiss könnte die Schule ab 8:00 Uhr eine offene Arbeits- und Frühstückszeit anbieten, sodass Frühaufsteher bereits in der Schule lernen können, während alle anderen ausgeruht um 8:30 Uhr starten.',
      },
    ],
    teacherNotes:
      'Vor der Klassenarbeit den Textentwurf auf die 3Bs (Behauptung, Begründung, anschauliches Beispiel), die neutrale Problemfrage und den Kompromissvorschlag im Schlussteil prüfen.',
  },
  {
    id: 'eroerterung-textanalyse-4-esport',
    topicSlug: 'thesen-esport',
    date: '05.10.2026',
    title: 'Textanalyse 4: E-Sport als Schulfach & Vereinssport',
    subject: 'Deutsch',
    topic: 'Thesen & Argumente im Text',
    dateBadge: 'Textanalyse 4 von 5',
    description:
      'Lies den Debattenbeitrag zu Gaming und E-Sport aufmerksam durch. Finde für jeden nummerierten Satz heraus, welche Funktion er erfüllt: These, Argument, Beleg (Studie) oder Gegenargument.',
    type: 'input',
    hideSampleSolution: true,
    readingText: {
      title: 'Vorgelegter Debattenbeitrag: E-Sport an Schulen – Zukunftsdisziplin oder reine Zockerei?',
      content: `[1] Professioneller E-Sport und wettkampforientiertes Gaming sollten als offizieller Schulsport an weiterführenden Schulen anerkannt werden.

[2] Denn strategische Videospiele trainieren nachweislich blitzschnelle Reaktionszeiten, räumliches Denkvermögen und komplexe Teamabsprachen unter hohem Druck.

[3] Eine vergleichende Untersuchung der Deutschen Sporthochschule Köln aus dem Jahr 2024 belegt, dass jugendliche E-Sportler bei kognitiven Koordinationstests um 31 Prozent besser abschnitten als der Durchschnitt ihrer Altersgruppe.

[4] Dagegen wenden Sportmediziner und Lehrerverbände ein, dass stundenlanges Sitzen vor Bildschirmen die ohnehin weit verbreitete Bewegungsarmut verschärft und traditionelle körperliche Fitness vernachlässigt.

[5] Aus gesundheitlicher Sicht darf digitaler Sport daher keinesfalls echten Schulsport ersetzen, sondern Schulen müssen vorrangig Bewegung an frischer Luft fördern.`,
      source: 'Jugendsport & Gesellschaft 2025',
    },
    inputQuestions: [
      {
        id: 't4a_q1',
        prompt: '1. Welche Rolle spielt Satz [1] im Text?',
        context:
          'Satz [1]: „Professioneller E-Sport und wettkampforientiertes Gaming sollten als offizieller Schulsport... anerkannt werden.“',
        interactionType: 'choice',
        options: [
          'Argument',
          'These',
          'Beleg',
          'Gegenargument',
        ],
        correctAnswers: [
          'These',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Hier wird die zentrale These formuliert, die die Debatte eröffnet.',
        sampleSolution: 'These',
      },
      {
        id: 't4a_q2',
        prompt: '2. Welche Rolle spielt Satz [2] im Verhältnis zu Satz [1]?',
        context:
          'Satz [2]: „Denn strategische Videospiele trainieren nachweislich blitzschnelle Reaktionszeiten, räumliches Denkvermögen...“',
        interactionType: 'choice',
        options: [
          'These',
          'Beleg',
          'Argument',
          'Schlussgedanke',
        ],
        correctAnswers: ['Argument'],
        placeholder: 'Wähle die passende Option...',
        hint: 'Achte auf das Signalwort „Denn...“ – hier wird geliefert, WARUM die Forderung erhoben wird.',
        sampleSolution: 'Argument',
      },
      {
        id: 't4a_q3',
        prompt: '3. Welche Funktion erfüllt Satz [3] im Textaufbau?',
        context:
          'Satz [3]: „Eine vergleichende Untersuchung der Deutschen Sporthochschule Köln aus dem Jahr 2024 belegt, dass jugendliche E-Sportler... um 31 % besser abschnitten...“',
        interactionType: 'choice',
        options: [
          'These',
          'Gegenargument',
          'Eigene Meinung',
          'Beleg',
        ],
        correctAnswers: [
          'Beleg',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Hochschule, Jahreszahl und messbare Prozentwerte stützen das vorangegangene Argument als Beleg.',
        sampleSolution: 'Beleg',
      },
      {
        id: 't4a_q4',
        prompt: '4. Welche Rolle spielt Satz [4] im Text?',
        context:
          'Satz [4]: „Dagegen wenden Sportmediziner und Lehrerverbände ein, dass stundenlanges Sitzen vor Bildschirmen... Bewegungsarmut verschärft...“',
        interactionType: 'choice',
        options: [
          'Gegenargument',
          'Pro-Argument',
          'Zusammenfassung',
          'Einleitungssatz',
        ],
        correctAnswers: ['Gegenargument'],
        placeholder: 'Wähle die passende Option...',
        hint: 'Das Signalwort „Dagegen wenden... ein“ wechselt zur kritischen Contra-Perspektive.',
        sampleSolution: 'Gegenargument',
      },
      {
        id: 't4a_q5',
        prompt: '5. Welche Rolle spielt Satz [5] im Text?',
        context:
          'Satz [5]: „Aus gesundheitlicher Sicht darf digitaler Sport daher keinesfalls echten Schulsport ersetzen, sondern Schulen müssen vorrangig Bewegung... fördern.“',
        interactionType: 'choice',
        options: [
          'Beleg',
          'Gegenthese',
          'Pro-Argument',
          'Einleitungssatz',
        ],
        correctAnswers: [
          'Gegenthese',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Hier wird die gegenteilige Forderung als Konsequenz formuliert.',
        sampleSolution: 'Gegenthese',
      },
      {
        id: 't4a_q6',
        prompt: '6. An welchem Signalwort in Satz [2] erkennst du sofort eine Begründung (Argument)?',
        context: '„Denn strategische Videospiele trainieren...“',
        interactionType: 'choice',
        options: [
          'Gaming',
          'Videospiele',
          'Denn',
          'Schulsport',
        ],
        correctAnswers: ['Denn'],
        placeholder: 'Wähle die passende Option...',
        hint: 'Typische Signalwörter für Argumente und Begründungen sind „denn“, „weil“ oder „da“.',
        sampleSolution: 'Denn',
      },
    ],
    teacherNotes:
      'Lernenden zeigen: Satz 1 = Behauptung, Satz 2 = Begründung, Satz 3 = Beleg. Das ist das klassische 3B-Schema!',
  },
  {
    id: 'eroerterung-textanalyse-5-noten',
    topicSlug: 'thesen-schulnoten',
    date: '05.10.2026',
    title: 'Textanalyse 5: Abschaffung traditioneller Ziffernnoten',
    subject: 'Deutsch',
    topic: 'Thesen & Argumente im Text',
    dateBadge: 'Textanalyse 5 von 5',
    description:
      'Lies den Debattenbeitrag zur Ziffernnoten-Debatte aufmerksam durch. Bestimme für jeden nummerierten Satz die Funktion: These, Argument, Beleg (Modellversuch), Gegenargument oder Gegenthese.',
    type: 'input',
    hideSampleSolution: true,
    readingText: {
      title: 'Vorgelegter Debattenbeitrag: Ziffernnoten abschaffen – Mehr Lernfreude ohne Notendruck?',
      content: `[1] Das traditionelle System von Ziffernnoten von eins bis sechs sollte an allen Schulen abgeschafft und durch ausführliche Lernentwicklungsberichte ersetzt werden.

[2] Weil starre Ziffernnoten enormen Leistungsdruck und Versagensängste erzeugen, anstatt individuelle Lernfortschritte und persönliche Stärken differenziert zu würdigen.

[3] Dies belegt ein vierjähriger Modellversuch an dreißig Gemeinschaftsschulen in Schleswig-Holstein: Nach dem Verzicht auf Ziffernnoten sank das stressbedingte Unwohlsein der Schülerschaft um 42 Prozent, während die intrinsische Lernmotivation messbar stieg.

[4] Befürworter von Schulnoten halten jedoch dagegen, dass Ziffernnoten ein klares, bundesweit vergleichbares Leistungsfeedback liefern und Jugendliche auf die Leistungsanforderungen des späteren Berufslebens vorbereiten.

[5] Folglich sollte das bewährte Notensystem beibehalten werden, um eine objektive und transparente Leistungsbewertung zu garantieren.`,
      source: 'Pädagogik Aktuell 2025',
    },
    inputQuestions: [
      {
        id: 't5a_q1',
        prompt: '1. Welcher Satz formuliert in diesem Debattenbeitrag die zentrale These (Hauptforderung)?',
        context: 'Lies den Textanfang.',
        interactionType: 'choice',
        options: [
          'Satz [2]',
          'Satz [1]',
          'Satz [3]',
          'Satz [4]',
        ],
        correctAnswers: [
          'Satz [1]',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Satz 1 formuliert den strittigen Reformvorschlag, um den sich der gesamte Text dreht.',
        sampleSolution: 'Satz [1]',
      },
      {
        id: 't5a_q2',
        prompt: '2. Welche Funktion erfüllt Satz [2] im Textaufbau?',
        context:
          'Satz [2]: „Weil starre Ziffernnoten enormen Leistungsdruck und Versagensängste erzeugen...“',
        interactionType: 'choice',
        options: [
          'These',
          'Contra-Argument',
          'Belegstudie',
          'Argument',
        ],
        correctAnswers: [
          'Argument',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Das Wort „Weil...“ begründet die Ursache, weshalb Noten abgeschafft werden sollten.',
        sampleSolution: 'Argument',
      },
      {
        id: 't5a_q3',
        prompt: '3. Wie wird die Aussage in Satz [3] mit einem handfesten Beweis (Beleg) untermauert?',
        context:
          'Satz [3]: „Dies belegt ein vierjähriger Modellversuch an dreißig Gemeinschaftsschulen... sank das Unwohlsein um 42 Prozent...“',
        interactionType: 'choice',
        options: [
          'Durch einen empirischen Modellversuch mit überprüfbaren Zahlen und Dauer',
          'Durch eine bloße Vermutung ohne wissenschaftliche Grundlage oder Belege',
          'Durch eine kurze Erzählung über das persönliche Wohlbefinden eines Schülers',
          'Durch eine allgemeine Meinungsäußerung ohne statistische Vergleichswerte',
        ],
        correctAnswers: [
          'Durch einen empirischen Modellversuch mit überprüfbaren Zahlen und Dauer',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: '30 Schulen, 4 Jahre Dauer und 42 Prozent weniger Unwohlsein bilden einen handfesten Beleg.',
        sampleSolution: 'Durch einen empirischen Modellversuch mit überprüfbaren Zahlen und Dauer',
      },
      {
        id: 't5a_q4',
        prompt: '4. Welche Rolle spielt Satz [4] im Text?',
        context:
          'Satz [4]: „Befürworter von Schulnoten halten jedoch dagegen, dass Ziffernnoten ein klares... Feedback liefern...“',
        interactionType: 'choice',
        options: [
          'Gegenargument',
          'Pro-Argument',
          'Wiederholung',
          'Einleitung',
        ],
        correctAnswers: [
          'Gegenargument',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: '„halten jedoch dagegen...“ leitet das Gegenargument der Gegenseite ein.',
        sampleSolution: 'Gegenargument',
      },
      {
        id: 't5a_q5',
        prompt: '5. Welche Rolle spielt Satz [5] im Verhältnis zur Debatte?',
        context:
          'Satz [5]: „Folglich sollte das bewährte Notensystem beibehalten werden, um eine objektive... Bewertung zu garantieren.“',
        interactionType: 'choice',
        options: [
          'Belegstudie',
          'Gegenthese',
          'Einleitungssatz',
          'Pro-Argument',
        ],
        correctAnswers: [
          'Gegenthese',
        ],
        placeholder: 'Wähle die passende Option...',
        hint: 'Aus dem Gegenargument wird die gegenteilige Hauptforderung (Gegenthese) abgeleitet.',
        sampleSolution: 'Gegenthese',
      },
      {
        id: 't5a_q6',
        prompt: '6. An welchem Signalwort in Satz [2] erkennst du sofort die kausale Begründung (das Argument)?',
        context: '„Weil starre Ziffernnoten enormen Leistungsdruck... erzeugen...“',
        interactionType: 'choice',
        options: [
          'Noten',
          'Leistungsdruck',
          'Weil',
          'Schule',
        ],
        correctAnswers: ['Weil'],
        placeholder: 'Wähle die passende Option...',
        hint: 'Das Wort „weil“ leitet immer eine kausale Begründung ein.',
        sampleSolution: 'Weil',
      },
    ],
    teacherNotes:
      'Mit den Lernenden vergleichen, wie Signalwörter („denn“, „weil“, „dagegen“, „folglich“) die logische Textstruktur anzeigen.',
  },
];

export const unit05102026: DailyLearningUnit = {
  id: 'eroerterung-05.10.2026',
  date: '05.10.2026',
  title: 'Tages-Lerneinheit: 05.10.2026',
  description:
    'Finale Vorbereitung auf die Klassenarbeit: Schreibtraining zum Thema „Späterer Schulbeginn“ mit praxisnahem Leitfaden sowie 2 Textanalysen (E-Sport & Ziffernnoten).',
  tasks: eroerterungTasksDay2,
};

export { eroerterungTasksDay2 };
