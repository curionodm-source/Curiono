// =========================================================================
// MOTOR DO DICIONÁRIO INTELIGENTE (CORRIGIDO)
// =========================================================================

function getCurrentLang() {
    const pageLang = document.documentElement.lang || navigator.language || 'en';
    return pageLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const uiTexts = {
    en: { listenWord: "🔊 Listen word", listenText: "🔊 Listen text", readMore: "📖 Read more about", close: "Close" },
    pt: { listenWord: "🔊 Ouvir palavra", listenText: "🔊 Ouvir texto", readMore: "📖 Ler mais sobre", close: "Fechar" }
};

function initDictionary() {
    if (typeof curionoDictionary === 'undefined') return;

    let popup = document.querySelector('.dict-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'dict-popup';
        document.body.appendChild(popup);
    }

    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        
        // ESCUDO DE PROTEÇÃO: Locais onde o dicionário NUNCA deve mexer
        const ignoreSelectors = [
            'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
            'button', 'script', 'style', 'noscript', 
            '.article-title', '.article-subtitle', '.article-section-heading',
            '.article-category', '.article-sources', '.article-sources-list',
            '.dict-popup', '.smart-term'
        ];

        const walker = document.createTreeWalker(articleBody, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;

        while (node = walker.nextNode()) {
            const parent = node.parentNode;
            const shouldIgnore = ignoreSelectors.some(selector => parent.closest(selector));
            if (shouldIgnore) continue;
            
            if (node.nodeValue.trim() !== '') {
                textNodes.push(node);
            }
        }

        // MAPEAMENTO DE VARIAÇÕES (Plurais, Feminino, etc.)
        const wordMap = {}; 
        for (const mainKey in curionoDictionary) {
            wordMap[mainKey.toLowerCase()] = mainKey;
            
            if (curionoDictionary[mainKey].aliases) {
                curionoDictionary[mainKey].aliases.forEach(alias => {
                    wordMap[alias.toLowerCase()] = mainKey;
                });
            }
        }

        const allSearchTerms = Object.keys(wordMap).sort((a, b) => b.length - a.length);
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexPattern = `\\b(${allSearchTerms.map(escapeRegExp).join('|')})\\b`;
        const masterRegex = new RegExp(regexPattern, 'gi');

        // APLICAÇÃO APENAS NO CORPO DO TEXTO (Ignorando títulos e referências)
        textNodes.forEach(textNode => {
            const originalText = textNode.nodeValue;
            
            const newHtml = originalText.replace(masterRegex, (match) => {
                const lowerMatch = match.toLowerCase();
                const mainKey = wordMap[lowerMatch];
                
                if (mainKey) {
                    return `<span class="smart-term" data-key="${mainKey}">${match}</span>`;
                }
                return match;
            });

            if (newHtml !== originalText) {
                const template = document.createElement('template');
                template.innerHTML = newHtml;
                textNode.parentNode.replaceChild(template.content, textNode);
            }
        });
    }

    // Gerencia cliques na tela
    document.addEventListener('click', function(e) {
        const termElement = e.target.closest('.smart-term');
        const closeBtn = e.target.closest('.dict-close-btn');
        const toggleMore = e.target.closest('.dict-more-toggle');

        if (termElement) {
            e.stopPropagation();
            const key = termElement.dataset.key;
            const lang = getCurrentLang();
            const data = curionoDictionary[key][lang] || curionoDictionary[key]['en'];
            const ui = uiTexts[lang];
            const rect = termElement.getBoundingClientRect();

            popup.innerHTML = `
                <div class="dict-header">
                    <span class="dict-word">${key}</span>
                    <button class="dict-close-btn" title="${ui.close}">×</button>
                </div>
                <div class="dict-actions-row">
                    <button class="dict-audio-btn" onclick="playWordAudio('${key}')">${ui.listenWord}</button>
                    <button class="dict-audio-btn" onclick="playTextAudio('${key}')">${ui.listenText}</button>
                </div>
                <div class="dict-phonetic">${data.phonetic}</div>
                <div class="dict-pos">${data.pos}</div>
                <p class="dict-definition">${data.definition}</p>
                <div class="dict-more-container">
                    <button class="dict-more-toggle">
                        <span>${ui.readMore} ${key}</span>
                        <span>▼</span>
                    </button>
                    <div class="dict-more-content">${data.extendedText}</div>
                </div>
            `;

            popup.classList.add('is-active');
            const popupWidth = 300;
            let leftPos = rect.left + window.scrollX + (rect.width / 2) - (popupWidth / 2);
            if (leftPos < 10) leftPos = 10;
            popup.style.top = (rect.top + window.scrollY - popup.offsetHeight - 12) + 'px';
            popup.style.left = leftPos + 'px';
        } 
        else if (toggleMore) {
            e.stopPropagation();
            const content = popup.querySelector('.dict-more-content');
            const arrow = toggleMore.querySelector('span:last-child');
            content.classList.toggle('is-open');
            arrow.textContent = content.classList.contains('is-open') ? '▲' : '▼';
        }
        else if (closeBtn || !popup.contains(e.target)) {
            popup.classList.remove('is-active');
        }
    });
}

function speakWithBestVoice(text, lang) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = lang === 'pt' ? 'pt-BR' : 'en-US';
    utterance.lang = targetLang;
    utterance.rate = lang === 'pt' ? 0.92 : 0.95;

    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
        const availableVoices = voices.filter(v => v.lang.toLowerCase().includes(lang));
        
        if (availableVoices.length > 0) {
            let bestVoice = availableVoices[0];
            let highestScore = -1;

            availableVoices.forEach(voice => {
                let score = 0;
                const name = voice.name.toLowerCase();
                
                if (name.includes('premium')) score += 10;
                if (name.includes('neural')) score += 10;
                if (name.includes('natural')) score += 8;
                if (name.includes('enhanced')) score += 5;
                if (name.includes('google')) score += 4;
                if (name.includes('microsoft')) score += 4;
                
                if (lang === 'pt') {
                    if (name.includes('francisca') || name.includes('antônio') || name.includes('antonio')) score += 15;
                    if (name.includes('luciana')) score += 12;
                }

                if (score > highestScore) {
                    highestScore = score;
                    bestVoice = voice;
                }
            });

            utterance.voice = bestVoice;
        }
    }
    window.speechSynthesis.speak(utterance);
}

function playWordAudio(wordKey) {
    const lang = getCurrentLang();
    const data = curionoDictionary[wordKey][lang] || curionoDictionary[wordKey]['en'];

    if (data.audioSrc && data.audioSrc.trim() !== "") {
        new Audio(data.audioSrc).play().catch(err => console.log("Erro áudio:", err));
    } else {
        speakWithBestVoice(wordKey, lang);
    }
}

function playTextAudio(wordKey) {
    const lang = getCurrentLang();
    const data = curionoDictionary[wordKey][lang] || curionoDictionary[wordKey]['en'];

    if (data.audioSrc && data.audioSrc.trim() !== "") {
        new Audio(data.audioSrc).play().catch(err => console.log("Erro áudio:", err));
    } else {
        const textToRead = `${data.definition}. ${data.extendedText}`;
        speakWithBestVoice(textToRead, lang); // Corrigido aqui
    }
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDictionary);
} else {
    initDictionary();
}