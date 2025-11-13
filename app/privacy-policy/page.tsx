'use client'

import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-6 md:p-8 lg:p-12">
        {/* Header */}
        <header className="border-b-4 border-primary-600 dark:border-primary-400 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-3">
            Privacy Policy
          </h1>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Welcome to Electrocom ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, ERP console, and mobile application (collectively, the "Services").
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              2. Information We Collect
            </h2>
            
            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              2.1 Website Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              When you use our website (https://electrocomsolutions.in), we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li><strong>Account Information:</strong> When you create an account, we collect your email address, full name, and password.</li>
              <li><strong>Contact Forms:</strong> When you use our contact form, get quote form, or book consultation form, we collect your name, email address, phone number, and any message or inquiry details you provide.</li>
              <li><strong>Email Verification:</strong> We verify your email address through email verification links sent to your registered email.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              2.2 ERP Console Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              The ERP Console is exclusively accessible to the business owner/administrator. We collect and manage the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li><strong>Employee Data:</strong> Employee names, contact information, employment details, and other personnel records.</li>
              <li><strong>Attendance Records:</strong> Employee attendance data, including punch-in and punch-out times, locations, and selfie verification images.</li>
              <li><strong>Payroll Information:</strong> Salary details, payment records, and financial information related to employee compensation.</li>
              <li><strong>Business Operations Data:</strong> Client information, project details, contracts, invoices, and other business-related data.</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 my-6 rounded-r">
              <p className="text-gray-800 dark:text-gray-200">
                <strong>Important:</strong> The ERP Console is accessible only to the business owner/administrator. No other users have access to this data.
              </p>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              2.3 Mobile Application Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
              When employees use our mobile application, we collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li><strong>Login Credentials:</strong> Employee login credentials (email and password) provided by the business owner.</li>
              <li><strong>Attendance Data:</strong>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li><strong>Punch In:</strong> Selfie image, GPS location, and timestamp</li>
                  <li><strong>Punch Out:</strong> GPS location and timestamp</li>
                </ul>
              </li>
              <li><strong>Personal Data Updates:</strong> Any changes employees make to their personal information through the mobile app.</li>
              <li><strong>Device Information:</strong> Device type, operating system, and app version for technical support and app functionality.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We use the collected information for the following purposes:
            </p>
            
            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              3.1 Website Services
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>To create and manage your user account</li>
              <li>To respond to your inquiries, quote requests, and consultation bookings</li>
              <li>To send you important updates and communications</li>
              <li>To verify your email address and ensure account security</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              3.2 ERP Console Services
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>To manage employee records and personnel information</li>
              <li>To track and manage employee attendance</li>
              <li>To process payroll and manage financial records</li>
              <li>To manage client relationships and business operations</li>
              <li>To generate reports and analytics for business management</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              3.3 Mobile Application Services
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>To authenticate employees and provide secure access to the app</li>
              <li>To record and track employee attendance with location and time verification</li>
              <li>To verify employee identity through selfie capture during punch-in</li>
              <li>To allow employees to update their personal information</li>
              <li>To send push notifications for important updates and alerts</li>
              <li>To process termination requests from employees</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              4. Data Storage and Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              All data collected through our Services is stored on secure servers hosted by Hetzner. We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">Our security measures include:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Encrypted data transmission using SSL/TLS protocols</li>
              <li>Secure password storage using industry-standard hashing algorithms</li>
              <li>Restricted access to personal data limited to authorized personnel only</li>
              <li>Regular security assessments and updates</li>
              <li>Secure server infrastructure with Hetzner</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              5. Third-Party Services
            </h2>
            
            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              5.1 Firebase
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We use Google Firebase for push notifications in our mobile application. Firebase may collect certain device information and usage data to deliver push notifications. Firebase's privacy practices are governed by Google's Privacy Policy, which can be found at:{' '}
              <Link 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors duration-300"
              >
                https://policies.google.com/privacy
              </Link>
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              5.2 Hetzner
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our data is hosted on Hetzner servers. Hetzner acts as a data processor and is bound by data protection agreements. Hetzner's privacy policy can be found at:{' '}
              <Link 
                href="https://www.hetzner.com/legal/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors duration-300"
              >
                https://www.hetzner.com/legal/privacy-policy
              </Link>
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We only share information with third-party service providers who assist us in operating our Services, and only to the extent necessary to provide those services.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              6. Data Access and Control
            </h2>
            
            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              6.1 Website Users
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">Website users can:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Update their account information through their account settings</li>
              <li>Request deletion of their account by contacting us</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              6.2 ERP Console (Business Owner/Administrator)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              The business owner/administrator has full access to all data stored in the ERP console and can manage, modify, or delete any information as needed for business operations.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-primary-700 dark:text-primary-300 mt-6 mb-3">
              6.3 Mobile App Users (Employees)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">Employees using the mobile application can:</p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Update their personal information directly through the mobile app</li>
              <li>Request account termination by submitting a termination request through the app, which will be processed by the business owner</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 my-6 rounded-r">
              <p className="text-gray-800 dark:text-gray-200">
                <strong>Note:</strong> Since all employees work in the same office, termination requests are processed directly by the business owner. Employees can also discuss any data-related concerns directly with the business owner.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              7. Location Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our mobile application collects location data (GPS coordinates) when employees punch in and punch out for attendance tracking purposes. This location data is used solely for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Verifying employee attendance at the workplace</li>
              <li>Recording accurate punch-in and punch-out locations</li>
              <li>Preventing attendance fraud</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Location data is stored securely on our servers and is only accessible to the business owner/administrator. You can control location permissions through your device settings, but disabling location services may affect the functionality of attendance tracking features.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              8. Image Data (Selfies)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              When employees punch in through the mobile application, we capture a selfie image for identity verification purposes. These images are:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Used solely for verifying employee identity during attendance</li>
              <li>Stored securely on our servers</li>
              <li>Accessible only to the business owner/administrator</li>
              <li>Not shared with third parties except as required by law</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              You can request deletion of your selfie images by contacting the business owner or through the mobile app's support features.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              9. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Remember your login status and preferences</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve website functionality and user experience</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              You can control cookie preferences through your browser settings. However, disabling cookies may affect the functionality of certain features on our website.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              10. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li><strong>Account Information:</strong> Retained for the duration of your account and for a reasonable period after account closure for legal and business purposes.</li>
              <li><strong>Attendance Records:</strong> Retained for payroll and compliance purposes as required by applicable employment laws.</li>
              <li><strong>Business Records:</strong> Retained in accordance with legal and regulatory requirements for business record-keeping.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              When personal information is no longer needed, we will securely delete or anonymize it in accordance with our data retention policies.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              11. Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately, and we will take steps to delete such information from our systems.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              12. International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Your information may be transferred to and stored on servers located outside your country of residence. By using our Services, you consent to the transfer of your information to our servers, which are located in data centers operated by Hetzner. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              13. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Depending on your jurisdiction, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal and business requirements)</li>
              <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
              <li><strong>Data Portability:</strong> Request a copy of your personal information in a portable format</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              To exercise these rights, please contact us using the contact information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              14. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>Posting the updated Privacy Policy on our website with a new "Last Updated" date</li>
              <li>Sending an email notification to registered users (for significant changes)</li>
              <li>Displaying a notice in our mobile application (for significant changes)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Your continued use of our Services after any changes to this Privacy Policy constitutes your acceptance of the updated policy. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              15. Compliance with Laws
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We comply with applicable data protection laws and regulations, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300">
              <li>General Data Protection Regulation (GDPR) for users in the European Union</li>
              <li>Applicable local data protection laws in your jurisdiction</li>
              <li>Employment and labor laws regarding employee data</li>
            </ul>
          </section>

          {/* Section 16 */}
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mt-10 mb-4 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              16. Contact Us
            </h2>
            <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600 dark:border-primary-400 p-6 my-6 rounded-r">
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                <strong>Company:</strong> Electrocom
              </p>
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                <strong>Website:</strong>{' '}
                <Link 
                  href="https://electrocomsolutions.in" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors duration-300"
                >
                  https://electrocomsolutions.in
                </Link>
              </p>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                <strong>Email:</strong>{' '}
                <Link 
                  href="mailto:electrocomsolution@gmail.com" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors duration-300"
                >
                  electrocomsolution@gmail.com
                </Link>
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                We will make every effort to respond to your inquiry promptly and address any concerns you may have about your privacy and data protection.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t-2 border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-2">
            &copy; {new Date().getFullYear()} Electrocom. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            This Privacy Policy is effective as of November 2025.
          </p>
        </footer>
      </div>
    </div>
  )
}

