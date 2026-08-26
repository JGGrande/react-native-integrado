# Eazy Ticket — Documentação da API

Base URL: `https://eazy-ticket-backend.infra.bytework.app.br/`

## Autenticação

Rotas protegidas exigem um token JWT no header HTTP:

```
Authorization: Bearer <token>
```

O token é retornado nos endpoints de login e registro.

---

## Sumário

- [Health Check](#health-check)
- [Autenticação](#autenticação-1)
  - [Login](#post-authcustomerlogin)
  - [Registro](#post-authcustomerregister)
- [Público](#público)
  - [Listar eventos](#get-publicevents)
  - [Buscar evento por ID](#get-publiceventsid)
- [Clientes](#clientes)
  - [Listar todos](#get-customers)
  - [Buscar por ID](#get-customersid)
  - [Atualizar](#put-customersid)
  - [Remover](#delete-customersid)
- [Eventos](#eventos)
  - [Criar evento](#post-events)
  - [Listar eventos](#get-events)
  - [Buscar evento por ID](#get-eventsid)
  - [Atualizar evento](#put-eventsid)
  - [Remover evento](#delete-eventsid)
  - [Adicionar imagem](#patch-eventsidimages)
  - [Remover imagem](#delete-eventsiidimagesimageid)
- [Ingressos](#ingressos)
  - [Listar meus ingressos](#get-tickets)
- [Checkout](#checkout)
  - [Comprar ingressos](#post-checkout)

---

## Health Check

### `GET /health`

Verifica se o servidor está em execução.

**Autenticação:** Não  
**Parâmetros:** Nenhum

**Resposta `200 OK`:**
```json
{
  "status": "OK",
  "PID": 1234
}
```

---

## Autenticação

### `POST /auth/customer/login`

Autentica um cliente existente e retorna um token JWT.

**Autenticação:** Não

**Body (JSON):**
| Campo      | Tipo   | Obrigatório | Descrição                          |
|------------|--------|-------------|-------------------------------------|
| `email`    | string | Sim         | E-mail válido, máx. 100 caracteres |
| `password` | string | Sim         | Mín. 6, máx. 100 caracteres        |

**Resposta `200 OK`:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "token": "<jwt>"
}
```

**Erros:**
| Status | Descrição                              |
|--------|----------------------------------------|
| `401`  | `"Invalid email or password"`          |
| `422`  | Falha na validação do body             |

---

### `POST /auth/customer/register`

Cria um novo cliente e retorna um token JWT.

**Autenticação:** Não

**Body (JSON):**
| Campo      | Tipo   | Obrigatório | Descrição                          |
|------------|--------|-------------|-------------------------------------|
| `name`     | string | Sim         | Mín. 3, máx. 100 caracteres        |
| `email`    | string | Sim         | E-mail válido, máx. 100 caracteres |
| `password` | string | Sim         | Mín. 6, máx. 100 caracteres        |

**Resposta `201 Created`:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "token": "<jwt>"
}
```

**Erros:**
| Status | Descrição                              |
|--------|----------------------------------------|
| `409`  | `"Email already exists"`               |
| `422`  | Falha na validação do body             |

---

## Público

Rotas públicas não exigem autenticação.

### `GET /public/events`

Lista todos os eventos (por padrão, apenas eventos futuros).

**Autenticação:** Não

**Query Parameters:**
| Parâmetro     | Tipo    | Obrigatório | Descrição                                    |
|---------------|---------|-------------|-----------------------------------------------|
| `withExpired` | boolean | Não         | Se `true`, inclui eventos já encerrados       |

**Resposta `200 OK`:**
```json
[
  {
    "id": 1,
    "name": "Show de Rock",
    "description": "...",
    "initialDate": "2026-06-01T20:00:00.000Z",
    "finalDate": "2026-06-02T00:00:00.000Z",
    "location": "Arena XYZ",
    "maxTickets": 500,
    "ticketPrice": 150.00,
    "photos": ["https://host/uploads/arquivo.jpg"]
  }
]
```

---

### `GET /public/events/:id`

Retorna os detalhes de um evento específico.

**Autenticação:** Não

**Path Parameters:**
| Parâmetro | Tipo    | Descrição       |
|-----------|---------|-----------------|
| `id`      | integer | ID do evento    |

**Resposta `200 OK`:** mesmo schema do item acima (objeto único).

**Erros:**
| Status | Descrição              |
|--------|------------------------|
| `404`  | `"Event not found"`    |

---

## Clientes

> Todas as rotas abaixo exigem autenticação JWT.

### `GET /customers`

Lista todos os clientes cadastrados.

**Autenticação:** Sim

**Resposta `200 OK`:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
]
```

---

### `GET /customers/:id`

Retorna um cliente pelo ID.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição       |
|-----------|---------|-----------------|
| `id`      | integer | ID do cliente   |

**Resposta `200 OK`:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com"
}
```

**Erros:**
| Status | Descrição                 |
|--------|---------------------------|
| `404`  | `"Customer not found"`    |

---

### `PUT /customers/:id`

Atualiza os dados de um cliente.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição       |
|-----------|---------|-----------------|
| `id`      | integer | ID do cliente   |

**Body (JSON):**
| Campo      | Tipo   | Obrigatório | Descrição                          |
|------------|--------|-------------|-------------------------------------|
| `name`     | string | Sim         | Mín. 3, máx. 100 caracteres        |
| `email`    | string | Sim         | E-mail válido, máx. 100 caracteres |
| `password` | string | Não         | Mín. 6, máx. 100 caracteres        |

**Resposta `200 OK`:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com"
}
```

**Erros:**
| Status | Descrição                                          |
|--------|----------------------------------------------------|
| `404`  | `"Customer not found"`                             |
| `409`  | `"Email already exists for another customer"`      |
| `422`  | Falha na validação do body                         |

---

### `DELETE /customers/:id`

Remove um cliente pelo ID.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição       |
|-----------|---------|-----------------|
| `id`      | integer | ID do cliente   |

**Resposta `204 No Content`:** corpo vazio.

**Erros:**
| Status | Descrição                 |
|--------|---------------------------|
| `404`  | `"Customer not found"`    |

---

## Eventos

> Todas as rotas abaixo exigem autenticação JWT.

### `POST /events`

Cria um novo evento.

**Autenticação:** Sim

**Body (JSON):**
| Campo          | Tipo   | Obrigatório | Descrição                                               |
|----------------|--------|-------------|----------------------------------------------------------|
| `name`         | string | Sim         | Mín. 1, máx. 100 caracteres                            |
| `description`  | string | Sim         | Mín. 1, máx. 500 caracteres                            |
| `location`     | string | Sim         | Mín. 1, máx. 200 caracteres                            |
| `initialDate`  | string | Sim         | ISO 8601 com offset (ex: `"2026-06-01T20:00:00-03:00"`) |
| `finalDate`    | string | Sim         | ISO 8601 com offset, deve ser após `initialDate`        |
| `maxTickets`   | number | Sim         | Inteiro positivo                                        |
| `ticketPrice`  | number | Sim         | Número não-negativo                                     |

**Resposta `201 Created`:** objeto do evento criado (completo, sem fotos).

**Erros:**
| Status | Descrição                                          |
|--------|----------------------------------------------------|
| `400`  | `"Initial date cannot be in the past"`             |
| `400`  | `"Final date must be after initial date"`          |
| `422`  | Falha na validação do body                         |

---

### `GET /events`

Lista eventos (por padrão, apenas futuros). Resultados são armazenados em cache.

**Autenticação:** Sim

**Query Parameters:**
| Parâmetro     | Tipo    | Obrigatório | Descrição                              |
|---------------|---------|-------------|----------------------------------------|
| `withExpired` | boolean | Não         | Se `true`, inclui eventos encerrados   |

**Resposta `200 OK`:** array de eventos com fotos (mesmo schema de `GET /public/events`).

---

### `GET /events/:id`

Retorna os detalhes de um evento com suas fotos.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição    |
|-----------|---------|--------------|
| `id`      | integer | ID do evento |

**Resposta `200 OK`:** objeto único do evento com fotos.

**Erros:**
| Status | Descrição              |
|--------|------------------------|
| `404`  | `"Event not found"`    |

---

### `PUT /events/:id`

Atualiza um evento existente.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição    |
|-----------|---------|--------------|
| `id`      | integer | ID do evento |

**Body (JSON):** mesmo schema de `POST /events`.

**Resposta `200 OK`:** objeto do evento atualizado.

**Erros:**
| Status | Descrição                                                                              |
|--------|----------------------------------------------------------------------------------------|
| `400`  | `"Initial date cannot be in the past"`                                                 |
| `400`  | `"Final date must be after initial date"`                                              |
| `400`  | `"Event cannot be updated because it has already finished"`                            |
| `400`  | `"Cannot update event because the new max tickets is less than the total tickets sold"` |
| `404`  | `"Event not found"`                                                                    |
| `422`  | Falha na validação do body                                                             |

---

### `DELETE /events/:id`

Remove um evento.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição    |
|-----------|---------|--------------|
| `id`      | integer | ID do evento |

**Resposta `204 No Content`:** corpo vazio.

**Erros:**
| Status | Descrição                                                  |
|--------|------------------------------------------------------------|
| `400`  | `"Event cannot be deleted because it has already finished"` |
| `400`  | `"Cannot delete event because it has tickets sold"`         |
| `404`  | `"Event not found"`                                        |

---

### `PATCH /events/:id/images`

Adiciona uma imagem a um evento.

**Autenticação:** Sim  
**Content-Type:** `multipart/form-data`

**Path Parameters:**
| Parâmetro | Tipo    | Descrição    |
|-----------|---------|--------------|
| `id`      | integer | ID do evento |

**Form Data:**
| Campo   | Tipo | Obrigatório | Descrição                                              |
|---------|------|-------------|--------------------------------------------------------|
| `image` | file | Sim         | Imagem nos formatos JPEG, PNG, WebP ou GIF. Máx. 5 MB |

**Resposta `204 No Content`:** corpo vazio.

**Erros:**
| Status | Descrição                        |
|--------|----------------------------------|
| `400`  | `"Image file is required"`       |
| `400`  | Tipo de arquivo inválido         |

---

### `DELETE /events/:id/images/:imageId`

Remove uma imagem de um evento.

**Autenticação:** Sim

**Path Parameters:**
| Parâmetro | Tipo    | Descrição       |
|-----------|---------|-----------------|
| `id`      | integer | ID do evento    |
| `imageId` | integer | ID da imagem    |

**Resposta `204 No Content`:** corpo vazio.

**Erros:**
| Status | Descrição                     |
|--------|-------------------------------|
| `404`  | `"Event photo not found"`     |

---

## Ingressos

> Requer autenticação JWT. Os ingressos retornados são sempre os do cliente autenticado.

### `GET /tickets`

Lista todos os ingressos do cliente autenticado.

**Autenticação:** Sim  
**Parâmetros:** Nenhum

**Resposta `200 OK`:**
```json
[
  {
    "id": 10,
    "eventId": 1,
    "code": "AB3X-0001-0001",
    "event": {
      "id": 1,
      "name": "Show de Rock",
      "description": "...",
      "initialDate": "2026-06-01T20:00:00.000Z",
      "finalDate": "2026-06-02T00:00:00.000Z",
      "location": "Arena XYZ",
      "maxTickets": 500,
      "ticketPrice": 150.00,
      "photos": ["https://host/uploads/arquivo.jpg"]
    }
  }
]
```

---

## Checkout

> Requer autenticação JWT.

### `POST /checkout`

Compra ingressos para um evento. A operação é executada dentro de uma transação com lock para evitar problemas de concorrência.

**Autenticação:** Sim

**Body (JSON):**
| Campo           | Tipo   | Obrigatório | Descrição                                               |
|-----------------|--------|-------------|----------------------------------------------------------|
| `eventId`       | number | Sim         | ID do evento (inteiro positivo)                         |
| `ticketCount`   | number | Sim         | Quantidade de ingressos desejados (inteiro positivo)    |
| `paymentMethod` | string | Sim         | Um de: `"credit_card"`, `"debit_card"`, `"pix"`        |

**Resposta `201 Created`:**
```json
{
  "message": "Tickets purchased successfully",
  "statusCode": 201,
  "totalPrice": 300.00,
  "paymentMethod": "pix",
  "tickets": [
    { "eventId": 1, "customerId": 1, "code": "AB3X-0001-0001" },
    { "eventId": 1, "customerId": 1, "code": "CD5Y-0001-0002" }
  ]
}
```

**Erros:**
| Status | Descrição                                                      |
|--------|----------------------------------------------------------------|
| `400`  | `"Event has already started"`                                  |
| `400`  | `"Only N tickets available for this event"`                    |
| `404`  | `"Event not found"`                                            |
| `422`  | Falha na validação do body                                     |
