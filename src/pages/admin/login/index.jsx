import AuthForm from "@/components/utils/AuthForm";
import { loginReducer } from "@/lib/store/slices/authenticationSlice";
import { login } from "@/services/AdminService";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch()

  async function handleLogin(email, password) {
    try {
      const response = await login({ email, password });
      dispatch(loginReducer());
      return response;
    } catch(error) {
      const { status, data } = error.response;
      if (status === 400) {
        return data;
      }
    }
  }
  
  return (
    <AuthForm
      action={{ label: "Вход", onClick: handleLogin }}
    />
  );
}
