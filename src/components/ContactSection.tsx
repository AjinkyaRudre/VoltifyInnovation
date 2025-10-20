import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, User, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [charCount, setCharCount] = useState(0);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = { name: "", email: "", phone: "", message: "" };
    let hasError = false;

    // Validate fields
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      hasError = true;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number";
      hasError = true;
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent! ✅",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
    setCharCount(0);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Update character count for message
    if (name === "message") {
      setCharCount(value.length);
    }
  };

  return (
    <section id="contact" className="py-20 bg-light-gray" aria-label="Contact section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Contact <span className="text-electric-blue">Us</span>
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your electrical project? Get in touch with our expert team for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-slide-in-left">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-electric-blue/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Phone</h3>
                    <p className="text-muted-foreground">+91-9870189950</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-electric-blue/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Email</h3>
                    <p className="text-muted-foreground">info@voltifyinnovation.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-electric-blue/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Address</h3>
                    <p className="text-muted-foreground">
                      SR No. 697, Flat No. B2, 1st Floor,<br />
                      Preetam Prakash Residency,<br />
                      Bhosari Gaonthan, Bhosari,<br />
                      Haveli, Pune – 411039
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-electric-blue/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray">Business Hours</h3>
                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-muted-foreground">24/7 Emergency Support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-dark-gray mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`pl-10 border-gray-300 focus:border-electric-blue ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`pl-10 border-gray-300 focus:border-electric-blue ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={10}
                        className={`pl-10 border-gray-300 focus:border-electric-blue ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-dark-gray">
                        Message
                      </label>
                      <span className="text-xs text-gray-500">{charCount}/500</span>
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        maxLength={500}
                        className={`pl-10 pt-3 border-gray-300 focus:border-electric-blue resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-electric-blue hover:bg-electric-blue-dark text-white py-3 text-lg animate-electric-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16 animate-fade-in">
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0989!2d73.8567437!3d18.6298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzQ3LjMiTiA3M8KwNTEnMjQuMyJF!5e0!3m2!1sen!2sin!4v1642000000000!5m2!1sen!2sin"
                  width="100%"
                  height="384"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Voltify Innovation Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};