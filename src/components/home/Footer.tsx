import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaDiscord,
} from "react-icons/fa";
import { Mail, MapPinIcon, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

    
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <Image
                  src="/companyLogo/companyLogo.png"
                  alt="Leafclutch Technologies"
                  width={100}
                  height={100}
                  className="footer-logo-img"
                />
              </Link>

              <p className="footer-brand-desc">
                Empowering innovation through cutting-edge technology
                solutions, training, and digital transformation services.
              </p>

              <div className="footer-contact-info">
                <a
                  href="mailto:info@leafclutchtech.com.np"
                  className="footer-contact-item"
                >
                  <Mail className="size-4" />
                  <span>info@leafclutchtech.com.np</span>
                </a>

                <a
                  href="tel:+9779766715768"
                  className="footer-contact-item"
                >
                  <Phone className="size-4" />
                  <span>+977-9766715768</span>
                </a>

                <div className="footer-contact-item">
                  <MapPinIcon className="size-4" />
                  <span>Siddharthanagar, Rupandehi, Nepal</span>
                </div>
              </div>
            </div>

            
            <div className="footer-col">
              <h4>Company</h4>

              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>

                <li>
                  <Link href="/about">About Us</Link>
                </li>

                <li>
                  <a
                    href="https://leafclutchtech.com.np/services/all-services"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    href="https://leafclutchtech.com.np/careers/jobs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Careers
                  </a>
                </li>

                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

        
            <div className="footer-col">
              <h4>Programs</h4>

              <ul>
                <li>
                  <Link href="/programs">All Programs</Link>
                </li>

                <li>
                  <Link href="/programs/ai-ml">
                    AI &amp; Machine Learning
                  </Link>
                </li>

                <li>
                  <Link href="/programs/web-dev">
                    Web Development
                  </Link>
                </li>

                <li>
                  <Link href="/programs/cybersecurity">
                    Cybersecurity
                  </Link>
                </li>

                <li>
                  <Link href="/programs/data-science">
                    Data Science
                  </Link>
                </li>

                <li>
                  <Link href="/programs/ui-ux">
                    UI/UX Design
                  </Link>
                </li>
              </ul>
            </div>

         
            <div className="footer-col">
              <h4>Resources</h4>

              <ul>
                <li>
                  <Link href="/enroll">Enroll Now</Link>
                </li>

                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>

                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>

        
              <div className="footer-socials">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="size-4" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="size-4" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="size-4" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube className="size-4" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok className="size-4" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <FaDiscord className="size-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>
              &copy; {new Date().getFullYear()} Leafclutch Technologies Pvt.
              Ltd. All rights reserved.
            </p>

            <div className="footer-bottom-links">
              <Link href="/privacy">Privacy</Link>

              <span className="footer-dot">·</span>

              <Link href="/terms">Terms</Link>

              <span className="footer-dot">·</span>

              <Link href="/contact">Contact</Link>

              <span className="footer-dot">·</span>

              <Link href="/admin" target="_blank">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}