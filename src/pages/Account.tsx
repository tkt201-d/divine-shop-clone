
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import { AccountForm } from "@/components/account/AccountForm";
import { AccountHeader } from "@/components/account/AccountHeader";
import Footer from "@/components/layout/Footer";

const Account = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Chuyển hướng nếu chưa đăng nhập
    if (!loading && !user) {
      navigate("/auth");
    }

    // Lấy thông tin profile nếu đã đăng nhập
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
          toast({
            title: "Lỗi",
            description: "Không thể lấy thông tin người dùng",
            variant: "destructive",
          });
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, loading, navigate, toast]);

  // Cập nhật thông tin người dùng
  const updateProfile = async (updatedProfile: Partial<Tables<"profiles">>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", user.id);

      if (error) {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật thông tin",
          variant: "destructive",
        });
        return false;
      }

      // Cập nhật state
      setProfile((prev) => (prev ? { ...prev, ...updatedProfile } : null));
      
      toast({
        title: "Thành công",
        description: "Thông tin đã được cập nhật",
      });
      
      return true;
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật thông tin",
        variant: "destructive",
      });
      return false;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container flex items-center justify-center">
          <p className="text-lg">Đang tải...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <AccountHeader user={user} />
        <Separator className="my-6" />
        <AccountForm profile={profile} updateProfile={updateProfile} />
      </main>
      <Footer />
    </div>
  );
};

export default Account;
