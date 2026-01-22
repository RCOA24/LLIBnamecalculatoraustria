import { useState } from 'react';
import { userService } from '@/services/userService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUserActions } from '@/hooks/useUserActions';
import { Edit2, Trash2, Check, X, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function UserList({ users, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const { validate, handleError } = useUserActions();
  const [deletingId, setDeletingId] = useState(null);

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

  const deleteUser = async (id) => {
    if(!confirm('Are you sure you want to delete this user?')) return;
    
    setDeletingId(id);
    try {
      await userService.delete(id);
      toast.success('User deleted successfully');
      onRefresh();
    } catch (err) {
      handleError(err, 'Failed to delete user.');
    } finally {
        setDeletingId(null);
    }
  };

  if(!users || users.length === 0) {
    return (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No calculations yet</h3>
            <p className="text-gray-500">Calculate a name above to get started.</p>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4 text-center w-32">Value</th>
              <th className="px-6 py-4 text-right w-40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                  {editingId === user.id ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="bg-white"
                            autoFocus
                        />
                    </div>
                  ) : (
                    <div className="font-medium text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {user.full_name?.charAt(0).toUpperCase()}
                        </div>
                        {user.full_name}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-700 font-mono shadow-sm">
                        {user.calculation_result}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === user.id ? (
                      <>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => saveEdit(user.id)} title="Save">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100" onClick={cancelEdit} title="Cancel">
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => startEdit(user)} title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteUser(user.id)} isLoading={deletingId === user.id} title="Delete">
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
  );
}
