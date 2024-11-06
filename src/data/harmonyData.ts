export const harmonyData = [
  {
    id: 'harmony',
    letter: 'H',
    emoji: '🧘‍♂️',
    name: 'Zdrowie i Dobrostan',
    mainQuestion: 'Czy dbam o swoje zdrowie fizyczne i psychiczne?',
    helpQuestions: [
      'Czy regularnie śpię, zdrowo się odżywiam i uprawiam aktywność fizyczną?',
      'Jak radzę sobie ze stresem i dbam o swoje samopoczucie?'
    ],
    tools: [
      { name: 'Plan snu', description: 'Ustal stałe godziny snu' },
      { name: 'Zdrowe jedzenie', description: 'Przygotuj jadłospis na cały tydzień' },
      { name: 'Ćwiczenia', description: 'Wybierz aktywność, która sprawia Ci radość (np. spacer, joga)' },
      { name: 'Relaksacja', description: 'Wypróbuj medytację lub techniki oddechowe' }
    ],
    metrics: [
      'Czy śpisz 7-8 godzin na dobę?',
      'Ile razy w tygodniu ćwiczysz?',
      'Jak się czujesz każdego dnia?'
    ]
  },
  {
    id: 'achievement',
    letter: 'A',
    emoji: '🎯',
    name: 'Osiągnięcia i Rozwój',
    mainQuestion: 'Czy rozwijam się i realizuję swoje cele?',
    helpQuestions: [
      'Jakie umiejętności chcę zdobyć lub doskonalić?',
      'Czy moje cele są jasno określone i osiągalne?',
      'Jak planuję swój rozwój osobisty i zawodowy?'
    ],
    tools: [
      { name: 'Lista celów', description: 'Wypisz, co chcesz osiągnąć' },
      { name: 'Plan nauki', description: 'Zapisz się na kurs lub czytaj książki w interesującym Cię temacie' },
      { name: 'Codzienna praktyka', description: 'Poświęć codziennie czas na rozwój' }
    ],
    metrics: [
      'Ile celów udało Ci się zrealizować?',
      'Czy zauważasz postęp w swoim rozwoju?',
      'Jak często uczysz się czegoś nowego?'
    ]
  },
  {
    id: 'relationships',
    letter: 'R',
    emoji: '❤️',
    name: 'Relacje i Połączenia',
    mainQuestion: 'Czy pielęgnuję relacje z bliskimi?',
    helpQuestions: [
      'Czy spędzam jakościowy czas z rodziną i przyjaciółmi?',
      'Jak mogę poprawić komunikację z innymi?',
      'Czy jestem otwarty na nowe znajomości?'
    ],
    tools: [
      { name: 'Regularne spotkania', description: 'Zaplanuj cotygodniowe spotkania z bliskimi' },
      { name: 'Aktywne słuchanie', description: 'Skup się na rozmówcy bez przerywania i oceniania' },
      { name: 'Wyrażanie uczuć', description: 'Mów otwarcie o swoich emocjach i potrzebach' }
    ],
    metrics: [
      'Ile czasu spędzasz z bliskimi?',
      'Jak często inicjujesz kontakt?',
      'Czy czujesz się zrozumiany i wysłuchany?'
    ]
  },
  {
    id: 'meaning',
    letter: 'M',
    emoji: '🌟',
    name: 'Sens i Cel Życia',
    mainQuestion: 'Czy moje działania mają dla mnie głębszy sens?',
    helpQuestions: [
      'Co daje mi poczucie spełnienia?',
      'Jak mogę przyczynić się do dobra innych?',
      'Czy moje codzienne działania są zgodne z moimi wartościami?'
    ],
    tools: [
      { name: 'Refleksja', description: 'Zapisuj swoje przemyślenia i odkrycia dotyczące sensu życia' },
      { name: 'Misja życiowa', description: 'Sformułuj swoją osobistą misję życiową' },
      { name: 'Wolontariat', description: 'Znajdź sposób na pomaganie innym' }
    ],
    metrics: [
      'Jak często czujesz się spełniony?',
      'Czy Twoje działania są zgodne z Twoimi wartościami?',
      'Jaki wpływ masz na innych ludzi?'
    ]
  },
  {
    id: 'opportunities',
    letter: 'O',
    emoji: '🔍',
    name: 'Możliwości i Wybory',
    mainQuestion: 'Czy jestem otwarty na nowe możliwości i podejmuję świadome decyzje?',
    helpQuestions: [
      'Jakie nowe doświadczenia mogę podjąć?',
      'Czy analizuję różne opcje przed podjęciem decyzji?',
      'Co powstrzymuje mnie przed próbowaniem nowych rzeczy?'
    ],
    tools: [
      { name: 'Lista marzeń', description: 'Zapisz wszystkie rzeczy, które chciałbyś zrobić' },
      { name: 'Analiza decyzji', description: 'Rozważ plusy i minusy każdej opcji' },
      { name: 'Wyzwania', description: 'Podejmuj małe wyzwania co tydzień' }
    ],
    metrics: [
      'Ile nowych rzeczy próbujesz miesięcznie?',
      'Jak często wychodzisz ze strefy komfortu?',
      'Czy jesteś zadowolony ze swoich decyzji?'
    ]
  },
  {
    id: 'nature',
    letter: 'N',
    emoji: '🌿',
    name: 'Natura i Otoczenie',
    mainQuestion: 'Czy moje otoczenie wpływa pozytywnie na moje samopoczucie?',
    helpQuestions: [
      'Czy moje miejsce zamieszkania jest dla mnie komfortowe?',
      'Jak często przebywam na świeżym powietrzu?',
      'Czy dbam o środowisko naturalne?'
    ],
    tools: [
      { name: 'Organizacja przestrzeni', description: 'Uporządkuj i zoptymalizuj swoją przestrzeń życiową' },
      { name: 'Kontakt z naturą', description: 'Zaplanuj regularne aktywności na świeżym powietrzu' },
      { name: 'Ekologia', description: 'Wprowadź ekologiczne nawyki do codziennego życia' }
    ],
    metrics: [
      'Ile czasu spędzasz na świeżym powietrzu?',
      'Jak oceniasz komfort swojego otoczenia?',
      'Ile ekologicznych nawyków stosujesz?'
    ]
  },
  {
    id: 'yes',
    letter: 'Y',
    emoji: '😊',
    name: 'Wdzięczność i Zadowolenie',
    mainQuestion: 'Czy doceniam to, co mam, jednocześnie dążąc do nowych celów?',
    helpQuestions: [
      'Za co jestem dziś wdzięczny?',
      'Czy moje pragnienia są zgodne z moimi wartościami?',
      'Co sprawia mi radość w codziennym życiu?'
    ],
    tools: [
      { name: 'Dziennik wdzięczności', description: 'Zapisuj codziennie 3 rzeczy, za które jesteś wdzięczny' },
      { name: 'Praktyka uważności', description: 'Bądź obecny w chwili i doceniaj małe rzeczy' },
      { name: 'Celebracja sukcesów', description: 'Świętuj swoje osiągnięcia, nawet te najmniejsze' }
    ],
    metrics: [
      'Jak często praktykujesz wdzięczność?',
      'Jaki jest Twój ogólny poziom zadowolenia?',
      'Ile radosnych momentów dostrzegasz każdego dnia?'
    ]
  }
];