// ============================================================================
// ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ СОБЫТИЙ
// ============================================================================

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

/**
 * Инициализация приложения при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', () => {
    buildLayout();
    initializeApp();
    setupEventListeners();
    setupKeyboardAccessibility();
});
