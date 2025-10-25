import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient-primary mb-4">Muhammad Junaid</h3>
            <p className="text-sm text-muted-foreground">
              Elite eBay Virtual Assistant specializing in store management, listing optimization, and sales growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Listing Optimization</li>
              <li>Customer Service</li>
              <li>Inventory Management</li>
              <li>Sales Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>junaid@ebayva.com</li>
              <li>Available Worldwide</li>
              <li>Response within 24 hours</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Muhammad Junaid. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for eBay sellers
          </p>
        </div>
      </div>
    </footer>
  );
}
