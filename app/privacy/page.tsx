export const metadata = { title: "Privacy Policy — RedChillies" };

const styles = {
  page: {
    background: "#000",
    color: "#eee",
    minHeight: "100vh",
    padding: "60px 20px",
  },
  container: {
    maxWidth: 800,
    margin: "0 auto",
  },
  h1: {
    color: "#fff",
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 8,
  },
  updated: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    marginBottom: 32,
  },
  h2: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: 700,
    marginTop: 28,
    marginBottom: 10,
  },
  p: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 12,
  },
  li: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 6,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Privacy Policy</h1>
        <p style={styles.updated}>Last updated: August 2026</p>

        <p style={styles.p}>
          This Privacy Policy explains how Urban RedChillies (&quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;) collects, uses, and protects your
          information when you use our website, digital dine-in menu, and
          mobile app (together, the &quot;Services&quot;).
        </p>

        <h2 style={styles.h2}>Information We Collect</h2>
        <p style={styles.p}>When you place an order through our Services, we may collect:</p>
        <ul>
          <li style={styles.li}>Your name</li>
          <li style={styles.li}>Your phone number</li>
          <li style={styles.li}>
            Order details (items ordered, quantities, prices, order type —
            dine-in or takeaway, and table number for dine-in orders)
          </li>
          <li style={styles.li}>Order status and timestamps</li>
        </ul>
        <p style={styles.p}>
          We do not collect payment card details — orders are settled in
          person at the restaurant.
        </p>

        <h2 style={styles.h2}>How We Use Your Information</h2>
        <ul>
          <li style={styles.li}>To process and prepare your order</li>
          <li style={styles.li}>To contact you about your order if needed</li>
          <li style={styles.li}>To display live order status to you</li>
          <li style={styles.li}>To improve our menu, service, and Services</li>
        </ul>

        <h2 style={styles.h2}>Data Storage</h2>
        <p style={styles.p}>
          Your information is stored securely using Supabase, a third-party
          database provider. We take reasonable measures to protect your data
          from unauthorized access, alteration, or disclosure.
        </p>

        <h2 style={styles.h2}>Data Sharing</h2>
        <p style={styles.p}>
          We do not sell, rent, or trade your personal information to third
          parties. Your information is used solely to operate our restaurant
          ordering Services.
        </p>

        <h2 style={styles.h2}>Your Rights</h2>
        <p style={styles.p}>
          You may contact us at any time to request access to, correction of,
          or deletion of your personal information.
        </p>

        <h2 style={styles.h2}>Children&apos;s Privacy</h2>
        <p style={styles.p}>
          Our Services are not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2 style={styles.h2}>Changes to This Policy</h2>
        <p style={styles.p}>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with an updated revision date.
        </p>

        <h2 style={styles.h2}>Contact Us</h2>
        <p style={styles.p}>
          If you have any questions about this Privacy Policy, please contact
          us at{" "}
          <a href="mailto:info@urbanredchillies.com" style={{ color: "#4CAF50" }}>
            info@urbanredchillies.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
