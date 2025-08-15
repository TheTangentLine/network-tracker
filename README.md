# Network Speed Tester

**Objective:** Build a web application to check network speed with comprehensive reporting and AI-powered chatbot assistance.

## **Project Overview**

A web application for network speed testing with the following features:

- **Real-time speed testing** with detailed metrics
- **Comprehensive reporting** with filtering and pagination
- **AI-powered chatbot** for network-related questions
- **User authentication** with JWT tokens
- **PDF report generation**

## **Folder Structure**

```
network-tracker/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── exceptions.py          # Custom exceptions
│   │   │   ├── dependencies.py        # Dependency injection
│   │   │   ├── middlewares/           # Security, CORS, Auth
│   │   │   └── security/              # JWT, Hashing
│   │   ├── models/                    # Data entities
│   │   ├── repositories/              # Data access layer
│   │   ├── routers/                   # HTTP endpoints
│   │   ├── schemas/                   # Data validation
│   │   ├── services/                  # Business logic
│   │   ├── config.py                  # Configuration
│   │   ├── database.py                # Database setup
│   │   └── main.py                    # Application entry
│   ├── requirements.txt
│   └── .env
│   └── .env.development
│   └── .env.production
└── frontend/
    ├── src/
    │   ├── components/                # React components
    │   ├── hooks/                     # Custom hooks
    │   ├── services/                  # API services
    │   ├── pages/                     # Page components
    │   └── utils/                     # Utility functions
    ├── package.json
    └── .env
```

## **Setup Instructions**

### 1. **Clone the Repository**

```bash
git clone https://github.com/TheTangentLine/network-tracker.git
cd network-tracker
```

### 2. **Backend Setup**

```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # For Mac/Linux
# .venv\Scripts\activate   # For Windows

# Install dependencies
pip install -r requirements.txt

```

### 3. **Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install
```

### 4. **Run the Application**

#### **Backend**

```bash
cd backend
source .venv/bin/activate

export ENVIRONMENT=development # ENVIRONMENT=production for deployment

uvicorn app.main:app --reload
```

#### **Frontend**

```bash
cd frontend
npm run dev
```
