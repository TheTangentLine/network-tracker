# Network Speed Tester

**Objective:** Build a web application to check network speed.


## **Initial Workflow Diagram**

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://github.com/user-attachments/assets/436455be-8ab4-4cb3-9b61-26f3067dc822" width="500"/>
</div>

## **Folder Structure**
*Folder structure details will be updated soon.*

## **Steps to Setup the Project**

### 1. **Clone the Repository**
   First, clone the project repository from GitHub:

   ```bash
   git clone https://github.com/TheTangentLine/network-tracker.git
   ```

### 2. **Frontend setup**

```bash
cd frontend
npm install
npm run dev
```

### 3. **Backend setup**

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # For Mac/ Linux
.venv\Scripts\activate  # For Windows
pip install -r requirements.txt
```

### 4.**Environment Variable Setup**
a. **Frontend setup**

Create a **.env** file in the **frontend** directory and configure the server URL:
```bash
VITE_SERVER_URL=http://localhost:8000
```

b. **Backend setup**

Create a **.env** file in the **backend** directory and set the environment variables for the backend:
```bash
# Application Configuration
APP_NAME=network_tracker
DEBUG=False

# Database Configuration (MongoDB)
MONGODB_URI=mongodb://localhost:27017/network_tracker
MONGODB_DB=network_tracker

# JWT Token Configuration
ALGORITHM=HS256
ACCESS_SECRET_KEY=your_secret
REFRESH_SECRET_KEY=still_your_secret
ACCESS_TOKEN_EXPIRE_MINUTES=30      # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES=43200  # 1 month

# Password Hashing Method
HASHING=bcrypt

# CORS Configuration (Allow cross-origin requests from frontend)
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]


```
