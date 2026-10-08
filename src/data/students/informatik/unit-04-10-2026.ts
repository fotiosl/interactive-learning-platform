import { Task, DailyLearningUnit } from '@/types/student';

const informatikTasks: Task[] = [
  {
    id: 'informatik-java-grundlagen',
    topicSlug: 'java-grundlagen',
    date: '04.10.2026',
    title: 'Java-Einstieg: Ausgaben, Variablen & Rechnen',
    subject: 'Informatik',
    topic: 'Java-Grundlagen',
    dateBadge: 'Stufe 1: Grundlagen',
    description:
      'Der sanfte Einstieg in die Java-Programmierung: Lerne, wie du Text auf der Konsole ausgibst, Zahlen in Variablen speicherst, einfache Berechnungen durchführst und mit if-Bedingungen arbeitest.',
    type: 'input',
    readingText: {
      title: 'Leitfaden: Dein Einstieg in Java (Befehle, Variablen & Rechnen)',
      content: `Willkommen in der Java-Programmierung! Bevor wir zu Schleifen kommen, schauen wir uns die grundlegenden Bausteine jedes Programms an:

1. Text auf der Konsole ausgeben:
   Mit System.out.println("Dein Text"); schreibst du eine Nachricht auf den Bildschirm.
   Das "ln" steht für "line" (neue Zeile): Nach der Ausgabe springt der Cursor automatisch in eine neue Zeile.
   ⚠️ Wichtig: Fast jede Anweisung in Java muss mit einem Semikolon (;) enden!

2. Ganze Zahlen in Variablen speichern:
   Eine Variable ist wie eine beschriftete Box, in der du einen Wert speicherst.
   Für ganze Zahlen nutzen wir den Datentyp int (kurz für Integer):
   int alter = 17;
   • 'int' legt den Typ fest (ganze Zahl).
   • 'alter' ist der Name deiner Variablen.
   • '=' weist der Variablen den Wert zu (Zuweisungsoperator).

3. Rechnen mit Variablen:
   Du kannst Variablen direkt miteinander verrechnen:
   int a = 15;
   int b = 25;
   int summe = a + b; // Ergibt 40
   Die wichtigsten Rechenoperatoren in Java:
   • + (Addition)
   • - (Subtraktion)
   • * (Multiplikation)
   • / (Ganzzahlige Division)

4. Text und Variablen kombinieren (String-Verkettung):
   Mit dem Pluszeichen (+) kannst du Text in Anführungszeichen und Variablenwerte zusammenfügen:
   System.out.println("Alter: " + alter + " Jahre");

5. Entscheidungen treffen mit if (Bedingte Verzweigung):
   Mit einer if-Abfrage führst du Code nur aus, wenn eine Bedingung wahr (true) ist:
   if (punkte >= 50) {
       System.out.println("Bestanden!");
   }`,
      source: 'Informatik-Grundlagen Berufskolleg • Java-Einstieg',
    },
    checklistItems: [
      { id: 'cg1', text: 'Ich weiß, wie man mit System.out.println() Text in der Konsole ausgibt.', category: 'Theorie' },
      { id: 'cg2', text: 'Ich kann eine int-Variable deklarieren und ihr einen Wert zuweisen.', category: 'Praxis' },
      { id: 'cg3', text: 'Ich kann mit Variablen rechnen (+, -, *) und Text damit verbinden.', category: 'Praxis' },
      { id: 'cg4', text: 'Ich verstehe, wie eine einfache if-Bedingung aufgebaut ist.', category: 'Theorie' },
    ],
    teacherNotes:
      'Perfekt zum Einstieg vor den Schleifen: Schritt-für-Schritt-Übungen zu Konsolenausgabe, Variablen, Grundrechenarten, String-Verkettung, Syntax-Puzzles und einfacher Verzweigung.',
    inputQuestions: [
      {
        id: 'bg1',
        prompt: '1. Begrüßung auf der Konsole ausgeben:',
        context: 'Gib den Text „Hallo Informatik!“ auf der Konsole aus.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        // Gib hier mit System.out.println den Text "Hallo Informatik!" aus:
        
    }
}`,
        expectedOutput: `Hallo Informatik!`,
        correctAnswers: ['Hallo Informatik!', 'Hallo Informatik'],
        hint: 'Denke an den Java-Befehl System.out.println("Dein Text"); und vergiss das Semikolon am Zeilenende nicht.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hallo Informatik!");
    }
}

// Erklärung:
// System.out.println() gibt den Text in den Anführungszeichen auf der Konsole aus
// und springt danach automatisch in eine neue Zeile.`,
      },
      {
        id: 'bg2',
        prompt: '2. Eine ganze Zahl in einer Variablen speichern und ausgeben:',
        context:
          'Erstelle eine Variable vom Typ int mit dem Namen punkte und dem Wert 100. Gib anschließend den Wert der Variablen auf der Konsole aus.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        // 1. Variable punkte vom Typ int mit dem Wert 100 anlegen:
        

        // 2. Variable auf der Konsole ausgeben:
        
    }
}`,
        expectedOutput: `100`,
        correctAnswers: ['100', 'punkte: 100', 'punkte = 100'],
        hint: 'Eine Ganzzahlvariable erstellst du mit int punkte = 100;. Bei der Ausgabe schreibst du System.out.println(punkte); ohne Anführungszeichen um den Namen.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int punkte = 100;
        System.out.println(punkte);
    }
}

// Erklärung:
// 1. 'int' reserviert Speicherplatz für eine ganze Zahl.
// 2. Das einfache Gleichheitszeichen '=' weist der Variablen den Wert 100 zu.
// 3. Da 'punkte' eine Variable ist, darf der Name in println NICHT in Anführungszeichen stehen.`,
      },
      {
        id: 'bg3',
        prompt: '3. Summe zweier Zahlen berechnen und ausgeben:',
        context:
          'Gegeben sind zwei Variablen a = 15 und b = 25. Berechne in einer neuen Variablen summe das Gesamtergebnis und gib dieses auf der Konsole aus.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 25;

        // Berechne die Summe aus a und b:
        int summe = 

        // Gib summe auf der Konsole aus:
        
    }
}`,
        expectedOutput: `40`,
        correctAnswers: ['40', 'Summe: 40', 'summe: 40', 'summe = 40'],
        hint: 'Du kannst die beiden Variablen direkt mit dem Plus-Operator verrechnen: int summe = a + b;. Gib danach die Variable summe aus.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 25;
        int summe = a + b;
        System.out.println(summe);
    }
}

// Erklärung:
// Der Computer rechnet zuerst die rechte Seite aus (15 + 25 = 40)
// und speichert das Ergebnis in der neuen Variablen 'summe'.`,
      },
      {
        id: 'bg4',
        prompt: '4. Text und Variable kombiniert ausgeben:',
        context:
          'Gegeben ist die Variable alter = 17. Gib die Nachricht „Alter: 17 Jahre“ auf der Konsole aus, indem du den Text und den Variablenwert mit dem Pluszeichen (+) verknüpfst.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int alter = 17;

        // Gib den kombinierten Text "Alter: 17 Jahre" aus:
        
    }
}`,
        expectedOutput: `Alter: 17 Jahre`,
        correctAnswers: ['Alter: 17 Jahre', 'Alter: 17 Jahre.', '17 Jahre', 'alter: 17 jahre'],
        hint: 'In Java kannst du Text in Anführungszeichen und Variablen mit dem Pluszeichen zusammenfügen: System.out.println("Alter: " + alter + " Jahre");.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int alter = 17;
        System.out.println("Alter: " + alter + " Jahre");
    }
}

// Erklärung:
// Das Pluszeichen verbindet Text und Zahl zu einer gemeinsamen Zeichenkette.
// Achte auf das Leerzeichen vor dem schließenden Anführungszeichen von "Alter: " und nach dem öffnenden von " Jahre".`,
      },
      {
        id: 'bg5',
        prompt: '5. Den Wert einer Variablen nachträglich verändern:',
        context:
          'Ein Spiel startet mit 50 Punkten. Nach einer erfolgreichen Runde erhält der Spieler 20 Punkte dazu. Erhöhe die Variable punkte um 20 und gib den neuen Stand auf der Konsole aus.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int punkte = 50;

        // Erhöhe punkte um 20 (z. B. mit punkte = punkte + 20; oder punkte += 20;):
        

        // Gib den neuen Punktestand aus:
        System.out.println(punkte);
    }
}`,
        expectedOutput: `70`,
        correctAnswers: ['70', 'Punktestand: 70', 'punkte: 70', '70 Punkte'],
        hint: 'Um zu einer bestehenden Variablen etwas hinzuzurechnen, kannst du punkte = punkte + 20; oder kurz punkte += 20; schreiben.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int punkte = 50;
        punkte = punkte + 20; // oder kurz: punkte += 20;
        System.out.println(punkte);
    }
}

// Erklärung:
// Der alte Wert (50) wird um 20 erhöht. Der neue Wert (70) überschreibt den alten Wert in 'punkte'.`,
      },
      {
        id: 'bg6',
        prompt: '6. Prüfung mit einer einfachen if-Bedingung:',
        context:
          'In einer Prüfung ist man ab 50 Punkten weiter. Gegeben ist int punkte = 65;. Ergänze die if-Bedingung so, dass bei mindestens 50 Punkten „Bestanden!“ ausgegeben wird.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int punkte = 65;

        // Prüfe mit if, ob punkte größer oder gleich 50 ist:
        if (              ) {
            System.out.println("Bestanden!");
        }
    }
}`,
        expectedOutput: `Bestanden!`,
        correctAnswers: ['Bestanden!', 'Bestanden', 'bestanden!'],
        hint: 'In die runden Klammern der if-Bedingung gehört der Vergleich mit dem Größer-Gleich-Zeichen: punkte >= 50.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int punkte = 65;

        if (punkte >= 50) {
            System.out.println("Bestanden!");
        }
    }
}

// Erklärung:
// Da 65 >= 50 wahr (true) ist, führt Java den Codeblock innerhalb der geschweiften Klammern aus
// und gibt "Bestanden!" aus.`,
      },
      {
        id: 'bg7',
        prompt: '7. Syntax-Puzzle: Baue eine Variablen-Deklaration zusammen:',
        context:
          'Bringe die Bausteine in die richtige Reihenfolge, um eine int-Variable namens punkte mit dem Wert 100 anzulegen.',
        interactionType: 'sentence_builder',
        tiles: ['100;', 'int', '=', 'punkte'],
        correctAnswers: ['int punkte = 100;'],
        hint: 'Eine Variablendeklaration beginnt immer mit dem Datentyp, gefolgt vom Namen, dem Zuweisungsoperator und dem Wert mit Semikolon.',
        sampleSolution: 'int punkte = 100;',
      },
      {
        id: 'bg8',
        prompt: '8. Syntax-Puzzle: Baue eine Rechenanweisung zusammen:',
        context:
          'Bringe die Bausteine in die richtige Reihenfolge, um das Ergebnis von a + b in der Variablen summe zu speichern.',
        interactionType: 'sentence_builder',
        tiles: ['b;', '=', 'summe', '+', 'a'],
        correctAnswers: ['summe = a + b;', 'summe = b + a;'],
        hint: 'Auf der linken Seite des Gleichheitszeichens steht die Zielvariable (summe), auf der rechten Seite die Rechenoperation.',
        sampleSolution: 'summe = a + b;',
      },
      {
        id: 'bg9',
        prompt: '9. Welcher Datentyp speichert ganze Zahlen (wie 1, 42 oder -10) in Java?',
        context: 'Wähle den passenden Java-Datentyp aus.',
        interactionType: 'choice',
        options: [
          'String',
          'int',
          'boolean',
          'double',
        ],
        correctAnswers: ['int'],
        hint: 'Überlege, welcher Begriff für Integer (ganze Zahl) steht. String speichert Text, double Kommazahlen und boolean Wahrheitswerte.',
        sampleSolution:
          'Richtig ist Antwort B: int (kurz für integer) ist in Java der Standardtyp für ganze Zahlen.',
      },
      {
        id: 'bg10',
        prompt: '10. Welches Satzzeichen beendet in Java fast jede Anweisung?',
        context: 'Achte auf die Syntax am Zeilenende von Java-Befehlen.',
        interactionType: 'choice',
        options: [
          '; (Semikolon)',
          '. (Punkt)',
          ': (Doppelpunkt)',
          '! (Ausrufezeichen)',
        ],
        correctAnswers: ['; (Semikolon)'],
        hint: 'Betrachte das Ende von Befehlen wie int a = 5; oder System.out.println("Hi");.',
        sampleSolution:
          'Richtig ist Antwort A: Das Semikolon (;) beendet Anweisungen in Java. Fehlt es, meldet der Compiler einen Syntaxfehler.',
      },
      {
        id: 'bg11',
        prompt: '11. Was bewirkt das „ln“ am Ende von System.out.println()?',
        context: 'Vergleiche System.out.print() und System.out.println().',
        interactionType: 'choice',
        options: [
          'Es wandelt den ausgegebenen Text automatisch in laute Tonsignale um.',
          'Es reserviert zusätzlichen Arbeitsspeicher für die folgende Zeile.',
          'Es fügt nach der Ausgabe automatisch einen Zeilenumbruch im Terminal ein.',
          'Es formatiert alle nachfolgenden Zeichen als zusammenhängende Liste.',
        ],
        correctAnswers: ['Es fügt nach der Ausgabe automatisch einen Zeilenumbruch im Terminal ein.'],
        hint: '„ln“ ist die Abkürzung für das englische Wort „line“ (Zeile). Was passiert mit der Schreibmarke nach der Ausgabe?',
        sampleSolution:
          'Richtig ist Antwort C: println steht für „print line“. Nach dem Drucken des Textes springt der Cursor in eine neue Zeile. Bei print() ohne ln bleibt der Cursor in derselben Zeile.',
      },
      {
        id: 'bg12',
        prompt: '12. Mit welchem Operator weist man einer Variablen in Java einen Wert zu?',
        context: 'Beispiel: int x = 5;',
        interactionType: 'choice',
        options: [
          '==',
          ':=',
          '->',
          '=',
        ],
        correctAnswers: ['='],
        hint: 'Das einfache Gleichheitszeichen weist einen Wert zu. Das doppelte Gleichheitszeichen wird zum Vergleichen verwendet.',
        sampleSolution:
          'Richtig ist Antwort D: Das einfache Gleichheitszeichen (=) ist der Zuweisungsoperator in Java. Das doppelte Gleichheitszeichen (==) vergleicht zwei Werte miteinander.',
      },
    ],
  },
  {
    id: 'informatik-while-grundlagen',
    topicSlug: 'while-schleife',
    date: '04.10.2026',
    title: 'Die while-Schleife in Java verstehen & programmieren',
    subject: 'Informatik',
    topic: 'while-Schleifen',
    dateBadge: 'Stufe 2: Schleifen',
    description:
      'Lerne die while-Schleife in Java Schritt für Schritt kennen. Schreibe deinen Code direkt im interaktiven Editor, klicke auf „Ausführen“ und überprüfe die Ausgabe in der Konsole.',
    type: 'input',
    readingText: {
      title: 'Leitfaden: Wie funktioniert eine while-Schleife in Java?',
      content: `Eine while-Schleife wird in Java verwendet, um Befehle wiederholt auszuführen, solange eine bestimmte Bedingung wahr (true) ist.

Das Grundmuster jeder Zählschleife besteht aus 3 unverzichtbaren Bausteinen:

1. Der Startwert (Initialisierung):
   Vor der Schleife legst du fest, wo der Zähler beginnt:
   int i = 1;

2. Die Bedingung (Prüfung vor jeder Runde):
   In den runden Klammern steht, wie lange die Schleife laufen darf:
   while (i <= 5) {
       // Code hier wird wiederholt
   }

3. Das Weiterschalten (Schrittweite):
   Innerhalb der Schleife muss die Zählvariable verändert werden, damit die Schleife nicht ewig läuft:
   i++; // Erhöht i in jeder Runde um 1

⚠️ Vorsicht vor der Endlosschleife!
Wenn du vergisst, die Zählvariable zu verändern (z. B. i++ weglässt), bleibt i für immer 1. Die Bedingung (1 <= 5) bleibt immer wahr und dein Programm läuft endlos weiter.`,
      source: 'Informatik-Grundlagen Berufskolleg • Java-Einführung',
    },
    checklistItems: [
      { id: 'c1', text: 'Ich kenne die 3 Bausteine: Startwert, Bedingung und Weiterschalten.', category: 'Theorie' },
      { id: 'c2', text: 'Ich weiß, warum eine vergessene Zähler-Erhöhung zu einer Endlosschleife führt.', category: 'Theorie' },
      { id: 'c3', text: 'Ich habe alle 5 interaktiven Programmieraufgaben im Editor gelöst.', category: 'Praxis' },
      { id: 'c4', text: 'Ich habe die 3 Wissensfragen zur while-Schleife richtig beantwortet.', category: 'Theorie' },
    ],
    teacherNotes:
      'Die Aufgaben sind einsteigerfreundlich konzipiert. Aufgaben 1 bis 3 sind sehr leicht (Grundmechanik der while-Schleife, Inkrementieren, Dekrementieren, 2er-Schrittweite). Aufgaben 4 und 5 sind auf mittlerem Niveau (Akkumulator-Muster für Summen sowie formatierte Multiplikationstabelle mit String-Verkettung). Aufgaben 6 bis 8 festigen die Theorie.',
    inputQuestions: [
      {
        id: 'wq1',
        prompt: '1. Zahlenreihe von 1 bis 5 ausgeben:',
        context:
          'Schreibe eine while-Schleife, die die Zahlen von 1 bis 5 aufsteigend in der Konsole ausgibt (jede Zahl in einer eigenen Zeile).',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        // 1. Startwert festlegen
        int i = 1;

        // 2. Schleife: Solange i kleiner oder gleich 5 ist
        while (i <= 5) {
            System.out.println(i);
            
            // 3. Zählvariable i um 1 erhöhen:
            
        }
    }
}`,
        expectedOutput: `1
2
3
4
5`,
        correctAnswers: ['1\n2\n3\n4\n5', '1 2 3 4 5', '1, 2, 3, 4, 5'],
        hint: 'Überlege, mit welchem Befehl eine Variable um 1 erhöht wird (z. B. i++ oder i = i + 1). Setze diesen Befehl ans Ende des Schleifenblocks.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 5) {
            System.out.println(i);
            i++; // Erhöht i in jedem Durchlauf um 1
        }
    }
}

// Erklärung:
// 1. Runde: i = 1 (1 <= 5 ist wahr) -> Ausgabe 1 -> i wird 2
// 2. Runde: i = 2 (2 <= 5 ist wahr) -> Ausgabe 2 -> i wird 3
// ...
// 5. Runde: i = 5 (5 <= 5 ist wahr) -> Ausgabe 5 -> i wird 6
// 6. Runde: i = 6 (6 <= 5 ist falsch) -> Schleife bricht sauber ab!`,
      },
      {
        id: 'wq2',
        prompt: '2. Raketen-Countdown von 10 bis 1 mit Startsignal:',
        context:
          'Gib mit einer while-Schleife die Zahlen von 10 herunter bis 1 aus. Direkt nach Ablauf der Schleife soll das Wort „Start!“ auf einer neuen Zeile erscheinen.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int countdown = 10;

        // while-Schleife: Läuft, solange countdown größer oder gleich 1 ist
        while (countdown >= 1) {
            System.out.println(countdown);

            // Verringere countdown um 1:
            
        }

        // Nach der Schleife das Startsignal ausgeben:
        
    }
}`,
        expectedOutput: `10
9
8
7
6
5
4
3
2
1
Start!`,
        correctAnswers: [
          '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nStart!',
          '10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nStart',
          '10 9 8 7 6 5 4 3 2 1 Start!',
        ],
        hint: 'Beim Rückwärtszählen verringerst du die Variable mit countdown-- oder countdown = countdown - 1. Das Wort „Start!“ gibst du nach der schließenden geschweiften Klammer der Schleife mit System.out.println aus.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int countdown = 10;

        while (countdown >= 1) {
            System.out.println(countdown);
            countdown--; // Zählt in jeder Runde 1 herunter
        }

        System.out.println("Start!");
    }
}

// Erklärung:
// countdown startet bei 10 und wird in jedem Schritt dekrementiert (countdown--).
// Sobald countdown auf 0 sinkt, ist die Bedingung countdown >= 1 nicht mehr erfüllt.
// Der Befehl System.out.println("Start!"); steht außerhalb der Schleife und wird genau einmal nach dem Countdown ausgeführt.`,
      },
      {
        id: 'wq3',
        prompt: '3. Gerade Zahlen von 2 bis 10 ausgeben:',
        context:
          'Schreibe eine while-Schleife, die nur die geraden Zahlen von 2 bis 10 ausgibt (2, 4, 6, 8, 10).',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int zahl = 2;

        while (zahl <= 10) {
            System.out.println(zahl);

            // Erhöhe die Zahl hier um 2:
            
        }
    }
}`,
        expectedOutput: `2
4
6
8
10`,
        correctAnswers: ['2\n4\n6\n8\n10', '2 4 6 8 10', '2, 4, 6, 8, 10'],
        hint: 'Eine Variable lässt sich in Java um einen beliebigen Betrag erhöhen, zum Beispiel mit zahl = zahl + 2; oder kurz zahl += 2;.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int zahl = 2;

        while (zahl <= 10) {
            System.out.println(zahl);
            zahl += 2; // Erhöht zahl in jedem Schritt um 2 (oder: zahl = zahl + 2;)
        }
    }
}

// Erklärung:
// Startwert ist 2. Durch zahl += 2 springt der Wert auf 4, dann 6, 8 und 10.
// Danach wird zahl zu 12. Die Bedingung zahl <= 10 ist falsch und die Schleife endet.`,
      },
      {
        id: 'wq4',
        prompt: '4. Summe der Zahlen von 1 bis 5 berechnen (Akkumulator):',
        context:
          'Berechne mit einer while-Schleife die Gesamtsumme der Zahlen von 1 bis 5 (1 + 2 + 3 + 4 + 5 = 15). Gib am Ende nur die Gesamtsumme im Format „Summe: 15“ aus.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int i = 1;
        int summe = 0; // Speicher für das Zwischenergebnis

        while (i <= 5) {
            // Addiere das aktuelle i zur Variablen summe hinzu:
            
            // Zähler erhöhen:
            i++;
        }

        // Gesamtergebnis ausgeben:
        System.out.println("Summe: " + summe);
    }
}`,
        expectedOutput: `Summe: 15`,
        correctAnswers: ['Summe: 15', '15', 'Ergebnis: 15', 'Summe = 15', 'summe = 15'],
        hint: 'In jedem Schleifendurchlauf soll der aktuelle Wert von i auf summe aufaddiert werden (z. B. summe = summe + i; oder kurz summe += i;).',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int i = 1;
        int summe = 0;

        while (i <= 5) {
            summe += i; // Addiert den aktuellen Wert von i auf summe auf
            i++;
        }

        System.out.println("Summe: " + summe);
    }
}

// Schritt-für-Schritt-Ablauf:
// Runde 1: summe = 0 + 1 = 1,  i wird 2
// Runde 2: summe = 1 + 2 = 3,  i wird 3
// Runde 3: summe = 3 + 3 = 6,  i wird 4
// Runde 4: summe = 6 + 4 = 10, i wird 5
// Runde 5: summe = 10 + 5 = 15, i wird 6 -> Schleifenende!
// Ausgabe: Summe: 15`,
      },
      {
        id: 'wq5',
        prompt: '5. Das kleine Einmaleins der Zahl 3 berechnen:',
        context:
          'Erstelle eine while-Schleife, die das Einmaleins der 3 von 1 * 3 bis 10 * 3 berechnet und zeilenweise im Format „1 * 3 = 3“, „2 * 3 = 6“ bis „10 * 3 = 30“ ausgibt.',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i <= 10) {
            // Berechne das Ergebnis (i * 3) und gib die Zeile formatiert aus:
            
            i++;
        }
    }
}`,
        expectedOutput: `1 * 3 = 3
2 * 3 = 6
3 * 3 = 9
4 * 3 = 12
5 * 3 = 15
6 * 3 = 18
7 * 3 = 21
8 * 3 = 24
9 * 3 = 27
10 * 3 = 30`,
        correctAnswers: [
          '1 * 3 = 3\n2 * 3 = 6\n3 * 3 = 9\n4 * 3 = 12\n5 * 3 = 15\n6 * 3 = 18\n7 * 3 = 21\n8 * 3 = 24\n9 * 3 = 27\n10 * 3 = 30',
          '1*3=3\n2*3=6\n3*3=9\n4*3=12\n5*3=15\n6*3=18\n7*3=21\n8*3=24\n9*3=27\n10*3=30',
        ],
        hint: 'Berechne das Produkt aus i und 3 in einer Variablen (int ergebnis = i * 3;) oder direkt in System.out.println(i + " * 3 = " + (i * 3));.',
        sampleSolution: `public class Main {
    public static void main(String[] args) {
        int i = 1;

        while (i <= 10) {
            int ergebnis = i * 3;
            System.out.println(i + " * 3 = " + ergebnis);
            i++;
        }
    }
}

// Erklärung:
// Die Variable i läuft von 1 bis 10.
// In jeder Runde multiplizieren wir i mit 3 und setzen Text und Zahlen mit dem Pluszeichen (+) zusammen.`,
      },
      {
        id: 'wq6',
        prompt: '6. Was geschieht, wenn die Bedingung einer while-Schleife schon vor dem ersten Durchlauf false ist?',
        context: 'Beispiel: int x = 10; while (x < 5) { System.out.println(x); x++; }',
        interactionType: 'choice',
        options: [
          'Die Schleife läuft genau einmal durch und bricht danach sofort ab.',
          'Die Schleife wird überhaupt nicht ausgeführt und komplett übersprungen.',
          'Das Programm stürzt direkt mit einem kritischen Laufzeitfehler ab.',
          'Die Bedingung wird ignoriert und der Schleifenrumpf läuft endlos weiter.',
        ],
        correctAnswers: ['Die Schleife wird überhaupt nicht ausgeführt und komplett übersprungen.'],
        hint: 'Überlege dir: Eine while-Schleife ist eine kopfgesteuerte Schleife. Die Bedingung wird immer VOR dem ersten Durchlauf geprüft. Was passiert, wenn die Ampel sofort Rot zeigt?',
        sampleSolution:
          'Die Schleife wird 0-mal ausgeführt. Da Java die Bedingung direkt vor dem Betreten des Schleifenblocks prüft (Kopfsteuerung), wird der gesamte Block übersprungen, wenn die Bedingung bereits am Anfang false ergibt.',
      },
      {
        id: 'wq7',
        prompt: '7. Warum muss die Zählvariable innerhalb des Schleifenblocks schrittweise verändert werden?',
        context: 'Überlege, was mit der Bedingung while (i <= 5) passiert, wenn i immer den gleichen Wert behält.',
        interactionType: 'choice',
        options: [
          'Damit die Bedingung irgendwann false werden kann und keine Endlosschleife entsteht.',
          'Damit die Java Virtual Machine den Arbeitsspeicher für jede Runde neu reserviert.',
          'Weil Konsolenausgaben in Java ausschließlich auf veränderten Variablen basieren.',
          'Damit der Compiler die Ausführungsgeschwindigkeit der CPU automatisch verdoppelt.',
        ],
        correctAnswers: ['Damit die Bedingung irgendwann false werden kann und keine Endlosschleife entsteht.'],
        hint: 'Was würde passieren, wenn i für immer den Startwert 1 behält und die Bedingung i <= 5 lautet?',
        sampleSolution:
          'Richtig ist Antwort A: Wenn die Zählvariable unverändert bliebe, bliebe die Bedingung für immer true. Das Programm würde in einer Endlosschleife feststecken. Das Weiterschalten sorgt dafür, dass die Abbruchbedingung erreicht wird.',
      },
      {
        id: 'wq8',
        prompt: '8. Welche der folgenden Schreibweisen erhöht die Variable x in Java um 1?',
        context: 'Wähle den passenden Java-Befehl aus.',
        interactionType: 'choice',
        options: [
          'x =+ 1;',
          'x + 1;',
          'x++;',
          'increase x;',
        ],
        correctAnswers: ['x++;'],
        hint: 'In Java gibt es einen speziellen Inkrement-Operator mit zwei Pluszeichen direkt hinter dem Variablennamen.',
        sampleSolution:
          'Richtig ist Antwort C: x++; (oder auch x = x + 1; bzw. x += 1;) erhöht den Wert der Variablen x um 1. Ein bloßes x + 1; berechnet zwar den Wert, weist ihn aber nicht wieder zu.',
      },
    ],
  },
  {
    id: 'informatik-java-spielwiese',
    topicSlug: 'java-spielwiese',
    date: '04.10.2026',
    title: 'Freie Java-Spielwiese',
    subject: 'Informatik',
    topic: 'Freies Programmieren',
    dateBadge: 'Labor: Eigener Code',
    description:
      'Deine freie Entwicklungsumgebung: Schreibe beliebigen Java-Code, teste eigene Ideen und führe alles direkt auf Knopfdruck aus.',
    type: 'input',
    teacherNotes:
      'Komplett aufgabenlose Spielwiese zum freien Experimentieren und Ausprobieren eigener Java-Programme.',
    inputQuestions: [
      {
        id: 'spielwiese',
        prompt: '',
        interactionType: 'code',
        language: 'java',
        initialCode: `public class Spielwiese {
    public static void main(String[] args) {
        
    }
}`,
      },
    ],
  },
];

export const unit04102026: DailyLearningUnit = {
  id: 'informatik-04.10.2026',
  date: '04.10.2026',
  title: 'Java-Grundlagen & while-Schleifen Labor',
  description:
    'Schrittweise von den Grundlagen (Ausgaben, Variablen, einfache Berechnungen & Verzweigungen) bis zur while-Schleife mit interaktivem Code-Editor, Compiler und Konsole.',
  tasks: informatikTasks,
};

export { informatikTasks };
