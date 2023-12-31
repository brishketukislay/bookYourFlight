"use client"
import React, { useEffect, useState } from 'react';
import style from './header.module.css';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  function handleSignOut() {
    sessionStorage.removeItem('isLoggedIn');
    router.push('/');
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
      setIsLoggedIn(storedIsLoggedIn === 'true');
      if(!storedIsLoggedIn){
        router.push('/')
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, router]);

  return (
    <header className={style.header}>
      My Travel Planner
      <button className={style.signout} onClick={handleSignOut}>
        Sign Out
      </button>
    </header>
  );
};

export default Header;
