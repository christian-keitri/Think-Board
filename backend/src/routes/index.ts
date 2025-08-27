import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
import notesRoute from "./notes-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/chats", chatRoutes);
appRouter.use("/notes", notesRoute);

export default appRouter;