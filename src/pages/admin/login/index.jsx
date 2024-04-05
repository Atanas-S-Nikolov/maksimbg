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
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <AuthForm
      action={{ label: "Вход", onClick: handleLogin }}
    />
  );
}
