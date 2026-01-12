import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve("/home/devalex/fitness24hub.com/fitness24hub/.env") })

const app = express()

// ---- CORS configuration ----
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)

        const allowedOrigins = [
            "https://fitness24hub.com",
            "https://su.fitness24hub.com",
            "https://ku.fitness24hub.com",
            "https://ksa.fitness24hub.com",
            "https://iq.fitness24hub.com",
            "http://localhost:9002",
            "http://localhost:5173"
        ]

        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        callback(new Error("Not allowed by CORS: " + origin))
    },
    credentials: true,
    optionsSuccessStatus: 204
}))

app.use(express.json())
app.use(cookieParser())

// ---- MYSQL POOL ----
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// ---- JWT SECRET ----
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    console.error("Missing JWT_SECRET in .env")
    process.exit(1)
}

// ---- GET CATEGORIES ----
app.get("/categories", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT id, name, slug, description, image_url FROM categories ORDER BY id ASC"
        )
        res.json(rows)
    } catch (err) {
        console.error("GET CATEGORIES ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- GET WORKOUTS BY CATEGORY ----
app.get("/categories/:categoryId/workouts", async (req, res) => {
    try {
        const [workouts] = await pool.execute(
            "SELECT id, title, description, duration, level, image_url FROM workouts WHERE category_id = ? ORDER BY id ASC",
            [req.params.categoryId]
        );
        res.json(workouts);
    } catch (err) {
        console.error("GET WORKOUTS BY CATEGORY ERROR:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ---- GET SINGLE WORKOUT ----
app.get("/workouts/:id", async (req, res) => {
    try {
        const [[workout]] = await pool.execute(
            "SELECT * FROM workouts WHERE id = ?",
            [req.params.id]
        );

        if (!workout) return res.status(404).json({ error: "Not found" });

        const [steps] = await pool.execute(
            "SELECT step_number, instruction FROM workout_instructions WHERE workout_id = ? ORDER BY step_number",
            [req.params.id]
        );

        workout.steps = steps;
        res.json(workout);

    } catch (err) {
        console.error("GET WORKOUT ERROR:", err);
        res.status(500).json({ error: "Server error" });
    }
})

// ---- GET NUTRITION CATEGORIES ----
app.get("/nutrition/categories", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT id, name, description, image_url FROM nutrition_categories ORDER BY id ASC"
        )
        res.json(rows)
    } catch (err) {
        console.error("GET NUTRITION CATEGORIES ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- GET SINGLE NUTRITION CATEGORY ----
app.get("/nutrition/categories/:id", async (req, res) => {
    try {
        const [[category]] = await pool.execute(
            "SELECT id, name, description, image_url FROM nutrition_categories WHERE id = ?",
            [req.params.id]
        )

        if (!category) return res.status(404).json({ error: "Category not found" })

        res.json(category)
    } catch (err) {
        console.error("GET NUTRITION CATEGORY ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- GET RECIPES BY NUTRITION CATEGORY ----
app.get("/nutrition/categories/:categoryId/recipes", async (req, res) => {
    try {
        const [recipes] = await pool.execute(
            "SELECT id, title, description, cook_time, calories, image_url FROM recipes WHERE category_id = ? ORDER BY id ASC",
            [req.params.categoryId]
        )
        res.json(recipes)
    } catch (err) {
        console.error("GET RECIPES BY CATEGORY ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- GET SINGLE RECIPE WITH INGREDIENTS AND INSTRUCTIONS ----
app.get("/recipes/:id", async (req, res) => {
    try {
        const [[recipe]] = await pool.execute(
            "SELECT * FROM recipes WHERE id = ?",
            [req.params.id]
        )

        if (!recipe) return res.status(404).json({ error: "Recipe not found" })

        const [ingredients] = await pool.execute(
            "SELECT ingredient FROM recipe_ingredients WHERE recipe_id = ? ORDER BY id ASC",
            [req.params.id]
        )

        const [instructions] = await pool.execute(
            "SELECT step_number, instruction FROM recipe_instructions WHERE recipe_id = ? ORDER BY step_number ASC",
            [req.params.id]
        )

        recipe.ingredients = ingredients
        recipe.instructions = instructions

        res.json(recipe)
    } catch (err) {
        console.error("GET RECIPE ERROR:", err)
        res.status(500).json({ error: "Server error" })
    }
})

// ---- GET ALL ARTICLES ----
app.get("/articles", async (req, res) => {
    try {
        const [articles] = await pool.execute(
            "SELECT id, title, summary, author, date, image FROM articles ORDER BY created_at DESC"
        )
        res.json(articles)
    } catch (err) {
        console.error("GET ARTICLES ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- GET SINGLE ARTICLE WITH CONTENT ----
app.get("/articles/:id", async (req, res) => {
    try {
        const [[article]] = await pool.execute(
            "SELECT * FROM articles WHERE id = ?",
            [req.params.id]
        )

        if (!article) return res.status(404).json({ error: "Article not found" })

        res.json(article)
    } catch (err) {
        console.error("GET ARTICLE ERROR:", err)
        res.status(500).json({ error: "Server error" })
    }
})

// ---- REGISTER USER ----
app.post("/auth/register", async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        )

        res.json({ message: "User registered successfully" })
    } catch (err) {
        console.error("REGISTER ERROR:", err)
        if (err.code === "ER_DUP_ENTRY") {
            res.status(409).json({ error: "Username or email already exists" })
        } else {
            res.status(500).json({ error: "Database error" })
        }
    }
})

// ---- LOGIN USER ----
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body

    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        )

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: "2h" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // set to true if using HTTPS
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        res.json({ message: "Login successful" })
    } catch (err) {
        console.error("LOGIN ERROR:", err)
        res.status(500).json({ error: "Database error" })
    }
})

// ---- PROTECTED ROUTE ----
app.get("/auth/me", (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: "Missing token" })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.json(decoded)
    } catch {
        res.status(401).json({ error: "Invalid or expired token" })
    }
})

// ---- LOGOUT ROUTE ----
app.post("/auth/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" })
    res.json({ message: "Logged out" })
})

// ---- START SERVER ----
app.listen(9102, () => {
    console.log("API running on http://localhost:9102")
})
