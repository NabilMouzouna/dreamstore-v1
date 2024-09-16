import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Phones</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Laptops</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">TVs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Order Status</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">Sign up for our newsletter to stay updated on new products and exclusive offers.</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Dreamstore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer