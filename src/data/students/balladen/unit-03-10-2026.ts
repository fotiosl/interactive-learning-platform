import { Task, DailyLearningUnit } from '@/types/student';

const balladenTasks: Task[] = [
  // =========================================================================
  // 1. THEMENBEREICH: BALLADENMERKMALE, FORM, REIME & METRUM
  // Abdeckung der Kann-Liste: Punkte 1, 2, 3, 4, 5, 6, 7
  // =========================================================================
  {
    id: 'balladen-merkmale-form',
    topicSlug: 'merkmale-form',
    date: '03.10.2026',
    title: 'Balladenmerkmale, Reim & Metrum (Form der Ballade)',
      subject: 'Deutsch',
      topic: 'Balladenmerkmale & Form',
      dateBadge: 'Kann-Liste: Punkte 1 bis 7',
      description:
        'Trainiere hier gezielt die Punkte 1 bis 7 deiner Selbsteinschätzung: Was macht eine Ballade aus (Gedicht, Erzählung und Theater in einem), wie bestimmst du Strophen, Verse und Reimschemata und wie funktioniert das Versmaß (Metrum)?',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'bm1',
          prompt: '1. Was ist eine Ballade im Deutschunterricht?',
          interactionType: 'choice',
          options: [
            'Ein reiner Sachtext zur Information in einer Tageszeitung',
            'Ein kurzes Märchen in einfacher Prosa ohne Reime',
            'Ein dramatisches Erzählgedicht mit Handlung und Figuren',
            'Ein stimmungsvoller Liedtext ohne Handlung oder Dialoge',
          ],
          correctAnswers: [
            'Ein dramatisches Erzählgedicht mit Handlung und Figuren',
          ],
          hint: 'Eine Ballade steht in Versen und Strophen, erzählt aber wie eine spannende Geschichte.',
        },
        {
          id: 'bm2',
          prompt: '2. Warum bezeichnete Johann Wolfgang von Goethe die Ballade als das „Ur-Ei der Dichtung“?',
          interactionType: 'choice',
          options: [
            'Weil Balladen die drei Gattungen Lyrik, Epik und Dramatik in sich vereinen',
            'Weil Balladen die älteste literarische Textform der gesamten Menschheit sind',
            'Weil Balladen ausschließlich von der Entstehung der Natur und Welt handeln',
            'Weil Balladen als Vorstufe für Romane und Theaterstücke erfunden wurden',
          ],
          correctAnswers: [
            'Weil Balladen die drei Gattungen Lyrik, Epik und Dramatik in sich vereinen',
          ],
          hint: 'Wie ein Ei alle Bestandteile eines Lebewesens enthält, vereint die Ballade Gedicht (Lyrik), Erzählung (Epik) und Theater (Dramatik).',
        },
        {
          id: 'bm3',
          prompt: '3. Welches Merkmal einer Ballade stammt aus dem Bereich der LYRIK (Gedichte)?',
          interactionType: 'choice',
          options: [
            'Die wörtliche Rede im Dialog zweier Personen',
            'Die Gliederung in Verse, Strophen und Reime',
            'Die fortlaufende Handlung durch einen Erzähler',
            'Der dramatische Konflikt auf einer Theaterbühne',
          ],
          correctAnswers: ['Die Gliederung in Verse, Strophen und Reime'],
          hint: 'Lyrische Texte sind Gedichte mit Verszeilen, Strophen und Reimklängen.',
        },
        {
          id: 'bm4',
          prompt: '4. Welches Merkmal einer Ballade stammt aus dem Bereich der EPIK (Erzählungen)?',
          interactionType: 'choice',
          options: [
            'Eine feste Strophenform mit durchgehendem Reimschema',
            'Der direkte Vortrag durch Schauspieler auf einer Bühne',
            'Die bildhafte Sprache mit Vergleichen und Metaphern',
            'Ein Erzähler, der eine fortlaufende Handlung mit Figuren schildert',
          ],
          correctAnswers: [
            'Ein Erzähler, der eine fortlaufende Handlung mit Figuren schildert',
          ],
          hint: 'Epik bedeutet Erzählkunst: Es gibt einen Erzähler und einen Handlungsstrang.',
        },
        {
          id: 'bm5',
          prompt: '5. Welches Merkmal einer Ballade stammt aus dem Bereich der DRAMATIK (Theater/Schauspiel)?',
          interactionType: 'choice',
          options: [
            'Wörtliche Rede, Dialoge zwischen Figuren und ein zuspitzender Konflikt',
            'Die Einteilung des Textes in regelmäßige Strophen und Verse',
            'Die Schilderung vergangener Ereignisse durch einen allwissenden Erzähler',
            'Die Verwendung von Reimschemata und festen Betonungsmustern',
          ],
          correctAnswers: [
            'Wörtliche Rede, Dialoge zwischen Figuren und ein zuspitzender Konflikt',
          ],
          hint: 'Dramatik wie im Theater: Figuren sprechen direkt miteinander und die Spannung steigt an.',
        },
        {
          id: 'bm6',
          prompt: '6. Wie unterscheidet man „Vers“ und „Strophe“ in einer Ballade voneinander?',
          interactionType: 'choice',
          options: [
            'Ein Vers umfasst das gesamte Gedicht, eine Strophe bezeichnet einzelne Zeilen',
            'Ein Vers ist eine einzelne Gedichtzeile, mehrere Verse bilden eine Strophe',
            'Ein Vers ist stets ungereimt, während eine Strophe immer Endreime verlangt',
            'Ein Vers beschreibt die Hauptfigur, während eine Strophe den Handlungsort nennt',
          ],
          correctAnswers: [
            'Ein Vers ist eine einzelne Gedichtzeile, mehrere Verse bilden eine Strophe',
          ],
          hint: 'Zähle jede Zeile als Vers; getrennte Abschnitte sind die Strophen.',
        },
        {
          id: 'bm7',
          prompt: '7. Welches Reimschema liegt vor, wenn sich Zeile 1 auf 2 und Zeile 3 auf 4 reimt (Muster aabb)?',
          interactionType: 'choice',
          options: [
            'Kreuzreim',
            'Paarreim',
            'Umarmender Reim',
            'Schweifreim',
          ],
          correctAnswers: ['Paarreim'],
          hint: 'Immer zwei aufeinanderfolgende Zeilen bilden ein Paar (z. B. spät/Wind, Vater/Kind).',
        },
        {
          id: 'bm8',
          prompt: '8. Welches Reimschema liegt vor, wenn sich Zeile 1 auf 3 und Zeile 2 auf 4 reimt (Muster abab)?',
          interactionType: 'choice',
          options: [
            'Umarmender Reim',
            'Paarreim',
            'Haufenreim',
            'Kreuzreim',
          ],
          correctAnswers: ['Kreuzreim'],
          hint: 'Die Reime springen über Kreuz (a reimt sich auf a, b auf b).',
        },
        {
          id: 'bm9',
          prompt: '9. Welches Reimschema liegt vor, wenn Zeile 1 sich auf Zeile 4 reimt und Zeile 2 auf 3 (Muster abba)?',
          interactionType: 'choice',
          options: [
            'Kreuzreim',
            'Paarreim',
            'Umarmender Reim',
            'Kettenreim',
          ],
          correctAnswers: ['Umarmender Reim'],
          hint: 'Die äußeren Verse (a) umschließen die beiden inneren Verse (b) wie eine Umarmung.',
        },
        {
          id: 'bm10',
          prompt: '10. Was versteht man unter dem Metrum (Versmaß) einer Ballade?',
          interactionType: 'choice',
          options: [
            'Die Gesamtzahl aller Strophen und Verse in einem Werk',
            'Das feste Reimschema am Ende der jeweiligen Verszeilen',
            'Die regelmäßige Abfolge von betonten und unbetonten Silben',
            'Die Sprechgeschwindigkeit beim Vortragen vor Publikum',
          ],
          correctAnswers: [
            'Die regelmäßige Abfolge von betonten und unbetonten Silben',
          ],
          hint: 'Das Metrum bestimmt den Takt und Rhythmus beim lauten Vorlesen.',
        },
        {
          id: 'bm11',
          prompt: '11. Welches Versmaß (Metrum) liegt vor, wenn auf eine unbetonte Silbe immer eine betonte Silbe folgt (v –)?',
          interactionType: 'choice',
          options: [
            'Trochäus (– v)',
            'Daktylus (– v v)',
            'Jambus (v –)',
            'Anapäst (v v –)',
          ],
          correctAnswers: ['Jambus (v –)'],
          hint: 'Achte auf den Zweiertakt: Erst eine unbetonte Senkung, dann eine betonte Hebung (wie im Wort: Ge-dicht).',
        },
        {
          id: 'bm12',
          prompt: '12. Setze die Definition der Ballade aus den Bausteinen zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'merkmale von gedicht,',
            'als ur-ei der dichtung',
            'erzählung und theaterstück',
            'verbindet die ballade',
          ],
          correctAnswers: [
            'Als Ur-Ei der Dichtung verbindet die Ballade Merkmale von Gedicht, Erzählung und Theaterstück.',
            'Merkmale von Gedicht, Erzählung und Theaterstück verbindet die Ballade als Ur-Ei der Dichtung.',
          ],
          hint: 'Beginne mit: Als Ur-Ei der Dichtung...',
        },
      ],
      teacherNotes:
        'Mit den Lernenden an Hand von Versbeispielen Hebung (–) und Senkung (v) über die Silben zeichnen lassen.',
    },

    // =========================================================================
    // 2. THEMENBEREICH: SCHILLERS BALLADE „DER HANDSCHUH“
    // Abdeckung der Kann-Liste: Punkte 3, 10, 11, 12
    // =========================================================================
    {
      id: 'balladen-handschuh',
      topicSlug: 'handschuh',
      date: '03.10.2026',
      title: 'Schillers „Der Handschuh“ – Handlungsschritte, W-Fragen & Figuren',
      subject: 'Deutsch',
      topic: 'Schiller: Der Handschuh',
      dateBadge: 'Kann-Liste: Punkte 3 & 10–12',
      description:
        'Trainiere die Punkte deiner Selbsteinschätzung zu Schillers Ballade: Die Handlungsschritte in der Raubtierarena, die 6 W-Fragen für die Inhaltsangabe und das Verhalten der Figuren Fräulein Kunigunde und Ritter Delorges.',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'fh1',
          prompt: '1. Wer hat die berühmte Ballade „Der Handschuh“ im Jahr 1797 verfasst?',
          interactionType: 'choice',
          options: [
            'Johann Wolfgang von Goethe',
            'Theodor Fontane',
            'Heinrich Heine',
            'Friedrich Schiller',
          ],
          correctAnswers: ['Friedrich Schiller'],
          hint: 'Er war ein enger Freund Goethes und schrieb auch „Die Bürgschaft“.',
        },
        {
          id: 'fh2',
          prompt: '2. W-Frage WO: Wo findet die Handlung der Ballade statt?',
          interactionType: 'choice',
          options: [
            'Auf einer Ritterburg am Rhein',
            'In der Raubtierarena von König Franz',
            'In einem finsteren Wald bei Gewitter',
            'Auf einem königlichen Segelschiff',
          ],
          correctAnswers: [
            'In der Raubtierarena von König Franz',
          ],
          hint: 'Der Hofstaat blickt vom Balkon hinab in den Zwinger der wilden Tiere.',
        },
        {
          id: 'fh3',
          prompt: '3. W-Frage WER: Wer sitzt auf dem Balkon und schaut dem Kampfspiel zu?',
          interactionType: 'choice',
          options: [
            'Einfache Bauern und Mägde des Umlands',
            'Fremde Kaufleute aus fernen Ländern',
            'König Franz mit Hofstaat, Damen und Rittern',
            'Ein Trupp königlicher Bogenschützen',
          ],
          correctAnswers: [
            'König Franz mit Hofstaat, Damen und Rittern',
          ],
          hint: 'König Franz umgeben von den Damen in schönem Kranz.',
        },
        {
          id: 'fh4',
          prompt: '4. Handlungsschritt 1: Welches Tier betritt als erstes mit ruhigem Schritt die Arena?',
          interactionType: 'choice',
          options: [
            'Ein wilder Bär',
            'Der Löwe',
            'Zwei Leoparden',
            'Ein Tiger',
          ],
          correctAnswers: ['Der Löwe'],
          hint: 'Er schüttelt seine Mähne, blickt sich stumm um und legt sich gelassen nieder.',
        },
        {
          id: 'fh5',
          prompt: '5. Handlungsschritt 2: Welches Raubtier bricht als zweites mit wildem Sprung hervor und brüllt laut?',
          interactionType: 'input',
          context: 'Ein großes, gestreiftes Raubtier umkreist den Löwen.',
          placeholder: 'Tierart eintragen...',
          correctAnswers: ['Tiger', 'Der Tiger', 'ein Tiger'],
          hint: 'Denke an eine gefährliche, gestreifte Raubkatze aus Asien.',
        },
        {
          id: 'fh6',
          prompt: '6. Handlungsschritt 3: Welche Tiere stürzen sich als drittes kampfbegierig in die Arena?',
          interactionType: 'choice',
          options: [
            'Zwei Leoparden',
            'Drei Wölfe',
            'Zwei Jagdhunde',
            'Ein Panther',
          ],
          correctAnswers: ['Zwei Leoparden'],
          hint: 'Zwei gefleckte Raubkatzen stürzen sich auf den Tiger.',
        },
        {
          id: 'fh7',
          prompt: '7. Wie verhalten sich die Raubtiere am Ende, nachdem der Löwe aufsteht und brüllt?',
          interactionType: 'choice',
          options: [
            'Sie zerfleischen sich gegenseitig im Kampf',
            'Sie attackieren die Zuschauer auf den Rängen',
            'Sie legen sich friedlich im Kreis umeinander',
            'Sie versuchen die massiven Tore aufzubrechen',
          ],
          correctAnswers: [
            'Sie legen sich friedlich im Kreis umeinander',
          ],
          hint: 'Die wilde Mordlust legt sich und alle Tiere lagern still.',
        },
        {
          id: 'fh8',
          prompt: '8. W-Frage WAS & WARUM: Warum wirft Fräulein Kunigunde ihren Handschuh mitten zwischen die Raubtiere?',
          interactionType: 'choice',
          options: [
            'Weil der Handschuh ihr versehentlich aus der Hand gerutscht ist',
            'Aus Eitelkeit, um den Mut des Ritters öffentlich auf die Probe zu stellen',
            'Weil sie die Raubtiere mit dem Stoff füttern und ablenken wollte',
            'Weil König Franz ihr dazu einen ausdrücklichen Befehl erteilt hatte',
          ],
          correctAnswers: [
            'Aus Eitelkeit, um den Mut des Ritters öffentlich auf die Probe zu stellen',
          ],
          hint: 'Sie stellt eine spöttische und lebensgefährliche Liebesprobe.',
        },
        {
          id: 'fh9',
          prompt: '9. Wie holt Ritter Delorges den Handschuh aus der Arena zurück?',
          interactionType: 'choice',
          options: [
            'Zitternd vor Angst und weinend',
            'Mit Schwert und Bogen bewaffnet',
            'Er schickt seinen Diener hinab',
            'Furchtlos, ruhig und mit keckem Finger',
          ],
          correctAnswers: ['Furchtlos, ruhig und mit keckem Finger'],
          hint: 'Er steigt gelassen zwischen die Raubtiere und nimmt den Handschuh unversehrt auf.',
        },
        {
          id: 'fh10',
          prompt: '10. W-Frage WELCHE FOLGEN: Was tut Delorges, als Kunigunde ihn liebreich anlächelt?',
          interactionType: 'choice',
          options: [
            'Er wirft ihr den Handschuh ins Gesicht und verlässt sie stolz',
            'Er fällt vor ihr auf die Knie und bittet um ihre Hand',
            'Er küsst ihre Hand und schenkt ihr den Handschuh zurück',
            'Er verneigt sich dankbar vor dem König und den Damen',
          ],
          correctAnswers: [
            'Er wirft ihr den Handschuh ins Gesicht und verlässt sie stolz',
          ],
          hint: 'Er spricht: „Den Dank, Dame, begehr ich nicht!“ und wendet sich für immer ab.',
        },
        {
          id: 'fh11',
          prompt: '11. W-Frage WANN: Zu welcher Zeit / Gelegenheit findet das gesamte Geschehen statt?',
          interactionType: 'choice',
          options: [
            'Mitten in der Nacht während eines schweren Unwetters',
            'Während eines feierlichen Tierkampfs vor dem Hofstaat',
            'Direkt nach einer verlorenen Schlacht der Ritter',
            'Am frühen Morgen bei einem Ausritt ins Grüne',
          ],
          correctAnswers: [
            'Während eines feierlichen Tierkampfs vor dem Hofstaat',
          ],
          hint: 'Der König veranstaltet ein Kampfspiel zur Unterhaltung der adeligen Hofgesellschaft.',
        },
        {
          id: 'fh12',
          prompt: '12. Bringe die Haupthandlung der Ballade in die richtige Reihenfolge:',
          interactionType: 'sentence_builder',
          tiles: [
            'wirft ihn kunigunde ins gesicht',
            'ritter delorges',
            'und verlässt die stolze dame',
            'holt furchtlos den handschuh,',
          ],
          correctAnswers: [
            'Ritter Delorges holt furchtlos den Handschuh, wirft ihn Kunigunde ins Gesicht und verlässt die stolze Dame.',
          ],
          hint: 'Beginne mit: Ritter Delorges...',
        },
      ],
      teacherNotes:
        'Mit den Lernenden den Unterschied zwischen Kunigundes eitler Schau und Delorges echtem Mut besprechen.',
    },

    // =========================================================================
    // 3. THEMENBEREICH: GOETHES BALLADE „ERLKÖNIG“
    // Abdeckung der Kann-Liste: Punkte 8, 9, 14
    // =========================================================================
    {
      id: 'balladen-erlkoenig',
      topicSlug: 'erlkoenig',
      date: '03.10.2026',
      title: 'Goethes „Erlkönig“ – Sprecher, Inhalt & Spannungskurve',
      subject: 'Deutsch',
      topic: 'Goethe: Erlkönig',
      dateBadge: 'Kann-Liste: Punkte 8, 9 & 14',
      description:
        'Trainiere die Punkte deiner Selbsteinschätzung zu Goethes Ballade: Die vier Sprecherrollen, die Spannungskurve vom ruhigen Einstieg bis zum dramatischen Höhepunkt und die unheimliche Atmosphäre.',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'fe1',
          prompt: '1. Wer hat die unheimliche Ballade „Erlkönig“ geschrieben?',
          interactionType: 'choice',
          options: [
            'Friedrich Schiller',
            'Johann Wolfgang von Goethe',
            'Heinrich Heine',
            'Theodor Storm',
          ],
          correctAnswers: ['Johann Wolfgang von Goethe'],
          hint: 'Schrieb auch „Der Zauberlehrling“ und gilt als Dichterfürst aus Weimar.',
        },
        {
          id: 'fe2',
          prompt: '2. Wie viele unterschiedliche Stimmen (Sprecherrollen) kommen in der Ballade zu Wort?',
          interactionType: 'choice',
          options: [
            'Genau 1 Stimme',
            'Genau 2 Stimmen',
            'Genau 3 Stimmen',
            'Genau 4 Stimmen',
          ],
          correctAnswers: ['Genau 4 Stimmen'],
          hint: 'Der Erzähler umrahmt Anfang und Ende; dazu kommen die 3 Figuren in direkter Rede.',
        },
        {
          id: 'fe3',
          prompt: '3. Wer reitet in der ersten Strophe zu Pferd durch Nacht und Wind?',
          interactionType: 'choice',
          options: [
            'Ein Vater mit seinem kranken Sohn im Arm',
            'Der Erlkönig auf einem Gespensterpferd',
            'Ein Bote des Königs mit einem Eilbrief',
            'Zwei bewaffnete Ritter auf der Jagd',
          ],
          correctAnswers: ['Ein Vater mit seinem kranken Sohn im Arm'],
          hint: 'Er hält den Knaben wohl in dem Arm, er fasst ihn sicher, er hält ihn warm.',
        },
        {
          id: 'fe4',
          prompt: '4. Womit lockt der Erlkönig das Kind bei seiner ersten Verführung?',
          interactionType: 'choice',
          options: [
            'Mit einer goldenen Krone und einem Zauberstab im Schloss',
            'Mit bunten Blumen, schönen Spielen und güldenen Kleidern',
            'Mit einer Truhe voller Goldmünzen und edlen Diamanten',
            'Mit einem schnellen Rennpferd und Dienern des Reiches',
          ],
          correctAnswers: [
            'Mit bunten Blumen, schönen Spielen und güldenen Kleidern',
          ],
          hint: '„Manch bunte Blumen sind an dem Strand, meine Mutter hat manch gülden Gewand.“',
        },
        {
          id: 'fe5',
          prompt: '5. Wie versucht der Vater das verängstigte Kind rational zu beruhigen?',
          interactionType: 'choice',
          options: [
            'Er deutet die Erscheinungen als Nebelstreif und Wind in den Blättern',
            'Er zieht entschlossen sein Schwert und fordert den Geist zum Duell',
            'Er schimpft ungeduldig mit dem Knaben und verlangsamt den Ritt',
            'Er ruft laut um Beistand durch die umliegenden Dorfbewohner',
          ],
          correctAnswers: [
            'Er deutet die Erscheinungen als Nebelstreif und Wind in den Blättern',
          ],
          hint: 'Der Vater sucht natürliche Erklärungen (Nebel, Wind, Weidenbäume).',
        },
        {
          id: 'fe6',
          prompt: '6. Warum sieht nur das Kind die Gestalt des Erlkönigs, der Vater aber nicht?',
          interactionType: 'choice',
          options: [
            'Weil der Vater das Geisterreich aus Furcht verleugnet',
            'Weil der Erlkönig sich nur im Dunkeln materialisieren kann',
            'Weil das Kind schwer krank ist und im hohen Fieber halluziniert',
            'Weil der Erlkönig seine Gestalt durch Zauberei verbirgt',
          ],
          correctAnswers: [
            'Weil das Kind schwer krank ist und im hohen Fieber halluziniert',
          ],
          hint: 'Das Kind glüht vor Fieber und bildet sich die bedrohliche Todesgestalt ein.',
        },
        {
          id: 'fe7',
          prompt: '7. Spannungskurve (Kann-Punkte 8 & 9): Wo erreicht die Bedrohung ihren Höhepunkt (Klimax)?',
          interactionType: 'choice',
          options: [
            'Als der Erlkönig seine Töchter für den Tanz verspricht',
            'Bereits in der ersten Strophe beim nächtlichen Aufbruch',
            'Als der Erlkönig droht: „Und bist du nicht willig, so brauch ich Gewalt!“',
            'Als der Vater den Knaben warm in die Arme schließt',
          ],
          correctAnswers: [
            'Als der Erlkönig droht: „Und bist du nicht willig, so brauch ich Gewalt!“',
          ],
          hint: 'Aus schmeichelnden Verlockungen wird offene, körperliche Gewaltandrohung.',
        },
        {
          id: 'fe8',
          prompt: '8. Spannungskurve: Was ist die dramatische Katastrophe am Ende der Ballade?',
          interactionType: 'choice',
          options: [
            'Das erschöpfte Pferd bricht auf halber Strecke zusammen',
            'Der Vater erreicht den rettenden Hof, doch das Kind ist tot',
            'Der Erlkönig entreißt dem Vater das Kind auf offenem Feld',
            'Der Sohn erholt sich beim Eintreffen auf dem Hof vollständig',
          ],
          correctAnswers: [
            'Der Vater erreicht den rettenden Hof, doch das Kind ist tot',
          ],
          hint: 'Der letzte Vers lautet: „In seinen Armen das Kind war tot.“',
        },
        {
          id: 'fe9',
          prompt: '9. Welches Reimschema durchzieht die Strophen des Erlkönigs (Wind / Kind / Arm / warm)?',
          interactionType: 'choice',
          options: [
            'Kreuzreim (abab)',
            'Umarmender Reim (abba)',
            'Paarreim (aabb)',
            'Kein Reim',
          ],
          correctAnswers: ['Paarreim (aabb)'],
          hint: 'Jeweils zwei aufeinanderfolgende Verse reimen sich.',
        },
        {
          id: 'fe10',
          prompt: '10. Welche Wirkung hat der treibende Rhythmus des Erlkönigs auf den Leser?',
          interactionType: 'choice',
          options: [
            'Er wirkt wie ein heiteres Tanzlied zur Festgesellschaft',
            'Er spiegelt die Hektik des Galopps und die Todesangst wider',
            'Er erzeugt eine feierlich-ruhige Stimmung eines Schlaflieds',
            'Er unterbricht die dramatische Handlung durch lange Pausen',
          ],
          correctAnswers: [
            'Er spiegelt die Hektik des Galopps und die Todesangst wider',
          ],
          hint: 'Der Rhythmus treibt den Ritt unaufhaltsam voran.',
        },
        {
          id: 'fe11',
          prompt: '11. Ergänze das letzte Wort der Ballade: „In seinen Armen das Kind war...“',
          interactionType: 'input',
          context: 'Der Vater erreicht den Hof mit Müh und Not.',
          placeholder: 'Fehlendes Wort eintragen...',
          correctAnswers: ['tot', 'tot war'],
          hint: 'Denke an das tragische Schicksal des Kindes am Ende der Ballade.',
        },
        {
          id: 'fe12',
          prompt: '12. Bringe die berühmten ersten Verse von Goethes Erlkönig in die richtige Reihenfolge:',
          interactionType: 'sentence_builder',
          tiles: [
            'es ist der vater',
            'wer reitet so spät',
            'mit seinem kind',
            'durch nacht und wind',
          ],
          correctAnswers: [
            'Wer reitet so spät durch Nacht und Wind Es ist der Vater mit seinem Kind',
          ],
          hint: 'Folge der bekannten Eingangsfrage und der anschließenden Antwort.',
        },
      ],
      teacherNotes:
        'Herausarbeiten: Der Vater erklärt alles naturwissenschaftlich-rational, während das fiebernde Kind in seiner Angst gefangen ist.',
    },

    // =========================================================================
    // 4. THEMENBEREICH: SPRACHE & STILMITTEL MIT WIRKUNG
    // Abdeckung der Kann-Liste: Punkte 13, 14, 15
    // =========================================================================
    {
      id: 'balladen-stilmittel',
      topicSlug: 'stilmittel',
      date: '03.10.2026',
      title: 'Sprache, Stilmittel & ihre Wirkung im Text',
      subject: 'Deutsch',
      topic: 'Stilmittel & Textwirkung',
      dateBadge: 'Kann-Liste: Punkte 13, 14 & 15',
      description:
        'Trainiere die Punkte 13 bis 15 deiner Selbsteinschätzung: Bestimme sprachliche Stilmittel (Vergleich, Personifikation, Metapher, Alliteration, Anapher, Hyperbel) und erkläre genau, welche Wirkung sie auf den Leser und die Stimmung haben!',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'fs1',
          prompt: '1. „Milch macht müde Männer munter.“ Welches sprachliche Stilmittel liegt in dieser Zeile vor?',
          interactionType: 'choice',
          options: [
            'Personifikation',
            'Alliteration',
            'Metapher',
            'Vergleich',
          ],
          correctAnswers: ['Alliteration'],
          hint: 'Achte auf den gleichen Anlaut bei den aufeinanderfolgenden Wörtern.',
        },
        {
          id: 'fs2',
          prompt: '2. WIRKUNG (Kann-Punkt 15): Welche Wirkung hat diese Lautfigur in „Dank, Dame, begehr ich nicht“?',
          interactionType: 'choice',
          options: [
            'Sie erzeugt eine fröhliche Stimmung und wirkt im Satz verspielt',
            'Sie betont den harten Tonfall des Ritters und bleibt im Gedächtnis',
            'Sie drückt ehrfürchtige Bewunderung für die Dame des Hofes aus',
            'Sie verlangsamt das Lesetempo durch weiche Konsonantenlaute',
          ],
          correctAnswers: [
            'Sie betont den harten Tonfall des Ritters und bleibt im Gedächtnis',
          ],
          hint: 'Die harten D-Laute unterstreichen Delorges Entschlossenheit und Kühle.',
        },
        {
          id: 'fs3',
          prompt: '3. „Er kämpfte mutig wie ein Löwe.“ Welches sprachliche Stilmittel liegt in diesem Satz vor?',
          interactionType: 'choice',
          options: [
            'Vergleich',
            'Anapher',
            'Metapher',
            'Personifikation',
          ],
          correctAnswers: ['Vergleich'],
          hint: 'Achte auf das Signalwort, das zwei Dinge miteinander in Beziehung setzt.',
        },
        {
          id: 'fs4',
          prompt: '4. WIRKUNG (Kann-Punkt 15): Warum setzt der Autor eine bildhafte Verknüpfung wie „schnell wie der Blitz“ ein?',
          interactionType: 'choice',
          options: [
            'Um eine bloße Zeilenlänge im Gedicht metrisch aufzufüllen',
            'Um Eigenschaften bildhaft und anschaulich vor Augen zu führen',
            'Um schwierige Fremdwörter durch Alltagssprache zu ersetzen',
            'Um ein bestimmtes Reimschema im Vers klanglich zu erzwingen',
          ],
          correctAnswers: [
            'Um Eigenschaften bildhaft und anschaulich vor Augen zu führen',
          ],
          hint: 'Ein Vergleich erzeugt sofort ein lebendiges Bild im Kopf des Lesers.',
        },
        {
          id: 'fs5',
          prompt: '5. „In dürren Blättern säuselt der Wind.“ Welches sprachliche Stilmittel wird hier verwendet?',
          interactionType: 'choice',
          options: [
            'Alliteration',
            'Personifikation',
            'Rhetorische Frage',
            'Kreuzreim',
          ],
          correctAnswers: ['Personifikation'],
          hint: 'Achte darauf, wie die Naturerscheinung hier vermenschlicht dargestellt wird.',
        },
        {
          id: 'fs6',
          prompt: '6. WIRKUNG (Kann-Punkt 15): Welche Stimmung erzeugt die Vermenschlichung in „Die Nacht schleicht heran“?',
          interactionType: 'choice',
          options: [
            'Eine heitere Stimmung auf einem herrschaftlichen Fest',
            'Eine unheimliche, bedrohliche und geheimnisvolle Stimmung',
            'Eine sachlich-nüchterne Atmosphäre eines Berichts',
            'Eine friedliche Naturstimmung an einem Sommermorgen',
          ],
          correctAnswers: [
            'Eine unheimliche, bedrohliche und geheimnisvolle Stimmung',
          ],
          hint: 'Das heimliche „Schleichen“ der Nacht wirkt wie eine lauernde Gefahr.',
        },
        {
          id: 'fs7',
          prompt: '7. „Die Damen in schönem Kranz.“ Welches sprachliche Stilmittel liegt hier vor?',
          interactionType: 'choice',
          options: [
            'Vergleich',
            'Alliteration',
            'Metapher',
            'Paarreim',
          ],
          correctAnswers: ['Metapher'],
          hint: 'Ein bildhafter Ausdruck, der eine bildliche Bedeutung ohne Vergleichswort überträgt.',
        },
        {
          id: 'fs8',
          prompt: '8. „Und es wallet und siedet und brauset und zischt.“ Welches sprachliche Stilmittel erkennst du hier?',
          interactionType: 'choice',
          options: [
            'Anapher',
            'Hyperbel',
            'Metapher',
            'Personifikation',
          ],
          correctAnswers: ['Anapher'],
          hint: 'Achte auf die gezielte Wiederholung am Anfang der Wortfolgen.',
        },
        {
          id: 'fs9',
          prompt: '9. WIRKUNG (Kann-Punkt 15): Welche Wirkung erzielt die Wiederholung von „Und... Und... Und...“ beim Lesen?',
          interactionType: 'choice',
          options: [
            'Sie bremst das Lesetempo ab und beruhigt das Geschehen',
            'Sie steigert die Dynamik und treibt das Geschehen hastig an',
            'Sie signalisiert dem Leser das baldige Ende der Ballade',
            'Sie unterbricht die Reimstruktur der nachfolgenden Strophen',
          ],
          correctAnswers: [
            'Sie steigert die Dynamik und treibt das Geschehen hastig an',
          ],
          hint: 'Die Aufzählung erzeugt Atemlosigkeit und Spannung.',
        },
        {
          id: 'fs10',
          prompt: '10. „Ich habe dir das schon eine Million Mal gesagt!“ Welches Stilmittel wird in diesem Satz eingesetzt?',
          interactionType: 'choice',
          options: [
            'Alliteration',
            'Anapher',
            'Hyperbel',
            'Metapher',
          ],
          correctAnswers: ['Hyperbel'],
          hint: 'Die Aussage stellt die Realität extrem gesteigert und überzeichnet dar.',
        },
        {
          id: 'fs11',
          prompt: '11. „Wer möchte bei so schönem Wetter drinnen sitzen?“ Welches Stilmittel liegt bei dieser Aussage vor?',
          interactionType: 'choice',
          options: [
            'Rhetorische Frage',
            'Metapher',
            'Alliteration',
            'Vergleich',
          ],
          correctAnswers: ['Rhetorische Frage'],
          hint: 'Der Sprecher erwartet auf diesen Satz keine tatsächliche Antwort.',
        },
        {
          id: 'fs12',
          prompt: '12. Setze die Regel zur Stilmittel-Wirkung zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'und ihre wirkung auf den leser',
            'in der klassenarbeit',
            'im textzusammenhang erklären',
            'muss man stilmittel benennen',
          ],
          correctAnswers: [
            'In der Klassenarbeit muss man Stilmittel benennen und ihre Wirkung auf den Leser im Textzusammenhang erklären.',
          ],
          hint: 'Beginne mit: In der Klassenarbeit...',
        },
      ],
      teacherNotes:
        'In der Klassenarbeit müssen Stilmittel am konkreten Textbeispiel mit Zeilenangabe benannt und in ihrer Wirkung beschrieben werden.',
    },

    // =========================================================================
    // 5. THEMENBEREICH: TATTZ-EINLEITUNGSSATZ, INHALTSANGABE & INDIREKTE REDE
    // Abdeckung der Kann-Liste: Punkte 12, 16, 19, 20
    // =========================================================================
    {
      id: 'balladen-inhaltsangabe-tattz',
      topicSlug: 'inhaltsangabe-tattz',
      date: '03.10.2026',
      title: 'TATTZ-Einleitungssatz, Inhaltsangabe & indirekte Rede',
      subject: 'Deutsch',
      topic: 'TATTZ & Inhaltsangabe',
      dateBadge: 'Kann-Liste: Punkte 12, 16, 19 & 20',
      description:
        'Trainiere die Punkte 12, 16, 19 und 20 deiner Selbsteinschätzung: Schreibe den perfekten TATTZ-Einleitungssatz, beachte die strengen Regeln der Inhaltsangabe (Gegenwart/Präsens) und wandle wörtliche Rede sicher in indirekte Rede um.',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'ft1',
          prompt: '1. Wofür steht der Buchstabe „T“ am Anfang des TATTZ-Schemas?',
          interactionType: 'choice',
          options: [
            'Tageszeit',
            'Temperatur',
            'Textart',
            'Teilnehmer',
          ],
          correctAnswers: ['Textart'],
          hint: 'Gibt an, um welche literarische Textform es sich handelt.',
        },
        {
          id: 'ft2',
          prompt: '2. Wofür steht der Buchstabe „A“ im TATTZ-Schema?',
          interactionType: 'choice',
          options: [
            'Autor',
            'Aufgabe',
            'Absatz',
            'Anfang',
          ],
          correctAnswers: ['Autor'],
          hint: 'Der Name des Dichters, der das Werk geschrieben hat (z. B. Schiller oder Goethe).',
        },
        {
          id: 'ft3',
          prompt: '3. Wofür steht das zweite „T“ im TATTZ-Schema?',
          interactionType: 'choice',
          options: [
            'Tierart',
            'Titel',
            'Tabelle',
            'Theater',
          ],
          correctAnswers: ['Titel'],
          hint: 'Der genaue Name des Werkes, z. B. „Der Handschuh“.',
        },
        {
          id: 'ft4',
          prompt: '4. Wofür steht das dritte „T“ im TATTZ-Schema?',
          interactionType: 'choice',
          options: [
            'Trauer',
            'Thema',
            'Takt',
            'Tempo',
          ],
          correctAnswers: ['Thema'],
          hint: 'Ein knapper Satz darüber, worum es im Text im Kern geht.',
        },
        {
          id: 'ft5',
          prompt: '5. Wofür steht das „Z“ im TATTZ-Schema?',
          interactionType: 'choice',
          options: [
            'Zeitung',
            'Zimmer',
            'Zufall',
            'Zeit',
          ],
          correctAnswers: ['Zeit'],
          hint: 'Die Jahreszahl der Veröffentlichung, z. B. 1797.',
        },
        {
          id: 'ft6',
          prompt: '6. Tempus-Regel (Kann-Punkt 19): In welcher Zeitform muss eine Inhaltsangabe verfasst sein?',
          interactionType: 'choice',
          options: [
            'Im Präteritum',
            'Im Präsens',
            'Im Perfekt',
            'Im Futur',
          ],
          correctAnswers: ['Im Präsens'],
          hint: 'Egal was in der Ballade steht: Eine Inhaltsangabe wird immer in der Gegenwartsform geschrieben.',
        },
        {
          id: 'ft7',
          prompt: '7. Welcher Sprachstil ist für eine Inhaltsangabe vorgeschrieben?',
          interactionType: 'choice',
          options: [
            'Spannend und emotional mit vielen Ausrufezeichen',
            'Sachlich und neutral ohne eigene Umgangssprache',
            'Gereimt und rhythmisch in festen Verszeilen',
            'Umgangssprachlich wie eine Nachricht an Freunde',
          ],
          correctAnswers: [
            'Sachlich und neutral ohne eigene Umgangssprache',
          ],
          hint: 'Nüchterne Information des Lesers ohne übertriebene Emotionen.',
        },
        {
          id: 'ft8',
          prompt: '8. Darf in einer Inhaltsangabe wörtliche (direkte) Rede mit Anführungszeichen stehen?',
          interactionType: 'choice',
          options: [
            'Ja, alle Zitate sollen vollständig übernommen werden',
            'Nein, es werden nur eigene Worte oder indirekte Rede genutzt',
            'Ja, aber wörtliche Rede ist nur bei der Hauptfigur erlaubt',
            'Nein, Figuren dürfen in Inhaltsangaben überhaupt nicht vorkommen',
          ],
          correctAnswers: [
            'Nein, es werden nur eigene Worte oder indirekte Rede genutzt',
          ],
          hint: 'Zitate haben in der Inhaltsangabe keinen Platz; verwende eigene Worte.',
        },
        {
          id: 'ft9',
          prompt: '9. Indirekte Rede (Kann-Punkt 20): Wie formulierst du „Der König rief: ‚Lasst den Löwen herein!‘“ korrekt um?',
          interactionType: 'choice',
          options: [
            'Der König rief laut: „Lasst den Löwen herein!“',
            'Der König befiehlt, dass man den Löwen hereinlassen solle',
            'Der König forderte die Zuschauer auf, ruhig zu bleiben',
            'Der König öffnete das Tor des Zwingers eigenhändig',
          ],
          correctAnswers: [
            'Der König befiehlt, dass man den Löwen hereinlassen solle',
          ],
          hint: 'Nutze die indirekte Rede mit „dass...“ und der Gegenwartsform.',
        },
        {
          id: 'ft10',
          prompt: '10. Gehört deine persönliche Meinung in den Hauptteil der Inhaltsangabe?',
          interactionType: 'choice',
          options: [
            'Ja, die eigene Meinung gehört in jeden einzelnen Abschnitt',
            'Nein, der Hauptteil bleibt sachlich und frei von Wertungen',
            'Ja, persönliche Kommentare bringen wichtige Zusatzpunkte',
            'Nein, Inhaltsangaben dürfen generell keine Figuren erwähnen',
          ],
          correctAnswers: [
            'Nein, der Hauptteil bleibt sachlich und frei von Wertungen',
          ],
          hint: 'Eine Inhaltsangabe informiert objektiv ohne eigene Gefühle.',
        },
        {
          id: 'ft11',
          prompt: '11. Baue einen vollständigen TATTZ-Einleitungssatz für Schillers Ballade zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'aus dem jahr 1797',
            'in der ballade',
            'geht es um eine gefährliche liebesprobe',
            '„der handschuh“',
            'von friedrich schiller',
          ],
          correctAnswers: [
            'In der Ballade „Der Handschuh“ von Friedrich Schiller aus dem Jahr 1797 geht es um eine gefährliche Liebesprobe.',
            'In der Ballade „Der Handschuh“ aus dem Jahr 1797 von Friedrich Schiller geht es um eine gefährliche Liebesprobe.',
            'In der Ballade "Der Handschuh" von Friedrich Schiller aus dem Jahr 1797 geht es um eine gefährliche Liebesprobe.',
            'In der Ballade "Der Handschuh" aus dem Jahr 1797 von Friedrich Schiller geht es um eine gefährliche Liebesprobe.',
          ],
          hint: 'Beginne mit: In der Ballade...',
        },
        {
          id: 'ft12',
          prompt: '12. Baue einen vollständigen TATTZ-Einleitungssatz für Goethes Erlkönig zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'von johann wolfgang von goethe',
            'die ballade',
            'eines vaters mit seinem kranken sohn',
            '„erlkönig“',
            'handelt vom nächtlichen ritt',
          ],
          correctAnswers: [
            'Die Ballade „Erlkönig“ von Johann Wolfgang von Goethe handelt vom nächtlichen Ritt eines Vaters mit seinem kranken Sohn.',
            'Die Ballade "Erlkönig" von Johann Wolfgang von Goethe handelt vom nächtlichen Ritt eines Vaters mit seinem kranken Sohn.',
          ],
          hint: 'Beginne mit: Die Ballade...',
        },
      ],
      teacherNotes:
        'Bei der Klassenarbeit darauf achten, dass der Einleitungssatz in einem einzigen flüssigen Satz alle 5 TATTZ-Bestandteile nennt.',
    },

    // =========================================================================
    // 6. THEMENBEREICH: EIGENE MEINUNG & TEXTÜBERPRÜFUNG (FEHLERSUCHE)
    // Abdeckung der Kann-Liste: Punkte 17, 18, 21, 22
    // =========================================================================
    {
      id: 'balladen-meinung-textcheck',
      topicSlug: 'meinung-textcheck',
      date: '03.10.2026',
      title: 'Eigene Meinung begründen & Textüberprüfung (Fehlersuche)',
      subject: 'Deutsch',
      topic: 'Eigene Meinung & Textcheck',
      dateBadge: 'Kann-Liste: Punkte 17, 18, 21 & 22',
      description:
        'Trainiere die Punkte 17, 18, 21 und 22 deiner Selbsteinschätzung: Formuliere deine eigene Meinung mit Textbezug, mache den Präsens-Check gegen Zeitformfehler und finde typische Schwachstellen bei Rechtschreibung und Zeichensetzung!',
      type: 'input',
      hideSampleSolution: true,
      inputQuestions: [
        {
          id: 'mt1',
          prompt: '1. Wie begründest du deine persönliche Meinung zu einer Ballade am besten?',
          interactionType: 'choice',
          options: [
            'Indem ich knapp feststelle, dass mir das Gedicht nicht gefällt',
            'Indem ich meine Wertung formuliere und am Text nachvollziehbar belege',
            'Indem ich den gesamten Text in eigenen Worten nochmals abschreibe',
            'Indem ich betone, dass alle Mitschüler dieselbe Ansicht teilen',
          ],
          correctAnswers: [
            'Indem ich meine Wertung formuliere und am Text nachvollziehbar belege',
          ],
          hint: 'Eine gute Stellungnahme braucht eine Begründung mit Bezug zur Handlung.',
        },
        {
          id: 'mt2',
          prompt: '2. Verhalten beurteilen (Kann-Punkt 17 & 18): Wie lässt sich Fräulein Kunigundes Verhalten einschätzen?',
          interactionType: 'choice',
          options: [
            'Sie sorgt sich liebevoll um das Wohlergehen und die Sicherheit des Ritters',
            'Sie handelt eitel und egoistisch, indem sie Delorges’ Leben leichtfertig riskiert',
            'Sie möchte vor allem den anwesenden König mit einem mutigen Scherz erheitern',
            'Sie versucht den Kampf der Raubtiere durch eine spontane Geste zu beenden',
          ],
          correctAnswers: [
            'Sie handelt eitel und egoistisch, indem sie Delorges’ Leben leichtfertig riskiert',
          ],
          hint: 'Sie stellt eine lebensgefährliche Mutprobe zur Schau vor dem Hofstaat.',
        },
        {
          id: 'mt3',
          prompt: '3. Verhalten beurteilen: Warum ist Ritter Delorges’ Reaktion am Ende moralisch gerechtfertigt?',
          interactionType: 'choice',
          options: [
            'Weil er beweist, dass wahre Ehre nicht für den Hochmut einer Dame geopfert werden darf',
            'Weil er als einfacher Knecht dem Willen des anwesenden Königs strikt gehorchen muss',
            'Weil er durch die Abweisung der Dame einen neuen Zweikampf unter den Rittern erzwingt',
            'Weil er den Handschuh nach dem Gang in die Arena für sich selbst beanspruchen will',
          ],
          correctAnswers: [
            'Weil er beweist, dass wahre Ehre nicht für den Hochmut einer Dame geopfert werden darf',
          ],
          hint: 'Er wahrt seine Selbstachtung und weist ihre falsche Bewunderung zurück.',
        },
        {
          id: 'mt4',
          prompt: '4. Der Vater in Goethes „Erlkönig“: Wie ist sein Verhalten gegenüber dem verängstigten Sohn zu bewerten?',
          interactionType: 'choice',
          options: [
            'Er verspottet die Ängste des Kindes und verweigert jede Hilfeleistung',
            'Er versucht das Kind rational zu beruhigen, unterschätzt aber die tödliche Gefahr',
            'Er bricht die Reise sofort ab und versteckt sich mit dem Knaben im Wald',
            'Er lässt sich von den Erscheinungen anstecken und verliert die Orientierung',
          ],
          correctAnswers: [
            'Er versucht das Kind rational zu beruhigen, unterschätzt aber die tödliche Gefahr',
          ],
          hint: 'Der Vater handelt fürsorglich, aber rein rational (Vernunft vs. kindliche Fantasie/Fieber).',
        },
        {
          id: 'mt5',
          prompt: '5. Präsens-Check (Kann-Punkt 21): In welchem der folgenden Sätze hat sich ein verbotener Vergangenheitsfehler (Präteritum) versteckt?',
          interactionType: 'choice',
          options: [
            'Ritter Delorges steigt furchtlos in die Arena hinab und nimmt den Handschuh auf.',
            'Fräulein Kunigunde blickt spöttisch auf den Löwengarten hinunter.',
            'Der Löwe gähnte laut und legte sich dann im Kreis nieder.',
            'König Franz winkt mit dem Finger und das Kampfspiel beginnt.',
          ],
          correctAnswers: [
            'Der Löwe gähnte laut und legte sich dann im Kreis nieder.',
          ],
          hint: '„gähnte“ und „legte“ stehen im Präteritum! Richtig im Präsens: „gähnt“ und „legt sich“.',
        },
        {
          id: 'mt6',
          prompt: '6. Präsens-Korrektur (Kann-Punkt 21): Wie lautet der Satz „Der Vater ritt durch die Nacht und hielt sein Kind fest“ richtig im Präsens?',
          interactionType: 'choice',
          options: [
            'Der Vater ist geritten durch die Nacht und hat sein Kind gehalten.',
            'Der Vater reitet durch die Nacht und hält sein Kind fest.',
            'Der Vater wird durch die Nacht reiten und sein Kind festhalten.',
            'Der Vater ritt unablässig durch die Nacht und hielt sein Kind.',
          ],
          correctAnswers: [
            'Der Vater reitet durch die Nacht und hält sein Kind fest.',
          ],
          hint: 'Gegenwartsformen: reiten -> reitet; halten -> hält.',
        },
        {
          id: 'mt7',
          prompt: '7. Indirekte Rede (Kann-Punkt 20): Welcher Satz wandelt Kunigundes Ausruf „Ritter, bringt mir den Handschuh!“ fehlerfrei um?',
          interactionType: 'choice',
          options: [
            'Kunigunde forderte laut: „Ritter, holt sofort den Handschuh!“',
            'Kunigunde fordert den Ritter auf, ihren Handschuh zurückzuholen.',
            'Kunigunde erklärte damals lautstark: „Er soll den Handschuh holen.“',
            'Kunigunde rief dem Ritter zu, er möge den Handschuh schnell holen.',
          ],
          correctAnswers: [
            'Kunigunde fordert den Ritter auf, ihren Handschuh zurückzuholen.',
          ],
          hint: 'Inhaltsangaben verwenden keine Anführungszeichen, sondern Infinitivsätze oder Nebensätze.',
        },
        {
          id: 'mt8',
          prompt: '8. Schwachstellen-Check das / dass (Kann-Punkt 22): In welchem Satz muss die Konjunktion „dass“ mit Doppel-s stehen?',
          interactionType: 'choice',
          options: [
            'Der König sah ein wildes Tier, dass im Zwinger laut brüllte.',
            'Die Ballade zeigt, dass eitle Liebesproben gefährlich sind.',
            'Das Edelfräulein verliert dass goldene Schmuckstück im Sand.',
            'Dass berühmte Balladengedicht wurde im Herbst veröffentlicht.',
          ],
          correctAnswers: [
            'Die Ballade zeigt, dass eitle Liebesproben gefährlich sind.',
          ],
          hint: 'Kannst du „dieses“, „jenes“ oder „welches“ einsetzen? Wenn NEIN, gehört „dass“ mit Doppel-s hin.',
        },
        {
          id: 'mt9',
          prompt: '9. Zeichensetzungs-Check (Kann-Punkt 22): In welchem Satz ist das Komma vor dem Nebensatz VÖLLIG RICHTIG gesetzt?',
          interactionType: 'choice',
          options: [
            'In der Ballade erfährt der Leser, dass Ritter Delorges den Handschuh rettet.',
            'In der Ballade erfährt, der Leser dass Ritter Delorges den Handschuh rettet.',
            'In der Ballade erfährt der Leser dass, Ritter Delorges den Handschuh rettet.',
            'In der Ballade, erfährt der Leser dass Ritter Delorges, den Handschuh rettet.',
          ],
          correctAnswers: [
            'In der Ballade erfährt der Leser, dass Ritter Delorges den Handschuh rettet.',
          ],
          hint: 'Das Komma steht direkt vor dem Bindewort „dass“, um Haupt- und Nebensatz zu trennen.',
        },
        {
          id: 'mt10',
          prompt: '10. Baue eine vollständige eigene Stellungnahme für die Klassenarbeit zusammen:',
          interactionType: 'sentence_builder',
          tiles: [
            'seine liebe leichtfertig ausgenutzt hat',
            'meiner ansicht nach',
            'weil fräulein kunigunde',
            'handelt ritter delorges richtig,',
          ],
          correctAnswers: [
            'Meiner Ansicht nach handelt Ritter Delorges richtig, weil Fräulein Kunigunde seine Liebe leichtfertig ausgenutzt hat.',
          ],
          hint: 'Beginne mit: Meiner Ansicht nach...',
        },
      ],
      teacherNotes:
        'Vor der Klassenarbeit diese Fehlersuch-Aufgaben nutzen, um typische Flüchtigkeitsfehler bei den Lernenden zu vermeiden.',
    },

    // =========================================================================
    // 7. THEMENBEREICH: DIE OFFIZIELLE KANN-LISTE (SELBSTEINSCHÄTZUNG)
    // Alle 22 Original-Kriterien aus dem Unterrichts-Arbeitsblatt
    // =========================================================================
    {
      id: 'balladen-kannliste-balladen',
      topicSlug: 'kannliste',
      title: 'Selbsteinschätzung: Deine offizielle Kann-Liste zur Klassenarbeit',
      subject: 'Deutsch',
      topic: 'Offizielle Kann-Liste',
      dateBadge: 'Alle 22 Kompetenzen',
      description:
        'Hier findest du exakt alle 22 Kriterien aus deiner originalen Unterrichts-Checkliste (Arbeitsblatt 11). Hake ab, was du schon sicher kannst, und sieh direkt, in welchen Themenbereichen du offene Punkte trainieren kannst!',
      type: 'checklist',
      checklistItems: [
        {
          id: 'c1',
          text: '1. Ich weiß, was Balladen sind (Gedicht mit dramatischer Geschichte; Ur-Ei aus Lyrik, Epik und Dramatik). [Bereich 1]',
        },
        {
          id: 'c2',
          text: '2. Ich kann in meinen eigenen Worten aufschreiben, was Balladen sind. [Bereich 1]',
        },
        {
          id: 'c3',
          text: '3. Ich weiß, was Strophe, Vers und Reim sind. [Bereich 1 & 2]',
        },
        {
          id: 'c4',
          text: '4. Ich kann in einer Ballade Strophe und Vers erkennen, benennen und mit Fachbegriffen beschreiben. [Bereich 1]',
        },
        {
          id: 'c5',
          text: '5. Ich kann in einer Ballade das Reimschema bestimmen (Paarreim, Kreuzreim, umarmender Reim). [Bereich 1]',
        },
        {
          id: 'c6',
          text: '6. Ich weiß, was das Metrum (Versmaß mit Hebungen und Senkungen) ist. [Bereich 1]',
        },
        {
          id: 'c7',
          text: '7. Ich kann in einer Ballade das Metrum (z. B. Jambus v –) bestimmen und beschreiben. [Bereich 1]',
        },
        {
          id: 'c8',
          text: '8. Ich weiß, was eine Spannungskurve ist (Einleitung, Spannungsanstieg, Höhepunkt, Wendepunkt, Ende). [Bereich 3]',
        },
        {
          id: 'c9',
          text: '9. Ich kann zu einer Ballade die Spannungskurve erklären und den Höhepunkt (Klimax) benennen. [Bereich 3]',
        },
        {
          id: 'c10',
          text: '10. Ich kann die Handlungsschritte einer Ballade in Stichworten notieren. [Bereich 2 & 3]',
        },
        {
          id: 'c11',
          text: '11. Ich kann den Inhalt einer Ballade anhand der W-Fragen (Wer, Wo, Wann, Was, Warum, Folgen) wiedergeben. [Bereich 2]',
        },
        {
          id: 'c12',
          text: '12. Ich kann den Inhalt einer Ballade in eigenen Worten schriftlich als Inhaltsangabe wiedergeben. [Bereich 2 & 5]',
        },
        {
          id: 'c13',
          text: '13. Ich kenne verschiedene sprachliche Stilmittel (Vergleich, Personifikation, Metapher, Alliteration, Anapher, Hyperbel). [Bereich 4]',
        },
        {
          id: 'c14',
          text: '14. Ich kann die Sprache und sprachlichen Besonderheiten in einer Ballade beschreiben. [Bereich 3 & 4]',
        },
        {
          id: 'c15',
          text: '15. Ich kann die Bedeutung und Wirkung von Stilmitteln auf den Leser im Textzusammenhang erklären. [Bereich 4]',
        },
        {
          id: 'c16',
          text: '16. Ich weiß, was eine Einleitung ist, und kann einen vollständigen TATTZ-Satz verfassen. [Bereich 5]',
        },
        {
          id: 'c17',
          text: '17. Ich kann meine eigene Meinung zum Verhalten der Figuren (z. B. Delorges und Kunigunde) sagen. [Bereich 6]',
        },
        {
          id: 'c18',
          text: '18. Ich kann meine eigene Meinung zu einer Ballade aufschreiben und ausführlich begründen. [Bereich 6]',
        },
        {
          id: 'c19',
          text: '19. Ich weiß, was „Präsens“ ist, und schreibe die Inhaltsangabe durchgängig in der Gegenwart. [Bereich 5 & 6]',
        },
        {
          id: 'c20',
          text: '20. Ich weiß, dass wörtliche Rede verboten ist, und wandle Dialoge in indirekte Rede (mit „dass“) um. [Bereich 5 & 6]',
        },
        {
          id: 'c21',
          text: '21. Ich kann überprüfen, ob ich meinen Text lückenlos im Präsens geschrieben habe (Fehlersuche). [Bereich 6]',
        },
        {
          id: 'c22',
          text: '22. Ich kann meinen Text auf Rechtschreibung, Zeichensetzung und Grammatik kontrollieren. [Bereich 6]',
        },
      ],
      teacherNotes:
        'Vor der Klassenarbeit diese Checkliste Punkt für Punkt mit den Lernenden durchgehen und offene Kriterien gezielt wiederholen.',
    },
  ];

export const unit03102026: DailyLearningUnit = {
  id: 'balladen-03.10.2026',
  date: '03.10.2026',
  title: 'Tages-Lerneinheit: 03.10.2026',
  description:
    'Vorbereitung auf die Klassenarbeit: Exakt abgestimmt auf den originale Selbsteinschätzung (Kann-Liste mit 22 Kriterien). Alle 6 Übungsbereiche zur Balladenanalyse.',
  tasks: balladenTasks,
};

export { balladenTasks };
