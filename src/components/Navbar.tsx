'use client';

import ProgressLink from './ProgressLink';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';
import { BookOpen, LogOut, Shield, UserPlus, LogIn } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.container}`}>
        <ProgressLink href="/" className={styles.logo}>
          Studious
        </ProgressLink>
        
        <div className={styles.navRight}>
          {session ? (
            <>
              {session.user.role !== 'ADMIN' && (
                <ProgressLink href="/study-planner" className={styles.navLink}>
                  <BookOpen size={18} />
                  <span>Study Planner</span>
                </ProgressLink>
              )}
              
              {session.user.role === 'ADMIN' && (
                <ProgressLink href="/admin" className={styles.navLink}>
                  <Shield size={18} />
                  <span>Admin</span>
                </ProgressLink>
              )}
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`btn btn-ghost ${styles.signOutButton}`}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <ProgressLink href="/login" className={`btn btn-ghost ${styles.authButton}`}>
                <LogIn size={18} />
                <span>Sign In</span>
              </ProgressLink>
              <ProgressLink href="/signup" className={`btn btn-primary ${styles.authButton}`}>
                <UserPlus size={18} />
                <span>Sign Up</span>
              </ProgressLink>
            </>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
