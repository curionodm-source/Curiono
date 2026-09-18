// =========================================================================
// DADOS DOS COMPONENTES (QUIZ E RABBIT HOLE)
// =========================================================================

const quickQuizData = {
    "fish-with-no-red-blood": {
        question: "Why can Antarctic icefish survive without functional hemoglobin?",
        answers: {
            A: "They no longer need oxygen.",
            B: "They produce oxygen inside their blood.",
            C: "Their environment and extensive physiological adaptations help compensate for their extremely low blood oxygen-carrying capacity.",
            D: "Their blood contains another protein that completely replaces hemoglobin."
        },
        correctAnswer: "C",
        // NOVIDADE: Feedback específico para cada alternativa
        feedback: {
            A: "Icefish cells still absolutely require oxygen for aerobic energy production, just like ours do. They didn't eliminate the need, just changed the delivery method.",
            B: "They don't produce their own oxygen. They absorb it directly from the highly oxygenated, freezing Antarctic waters around them.",
            C: "Icefish still depend on oxygen for cellular metabolism. Their survival is possible because the cold, oxygen-rich Antarctic environment is favorable to dissolved oxygen transport, while their bodies compensate with adaptations including large hearts and high blood flow.",
            D: "There is no 'replacement' protein. They simply carry oxygen physically dissolved directly in their blood plasma, which is highly inefficient but compensated by their large hearts."
        }
    }
};

const rabbitHoleData = {
    "fish-with-no-red-blood": [
        {
            title: "How Do Animals Survive Extreme Cold?",
            category: "Nature / Science",
            description: "Discover the strange physiological strategies life uses in environments where ordinary biology struggles.",
            url: "../../../articles/science/extreme-cold/index.html" // Link preenchido para forçar exibição
        },
        {
            title: "What Can Evolution Change?",
            category: "Science",
            description: "Explore how natural selection, genetic change and environmental pressure can reshape living organisms.",
            url: "../../../articles/science/evolution/index.html" // Link preenchido para forçar exibição
        },
        {
            title: "What Else Lives Beneath Antarctic Waters?",
            category: "Nature",
            description: "The icefish are only one part of the extraordinary ecosystem beneath the Southern Ocean.",
            url: "../../../articles/nature/antarctic-waters/index.html" // Link preenchido para forçar exibição
        }
    ]
};