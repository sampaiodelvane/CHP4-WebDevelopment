Estrutura de Pastas

proximo-tv-time/
├─ docs/                    Especificação (requirements + architecture)
├─ references/              Referências visuais e justificativas
├─ public/
├─ index.html
└─ src/
   ├─ components/           Componentes visuais reutilizáveis (Dumb components, vivem de props)
   ├─ pages/                Páginas e layouts de rota
   ├─ contexto/
   │  └─ contextos.js       React Context API (ContextoApp e ContextoSerie)
   ├─ servicos/
   │  └─ tmdb.js            Único ponto de acesso (Fetch) à API do TMDB
   ├─ dados/
   │  ├─ armazenamento.js   Lógica JS pura de leitura e escrita no Web Storage API
   │  └─ formatacao.js      Funções utilitárias (Data, nota, duração, porcentagem)
   ├─ main.jsx              Entry point do React e mapeamento central das rotas
   └─ index.css             Folha de estilo global e única

   

Camada de Dados (API e Storage)

Requisições Assíncronas (servicos/tmdb.js)
Toda chamada passa por uma função modularizada buscarNaApi(), uma função async/await pura que lida com as Promises do fetch. Ela injeta automaticamente a language=pt-BR, o cabeçalho de Bearer Token e encapsula as respostas 4xx e 5xx em objetos de Error legíveis no frontend. Todas as requisições na aplicação rodam dentro de blocos try/catch.

(O Token da API reside exclusivamente no arquivo .env.local, fora do controle de versão do repositório, lido via import.meta.env).