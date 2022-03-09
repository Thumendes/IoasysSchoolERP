import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeStudentController } from "./factory/makeController";

export default async function StudentRouter(app: Application, router: Router) {
  const controller = makeStudentController();
  const adaptRoute = createRouteAdapter(controller);

  router.get("/", access("read-student"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-student"), adaptRoute(controller.findById));
  router.post("/", access("create-student"), adaptRoute(controller.create));
  router.put("/:id", access("update-student"), adaptRoute(controller.update));
  router.delete(
    "/:id",
    access("delete-student"),
    adaptRoute(controller.delete)
  );

  app.use("/students", router);
}
