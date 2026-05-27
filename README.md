# MinePack Optimizer

Sistema inteligente de otimização logística inspirado no **Problema da Mochila (Knapsack Problem)**, utilizando algoritmos para maximizar eficiência no transporte de cargas.

---

# Objetivo

O projeto busca resolver problemas logísticos relacionados à:

* limitação de espaço
* priorização de cargas
* eficiência de transporte
* otimização de capacidade

O sistema analisa produtos, pesos e prioridades para selecionar automaticamente a melhor combinação possível de itens sem exceder a capacidade máxima do veículo/container.

---

# Conceito

Inspirado visualmente no sistema de inventário e baús do Minecraft, o projeto transforma conceitos de Pesquisa Operacional em uma interface moderna e intuitiva.

O sistema simula:

* caminhões
* containers
* cargas
* rastreamento logístico
* otimização automática

---

# Funcionalidades

## Sistema de otimização

* Algoritmo do Problema da Mochila
* Maximização de eficiência
* Seleção inteligente de cargas

---

## Dashboard logístico

* Visualização da carga
* Capacidade utilizada
* Eficiência da otimização
* Status do caminhão

---

## Interface inspirada no Minecraft

* Sistema de slots
* Grid visual semelhante a inventários
* Organização dinâmica de itens

---

## Produtos reais

Integração com a Fake Store API para utilização de:

* imagens
* preços
* produtos reais

---

## Rastreamento

Simulação de:

* status de transporte
* progresso de entrega
* monitoramento de carga

---

# Tecnologias

## Frontend

* React
* Vite
* TailwindCSS
* Axios

---

## Backend

* FastAPI
* Python

---

## Banco de Dados

* Supabase

---

# Estrutura do Projeto

```txt
minepack-optimizer/
│
├── frontend/
├── backend/
├── docs/
├── pitch/
└── README.md
```

---

# Arquitetura

```txt
Fake Store API
        ↓
Frontend React
        ↓
FastAPI Backend
        ↓
Algoritmo da Mochila
        ↓
Supabase
```

---

# Problema da Mochila

O projeto utiliza o clássico algoritmo de Pesquisa Operacional conhecido como:

## Knapsack Problem

Objetivo:
Selecionar os itens de maior valor/prioridade sem ultrapassar a capacidade máxima disponível.

---

# Diferenciais

* Interface gamificada
* Visual inspirado em Minecraft
* Aplicação prática de Pesquisa Operacional
* Simulação logística moderna
* Dashboard interativo

---

# Como Executar

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# Equipe

Projeto desenvolvido para a Expotech utilizando conceitos de:

* Pesquisa Operacional
* Logística
* Otimização
* Desenvolvimento Full Stack

---

# Status do Projeto

🚧 Em desenvolvimento