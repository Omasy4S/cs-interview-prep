// ============================================================================
// КОНФИГУРАЦИЯ И ДАННЫЕ
// ============================================================================

// Метаданные вкладок: используются для hero-блоков и навигации
const tabsConfig = [
    {
        id: 'oop',
        title: 'ООП',
        hero: 'ООП без скуки',
        eyebrow: 'TypeScript · Архитектура',
        description: 'Разбираем четыре столпа объектно-ориентированного подхода на живых примерах и тренируемся применять их в реальном коде.'
    },
    {
        id: 'algorithms',
        title: 'Алгоритмы',
        hero: 'Алгоритмическая интуиция',
        eyebrow: 'Patterns · Big-O',
        description: 'Собираем коллекцию паттернов (два указателя, скользящее окно, рекурсия), чтобы быстро выбирать правильный алгоритм на интервью.'
    },
    {
        id: 'data-structures',
        title: 'Структуры данных',
        hero: 'Дизайн памяти',
        eyebrow: 'Stacks · Trees · Maps',
        description: 'Учимся выбирать структуры под ограничения продукта: скорость доступа, стоимость вставки и контроль памяти.'
    },
    {
        id: 'leetcode',
        title: 'LeetCode',
        hero: 'Паттерны задач',
        eyebrow: 'Practice · Insights',
        description: 'От Two Sum до графов: закрепляем устойчивые подходы, чтобы распознавать задачу по нескольким признакам.'
    },
    {
        id: 'event-loop',
        title: 'Event Loop',
        hero: 'Асинхронность = UX',
        eyebrow: 'Runtime · JS',
        description: 'Понимаем, как движок JS распределяет задачи, чтобы строить отзывчивый интерфейс без «фризов».'
    },
    {
        id: 'solid',
        title: 'SOLID',
        hero: 'Принципы без мантр',
        eyebrow: 'Clean Architecture',
        description: 'Смотрим на SOLID как на язык договоренностей в команде: когда разделять классы и как защищаться от регрессий.'
    },
    {
        id: 'foundations',
        title: 'Основы',
        hero: 'Системное мышление',
        eyebrow: 'Cohesion · Coupling',
        description: 'Повторяем фундаментальные идеи о связанности, слоях и сложностях, чтобы принимать архитектурные решения осознанно.'
    },
    {
        id: 'theory',
        title: 'Теория',
        hero: 'Библиотека инсайтов',
        eyebrow: 'Mindset · Leadership',
        description: 'Собрание коротких эссе про мышление инженера: от CAP до Observability и работы с ИИ.'
    }
];

const AppConfig = {
    tabs: tabsConfig,
    theory: {
        global: null, // инициализируем ниже после объявления массива
        byTab: null   // инициализируем после объявления theoryLibrary
    }
};

const tabMetaMap = AppConfig.tabs.reduce((acc, tab) => {
    acc[tab.id] = tab;
    return acc;
}, {});

const globalTheoryInsights = [
    {
        type: 'info',
        icon: 'fa-compass',
        title: 'Стратегия подготовки к собеседованиям',
        tagline: 'Focus > хаотичный гринд',
        summary: 'Раздели подготовку на волны: теория → практика → симуляции. Каждая волна завершается конкретным deliverable (конспект, набор решённых задач, mock-interview).',
        bullets: [
            'Определи «мишень»: какие роли и стек нужны. Это отсечёт лишние темы.',
            'Составь недельные слоты: 2× алгоритмы, 1× системный дизайн, 1× проект.',
            'Каждый понедельник фиксируй инсайт недели — что изменишь в подходе.'
        ],
        why: 'Без системы подготовка превращается в марафон без финиша.',
        how: 'Держи Kanban: backlog тем, in progress, done. После каждой сессии обновляй карточки и заметки.',
        takeaway: 'Стратегия побеждает количество: важен прогресс по целям, а не счёт задач.'
    },
    {
        type: 'info',
        icon: 'fa-brain',
        title: 'Ментальные модели для дебага',
        tagline: 'От симптома к гипотезе',
        summary: 'Рассматривай баг как гипотезу о нарушенном инварианте, а не как случайность.',
        bullets: [
            'Фиксируй ожидаемое состояние перед дебагом: это экономит время на «что должно быть».',
            'Собирай факты, прежде чем править — логи, метрики, последовательность действий.',
            'Каждый баг = новый чек в листе мониторинга.'
        ],
        why: 'Скорость фиксов зависит от того, как быстро ты находишь «узел» причины.',
        how: 'Используй цикл: гипотеза → эксперимент → вывод. Документируй, чтобы команда училась вместе.',
        takeaway: 'Дебаг — это исследование системы, а не угадайка.'
    },
    {
        type: 'info',
        icon: 'fa-lightbulb',
        title: 'Product thinking для разработчика',
        tagline: 'Пиши код с пониманием ценности',
        summary: 'Каждая фича — это гипотеза про метрики. Задача инженера — знать, какую метрику защищает его решение.',
        bullets: [
            'Всегда спрашивай «как мы узнаем, что это сработало?»',
            'Описывай фичу через пользовательский сценарий, а не только API.',
            'Фиксируй ограничения: SLA, платформы, доступность.'
        ],
        why: 'Код без контекста быстро превращается в техдолг.',
        how: 'Перед задачей напиши mini-brief: проблема → аудитория → успех.',
        takeaway: 'Product thinking = способность объяснить, зачем существует твоя фича.'
    },
    {
        type: 'info',
        icon: 'fa-rocket',
        title: 'Системы обучения и рост инженера',
        tagline: 'Постоянная кривая развития',
        summary: 'Рост = deliberate practice. Запланируй циклы: выбери навык → зафиксируй уровень → создай упражнение → ищи фидбек.',
        bullets: [
            'Держи журнал боли: баги, ревью, задачи, где не хватило знаний.',
            'Каждому навыку ставь KPI: «хочу за 30 минут объяснить Monorepo setup новичку».',
            'Построй peer-группу: обмен экспериментами ускоряет рост.'
        ],
        why: 'Без системы обучения карьерный рост случайен.',
        how: 'Раз в квартал пересматривай карту навыков и планируй следующий фокус.',
        takeaway: 'Инженер растёт не от лет стажа, а от осознанных циклов обучения.'
    },
    {
        type: 'info',
        icon: 'fa-book-open-reader',
        title: 'Чтение чужого кода',
        tagline: 'Учимся по живым системам',
        summary: 'Самый быстрый способ расти — читать код людей, которые сильнее тебя, и пытаться переписать его проще.',
        bullets: [
            'Ищи не «идеальный» код, а устойчивые решения в боевых сервисах.',
            'Всегда задавай себе вопрос: «почему это написано именно так?» и выписывай гипотезы.',
            'Пытайся переписать кусок короче — если теряется смысл, значит оригинал был не случайным.'
        ],
        why: 'Чтение кода прокачивает архитектурное чутьё и даёт реальные паттерны, а не учебные примеры.',
        how: 'Заведи «читательский дневник кода»: ссылки, вырезки и короткие комментарии, что тебя удивило.',
        takeaway: 'Чужой код — это бесплатный ментор, если относиться к нему как к учебнику.'
    },
    {
        type: 'info',
        icon: 'fa-people-arrows',
        title: 'Код-ревью без токсичности',
        tagline: 'Feedback как инструмент роста',
        summary: 'Хорошее ревью улучшает систему и отношения в команде, а не самоутверждает ревьюера.',
        bullets: [
            'Сначала спроси про контекст: ограничения, дедлайны, компромиссы.',
            'Комментируй последствия: «так будет сложнее протестировать», а не «это плохой код».',
            'Предлагай варианты: показывай альтернативу, а не только проблему.'
        ],
        why: 'Тон ревью напрямую влияет на скорость доставки и желание людей брать сложные задачи.',
        how: 'Используй формат: «наблюдение → риск → предложение». Например: «этот if дублируется, это риск расхождения логики, давай вынесем в helper».',
        takeaway: 'Ревью — это разговор о рисках и архитектуре, а не соревнование в умности.'
    },
    {
        type: 'info',
        icon: 'fa-recycle',
        title: 'Работа с legacy-кодом',
        tagline: 'Рефакторинг без героизма',
        summary: 'Legacy — это код без контекста. Сначала восстанови контекст, потом трогай строки.',
        bullets: [
            'Добавляй тесты вокруг поведения, которое боишься сломать.',
            'Фиксируй предположения в комментариях к коммитам и ADR: зачем ты меняешь этот участок.',
            'Рефакторь по шагам: сперва сделать код наблюдаемым, потом безопасным, и только потом красивым.'
        ],
        why: 'Большая часть времени уходит не на новый код, а на эволюцию старого.',
        how: 'Не переписывай всё с нуля. Выделяй seam-ы (границы), через которые можно постепенно вытеснять старую реализацию.',
        takeaway: 'Сильный инженер умеет жить с legacy и уменьшать его, а не только писать «с нуля».'
    }
];

const theoryLibrary = {
    oop: [
        {
            icon: 'fa-shield-halved',
            title: 'Инварианты через инкапсуляцию',
            tagline: 'State as a contract',
            summary: 'Инкапсуляция — это не про private-поля, а про гарантии того, что объект не перейдёт в недопустимое состояние.',
            code: `class Account {
    #balance = 0;
    deposit(amount) {
        if (amount <= 0) throw new Error('only positive');
        this.#balance += amount;
    }
    transfer(target, amount) {
        if (amount > this.#balance) throw new Error('no funds');
        this.#balance -= amount;
        target.deposit(amount);
    }
}`,
            bullets: [
                'Инвариант: баланс не уходит в минус и меняется только через методы.',
                'Ошибки ловятся в одном месте, а не распределяются по коду.'
            ],
            why: 'Защищённые инварианты позволяют строить высокоуровневые сценарии без страха «сломать» объект.',
            how: 'Всегда формулируй, что объект гарантирует внешнему миру, и закрывай прямой доступ к состоянию.',
            takeaway: 'Инкапсуляция = контроль правил, а не просто приватность.'
        },
        {
            icon: 'fa-code-branch',
            title: 'Полиморфизм как расширяемость',
            tagline: 'Поведение по контракту',
            summary: 'Полиморфизм нужен, чтобы добавлять сценарии без изменения существующего кода.',
            code: `interface NotificationChannel {
    send(message: string): void;
}
class EmailChannel implements NotificationChannel {
    send(message) { console.log('Email', message); }
}
class SlackChannel implements NotificationChannel {
    send(message) { console.log('Slack', message); }
}
class IncidentNotifier {
    constructor(private channel: NotificationChannel) {}
    fire(message) { this.channel.send(message); }
}`,
            bullets: [
                'Бизнес-комбинаторика растёт быстрее, чем код — нужна точка расширения.',
                'Контракты упрощают тесты: подставил фейковый канал и проверил сценарий.'
            ],
            why: 'Новые каналы коммуникации появляются чаще, чем рефакторится ядро системы.',
            how: 'Описывай ожидаемое поведение интерфейсом и внедряй зависимости через конструктор.',
            takeaway: 'Полиморфизм — это про устойчивость к изменениям, а не про красивую иерархию.'
        }
    ],
    algorithms: [
        {
            icon: 'fa-chart-line',
            title: 'Алгоритмические коридоры',
            tagline: 'Сложность vs ограничения',
            summary: 'Перед выбором алгоритма нужно назвать ограничения входа: до 10⁴ — линейный перебор, до 10⁶ — логарифмы, выше — потоковые техники.',
            bullets: [
                'Данные < 10⁴ — можно позволить себе O(n²) и не усложнять код.',
                'Диапазон 10⁶–10⁷ — только O(n log n) и продуманная память.'
            ],
            why: 'Инженеру приходится аргументировать, почему решение выдержит трафик продукта.',
            how: 'Всегда озвучивай «коридор» перед кодом и обсуждай trade-off памяти/времени.',
            takeaway: 'Сложность — это язык общения с бизнесом о масштабируемости.'
        },
        {
            icon: 'fa-road',
            title: 'Жадные против динамики',
            tagline: 'Выбор стратегии',
            summary: 'Жадные алгоритмы быстры, если можно доказать локальную оптимальность. ДП — когда нужно хранить прошлые решения.',
            code: `function minCoins(amount, coins) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount];
}`,
            bullets: [
                'Если решение зависит только от текущего выбора — жадный подход.',
                'Если важно помнить путь — применяй табличку (ДП).'
            ],
            why: 'Не бывает «универсального» алгоритма — нужно объяснять логику выбора.',
            how: 'Проверь контрпример: если жадный провалится хоть раз, бери ДП.',
            takeaway: 'Определяй структуру задачи до того, как писать код.'
        }
    ],
    'data-structures': [
        {
            icon: 'fa-database',
            title: 'Структура = SLA операций',
            summary: 'Структура данных выбирается под конкретные гарантийные буквы (вставка, чтение, удаление).',
            bullets: [
                'Очередь — когда важна справедливость, стек — когда важна история.',
                'Хеши дают O(1) в среднем, но чувствительны к коллизиям.'
            ],
            why: 'Неверный выбор структуры становится бутылочным горлышком спустя месяцы.',
            how: 'Перед реализацией заполни таблицу операций: сколько раз в секунду, какая задержка допустима.',
            takeaway: 'Структура данных — архитектурное решение, а не деталь реализации.'
        },
        {
            icon: 'fa-tree',
            title: 'Когда нужны деревья',
            summary: 'Деревья выигрывают, когда нужно хранить частично упорядоченные данные и быстро искать диапазоны.',
            code: `class SegmentTree {
    constructor(nums) {
        this.size = nums.length;
        this.tree = Array(this.size * 2).fill(0);
        for (let i = 0; i < this.size; i++) this.tree[this.size + i] = nums[i];
        for (let i = this.size - 1; i > 0; i--) {
            this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
        }
    }
}`,
            bullets: ['Сегментные деревья отвечают на запросы диапазонов за O(log n).'],
            why: 'Когда данных много и запросов ещё больше, линейный перебор становится непозволительно дорогим.',
            how: 'Разбивай задачу на блоки (узлы), где каждый блок хранит агрегат.',
            takeaway: 'Дерево — компромисс между массивом и хешом.'
        }
    ],
    leetcode: [
        {
            icon: 'fa-list-check',
            title: 'Распознаём паттерн',
            summary: 'Любая задача на массивы сводится к 5 приёмам: два указателя, скользящее окно, префиксы, сортировка + merge, стеки.',
            bullets: ['Держи рядом таблицу «симптом → паттерн».', 'Вопрос про строки с ограничением k — почти всегда окно.'],
            why: 'На собеседовании побеждает тот, кто быстро узнаёт форму задачи.',
            how: 'После чтения условия отметь ключевые слова: «отсортировано», «k элементов», «подмассив» — это подсказки.',
            takeaway: 'Паттерн = сокращённый путь к решению.'
        },
        {
            icon: 'fa-repeat',
            title: 'Цикл обратной связи',
            summary: 'После каждого решения фиксируй, что можно автоматизировать: шаблон кода, тест, визуализация.',
            why: 'Так формируется долгосрочная память, а не просто счёт решённых задач.',
            how: 'Пиши короткий ADR: условие → найденный паттерн → в каком случае не сработает.',
            takeaway: 'LeetCode — это не про количество, а про скорость распознавания.'
        }
    ],
    'event-loop': [
        {
            icon: 'fa-infinity',
            title: 'Очереди задач',
            tagline: 'UX как договор',
            summary: 'Event Loop гарантирует, что синхронный стек выполняется до конца, а потом берётся следующая задача.',
            code: `console.log('sync');
queueMicrotask(() => console.log('micro'));
setTimeout(() => console.log('macro'), 0);`,
            bullets: ['Микрозадачи выполняются перед следующей перерисовкой.', 'Длинные макрозадачи = лаг UI.'],
            why: 'Без понимания очередей легко «подвесить» интерфейс таймером на 200мс.',
            how: 'Дроби тяжёлые операции на чанки < 16мс, измеряй в Performance профайлере.',
            takeaway: 'Уважай Event Loop — и пользователи не увидят спиннеры.'
        },
        {
            icon: 'fa-wand-magic-sparkles',
            title: 'Async/await как синтаксический сахар',
            summary: 'Await просто раскладывает промис на then, который попадает в очередь микрозадач.',
            why: 'Ошибки возникают, когда ожидают синхронности от async-функций.',
            how: 'Всегда учитывай, что после await управление возвращается в цикл событий — обнови состояние до await.',
            takeaway: 'Async/await — удобочитаемость, но не отмена асинхронной модели.'
        }
    ],
    solid: [
        {
            icon: 'fa-layer-group',
            title: 'SRP как контроль причин изменений',
            summary: 'Класс должен меняться по одной причине. Иначе релиз превращается в серийные регрессии.',
            bullets: ['Fix-ы бродят между классами, когда в них смешаны обязанности.', 'SRP = дешёвые тесты и простая замена.'],
            why: 'В продуктовой разработке требования меняются быстрее, чем пишется код.',
            how: 'На ревью задавай вопрос: «что вынудит изменить этот модуль?» — если причин >1, дели ответственность.',
            takeaway: 'SRP — это про устойчивость рефакторинга.'
        },
        {
            icon: 'fa-plug-circle-bolt',
            title: 'DIP и тестируемость',
            summary: 'Инфраструктурные детали (HTTP, хранилище, email) должны зависеть от абстракций, иначе сервисы невозможно тестировать.',
            code: `class BillingService {
    constructor(private payment: PaymentGateway) {}
    async charge(order) {
        await this.payment.pay(order.total);
    }
}`,
            why: 'Нам нужно уметь подменять зависимости без переписывания ядра.',
            how: 'Зависимости передаются извне (inversion) и мокируются на тестах.',
            takeaway: 'DIP — фундамент для конфигурируемой архитектуры.'
        }
    ],
    foundations: [
        {
            icon: 'fa-diagram-project',
            title: 'Cohesion vs Coupling',
            summary: 'Высокая связность внутри модуля и слабая между модулями — главный критерий архитектурной чистоты.',
            why: 'Случайное перемешивание обязанностей приводит к «мини-монолитам» и дорогому развитию.',
            how: 'Смотри на причины изменений: разные причины → разные модули.',
            takeaway: 'Cohesion — про скорость команды, Coupling — про стресс при релизах.'
        },
        {
            icon: 'fa-scale-balanced',
            title: 'Компромисс время/память',
            summary: 'Мемоизация, кэши, lookup-таблицы — всё это обмен памяти на скорость.',
            why: 'Нужно заранее планировать бюджет ресурсов, иначе оптимизация превратится в пожар.',
            how: 'Фиксируй SLA: сколько миллисекунд готов потратить, сколько мегабайт доступно.',
            takeaway: 'Хороший инженер объясняет, какой ресурс он покупает за счёт другого.'
        }
    ]
};

AppConfig.theory.global = globalTheoryInsights;
AppConfig.theory.byTab = theoryLibrary;

const COMPLETION_STORAGE_KEY = 'cs-prep.completedTabs';

// Мотивирующие цитаты в зависимости от процента правильных ответов
const motivationalQuotes = {
    excellent: [
        { text: "Превосходно! Ты настоящий мастер!", icon: "fa-rocket" },
        { text: "Невероятно! Твои знания на высшем уровне!", icon: "fa-star" },
        { text: "Отличная работа! Ты готов к любому собеседованию!", icon: "fa-trophy" }
    ],
    good: [
        { text: "Хорошая работа! Продолжай в том же духе!", icon: "fa-lightbulb" },
        { text: "Ты на правильном пути! Еще немного практики и будет идеально!", icon: "fa-book" },
        { text: "Отлично! Ты уже многого достиг!", icon: "fa-fire" }
    ],
    average: [
        { text: "Неплохо! Каждая ошибка - это шаг к совершенству!", icon: "fa-graduation-cap" },
        { text: "Продолжай учиться! Успех приходит с практикой!", icon: "fa-dumbbell" },
        { text: "Ты движешься в правильном направлении! Не сдавайся!", icon: "fa-bullseye" }
    ],
    needsImprovement: [
        { text: "Не расстраивайся! Каждый эксперт когда-то был новичком!", icon: "fa-seedling" },
        { text: "Продолжай практиковаться! Ты обязательно достигнешь цели!", icon: "fa-book-open" },
        { text: "Верь в себя! С каждым днем ты становишься лучше!", icon: "fa-star-half-alt" }
    ]
};

// Состояние приложения: хранит текущую вкладку, индексы вопросов и счетчики правильных ответов
const appState = {
    currentTab: 'oop',
    currentQuestionIndex: {}, // Индекс текущего вопроса для каждой вкладки
    correctAnswers: {}, // Количество правильных ответов для каждой вкладки
    completedTabs: loadCompletedTabs()
};

function loadCompletedTabs() {
    try {
        const raw = localStorage.getItem(COMPLETION_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (error) {
        console.warn('Не удалось загрузить статус тем:', error);
        return {};
    }
}

function saveCompletedTabs() {
    try {
        localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(appState.completedTabs));
    } catch (error) {
        console.warn('Не удалось сохранить статус тем:', error);
    }
}

function isTabCompleted(tabId) {
    return Boolean(appState.completedTabs && appState.completedTabs[tabId]);
}

function markTabCompleted(tabId, payload = {}) {
    appState.completedTabs[tabId] = {
        completedAt: new Date().toISOString(),
        ...payload
    };
    saveCompletedTabs();
    updateTabCompletionIndicators();
    updateHeroCompletionBadge(tabId);
}

function updateTabCompletionIndicators() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn) => {
        const tabId = btn.getAttribute('data-tab');
        const statusEl = btn.querySelector('.tab-status');
        const completed = isTabCompleted(tabId);
        btn.classList.toggle('tab-btn-completed', completed);
        if (statusEl) {
            statusEl.innerHTML = completed
                ? '<i class="fas fa-check-circle"></i> Пройдено'
                : '<i class="fas fa-book-open"></i> Теория + практика';
        }
    });
}

function updateHeroCompletionBadge(tabId) {
    const pill = document.querySelector(`.hero-progress-pill[data-hero-status="${tabId}"]`);
    if (!pill) return;
    const defaultLabel = pill.dataset.defaultLabel || 'Теория → Практика → Результат';
    if (isTabCompleted(tabId)) {
        pill.classList.add('completed');
        pill.innerHTML = '<i class="fas fa-check-circle"></i> Тема пройдена на 100%';
    } else {
        pill.classList.remove('completed');
        pill.innerHTML = `<i class="fas fa-book-reader"></i> ${defaultLabel}`;
    }
}

function scrollPracticeIntoView() {
    const practicePanel = document.querySelector('.practice-panel');
    if (!practicePanel) return;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    practicePanel.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================================

/**
 * Проверяет, отвечен ли вопрос (есть ли хотя бы одна отключенная кнопка ответа)
 * @param {HTMLElement} questionCard - карточка вопроса
 * @returns {boolean} - true если вопрос отвечен
 */
function isQuestionAnswered(questionCard) {
    const buttons = questionCard.querySelectorAll('.answer-btn');
    return Array.from(buttons).some(btn => btn.disabled);
}

/**
 * Проверяет, все ли вопросы отвечены в текущей вкладке
 * @param {NodeList} questions - список вопросов
 * @returns {boolean} - true если все вопросы отвечены
 */
function areAllQuestionsAnswered(questions) {
    return Array.from(questions).every(q => isQuestionAnswered(q));
}

/**
 * Получает контейнер для вопросов текущей вкладки
 * @param {string} tabId - ID вкладки
 * @returns {HTMLElement} - контейнер с вопросами
 */
function getQuestionsContainer(tabId) {
    const practicePanel = document.querySelector('.practice-panel');
    if (!practicePanel) return document.getElementById('content');
    return practicePanel.querySelector('.questions-container') || practicePanel;
}

/**
 * Получает все вопросы текущей вкладки
 * @param {string} tabId - ID вкладки
 * @returns {NodeList} - список вопросов
 */
function getQuestions(tabId) {
    const practicePanel = document.querySelector('.practice-panel');
    if (!practicePanel) return document.querySelectorAll('.question-card');
    return practicePanel.querySelectorAll('.question-card');
}

/**
 * Получает или создает контейнер навигации
 * @param {HTMLElement} container - родительский контейнер
 * @returns {HTMLElement} - контейнер навигации
 */
function getOrCreateNavigationContainer(container) {
    let navContainer = container.querySelector('.question-navigation');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'question-navigation';
        container.appendChild(navContainer);
    }
    return navContainer;
}

/**
 * Получает или создает контейнер результатов
 * @param {HTMLElement} container - родительский контейнер
 * @returns {HTMLElement} - контейнер результатов
 */
function getOrCreateResultsContainer(container) {
    let resultsContainer = container.querySelector('.results-container');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-container hidden';
        container.appendChild(resultsContainer);
    }
    return resultsContainer;
}

function applyCodeHighlighting() {
    if (typeof hljs === 'undefined') return;
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

function renderInfoCard(card) {
    const rawTitle = card.title || 'Теория';
    const title = rawTitle.replace(/^\d+\.\s*/, '');
    const summary = card.summary ? `<p class="info-summary">${card.summary}</p>` : '';
    const bullets = Array.isArray(card.bullets) && card.bullets.length
        ? `<ul class="info-bullets">${card.bullets.map(item => `<li>${item}</li>`).join('')}</ul>`
        : '';
    const meta = Array.isArray(card.meta) && card.meta.length
        ? `<div class="info-meta">${card.meta.map(label => `<span class="info-pill">${label}</span>`).join('')}</div>`
        : '';
    const sections = [];
    if (card.why) sections.push({ label: 'Почему важно', icon: 'fa-lightbulb', text: card.why });
    if (card.how) sections.push({ label: 'Как применять', icon: 'fa-screwdriver-wrench', text: card.how });
    if (card.takeaway) sections.push({ label: 'Что запомнить', icon: 'fa-bookmark', text: card.takeaway });
    const sectionsHtml = sections.length
        ? `<div class="info-sections">${sections.map(section => `
            <div class="info-section">
                <div class="info-section-title"><i class="fas ${section.icon}"></i>${section.label}</div>
                <p>${section.text}</p>
            </div>
        `).join('')}</div>`
        : '';
    const quote = card.quote ? `<div class="info-quote"><i class="fas fa-quote-left"></i><p>${card.quote}</p></div>` : '';
    const codeBlock = card.code ? `
        <div class="code-block"><pre><code class="language-typescript">${card.code}</code></pre></div>
    ` : '';
    return `
        <article class="info-card">
            <div class="info-header">
                ${card.icon ? `<div class="info-icon"><i class="fas ${card.icon}"></i></div>` : ''}
                <div class="info-headings">
                    <h2>${title}</h2>
                    ${card.tagline ? `<p class="info-tagline">${card.tagline}</p>` : ''}
                    ${meta}
                </div>
            </div>
            ${summary}
            ${codeBlock}
            ${bullets}
            ${sectionsHtml}
            ${quote}
        </article>
    `;
}

function renderQuestionCard(question, index) {
    const codeBlock = question.code ? `
        <div class="code-block"><pre><code class="language-typescript">${question.code}</code></pre></div>
    ` : '';
    const answers = (question.answers || []).map(answer => `
        <button type="button" class="answer-btn" ${answer.correct ? 'data-correct="true"' : ''}>${answer.text}</button>
    `).join('');
    const explanation = question.explanation ? `
        <div class="explanation hidden">
            <strong>Ответ:</strong>
            ${question.explanation.split('\n\n').map(para => `<p>${para}</p>`).join('')}
        </div>
    ` : '';
    return `
        <div class="question-card${index === 0 ? ' active' : ''}" data-question-index="${index}">
            <h2>${question.title}</h2>
            ${codeBlock}
            <div class="question">
                <p><strong>Вопрос:</strong> ${question.question || 'Что выведется в консоль и почему?'}</p>
                <div class="answers">${answers}</div>
                ${explanation}
            </div>
        </div>
    `;
}

function renderTheoryContent(tabId, theoryEntries, hasPractice) {
    const theoryPanel = document.querySelector('.theory-panel');
    if (!theoryPanel) return;
    const meta = tabMetaMap[tabId] || {};
    const heroHTML = `
        <div class="theory-hero">
            <p class="hero-eyebrow">${meta.eyebrow || 'Теоретический обзор'}</p>
            <div class="hero-headline">
                <h2>${meta.hero || meta.title || 'Раздел'}</h2>
                <span class="hero-progress-pill" data-hero-status="${tabId}" data-default-label="Теория → Практика → Результат">
                    <i class="fas fa-book-reader"></i> Теория → Практика → Результат
                </span>
            </div>
            <p class="hero-description">${meta.description || 'Собери контекст, а затем закрепи тестами.'}</p>
        </div>
    `;
    const body = theoryEntries.length
        ? `<div class="theory-stream">${theoryEntries.map(renderInfoCard).join('')}</div>`
        : `<div class="theory-empty">
                <i class="fas fa-mug-hot"></i>
                <p>Теоретические заметки появятся позже. Пока можно перейти сразу к тестам.</p>
            </div>`;
    const practiceCta = hasPractice ? `
        <div class="practice-launch">
            <div class="practice-launch-copy">
                <p class="practice-launch-eyebrow">Готов проверить себя?</p>
                <h3>Закрепи тему мини-тестом</h3>
                <p>Пройди ${hasPractice ? 'короткое тестирование' : 'тестирование'} и отметь раздел как «пройденный», если возьмёшь 100%.</p>
            </div>
            <button type="button" class="practice-launch-btn" data-action="launch-practice" data-tab="${tabId}">
                <i class="fas fa-clipboard-check"></i>
                Пройти тестирование
            </button>
        </div>
    ` : '';
    theoryPanel.innerHTML = heroHTML + body + practiceCta;
    updateHeroCompletionBadge(tabId);
    applyCodeHighlighting();
}

function splitTabEntries(rawEntries, tabId) {
    const practiceQuestions = [];
    const theoryByTab = AppConfig.theory.byTab || {};
    const theoryEntries = theoryByTab[tabId] ? [...theoryByTab[tabId]] : [];
    rawEntries.forEach((entry) => {
        if (entry && entry.type === 'info') theoryEntries.push(entry);
        else practiceQuestions.push(entry);
    });

    const usedTitles = new Set(theoryEntries.map(item => normalizeTheoryTitle(item.title)));
    practiceQuestions
        .filter(Boolean)
        .forEach((question) => {
            const generated = createTheoryEntryFromQuestion(question);
            const key = normalizeTheoryTitle(generated.title);
            if (!usedTitles.has(key)) {
                theoryEntries.push(generated);
                usedTitles.add(key);
            }
        });

    return { theoryEntries, practiceQuestions };
}

function createTheoryEntryFromQuestion(question) {
    const paragraphs = (question.explanation || '')
        .split('\n\n')
        .map(part => part.trim())
        .filter(Boolean);
    const why = extractParagraphByLabel(paragraphs, 'Почему');
    const how = extractParagraphByLabel(paragraphs, 'Как');
    const takeaway = extractParagraphByLabel(paragraphs, 'Зачем');
    const summary = buildTheorySummary(paragraphs, why, question);
    return {
        icon: 'fa-chalkboard-teacher',
        title: question.title.replace(/^\d+\.\s*/, ''),
        tagline: 'Инженерный инсайт',
        summary,
        code: question.code,
        why,
        how,
        takeaway
    };
}

function extractParagraphByLabel(paragraphs, label) {
    const prefix = `${label}:`;
    const paragraph = paragraphs.find(part => part.startsWith(prefix));
    return paragraph ? paragraph.slice(prefix.length).trim() : undefined;
}

function buildTheorySummary(paragraphs, why, question) {
    if (why) return why;
    const neutralParagraph = paragraphs.find(part => !/^Правильный ответ/i.test(part) && !/^Почему:/i.test(part) && !/^Зачем:/i.test(part) && !/^Как:/i.test(part));
    if (neutralParagraph) return neutralParagraph;
    return question.question || 'Перед практикой разберём ключевую идею и её ограничения.';
}

function normalizeTheoryTitle(title = '') {
    return title.trim().toLowerCase();
}

function renderPracticeContent(tabId, questions) {
    const practicePanel = document.querySelector('.practice-panel');
    if (!practicePanel) return;
    if (!questions.length) {
        practicePanel.innerHTML = `
            <div class="practice-empty">
                <i class="fas fa-clipboard-list"></i>
                <p>Пока для этой темы нет тестов. Перечитай теорию и загляни позже.</p>
            </div>
        `;
        collapsePracticePanel();
        return;
    }
    practicePanel.innerHTML = `
        <div class="practice-header">
            <p class="practice-eyebrow">Проверка понимания</p>
            <h3>Давай закрепим тему тестом</h3>
            <p>Ответь на ${questions.length} вопросов подряд, чтобы отметить тему пройденной.</p>
            <div class="practice-controls">
                <button type="button" class="practice-close-btn" data-action="back-to-theory">
                    <i class="fas fa-arrow-left"></i>
                    Вернуться к теории
                </button>
            </div>
        </div>
        <div class="questions-container">
            ${questions.map(renderQuestionCard).join('')}
        </div>
    `;
    practicePanel.dataset.tab = tabId;
    applyCodeHighlighting();
}

function collapsePracticePanel(options = {}) {
    const practicePanel = document.querySelector('.practice-panel');
    if (!practicePanel) return;
    practicePanel.classList.add('practice-panel-collapsed');
    practicePanel.setAttribute('aria-hidden', 'true');
    setTheoryVisibility(true);
    syncShellLayout();
    if (!options.silent) {
        const hero = document.querySelector('.theory-panel');
        if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showPracticePanel() {
    const practicePanel = document.querySelector('.practice-panel');
    if (!practicePanel) return;
    practicePanel.classList.remove('practice-panel-collapsed');
    practicePanel.setAttribute('aria-hidden', 'false');
    setTheoryVisibility(false);
    syncShellLayout();
    scrollPracticeIntoView();
}

function isPracticePanelCollapsed() {
    const practicePanel = document.querySelector('.practice-panel');
    return practicePanel ? practicePanel.classList.contains('practice-panel-collapsed') : false;
}

function isTheoryPanelHidden() {
    const theoryPanel = document.querySelector('.theory-panel');
    return theoryPanel ? theoryPanel.classList.contains('theory-panel-hidden') : false;
}

function setTheoryVisibility(isVisible) {
    const theoryPanel = document.querySelector('.theory-panel');
    if (!theoryPanel) return;
    theoryPanel.classList.toggle('theory-panel-hidden', !isVisible);
    theoryPanel.setAttribute('aria-hidden', String(!isVisible));
}

function syncShellLayout() {
    const shell = document.querySelector('.tab-content-shell');
    if (!shell) return;
    const practiceCollapsed = isPracticePanelCollapsed();
    const theoryHidden = isTheoryPanelHidden();
    shell.classList.toggle('practice-hidden', practiceCollapsed && !theoryHidden);
    shell.classList.toggle('practice-only', !practiceCollapsed && theoryHidden);
    if (!practiceCollapsed && !theoryHidden) {
        shell.classList.remove('practice-hidden', 'practice-only');
    }
}

/**
 * Определяет категорию результата по проценту правильных ответов
 * @param {number} percentage - процент правильных ответов
 * @returns {string} - категория результата
 */
function getResultCategory(percentage) {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'needsImprovement';
}

/**
 * Сбрасывает состояние всех вопросов (используется при перезапуске теста)
 * @param {NodeList} questions - список вопросов для сброса
 */
function resetQuestions(questions) {
    questions.forEach((q, index) => {
        // Показываем только первый вопрос
        q.classList.toggle('active', index === 0);
        
        // Сбрасываем кнопки ответов
        const buttons = q.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
        
        // Скрываем объяснения
        const explanation = q.querySelector('.explanation');
        if (explanation) {
            explanation.classList.add('hidden');
        }
    });
}

// ============================================================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================================================

/**
 * Инициализация приложения при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
    buildLayout();
    initializeApp();
    setupEventListeners();
    setupKeyboardAccessibility();
});

/**
 * Инициализирует состояние приложения и показывает первый вопрос каждой вкладки
 */
function initializeApp() {
    renderTabs();
    switchTab(appState.currentTab);
}

/**
 * Настраивает обработчики событий для всего приложения
 * Используется делегирование событий для работы с динамически создаваемыми элементами
 */
function setupEventListeners() {
    document.addEventListener('click', handleDocumentClick);
}

function setupKeyboardAccessibility() {
    const tabList = document.querySelector('.tabs');
    if (!tabList) return;
    tabList.addEventListener('keydown', (e) => {
        const tabs = Array.from(tabList.querySelectorAll('.tab-btn[role="tab"]'));
        const currentIndex = tabs.findIndex(t => t === document.activeElement);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            let newIndex = currentIndex;
            if (e.key === 'ArrowRight') newIndex = Math.min(tabs.length - 1, currentIndex + 1);
            else newIndex = Math.max(0, currentIndex - 1);
            tabs[newIndex].focus();
        }
        if (e.key === 'Home') {
            e.preventDefault();
            tabs[0].focus();
        }
        if (e.key === 'End') {
            e.preventDefault();
            tabs[tabs.length - 1].focus();
        }
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            const tabId = focused && focused.getAttribute('data-tab');
            if (tabId) {
                e.preventDefault();
                switchTab(tabId);
            }
        }
    });
}

/**
 * Обрабатывает клики по документу (делегирование событий)
 * @param {Event} e - событие клика
 */
function handleDocumentClick(e) {
    if (e.target.classList.contains('answer-btn')) {
        handleAnswerClick(e.target);
        return;
    }
    const launchBtn = e.target.closest('[data-action="launch-practice"]');
    if (launchBtn) {
        showPracticePanel();
        updateNavigation();
        return;
    }
    const backBtn = e.target.closest('[data-action="back-to-theory"]');
    if (backBtn) {
        collapsePracticePanel();
        updateNavigation();
        return;
    }
    if (e.target.classList.contains('nav-btn-prev') || e.target.closest('.nav-btn-prev')) {
        navigateQuestion(-1);
        return;
    }
    if (e.target.classList.contains('nav-btn-next') || e.target.closest('.nav-btn-next')) {
        const btn = e.target.closest('.nav-btn-next') || e.target;
        if (btn.dataset.action === 'show-results') {
            showResults();
        } else {
            navigateQuestion(1);
        }
        return;
    }
    if (e.target.classList.contains('restart-btn') || e.target.closest('.restart-btn')) {
        restartSection();
    }
}

function buildLayout() {
    const container = document.querySelector('.container');
    if (!container) return;
    container.innerHTML = `
        <header>
            <div class="hero-eyebrow">Mindful Prep · Теория → Практика → Проверка</div>
            <h1><i class="fas fa-graduation-cap"></i> Concept Prep Lab</h1>
            <p class="subtitle">Каждая тема начинается с понятной теории, заканчивается тестом и фиксируется как «пройденная», когда ты берёшь 100%.</p>
            <div class="hero-grid">
                <article class="hero-card">
                    <div class="hero-icon"><i class="fas fa-lightbulb"></i></div>
                    <div>
                        <h2>1. Теория с контекстом</h2>
                        <p>Short essays объясняют «зачем» и «почему» на языке инженера, а не учебника.</p>
                    </div>
                </article>
                <article class="hero-card">
                    <div class="hero-icon"><i class="fas fa-code"></i></div>
                    <div>
                        <h2>2. Примеры кода</h2>
                        <p>Каждый блок сопровождается работающим TypeScript/JS фрагментом и разбором.</p>
                    </div>
                </article>
                <article class="hero-card">
                    <div class="hero-icon"><i class="fas fa-clipboard-check"></i></div>
                    <div>
                        <h2>3. Тест на закрепление</h2>
                        <p>Проходишь мини-тест в конце раздела: 100% = тема считается выученной.</p>
                    </div>
                </article>
            </div>
        </header>
        <div class="tabs" role="tablist" aria-label="Разделы"></div>
        <section class="tab-content-shell">
            <aside class="theory-panel" aria-live="polite"></aside>
            <div id="content" class="practice-panel" aria-live="polite"></div>
        </section>
    `;
}

function renderTabs() {
    const tabsEl = document.querySelector('.tabs');
    if (!tabsEl) return;
    tabsEl.innerHTML = AppConfig.tabs.map((tab, i) => `
        <button
            type="button"
            id="tab-${tab.id}"
            class="tab-btn${i===0?' active':''}"
            role="tab"
            aria-selected="${i===0}"
            aria-controls="${tab.id}"
            tabindex="${i===0?'0':'-1'}"
            data-tab="${tab.id}"
        >
            <span class="tab-title">${tab.title}</span>
            <span class="tab-status">
                <i class="fas fa-book-open"></i> Теория + практика
            </span>
        </button>
    `).join('');
    tabsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        switchTab(btn.dataset.tab);
    });
    updateTabCompletionIndicators();
}

function renderTabContent(tabId) {
    const content = document.getElementById('content');
    const theoryPanel = document.querySelector('.theory-panel');
    if (!content || !theoryPanel) return;
    if (tabId === 'theory') {
        const theoryEntries = globalTheoryInsights;
        appState.currentQuestionIndex[tabId] = 0;
        appState.correctAnswers[tabId] = 0;
        renderTheoryContent(tabId, theoryEntries, false);
        renderPracticeContent(tabId, []);
        collapsePracticePanel({ silent: true });
        updateNavigation();
        return;
    }
    const sections = {
        oop: [
            {
                title: '1. Инкапсуляция',
                code: `class BankAccount {\n    private balance: number = 0;\n    \n    public deposit(amount: number): void {\n        this.balance += amount;\n    }\n    \n    public getBalance(): number {\n        return this.balance;\n    }\n}\n\nconst account = new BankAccount();\naccount.deposit(100);\n// account.balance = 500; // Ошибка!\nconsole.log(account.getBalance());`,
                question: 'Что выведется в консоль и почему?',
                answers: [
                    { text: 'A) 100 (balance приватный, доступен только через методы)', correct: true },
                    { text: 'B) 0 (метод deposit не работает)', correct: false },
                    { text: 'C) Ошибка компиляции', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Инкапсуляция скрывает внутреннее состояние объекта (balance) и предоставляет контролируемый доступ через публичные методы. Это защищает данные от несанкционированного изменения.\n\nЗачем: Инкапсуляция обеспечивает безопасность данных и позволяет контролировать, как можно взаимодействовать с объектом. В реальных приложениях это предотвращает случайные или злонамеренные изменения критических данных.'
            },
            {
                title: '2. Наследование',
                code: `class Animal {\n    protected name: string;\n    constructor(name: string) {\n        this.name = name;\n    }\n    speak(): void {\n        console.log(\`${'${this.name}'} издает звук\`);\n    }\n}\nclass Dog extends Animal {\n    speak(): void {\n        console.log(\`${'${this.name}'} лает: Гав-гав!\`);\n    }\n}\nconst dog = new Dog('Рекс');\ndog.speak();`,
                answers: [
                    { text: 'A) "Рекс издает звук"', correct: false },
                    { text: 'B) "Рекс лает: Гав-гав!"', correct: true },
                    { text: 'C) Ошибка (name недоступен)', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Класс Dog переопределяет метод speak() родительского класса Animal. Когда мы вызываем dog.speak(), выполняется версия метода из класса Dog, а не из Animal. Поле name доступно, так как оно объявлено как protected в родительском классе.\n\nЗачем: Наследование позволяет создавать специализированные классы на основе общих, переиспользуя код и расширяя функциональность. Это ключевой принцип ООП, который помогает избежать дублирования кода и создавать иерархии классов с общим поведением.'
            },
            {
                title: '3. Полиморфизм',
                code: `class Shape {\n    area(): number {\n        return 0;\n    }\n}\nclass Circle extends Shape {\n    constructor(private radius: number) {\n        super();\n    }\n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}\nclass Rectangle extends Shape {\n    constructor(private width: number, private height: number) {\n        super();\n    }\n    area(): number {\n        return this.width * this.height;\n    }\n}\nconst shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];\nshapes.forEach(shape => console.log(shape.area()));`,
                answers: [
                    { text: 'A) 0, 0', correct: false },
                    { text: 'B) ~78.54, 24', correct: true },
                    { text: 'C) Ошибка типизации', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Полиморфизм позволяет работать с объектами разных классов через общий интерфейс (базовый класс Shape). Массив shapes содержит объекты типа Circle и Rectangle, но TypeScript позволяет хранить их как Shape[], потому что оба класса наследуются от Shape. При вызове area() для каждого элемента выполняется соответствующая реализация метода: для Circle вычисляется площадь круга (π × 5² ≈ 78.54), для Rectangle — площадь прямоугольника (4 × 6 = 24).\n\nЗачем: Полиморфизм — это мощный инструмент для написания гибкого и расширяемого кода. Вы можете добавлять новые типы фигур (Triangle, Square и т.д.) без изменения кода, который работает с массивом shapes. Это соответствует принципу Open/Closed: код открыт для расширения, но закрыт для модификации.'
            },
            {
                title: '4. Абстракция',
                code: `abstract class Vehicle {\n    abstract start(): void;\n    abstract stop(): void;\n    protected move(): void {\n        console.log('Движется...');\n    }\n}\nclass Car extends Vehicle {\n    start(): void {\n        console.log('Заводим двигатель');\n        this.move();\n    }\n    stop(): void {\n        console.log('Останавливаем двигатель');\n    }\n}\nconst car = new Car();\ncar.start();`,
                answers: [
                    { text: 'A) Ошибка компиляции', correct: false },
                    { text: 'B) "Заводим двигатель" и "Движется..."', correct: true },
                    { text: 'C) Ничего не выведется', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Абстрактный класс Vehicle определяет контракт (абстрактные методы start и stop), который должны реализовать все наследники. Класс Car реализует метод start(), который выводит "Заводим двигатель" и затем вызывает защищенный метод move() из родительского класса, который выводит "Движется...". Абстрактные классы нельзя инстанцировать напрямую (new Vehicle() вызовет ошибку), но можно создавать экземпляры их конкретных реализаций.\n\nЗачем: Абстракция позволяет определить общий интерфейс для группы связанных классов, скрывая детали реализации. Это помогает создавать более понятную архитектуру: вы определяете "что должно быть сделано" в абстрактном классе, а "как это сделать" — в конкретных реализациях. Это упрощает поддержку кода и делает систему более гибкой.'
            },
            {
                title: '5. This в классах',
                code: `class Counter {\n    private count: number = 0;\n    increment(): void {\n        this.count++;\n    }\n    getCount = (): number => {\n        return this.count;\n    }\n    getCountRegular(): number {\n        return this.count;\n    }\n}\nconst counter = new Counter();\nconst getCountRef = counter.getCount;\nconst getCountRegularRef = counter.getCountRegular;\ncounter.increment();\nconsole.log(getCountRef());\nconsole.log(getCountRegularRef());`,
                answers: [
                    { text: 'A) 1 и ошибка TypeError', correct: true },
                    { text: 'B) 1 и 1', correct: false },
                    { text: 'C) undefined и undefined', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Стрелочная функция getCount сохраняет контекст this из момента создания класса, поэтому getCountRef() работает корректно и возвращает 1. Обычная функция getCountRegular теряет контекст this при присваивании в переменную getCountRegularRef, потому что this в обычных функциях определяется в момент вызова. Когда мы вызываем getCountRegularRef() как обычную функцию (не как метод объекта), this становится undefined (в strict mode), что приводит к ошибке TypeError при попытке обращения к this.count.\n\nЗачем: Понимание контекста this критически важно в JavaScript/TypeScript, особенно при работе с колбэками, обработчиками событий и асинхронным кодом. Стрелочные функции решают проблему потери контекста, что делает код более предсказуемым. В классах рекомендуется использовать стрелочные функции для методов, которые будут передаваться как колбэки.'
            }
        ],
        algorithms: [
            {
                title: '1. Бинарный поиск',
                code: `function binarySearch(arr: number[], target: number): number {\n    let left = 0;\n    let right = arr.length - 1;\n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        if (arr[mid] === target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\nconsole.log(binarySearch([1,3,5,7,9,11],7));`,
                answers: [
                    { text: 'A) 3, O(log n)', correct: true },
                    { text: 'B) 7, O(n)', correct: false },
                    { text: 'C) -1, O(n log n)', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Бинарный поиск находит элемент 7 на индексе 3 в массиве [1,3,5,7,9,11]. Алгоритм работает следующим образом: на каждой итерации он делит массив пополам и проверяет средний элемент. Если средний элемент меньше искомого, поиск продолжается в правой половине, если больше — в левой. Временная сложность O(log n), потому что на каждом шаге размер области поиска уменьшается вдвое.\n\nЗачем: Бинарный поиск — один из самых эффективных алгоритмов поиска для отсортированных данных. Вместо перебора всех элементов (O(n)), он находит результат за логарифмическое время. Например, в массиве из 1 миллиона элементов линейный поиск может потребовать до 1 млн операций, а бинарный — всего около 20. Это критично для высоконагруженных систем и больших объемов данных.'
            },
            {
                title: '2. Рекурсия и стек вызовов',
                code: `function factorial(n: number): number {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\nfunction factorialTail(n: number, acc: number = 1): number {\n    if (n <= 1) return acc;\n    return factorialTail(n - 1, n * acc);\n}\nconsole.log(factorial(5));\nconsole.log(factorialTail(5));`,
                answers: [
                    { text: 'A) 120, 120', correct: true },
                    { text: 'B) 5, 5', correct: false },
                    { text: 'C) Ошибка переполнения стека', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Обе функции вычисляют факториал числа 5, что равно 5! = 5 × 4 × 3 × 2 × 1 = 120. Первая функция factorial использует обычную рекурсию: она вызывает себя и затем умножает результат на n. Вторая функция factorialTail использует хвостовую рекурсию: результат накапливается в параметре acc, и рекурсивный вызов — это последняя операция функции. Для n=5 обе работают корректно, но для больших значений обычная рекурсия может вызвать переполнение стека.\n\nЗачем: Хвостовая рекурсия теоретически может быть оптимизирована компилятором (Tail Call Optimization, TCO), превращая рекурсию в цикл и избегая роста стека вызовов. Однако в JavaScript/TypeScript TCO практически не поддерживается, поэтому для больших значений n лучше использовать итеративный подход (цикл). Понимание разницы между типами рекурсии важно для написания эффективного кода и избежания ошибок переполнения стека.'
            },
            {
                title: '3. Два указателя',
                code: `function hasPairSum(arr: number[], target: number): boolean {\n    let left = 0;\n    let right = arr.length - 1;\n    while (left < right) {\n        const sum = arr[left] + arr[right];\n        if (sum === target) return true;\n        if (sum < target) left++;\n        else right--;\n    }\n    return false;\n}\nconsole.log(hasPairSum([1,2,3,4,5],7));`,
                answers: [
                    { text: 'A) true, O(n)', correct: true },
                    { text: 'B) false', correct: false },
                    { text: 'C) true, O(n²)', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Алгоритм "два указателя" использует два индекса: left (начало) и right (конец) отсортированного массива. Для массива [1,2,3,4,5] и target=7 алгоритм находит пару (2,5): left указывает на 1, right на 5, сумма 6 < 7, поэтому left++; теперь left на 2, right на 5, сумма 7 = target, возвращается true. Временная сложность O(n), потому что в худшем случае мы проходим массив один раз, двигая указатели навстречу друг другу.\n\nЗачем: Техника "два указателя" — это элегантное решение для многих задач на массивах и строках. Вместо вложенных циклов O(n²), которые проверяют все пары элементов, мы используем один проход O(n). Это особенно полезно для задач на отсортированных данных: поиск пар с заданной суммой, удаление дубликатов, слияние массивов. Понимание этой техники — must-have для технических собеседований.'
            },
            {
                title: '4. Скользящее окно',
                code: `function maxSumSubarray(arr: number[], k: number): number {\n    let maxSum = 0;\n    let windowSum = 0;\n    for (let i = 0; i < k; i++) {\n        windowSum += arr[i];\n    }\n    maxSum = windowSum;\n    for (let i = k; i < arr.length; i++) {\n        windowSum = windowSum - arr[i - k] + arr[i];\n        maxSum = Math.max(maxSum, windowSum);\n    }\n    return maxSum;\n}\nconsole.log(maxSumSubarray([2,1,5,1,3,2],3));`,
                answers: [
                    { text: 'A) 8', correct: false },
                    { text: 'B) 9', correct: true },
                    { text: 'C) 12', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Алгоритм скользящего окна находит максимальную сумму подмассива размера k=3 в массиве [2,1,5,1,3,2]. Сначала вычисляется сумма первого окна: 2+1+5=8. Затем окно "скользит" вправо: убираем первый элемент (2) и добавляем следующий (1): 8-2+1=8. Следующий шаг: 8-1+5=12, но это неверно. Правильно: окна [2,1,5]=8, [1,5,1]=7, [5,1,3]=9, [1,3,2]=6. Максимум = 9.\n\nЗачем: Скользящее окно — это оптимизационная техника, которая позволяет избежать пересчета всей суммы для каждого подмассива. Наивный подход (вложенные циклы) имеет сложность O(n×k), а скользящее окно — O(n). Для больших массивов это дает огромный выигрыш в производительности. Техника применяется в задачах на подстроки, подмассивы, анализ временных рядов и потоковую обработку данных.'
            },
            {
                title: '5. Быстрая сортировка',
                code: `function quickSort(arr: number[]): number[] {\n    if (arr.length <= 1) return arr;\n    const pivot = arr[Math.floor(arr.length / 2)];\n    const left = arr.filter(x => x < pivot);\n    const middle = arr.filter(x => x === pivot);\n    const right = arr.filter(x => x > pivot);\n    return [...quickSort(left), ...middle, ...quickSort(right)];\n}\nconsole.log(quickSort([3,6,8,10,1,2,1]));`,
                answers: [
                    { text: 'A) [1,1,2,3,6,8,10], O(n log n)', correct: false },
                    { text: 'B) [1,1,2,3,6,8,10], худший O(n²)', correct: true },
                    { text: 'C) [3,6,8,10,1,2,1], O(n)', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Быстрая сортировка (QuickSort) выбирает опорный элемент (pivot) и разделяет массив на три части: элементы меньше pivot, равные pivot и больше pivot. Затем рекурсивно сортирует левую и правую части. Для массива [3,6,8,10,1,2,1] результат [1,1,2,3,6,8,10]. Средняя сложность O(n log n), но в худшем случае (когда pivot всегда минимальный или максимальный элемент, например, для уже отсортированного массива) сложность деградирует до O(n²).\n\nЗачем: QuickSort — один из самых быстрых алгоритмов сортировки на практике благодаря хорошей локальности данных и низким константным факторам. Несмотря на худший случай O(n²), при правильном выборе pivot (например, случайный или медиана трех) вероятность худшего случая крайне мала. Понимание компромиссов между разными алгоритмами сортировки (QuickSort, MergeSort, HeapSort) важно для выбора оптимального решения в конкретной ситуации.'
            }
        ],
        'data-structures': [
            {
                title: '1. Стек',
                code: `class Stack<T> {\n    private items: T[] = [];\n    push(item: T): void {\n        this.items.push(item);\n    }\n    pop(): T | undefined {\n        return this.items.pop();\n    }\n    peek(): T | undefined {\n        return this.items[this.items.length - 1];\n    }\n}\nconst stack = new Stack<number>();\nstack.push(1);\nstack.push(2);\nstack.push(3);\nconsole.log(stack.pop());\nconsole.log(stack.peek());`,
                answers: [
                    { text: 'A) 1, 2', correct: false },
                    { text: 'B) 3, 2', correct: true },
                    { text: 'C) 3, 3', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Стек работает по принципу LIFO (Last In, First Out) — последний вошел, первый вышел. Мы добавляем элементы 1, 2, 3 в стек. Метод pop() удаляет и возвращает последний добавленный элемент (3). Метод peek() возвращает верхний элемент стека без удаления (теперь это 2, так как 3 уже удалена).\n\nЗачем: Стек — фундаментальная структура данных, используемая повсеместно: стек вызовов функций, отмена операций (Undo), обход деревьев в глубину (DFS), парсинг выражений, проверка сбалансированности скобок. Операции push и pop выполняются за O(1), что делает стек очень эффективным. Понимание стека критично для понимания работы программ на низком уровне и решения многих алгоритмических задач.'
            },
            {
                title: '2. Очередь',
                code: `class Queue<T> {\n    private items: T[] = [];\n    enqueue(item: T): void {\n        this.items.push(item);\n    }\n    dequeue(): T | undefined {\n        return this.items.shift();\n    }\n    front(): T | undefined {\n        return this.items[0];\n    }\n}\nconst queue = new Queue<number>();\nqueue.enqueue(1);\nqueue.enqueue(2);\nqueue.enqueue(3);\nconsole.log(queue.dequeue());\nconsole.log(queue.front());`,
                answers: [
                    { text: 'A) 1, 2', correct: true },
                    { text: 'B) 3, 2', correct: false },
                    { text: 'C) 1, 1', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Очередь работает по принципу FIFO (First In, First Out) — первый вошел, первый вышел. Мы добавляем элементы 1, 2, 3 в очередь методом enqueue. Метод dequeue() удаляет и возвращает первый добавленный элемент (1). Метод front() возвращает первый элемент очереди без удаления (теперь это 2, так как 1 уже удалена).\n\nЗачем: Очередь используется везде, где нужна обработка в порядке поступления: очередь задач, обработка событий, BFS (обход графа в ширину), управление ресурсами, буферизация данных. В реальных системах очереди обеспечивают справедливость обработки запросов и предотвращают "голодание" старых задач. Операции enqueue и dequeue должны выполняться за O(1), хотя в данной реализации shift() работает за O(n) — в продакшене используют кольцевые буферы или связанные списки.'
            },
            {
                title: '3. Хеш-таблица',
                code: `class HashMap<K, V> {\n    private buckets: Map<K, V> = new Map();\n    set(key: K, value: V): void {\n        this.buckets.set(key, value);\n    }\n    get(key: K): V | undefined {\n        return this.buckets.get(key);\n    }\n    has(key: K): boolean {\n        return this.buckets.has(key);\n    }\n}\nconst map = new HashMap<string, number>();\nmap.set('apple', 5);\nmap.set('banana', 3);\nmap.set('apple', 7);\nconsole.log(map.get('apple'));\nconsole.log(map.has('orange'));`,
                answers: [
                    { text: 'A) 5, false, O(n)', correct: false },
                    { text: 'B) 7, false, O(1) в среднем', correct: true },
                    { text: 'C) 5, true, O(log n)', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Хеш-таблица (HashMap) хранит пары ключ-значение. Мы устанавливаем "apple": 5, затем "banana": 3, затем снова "apple": 7 — это перезаписывает предыдущее значение для ключа "apple". Метод get("apple") возвращает 7. Метод has("orange") возвращает false, так как такого ключа нет. Временная сложность операций get, set, has в среднем O(1) благодаря хеш-функции, которая вычисляет индекс для быстрого доступа.\n\nЗачем: Хеш-таблицы — одна из самых важных структур данных в программировании. Они обеспечивают быстрый доступ к данным по ключу, что критично для кэширования, индексации, подсчета частоты элементов, реализации множеств и словарей. В худшем случае (при коллизиях) сложность может деградировать до O(n), но при хорошей хеш-функции это крайне редко. Практически все современные языки имеют встроенные реализации хеш-таблиц (Map, Dictionary, HashMap).'
            },
            {
                title: '4. Связанный список',
                code: `class ListNode {\n    constructor(\n        public value: number,\n        public next: ListNode | null = null\n    ) {}\n}\nclass LinkedList {\n    private head: ListNode | null = null;\n    append(value: number): void {\n        const newNode = new ListNode(value);\n        if (!this.head) {\n            this.head = newNode;\n            return;\n        }\n        let current = this.head;\n        while (current.next) {\n            current = current.next;\n        }\n        current.next = newNode;\n    }\n    toArray(): number[] {\n        const result: number[] = [];\n        let current = this.head;\n        while (current) {\n            result.push(current.value);\n            current = current.next;\n        }\n        return result;\n    }\n}\nconst list = new LinkedList();\nlist.append(1);\nlist.append(2);\nlist.append(3);\nconsole.log(list.toArray());`,
                answers: [
                    { text: 'A) [1, 2, 3], O(1)', correct: false },
                    { text: 'B) [1, 2, 3], O(n) для конца', correct: true },
                    { text: 'C) [3, 2, 1], O(log n)', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: Связанный список хранит элементы в узлах, где каждый узел содержит значение и ссылку на следующий узел. Метод append добавляет элементы 1, 2, 3 в конец списка. Метод toArray проходит по всем узлам и собирает значения в массив [1, 2, 3]. Временная сложность добавления в конец O(n), потому что нужно пройти весь список, чтобы найти последний узел. Если бы был указатель tail на последний элемент, сложность была бы O(1).\n\nЗачем: Связанные списки эффективны для вставки и удаления элементов в начале или середине (O(1) при наличии ссылки на узел), в отличие от массивов, где это требует сдвига элементов O(n). Они используются в реализации стеков, очередей, LRU-кэшей, управлении памятью. Недостаток — нет прямого доступа по индексу (O(n) вместо O(1) у массивов) и дополнительная память на хранение ссылок. Понимание компромиссов между массивами и списками важно для выбора правильной структуры данных.'
            },
            {
                title: '5. Дерево',
                code: `class TreeNode {\n    constructor(\n        public value: number,\n        public left: TreeNode | null = null,\n        public right: TreeNode | null = null\n    ) {}\n}\nfunction inOrderTraversal(node: TreeNode | null): number[] {\n    if (!node) return [];\n    return [\n        ...inOrderTraversal(node.left),\n        node.value,\n        ...inOrderTraversal(node.right)\n    ];\n}\nconst root = new TreeNode(4);\nroot.left = new TreeNode(2);\nroot.right = new TreeNode(6);\nroot.left.left = new TreeNode(1);\nroot.left.right = new TreeNode(3);\nconsole.log(inOrderTraversal(root));`,
                answers: [
                    { text: 'A) [4, 2, 1, 3, 6]', correct: false },
                    { text: 'B) [1, 2, 3, 4, 6]', correct: true },
                    { text: 'C) [1, 3, 2, 6, 4]', correct: false }
                ],
                explanation: 'Правильный ответ B.\n\nПочему: In-order обход (симметричный обход) бинарного дерева поиска (BST) посещает узлы в порядке: левое поддерево → корень → правое поддерево. Для данного дерева (корень 4, левый потомок 2 с детьми 1 и 3, правый потомок 6) обход происходит так: идем в левое поддерево (2), затем в его левое (1) — выводим 1; возвращаемся к 2 — выводим 2; идем в правое от 2 (3) — выводим 3; возвращаемся к корню 4 — выводим 4; идем в правое поддерево (6) — выводим 6. Результат: [1, 2, 3, 4, 6].\n\nЗачем: Бинарное дерево поиска — это структура данных, где для каждого узла все элементы в левом поддереве меньше узла, а в правом — больше. Это обеспечивает эффективный поиск, вставку и удаление за O(log n) в сбалансированном дереве. In-order обход BST всегда дает отсортированный массив, что используется для сортировки и проверки корректности дерева. Деревья применяются в базах данных (B-деревья), файловых системах, компиляторах (AST), автодополнении и многих других областях.'
            }
        ],
        leetcode: [
            {
                title: '1. Two Sum (Hash Map)',
                code: `function twoSum(nums: number[], target: number): [number, number] {\n    const seen = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (seen.has(complement)) {\n            return [seen.get(complement)!, i];\n        }\n        seen.set(nums[i], i);\n    }\n    return [-1, -1];\n}\nconsole.log(twoSum([2,7,11,15], 9));`,
                question: 'Какой ответ вернёт функция и какова асимптотика?',
                answers: [
                    { text: 'A) [0,1], O(n)', correct: true },
                    { text: 'B) [1,2], O(n log n)', correct: false },
                    { text: 'C) [-1,-1], O(n²)', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Мы ищем числа 2 и 7, их сумма 9. HashMap позволяет проверить наличие complement за O(1) в среднем, поэтому пара индексов [0,1].\n\nЗачем: Two Sum — классический вопрос, проверяющий умение выбирать структуру данных под требуемую сложность. Решение с Map удовлетворяет требованию O(n) по времени и O(n) по памяти, что важно для задач уровня Easy/Medium на LeetCode.'
            },
            {
                title: '2. Merge Intervals',
                code: `function merge(intervals: [number, number][]): [number, number][] {\n    if (!intervals.length) return [];\n    intervals.sort((a, b) => a[0] - b[0]);\n    const merged: [number, number][] = [intervals[0]];\n    for (const [start, end] of intervals.slice(1)) {\n        const last = merged[merged.length - 1];\n        if (start <= last[1]) {\n            last[1] = Math.max(last[1], end);\n        } else {\n            merged.push([start, end]);\n        }\n    }\n    return merged;\n}\nconsole.log(merge([[1,3],[2,6],[8,10],[15,18]]));`,
                question: 'Сколько интервалов получится после слияния и какая сложность?',
                answers: [
                    { text: 'A) [[1,6],[8,10],[15,18]], O(n log n)', correct: true },
                    { text: 'B) [[1,3],[2,6],[8,10],[15,18]], O(n)', correct: false },
                    { text: 'C) [[1,10],[15,18]], O(n²)', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: После сортировки интервалы [1,3] и [2,6] объединяются в [1,6], остальные не пересекаются. Сортировка диктует O(n log n).\n\nЗачем: Merge Intervals проверяет умение комбинировать сортировку и односкановые алгоритмы, что часто встречается в задачах уровня Medium.'
            },
            {
                title: '3. LRU Cache (двусвязный список + Map)',
                code: `class LRUCache {\n    private cache = new Map<number, number>();\n    constructor(private capacity: number) {}\n    get(key: number): number {\n        if (!this.cache.has(key)) return -1;\n        const value = this.cache.get(key)!;\n        this.cache.delete(key);\n        this.cache.set(key, value);\n        return value;\n    }\n    put(key: number, value: number): void {\n        if (this.cache.has(key)) {\n            this.cache.delete(key);\n        } else if (this.cache.size >= this.capacity) {\n            const oldestKey = this.cache.keys().next().value;\n            this.cache.delete(oldestKey);\n        }\n        this.cache.set(key, value);\n    }\n}\nconst lru = new LRUCache(2);\nlru.put(1,1);\nlru.put(2,2);\nconsole.log(lru.get(1));\nlru.put(3,3);\nconsole.log(lru.get(2));`,
                question: 'Что выведет код и почему Map подходит для LRU?',
                answers: [
                    { text: 'A) 1 и -1; порядок ключей сохраняет свежесть => O(1)', correct: true },
                    { text: 'B) 1 и 2; Map работает за O(log n)', correct: false },
                    { text: 'C) -1 и -1; Map не гарантирует порядок', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: После get(1) порядок становится [2,1]; put(3,3) удаляет 2, поэтому get(2) = -1. Map в JS сохраняет порядок вставки, что позволяет быстро удалить самый старый ключ. Все операции — O(1) в среднем.\n\nЗачем: LRU Cache проверяет сочетание структур данных (список + Map/HashMap) и умение соблюдать ограничения по сложности.'
            },
            {
                title: '4. Course Schedule (Topological Sort)',
                code: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {\n    const graph: number[][] = Array.from({ length: numCourses }, () => []);\n    const indegree = new Array(numCourses).fill(0);\n    for (const [course, pre] of prerequisites) {\n        graph[pre].push(course);\n        indegree[course]++;\n    }\n    const queue: number[] = [];\n    indegree.forEach((deg, i) => { if (deg === 0) queue.push(i); });\n    let visited = 0;\n    while (queue.length) {\n        const node = queue.shift()!;\n        visited++;\n        for (const next of graph[node]) {\n            indegree[next]--;\n            if (indegree[next] === 0) queue.push(next);\n        }\n    }\n    return visited === numCourses;\n}\nconsole.log(canFinish(2, [[1,0]]));`,
                question: 'Почему алгоритм топологической сортировки решает задачу и какова сложность?',
                answers: [
                    { text: 'A) True, O(V+E)', correct: true },
                    { text: 'B) False, O(V²)', correct: false },
                    { text: 'C) True, O(log V)', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Курсы можно пройти, если граф ацикличен. Алгоритм Кана удаляет вершины с нулевой степенью, посещая каждую вершину и ребро один раз.\n\nЗачем: Топологическая сортировка — классическая тема LeetCode Hard/Medium на графы, демонстрирующая владение BFS и анализом зависимостей.'
            },
            {
                title: '5. Binary Tree Level Order',
                code: `class TreeNode {\n    constructor(\n        public val: number,\n        public left: TreeNode | null = null,\n        public right: TreeNode | null = null\n    ) {}\n}\nfunction levelOrder(root: TreeNode | null): number[][] {\n    if (!root) return [];\n    const result: number[][] = [];\n    const queue: TreeNode[] = [root];\n    while (queue.length) {\n        const levelSize = queue.length;\n        const level: number[] = [];\n        for (let i = 0; i < levelSize; i++) {\n            const node = queue.shift()!;\n            level.push(node.val);\n            if (node.left) queue.push(node.left);\n            if (node.right) queue.push(node.right);\n        }\n        result.push(level);\n    }\n    return result;\n}\nconst root = new TreeNode(1, new TreeNode(2), new TreeNode(3));\nconsole.log(levelOrder(root));`,
                question: 'Почему BFS подходит для послойного обхода и какова сложность?',
                answers: [
                    { text: 'A) Потому что очередь хранит узлы уровня; O(n)', correct: true },
                    { text: 'B) Потому что стек естественно задаёт уровни; O(log n)', correct: false },
                    { text: 'C) Потому что сортировка даёт порядок; O(n log n)', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: BFS обходит дерево уровнями, используя очередь. Каждый узел посещается один раз => O(n) по времени и O(w) по памяти, где w — максимальная ширина.\n\nЗачем: Умение выбирать между DFS и BFS — основа большинства задач на деревья и графы.'
            }
        ],
        'event-loop': [
            {
                title: '1. Стек вызовов и очередь задач',
                code: `console.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');`,
                question: 'В каком порядке выведутся буквы и почему setTimeout не мгновенный?',
                answers: [
                    { text: 'A) A, C, B — таймер попадает в очередь макрозадач', correct: true },
                    { text: 'B) A, B, C — setTimeout выполняется синхронно', correct: false },
                    { text: 'C) B, A, C — очередь микрозадач выше приоритета', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Сначала выполняется синхронный стек (A, C). Колбэк setTimeout попадает в очередь макрозадач и будет обработан после опустошения стека.\n\nЗачем: Понимание очередей задач помогает избегать гонок и explain, почему «setTimeout(fn,0)» не ускоряет код.'
            },
            {
                title: '2. Микрозадачи против макрозадач',
                code: `Promise.resolve().then(() => console.log('microtask'));\nsetTimeout(() => console.log('macrotask'), 0);\nconsole.log('sync');`,
                question: 'Каков порядок вывода и что происходит между тикками?',
                answers: [
                    { text: 'A) sync, microtask, macrotask — микрозадачи выполняются сразу после стека', correct: true },
                    { text: 'B) sync, macrotask, microtask — setTimeout быстрее', correct: false },
                    { text: 'C) microtask, sync, macrotask — промисы впереди синхронного кода', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: После синхронного «sync» движок опустошает очередь микрозадач (Promise), а затем берёт один макротаск из очереди (setTimeout).\n\nЗачем: Знание приоритетов микрозадач критично для оптимизации UI и избегания непредсказуемых состояний.'
            },
            {
                title: '3. Async/Await как синтаксический сахар',
                code: `async function load() {\n    console.log('start');\n    await Promise.resolve();\n    console.log('after await');\n}\nload();\nconsole.log('outside');`,
                question: 'Почему после await код «приостанавливается» и куда попадает продолжение?',
                answers: [
                    { text: 'A) «after await» выполняется как микрозадача после outside', correct: true },
                    { text: 'B) Async делает весь код синхронным', correct: false },
                    { text: 'C) «after await» уходит в очередь макрозадач', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: await Promise превращается в then, который попадает в очередь микрозадач — поэтому «outside» появляется раньше «after await».\n\nЗачем: Понимание механики async/await необходимо для корректной обработки ошибок и оптимизации последовательных запросов.'
            },
            {
                title: '4. requestAnimationFrame vs setTimeout',
                code: `let frames = 0;\nfunction tick(timestamp: number) {\n    frames++;\n    if (frames < 3) {\n        requestAnimationFrame(tick);\n    } else {\n        console.log('frames:', frames);\n    }\n}\nrequestAnimationFrame(tick);`,
                question: 'Чем requestAnimationFrame отличается от таймера при работе с DOM?',
                answers: [
                    { text: 'A) rAF синхронизируется с частотой экрана и выполняется перед отрисовкой', correct: true },
                    { text: 'B) rAF гарантирует выполнение каждые 16мс вне зависимости от вкладки', correct: false },
                    { text: 'C) rAF всегда быстрее setTimeout, потому что микрозадача', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: requestAnimationFrame ставит колбэк в очередь браузерного цикла отрисовки, позволяя выполнять анимацию без пропусков кадров.\n\nЗачем: Разница важна для производительных UI: таймеры могут работать, когда вкладка свернута, приводя к лишним вычислениям.'
            },
            {
                title: '5. Блокировка Event Loop долгими задачами',
                code: `const start = performance.now();\nwhile (performance.now() - start < 200) { /* имитация тяжёлой задачи */ }\nsetTimeout(() => console.log('done'), 0);`,
                question: 'Почему «done» не появляется мгновенно и как избежать блокировки?',
                answers: [
                    { text: 'A) Цикл блокирует стек, пока не завершится; нужно дробить работу (chunking/Web Workers)', correct: true },
                    { text: 'B) setTimeout сломан — надо увеличить delay', correct: false },
                    { text: 'C) console.log блокирует вывод', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Пока синхронный цикл крутится, Event Loop не может обработать очередь задач. Разбиение нагрузки на микротаски/батчи или вынесение в Web Worker решает проблему.\n\nЗачем: Это фундамент для responsive UI и объяснение, почему «heavy JS» блокирует интерфейс.'
            }
        ],
        solid: [
            {
                title: '1. SRP — принцип единственной ответственности',
                code: `class ReportGenerator {\n    constructor(private data: string[]) {}\n    format(): string {\n        return this.data.join('\n');\n    }\n}\nclass ReportSaver {\n    save(content: string): void {\n        console.log('saving...', content);\n    }\n}\nconst generator = new ReportGenerator(['line1', 'line2']);\nconst saver = new ReportSaver();\nconst report = generator.format();\nsaver.save(report);`,
                question: 'Почему разделение на два класса лучше, чем «God object»?',
                answers: [
                    { text: 'A) Каждый класс отвечает за одну причину изменения', correct: true },
                    { text: 'B) Так код выполняется быстрее', correct: false },
                    { text: 'C) Потому что нельзя иметь методы больше 10 строк', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: ReportGenerator занимается форматированием, а ReportSaver — сохранением. Изменение способа сохранения не трогает форматирование и наоборот.\n\nЗачем: SRP снижает связанность модулей и упрощает тестирование — ключ к поддерживаемому коду.'
            },
            {
                title: '2. OCP — открытость для расширения',
                code: `interface DiscountStrategy {\n    apply(amount: number): number;\n}\nclass PercentageDiscount implements DiscountStrategy {\n    constructor(private percent: number) {}\n    apply(amount: number): number {\n        return amount * (1 - this.percent);\n    }\n}\nclass BlackFridayDiscount implements DiscountStrategy {\n    apply(amount: number): number {\n        return amount - 50;\n    }\n}\nfunction checkout(amount: number, strategy: DiscountStrategy) {\n    return strategy.apply(amount);\n}\nconsole.log(checkout(200, new PercentageDiscount(0.1)));`,
                question: 'Как OCP помогает добавлять скидки, не меняя checkout?',
                answers: [
                    { text: 'A) Новая логика добавляется созданием класса стратегии, не меняя существующий код', correct: true },
                    { text: 'B) Нужно редактировать checkout при каждом виде скидки', correct: false },
                    { text: 'C) Интерфейсы нарушают принцип', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: checkout зависит от абстракции DiscountStrategy. Новые виды скидок просто реализуют интерфейс.\n\nЗачем: Принцип OCP Боба Мартина позволяет минимизировать регрессии при добавлении функций.'
            },
            {
                title: '3. LSP — принцип подстановки Лисков',
                code: `class Rectangle {\n    constructor(public width: number, public height: number) {}\n    area() { return this.width * this.height; }\n}\nclass Square extends Rectangle {\n    constructor(size: number) { super(size, size); }\n}\nfunction printArea(rect: Rectangle) {\n    rect.width = 5;\n    rect.height = 4;\n    console.log(rect.area());\n}\nprintArea(new Square(2));`,
                question: 'Почему Square нарушает LSP в таком примере и как исправить?',
                answers: [
                    { text: 'A) Потому что изменение ширины нарушает инвариант квадрата; отделите интерфейс «Shape»', correct: true },
                    { text: 'B) Потому что площадь квадрата вычисляется иначе', correct: false },
                    { text: 'C) Потому что наследование в целом запрещено', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Клиент ожидает, что можно независимо менять width/height, но Square вынужден синхронизировать стороны. Лучше использовать композицию или общий интерфейс без сеттеров.\n\nЗачем: LSP гарантирует, что подтип можно подставить вместо базового, не ломая поведение.'
            },
            {
                title: '4. ISP — принцип разделения интерфейсов',
                code: `interface Printer {\n    print(): void;\n    scan(): void;\n    fax(): void;\n}\nclass SimplePrinter implements Printer {\n    print() { console.log('print'); }\n    scan() { throw new Error('Not supported'); }\n    fax() { throw new Error('Not supported'); }\n}`,
                question: 'Как избежать пустых реализаций и нарушений ISP?',
                answers: [
                    { text: 'A) Разбить интерфейс на IPrinter и IScanner, чтобы клиенты зависели только от нужных методов', correct: true },
                    { text: 'B) Добавить default-реализацию с console.log', correct: false },
                    { text: 'C) Заменить интерфейсы абстрактными классами', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Клиент SimplePrinter не должен реализовывать scan/fax, если они не требуются. Разделение интерфейсов уменьшает ложные зависимости.\n\nЗачем: ISP упрощает сопровождение API и снижает вероятность ошибок в runtime.'
            },
            {
                title: '5. DIP — принцип инверсии зависимостей',
                code: `interface Notifier {\n    send(message: string): void;\n}\nclass EmailNotifier implements Notifier {\n    send(message: string) {\n        console.log('Email:', message);\n    }\n}\nclass AlertService {\n    constructor(private notifier: Notifier) {}\n    trigger(message: string) {\n        this.notifier.send(message);\n    }\n}\nconst service = new AlertService(new EmailNotifier());\nservice.trigger('Build failed');`,
                question: 'Почему AlertService зависит от интерфейса, а не конкретной реализации?',
                answers: [
                    { text: 'A) Чтобы подменять отправку (SMS, Slack) без изменения сервиса', correct: true },
                    { text: 'B) Чтобы сократить количество файлов', correct: false },
                    { text: 'C) Потому что интерфейсы быстрее классов', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: DIP предписывает высокоуровневым модулям зависеть от абстракций. Внедрение зависимостей (constructor injection) позволяет легко тестировать и расширять систему.\n\nЗачем: Это основа архитектуры на TypeScript/Node: легко мокать уведомления, логгер, хранилища.'
            }
        ],
        foundations: [
            {
                title: '1. Cohesion (сцепление модуля)',
                code: `class AuthService {\n    login() {/* ... */}\n    logout() {/* ... */}\n    refreshToken() {/* ... */}\n}\nclass NotificationService {\n    sendEmail() {/* ... */}\n    sendSMS() {/* ... */}\n}`,
                question: 'Почему высокая функциональная связность лучше случайной?',
                answers: [
                    { text: 'A) Модуль работает вокруг одной задачи => легче сопровождать и тестировать', correct: true },
                    { text: 'B) Потому что так меньше строк кода', correct: false },
                    { text: 'C) Иначе нарушится Event Loop', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: AuthService сосредоточен на аутентификации, NotificationService — на уведомлениях. Если перемешать их обязанности, придется менять модуль по множеству причин.\n\nЗачем: Высокая cohesion означает, что изменение требований затрагивает минимальное количество компонентов.'
            },
            {
                title: '2. Coupling (связанность)',
                code: `class OrderService {\n    constructor(private payment = new PaymentGateway()) {}\n}\n// Лучшая версия:\nclass OrderServiceV2 {\n    constructor(private payment: PaymentGateway) {}\n}`,
                question: 'Почему жёсткие зависимости вредны и как их ослабить?',
                answers: [
                    { text: 'A) Жёсткое создание внутри класса мешает тестам; передавайте зависимости снаружи', correct: true },
                    { text: 'B) Сильная связность ускоряет выполнение', correct: false },
                    { text: 'C) Связанность влияет только на CSS', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: OrderService сам решает, какой PaymentGateway использовать. Это затрудняет тестирование и расширение. Вторая версия ослабляет coupling через внедрение зависимостей.\n\nЗачем: Слабая связность позволяет переиспользовать сервисы и легко заменять реализации.'
            },
            {
                title: '3. Big O Notation',
                code: `function quadratic(nums: number[]): number {\n    let count = 0;\n    for (let i = 0; i < nums.length; i++) {\n        for (let j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] > 0) count++;\n        }\n    }\n    return count;\n}\nconsole.log(quadratic([ -1, 0, 2, 3 ]));`,
                question: 'Почему сложность функции O(n²) и как её снизить?',
                answers: [
                    { text: 'A) Два вложенных цикла по n => O(n²); сортировка + два указателя даст O(n log n)', correct: true },
                    { text: 'B) Потому что есть только один цикл', correct: false },
                    { text: 'C) Big O зависит от данных, а не от алгоритма', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Для каждого i идёт второй цикл по j, что даёт квадрат роста времени. Можно отсортировать массив и использовать два указателя, чтобы сравнивать пары за O(n log n).\n\nЗачем: Владение Big O помогает выбирать алгоритмы под ограничения LeetCode и реальных систем.'
            },
            {
                title: '4. Memory vs Time Trade-offs',
                code: `function memoFib(n: number, memo: Record<number, number> = {}): number {\n    if (n <= 1) return n;\n    if (memo[n] !== undefined) return memo[n];\n    memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo);\n    return memo[n];\n}\nconsole.log(memoFib(10));`,
                question: 'Что выигрываем мемоизацией и какой ценой?',
                answers: [
                    { text: 'A) Время падает до O(n), но расход памяти растёт до O(n)', correct: true },
                    { text: 'B) Сложность остаётся O(φⁿ), зато памяти 0', correct: false },
                    { text: 'C) Мемоизация ухудшает всё', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Без мемоизации рекурсия вычисляет одинаковые значения многократно (экспоненциально). Хранение промежуточных результатов требует памяти, но линейно ускоряет алгоритм.\n\nЗачем: Это пример классического компромисса время/память, важного при системном дизайне.'
            },
            {
                title: '5. Архитектурные слои',
                code: `// Presentation -> Application -> Domain -> Infrastructure\nclass UserController {\n    constructor(private service: UserService) {}\n    async register(dto: RegisterDto) {\n        return this.service.register(dto);\n    }\n}\nclass UserService {\n    constructor(private repo: UserRepository) {}\n    async register(dto: RegisterDto) {\n        // валидация, доменная логика\n        return this.repo.save(dto);\n    }\n}`,
                question: 'Зачем разделять приложение на слои и как это влияет на когезию/связанность?',
                answers: [
                    { text: 'A) Каждый слой решает свою задачу → высокая cohesion; зависимости направлены сверху вниз → слабая связанность', correct: true },
                    { text: 'B) Чтобы увеличить количество файлов', correct: false },
                    { text: 'C) Потому что фреймворки запрещают логику в контроллере', correct: false }
                ],
                explanation: 'Правильный ответ A.\n\nПочему: Контроллеры отвечают за HTTP, сервисы — за бизнес-логику, репозитории — за доступ к данным. Такой подход упрощает тестирование и развёртывание.\n\nЗачем: Слоистая архитектура — основа системного мышления разработчика и понимания «зачем».'
            }
        ],
        theory: [
            {
                title: '8. CAP-теорема в продуктах',
                type: 'info',
                icon: 'fa-diagram-project',
                tagline: 'Consistency vs Availability vs Partition Tolerance',
                meta: ['Distributed Systems', 'Trade-offs'],
                summary: 'Нельзя одновременно гарантировать согласованность, доступность и устойчивость к разделению сети. CAP — линза для разговоров о данных.',
                bullets: [
                    'CP-системы (банки) жертвуют доступностью ради целостности.',
                    'AP-системы (соцсети, кеши) выбирают доступность и принимают eventual consistency.',
                    'Partition tolerance неизбежна: сеть всегда ломается.'
                ],
                why: 'CAP снимает иллюзию идеальной базы и помогает объяснить бизнесу, почему «не сразу видно у всех».',
                how: 'Зафиксируй режим работы сервиса (CP или AP) и опиши, как клиенты узнают о конфликтах и когда данные сходятся.',
                takeaway: 'Формальный выбор режима экономит время на споры и делает SLA честным.',
                quote: 'Лучшее решение — то, у которого заранее проговорены жертвы.'
            },
            {
                title: '9. ACID против BASE',
                type: 'info',
                icon: 'fa-scale-balanced',
                tagline: 'Когда нужна жёсткая транзакция, а когда гибкость',
                meta: ['Transactions', 'Storage'],
                summary: 'ACID гарантирует строгую консистентность, BASE — скорость и эластичность. Обе модели легитимны, если говорить о ценах выборов.',
                bullets: [
                    'ACID = атомарность, изоляция, долговечность — дорого, но безопасно.',
                    'BASE = Basically Available, Soft state, Eventually consistent — масштабно и гибко.',
                    'Микс возможен, когда критичные данные отделены от вспомогательных.'
                ],
                why: 'Непонимание моделей порождает лишние миграции и двойные записи.',
                how: 'Финансы и инвентарь держи на ACID, социальные фиды и аналитика — на BASE, всегда прописывай тайминг схода данных.',
                takeaway: 'Спроси себя: что страшнее — временная рассинхронизация или потеря денег? Ответ и определяет выбор.',
                quote: 'Консистентность — это инструмент, а не религия.'
            },
            {
                title: '10. Event Sourcing + CQRS',
                type: 'info',
                icon: 'fa-stream',
                tagline: 'История как источник правды',
                meta: ['Domain Design', 'Auditable Systems'],
                summary: 'Сохраняем поток событий и строим чтения отдельно. Состояние можно воспроизвести, а аудит становится встроенной функцией.',
                bullets: [
                    'Каждое событие — атомарное изменение домена с контекстом.',
                    'Записи (commands) отделены от чтений (queries), поэтому системы масштабируются независимо.',
                    'Проекции позволяют кастомизировать отчёты без переписывания бизнес-логики.'
                ],
                why: 'Когда надо ответить «кто и когда поменял баланс», снимок состояния бесполезен.',
                how: 'Храни события append-only, делай реплей и асинхронные проекции, продумывай миграцию схем событий.',
                takeaway: 'Event Sourcing дисциплинирует модель и снижает страх перед рефакторингом.',
                quote: 'Истина — это поток фактов, а не последняя запись.'
            },
            {
                title: '11. Эволюция и обратная совместимость',
                type: 'info',
                icon: 'fa-arrows-rotate',
                tagline: 'Контракты живут дольше команд',
                meta: ['API Design', 'Change Management'],
                summary: 'Без планов миграции каждая новая версия API превращается в пожар. Совместимость — это уважение к пользователю.',
                bullets: [
                    'Версионирование + адаптеры дешевле, чем ручное уведомление клиентов.',
                    'Feature flags и canary-релизы позволяют тестировать без даунтайма.',
                    'Документация миграций и алерты по устаревшим вызовам экономят недели саппорта.'
                ],
                why: 'Клиенты обновляются медленно, и компания платит за любую внезапную поломку.',
                how: 'Вводи V2 рядом с V1, публикуй таблицы соответствий, держи адаптеры, пока клиенты не перейдут.',
                takeaway: 'Инженер, который думает об эволюции контракта, превращает breaking change в управляемый процесс.',
                quote: 'Плавные миграции — это признак зрелости платформы.'
            },
            {
                title: '12. ООП как язык доменов',
                type: 'info',
                icon: 'fa-layer-group',
                tagline: 'SOLID в действии, а не в лозунгах',
                meta: ['OOP', 'Design'],
                summary: 'Принципы ООП помогают не только писать классы, но и оформлять доменную модель так, чтобы изменения были дешёвыми.',
                bullets: [
                    'Инкапсуляция = контроль инвариантов, а не просто private-поля.',
                    'Наследование используем, когда сущности делят поведение, но различаются данными; в остальных случаях — композиция.',
                    'Полиморфизм + интерфейсы дают точку расширения: добавляем новые сценарии без правки существующих.'
                ],
                why: 'Сырые DTO и «анемичные» модели ломаются при любом изменении требований. ООП заставляет зафиксировать правила предметной области.',
                how: 'Пиши контракты на языке домена (Order, PaymentPolicy), описывай инварианты в методах, проверяй SOLID на ревью, чтобы не плодить god-classes.',
                takeaway: 'Описывай систему через объекты и их ответственность — тогда код совпадает с ментальной моделью бизнеса.',
                quote: 'ООП — это про смысл, а не про синтаксис.'
            },
            {
                title: '13. Структуры данных = дизайн памяти',
                type: 'info',
                icon: 'fa-database',
                tagline: 'Выбор формы определяет скорость',
                meta: ['Data Structures', 'Performance'],
                summary: 'Каждая структура — это контракт на сложность операций. Понимание этого контракта экономит миллисекунды и деньги.',
                bullets: [
                    'Деревья дают логарифмические вставки/поиск, но требуют балансировки и указателей.',
                    'Хеш-таблицы мгновенно обращаются по ключу, но чувствительны к коллизиям и памяти.',
                    'Очереди/стеки — дешевый способ управлять порядком выполнения и историей операций.'
                ],
                why: 'Неверный выбор структуры приводит к скрытым узким местам и дорогим миграциям.',
                how: 'Формулируй SLA операций (сколько вставок в секунду, какие задержки допустимы) и подбирай структуру с подходящими гарантиями.',
                takeaway: 'Структура данных — это архитектурное решение, а не «что попадётся под руку».',
                quote: 'Не бывает плохих структур — бывает неправильный контекст.'
            },
            {
                title: '14. LeetCode как система шаблонов',
                type: 'info',
                icon: 'fa-list-check',
                tagline: 'От задачи к паттерну решения',
                meta: ['LeetCode', 'Practice'],
                summary: 'Эффективная подготовка — это каталог паттернов, а не бесконечный гринд случайных задач.',
                bullets: [
                    'Группируй задачи по технике (два указателя, стек, BFS) и выписывай сигналы, когда она сработает.',
                    'Учи ограничения входных данных: они подсказывают, какое решение требуется (n ≤ 10⁵ ⇒ O(n log n)).',
                    'После решения фиксируй «зачем так»: что сломается, если выбрать другой подход.'
                ],
                why: 'Без системы легко застрять на «решил 200 задач, а инсайта ноль».',
                how: 'Делай мини-ADR на каждую задачу: условие → паттерн → альтернативы → что улучшить. Так формируется мышечная память решений.',
                takeaway: 'LeetCode — тренажёр инженерного мышления, если относиться к нему как к набору шаблонов.',
                quote: 'Важно не сколько задач решено, а сколько паттернов ты можешь объяснить.'
            }
        ]
    };
    const rawEntries = sections[tabId] || [];
    const { theoryEntries, practiceQuestions } = splitTabEntries(rawEntries, tabId);
    appState.currentQuestionIndex[tabId] = 0;
    appState.correctAnswers[tabId] = 0;
    renderTheoryContent(tabId, theoryEntries, Boolean(practiceQuestions.length));
    renderPracticeContent(tabId, practiceQuestions.map((question, index) => ({ ...question, index })));
    collapsePracticePanel({ silent: true });
    updateNavigation();
}

// ============================================================================
// РАБОТА С ВКЛАДКАМИ
// ============================================================================

/**
 * Переключает активную вкладку
 * @param {string} tabId - ID вкладки для переключения
 */
function switchTab(tabId) {
    // Убираем активный класс со всех вкладок и контента
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Добавляем активный класс к выбранной вкладке и контенту
    const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
    const tabContent = document.getElementById(tabId);
    
    if (tabBtn) tabBtn.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
    
    document.querySelectorAll('.tab-btn[role="tab"]').forEach(btn => {
        btn.setAttribute('aria-selected', String(btn === tabBtn));
        btn.setAttribute('tabindex', btn === tabBtn ? '0' : '-1');
    });
    document.querySelectorAll('.tab-content[role="tabpanel"]').forEach(panel => {
        panel.setAttribute('aria-hidden', String(panel !== tabContent));
    });
    if (tabBtn) tabBtn.focus();

    appState.currentTab = tabId;
    renderTabContent(tabId);
    updateNavigation();
}

// ============================================================================
// РАБОТА С ОТВЕТАМИ
// ============================================================================

/**
 * Обрабатывает клик по кнопке ответа
 * @param {HTMLElement} btn - кнопка ответа
 */
function handleAnswerClick(btn) {
    const questionCard = btn.closest('.question-card');
    if (!questionCard) return;
    
    // Проверяем, не отвечен ли уже вопрос
    if (isQuestionAnswered(questionCard)) return;
    
    const allButtons = questionCard.querySelectorAll('.answer-btn');
    const explanation = questionCard.querySelector('.explanation');
    const isCorrect = btn.dataset.correct === 'true';
    const tabId = appState.currentTab;
    const questionIndex = parseInt(questionCard.dataset.questionIndex || 0);
    
    // Отключаем все кнопки в этом вопросе
    allButtons.forEach(b => b.disabled = true);
    
    // Отмечаем правильные и неправильные ответы
    markAnswerButtons(btn, allButtons, isCorrect);
    
    // Обновляем счетчик правильных ответов
    if (isCorrect) {
        appState.correctAnswers[tabId] = (appState.correctAnswers[tabId] || 0) + 1;
    }
    
    // Показываем объяснение
    if (explanation) {
        explanation.classList.remove('hidden');
    }
    
    // Обновляем UI
    updateNavigation();
}

/**
 * Отмечает кнопки ответов как правильные или неправильные
 * @param {HTMLElement} clickedBtn - нажатая кнопка
 * @param {NodeList} allButtons - все кнопки ответа
 * @param {boolean} isCorrect - правильный ли ответ
 */
function markAnswerButtons(clickedBtn, allButtons, isCorrect) {
    if (isCorrect) {
        // Окрашиваем только выбранную кнопку в зеленый
        clickedBtn.classList.add('correct');
    } else {
        // Окрашиваем выбранную кнопку в красный
        clickedBtn.classList.add('incorrect');
        // Показываем правильный ответ зеленым
        allButtons.forEach(b => {
            if (b.dataset.correct === 'true') {
                b.classList.add('correct');
            }
        });
    }
}

// ============================================================================
// НАВИГАЦИЯ МЕЖДУ ВОПРОСАМИ
// ============================================================================

/**
 * Перемещается к следующему или предыдущему вопросу
 * @param {number} direction - направление (-1 для предыдущего, 1 для следующего)
 */
function navigateQuestion(direction) {
    const tabId = appState.currentTab;
    const questions = getQuestions(tabId);
    const currentIndex = appState.currentQuestionIndex[tabId] || 0;
    const newIndex = currentIndex + direction;
    
    // Проверяем границы
    if (newIndex < 0 || newIndex >= questions.length) return;
    
    // При переходе вперед проверяем, что текущий вопрос отвечен
    if (direction > 0) {
        const currentQuestion = questions[currentIndex];
        if (currentQuestion && !isQuestionAnswered(currentQuestion)) {
            return;
        }
    }
    
    // Переключаем вопросы
    questions[currentIndex].classList.remove('active');
    questions[newIndex].classList.add('active');
    appState.currentQuestionIndex[tabId] = newIndex;
    
    // Прокручиваем к вопросу
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    questions[newIndex].scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    
    updateNavigation();
}

/**
 * Обновляет навигацию между вопросами
 * Создает кнопки "Предыдущий" и "Следующий", показывает счетчик вопросов
 */
function updateNavigation() {
    const tabId = appState.currentTab;
    const questions = getQuestions(tabId);
    const currentIndex = appState.currentQuestionIndex[tabId] || 0;
    const container = getQuestionsContainer(tabId);
    const navContainer = getOrCreateNavigationContainer(container);
    if (!questions.length || isPracticePanelCollapsed()) {
        navContainer.innerHTML = '';
        navContainer.classList.add('hidden');
        return;
    }
    navContainer.classList.remove('hidden');

    // Создаем кнопки навигации
    const currentQuestion = questions[currentIndex];
    const isAnswered = currentQuestion ? isQuestionAnswered(currentQuestion) : false;

    const navigationHTML = createNavigationHTML(currentIndex, questions.length, isAnswered);
    navContainer.innerHTML = navigationHTML;
}

/**
 * Создает HTML для навигации между вопросами
 * @param {number} currentIndex - текущий индекс вопроса
 * @param {number} totalQuestions - всего вопросов
 * @param {boolean} isAnswered - отвечен ли текущий вопрос
 * @returns {string} - HTML строка
 */
function createNavigationHTML(currentIndex, totalQuestions, isAnswered) {
    const isLastQuestion = currentIndex === totalQuestions - 1;
    const isFirstQuestion = currentIndex === 0;
    
    let nextBtnHTML = '';
    if (isLastQuestion) {
        // На последнем вопросе показываем кнопку "Завершить"
        const disabled = isAnswered ? '' : ' disabled';
        nextBtnHTML = `<button type="button" class="nav-btn nav-btn-next"${disabled} data-action="show-results">Завершить <i class="fas fa-flag-checkered"></i></button>`;
    } else {
        const disabled = isAnswered ? '' : ' disabled';
        nextBtnHTML = `<button type="button" class="nav-btn nav-btn-next"${disabled}>Следующий <i class="fas fa-chevron-right"></i></button>`;
    }
    
    return `
        <div class="nav-buttons">
            <button type="button" class="nav-btn nav-btn-prev"${isFirstQuestion ? ' disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Предыдущий
            </button>
            <div class="question-counter">
                <i class="fas fa-list-ol"></i> Вопрос ${currentIndex + 1} из ${totalQuestions}
            </div>
            ${nextBtnHTML}
        </div>
    `;
}

// ============================================================================
// РЕЗУЛЬТАТЫ ТЕСТА
// ============================================================================

/**
 * Показывает экран с результатами теста
 */
function showResults() {
    const tabId = appState.currentTab;
    const questions = getQuestions(tabId);
    const totalQuestions = questions.length;
    const correctCount = appState.correctAnswers[tabId] || 0;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const isPerfect = percentage === 100;
    
    // Скрываем все вопросы
    questions.forEach(q => q.classList.remove('active'));
    
    // Скрываем навигацию
    const container = getQuestionsContainer(tabId);
    const navContainer = container.querySelector('.question-navigation');
    if (navContainer) {
        navContainer.classList.add('hidden');
    }
    
    // Получаем контейнер результатов
    const resultsContainer = getOrCreateResultsContainer(container);
    resultsContainer.setAttribute('aria-live', 'polite');
    
    // Определяем категорию и выбираем цитату
    const category = getResultCategory(percentage);
    const quotes = motivationalQuotes[category];
    const quoteData = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Отображаем результаты
    resultsContainer.innerHTML = createResultsHTML(correctCount, percentage, totalQuestions, quoteData, isPerfect);
    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (isPerfect && !isTabCompleted(tabId)) {
        markTabCompleted(tabId, { score: percentage });
    }
}

/**
 * Создает HTML для экрана результатов
 * @param {number} correctCount - количество правильных ответов
 * @param {number} percentage - процент правильных ответов
 * @param {number} totalQuestions - всего вопросов
 * @param {Object} quoteData - данные мотивирующей цитаты
 * @returns {string} - HTML строка
 */
function createResultsHTML(correctCount, percentage, totalQuestions, quoteData, isPerfect) {
    return `
        <div class="results-card">
            <div class="results-icon">
                <i class="fas ${quoteData.icon}"></i>
            </div>
            <h2 class="results-title">Результаты теста</h2>
            <div class="results-stats">
                <div class="stat-item">
                    <i class="fas fa-check-circle"></i>
                    <span class="stat-value">${correctCount}</span>
                    <span class="stat-label">правильных</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-percentage"></i>
                    <span class="stat-value">${percentage}%</span>
                    <span class="stat-label">точность</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-list"></i>
                    <span class="stat-value">${totalQuestions}</span>
                    <span class="stat-label">всего вопросов</span>
                </div>
            </div>
            ${isPerfect ? `
                <div class="completion-pill">
                    <i class="fas fa-check-circle"></i>
                    Тема помечена как пройденная
                </div>
            ` : ''}
            <div class="motivational-quote">
                <i class="fas ${quoteData.icon}"></i>
                <p>${quoteData.text}</p>
            </div>
            <button type="button" class="restart-btn">
                <i class="fas fa-redo"></i> Пройти заново
            </button>
        </div>
    `;
}

/**
 * Перезапускает тест в текущей вкладке
 */
function restartSection() {
    const tabId = appState.currentTab;
    const questions = getQuestions(tabId);
    
    // Сбрасываем состояние
    appState.currentQuestionIndex[tabId] = 0;
    appState.correctAnswers[tabId] = 0;
    
    // Скрываем результаты
    const container = getQuestionsContainer(tabId);
    const resultsContainer = container.querySelector('.results-container');
    if (resultsContainer) {
        resultsContainer.classList.add('hidden');
    }
    
    // Показываем навигацию обратно
    const navContainer = container.querySelector('.question-navigation');
    if (navContainer) {
        navContainer.classList.remove('hidden');
    }
    
    // Сбрасываем все вопросы
    resetQuestions(questions);
    
    updateNavigation();
}

// (удалено: логика индикатора прогресса)
