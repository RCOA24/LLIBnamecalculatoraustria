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
    <Card className="w-full max-w-lg mx-auto overflow-hidden border-indigo-100 shadow-lg">
      <div className="bg-indigo-600 h-2 w-full"></div>
      <CardHeader className="pb-4 text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-indigo-700">
           <Calculator className="w-6 h-6" />
           Name Calculator
        </CardTitle>
        <p className="text-gray-500 text-sm mt-2">
            Enter a full name to calculate its unique value.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input 
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                if(error) setError('');
            }}
            error={error}
            className="text-lg py-6"
            autoFocus
          />
          <Button type="submit" size="lg" className="w-full font-bold tracking-wide" isLoading={isLoading}>
            CALCULATE
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
