import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

export function CompanySettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const [companyInfo, setCompanyInfo] = useState({
    name: "Amaris",
    tagline: "Your trusted partner for heavy machinery and generators",
    email: "info@amaris.com",
    phone: "+1 (555) 123-4567",
    address: "123 Industrial Way, Business Park, CA 90210",
    website: "www.amaris.com",
    description: "Founded in 1985, Amaris has grown to become a leading supplier of heavy machinery and generators for the construction, mining, and manufacturing industries across the nation.",
  });
  
  const [socialMedia, setSocialMedia] = useState({
    facebook: "https://facebook.com/amariscompany",
    twitter: "https://twitter.com/amariscompany",
    linkedin: "https://linkedin.com/company/amaris",
    instagram: "https://instagram.com/amariscompany",
  });
  
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Amaris - Heavy Machinery & Generators",
    metaDescription: "Premium heavy machinery and generators for construction, mining, and manufacturing industries. Built to perform in the most demanding environments.",
    keywords: "heavy machinery, generators, construction equipment, mining equipment, industrial generators",
  });

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialMedia({ ...socialMedia, [name]: value });
  };

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoSettings({ ...seoSettings, [name]: value });
  };

  const saveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings saved",
        description: "Your company settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleCompanyInfoChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  name="tagline"
                  value={companyInfo.tagline}
                  onChange={handleCompanyInfoChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={companyInfo.email}
                  onChange={handleCompanyInfoChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={companyInfo.phone}
                  onChange={handleCompanyInfoChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={companyInfo.address}
                onChange={handleCompanyInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={companyInfo.website}
                onChange={handleCompanyInfoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                name="description"
                value={companyInfo.description}
                onChange={handleCompanyInfoChange}
                rows={4}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={socialMedia.facebook}
                  onChange={handleSocialMediaChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={socialMedia.twitter}
                  onChange={handleSocialMediaChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={socialMedia.linkedin}
                  onChange={handleSocialMediaChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={socialMedia.instagram}
                  onChange={handleSocialMediaChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                value={seoSettings.metaTitle}
                onChange={handleSeoChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={seoSettings.metaDescription}
                onChange={handleSeoChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Textarea
                id="keywords"
                name="keywords"
                value={seoSettings.keywords}
                onChange={handleSeoChange}
                rows={2}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={saveSettings} 
            className="bg-orange-500 hover:bg-orange-600"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}