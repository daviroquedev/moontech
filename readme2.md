# Simulador de Frota de AGVs com Node.js, Angular e Docker

Este projeto é um simulador em tempo real para o gerenciamento de uma **frota de AGVs (Automated Guided Vehicles)**, construído com uma arquitetura de microsserviços moderna e totalmente containerizada com Docker. Ele serve como um protótipo para o desenvolvimento de sistemas de controle e gerenciamento de frotas de robôs, permitindo a visualização e o controle de múltiplos veículos de forma centralizada.

![Imagem de vários robôs se movendo em uma tela de simulação]

---

## ✨ Funcionalidades

* **Gerenciamento de Múltiplos AGVs:** O backend agora simula e gerencia uma frota de AGVs, cada um com seu próprio estado.
* **Visualização de Frota em Tempo Real:** O frontend exibe a posição e o ângulo de todos os AGVs simultaneamente em um mapa dinâmico (`<canvas>`).
* **Monitoramento de Estado Individual:** Cada AGV na tela exibe seu ID e o nível atual da bateria, permitindo um monitoramento visual rápido.
* **Controle Manual e por Destino:**
    * **Controle Manual:** Selecione um AGV específico e controle seu movimento e rotação com botões.
    * **Envio de Destinos:** Clique em qualquer ponto do mapa para enviar coordenadas de destino para o AGV selecionado, que irá se mover autonomamente em direção ao alvo.
* **Comunicação Bidirecional Robusta:** Uso de WebSockets (via Socket.IO) para uma comunicação de baixa latência entre o frontend e o backend, essencial para o controle em tempo real.
* **Arquitetura Escalável:** Projeto construído com serviços desacoplados (frontend, backend, banco de dados) e orquestrados com Docker Compose.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js com Express.js
* **Frontend:** Angular 18
* **Comunicação em Tempo Real:** Socket.IO
* **Banco de Dados:** MongoDB
* **Containerização:** Docker & Docker Compose
* **Servidor Web (Frontend):** Nginx

---

## 🏛️ Arquitetura

O projeto é dividido em três serviços principais, orquestrados pelo Docker Compose. A principal mudança é que o **backend agora gerencia um objeto de frota**, e o **frontend é capaz de renderizar múltiplos AGVs** e enviar comandos direcionados.

1.  **`backend` (Node.js):**
    * É o "cérebro" da aplicação.
    * Mantém um objeto contendo o estado de todos os AGVs da frota (ID, posição, ângulo, velocidade, bateria).
    * Executa um loop de simulação que atualiza o estado de cada robô individualmente.
    * Gerencia a lógica de movimento autônomo em direção a um destino.
    * Recebe comandos (controle manual ou novos destinos) do frontend e os aplica ao AGV correto.
    * Transmite o estado completo da frota para todos os clientes conectados via WebSockets.

2.  **`frontend` (Angular + Nginx):**
    * É a "estação de controle" visual.
    * Recebe o estado da frota e desenha cada AGV e suas informações no Canvas.
    * Permite ao usuário clicar no mapa para definir um destino ou usar os botões para controle manual.
    * Envia os comandos para o backend, especificando qual AGV deve executá-los.

3.  **`mongodb` (Banco de Dados):**
    * Serviço de banco de dados NoSQL, pronto para persistir dados da frota, como missões e logs de telemetria.


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

-   [ ] **Persistência de Dados:** Salvar o histórico de telemetria e o estado da bateria de cada AGV no MongoDB.
-   [ ] **Sistema de Missões Avançado:** Criar uma fila de tarefas no MongoDB e atribuí-las dinamicamente ao AGV mais próximo ou disponível.
-   [ ] **Detecção de Obstáculos:** Adicionar objetos estáticos ao ambiente e fazer os AGVs desviarem deles.
-   [ ] **Evitar Colisões entre AGVs:** Implementar uma lógica para que os AGVs detectem uns aos outros e evitem colisões.
-   [ ] **Navegação Autônoma:** Implementar algoritmos de pathfinding (como A*) para que o AGV calcule a melhor rota, em vez de apenas seguir em linha reta.

