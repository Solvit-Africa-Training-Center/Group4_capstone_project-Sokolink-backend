
import express, { Request, Response }  from "express";
import { config } from "dotenv";
import { Database } from "./database";
import redis from "./utils/redis";
import { routers } from './routes';
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";



config();
const app = express();

app.use(express.json());

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
      // Include tokens in user object
      const userData = {
        profile,
        accessToken,
        refreshToken,
      };
      return done(null, userData);
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.use(routers);

app.get("/", (req: Request, res: Response) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    res.redirect(
      `/profile?name=${encodeURIComponent(user.profile.displayName)}&accessToken=${user.accessToken}`
    );
  }
);

app.get("/profile", (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect("/");
  }
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
redis.connect().catch(console.error);

const port = parseInt(process.env.PORT as string) || 5000;
redis.connect().catch(console.error);

app.get('/',(req, res) => {
  res.send('Hello world')
  });

  
Database.database
  .authenticate()
  .then(async () => {
    app.listen(port,()=>{
    console.log("server started seccessfully")

  })

  })
 

export { app };





