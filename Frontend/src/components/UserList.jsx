import { useState } from 'react';
import { userService } from '@/services/userService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useUserActions } from '@/hooks/useUserActions';
import { Edit2, Trash2, Check, X, User, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function UserList({ users, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const { validate, handleError } = useUserActions();
  const [deletingId, setDeletingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditingName(user.full_name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEdit = async (id) => {
    if (!validate(editingName)) {
      toast.error('Name must contain only alphabetic characters.');
      return;
    }
    
    try {
      await userService.update(id, editingName);
      toast.success('User updated successfully');
      setEditingId(null);
      onRefresh();
    } catch (err) {
      handleError(err, 'Failed to update user.');
    }
  };

  const confirmDelete = (user) => {
    setCategoryToDelete(user);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    setDeletingId(categoryToDelete.id);
    setModalOpen(false);

    try {
      await userService.delete(categoryToDelete.id);
      toast.success('User deleted successfully');
      onRefresh();
    } catch (err) {
      handleError(err, 'Failed to delete user.');
    } finally {
        setDeletingId(null);
        setCategoryToDelete(null);
    }
  };

  if(!users || users.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-full mb-4">
               <User className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No calculations yet</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center mt-1">
                Enter a name in the calculator above to see your first result here.
            </p>
        </div>
    );
  }

  return (
    <>
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold">
              <th className="px-6 py-4 whitespace-nowrap">Full Name</th>
              <th className="px-6 py-4 text-center w-32 whitespace-nowrap">Value</th>
              <th className="px-6 py-4 text-right w-32 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors">
                <td className="px-6 py-3 min-w-[200px]">
                  {editingId === user.id ? (
                    <div className="flex items-center gap-2 max-w-xs">
                        <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="bg-white dark:bg-slate-950 dark:text-white h-9"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit(user.id);
                                if (e.key === 'Escape') cancelEdit();
                            }}
                        />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-slate-900">
                            {user.full_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-200">{user.full_name}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 font-mono">
                        {user.calculation_result}
                    </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    {editingId === user.id ? (
                      <>
                         <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30" onClick={() => saveEdit(user.id)} title="Save">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" onClick={cancelEdit} title="Cancel">
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => startEdit(user)} title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400" onClick={() => confirmDelete(user)} isLoading={deletingId === user.id} title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete User"
        footer={
            <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete} isLoading={!!deletingId}>Delete User</Button>
            </>
        }
    >
        <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to delete <strong>{categoryToDelete?.full_name}</strong>? This action cannot be undone.
        </p>
    </Modal>
    </>
  );
}
