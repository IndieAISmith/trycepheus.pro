import MainLayout from "@/components/layout/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            How we handle and protect your data
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Introduction</h2>
            <p className="text-cepheus-gray-light text-lg">
              At Cepheus, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            <div className="space-y-4">
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                <p className="text-cepheus-gray-light">We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 text-cepheus-gray-light mt-2 space-y-1">
                  <li>Register for an account</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact our support team</li>
                  <li>Use our API services</li>
                </ul>
              </div>
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Usage Data</h3>
                <p className="text-cepheus-gray-light">We automatically collect certain information when you use our services, including:</p>
                <ul className="list-disc pl-6 text-cepheus-gray-light mt-2 space-y-1">
                  <li>API request patterns and usage statistics</li>
                  <li>Device and browser information</li>
                  <li>IP addresses and location data</li>
                  <li>Performance and error logs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            <p className="text-cepheus-gray-light text-lg">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect and prevent fraud and abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Data Security</h2>
            <p className="text-cepheus-gray-light text-lg">
              We implement appropriate technical and organizational security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data storage and backup procedures</li>
              <li>Employee training on security best practices</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Data Sharing and Disclosure</h2>
            <p className="text-cepheus-gray-light text-lg">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light space-y-2">
              <li>Service providers who assist in operating our services</li>
              <li>Professional advisors and consultants</li>
              <li>Law enforcement when required by law</li>
              <li>Other parties with your consent</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            <p className="text-cepheus-gray-light text-lg">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            <p className="text-cepheus-gray-light text-lg">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-cepheus-green">
              privacy@cepheus.ai
            </p>
          </section>

          {/* Last Updated */}
          <section className="text-center text-cepheus-gray-light">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
