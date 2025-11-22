import { tabsConfig, AppConfig } from './data.js';
import { store } from './state.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    UI.initNav(tabsConfig);

    // Храним ID предыдущей вкладки, чтобы понимать, когда мы реально переключились
    let lastTabId = null;

    store.subscribe(state => {
        // 1. Всегда обновляем статистику (XP, Level)
        UI.updateStats(state);
        
        const currentId = state.currentTab;
        
        // 2. Перерисовываем контент ТОЛЬКО если сменилась вкладка
        if (currentId !== lastTabId) {
            lastTabId = currentId; // Запоминаем новую
            
            const tabMeta = tabsConfig.find(t => t.id === currentId);
            const tabTheory = AppConfig.theory.byTab?.[currentId] || [];
            const tabQuestions = AppConfig.questions?.[currentId] || [];
            
            if (tabMeta) {
                UI.renderPage(tabMeta, tabTheory, tabQuestions);
            }
        }
    });

    // Старт
    if (!store.data.currentTab) {
        store.setTab('oop');
    } else {
        // Форсируем первый рендер вручную
        store.notify(); 
    }
});
