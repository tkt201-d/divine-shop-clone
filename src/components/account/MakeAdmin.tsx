
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MakeAdmin = () => {
  const { user } = useAuth();
  const { isAdmin, loading: isCheckingAdmin } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const makeAdmin = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Không tìm thấy phiên đăng nhập');
      }
      
      const response = await supabase.functions.invoke('make-admin', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      toast.success('Đã cấp quyền admin thành công!');
      
      // Force reload to update admin status
      window.location.reload();
    } catch (error: any) {
      toast.error('Không thể cấp quyền admin', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quyền Admin</CardTitle>
          <CardDescription>Kiểm tra quyền admin của tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quyền Admin</CardTitle>
          <CardDescription>Bạn đã có quyền admin trên hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-primary">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-medium">Tài khoản Admin</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Bạn có thể truy cập trang quản trị để quản lý sản phẩm và các chức năng admin khác.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <a href="/admin">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Đi đến trang quản trị
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quyền Admin</CardTitle>
        <CardDescription>Bạn chưa có quyền admin trên hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Bạn có thể yêu cầu quyền admin để quản lý sản phẩm và các chức năng khác trên hệ thống.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={makeAdmin} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Yêu cầu quyền admin
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MakeAdmin;
