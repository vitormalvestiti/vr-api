# Backend - Sistema de Notificações Assíncronas

## Descrição
Este backend foi desenvolvido em **NestJS** para gerenciar um fluxo de notificações assíncronas usando **RabbitMQ** como broker de mensagens.  
Ele expõe endpoints REST, processa mensagens de forma assíncrona e envia atualizações em tempo real via **WebSocket**.

---

## Tecnologias
- Node.js + NestJS
- RabbitMQ (mensageria)
- Socket.IO (WebSockets)
- Jest + Supertest (testes)
- Docker Compose (ambiente)

---

## Funcionalidades
- **POST /api/notificar** → envia notificação (mensagem + ID).
- **GET /api/notificar/status/:id** → consulta status de mensagem.
- Processamento assíncrono com chance de falha (20%).
- Emissão de eventos via WebSocket (`statusUpdate`).
- Armazenamento de status em memória (Map).

---

## ▶Executar localmente
```bash
# instalar dependências
npm install

# rodar em dev
npm run start:dev
```

O app ficará disponível em:  
[http://localhost:3000/api](http://localhost:3000/api)

---

## Usando Docker
```bash
docker-compose up --build
```
RabbitMQ estará disponível em:
- Porta **5672** (broker)
- Porta **15672** (painel de gestão)

---

## Testes
```bash
# unitários
npm run test

# e2e
npm run test:e2e
```

---

## WebSocket
O backend emite eventos via Socket.IO.  
Conecte-se em `http://localhost:3000` e ouça o evento `statusUpdate`:

```js
socket.on('statusUpdate', data => {
  console.log('Status atualizado:', data);
});
```
