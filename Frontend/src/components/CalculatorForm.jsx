import { useState } from 'react';
import { userService } from '@/services/userService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useUserActions } from '@/hooks/useUserActions';
import { Calculator, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CalculatorForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { validate, handleError } = useUserActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a name.');
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
      <CardHeader className="pb-2 text-center sm:text-left border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white text-lg">
                    <div className="p-2 bg-slate-900 dark:bg-indigo-500 rounded-lg text-white shadow-sm">
                        <Calculator className="w-5 h-5" />
                    </div>
                    New Calculation
                </CardTitle>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Enter a full name below to generate its deterministic value.
                </p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
          <div className="w-full flex-1">
            <Input 
                placeholder="Ex: John Doe"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    if(error) setError('');
                }}
                error={error}
                className="h-12 text-base px-4 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                autoFocus
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8 w-full sm:w-auto font-semibold shadow-md active:shadow-none dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white" isLoading={isLoading}>
            Calculate <ArrowRight className="ml-2 w-4 h-4 opacity-70" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
