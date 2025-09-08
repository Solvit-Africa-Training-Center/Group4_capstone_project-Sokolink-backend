import express, { Request, Response } from "express";
import { config } from "dotenv";
import { Database } from "./database";
import redis from "./utils/redis";
import { routers } from './routes';
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/config";

config();
const app = express();

// JSON parsing
app.use(express.json());

// Session & Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken, refreshToken });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

// Routers
app.use(routers);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home page
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to SokoLink API</h1>
    <p><a href="/auth/google">Login with Google</a></p>
    <p>View <a href="/api-docs">API Docs</a></p>
  `);
});

// Google OAuth
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    res.redirect(`/profile?name=${encodeURIComponent(user.profile.displayName)}&accessToken=${user.accessToken}`);
  }
);

app.get("/profile", (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/");
  const user = req.user as any;
  res.send(`
    <h1>Welcome ${user.profile.displayName}</h1>
    <p>Email: ${user.profile.emails?.[0].value}</p>
    <p>Access Token: ${user.accessToken}</p>
  `);
});

app.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
});

// Redis
redis.connect().catch(console.error);

// Health check
app.get("/health", (req, res) => res.send("API is running"));

// Start server
const port = parseInt(process.env.PORT as string) || 5000;

Database.database
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
      console.log(`Swagger docs: http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));

export { app };
