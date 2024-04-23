"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toogleDropdown, setToogleDropdown] = useState(false);

  const links = [
    {
      name: "My Profile",
      href: "/profile",
    },
    {
      name: "Create Post",
      href: "/prompt/create",
    },
  ];

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);

  const AuthBtnComponent = ({ view }) => {
    if (session?.user) {
      //desktop
      if (view == "desktop") {
        return (
          <div className="flex gap-3 md:gap-5">
            <Link href={links[1].href} className="black_btn">
              {links[1].name}
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={links[0].href}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt={links[0].name}
              ></Image>
            </Link>
          </div>
        );
      }
      //mobile
      return (
        <div className="flex">
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() => {
              setToogleDropdown((prev) => !prev);
            }}
          />
          {toogleDropdown && (
            <div className="dropdown">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="dropdown_link"
                  onClick={() => setToogleDropdown(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="black_btn"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>
          ))}
      </div>
    );
  };
  // no user
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="APrompt Logo"
          width={30}
          height={30}
          className="object-contains"
        />
        <p className="logo_text">APrompt</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <AuthBtnComponent view={"desktop"} />
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <AuthBtnComponent view={"mobile"} />
      </div>
    </nav>
  );
};

export default Nav;
