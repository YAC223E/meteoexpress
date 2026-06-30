# 🌤️ Météo Express Pro

> Tableau de bord météo moderne, riche en fonctionnalités et assisté par IA, construit avec Flask, Jinja2 et JavaScript vanilla.

Une application météo complète avec recommandations intelligentes via Groq LLM, chatbot conversationnel, et une interface bilingue FR/EN.

**Développé par Cheick Yacouba Soukouna**

---

## ✨ Fonctionnalités

### 🌦️ Météo principale

- Conditions actuelles détaillées (température ressentie, humidité, vent, pression, visibilité, lever/coucher du soleil)
- Graphiques interactifs 24h (température, humidité, vent)
- Prévisions 5 jours avec agrégation intelligente
- Qualité de l'air (AQI) avec détails PM2.5 / PM10 / NO₂
- Indice UV avec niveaux de risque et conseils
- Carte interactive (Leaflet) avec couches météo OpenWeatherMap
- Conversion °C / °F

### 🧠 Recommandations intelligentes (Groq LLM + WeatherAI)

- Suggestions vestimentaires selon la météo
- Idées d'activités adaptées
- Alertes santé (chaleur, froid, vent, humidité)
- Conseils voyage et conduite
- Indice de confort personnel
- Meilleur jour de la semaine selon activité
- Conseils avancés : horaires, tenue, sécurité
- IA Groq (LLaMA 3.3 70B) pour des recommandations naturelles en streaming
- Fallback automatique vers le moteur basé sur des règles si Groq indisponible

### 💬 Chatbot météo

- Assistant conversationnel en temps réel
- Contexte météo automatique de la ville consultée
- Réponses avec effet machine à écrire
- Animations fluides et design glassmorphism
- Bouton flottant avec indicateur visuel

### ⚡ UX & fonctionnalités avancées

- Recherche de ville avec autocomplétion intelligente (scoring, highlight, navigation clavier)
- Recherche vocale (français supporté)
- Géolocalisation ("Ma position")
- Page comparaison de villes
- Favoris (localStorage)
- Mode sombre / clair
- PWA installable + offline (villes récentes)
- Animations météo (pluie, neige, orage, brouillard…)
- Planificateur d'activités
- Modales explicatives (AQI, UV, etc.)
- Partage en image (PNG)
- Export rapport imprimable
- Interface bilingue FR / EN

> 🔐 **Sécurité** : les clés API ne sont jamais exposées côté client.

---

## 🔑 Clés API

### 🌍 OpenWeatherMap (obligatoire)

1. Créer un compte sur [openweathermap.org](https://openweathermap.org/api)
2. Générer une clé API

### 🤖 Groq (optionnel — recommandé)

1. Créer un compte sur [console.groq.com](https://console.groq.com)
2. Générer une clé API

Ajouter dans `.env` :

```env
OPENWEATHER_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

> Sans la clé Groq, l'app utilise automatiquement le moteur WeatherAI basé sur des règles.

---

## 🛠️ Installation

### Prérequis

- Python 3.10+
- Git

### Étapes

```bash
git clone https://github.com/your-username/meteoexpress.git
cd meteoexpress
python -m venv .venv
source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\Activate.ps1     # Windows
pip install -r requirements.txt
```

### Configuration

Créer un fichier `.env` à la racine :

```env
OPENWEATHER_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

> ⚠️ Ne jamais commiter `.env`.

### Lancer l'application

```bash
python app.py
```

Accès : <http://localhost:5000>

---

## 🧪 Tests

```bash
pytest tests/ -v
```

---

## 📁 Structure du projet

```
meteoexpress/
├── app.py                          # Application Flask principale
├── requirements.txt                # Dépendances Python
├── .env                            # Clés API (non versionné)
├── README.md
├── backend/                        # Architecture modulaire
│   ├── app.py
│   ├── config.py
│   ├── routes/
│   │   └── weather.py
│   └── services/
│       ├── ai_engine.py            # Moteur Groq + fallback règles
│       └── weather_service.py
├── static/
│   ├── css/main.css
│   ├── js/app.js
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
├── templates/
│   ├── index.html                  # Dashboard principale
│   ├── compare.html                # Comparaison de villes
│   └── report.html                 # Rapport imprimable
└── tests/
    └── test_weather.py
```

---

## 🚀 Routes principales

| Route                | Description                              |
|----------------------|------------------------------------------|
| `/`                  | Dashboard météo                          |
| `/compare`           | Comparaison de villes                    |
| `/export-pdf`        | Rapport imprimable                       |
| `/api/weather`       | API JSON météo                           |
| `/api/ai-recommendation` | Recommandations IA (SSE streaming)  |
| `/api/chat`          | Chatbot météo (POST)                     |
| `/api/health`        | Health check                             |
| `/autocomplete`      | Autocomplétion villes                    |
| `/reverse-geocode`   | Géocodage inverse (lat/lon → ville)      |
| `/map-tiles/*`       | Proxy sécurisé cartes météo              |

---

## 📦 PWA & Offline

- Installable sur mobile et desktop
- Fonctionne hors ligne pour les dernières villes consultées

---

## 🧠 Stack technique

| Couche      | Technologies                                          |
|-------------|-------------------------------------------------------|
| Backend     | Flask, requests, cache mémoire                        |
| IA          | Groq LLM (LLaMA 3.3 70B) + WeatherAI (règles)       |
| Frontend    | Vanilla JS, Canvas, Leaflet, Tabler Icons             |
| UX          | Animations météo, PWA, design glassmorphism           |
| Streaming   | Server-Sent Events (recommandations), SSE              |
| Engineering | Fallback intelligent, tests Pytest, .gitignore        |

---

## 📝 Notes importantes

- Cache mémoire ~10 minutes pour limiter les appels API
- Le premier chargement peut être légèrement lent
- `.env` est obligatoire pour fonctionner correctement
- L'IA Groq est optionnelle ; sans elle, le moteur de règles prend le relais

---

## 📜 Crédits

- [OpenWeatherMap](https://openweathermap.org) — données météo
- [Groq](https://groq.com) — IA LLM en temps réel
- [Leaflet](https://leafletjs.com) — cartes interactives
- [Tabler Icons](https://tabler.io/icons) — icônes
- [Google Fonts](https://fonts.google.com) — typographies

Créé avec soin par **Cheick Yacouba Soukouna**

---

## 🙏 Remerciements

Merci à OpenWeatherMap pour son API gratuite et à Groq pour l'accès à des modèles LLM performants permettant de construire des projets riches et éducatifs.

Bonne exploration 🌦️
