import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-light-gray">
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
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-electric-blue"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-gray mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-electric-blue"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-electric-blue"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-gray-300 focus:border-electric-blue"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-electric-blue hover:bg-electric-blue-dark text-white py-3 text-lg animate-electric-pulse"
                  >
                    Send Message
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