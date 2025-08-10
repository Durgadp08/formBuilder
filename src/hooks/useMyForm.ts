import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Form } from "../store/form.types";

type customHook = () => Form;

const useMyForm: customHook = () => {
  const state = useSelector((state: RootState) => state);
  return state;
};
export default useMyForm;
