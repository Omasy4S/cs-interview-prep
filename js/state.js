export class GameState {
    constructor() {
        const saved = localStorage.getItem('eng_quiz_state_v3'); // v3 для чистого старта
        this.data = saved ? JSON.parse(saved) : {
            xp: 0,
            level: 1,
            completedQuestions: [],
            currentTab: 'oop'
        };
        this.listeners = [];
    }

    subscribe(fn) { this.listeners.push(fn); }
    notify() { this.listeners.forEach(fn => fn(this.data)); this.persist(); }
    persist() { localStorage.setItem('eng_quiz_state_v3', JSON.stringify(this.data)); }

    addXp(amount) {
        this.data.xp += amount;
        const newLevel = Math.floor(this.data.xp / 500) + 1;
        if (newLevel > this.data.level) {
            this.data.level = newLevel;
        }
        this.notify();
    }

    solveQuestion(questionId, isCorrect) {
        // Если уже решено, ничего не делаем
        if (this.data.completedQuestions.includes(questionId)) return;

        if (isCorrect) {
            this.addXp(50); // 50 XP за ответ
            this.data.completedQuestions.push(questionId);
            this.notify();
        }
    }

    setTab(tabId) {
        this.data.currentTab = tabId;
        this.notify();
    }
    
    isSolved(id) {
        return this.data.completedQuestions.includes(id);
    }
}

export const store = new GameState();
