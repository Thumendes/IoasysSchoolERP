import { Application, Router } from "express";

export default function register(app: Application, router: Router) {
  router.get("/", (req, res) => {
    res.send({
      version: "1.0.0",
      name: "Ioasys School ERP API",
      description: "ERP API for Ioasys School",
    });
  });

  app.use(router);
}
