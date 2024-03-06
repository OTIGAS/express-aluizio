declare module "express-async-errors" {
  function patchExpress(): void;
  export = patchExpress;
}
