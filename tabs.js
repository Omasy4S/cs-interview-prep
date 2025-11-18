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

/**
 * Рендерит содержимое вкладки (теорию и практику)
 * @param {string} tabId - ID вкладки
 */
function renderTabContent(tabId) {
    // Получаем теоретические материалы для вкладки
    const theoryEntries = AppConfig.theory.byTab[tabId] || [];

    // Получаем вопросы для практики (плейсхолдер - заменить на реальный источник данных)
    const questions = AppConfig.questions ? AppConfig.questions[tabId] || [] : [];

    const hasPractice = questions.length > 0;

    // Рендерим теорию
    renderTheoryContent(tabId, theoryEntries, hasPractice);

    // Рендерим практику
    renderPracticeContent(tabId, questions);

    // По умолчанию сворачиваем панель практики (показываем только теорию)
    collapsePracticePanel();
}
