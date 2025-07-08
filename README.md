# 🧾 Job Application Tracker

A fullstack web application to help users track their job applications across different platforms. Users can add, update, and monitor job application status, along with uploading a custom resume for each application.

---

## 🚀 Features

- 🔐 User Authentication (Register/Login)
- 📋 Add, Edit, Delete job applications
- 📄 Upload custom resume (PDF) per application
- 📊 Dashboard view with insights (JobStats)
- 📂 Filter and view all saved jobs
- ☁️ Fullstack deployment on Render

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Multer (for file uploads)
- JWT (for authentication)
- bcrypt (for password hashing)

---

## 🖥️ Project Structure

```
root/
│
├── server.js            # Express server entry
├── .env                 # Environment variables
├── /build               # React frontend (generated)
├── /controllers         # Backend route handlers
├── /routes              # Express API routes
├── /models              # Mongoose models
├── /middleware          # Auth & error middleware
├── /uploads             # Uploaded resumes (PDFs)
```


---

## 📦 Installation (For Local Development)

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/manjunath265/Job-Application-Tracker.git
cd job-application-tracker
\`\`\`

2. **Install backend dependencies**

\`\`\`bash
npm install
\`\`\`


3. **Create \`.env\` file in the root**

\`\`\`env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret
\`\`\`

5. **Run the app**

\`\`\`bash
node server.js
\`\`\`

Now open \`http://localhost:5000\` in your browser.

---

## ☁️ Deployment (on Render)

1. **Build the React frontend**

\`\`\`bash
cd client
npm run build
cd ..
\`\`\`

2. **Ensure your Express server has this to serve frontend**

\`\`\`js
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
\`\`\`

3. **Push to GitHub**, connect your repo to Render

4. **Set Build Command** (if needed):

\`\`\`bash
npm install
\`\`\`

5. **Set Start Command**:

\`\`\`bash
node server.js
\`\`\`

6. **Set environment variables** (MONGO_URI, JWT_SECRET, etc.)

7. Done! Your app is live 🎉

---

## 📬 API Endpoints

### Auth

- \`POST /api/auth/register\` — Create user
- \`POST /api/auth/login\` — Authenticate user

### Jobs

- \`GET /api/jobs\` — Get user's jobs
- \`POST /api/jobs\` — Add new job
- \`PUT /api/jobs/:id\` — Update job
- \`DELETE /api/jobs/:id\` — Delete job

### Resume Upload

- \`POST /api/jobs/:id/upload\` — Upload PDF resume
- \`GET /uploads/:filename\` — Access uploaded resume

---

## 📌 TODO / Future Enhancements

- 🌐 Add job scraping support (LinkedIn, Indeed)
- 🔔 Email notifications/reminders
- 🧠 AI-based job match suggestions
- 📱 Mobile responsive UI improvements

---

## 👨‍💻 Author

- **Manjunath Reddy Edla**
- LinkedIn: https://www.linkedin.com/in/manjunathreddyedla/
- GitHub: https://github.com/manjunath265

---

## 📝 License

MIT License — feel free to use and improve!
