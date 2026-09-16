Recriação do Próximo TV Time

Configure as variáveis de ambiente:

Faça uma cópia do arquivo de exemplo:

Bash
cp .env.example .env.local
Cole o seu token dentro do .env.local:

Snippet de código
VITE_TMDB_TOKEN=seu_token_aqui
Rode o servidor local:

Bash
npm run dev
A aplicação subirá em http://localhost:5173.

Deploy na Vercel
O projeto está configurado para ser publicado na Vercel de forma simples. Importe o repositório, deixe o framework preset como Vite, e adicione a variável VITE_TMDB_TOKEN. O arquivo vercel.json na raiz garante que o roteamento do React funcione em produção redirecionando tudo pro index.html.

📁 Arquitetura do Repositório
Estruturamos o código para separar a lógica JavaScript/React da UI visual:

Plaintext
proximo-tv-time/
├─ docs/          # Especificações de regras e arquitetura
├─ references/    # Referências visuais do projeto
├─ src/
│  ├─ components/ # Componentes de apresentação (UI)
│  ├─ pages/      # Páginas da aplicação e layouts
│  ├─ contexto/   # React Context API para estado global (ContextoApp, ContextoSerie)
│  ├─ servicos/   # Funções JS de fetch e acesso à API do TMDB
│  ├─ dados/      # Lógica de interação com localStorage e formatação de dados
│  ├─ main.jsx    # Entry point do React e mapeamento de rotas
│  └─ index.css   # Estilo global
├─ .env.example
├─ vercel.json
└─ vite.config.js

🤖 Uso de IA e Metodologia
O projeto adotou o modelo Spec Driven Development. Toda a especificação em docs/requirements.md foi escrita e revisada antes de escrevermos código, sendo ela quem dita as regras e o escopo do projeto.

Sobre o uso de Inteligência Artificial:
Para garantir a autoria e a consolidação do aprendizado, o uso de IA foi bastante permitido para auxílios na montagem estrutural. Ferramentas de IA foram utilizadas exclusivamente como apoio nas conexões com o JavaScript — tirando dúvidas pontuais de lógica, montagem de requisições à API do TMDB, tratamento de estruturas de dados e otimização de Hooks no React.

📝 Licença: MIT - Projeto acadêmico, sem fins comerciais.