import { configureStore } from "@reduxjs/toolkit";
import asisAdmin from "./asisAdmin";

export default configureStore({
  reducer: {
    asisAdmin: asisAdmin,
  },
});
