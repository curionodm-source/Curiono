// =========================================================================
// DADOS DOS COMPONENTES REUTILIZÁVEIS (CurOLO)
// =========================================================================
//
// ESTRUTURA:
// - quickQuizData: Configuração do Quiz para cada artigo
// - rabbitHoleData: Sugestões de artigos relacionados para cada artigo
//
// =========================================================================

const curOLOComponentsData = {
    
    // ==========================================
    // QUICK QUIZ DATA
    // ==========================================
    quickQuizData: {
        
        // Artigo: The Fish With No Red Blood
        "fish-with-no-red-blood": {
            question: "Why can Antarctic icefish survive without functional hemoglobin?",
            answers: [
                {
                    id: "A",
                    text: "They no longer need oxygen."
                },
                {
                    id: "B", 
                    text: "They produce oxygen inside their blood."
                },
                {
                    id: "C",
                    text: "Their environment and extensive physiological adaptations help compensate for their extremely low blood oxygen-carrying capacity."
                },
                {
                    id: "D",
                    text: "Their blood contains another protein that completely replaces hemoglobin."
                }
            ],
            correctAnswer: "C",
            explanation: "Icefish still depend on oxygen for cellular metabolism. Their survival is possible because the cold, oxygen-rich Antarctic environment is favorable to dissolved oxygen transport, while their bodies compensate with adaptations including large hearts, high blood flow, large blood volumes and unusual vascular structures."
        }
        
        // Adicione mais artigos aqui seguindo o mesmo padrão
        // "outro-artigo": { ... }
    },
    
    // ==========================================
    // RABBIT HOLE DATA
    // ==========================================
    rabbitHoleData: {
        
        // Artigo: The Fish With No Red Blood
        "fish-with-no-red-blood": [
            {
                title: "How Do Animals Survive Extreme Cold?",
                category: "Nature / Science",
                description: "Discover the strange physiological strategies life uses in environments where ordinary biology struggles.",
                url: "" // Deixe vazio se o artigo ainda não existir
            },
            {
                title: "What Can Evolution Change?",
                category: "Science",
                description: "Explore how natural selection, genetic change and environmental pressure can reshape living organisms.",
                url: "" // Deixe vazio se o artigo ainda não existir
            },
            {
                title: "What Else Lives Beneath Antarctic Waters?",
                category: "Nature",
                description: "The icefish are only one part of the extraordinary ecosystem beneath the Southern Ocean.",
                url: "" // Deixe vazio se o artigo ainda não existir
            }
        ]
        
        // Adicione mais artigos aqui seguindo o mesmo padrão
        // "outro-artigo": [ ... ]
    }
    
    // =========================================================================
    // TEMPLATE PARA NOVOS ARTIGOS - QUICK QUIZ
    // =========================================================================
    /*
    "nome-do-artigo": {
        question: "Sua pergunta aqui?",
        answers: [
            { id: "A", text: "Alternativa A" },
            { id: "B", text: "Alternativa B" },
            { id: "C", text: "Alternativa C" },
            { id: "D", text: "Alternativa D" }
        ],
        correctAnswer: "C",
        explanation: "Explicação detalhada da resposta correta."
    }
    */
    
    // =========================================================================
    // TEMPLATE PARA NOVOS ARTIGOS - RABBIT HOLE
    // =========================================================================
    /*
    "nome-do-artigo": [
        {
            title: "Título do Artigo",
            category: "Categoria",
            description: "Descrição breve do artigo.",
            url: "caminho/para/o/artigo" ou "" se não existir
        }
    ]
    */
};
