"use client";
import { useState, useEffect } from 'react';
import { userService } from '@/services/userService';
import CalculatorForm from '@/components/CalculatorForm';
import UserList from '@/components/UserList';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import { ThemeToggle } from '@/components/ThemeToggle';
import { LayoutDashboard } from 'lucide-react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-slate-800 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
                    <div className="p-1.5 bg-slate-900 dark:bg-indigo-500 rounded-md text-white">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                    Calculative
                </div>
                <ThemeToggle />
            </div>
        </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-10">
        
        {/* Hero / Input Section */}
        <section className="space-y-6">
             <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
                    Dashboard
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400">
                    Manage users and calculate name values efficiently.
                </p>
            </div>
             <CalculatorForm onUserAdded={fetchUsers} />
        </section>

        {/* Data Section */}
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Registered Users</h2>
                 <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {users.length} Total
                </span>
            </div>
            
            {loading ? (
                <div className="w-full bg-card rounded-xl border border-border p-8 space-y-4">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse w-full"></div>
                     ))}
                </div>
            ) : (
                <UserList users={users} onRefresh={fetchUsers} />
            )}
        </section>
      </main>

      <Toaster 
        position="bottom-right"
         toastOptions={{
            style: {
                background: '#1e293b',
                color: '#fff',
                fontSize: '14px',
                padding: '12px 20px',
            },
            success: {
                style: {
                    background: '#10B981', 
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#10B981',
                },
            },
            error: {
               style: {
                    background: '#EF4444', 
                },
            }
         }}
      />
    </div>
  );
}
