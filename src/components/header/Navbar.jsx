import styles from "@/styles/components/header/Navbar.module.css";

import Image from "next/image";
import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import MobileNavigation from "./MobileNavigation";

import { useEffect, useRef, useState } from "react";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import { navigationLinks, subMenuLinks } from "@/constants/links";

import logo from "@/assets/logo.svg";
import { SITE_NAME } from "@/constants/global";
import StylledLogoutButton from "../styled/StyledLogoutButton";
import { useMediaQuery } from "@mui/material";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const submenuOpen = Boolean(anchorEl);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navRef = useRef(null);
  const md = useMediaQuery("(max-width: 1140px)", {
    defaultMatches: false,
  });

  function closeNav() {
    navRef.current?.classList.add("hidden_el");
  }

  function openNav() {
    navRef.current?.classList.remove("hidden_el");
  }

  function closeMobileNav() {
    setMobileNavOpen(false);
  }

  function openMobileNav() {
    setMobileNavOpen(true);
  }

  function openSubmenu(event) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function closeSubmenu() {
    setAnchorEl(null);
  }

  function handleSubMenuLinkClick() {
    closeSubmenu();
  }

  useEffect(() => {
    if (md) {
      closeNav();
      return;
    }
    closeMobileNav();
    openNav();
  }, [md]);

  return (
    <>
      <AppBar className={styles.header} component="header" position="static">
        <Toolbar>
          <Link className={styles.logo_wrapper} href="/" title={SITE_NAME}>
            <Image
              src={logo}
              alt={`Лого на ${SITE_NAME}`}
              width={100}
              height={50}
              priority
            />
          </Link>
          <nav className={styles.nav} ref={navRef}>
            <Button
              title="Информация за кандидатстване"
              endIcon={
                submenuOpen ? (
                  <KeyboardArrowUpRoundedIcon />
                ) : (
                  <KeyboardArrowDownRoundedIcon />
                )
              }
              onClick={openSubmenu}
            >
              Информация за кандидатстване
            </Button>
            <Menu anchorEl={anchorEl} open={submenuOpen} onClose={closeSubmenu}>
              {subMenuLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={handleSubMenuLinkClick}
                >
                  <MenuItem>{link.text}</MenuItem>
                </Link>
              ))}
            </Menu>
            {navigationLinks.map((link, index) => (
              <Button key={index} href={link.href} title={link.text}>
                {link.text}
              </Button>
            ))}
          </nav>
          <IconButton className={styles.menu_button} onClick={openMobileNav}>
            <MenuRoundedIcon className={styles.menu_icon} />
          </IconButton>
          {!md ? <StylledLogoutButton /> : null}
        </Toolbar>
      </AppBar>
      <MobileNavigation
        anchor="right"
        open={mobileNavOpen}
        onClose={closeMobileNav}
      />
    </>
  );
}
