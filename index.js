import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ChampionshipRoute from "./routes/ChampionshipRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import PhaseRoute from "./routes/PhaseRoute.js";
import TypeCompetitionRoute from "./routes/TypeCompetitionRoute.js";
import InstitutionRoute from "./routes/InstitutionRoute.js";
import ParticipantRoute from "./routes/ParticipantRoute.js";
import GroupConfigRoute from "./routes/GroupsConfigRoute.js";
import GroupsRoute from "./routes/GroupsRoute.js";
import FixtureRoute from "./routes/FixtureRoute.js";
import MatchRoute from "./routes/MatchRoute.js";
import AthleteRoute from "./routes/AthleteRoute.js";
import PeriodoRoute from "./routes/PeriodRoute.js";
import ResultadoRoute from "./routes/ResultRoute.js";
import PosicionesRoute from "./routes/PositionRoute.js";
// import PointRoute from "./routes/PointRoute.js";
// import configuraciones -->
import { PORT } from "./config.js";

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: "tiwihas1238989esternocleidomastoideo",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    // origin: "https://winscore.perufedup.com",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(ChampionshipRoute);
app.use(CategoryRoute);
app.use(PhaseRoute);
app.use(TypeCompetitionRoute);
app.use(InstitutionRoute);
app.use(ParticipantRoute);
app.use(GroupConfigRoute);
app.use(GroupsRoute);
app.use(FixtureRoute);
app.use(MatchRoute);
app.use(AthleteRoute);
app.use(PeriodoRoute);
app.use(ResultadoRoute);
app.use(PosicionesRoute);
// app.use(PointRoute);
// store.sync();

app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto", PORT);
});
