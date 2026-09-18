// =========================================================================
// MOTOR DOS COMPONENTES REUTILIZÁVEIS (CurOLO)
// =========================================================================
//
// Componentes:
// - Quick Quiz: Quiz interativo para testar conhecimento
// - Rabbit Hole: Sugestões de artigos relacionados
//
// =========================================================================

function initQuickQuiz() {
    if (typeof curOLOComponentsData === 'undefined') return;
    
    // Identificar o artigo atual pela URL
    const currentPath = window.location.pathname;
    const articleMatch = currentPath.match(/\/articles\/[^/]+\/([^/]+)\/?$/);
    
    if (!articleMatch) return;
    
    const articleSlug = articleMatch[1];
    const quizData = curOLOComponentsData.quickQuizData[articleSlug];
    
    if (!quizData) return;
    
    const container = document.getElementById('curiolo-quick-quiz-container');
    if (!container) return;
    
    // Renderizar o Quiz
    container.innerHTML = `
        <div class="curiolo-quick-quiz">
            <div class="quiz-header">
                <span class="quiz-label">QUICK QUIZ</span>
            </div>
            <div class="quiz-question">${quizData.question}</div>
            <div class="quiz-answers">
                ${quizData.answers.map(answer => `
                    <button class="quiz-answer-btn" data-answer="${answer.id}">
                        <span class="quiz-answer-letter">${answer.id}</span>
                        <span class="quiz-answer-text">${answer.text}</span>
                    </button>
                `).join('')}
            </div>
            <div class="quiz-feedback" id="quizFeedback"></div>
        </div>
    `;
    
    // Adicionar estilos inline para o componente
    const style = document.createElement('style');
    style.textContent = `
        .curiolo-quick-quiz {
            margin: 3rem 0;
            padding: 2rem;
            background: var(--color-surface-2);
            border: 1px solid var(--color-border);
            border-radius: 16px;
            transition: background-color 0.22s ease, border-color 0.22s ease;
        }
        
        .quiz-header {
            margin-bottom: 1.5rem;
        }
        
        .quiz-label {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.2em;
            color: var(--color-primary);
            text-transform: uppercase;
        }
        
        .quiz-question {
            font-family: var(--font-serif);
            font-size: 22px;
            font-weight: 600;
            color: var(--color-text);
            line-height: 1.4;
            margin-bottom: 2rem;
            transition: color 0.22s ease;
        }
        
        .quiz-answers {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .quiz-answer-btn {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 16px 20px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.22s ease;
            text-align: left;
            font-family: var(--font-sans);
            font-size: 15px;
            color: var(--color-text);
            line-height: 1.5;
            min-height: 60px;
        }
        
        .quiz-answer-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.06);
            border-color: var(--color-primary);
            transform: translateY(-2px);
        }
        
        .quiz-answer-btn:disabled {
            cursor: default;
        }
        
        .quiz-answer-btn.dimmed {
            opacity: 0.5;
        }
        
        .quiz-answer-letter {
            font-family: var(--font-sans);
            font-size: 14px;
            font-weight: 700;
            color: var(--color-primary);
            min-width: 24px;
            flex-shrink: 0;
        }
        
        .quiz-answer-text {
            flex: 1;
        }
        
        .quiz-answer-btn.correct {
            background: rgba(60, 201, 214, 0.15);
            border-color: var(--color-primary);
            opacity: 1;
        }
        
        .quiz-answer-btn.incorrect {
            background: rgba(255, 100, 100, 0.1);
            border-color: rgba(255, 100, 100, 0.3);
            opacity: 1;
        }
        
        .quiz-feedback {
            margin-top: 1.5rem;
            padding: 1.25rem;
            border-radius: 12px;
            display: none;
            animation: fadeIn 0.3s ease;
        }
        
        .quiz-feedback.is-visible {
            display: block;
        }
        
        .quiz-feedback.correct {
            background: rgba(60, 201, 214, 0.1);
            border: 1px solid rgba(60, 201, 214, 0.3);
        }
        
        .quiz-feedback.incorrect {
            background: rgba(255, 100, 100, 0.08);
            border: 1px solid rgba(255, 100, 100, 0.2);
        }
        
        .quiz-feedback-title {
            font-family: var(--font-sans);
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: var(--color-text);
        }
        
        .quiz-feedback-text {
            font-family: var(--font-sans);
            font-size: 14px;
            line-height: 1.6;
            color: var(--color-text-muted);
        }

        .quiz-try-again-btn {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: transparent;
            border: 1px solid rgba(255, 100, 100, 0.4);
            color: #ff6464;
            border-radius: 6px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .quiz-try-again-btn:hover {
            background: rgba(255, 100, 100, 0.1);
            border-color: #ff6464;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
            .curiolo-quick-quiz {
                padding: 1.5rem;
                margin: 2rem 0;
            }
            
            .quiz-question {
                font-size: 18px;
            }
            
            .quiz-answer-btn {
                padding: 14px 16px;
                font-size: 14px;
                min-height: 56px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lógica de interação
    const answerButtons = container.querySelectorAll('.quiz-answer-btn');
    const feedbackContainer = document.getElementById('quizFeedback');
    
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Se já respondeu, ignora o clique
            if (container.classList.contains('quiz-answered')) return;
            container.classList.add('quiz-answered');

            const selectedAnswer = this.dataset.answer;
            const isCorrect = selectedAnswer === quizData.correctAnswer;
            
            // Usa o feedback específico para a alternativa selecionada
            const specificFeedback = (quizData.feedback && quizData.feedback[selectedAnswer]) 
                                     ? quizData.feedback[selectedAnswer] 
                                     : "Good question! Let's think about this...";

            // Desabilitar todos os botões e aplicar estilos
            answerButtons.forEach(btn => {
                btn.disabled = true;
                btn.classList.add('dimmed');
                
                if (btn.dataset.answer === quizData.correctAnswer) {
                    btn.classList.add('correct');
                    btn.classList.remove('dimmed');
                } else if (btn.dataset.answer === selectedAnswer && !isCorrect) {
                    btn.classList.add('incorrect');
                    btn.classList.remove('dimmed');
                }
            });
            
            // Construir o HTML do feedback
            let feedbackHTML = `
                <div class="quiz-feedback-title" style="color: ${isCorrect ? '#10b981' : '#ef4444'}">${isCorrect ? '✓ Correct' : 'Not quite.'}</div>
                <div class="quiz-feedback-text">${specificFeedback}</div>
            `;

            // Adiciona o botão Try Again se errar
            if (!isCorrect) {
                feedbackHTML += `<button class="quiz-try-again-btn">Try Again</button>`;
            }

            // Mostrar feedback
            feedbackContainer.className = 'quiz-feedback is-visible';
            feedbackContainer.classList.add(isCorrect ? 'correct' : 'incorrect');
            feedbackContainer.innerHTML = feedbackHTML;

            // Lógica do botão "Try Again"
            if (!isCorrect) {
                const tryAgainBtn = feedbackContainer.querySelector('.quiz-try-again-btn');
                tryAgainBtn.addEventListener('click', function() {
                    // Reseta o estado do quiz
                    container.classList.remove('quiz-answered');
                    feedbackContainer.className = 'quiz-feedback';
                    
                    answerButtons.forEach(btn => {
                        btn.disabled = false;
                        btn.classList.remove('correct', 'incorrect', 'dimmed');
                    });
                });
            }
        });
    });
}

function initRabbitHole() {
    if (typeof curOLOComponentsData === 'undefined') return;
    
    // Identificar o artigo atual pela URL
    const currentPath = window.location.pathname;
    const articleMatch = currentPath.match(/\/articles\/[^/]+\/([^/]+)\/?$/);
    
    if (!articleMatch) return;
    
    const articleSlug = articleMatch[1];
    const rabbitHoleData = curOLOComponentsData.rabbitHoleData[articleSlug];
    
    if (!rabbitHoleData || !Array.isArray(rabbitHoleData)) return;
    
    // Filtrar apenas sugestões com URLs válidas
    const validSuggestions = rabbitHoleData.filter(suggestion => 
        suggestion.url && suggestion.url.trim() !== ''
    );
    
    // Se não houver sugestões válidas, não renderizar nada
    if (validSuggestions.length === 0) return;
    
    const container = document.getElementById('curiolo-rabbithole-container');
    if (!container) return;
    
    // Calcular prefixo para caminhos relativos
    const isInArticles = currentPath.includes('/articles/');
    const prefix = isInArticles ? '../../../' : '';
    
    // Renderizar o Rabbit Hole apenas com sugestões válidas
    container.innerHTML = `
        <div class="curiolo-rabbit-hole">
            <div class="rabbit-hole-header">
                <h2 class="rabbit-hole-title">GO DOWN THE RABBIT HOLE</h2>
                <p class="rabbit-hole-subtitle">Your curiosity doesn't have to end here.</p>
            </div>
            <div class="rabbit-hole-grid">
                ${validSuggestions.map(suggestion => `
                    <a href="${prefix}${suggestion.url}" class="rabbit-hole-card">
                        <div class="rabbit-hole-card-category">${suggestion.category}</div>
                        <h3 class="rabbit-hole-card-title">${suggestion.title}</h3>
                        <p class="rabbit-hole-card-description">${suggestion.description}</p>
                        <div class="rabbit-hole-card-arrow">→</div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    
    // Adicionar estilos inline para o componente
    const style = document.createElement('style');
    style.textContent = `
        .curiolo-rabbit-hole {
            margin: 4rem 0 2rem;
            padding: 2.5rem;
            background: var(--color-surface-2);
            border: 1px solid var(--color-border);
            border-radius: 16px;
            transition: background-color 0.22s ease, border-color 0.22s ease;
        }
        
        .rabbit-hole-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        
        .rabbit-hole-title {
            font-family: var(--font-serif);
            font-size: 32px;
            font-weight: 600;
            color: var(--color-text);
            margin-bottom: 0.75rem;
            letter-spacing: -0.02em;
            transition: color 0.22s ease;
        }
        
        .rabbit-hole-subtitle {
            font-family: var(--font-sans);
            font-size: 16px;
            color: var(--color-text-muted);
            margin: 0;
            transition: color 0.22s ease;
        }
        
        .rabbit-hole-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .rabbit-hole-card {
            display: block;
            text-decoration: none;
            color: inherit;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .rabbit-hole-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: var(--color-primary);
            transform: translateY(-4px);
            box-shadow: var(--shadow-md);
        }
        
        .rabbit-hole-card-category {
            font-family: var(--font-sans);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.15em;
            color: var(--color-primary);
            text-transform: uppercase;
            margin-bottom: 1rem;
            transition: color 0.22s ease;
        }
        
        .rabbit-hole-card-title {
            font-family: var(--font-serif);
            font-size: 20px;
            font-weight: 600;
            color: var(--color-text);
            margin: 0 0 0.75rem 0;
            line-height: 1.3;
            letter-spacing: -0.01em;
            transition: color 0.22s ease;
        }
        
        .rabbit-hole-card-description {
            font-family: var(--font-sans);
            font-size: 14px;
            color: var(--color-text-muted);
            line-height: 1.6;
            margin: 0 0 1rem 0;
            transition: color 0.22s ease;
        }
        
        .rabbit-hole-card-arrow {
            font-family: var(--font-sans);
            font-size: 24px;
            color: var(--color-primary);
            font-weight: 600;
            transition: color 0.22s ease, transform 0.3s ease;
        }
        
        .rabbit-hole-card:hover .rabbit-hole-card-arrow {
            transform: translateX(4px);
        }
        
        @media (max-width: 768px) {
            .curiolo-rabbit-hole {
                padding: 1.5rem;
                margin: 3rem 0 1rem;
            }
            
            .rabbit-hole-title {
                font-size: 24px;
            }
            
            .rabbit-hole-subtitle {
                font-size: 14px;
            }
            
            .rabbit-hole-grid {
                grid-template-columns: 1fr;
            }
            
            .rabbit-hole-card {
                padding: 1.25rem;
            }
            
            .rabbit-hole-card-title {
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar os componentes quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initQuickQuiz();
        initRabbitHole();
    });
} else {
    initQuickQuiz();
    initRabbitHole();
}