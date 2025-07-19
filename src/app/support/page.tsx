export default function SupportPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Support</h1>
      <p className="text-gray-700 mb-2">Need help? Our support team is here for you 24/7. Whether you have questions about your bill, need technical assistance, or want to upgrade your plan, we&apos;re ready to assist.</p>
      <ul className="list-disc pl-6 text-gray-700 mb-2">
        <li>Live chat support</li>
        <li>Email: support@netconnectisp.com</li>
        <li>Phone: +1 (555) 123-4567</li>
        <li>Help Center: <a href="/faq" className="text-blue-600 hover:underline">FAQ</a></li>
      </ul>
      <p className="text-gray-700">We value your feedback and strive to resolve all issues quickly and efficiently.</p>
    </div>
  );
}
