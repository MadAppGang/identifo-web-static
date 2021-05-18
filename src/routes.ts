import Home from "./routes/Home.svelte";
import Login from "./routes/Login.svelte";
import Register from "./routes/Register.svelte";
import TFA from "./routes/TFA.svelte";
import TFASetup from "./routes/TFASetup.svelte";
import PasswordForgot from "./routes/PasswordForgot.svelte";
import PasswordReset from "./routes/PasswordReset.svelte";
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/tfa/verify",
    component: TFA,
  },
  {
    path: "/tfa/setup",
    component: TFASetup,
  },
  {
    path: "/password/reset",
    component: PasswordReset,
  },
  {
    path: "/password/forgot",
    component: PasswordForgot,
  },
];
