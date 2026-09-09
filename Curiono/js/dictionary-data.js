// =========================================================================
// BANCO DE DADOS DO DICIONÁRIO MULTILÍNGUE (CURIONO)
// =========================================================================
//
// COMO ADICIONAR UMA NOVA PALAVRA:
// 1. Role até o final deste arquivo e copie o bloco "TEMPLATE".
// 2. Cole ele logo acima da última chave de fechamento "};".
// 3. Preencha os dados e NÃO ESQUEÇA de deixar a vírgula no final do bloco!
//
// =========================================================================

const curionoDictionary = {
    
    // ==========================================
    // 1. HEMOGLOBINA
    // ==========================================
    "hemoglobin": {
        aliases: ["hemoglobina", "hemoglobins", "hemoglobinas"], 
        en: {
            phonetic: "/ˈhiː.məˌɡloʊ.bɪn/",
            pos: "NOUN • hemoglobin",
            definition: "The specialized protein inside red blood cells that binds oxygen and gives blood its characteristic red color.",
            extendedText: "Hemoglobin captures oxygen in the lungs and distributes it through the body's tissues via the circulatory system.",
            audioSrc: "" 
        },
        pt: {
            phonetic: "/ˈhiː.məˌɡloʊ.bɪn/",
            pos: "SUBSTANTIVO • hemoglobina",
            definition: "Proteína presente nas células vermelhas do sangue, responsável por transportar oxigênio pelo corpo.",
            extendedText: "A hemoglobina capta oxigênio nos pulmões e o distribui por todos os tecidos através da circulação sanguínea.",
            audioSrc: "" 
        }
    },

    // ==========================================
    // 2. TARDÍGRADO
    // ==========================================
    "tardigrade": {
        aliases: ["tardigrades", "tardígrado", "tardígrados"], 
        en: {
            phonetic: "/ˈtɑːr.dɪ.ɡreɪd/",
            pos: "NOUN • tardigrade",
            definition: "A microscopic eight-legged micro-animal capable of surviving extreme environments.",
            extendedText: "Tardigrades can survive extreme conditions, including the freezing vacuum of outer space and boiling water, by entering a state of suspended animation.",
            audioSrc: ""
        },
        pt: {
            phonetic: "/ˈtɑːr.dɪ.ɡreɪd/",
            pos: "SUBSTANTIVO • tardígrado",
            definition: "Micro-animal de oito patas conhecido como 'urso d'água' devido à sua altíssima resistência.",
            extendedText: "Os tardígrados conseguem sobreviver a condições extremas, incluindo o vácuo gélido do espaço e temperaturas de ebulição, entrando em um estado de animação suspensa.",
            audioSrc: ""
        }
    }

    // COPIE E COLE A PRÓXIMA PALAVRA AQUI EMBAIXO:

};

/* 
=========================================================================
TEMPLATE (MOLDE) PARA COPIAR E COLAR QUANDO FOR CRIAR UMA NOVA:
=========================================================================
    // ==========================================
    // NÚMERO. NOME DA PALAVRA AQUI
    // ==========================================
    "palavra_principal_em_ingles": {
        aliases: ["variacao1", "variacao2", "palavra_em_portugues"], 
        en: {
            phonetic: "/.../",
            pos: "NOUN • palavra",
            definition: "Definição curta em inglês.",
            extendedText: "Texto longo em inglês.",
            audioSrc: ""
        },
        pt: {
            phonetic: "/.../",
            pos: "SUBSTANTIVO • palavra",
            definition: "Definição curta em português.",
            extendedText: "Texto longo em português.",
            audioSrc: ""
        }
    },
*/