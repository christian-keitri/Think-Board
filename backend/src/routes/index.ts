import { Router } from "express";
import userRoutes from "./user-routes";
import chatRoutes from "./chat-routes";
import notesRoute from "./notes-routes";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/chats", chatRoutes);
appRouter.use("/notes", notesRoute);

export default appRouter;