# Simulador de AGV com Node.js, Angular e Docker

Este projeto é um simulador em tempo real de um **AGV (Automated Guided Vehicle)**, construído com uma arquitetura de microsserviços moderna e totalmente containerizada com Docker. Ele serve como um protótipo para o desenvolvimento de sistemas de controle e gerenciamento de frotas de robôs.

![Imagem de um robô se movendo em uma tela de simulação]

---

## ✨ Funcionalidades Atuais

* **Simulação em Tempo Real:** Visualização de um AGV se movendo em um ambiente 2D (`<canvas>`).
* **Controle Manual:** Interface com botões para controlar o movimento e a rotação do AGV em tempo real.
* **Detecção de Limites:** O AGV detecta as "paredes" do ambiente virtual e para, evitando sair da tela.
* **Comunicação Bidirecional:** Uso de WebSockets (via Socket.IO) para uma comunicação de baixa latência entre o frontend e o backend.
* **Arquitetura Escalável:** Projeto construído com serviços desacoplados (frontend, backend, banco de dados) e orquestrados com Docker Compose.

---

## 🚀 Tecnologias Utilizadas

-   **Backend:** Node.js com Express.js
-   **Frontend:** Angular 18
-   **Comunicação em Tempo Real:** Socket.IO
-   **Banco de Dados:** MongoDB
-   **Containerização:** Docker & Docker Compose
-   **Servidor Web (Frontend):** Nginx

---

## 🏛️ Arquitetura

O projeto é dividido em três serviços principais, orquestrados pelo Docker Compose:

1.  **`backend` (Node.js):**
    -   É o "cérebro" da aplicação.
    -   Mantém o estado do AGV (posição, ângulo, velocidade).
    -   Executa o loop de simulação ("motor de física") que atualiza o estado do robô 30 vezes por segundo.
    -   Recebe comandos de controle do frontend.
    -   Transmite o estado atualizado do AGV para todos os clientes conectados via WebSockets.

2.  **`frontend` (Angular + Nginx):**
    -   É a "estação de controle" visual.
    -   Recebe os dados do AGV em tempo real e os desenha em um elemento HTML Canvas.
    -   Fornece a interface de usuário (botões) para enviar comandos de controle ao backend.
    -   A aplicação Angular é servida por um servidor Nginx leve e otimizado para produção.

3.  **`mongodb` (Banco de Dados):**
    -   Serviço de banco de dados NoSQL, pronto para persistir dados futuros.
    -   Atualmente, o backend se conecta a ele, mas ainda não está salvando dados.


+-------------------------------------------------------------+
| DOCKER COMPOSE                                              |
|                                                             |
|   +---------------------+      +------------------------+   |
|   |  FRONTEND (Angular) |<---->|    BACKEND (Node.js)   |   |
|   |   (Servido via Nginx) |      | (Express + Socket.IO)  |   |
|   |   Porta: 4200       |      |    Porta: 3000         |   |
|   +---------------------+      +----------+-------------+   |
|           ^                               |                 |
|           | WebSocket                     | MongoDB Driver  |
|           v                               v                 |
|   +---------------------+      +------------------------+   |
|   |      NAVEGADOR      |      |     MONGODB            |   |
|   |     (Usuário)       |      |   (Banco de Dados)     |   |
|   +---------------------+      +------------------------+   |
|                                                             |
+-------------------------------------------------------------+


---

## ⚙️ Como Executar

O projeto é totalmente containerizado, então o único pré-requisito é ter o **Docker** e o **Docker Compose** instalados na sua máquina.

1.  Clone este repositório.
2.  Abra um terminal na pasta raiz do projeto.
3.  Execute o seguinte comando:

    ```bash
    docker-compose up --build
    ```
4.  Aguarde o Docker baixar as imagens e construir os contêineres.
5.  Acesse **`http://localhost:4200`** no seu navegador para ver o simulador.

Para parar a aplicação, pressione `Ctrl + C` no terminal e, para remover os contêineres, execute `docker-compose down`.

---

## 🔮 Próximos Passos (Melhorias Futuras)

-   [ ] **Persistência de Dados:** Salvar o histórico de telemetria (posição, velocidade) do AGV no MongoDB.
-   [ ] **Sistema de Missões:** Criar uma coleção no MongoDB para definir "missões" (ex: ir do ponto A ao ponto B) e fazer o AGV executá-las.
-   [ ] **Detecção de Obstáculos:** Adicionar objetos estáticos ao ambiente e fazer o AGV desviar deles.
-   [ ] **Navegação Autônoma:** Implementar algoritmos de pathfinding (como A*) para que o AGV calcule a melhor rota para uma missão.
-   [ ] **Melhorias na Interface:** Adicionar um mapa, exibir o status do AGV (bateria, missão atual) e melhorar a aparência do painel de controle.

