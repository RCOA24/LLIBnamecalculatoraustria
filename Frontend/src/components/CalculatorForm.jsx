
import { useState } from 'react';
import { userService } from '@/services/userService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useUserActions } from '@/hooks/useUserActions';
import { Calculator } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CalculatorForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { validate, handleError } = useUserActions();

  // UI: Full Name input at top, Calculator in middle, Table at bottom
  // Only add to table after '=' is clicked and name is valid
  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!validate(name)) {
      setError('Name must contain only alphabetic characters.');
      return;
    }
    setIsLoading(true);
    try {
      await userService.create(name);
      toast.success('Calculation successful!');
      setName('');
      onUserAdded();
    } catch (err) {
      handleError(err, 'Failed to process calculation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 ring-1 ring-slate-900/5 dark:ring-white/10 dark:bg-slate-900 dark:shadow-none">
      {/* Full Name Input Section */}
      <CardHeader className="pb-2 text-center sm:text-left border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white text-lg">
              <div className="p-2 bg-slate-900 dark:bg-indigo-500 rounded-lg text-white shadow-sm">
                <Calculator className="w-5 h-5" />
              </div>
              Name Calculator
            </CardTitle>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Enter a full name below to generate its deterministic value.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col gap-8">
        {/* Full Name Input */}
        <div className="mb-4">
          <label className="block font-medium text-slate-700 dark:text-slate-200 mb-2">Full Name</label>
          <Input
            placeholder="Ex: John Doe"
            value={name}
            onChange={e => setName(e.target.value)}
            error={error}
            className="h-12 text-base px-4 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
            autoFocus
          />
        </div>

        {/* Calculator Section */}
        <div className="flex flex-col items-center justify-center border-2 border-slate-200 dark:border-slate-800 rounded-xl py-12 bg-slate-50/50 dark:bg-slate-900/50 relative mb-4">
          <form onSubmit={handleCalculate} className="flex flex-col items-center w-full">
            <Button type="submit" size="lg" isLoading={isLoading} className="h-16 w-32 text-2xl font-bold">=</Button>
          </form>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-slate-400 text-lg font-semibold pointer-events-none select-none">Calculator</div>
        </div>
      </CardContent>
    </Card>
  );
}
