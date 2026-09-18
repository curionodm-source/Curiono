# Guia do Sistema de Componentes CurOLO

## 📋 Visão Geral

Este sistema permite adicionar componentes interativos reutilizáveis aos artigos do CurOLO:
- **Quick Quiz**: Quiz interativo para testar conhecimento
- **Rabbit Hole**: Sugestões de artigos relacionados

## 🚀 Como Funciona

### Estrutura de Arquivos

```
js/
├── components-data.js    # Dados dos componentes (perguntas, respostas, sugestões)
├── components-engine.js  # Motor que renderiza e gerencia os componentes
└── article-header.js     # Header e barra de progresso (já existente)
```

### Nos Artigos HTML

```html
<!-- No local desejado do artigo: -->
<div id="curiolo-quick-quiz-container"></div>
<div id="curiolo-rabbithole-container"></div>

<!-- No final do body: -->
<script src="../../../js/components-data.js"></script>
<script src="../../../js/components-engine.js"></script>
```

## 📝 Como Adicionar Quiz a um Artigo

### 1. Editar `components-data.js`

```javascript
quickQuizData: {
    "nome-do-artigo": {
        question: "Sua pergunta aqui?",
        answers: [
            { id: "A", text: "Alternativa A" },
            { id: "B", text: "Alternativa B" },
            { id: "C", text: "Alternativa C" },
            { id: "D", text: "Alternativa D" }
        ],
        correctAnswer: "C",
        feedback: {
            A: "Explicação por que A está errada",
            B: "Explicação por que B está errada", 
            C: "Explicação por que C está correta",
            D: "Explicação por que D está errada"
        }
    }
}
```

### 2. Adicionar Container no HTML

```html
<div id="curiolo-quick-quiz-container"></div>
```

### 3. Identificação Automática

O sistema identifica o artigo automaticamente pela URL:
- `/articles/science/fish-with-no-red-blood/index.html` → usa dados de `"fish-with-no-red-blood"`

## 🐰 Como Adicionar Rabbit Hole

### 1. Editar `components-data.js`

```javascript
rabbitHoleData: {
    "nome-do-artigo": [
        {
            title: "Título do Artigo Relacionado",
            category: "Categoria",
            description: "Descrição breve",
            url: "caminho/para/artigo/index.html"  // URL relativa
        }
    ]
}
```

### 2. Adicionar Container no HTML

```html
<div id="curiolo-rabbithole-container"></div>
```

### 3. Links Vazios

Se `url` estiver vazio (`""`), o card NÃO será exibido. Isso permite planejar artigos futuros sem quebrar links.

## 🎨 Design e Estilo

- **Cores**: Usa variáveis CSS do tema (navy, teal, dark)
- **Tipografia**: Mesmas fontes do projeto (Cormorant Garamond, Inter)
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Estilo**: Editorial e premium, sem animações exageradas

## 🔧 Personalização

### Alterar Estilos

Os estilos são injetados via JavaScript em `components-engine.js`. Para modificar:

1. Encontre a seção de estilos no arquivo
2. Altere as classes CSS conforme necessário
3. Recarregue a página para ver as mudanças

### Comportamento do Quiz

- **Uma tentativa**: Usuário só pode responder uma vez
- **Feedback imediato**: Mostra correto/incorreto instantaneamente
- **Botão "Try Again"**: Aparece se errar (pode ser removido)

## 📱 Exemplo Completo

### Para o artigo "The Fish With No Red Blood":

```javascript
quickQuizData: {
    "fish-with-no-red-blood": {
        question: "Why can Antarctic icefish survive without functional hemoglobin?",
        answers: [
            { id: "A", text: "They no longer need oxygen." },
            { id: "B", text: "They produce oxygen inside their blood." },
            { id: "C", text: "Their environment and extensive physiological adaptations help compensate..." },
            { id: "D", text: "Their blood contains another protein that completely replaces hemoglobin." }
        ],
        correctAnswer: "C",
        feedback: {
            A: "Icefish cells still require oxygen...",
            B: "They don't produce their own oxygen...",
            C: "Icefish still depend on oxygen for cellular metabolism...",
            D: "There is no 'replacement' protein..."
        }
    }
}
```

## 🐛 Solução de Problemas

### Quiz não aparece:
1. Verifique se o container `<div id="curiolo-quick-quiz-container"></div>` existe no HTML
2. Verifique se o slug do artigo nos dados corresponde à URL
3. Abra o console do navegador para ver erros JavaScript

### Rabbit Hole não aparece:
1. Verifique se pelo menos uma sugestão tem URL válida (não vazia)
2. Verifique se o container `<div id="curiolo-rabbithole-container"></div>` existe

### Estilos quebrados:
1. Verifique se as variáveis CSS do tema estão definidas
2. Limpe o cache do navegador
3. Verifique se não há conflitos com outros estilos

## 🎯 Boas Práticas

1. **Use slugs descritivos**: `"fish-with-no-red-blood"` em vez de `"article1"`
2. **Feedback educativo**: Explique POR QUE a resposta está certa/errada
3. **Links válidos**: Só adicione Rabbit Hole para artigos que realmente existem
4. **Teste responsivo**: Verifique em mobile e desktop
5. **Mantenha consistência**: Use o mesmo estilo de perguntas e respostas

## 🚀 Próximos Passos

1. Teste o quiz no artigo atual
2. Adicione mais perguntas aos artigos existentes
3. Crie novos artigos e adicione componentes
4. Personalize o design conforme necessário

---

**Criado para CurOLO - Sistema de Componentes Reutilizáveis**
