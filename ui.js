// ============================================================================
// ФУНКЦИИ РЕНДЕРИНГА И UI
// ============================================================================

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
