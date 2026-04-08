import { Phone, Mail, Facebook, Instagram, Twitter, Lock } from "lucide-react";
import { useQuery } from '@tanstack/react-query';

interface FooterLinksData {
  [footerName: string]: string[];
}

interface Social {
  id: number;
  platform: string;
  url: string;
}

export default function Footer() {
  const copyrightYear = `${2022}-${new Date().getFullYear()}`;
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL;  
  // Your queries remain the same...
  const { data: footerLinks = {} } = useQuery<FooterLinksData>({
    queryKey: ['footerLinks'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/adminUploads/links.php`);
      if (!res.ok) throw new Error("Failed to fetch footer links");
      const data = await res.json();
      return data.footer_links || {};
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: socials = [] } = useQuery<Social[]>({
    queryKey: ['socials'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/socials/getSocials.php`);
      const data = await res.json();
      return data.socials || [];
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "tiktok":
        return <span className="text-xs">TT</span>;
      case "tripadvisor":
        return <span className="text-xs">TA</span>;
      default:
        return null;
    }
  };

  // Helper component for the common footer sections
  const FooterContent = () => (
    <>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Contact Info - Always shown */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5D547] mb-4">
            Contact Us
          </h2>
          <div className="space-y-6 text-sm text-gray-300">
            <div className="space-y-2 pb-4 border-b border-[#F5D547]/20">
              <h3 className="text-[#F5D547] text-xs uppercase tracking-wider font-semibold">
                Kenya (Head Office)
              </h3>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F5D547]" /> +254 700 012 344
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F5D547]" /> +254 713 491 692
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F5D547]" /> info@alemansadventures.com
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links - Always shown */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5D547] mb-4">
            Quick Links
          </h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Destinations", href: "/destinations" },
              { label: "Safaris", href: "/safaris" },
              { label: "Journals", href: "/journals" },
              { label: "Reviews", href: "/reviews" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative group transition-colors duration-200 hover:text-[#F5D547]"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F5D547] group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Links - Conditional */}
        {Object.keys(footerLinks).length > 0 && (
          <div className="flex flex-col gap-6 md:max-h-150 overflow-hidden md:overflow-auto">
            {Object.entries(footerLinks).map(([footerName, sections]) => (
              <div key={footerName}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5D547] mb-2">
                  {footerName}
                </h2>
                <ul className="space-y-1 text-sm text-gray-300">
                  {sections.map((section: string) => (
                    <li key={section}>
                      <a
                        href={`/${encodeURIComponent(section)}/${encodeURIComponent(footerName)}`}
                        className="block relative transition-colors duration-200 hover:text-[#F5D547]"
                      >
                        {section}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#F5D547] group-hover:w-full transition-all duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Payment Security - Always shown */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F5D547] mb-4">
            Pay Safely With Us
          </h2>
          <p className="text-xs text-gray-400 mb-4 flex items-start gap-2 leading-relaxed">
            <Lock className="w-4 h-4 text-[#F5D547] shrink-0 mt-0.5" />
            <span>Your payment is encrypted and securely transmitted using SSL.</span>
          </p>
          <div className="flex items-center gap-4 text-[#F5D547] opacity-90">
            <img src="/visa.svg" alt="Visa" className="w-11 h-auto opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/mastercard.svg" alt="Mastercard" className="w-11 h-auto opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/amex.svg" alt="American Express" className="w-11 h-auto opacity-80 hover:opacity-100 transition-opacity" />
            <img src="/paypal.svg" alt="PayPal" className="w-19 h-auto opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="border-t border-[#F5D547]/20 my-6" />

      <div className="max-w-8xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 uppercase tracking-widest">
        <p>
          © {copyrightYear}{" "}
          <span className="text-[#F5D547] font-medium">
            Alemans Adventures
          </span>{" "}
          — All Rights Reserved.  Designed & Developed by 
          <a
            href="https://github.com/agoddamncrowbar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-[#F5D547] transition-colors ml-2"
          >
          agoddamncrowbar
          </a>
        </p>
        
        <div className="flex gap-4">
          {(socials as Social[]).map((social: Social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5D547] transition-colors"
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      </div>
    </>
  );

  // Single return statement
  return (
    <footer className="bg-[#1A0A0B] text-[#F5D547]/90 border-t border-[#F5D547]/20">
      <FooterContent />
    </footer>
  );
}