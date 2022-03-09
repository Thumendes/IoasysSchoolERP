import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeExamController } from "./factory/makeController";

export default async function ExamRouter(app: Application, router: Router) {
  const controller = makeExamController();
  const adaptRoute = createRouteAdapter(controller);

  router.get("/", access("read-exam"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-exam"), adaptRoute(controller.findById));
  router.post("/", access("create-exam"), adaptRoute(controller.create));
  router.put("/:id", access("update-exam"), adaptRoute(controller.update));
  router.delete("/:id", access("delete-exam"), adaptRoute(controller.delete));

  app.use("/exams", router);
}
