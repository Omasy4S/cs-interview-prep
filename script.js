// ============================================================================
// КОНФИГУРАЦИЯ И ДАННЫЕ
// ============================================================================

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
    correctAnswers: {} // Количество правильных ответов для каждой вкладки
};

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
    return document.querySelector('.questions-container') || document.getElementById('content');
}

/**
 * Получает все вопросы текущей вкладки
 * @param {string} tabId - ID вкладки
 * @returns {NodeList} - список вопросов
 */
function getQuestions(tabId) {
    return document.querySelectorAll('.question-card');
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
            <h1><i class="fas fa-graduation-cap"></i> Computer Science</h1>
            <p class="subtitle">Подготовка к собеседованию: ООП, Алгоритмы и Структуры данных</p>
        </header>
        <div class="tabs" role="tablist" aria-label="Разделы"></div>
        <div id="content"></div>
    `;
}

function renderTabs() {
    const tabsEl = document.querySelector('.tabs');
    if (!tabsEl) return;
    const tabs = [
        { id: 'oop', title: 'ООП' },
        { id: 'algorithms', title: 'Алгоритмы' },
        { id: 'data-structures', title: 'Структуры данных' }
    ];
    tabsEl.innerHTML = tabs.map((t, i) => `
        <button type="button" id="tab-${t.id}" class="tab-btn${i===0?' active':''}" role="tab" aria-selected="${i===0}" aria-controls="${t.id}" tabindex="${i===0?'0':'-1'}" data-tab="${t.id}">${t.title}</button>
    `).join('');
    tabsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        switchTab(btn.dataset.tab);
    });
}

function renderTabContent(tabId) {
    const content = document.getElementById('content');
    if (!content) return;
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
        ]
    };
    const questions = sections[tabId] || [];
    appState.currentQuestionIndex[tabId] = 0;
    appState.correctAnswers[tabId] = 0;
    content.innerHTML = `
        <div class="questions-container">
            ${questions.map((q, i) => `
                <div class="question-card${i===0?' active':''}" data-question-index="${i}">
                    <h2>${q.title}</h2>
                    <div class="code-block"><pre><code class="language-typescript">${q.code}</code></pre></div>
                    <div class="question">
                        <p><strong>Вопрос:</strong> ${q.question || 'Что выведется в консоль и почему?'}</p>
                        <div class="answers">
                            ${q.answers.map(a => `
                                <button type="button" class="answer-btn" ${a.correct?'data-correct="true"':''}>${a.text}</button>
                            `).join('')}
                        </div>
                        <div class="explanation hidden">
                            <strong>Ответ:</strong>
                            ${q.explanation.split('\n\n').map(para => `<p>${para}</p>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    updateNavigation();
    
    // Применяем подсветку синтаксиса ко всем блокам кода
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
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
    
    // Создаем кнопки навигации
    const currentQuestion = questions[currentIndex];
    const isAnswered = currentQuestion ? isQuestionAnswered(currentQuestion) : false;
    
    navContainer.innerHTML = createNavigationHTML(currentIndex, questions.length, isAnswered);
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
    resultsContainer.innerHTML = createResultsHTML(correctCount, percentage, totalQuestions, quoteData);
    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Создает HTML для экрана результатов
 * @param {number} correctCount - количество правильных ответов
 * @param {number} percentage - процент правильных ответов
 * @param {number} totalQuestions - всего вопросов
 * @param {Object} quoteData - данные мотивирующей цитаты
 * @returns {string} - HTML строка
 */
function createResultsHTML(correctCount, percentage, totalQuestions, quoteData) {
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
