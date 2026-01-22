"use client";
import { useState, useEffect } from 'react';
import { userService } from '@/services/userService';
import CalculatorForm from '@/components/CalculatorForm';
import UserList from '@/components/UserList';
import { Toaster } from 'react-hot-toast';

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
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-20">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"></div>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 space-y-12">
        <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Calculative
                </span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-gray-500">
                Determine the numerical value of any name using our deterministic alphabet algorithm.
            </p>
        </div>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <CalculatorForm onUserAdded={fetchUsers} />
        </section>

        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-gray-800">Recent Calculations</h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {users.length} Records
                </span>
            </div>
            
            {loading ? (
                <div className="space-y-4">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-16 bg-white rounded-xl shadow-sm animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <UserList users={users} onRefresh={fetchUsers} />
            )}
        </section>
      </main>

      {/* Global Toast Provider */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
            duration: 4000,
            style: {
                background: '#333',
                color: '#fff',
                borderRadius: '8px',
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
            },
        }}
      />
    </div>
  );
}
