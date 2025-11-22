import { store } from './state.js';
import { AppConfig } from './data.js';

export const UI = {
    els: {
        nav: document.getElementById('tabs-container'),
        title: document.getElementById('active-module-title'),
        badge: document.getElementById('active-module-badge'),
        content: document.getElementById('content-area'),
        xpBar: document.getElementById('xp-progress'),
        xpText: document.getElementById('xp-text'),
        lvl: document.getElementById('user-lvl'),
        modeBtns: document.querySelectorAll('.mode-btn')
    },

    currentMode: 'theory',
    currentTabData: null,
    currentQuestions: [],

    initNav(tabs) {
        this.els.nav.innerHTML = tabs.map(tab => `
            <button class="nav-btn" data-id="${tab.id}">
                <span><i class="fa-solid fa-code"></i> ${tab.title}</span>
                <i class="fa-solid fa-check status-icon"></i>
            </button>
        `).join('');

        this.els.nav.addEventListener('click', e => {
            const btn = e.target.closest('.nav-btn');
            if (btn) store.setTab(btn.dataset.id);
        });

        this.els.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setMode(btn.dataset.mode);
            });
        });
    },

    updateStats(state) {
        // 1. XP и Уровень
        const currentLevelXp = state.xp % 500;
        const percent = (currentLevelXp / 500) * 100;
        this.els.xpBar.style.width = `${percent}%`;
        this.els.lvl.textContent = `Lvl ${state.level}`;
        if (this.els.xpText) this.els.xpText.textContent = `${currentLevelXp} / 500 XP`;
        
        // 2. Активная вкладка и статусы
        document.querySelectorAll('.nav-btn').forEach(btn => {
            const tabId = btn.dataset.id;
            btn.classList.toggle('active', tabId === state.currentTab);

            // Проверка на "Завершено"
            const tabQuestions = AppConfig.questions[tabId] || [];
            if (tabQuestions.length > 0) {
                const isAllSolved = tabQuestions.every(q => 
                    state.completedQuestions.includes(q.title)
                );
                if (isAllSolved) {
                    btn.classList.add('completed');
                }
            }
        });
    },

    renderPage(tabMeta, theoryData, questionsData) {
        this.currentTabData = { meta: tabMeta, theory: theoryData };
        this.currentQuestions = questionsData;
        
        this.els.title.textContent = tabMeta.title;
        this.els.badge.textContent = tabMeta.eyebrow || 'Module';
        
        this.setMode('theory'); 
    },

    setMode(mode) {
        this.currentMode = mode;
        this.els.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        this.els.content.innerHTML = '';
        if (mode === 'theory') {
            this.renderTheory();
        } else {
            this.renderPractice();
        }
        
        document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
    },

    renderTheory() {
        const theoryData = this.currentTabData.theory;
        if (!theoryData || !theoryData.length) {
            this.els.content.innerHTML = '<div style="padding:40px; text-align:center; color: var(--text-secondary)">Теория загружается...</div>';
            return;
        }

        const container = document.createElement('div');
        container.className = 'step-container';
        
        theoryData.forEach((item, index) => {
            const step = document.createElement('article');
            step.className = `theory-step ${index === 0 ? 'active' : ''}`;
            step.dataset.index = index;

            const header = `
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; color:var(--text-secondary); font-size:0.9rem;">
                    <span>ТЕОРИЯ ${index + 1} / ${theoryData.length}</span>
                    <i class="fa-solid ${item.icon || 'fa-book'}"></i>
                </div>
            `;

            const content = `
                <h2>${item.title}</h2>
                <div class="card-text">${item.summary || item.content || ''}</div>
                ${item.code ? `<div class="code-snippet"><pre><code class="language-javascript">${item.code.trim()}</code></pre></div>` : ''}
                ${item.takeaway ? `<div style="margin-top:20px; padding:15px; background:rgba(99,102,241,0.1); border-left:3px solid var(--accent); border-radius:4px;">💡 ${item.takeaway}</div>` : ''}
            `;

            const isLast = index === theoryData.length - 1;
            const btnText = isLast ? 'Перейти к практике <i class="fa-solid fa-code"></i>' : 'Далее <i class="fa-solid fa-arrow-right"></i>';
            
            const actions = `
                <div class="step-actions">
                    <button class="next-btn" id="theory-btn-${index}">${btnText}</button>
                </div>
            `;

            step.innerHTML = header + content + actions;
            container.appendChild(step);
        });

        this.els.content.appendChild(container);

        theoryData.forEach((_, index) => {
            const btn = document.getElementById(`theory-btn-${index}`);
            if(btn) {
                btn.onclick = () => {
                    if (index === theoryData.length - 1) {
                        this.setMode('practice');
                        return;
                    }
                    this.switchStep(container, index, index + 1);
                };
            }
        });
    },

    renderPractice() {
        const container = document.createElement('div');
        container.className = 'step-container';

        if (!this.currentQuestions || !this.currentQuestions.length) {
            container.innerHTML = '<div style="text-align:center; padding: 40px;">Практика пока не добавлена.</div>';
            this.els.content.appendChild(container);
            return;
        }

        let startIdx = this.currentQuestions.findIndex(q => !store.isSolved(q.title));
        if (startIdx === -1) startIdx = 0;

        this.currentQuestions.forEach((q, idx) => {
            const isSolved = store.isSolved(q.title);
            const step = document.createElement('div');
            step.className = `theory-step ${idx === startIdx ? 'active' : ''}`; 
            step.dataset.index = idx;
            
            const header = `
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; color:var(--text-secondary); font-size:0.9rem;">
                    <span>ЗАДАЧА ${idx + 1} / ${this.currentQuestions.length}</span>
                    ${isSolved ? '<span style="color:var(--success)"><i class="fa-solid fa-check"></i> Решено</span>' : '<span><i class="fa-regular fa-circle-question"></i> Не решено</span>'}
                </div>
            `;

            const content = `
                <h2 style="font-size:1.4rem; margin-bottom:20px;">${q.question}</h2>
                <div class="code-snippet"><pre><code class="language-typescript">${q.code ? q.code.trim() : '// Вопрос на логику'}</code></pre></div>
                <div class="options-list" id="opts-${idx}"></div>
                <div class="explanation hidden" id="expl-${idx}" style="margin-top:20px; padding:20px; background:rgba(255,255,255,0.05); border-radius:8px; animation: slide-up 0.3s ease;">
                    <strong style="color:var(--accent)">Разбор:</strong><br>
                    <div style="margin-top:10px; line-height:1.6">${q.explanation}</div>
                </div>
            `;

            const isLastQuestion = idx === this.currentQuestions.length - 1;
            const nextText = isLastQuestion ? 'Завершить модуль' : 'Следующий вопрос';
            const nextIcon = isLastQuestion ? 'fa-trophy' : 'fa-arrow-right';

            const nextBtnHtml = `
                <div class="step-actions hidden" id="next-action-${idx}">
                    <button class="next-btn" id="next-q-btn-${idx}">
                        ${nextText} <i class="fa-solid ${nextIcon}"></i>
                    </button>
                </div>
            `;

            step.innerHTML = header + content + nextBtnHtml;
            container.appendChild(step);

            const optsContainer = step.querySelector(`#opts-${idx}`);
            q.answers.forEach(ans => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = ans.text;
                
                if (isSolved && ans.correct) btn.classList.add('correct');
                if (isSolved) btn.disabled = true;

                btn.onclick = () => {
                    if (ans.correct) {
                        btn.classList.add('correct');
                        step.querySelector(`#expl-${idx}`).classList.remove('hidden');
                        step.querySelector(`#next-action-${idx}`).classList.remove('hidden');
                        optsContainer.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
                        store.solveQuestion(q.title, true);
                    } else {
                        btn.classList.add('wrong');
                        store.solveQuestion(q.title, false);
                    }
                };
                optsContainer.appendChild(btn);
            });

            if (isSolved) {
                step.querySelector(`#expl-${idx}`).classList.remove('hidden');
                step.querySelector(`#next-action-${idx}`).classList.remove('hidden');
            }
        });

        this.els.content.appendChild(container);

        this.currentQuestions.forEach((_, idx) => {
            const nextBtn = document.getElementById(`next-q-btn-${idx}`);
            if (nextBtn) {
                nextBtn.onclick = () => {
                    if (idx === this.currentQuestions.length - 1) {
                        this.renderFinishScreen();
                        return;
                    }
                    this.switchStep(container, idx, idx + 1);
                };
            }
        });
    },

    renderFinishScreen() {
        // 1. Определяем текущий индекс и следующий таб
        const currentTabId = this.currentTabData.meta.id;
        const currentIndex = AppConfig.tabs.findIndex(t => t.id === currentTabId);
        const nextTab = AppConfig.tabs[currentIndex + 1];
        
        const isLast = !nextTab;
        const btnText = isLast ? 'Завершить курс полностью 🎉' : `Далее: ${nextTab.title} ➡️`;
        const btnClass = isLast ? 'finish-btn-final' : 'finish-btn';

        const container = document.createElement('div');
        container.className = 'step-container';
        
        container.innerHTML = `
            <div class="finish-screen">
                <div class="finish-icon"><i class="fa-solid fa-trophy"></i></div>
                <h2 class="finish-title">Модуль "${this.currentTabData.meta.title}" пройден!</h2>
                <p style="color:var(--text-secondary)">Отличная работа. Все темы изучены и задачи решены.</p>
                
                <div class="finish-stats">
                    <div class="stat-box">
                        <div class="stat-val" style="color:var(--accent)">${this.currentQuestions.length}</div>
                        <div class="stat-label">Задач решено</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-val" style="color:var(--success)">+${this.currentQuestions.length * 50} XP</div>
                        <div class="stat-label">Получено опыта</div>
                    </div>
                </div>

                <button class="${btnClass}" id="auto-next-btn" style="
                    background: var(--accent); 
                    color: white; 
                    padding: 16px 32px; 
                    border: none; 
                    border-radius: 8px; 
                    font-size: 1.1rem; 
                    cursor: pointer; 
                    font-weight: 600;
                    transition: all 0.2s;
                ">
                    ${btnText}
                </button>
            </div>
        `;

        this.els.content.innerHTML = '';
        this.els.content.appendChild(container);

        // ЛОГИКА КНОПКИ
        document.getElementById('auto-next-btn').onclick = () => {
           if (nextTab) {
               // Если есть следующий модуль - переключаем
               store.setTab(nextTab.id);
           } else {
               // Если это конец всего курса
               alert('Поздравляем! Вы прошли все доступные модули. Вы готовы к собеседованию! 😎');
           }
        };
    },

    switchStep(container, currentIdx, nextIdx) {
        const currentEl = container.querySelector(`.theory-step[data-index="${currentIdx}"]`);
        const nextEl = container.querySelector(`.theory-step[data-index="${nextIdx}"]`);

        if (currentEl) currentEl.classList.remove('active');
        if (nextEl) {
            nextEl.classList.add('active');
            this.els.content.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};
