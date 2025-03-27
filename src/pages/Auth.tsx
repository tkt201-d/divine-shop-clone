
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Nếu người dùng đã đăng nhập, chuyển hướng đến trang chính
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let error;
      if (isSignUp) {
        const result = await signUp(email, password);
        error = result.error;
        
        if (!error) {
          toast({
            title: "Đăng ký thành công",
            description: "Vui lòng kiểm tra email của bạn để xác nhận tài khoản.",
            duration: 5000,
          });
        }
      } else {
        const result = await signIn(email, password);
        error = result.error;
      }

      if (error) {
        toast({
          title: "Lỗi",
          description: error.message,
          duration: 5000,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Đã xảy ra lỗi, vui lòng thử lại.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Tạo tài khoản mới' : 'Đăng nhập vào tài khoản'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Đang xử lý...'
                : isSignUp
                ? 'Đăng ký'
                : 'Đăng nhập'}
            </Button>
          </div>

          <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-primary hover:text-primary/80"
            >
              {isSignUp
                ? 'Đã có tài khoản? Đăng nhập'
                : 'Chưa có tài khoản? Đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
