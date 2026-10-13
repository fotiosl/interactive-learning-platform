import { Task, DailyLearningUnit } from '@/types/student';

const eroerterungTasks: Task[] = [
  {
    id: 'eroerterung-textanalyse-1-smartphones',
    topicSlug: 'thesen-smartphones',
    date: '03.10.2026',
    title: 'Textanalyse 1: Smartphone-Verbot an Schulen',
      subject: 'Deutsch',
      topic: 'Thesen & Argumente im Text',
      dateBadge: 'Textanalyse 1 von 3',
      description:
        'Lies den folgenden Debattenbeitrag aufmerksam durch. Finde für jeden nummerierten Satz heraus, ob es sich um eine These (Behauptung), ein Argument (Begründung), einen Beleg (Studie) oder ein Gegenargument handelt.',
      type: 'input',
      hideSampleSolution: true,
      readingText: {
        title: 'Vorgelegter Debattenbeitrag: Smartphone-Verbot an weiterführenden Schulen',
        content: `[1] Smartphones sollten an allen weiterführenden Schulen während des gesamten Schultags ausnahmslos verboten werden.

[2] Denn die ständige Erreichbarkeit und aufploppende Benachrichtigungen lenken Schülerinnen und Schüler massiv vom Unterrichtsgeschehen und von den Lerninhalten ab.

[3] Eine wissenschaftliche Langzeitstudie der Universität London aus dem Jahr 2023 belegt, dass die Noten an Schulen mit striktem Handyverbot um durchschnittlich 6,4 Prozent besser ausfielen und die Konzentration im Unterricht deutlich zunahm.

[4] Allerdings betonen Kritiker eines Verbots, dass Jugendliche den verantwortungsvollen und kritischen Umgang mit digitalen Medien nur dann erlernen können, wenn Smartphones aktiv und pädagogisch begleitet in den Unterricht integriert werden.

[5] Aus diesem Grund wäre ein vollständiges Verbot ein Rückschritt in die digitale Steinzeit und Schulen sollten stattdessen verbindliche Mediennutzungsregeln erarbeiten.`,
        source: 'Jugend & Medien Magazin 2024',
      },
      inputQuestions: [
        {
          id: 't1_q1',
          prompt: '1. Welche Rolle spielt Satz [1] im Text?',
          context:
            'Satz [1]: „Smartphones sollten an allen weiterführenden Schulen während des gesamten Schultags ausnahmslos verboten werden.“',
          interactionType: 'choice',
          options: [
            'Argument',
            'These',
            'Beleg',
            'Gegenargument',
          ],
          correctAnswers: ['These'],
          hint: 'Hier wird die zentrale Behauptung (Forderung) aufgestellt, noch ohne Begründung.',
        },
        {
          id: 't1_q2',
          prompt: '2. Welche Rolle spielt Satz [2] im Text?',
          context:
            'Satz [2]: „Denn die ständige Erreichbarkeit und aufploppende Benachrichtigungen lenken Schülerinnen und Schüler massiv vom Unterrichtsgeschehen... ab.“',
          interactionType: 'choice',
          options: [
            'These',
            'Beleg',
            'Argument',
            'Schlussfolgerung',
          ],
          correctAnswers: ['Argument'],
          hint: 'Achte auf das Signalwort „Denn...“ – hier wird erklärt, WARUM das Verbot gefordert wird.',
        },
        {
          id: 't1_q3',
          prompt: '3. Welche Rolle spielt Satz [3] im Text?',
          context:
            'Satz [3]: „Eine wissenschaftliche Langzeitstudie der Universität London aus dem Jahr 2023 belegt, dass die Noten... um 6,4 % besser ausfielen...“',
          interactionType: 'choice',
          options: [
            'These',
            'Gegenargument',
            'Eigene Meinung',
            'Beleg',
          ],
          correctAnswers: ['Beleg'],
          hint: 'Zahlen, Prozente und die Nennung einer universitären Untersuchung dienen als handfester Beweis (Beleg).',
        },
        {
          id: 't1_q4',
          prompt: '4. Welche Rolle spielt Satz [4] im Text?',
          context:
            'Satz [4]: „Allerdings betonen Kritiker eines Verbots, dass Jugendliche den verantwortungsvollen... Umgang nur erlernen können, wenn Smartphones aktiv... integriert werden.“',
          interactionType: 'choice',
          options: [
            'Gegenargument',
            'These',
            'Beleg',
            'Einleitung',
          ],
          correctAnswers: ['Gegenargument'],
          hint: 'Das Signalwort „Allerdings betonen Kritiker...“ leitet einen Gegenaspekt ein.',
        },
        {
          id: 't1_q5',
          prompt: '5. Welche Rolle spielt Satz [5] im Text?',
          context:
            'Satz [5]: „Aus diesem Grund wäre ein vollständiges Verbot ein Rückschritt in die digitale Steinzeit und Schulen sollten stattdessen verbindliche Mediennutzungsregeln erarbeiten.“',
          interactionType: 'choice',
          options: [
            'Beleg',
            'Einleitungsgedanke',
            'Gegenthese',
            'Argument',
          ],
          correctAnswers: ['Gegenthese'],
          hint: 'Hier wird die gegenteilige Position als alternative Forderung aufgestellt.',
        },
        {
          id: 't1_q6',
          prompt: '6. An welchem Signalwort erkennst du in Satz [2] sofort, dass es sich um eine Begründung (Argument) handelt?',
          context: '„Denn die ständige Erreichbarkeit... lenkt ab.“',
          interactionType: 'choice',
          options: [
            'Smartphones',
            'Denn',
            'Unterricht',
            'Schülerinnen',
          ],
          correctAnswers: ['Denn'],
          hint: 'Signalwörter wie „denn“, „weil“ oder „da“ kündigen immer eine Begründung an.',
        },
      ],
      teacherNotes:
        'Mit den Lernenden herausarbeiten: These = WAS wird behauptet? Argument = WARUM ist das so? Beleg = WO STEHT DER BEWEIS?',
    },
    {
      id: 'eroerterung-textanalyse-2-schuluniformen',
      topicSlug: 'thesen-schuluniformen',
      date: '03.10.2026',
      title: 'Textanalyse 2: Schulkleidung & Markenzwang',
      subject: 'Deutsch',
      topic: 'Thesen & Argumente im Text',
      dateBadge: 'Textanalyse 2 von 3',
      description:
        'Lies den Text zur Schulkleidung aufmerksam durch. Finde für jeden nummerierten Abschnitt heraus, welche Rolle er spielt: These, Argument, Beleg oder Gegenargument.',
      type: 'input',
      hideSampleSolution: true,
      readingText: {
        title: 'Vorgelegter Debattenbeitrag: Einheitliche Schulkleidung – Chance oder Freiheitsberaubung?',
        content: `[1] Die Einführung einheitlicher Schulkleidung an weiterführenden Schulen würde den sozialen Druck und den Markenzwang unter Jugendlichen spürbar verringern.

[2] Wenn alle Schülerinnen und Schüler dieselbe Kleidung tragen, kann niemand mehr aufgrund fehlender teurer Markenkleidung gehänselt oder sozial ausgegrenzt werden.

[3] Eine repräsentative Umfrage des Instituts für Schulentwicklung an Hamburger Modellschulen ergab, dass sich 74 Prozent der Lernenden in einheitlicher Schulkleidung sicherer und weniger optisch beurteilt fühlten.

[4] Auf der anderen Seite bedeutet einheitliche Kleidung jedoch einen massiven Eingriff in das Persönlichkeitsrecht und die individuelle Selbstentfaltung junger Menschen.

[5] Eine strenge Kleiderordnung nimmt Jugendlichen die Möglichkeit, ihren individuellen Charakter und ihren persönlichen Stil durch Mode zum Ausdruck zu bringen.`,
        source: 'Schulspiegel Magazin 2024',
      },
      inputQuestions: [
        {
          id: 't2_q1',
          prompt: '1. Welche Rolle spielt Abschnitt [1] im Text?',
          context:
            'Abschnitt [1]: „Die Einführung einheitlicher Schulkleidung... würde den sozialen Druck... spürbar verringern.“',
          interactionType: 'choice',
          options: [
            'Argument',
            'Beleg',
            'Gegenargument',
            'These',
          ],
          correctAnswers: ['These'],
          hint: 'Die Hauptbehauptung, die der Verfasser zu Beginn aufstellt.',
        },
        {
          id: 't2_q2',
          prompt: '2. Welche Rolle spielt Abschnitt [2] im Text?',
          context:
            'Abschnitt [2]: „Wenn alle... dieselbe Kleidung tragen, kann niemand mehr aufgrund fehlender teurer Markenkleidung gehänselt... werden.“',
          interactionType: 'choice',
          options: [
            'Argument',
            'These',
            'Gegenargument',
            'Schlussgedanke',
          ],
          correctAnswers: ['Argument'],
          hint: 'Erklärt die logische Ursache, WARUM der Markendruck abnehmen würde.',
        },
        {
          id: 't2_q3',
          prompt: '3. Welche Rolle spielt Abschnitt [3] im Text?',
          context:
            'Abschnitt [3]: „Eine repräsentative Umfrage des Instituts für Schulentwicklung... ergab, dass sich 74 Prozent... sicherer fühlten.“',
          interactionType: 'choice',
          options: [
            'These',
            'Gegenargument',
            'Eigene Meinung',
            'Beleg',
          ],
          correctAnswers: ['Beleg'],
          hint: 'Konkrete Prozentzahlen und ein wissenschaftliches Institut stützen das Argument.',
        },
        {
          id: 't2_q4',
          prompt: '4. Welche Rolle spielt Abschnitt [4] im Text?',
          context:
            'Abschnitt [4]: „Auf der anderen Seite bedeutet einheitliche Kleidung jedoch einen massiven Eingriff in das Persönlichkeitsrecht...“',
          interactionType: 'choice',
          options: [
            'Beleg',
            'Gegenargument',
            'These',
            'Zusammenfassung',
          ],
          correctAnswers: ['Gegenargument'],
          hint: 'Die Formulierung „Auf der anderen Seite... jedoch“ wechselt zur Contra-Perspektive.',
        },
        {
          id: 't2_q5',
          prompt: '5. Welche Rolle spielt Abschnitt [5] im Verhältnis zu Abschnitt [4]?',
          context:
            'Abschnitt [5]: „Eine strenge Kleiderordnung nimmt Jugendlichen die Möglichkeit, ihren individuellen Charakter... durch Mode zum Ausdruck zu bringen.“',
          interactionType: 'choice',
          options: [
            'Begründung der These',
            'Beleg aus einer Studie',
            'Begründung des Gegenarguments',
            'Beispiel aus dem Alltag',
          ],
          correctAnswers: ['Begründung des Gegenarguments'],
          hint: 'Hier wird begründet, WARUM Kleiderordnungen die Persönlichkeit einschränken.',
        },
        {
          id: 't2_q6',
          prompt: '6. Welcher Baustein aus dem 3B-Schema (Behauptung – Begründung – Beispiel) wird in Abschnitt [3] erfüllt?',
          context: '„Eine Umfrage ergab, dass 74 Prozent...“',
          interactionType: 'choice',
          options: [
            'Beleg',
            'Behauptung',
            'Begründung',
            'Beschluss',
          ],
          correctAnswers: ['Beleg'],
          hint: 'Das dritte B steht für Beispiel oder Beleg.',
        },
      ],
      teacherNotes:
        'Darauf achten, dass Lernende erkennt, wie Pro-Argument und Contra-Argument spiegelbildlich aufgebaut sind.',
    },
    {
      id: 'eroerterung-textanalyse-3-vier-tage-woche',
      topicSlug: 'thesen-vier-tage-woche',
      date: '03.10.2026',
      title: 'Textanalyse 3: Die 4-Tage-Schulwoche',
      subject: 'Deutsch',
      topic: 'Thesen & Argumente im Text',
      dateBadge: 'Textanalyse 3 von 3',
      description:
        'Lies den Text zur 4-Tage-Schulwoche. Finde heraus, was die Hauptforderung (These), die Begründungen (Argumente), die Beweise (Belege) und die Gegenargumente sind.',
      type: 'input',
      hideSampleSolution: true,
      readingText: {
        title: 'Vorgelegter Debattenbeitrag: Vier Tage Schule, drei Tage Wochenende – Zukunftsmodell?',
        content: `[1] Deutsche Schulen sollten flächendeckend auf eine Vier-Tage-Woche bei verlängerten Einzeltagen umstellen.

[2] Ein zusätzlicher freier Wochentag steigert nachweislich die mentale Erholung von Schülern und Lehrkräften und senkt die Quote von stressbedingten Krankheitsausfällen drastisch.

[3] Das zeigt ein Modellversuch an zwanzig Gesamtschulen in Nordrhein-Westfalen: Nach Einführung des freien Freitags sanken die Fehlzeiten um 28 Prozent und die Hausaufgaben wurden laut Lehrberichten deutlich gewissenhafter erledigt.

[4] Allerdings befürchten Elternverbände und Bildungsforscher, dass Lernende aus sozial schwächeren Familien an drei schulfreien Tagen den Anschluss verlieren und die Betreuung für berufstätige Eltern zur Zerreißprobe wird.

[5] Zudem führt die Verdichtung des Stoffs an den verbleibenden vier Schultagen zu überlangen Nachmittagen und extremer Ermüdung in den letzten Unterrichtsstunden.`,
        source: 'Bildung Heute Journal 2025',
      },
      inputQuestions: [
        {
          id: 't3_q1',
          prompt: '1. Welcher Satzteil stellt in diesem Text die zentrale These (Hauptforderung) dar?',
          context: 'Lies den Einstieg des Textes.',
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
          hint: 'Satz 1 formuliert den strittigen Kernvorschlag, um den sich die gesamte Debatte dreht.',
        },
        {
          id: 't3_q2',
          prompt: '2. Welche Rolle spielt Satz [2] im Text?',
          context:
            'Satz [2]: „Ein zusätzlicher freier Wochentag steigert nachweislich die mentale Erholung... und senkt Krankheitsausfälle...“',
          interactionType: 'choice',
          options: [
            'These',
            'Contra-Argument',
            'Belegstudie',
            'Pro-Argument',
          ],
          correctAnswers: ['Pro-Argument'],
          hint: 'Hier wird ein positives Argument FÜR den Vorschlag geliefert.',
        },
        {
          id: 't3_q3',
          prompt: '3. Wie wird das Argument in Satz [3] mit einem handfesten Beweis gestützt?',
          context:
            'Satz [3]: „Das zeigt ein Modellversuch an zwanzig Gesamtschulen in NRW...“',
          interactionType: 'choice',
          options: [
            'Durch einen konkreten Modellversuch mit überprüfbaren Zahlen',
            'Durch eine bloße Vermutung ohne wissenschaftliche Grundlage',
            'Durch ein persönliches Bauchgefühl einzelner Befragter',
            'Durch eine unbelegte Behauptung aus den sozialen Medien',
          ],
          correctAnswers: [
            'Durch einen konkreten Modellversuch mit überprüfbaren Zahlen',
          ],
          hint: '20 Schulen und 28 % weniger Fehlzeiten dienen als handfester Nachweis.',
        },
        {
          id: 't3_q4',
          prompt: '4. Welche Rolle spielt Satz [4] im Text?',
          context:
            'Satz [4]: „Allerdings befürchten Elternverbände..., dass Lernende... den Anschluss verlieren...“',
          interactionType: 'choice',
          options: [
            'Pro-Argument',
            'Thesenwiederholung',
            'Gegenargument',
            'Einleitungssatz',
          ],
          correctAnswers: ['Gegenargument'],
          hint: 'Satz 4 beleuchtet die negative Kehrseite des Vorschlags.',
        },
        {
          id: 't3_q5',
          prompt: '5. Welche Rolle spielt Satz [5] im Text?',
          context:
            'Satz [5]: „Zudem führt die Verdichtung des Stoffs... zu überlangen Nachmittagen und extremer Ermüdung...“',
          interactionType: 'choice',
          options: [
            'Ein Pro-Argument für die Reform',
            'Eine Zusammenfassung des Textes',
            'Ein zweites eigenständiges Contra-Argument',
            'Einleitungsgedanke des Autors',
          ],
          correctAnswers: ['Ein zweites eigenständiges Contra-Argument'],
          hint: '„Zudem...“ fügt einen weiteren wichtigen Gegenaspekt (Übermüdung) hinzu.',
        },
        {
          id: 't3_q6',
          prompt: '6. Welche Grundregel gilt für das Verhältnis von These und Argument?',
          interactionType: 'choice',
          options: [
            'Thesen behaupten einen Standpunkt, Argumente liefern die Begründung',
            'Argumente behaupten einen Standpunkt, Thesen liefern die Begründung',
            'Thesen und Argumente bezeichnen im Aufsatz genau denselben Begriff',
            'Thesen stellen immer Studien dar, Argumente sind reine Vermutungen',
          ],
          correctAnswers: [
            'Thesen behaupten einen Standpunkt, Argumente liefern die Begründung',
          ],
          hint: 'Die These ist die Behauptung (WAS?), das Argument liefert die Begründung (WARUM?).',
        },
      ],
      teacherNotes:
        'Lernende sollen verinnerlichen, dass ein starkes Argument immer durch ein konkretes Beispiel oder eine Studie gestützt werden muss.',
    },
    {
      id: 'eroerterung-einleitung-problemfrage',
      topicSlug: 'einleitung-problemfrage',
      date: '03.10.2026',
      title: 'Die Einleitung: Problemfrage für Pro & Contra finden',
      subject: 'Deutsch',
      topic: 'Einleitung & Problemfrage',
      dateBadge: 'Schreibschritt 1',
      description:
        'Lerne, wie du eine gute Einleitung schreibst und am Ende eine Problemfrage stellst, auf die man mit Pro (Dafür) und Contra (Dagegen) antworten kann.',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 't4_q1',
          prompt: '1. Welche Aufgabe hat die Problemfrage am Ende der Einleitung?',
          interactionType: 'choice',
          options: [
            'Sie muss bereits die persönliche Meinung festlegen',
            'Sie muss die Diskussion für Pro und Contra eröffnen',
            'Sie soll den Aufsatz sofort mit einer Lösung beenden',
            'Sie darf nur als kurze rhetorische Frage fungieren',
          ],
          correctAnswers: [
            'Sie muss die Diskussion für Pro und Contra eröffnen',
          ],
          hint: 'Eine gute Problemfrage ist offen für beide Seiten (sowohl Pro als auch Contra).',
        },
        {
          id: 't4_q2',
          prompt: '2. Welche dieser Fragen eignet sich am besten als Problemfrage für Pro und Contra?',
          interactionType: 'choice',
          options: [
            '„Warum sind Smartphones an Schulen grundsätzlich schädlich?“',
            '„Seit wann nutzen Jugendliche eigentlich moderne Mobiltelefone?“',
            '„Wer hat das erste internetfähige Smartphone entwickelt?“',
            '„Sollte an Schulen ein generelles Smartphone-Verbot gelten?“',
          ],
          correctAnswers: [
            '„Sollte an Schulen ein generelles Smartphone-Verbot gelten?“',
          ],
          hint: 'Auf diese Frage kann man sowohl mit JA als auch mit NEIN argumentieren.',
        },
        {
          id: 't4_q3',
          prompt: '3. Warum ist die Frage „Warum sind Hausaufgaben pure Zeitverschwendung?“ ungeeignet für eine Erörterung?',
          interactionType: 'choice',
          options: [
            'Weil sie sprachlich zu kurz und unpräzise formuliert ist',
            'Weil das Thema Hausaufgaben in Schulen nicht debattiert wird',
            'Weil direkte Fragen im Aufsatz generell unzulässig sind',
            'Weil sie vorverurteilend ist und keine Pro-Argumente zulässt',
          ],
          correctAnswers: [
            'Weil sie vorverurteilend ist und keine Pro-Argumente zulässt',
          ],
          hint: 'Eine Erörterung erfordert eine neutrale Entscheidungsfrage, die beide Seiten beleuchtet.',
        },
        {
          id: 't4_q4',
          prompt: '4. Welche drei Bestandteile gehören in eine gute Einleitung?',
          interactionType: 'choice',
          options: [
            'Drei Gegenargumente, eine Studie und die Schlussnote',
            'Die eigene Meinung, Zitate und der Hauptteil',
            'Aktueller Aufhänger, kurze Hinführung und die Problemfrage',
            'Nur die Überschrift und ein Fragezeichen',
          ],
          correctAnswers: [
            'Aktueller Aufhänger, kurze Hinführung und die Problemfrage',
          ],
          hint: 'Erst neugierig machen (Aufhänger), dann das Thema umreißen, dann die Frage stellen.',
        },
        {
          id: 't4_q5',
          prompt: '5. Baue eine vollständige Einleitung inklusive Problemfrage aus den Bausteinen zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'ob hausaufgaben noch zeitgemäß sind',
            'daher stellt sich die frage:',
            'in den letzten jahren',
            'sollten hausaufgaben an schulen abgeschafft werden',
            'wird immer häufiger diskutiert,',
          ],
          correctAnswers: [
            'In den letzten Jahren wird immer häufiger diskutiert, ob Hausaufgaben noch zeitgemäß sind. Daher stellt sich die Frage: Sollten Hausaufgaben an Schulen abgeschafft werden',
          ],
          hint: 'Baue zuerst die zeitliche Einleitung auf, leite zum Thema über und schließe mit der Problemfrage ab.',
        },
        {
          id: 't4_q6',
          prompt: '6. Welcher Einstieg eignet sich hervorragend als Aufhänger für die Einleitung?',
          interactionType: 'choice',
          options: [
            'Ein aktuelles Ereignis oder eine gesellschaftliche Debatte',
            'Das stärkste Gegenargument aus dem späteren Hauptteil',
            'Ein sachlicher Hinweis auf die vorgegebene Schreibzeit',
            'Eine persönliche Schätzung der erhofften Aufsatznote',
          ],
          correctAnswers: [
            'Ein aktuelles Ereignis oder eine gesellschaftliche Debatte',
          ],
          hint: 'Der Leser soll abgeholt und für das Thema interessiert werden.',
        },
        {
          id: 't4_q7',
          prompt: '7. Mit welchem Wort beginnt eine typische Pro-und-Contra-Problemfrage?',
          interactionType: 'choice',
          options: [
            'Warum...',
            'Sollte...',
            'Wann...',
            'Wer...',
          ],
          correctAnswers: ['Sollte...'],
          hint: '„Sollte...“ eröffnet die Wahl zwischen Dafür (Pro) und Dagegen (Contra).',
        },
        {
          id: 't4_q8',
          prompt: '8. Darfst du in der Einleitung schon verraten, wie deine eigene Meinung am Ende lauten wird?',
          interactionType: 'choice',
          options: [
            'Ja, die eigene Meinung gehört direkt an den Textanfang',
            'Nein, die eigene Meinung gehört erst in den Schlussteil',
            'Ja, am besten schon als Teil der Überschrift',
            'Nein, eine eigene Meinung ist im gesamten Text verboten',
          ],
          correctAnswers: [
            'Nein, die eigene Meinung gehört erst in den Schlussteil',
          ],
          hint: 'In der Einleitung bleibt man noch neutral; deine eigene Meinung kommt erst am Schluss.',
        },
      ],
      teacherNotes:
        'Mit den Lernenden üben, wie man zu jedem vorgegebenen Thema eine präzise Entscheidungsfrage mit „Sollte...“ formuliert.',
    },
    {
      id: 'eroerterung-hauptteil-argumente-studien',
      topicSlug: 'hauptteil-pro-contra',
      date: '03.10.2026',
      title: 'Der Hauptteil: Pro & Contra mit erfundenen Studien stärken',
      subject: 'Deutsch',
      topic: 'Hauptteil & 3B-Schema',
      dateBadge: 'Schreibschritt 2',
      description:
        'Baue überzeugende Argumente nach dem 3B-Schema auf und lerne, wie du deine Beispiele mit passenden (auch erfundenen) Studien noch stärker machst.',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 't5_q1',
          prompt: '1. Aus welchen drei Schritten besteht der vollständige Aufbau eines überzeugenden Arguments (3B-Schema)?',
          interactionType: 'choice',
          options: [
            'Begrüßung – Bitte – Bedankung',
            'Beispiel – Betrachtung – Beschluss',
            'Behauptung – Begründung – Beispiel',
            'Bericht – Beschreibung – Beurteilung',
          ],
          correctAnswers: [
            'Behauptung – Begründung – Beispiel',
          ],
          hint: 'Die 3Bs: Behauptung (WAS), Begründung (WARUM), Beispiel/Beleg (BEWEIS).',
        },
        {
          id: 't5_q2',
          prompt: '2. Wie kannst du dein Beispiel im Hauptteil durch eine erfundene oder angeführte Studie besonders stark machen?',
          interactionType: 'choice',
          options: [
            'Indem du Institut, Jahreszahl und Prozentangaben nennst',
            'Indem du betonst, dass jeder Mensch das weiß',
            'Indem du mehrere Ausrufezeichen ans Satzende setzt',
            'Indem du beteuert, dass es vielleicht wahr sein könnte',
          ],
          correctAnswers: [
            'Indem du Institut, Jahreszahl und Prozentangaben nennst',
          ],
          hint: 'Konkrete Angaben wie „Laut einer Studie der Universität Leipzig von 2024 stieg... um 35 %“ wirken besonders glaubwürdig.',
        },
        {
          id: 't5_q3',
          prompt: '3. Baue ein vollständiges 3B-Argument mit Belegstudie zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'wonach die noten handyfreier klassen um 15 prozent stiegen',
            'ein smartphone-verbot steigert die schulleistungen,',
            'dies belegt eine studie der universität oxford aus dem jahr 2023,',
            'weil störende benachrichtigungen die konzentration nicht mehr unterbrechen',
          ],
          correctAnswers: [
            'Ein Smartphone-Verbot steigert die Schulleistungen, weil störende Benachrichtigungen die Konzentration nicht mehr unterbrechen. Dies belegt eine Studie der Universität Oxford aus dem Jahr 2023, wonach die Noten handyfreier Klassen um 15 Prozent stiegen.',
          ],
          hint: 'Folge dem 3B-Schema: Behauptung (These), Begründung (Argument) und anschließender Beleg (Studie).',
        },
        {
          id: 't5_q4',
          prompt: '4. Wie ordnest du Pro- und Contra-Argumente im Hauptteil an (Sanduhr-Prinzip)?',
          interactionType: 'choice',
          options: [
            'Gegenseite vom stärksten zum schwächsten, danach eigene Seite vom schwächsten zum stärksten',
            'Eigene Seite vom stärksten zum schwächsten, danach Gegenseite vom schwächsten zum stärksten',
            'Alle Argumente durcheinander, ohne erkennbare Wertung oder Reihenfolge',
            'Ausschließlich die eigene Seite aufführen und Gegenargumente komplett weglassen',
          ],
          correctAnswers: [
            'Gegenseite vom stärksten zum schwächsten, danach eigene Seite vom schwächsten zum stärksten',
          ],
          hint: 'Das stärkste eigene Argument steht direkt vor dem Schluss, damit es dem Leser am besten im Gedächtnis bleibt (Höhepunkt!).',
        },
        {
          id: 't5_q5',
          prompt: '5. Welche Formulierung eignet sich am besten als Überleitung zwischen Contra und Pro (Wendepunkt)?',
          interactionType: 'choice',
          options: [
            '„Nachdem die Gegenargumente beleuchtet wurden, wiegen die folgenden Gründe schwerer.“',
            '„Nachdem die Gegenargumente beleuchtet wurden, ist der Hauptteil vollständig beendet.“',
            '„Nachdem die Gegenargumente beleuchtet wurden, überzeugen mich die Gegenargumente vollkommen.“',
            '„Nachdem die Gegenargumente beleuchtet wurden, verzichte ich auf weitere Ausführungen.“',
          ],
          correctAnswers: [
            '„Nachdem die Gegenargumente beleuchtet wurden, wiegen die folgenden Gründe schwerer.“',
          ],
          hint: 'Eine Brücke zwischen den beiden Argumentationsblöcken schlagen.',
        },
        {
          id: 't5_q6',
          prompt: '6. Welcher Satz ist ein überzeugender Beleg mit Expertenstudie für das Argument: „Schulhunde reduzieren Prüfungsangst“?',
          interactionType: 'choice',
          options: [
            '„Laut einer Untersuchung des Instituts für Pädagogik von 2024 sank der Stress um 40 Prozent.“',
            '„Laut einer kurzen Schülererzählung auf dem Schulhof mögen Kinder Hunde im Klassenzimmer.“',
            '„Laut einer privaten Online-Umfrage mit fünf Stimmen wirken Haustiere generell beruhigend.“',
            '„Laut einer allgemeinen Vermutung ohne Zahlen oder Daten helfen Tiere gegen Prüfungsangst.“',
          ],
          correctAnswers: [
            '„Laut einer Untersuchung des Instituts für Pädagogik von 2024 sank der Stress um 40 Prozent.“',
          ],
          hint: 'Genaue Institution, Jahreszahl und messbares Ergebnis.',
        },
        {
          id: 't5_q7',
          prompt: '7. Welche Satzanfänge und Überleitungen verbinden deine Argumente am besten?',
          interactionType: 'choice',
          options: [
            'Darüber hinaus..., Ein wichtiger Aspekt ist..., Hinzu kommt...',
            'Und dann noch..., Und danach folgt wieder..., Und am Ende noch...',
            'Weil ja nämlich..., Weil halt sowieso..., Weil doch eben auch...',
            'Erstens einmal..., Zweitens sodann hier..., Drittens letztlich...',
          ],
          correctAnswers: [
            'Darüber hinaus..., Ein wichtiger Aspekt ist..., Hinzu kommt...',
          ],
          hint: 'Abwechslungsreiche Satzanfänge und Übergänge lassen deinen Aufsatz flüssig und gut lesbar wirken.',
        },
        {
          id: 't5_q8',
          prompt: '8. Was passiert, wenn du in einem Argument nur eine Behauptung ohne Begründung und Beispiel nennst?',
          interactionType: 'choice',
          options: [
            'Das Argument wirkt unvollständig und bleibt ohne Begründung reine Behauptung',
            'Das Argument wirkt besonders stark, weil kurze Aussagen mehr Überzeugungskraft haben',
            'Das Argument erhält automatisch volle Punktzahl für sprachliche Prägnanz',
            'Das Argument erfüllt bereits alle Kriterien eines vollständigen 3B-Schemas',
          ],
          correctAnswers: [
            'Das Argument wirkt unvollständig und bleibt ohne Begründung reine Behauptung',
          ],
          hint: 'Ohne das WARUM und das BEISPIEL bleibt eine Behauptung für den Leser unbewiesen.',
        },
      ],
      teacherNotes:
        'Lernende sollen ermutigt werden, fiktive Studien plausibel zu erfinden („Laut einer Umfrage des Instituts für Jugendforschung aus 2024...“).',
    },
    {
      id: 'eroerterung-schluss-eigene-meinung',
      topicSlug: 'schluss-eigene-meinung',
      date: '03.10.2026',
      title: 'Der Schluss: Eigene Meinung & überzeugendes Fazit',
      subject: 'Deutsch',
      topic: 'Schluss & Eigene Meinung',
      dateBadge: 'Schreibschritt 3',
      description:
        'Der Schluss: Fasse die wichtigsten Punkte zusammen, begründe deine persönliche Meinung und finde einen passenden Kompromiss oder Ausblick.',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 't6_q1',
          prompt: '1. Was ist die wichtigste Aufgabe des Schlussteils in einer Erörterung?',
          interactionType: 'choice',
          options: [
            'Möglichst viele neue Argumente für beide Seiten nachreichen',
            'Den gesamten Hauptteil noch einmal Wort für Wort wiederholen',
            'Sich bei der Lehrkraft für die gestellte Aufgabe bedanken',
            'Die Argumente abwägen und das persönliche Fazit formulieren',
          ],
          correctAnswers: [
            'Die Argumente abwägen und das persönliche Fazit formulieren',
          ],
          hint: 'Am Ende ziehst du deine persönliche Schlussfolgerung aus den zuvor abgewogenen Punkten.',
        },
        {
          id: 't6_q2',
          prompt: '2. Welche eiserne Regel gilt für neue Argumente im Schlussteil?',
          interactionType: 'choice',
          options: [
            'Im Schlussteil müssen mindestens drei neue Argumente stehen',
            'Im Schlussteil dürfen keinesfalls neue Argumente genannt werden',
            'Im Schlussteil sind neue Argumente nur ohne Belege erlaubt',
            'Im Schlussteil entscheidet die Textlänge über neue Argumente',
          ],
          correctAnswers: [
            'Im Schlussteil dürfen keinesfalls neue Argumente genannt werden',
          ],
          hint: 'Alle Argumente gehören in den Hauptteil! Der Schluss fasst nur zusammen und wertet.',
        },
        {
          id: 't6_q3',
          prompt: '3. Wie begründest du deine eigene Meinung im Schlussteil am überzeugendsten?',
          interactionType: 'choice',
          options: [
            'Indem du behauptest, dass die Gegenseite keine Ahnung hat',
            'Indem du verweist, dass deine Mitschüler derselben Meinung sind',
            'Indem du aufzeigst, welches Hauptteil-Argument am schwersten wiegt',
            'Indem du deine Meinung einfach ohne jede Begründung stehen lässt',
          ],
          correctAnswers: [
            'Indem du aufzeigst, welches Hauptteil-Argument am schwersten wiegt',
          ],
          hint: 'Ein Urteil ist nur dann stark, wenn du dich auf die stärksten Argumente berufst.',
        },
        {
          id: 't6_q4',
          prompt: '4. Mit welchem Satz leitest du deine eigene Meinung besonders überzeugend ein?',
          interactionType: 'choice',
          options: [
            '„Nach sorgfältiger Abwägung aller Argumente bin ich der Ansicht, dass...“',
            '„Weil mir sowieso niemand zuhört, behaupte ich jetzt einfach, dass...“',
            '„Ohne Rücksicht auf die genannten Argumente ist meine feste Meinung, dass...“',
            '„Da ich keine eigene Entscheidung treffen möchte, glaube ich vielleicht, dass...“',
          ],
          correctAnswers: [
            '„Nach sorgfältiger Abwägung aller Argumente bin ich der Ansicht, dass...“',
          ],
          hint: 'Klar, sachlich und gut begründet.',
        },
        {
          id: 't6_q5',
          prompt: '5. Setze einen vorbildlichen Schlusssatz mit Kompromiss und Ausblick zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'weshalb klare regeln für eine kontrollierte handynutzung',
            'zusammenfassend lässt sich sagen,',
            'die zukunftsfähigste lösung darstellen',
            'dass ein striktes verbot zu weit geht,',
          ],
          correctAnswers: [
            'Zusammenfassend lässt sich sagen, dass ein striktes Verbot zu weit geht, weshalb klare Regeln für eine kontrollierte Handynutzung die zukunftsfähigste Lösung darstellen.',
          ],
          hint: 'Beginne mit der einleitenden Schlussformel, gefolgt vom Kompromiss und dem Ausblick.',
        },
        {
          id: 't6_q6',
          prompt: '6. Was versteht man unter einem „Kompromiss“ oder „Ausblick“ im Schlussteil?',
          interactionType: 'choice',
          options: [
            'Einen Ausblick auf das Wetter der kommenden Schulwoche',
            'Einen Lösungsvorschlag, der die Anliegen beider Seiten verbindet',
            'Eine formelle Entschuldigung für die Schwächen der Gegenseite',
            'Eine erneute Aufzählung aller Gegenargumente aus dem Hauptteil',
          ],
          correctAnswers: [
            'Einen Lösungsvorschlag, der die Anliegen beider Seiten verbindet',
          ],
          hint: 'Beide Seiten aufeinander zubewegen (z. B. Handy erlaubt in den Pausen, aber stumm im Unterricht).',
        },
        {
          id: 't6_q7',
          prompt: '7. Welcher Rückbezug sollte im Schlussteil hergestellt werden?',
          interactionType: 'choice',
          options: [
            'Ein Rückbezug auf die letzte Unterrichtsstunde vor der Klassenarbeit',
            'Ein Rückbezug auf die persönliche Wunschnote für den geschriebenen Aufsatz',
            'Ein Rückbezug auf die zentrale Problemfrage aus der Einleitung',
            'Ein Rückbezug auf das Geburtsdatum des behandelten Buchautors',
          ],
          correctAnswers: ['Ein Rückbezug auf die zentrale Problemfrage aus der Einleitung'],
          hint: 'Der Aufsatz schließt den Kreis zu der Frage, die ganz am Anfang gestellt wurde.',
        },
        {
          id: 't6_q8',
          prompt: '8. Darfst du im Schlussteil in der Ich-Form („Meiner Ansicht nach...“, „Ich plädiere für...“) schreiben?',
          interactionType: 'choice',
          options: [
            'Ja, im Schlussteil ist die begründete Ich-Perspektive ausdrücklich erwünscht',
            'Nein, die Ich-Perspektive bleibt auch im Schlussteil strengstens verboten',
            'Nur dann, wenn zuvor keine Gegenargumente im Hauptteil genannt wurden',
            'Nur dann, wenn der Aufsatz weniger als zwei DIN-A4-Seiten umfasst',
          ],
          correctAnswers: [
            'Ja, im Schlussteil ist die begründete Ich-Perspektive ausdrücklich erwünscht',
          ],
          hint: 'Während Einleitung und Hauptteil sachlich-objektiv sind, ist der Schluss der Ort für deine eigene Stimme!',
        },
      ],
      teacherNotes:
        'Darauf achten, dass Lernende im Schluss ein echtes Fazit zieht und nicht einfach die Einleitung wiederholt.',
    },
    {
      id: 'eroerterung-checkliste-eroerterung',
      topicSlug: 'checkliste-eroerterung',
      date: '03.10.2026',
      title: 'Checkliste: Die perfekte Erörterung schreiben',
      subject: 'Deutsch',
      topic: 'Checkliste Erörterung',
      dateBadge: 'Prüfungs-Checkliste',
      description:
        'Gehe die Schritte durch und überprüfe, ob dein Aufsatz alle wichtigen Punkte einer guten Pro-und-Contra-Erörterung erfüllt.',
      type: 'checklist',
      checklistItems: [
        {
          id: 'tc1',
          text: 'Ich habe in der Einleitung einen aktuellen Aufhänger gewählt und eine Problemfrage für beide Seiten formuliert.',
        },
        {
          id: 'tc2',
          text: 'Meine Problemfrage lässt sich sowohl mit Pro (Dafür) als auch mit Contra (Dagegen) beantworten.',
        },
        {
          id: 'tc3',
          text: 'Ich habe die Argumente der Gegenseite nach dem Sanduhr-Prinzip (stark nach schwach) angeordnet.',
        },
        {
          id: 'tc4',
          text: 'Ich habe die Argumente meiner eigenen Position von schwach nach stark als Steigerung aufgebaut.',
        },
        {
          id: 'tc5',
          text: 'Jedes Argument folgt dem 3B-Schema: Behauptung (These), Begründung (Warum?) und konkretes Beispiel/Beleg.',
        },
        {
          id: 'tc6',
          text: 'Ich habe meine Beispiele durch aussagekräftige Belege oder Studien mit Zahlen und Instituten untermauert.',
        },
        {
          id: 'tc7',
          text: 'Ich verwende abwechslungsreiche Überleitungen und Satzanfänge zwischen den Argumenten.',
        },
        {
          id: 'tc8',
          text: 'Am Übergang von Contra zu Pro habe ich einen klaren inhaltlichen Wendepunkt formuliert.',
        },
        {
          id: 'tc9',
          text: 'Im Schlussteil habe ich meine eigene Meinung klar begründet und keine neuen Argumente erfunden.',
        },
        {
          id: 'tc10',
          text: 'Ich habe einen zukunftsorientierten Ausblick oder Kompromissvorschlag gegeben und den Kreis zur Einleitung geschlossen.',
        },
      ],
      teacherNotes:
        'Vor der Klassenarbeit diese Checkliste Punkt für Punkt mit den Lernendens Übungstext abgleichen.',
    },
  ];
export const unit03102026: DailyLearningUnit = {
  id: 'eroerterung-03.10.2026',
  date: '03.10.2026',
  title: 'Tages-Lerneinheit: 03.10.2026',
  description:
    'Schwerpunkte Argumentation & Erörterung: 3 Textanalysen (Thesen, Argumente, Belege), Einleitung mit Problemfrage, Hauptteil mit Studien & 3B-Schema, Schluss mit eigener Meinung sowie Prüfungs-Checkliste.',
  tasks: eroerterungTasks,
};

export { eroerterungTasks };
