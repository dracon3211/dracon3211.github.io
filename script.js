// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Правильные ответы для каждого уровня
    const correctAnswers = {
        1: ["искра", "Искра"],
        2: ["русалка", "Русалка"],
        3: ["шакал табаки", "Шакал Табаки", "Табаки", "табаки"],
        4: ["суккуб", "Суккуб"],
        5: ["тень", "Тень"],
        6: ["рыжий", "Рыжий"],
        7: ["лис", "Лис"],
        8: ["стая", "Стая", "СТАЯ"]
    };
    
    function initGame() {
        const startBtn = document.getElementById('start-btn');
        const screens = document.querySelectorAll('.screen');
        
        // Инициализация
        hideAllScreens();
        showScreen('welcome-screen');
        
        // Обработчик начала квеста
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                showScreen('level-1');
            });
        }
        
        // Функция проверки ответов
        window.checkAnswer = function(level) {
            const errorElement = document.getElementById(`error-${level}`);
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
            
            const inputElement = document.getElementById(`answer-${level}`);
            const userInput = inputElement.value.trim().toLowerCase();
            
            if (correctAnswers[level].includes(userInput)) {
                // Правильный ответ
                if (level < 8) {
                    showScreen(`level-${level+1}`);
                } else {
                    showScreen('final-screen');
                }
            } else {
                // Неправильный ответ
                if (errorElement) {
                    errorElement.classList.remove('hidden');
                    errorElement.style.animation = 'shake 0.5s';
                    setTimeout(function() {
                        errorElement.style.animation = '';
                    }, 500);
                }
            }
        };
        
        // Вспомогательные функции
        function hideAllScreens() {
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
        }
        
        function showScreen(screenId) {
            hideAllScreens();
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.classList.add('active');
            }
        }
    }

    // Функция для отображения загрузочного экрана
    function showLoader() {
        const loader = document.getElementById('loader');
        const content = document.getElementById('content');
        const progress = document.querySelector('.progress');
        
        // Показываем загрузочный экран
        loader.classList.add('active');
        content.classList.add('content-hidden');
        
        // Анимация прогресс-бара
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                // После завершения загрузки скрываем loader и показываем контент
                setTimeout(() => {
                    loader.classList.remove('active');
                    content.classList.remove('content-hidden');
                    content.classList.add('content-visible');
                    
                    // Продолжаем обычную инициализацию
                    initGame();
                }, 500);
            } else {
                width += Math.random() * 15;
                if (width > 100) width = 100;
                progress.style.width = width + '%';
            }
        }, 300);
    }

    // Запускаем загрузочный экран
    showLoader();
});