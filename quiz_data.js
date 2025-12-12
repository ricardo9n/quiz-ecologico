/* ============================================================
   DADOS DO QUIZ (Para fácil customização)
   ============================================================ */

const quizData = {
  categories: [
    {
      name: "Interações Ecológicas",
      icon: "🐝",
      color: "rgb(34,139,34)",
      questions: [
        {points: "100", question: "Quando duas espécies se beneficiam sem dependência vital, temos:", answer: "Protocooperação", justification: "Mutualismo facultativo."},
        {points: "200", question: "Relação onde apenas uma espécie se beneficia sem prejudicar a outra:", answer: "Comensalismo", justification: "Exemplo: peixe-piloto e tubarão."},
        {points: "300", question: "Diferença entre colônia e sociedade?", answer: "Na colônia há união física entre os indivíduos, mas na sociedade não.", justification: "Colônia: união anatômica; Sociedade: divisão de tarefas sem união física."},
        {points: "400", question: "Animal que se alimenta de outro sem matá-lo é caso de:", answer: "Parasitismo", justification: "Relação desarmônica (+/−)."},
        {points: "500", question: "Relação intraespecífica desarmônica:", answer: "Canibalismo", justification: "Predação entre indivíduos da mesma espécie."},
        {points: "600", question: "Um liquen é exemplo de:", answer: "Mutualismo obrigatório", justification: "Alga + fungo, dependência vital."},
        {points: "700", question: "Nome da relação em que um ser se alimenta de outro animal morto:", answer: "Necrofagia", justification: "Importante para reciclagem."},
        {points: "800", question: "Abelhas e flores representam:", answer: "Mutualismo", justification: "Polinização e fornecimento de néctar."},
        {points: "900", question: "A predação é:", answer: "Interespecífica desarmônica", justification: "Predador (+), presa (−)."},
        {points: "1000", question: "Microrganismo no rúmen do boi que auxilia na digestão é exemplo de:", answer: "Mutualismo", justification: "Relação simbiótica positiva."}
      ]
    },
    {
      name: "Engenheiros dos Ecossistemas",
      icon: "🏗️",
      color: "rgb(30,144,255)",
      questions: [
        {points: "100", question: "O que define um Engenheiro de Ecossistema?", answer: "Modifica fisicamente o ambiente", justification: "Cria ou altera habitats."},
        {points: "200", question: "Engenheiro autogênico modifica o ambiente:", answer: "Com o próprio corpo", justification: "Exemplo: árvores."},
        {points: "300", question: "Engenheiro alogênico modifica o ambiente:", answer: "Com materiais externos", justification: "Exemplo: castor."},
        {points: "400", question: "Por que corais são engenheiros?", answer: "Constroem recifes", justification: "Criam novos habitats."},
        {points: "500", question: "Cupinzeiro altera solo e temperatura. É exemplo de:", answer: "Engenharia autogênica", justification: "Estrutura criada pelos próprios cupins."},
        {points: "600", question: "Engenheiros influenciam quais fatores?", answer: "Físicos e biológicos", justification: "Mudam habitat e espécies."},
        {points: "700", question: "Qual inseto é engenheiro do solo?", answer: "Minhoca", justification: "Melhora aeração e nutrientes."},
        {points: "800", question: "Castores, minhocas e corais têm em comum:", answer: "Alterarem habitats", justification: "Moldam ecossistemas."},
        {points: "900", question: "Qual engenheiro aumenta fertilidade no Cerrado?", answer: "Cupim", justification: "Reciclagem de nutrientes."},
        {points: "1000", question: "Destruição de recifes afeta engenheiros porque:", answer: "Reduz habitats de várias espécies", justification: "Corais sustentam a cadeia trófica."}
      ]
    },
    {
      name: "Produtividade",
      icon: "🌾",
      color: "rgb(148,0,211)",
      questions: [
        {points: "100", question: "Produtividade Primária é:", answer: "Síntese por autótrofos", justification: "Base da cadeia alimentar."},
        {points: "200", question: "Fórmula da PPL:", answer: "PPB − Respiração", justification: "Energia líquida disponível."},
        {points: "300", question: "Produtividade Secundária mede:", answer: "Biomassa de consumidores", justification: "Energia incorporada pelos heterótrofos."},
        {points: "400", question: "Fator limitante terrestre:", answer: "Água e nutrientes", justification: "Fotossíntese depende disso."},
        {points: "500", question: "Fator limitante nos oceanos:", answer: "Luz e nutrientes", justification: "Essenciais ao fitoplâncton."},
        {points: "600", question: "Onde a produtividade é mais alta na Terra?", answer: "Florestas tropicais", justification: "Alta luz e umidade."},
        {points: "700", question: "Fluxo de energia no ecossistema:", answer: "Produtores → consumidores → decompositores", justification: "Sequência energética."},
        {points: "800", question: "Lei que explica perda de energia entre níveis:", answer: "Regra dos 10%", justification: "Aproximadamente 10% transferido."},
        {points: "900", question: "Por que o deserto é menos produtivo?", answer: "Escassez de água", justification: "Limita fotossíntese."},
        {points: "1000", question: "Produtividade global depende de:", answer: "Clima, nutrientes e luz solar", justification: "Fatores abióticos combinados."}
      ]
    },
    {
      name: "Comunidade",
      icon: "🌍",
      color: "rgb(255,215,0)",
      questions: [
        {points: "100", question: "Comunidade Biológica é:", answer: "Conjunto de populações que interagem", justification: "Parte biótica do ecossistema."},
        {points: "200", question: "Medida da variedade de espécies:", answer: "Riqueza de Espécies", justification: "Conta tipos de espécies."},
        {points: "300", question: "Espécie que representa 80% da biomassa tem:", answer: "Alta Dominância", justification: "Controla estrutura."},
        {points: "400", question: "Nicho ecológico define:", answer: "Função e papel da espécie", justification: "Conjunto de condições e recursos."},
        {points: "500", question: "Fenômeno que mantém diversidade:", answer: "Estratificação", justification: "Criação de micro-habitats."},
        {points: "600", question: "Sucessão ecológica é:", answer: "Mudança gradual da comunidade", justification: "Campo → floresta, por exemplo."},
        {points: "700", question: "Espécie pioneira é:", answer: "Primeira a colonizar", justification: "Inicia a sucessão ecológica."},
        {points: "800", question: "Clímax ecológico é:", answer: "Estágio estável", justification: "Máxima diversidade em equilíbrio."},
        {points: "900", question: "Espécies-chave são importantes porque:", answer: "Mantêm equilíbrio ecológico", justification: "Controlam interações."},
        {points: "1000", question: "Eliminação de espécie-chave causa:", answer: "Colapso da comunidade", justification: "Desequilíbrio e perda de funções."}
      ]
    },
    {
      name: "População / Espécie",
      icon: "🐗",
      color: "rgb(220,20,60)",
      questions: [
        {points: "100", question: "Grupo de capivaras em área específica representa:", answer: "População", justification: "Conjunto de indivíduos da mesma espécie."},
        {points: "200", question: "Densidade populacional = ", answer: "Número de indivíduos / área", justification: "Mede concentração."},
        {points: "300", question: "Fatores que aumentam população:", answer: "Natalidade e imigração", justification: "Formas de adicionar indivíduos."},
        {points: "400", question: "Crescimento logístico inclui:", answer: "Capacidade de Suporte (K)", justification: "Limite ambiental ao crescimento."},
        {points: "500", question: "Resistência ambiental é:", answer: "Conjunto de fatores limitantes", justification: "Impedem o crescimento máximo."},
        {points: "600", question: "Potencial biótico é:", answer: "Capacidade máxima de reprodução", justification: "Sem limitações ambientais."},
        {points: "700", question: "Quando mortes > nascimentos ocorre:", answer: "Declínio populacional", justification: "Redução populacional."},
        {points: "800", question: "Migração de saída é chamada de:", answer: "Emigração", justification: "Saída do grupo."},
        {points: "900", question: "Superpopulação gera:", answer: "Competição e escassez", justification: "Efeitos negativos por excesso."},
        {points: "1000", question: "Crescimento exponencial gera curva:", answer: "Em 'J'", justification: "Sem limites ambientais."}
      ]
    }
  ]
};
