'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook } from 'lucide-react';

const FOOTER_SECTIONS = {
  product: {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Modules', href: '#modules' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Research Papers', href: '#research' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Webinars', href: '#webinars' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Community', href: '#community' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Security', href: '/security' },
      { label: 'Compliance', href: '/compliance' }
    ]
  }
};

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' }
];

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'contact@envrisk.com', href: 'mailto:contact@envrisk.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Address', value: '123 Research Drive, Tech City, TC 12345', href: '#' }
];

function FooterSection({ section }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
      <ul className="space-y-3">
        {section.links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.href}
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactInfoItem({ item }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className="flex items-start gap-3 text-slate-300 hover:text-blue-400 transition-colors duration-200 group"
    >
      <Icon className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400 group-hover:text-blue-300" />
      <div>
        <p className="text-xs font-semibold text-slate-400">{item.label}</p>
        <p className="text-sm">{item.value}</p>
      </div>
    </Link>
  );
}

function SocialLink({ social }) {
  const Icon = social.icon;
  return (
    <a
      href={social.href}
      aria-label={social.label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 text-white"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                EnvRisk
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                AI + IoT powered platform for environmental risk management and sustainability.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social, idx) => (
                <SocialLink key={idx} social={social} />
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.values(FOOTER_SECTIONS).map((section, idx) => (
            <FooterSection key={idx} section={section} />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-12 mb-8">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {CONTACT_INFO.map((info, idx) => (
              <ContactInfoItem key={idx} item={info} />
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-semibold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get the latest updates on environmental monitoring, AI innovations, and sustainability insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg font-semibold transition-colors duration-200 text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Environmental Risk Management Platform. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Terms
              </Link>
              <Link href="/sitemap" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}