// =========================================================================
// DADOS DOS COMPONENTES (QUIZ E RABBIT HOLE)
// =========================================================================

const curOLOComponentsData = {
    quickQuizData: {
        "fish-with-no-red-blood": {
            question: "What makes Antarctic icefish unique among vertebrates?",
            answers: [
                { id: "A", text: "They can survive without water." },
                { id: "B", text: "They lack functional hemoglobin and red blood cells." },
                { id: "C", text: "They have blue blood instead of red." },
                { id: "D", text: "They can live in boiling water." }
            ],
            correctAnswer: "B",
            feedback: {
                A: "Icefish still need water to survive, just like all fish.",
                B: "Correct! Antarctic icefish are the only known vertebrates that completely lack functional hemoglobin and mature red blood cells.",
                C: "Their blood appears pale or translucent, not blue. The lack of hemoglobin removes the red color.",
                D: "Icefish live in freezing Antarctic waters, not boiling water."
            }
        }
    },
    rabbitHoleData: {
        "fish-with-no-red-blood": [
            {
                title: "How Do Animals Survive Extreme Cold?",
                category: "Nature / Science",
                description: "Discover the strange physiological strategies life uses in environments where ordinary biology struggles.",
                url: ""  // Deixe vazio até criar o artigo
            },
            {
                title: "What Can Evolution Change?",
                category: "Science",
                description: "Explore how natural selection, genetic change and environmental pressure can reshape living organisms.",
                url: ""  // Deixe vazio até criar o artigo
            },
            {
                title: "What Else Lives Beneath Antarctic Waters?",
                category: "Nature",
                description: "The icefish are only one part of the extraordinary ecosystem beneath the Southern Ocean.",
                url: ""  // Deixe vazio até criar o artigo
            }
        ]
    }
};