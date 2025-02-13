import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from 'framer-motion';

const FormField = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="relative"
  >
    {children}
  </motion.div>
);

const ContactDialog = ({ t }: { t: (key: string) => string }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsOpen(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        alert(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative overflow-hidden group text-purple-600 hover:text-purple-800 hover:bg-purple-100"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="relative z-10"
          >
            {/* @ts-ignore */}
            {t.contact as string}
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-purple-100 transform origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md backdrop-blur-lg bg-white/90">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-800 text-center">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.span>
          </DialogTitle>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormField>
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white/50 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
            />
          </FormField>

          <FormField>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/50 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
            />
          </FormField>

          <FormField>
            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-white/50 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
            />
          </FormField>

          <FormField>
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-white/50 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-32 transition-all duration-300"
            />
          </FormField>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isSubmitting ? 0 : 1 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.span>
              {isSubmitting && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;