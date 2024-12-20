import { notyf } from "../../utils/notyf";
import resetStates from "../../utils/resetStates";
import { logout } from "../slices/AuthSlice";
import { setPath } from "../slices/DashboardSlice";
import { resetNews } from "../slices/ProfileFinSlice";

const authMiddleware = (store) => (next) => (action) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const { expiresAt } = user;
    const currentTime = Date.now() / 1000;
    if (expiresAt < currentTime && action.type !== "auth/logout") {
      store.dispatch(logout());
      store.dispatch(setPath(""));
      store.dispatch(resetNews());

      console.log("Logged u out");
      notyf.error(
        `Votre session a expiré. Veuillez vous reconnecter pour continuer.`
      );
      return false;
    }
  }

  return next(action);
};

export default authMiddleware;
