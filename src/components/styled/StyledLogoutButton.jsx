import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";

import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/services/AdminService";
import { logoutReducer } from "@/lib/store/slices/authenticationSlice";

export default function StylledLogoutButton(props) {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const StylledIconButton = styled(IconButton)({
    visibility: isLoggedIn ? "visible" : "hidden",
  });

  async function handleLogout() {
    await logout();
    dispatch(logoutReducer());
  }

  return (
    <StylledIconButton title="Изход" onClick={handleLogout} {...props}>
      <LogoutIcon />
    </StylledIconButton>
  );
}
