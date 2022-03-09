import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeGradeController } from "./factory/makeController";

export default async function GradeRouter(app: Application, router: Router) {
  const controller = makeGradeController();
  const adaptRoute = createRouteAdapter(controller);

  router.get("/", access("read-grade"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-grade"), adaptRoute(controller.findById));
  router.post("/", access("create-grade"), adaptRoute(controller.create));
  router.put("/:id", access("update-grade"), adaptRoute(controller.update));
  router.delete("/:id", access("delete-grade"), adaptRoute(controller.delete));

  app.use("/grades", router);
}
