import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { translations } from '@/lib/types';

const Header = ({ language, handleLanguageChange }: any) => {
  const router = useRouter();
  const t = (translations as any)[language];

  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
          <img
            src="Logo_IAF.jpeg"
            alt="IAF Logo"
            className="h-8 sm:h-12 w-auto"
          />
        </motion.div>
        
        <div className="flex items-center gap-4 order-last md:order-none w-full md:w-auto justify-center">
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/events')}
          >
            {t.events}
          </Button>
          
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/chat')}
          >
            {t.chat}
          </Button>
          
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100"
            onClick={() => router.push('/a-propos')}
          >
            {t.about}
          </Button>
        </div>

        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
};

export default Header;