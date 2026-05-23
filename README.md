# ImoCheck 🏠🛰️

Aplicație web pentru analiza și monitorizarea proprietăților imobiliare folosind imagini satelitare (Sentinel Hub).

## Tehnologii

- **Frontend**: React + Vite
- **Backend**: Node.js / Express
- **API**: Sentinel Hub (imagini satelitare)

## Instalare

### 1. Clonează repository-ul

```bash
git clone https://github.com/Lucaa20004/imocheck.git
cd imocheck
```

### 2. Configurează variabilele de mediu

Copiază fișierele `.env.example` și completează cu credențialele tale de la [Sentinel Hub](https://apps.sentinel-hub.com/dashboard/):

```bash
# Root (frontend)
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
```

Editează fișierele `.env` și înlocuiește placeholder-ele cu cheile tale:

```
VITE_SH_CLIENT_ID=cheia_ta_aici
VITE_SH_CLIENT_SECRET=secretul_tau_aici
VITE_SH_INSTANCE_ID=instanta_ta_aici
```

> **Notă**: Poți obține credențiale gratuit de la [Sentinel Hub Dashboard](https://apps.sentinel-hub.com/dashboard/) — trebuie doar să îți creezi un cont.

### 3. Instalează dependențele

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 4. Pornește aplicația

```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
npm run dev
```

Aplicația va fi disponibilă la `http://localhost:5173`.

## Structura proiectului

```
imocheck/
├── backend/           # Server Node.js
│   ├── server.js
│   └── .env.example
├── src/               # Cod sursă React
│   ├── components/    # Componente React
│   ├── hooks/         # Custom hooks
│   ├── services/      # Servicii API
│   ├── App.jsx
│   └── main.jsx
├── public/            # Fișiere statice
├── .env.example       # Template variabile de mediu
└── package.json
```
