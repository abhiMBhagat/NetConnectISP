// CustomerDashboard: Main dashboard page for listing, filtering, editing, and deleting invoices

'use client';

import React, { useState, useEffect } from 'react';
import InvoiceFilterDropdown from '@/components/invoice/InvoiceFilterDropdown';
import { pdf } from '@react-pdf/renderer';
import { InvoicePDF } from '@/lib/pdf/InvoicePDF';
import { Invoice } from '@/types';

const CustomerDashboard: React.FC = () => {
  // State for all invoices (unfiltered), filtered invoices, filter type, loading
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState('Monthly');
  const [loading, setLoading] = useState(true);


  const generatePDF = async (invoice: Invoice) => {
    console.log('Generating PDF for invoice:', invoice);
    try {
      const pdfDoc = pdf(<InvoicePDF invoice={invoice} />);
      const blob = await pdfDoc.toBlob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${invoice.invoiceNumber || 'unknown'}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Client-side PDF error:', error.message);
        alert('Error generating PDF: ' + error.message);
      } else {
        console.error('Client-side PDF error:', error);
        alert('Error generating PDF.');
      }
    }
  };

  // Fetch all invoices from API on mount
  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      const res = await fetch('/api/invoices');
      const data = await res.json();
      setAllInvoices(data);
      // Apply filter after fetch
      const currentYear = new Date().getFullYear();
      let filtered = data;
      if (filter === 'Monthly') {
        filtered = data.filter((invoice: Invoice) => new Date(invoice.invoiceDate).getFullYear() === currentYear);
      }
      setInvoices(filtered);
      setLoading(false);
    }
    fetchInvoices();
  }, [filter]);

  // Handle filter dropdown change (Monthly/Yearly)
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    const currentYear = new Date().getFullYear();
    let filteredInvoices: Invoice[] = [...allInvoices];
    if (filter === 'Monthly') {
      filteredInvoices = allInvoices.filter((invoice: Invoice) => {
        const year = new Date(invoice.invoiceDate).getFullYear();
        return year === currentYear;
      });
    }
    setInvoices(filteredInvoices);
  };


  console.log('Rendered invoices:', invoices);
  return (
    <React.Fragment>
      <div style={{ overflow: 'visible' }}>
        <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
        <div>
          <p>Filter Dropdown Should Be Here: </p>
          <InvoiceFilterDropdown onSelect={handleFilterChange} />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Invoice List</h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.length > 0 ? (
                  invoices.map((invoice: Invoice) => (
                    <tr key={invoice._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{invoice.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{invoice.invoiceDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">${invoice.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black">{invoice.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-green-600 hover:underline"
                          onClick={() => generatePDF(invoice)}
                        > PDF</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No invoices found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>


        {/* Editing invoice modal code removed for cleanliness */}
      </div>
    </React.Fragment>
  );
};

export default CustomerDashboard;