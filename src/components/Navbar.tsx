'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';
import { BookOpen, LogOut, Shield, UserPlus, LogIn } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          Studious
        </Link>
        
        <div className={styles.navRight}>
          {session ? (
            <>
              <Link href="/study-planner" className={styles.navLink}>
                <BookOpen size={18} />
                <span>Study Planner</span>
              </Link>
              
              {session.user.role === 'ADMIN' && (
                <Link href="/admin" className={styles.navLink}>
                  <Shield size={18} />
                  <span>Admin</span>
                </Link>
              )}
              
              <button 
                onClick={() => signOut()} 
                className={styles.signOutBtn}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.navLink}>
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              
              <Link href="/signup" className={styles.signUpBtn}>
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
