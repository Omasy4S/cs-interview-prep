// ============================================================================
// ЛОГИКА КВИЗА
// ============================================================================

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
