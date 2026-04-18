'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { jsPDF } from 'jspdf';

export default function JobStatus() {
  const [passportNumber, setPassportNumber] = useState('');
  const [application, setApplication] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setApplication(null);
    try {
      // Fetch from Google Sheets (published as CSV)
      const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
      const res = await fetch(url);
      const text = await res.text();
      // Strip Google's wrapper
      const json = JSON.parse(text.substring(47).slice(0, -2));
      const rows = json.table.rows;
      // columns: A=passportNumber, B=fullName, C=country, D=occupation, E=email, F=date, G=status, H=photoUrl
      const found = rows.find((row: any) =>
        row.c[0]?.v?.toString().trim().toLowerCase() === passportNumber.trim().toLowerCase()
      );
      if (found) {
        const c = found.c;
        setApplication({
          passportNumber: c[0]?.v || '',
          fullName: c[1]?.v || '',
          country: c[2]?.v || '',
          occupation: c[3]?.v || '',
          email: c[4]?.v || '',
          date: c[5]?.v || '',
          status: c[6]?.v || 'Published',
          passportPhoto: c[7]?.v || '',
        });
      } else {
        setError('No application found with this passport number.');
      }
    } catch (err) {
      console.error(err);
      setError('Error searching. Please try again.');
    }
  };

  const getJobTitle = (occ: string) => occ?.split(' - ')[0] || occ;
  const getSalary = (occ: string) => occ?.split(' - ')[1] || '3,850 CAD';
  const getDate = (raw: string) => {
    if (!raw) return '';
    // Google Sheets returns dates as "Date(2026,3,13)" format
    const sheetsMatch = raw.toString().match(/Date\((\d+),(\d+),(\d+)\)/);
    if (sheetsMatch) {
      const d = new Date(parseInt(sheetsMatch[1]), parseInt(sheetsMatch[2]), parseInt(sheetsMatch[3]));
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    // If already a readable string like "13 April 2026", return as-is
    if (isNaN(Date.parse(raw))) return raw;
    return new Date(raw).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const downloadPDF = () => {
    if (!application) return;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = 210;
    let y = 0;

    // Header bar
    doc.setFillColor(29, 45, 140);
    doc.rect(0, 0, pageW, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('SK International Logistics', pageW / 2, 10, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('511 Rankin Avenue Windsor, Ontario Canada', pageW / 2, 17, { align: 'center' });

    y = 30;
    doc.setTextColor(0, 0, 0);

    // Photo + personal info
    if (application.passportPhoto) {
      try { doc.addImage(application.passportPhoto, 'JPEG', 14, y, 35, 42); } catch (_) {}
    }
    const infoX = 55;
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('FULL NAME', infoX, y + 6);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(29, 45, 140);
    doc.text(application.fullName, infoX, y + 13);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('PASSPORT NO.', infoX, y + 22);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(application.passportNumber, infoX, y + 29);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('COUNTRY', infoX, y + 38);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(application.country, infoX, y + 45);

    y += 55;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, pageW - 14, y);
    y += 8;

    // Subject
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('SUBJECT: Letter of Agreement', 14, y);
    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const subjectText = `Name: ${application.fullName}\nWe are pleased to inform you that we have selected you for the profile of ${getJobTitle(application.occupation)} for regular full time post with our SK International Logistics in 511 Rankin Avenue Windsor Ontario Canada.\n\nCanada is effect from ${getDate(application.date)}. The details of our offer, including terms and conditions are mentioned in this offer of appointment.`;
    const subjectLines = doc.splitTextToSize(subjectText, pageW - 28);
    doc.text(subjectLines, 14, y);
    y += subjectLines.length * 5 + 4;

    doc.line(14, y, pageW - 14, y);
    y += 8;

    // Job details table
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Job Details', 14, y);
    y += 6;

    const rows = [
      ['Job Profile', getJobTitle(application.occupation)],
      ['Salary', getSalary(application.occupation)],
      ['Food Provided', '(Duty Meals)'],
      ['Accommodation', '(Quad Sharing Rooms) – Two (2)'],
      ['Contract Period', 'Two Years'],
      ['Probation Period', '60 Days'],
      ['Working Hours', '48 Hours in a week, 6 days in a week'],
      ['Email', application.email],
      ['Date', getDate(application.date)],
    ];

    rows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(label, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(value, 75, y);
      y += 7;
    });

    y += 2;
    doc.line(14, y, pageW - 14, y);
    y += 8;

    // Benefits paragraph
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const benefitsText = 'Hospitalization, Life Insurance and Accident Coverage as per applicable Company Policies. All allowances will be paid in the form of account credit on the weekly basis. All benefits will be provided such as Air fares (Both Sides), Transportation, Leaves as per Provincial Labor Laws. Following the initial probationary period, a progression and performance review will be conducted on a quarterly basis.';
    const benefitLines = doc.splitTextToSize(benefitsText, pageW - 28);
    doc.text(benefitLines, 14, y);
    y += benefitLines.length * 5 + 6;

    doc.line(14, y, pageW - 14, y);
    y += 8;

    // LMIA
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('TO THE CONSULATE OF CANADA', 14, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const lmiaText = 'Subject: Hiring of Foreign National Worker (overseas) LMIA approval Reference No.: MB51KL5420\nThis Employment Agreement is made and effective. Shadow Express, organized and existing under the laws of the Quebec Province of Canada, with its head office located at 511 Rankin Avenue Windsor Ontario Canada.';
    const lmiaLines = doc.splitTextToSize(lmiaText, pageW - 28);
    doc.text(lmiaLines, 14, y);
    y += lmiaLines.length * 5 + 6;

    // Check if we need a new page
    if (y > 240) { doc.addPage(); y = 20; }

    doc.line(14, y, pageW - 14, y);
    y += 8;

    // Sections
    const sections = [
      ['APPOINTMENT', 'The Employee is hereby employed by the Corporation to render such services and to perform such tasks as may be assigned by the Corporation.'],
      ['ACCEPTANCE OF EMPLOYMENT', 'A copy of employment letter was sent to the Employee and Employee accepts employment with the Corporation upon the terms set forth in that and agrees to devote all Employee\'s time, energy and ability to the interests of the Corporation.'],
      ['COMPENSATION', 'The Corporation shall pay the Employee such Monthly compensation as determined by the Corporation in the previous employment letter. Payment shall be at the same time as the Corporations usual payroll to other employees.'],
      ['TERM OF AGREEMENT', 'There shall be 2 (TWO) Years term of employment. Employer acknowledges and agrees that Employee shall be an "At Will" Employee and that Employee\'s employment may be terminated at any time by the Corporation, with or without cause.'],
    ];

    sections.forEach(([title, body]) => {
      if (y > 255) { doc.addPage(); y = 20; }
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(title, 14, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(body, pageW - 28);
      doc.text(lines, 14, y);
      y += lines.length * 5 + 5;
    });

    if (y > 220) { doc.addPage(); y = 20; }
    doc.line(14, y, pageW - 14, y);
    y += 8;

    // Invoice
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('BIOMETRIC INSTRUCTION BILL TAX INVOICE', 14, y);
    y += 8;

    const invoiceDetails = [
      ['Invoice No:', '12'],
      ['Full Name:', application.fullName],
      ['Passport No:', application.passportNumber],
      ['Country:', application.country],
      ['Due:', '2 Days'],
      ['Email Address:', application.email],
    ];
    invoiceDetails.forEach(([label, value]) => {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text(label, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(value, 60, y);
      y += 6;
    });

    y += 4;
    // Payment table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Voucher:', 14, y);
    y += 6;

    // Table header
    doc.setFillColor(240, 240, 240);
    doc.rect(14, y - 4, pageW - 28, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.text('Fee', 16, y);
    doc.text('Price', 80, y);
    doc.text('Quantity', 110, y);
    doc.text('Grand Total', 155, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.text('Biometric Fee', 16, y);
    doc.text('340$', 80, y);
    doc.text('1', 110, y);
    doc.text('340$', 155, y);
    y += 8;

    doc.setFont('helvetica', 'bold');
    doc.text('Sub Total', 110, y);
    doc.text('340$', 155, y);
    y += 6;
    doc.text('Tax Total %1X', 110, y);
    doc.text('$0.00', 155, y);
    y += 6;
    doc.text('Grand Total', 110, y);
    doc.text('340$', 155, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Status: Unpaid', 14, y);
    y += 7;
    doc.text('Payment Mode: CLIENT', 14, y);
    y += 10;

    doc.setFontSize(10);
    doc.text('NOTE!!', 14, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const noteText = 'We request you to complete the biometric requirements for your Canada visa process as soon as possible.\nIf you have any complaints please Reach our SK International Logistics. +91 8822021340';
    const noteLines = doc.splitTextToSize(noteText, pageW - 28);
    doc.text(noteLines, 14, y);
    y += noteLines.length * 5 + 8;

    // Footer
    doc.setDrawColor(241, 48, 5);
    doc.setLineWidth(0.5);
    doc.line(14, y, pageW - 14, y);
    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('COPY TO: MANAGING DIRECTOR | CHIEF EXECUTIVE OFFICER | FINANCE MANAGER | ADMINISTRATOR | G. MANAGER', pageW / 2, y, { align: 'center' });

    doc.save(`Application_${application.passportNumber}.pdf`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <PageHeader
        title="Find Job Status"
        breadcrumb="Find Job Status"
        backgroundImage="/home/craneImg.jpg"
      />

      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-lg space-y-6">

          {/* Search Card */}
          <div className="bg-white shadow-md p-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">
                  Enter Passport Number:
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-800 focus:outline-none text-base bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white font-bold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#f13005', borderRadius: 0 }}
              >
                Search
              </button>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold text-base">{error}</p>
            </div>
          )}

          {/* Result */}
          {application && (
            <div className="bg-white shadow-md overflow-hidden">

              <div className="p-5 space-y-5 text-sm">

                {/* Status + Company info + Photo */}                <div>
                  <p className="text-sm mb-3">
                    Status: <span className="font-bold" style={{ color: '#22c55e' }}>Published</span>
                  </p>
                  <div className="flex justify-between items-start gap-3">
                    <div className="text-sm text-gray-800 leading-relaxed">
                      <p className="font-bold">SK International Logistics</p>
                      <p>511 Rankin Avenue Windsor,</p>
                      <p>Ontario Canada</p>
                      <p>+91 8822021340</p>
                    </div>
                    {application.passportPhoto && application.passportPhoto.startsWith('http') ? (
                      <img src={application.passportPhoto} alt="Passport Photo"
                        className="w-24 h-28 object-cover border border-gray-300 flex-shrink-0" />
                    ) : (
                      <div className="w-24 h-28 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 text-xs flex-shrink-0 text-center p-1">
                        Photo<br/>Pending
                      </div>
                    )}
                  </div>
                </div>

                {/* Name / Passport / Date */}
                <div className="text-sm text-gray-800 space-y-1">
                  <p>Name: {application.fullName}</p>
                  <p>Passport No: {application.passportNumber}</p>
                  <p>Date: {getDate(application.date)}</p>
                </div>

                <hr />

                {/* Subject */}
                <div>
                  <p className="font-bold text-gray-900 mb-1">SUBJECT: Letter of Agreement</p>
                  <p className="text-gray-700 leading-relaxed">
                    Name: <span className="font-bold">{application.fullName}</span><br />
                    We are pleased to inform you that we have selected you for the profile of{' '}
                    <span className="font-bold">{getJobTitle(application.occupation)}</span> for regular full time post with our SK International Logistics in 511 Rankin Avenue Windsor Ontario Canada.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Canada is effect from {getDate(application.date)}. The details of our offer, including terms and conditions are mentioned in this offer of appointment.
                  </p>
                </div>

                <hr />

                {/* Job Details Table */}
                <div>
                  <table className="w-full border border-gray-300 text-sm">
                    <tbody>
                      {[
                        ['Job Profile', getJobTitle(application.occupation)],
                        ['Salary', getSalary(application.occupation)],
                        ['Food Provided', '(Duty Meals)'],
                        ['Accommodation', '(Quad Sharing Rooms) – Two (2)'],
                        ['Contract Period', 'Two Years'],
                        ['Probation Period', '60 Days'],
                        ['Working Hours', '48 Hours in a week, 6 days in a week'],
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-gray-200">
                          <td className="py-2 px-3 font-bold text-gray-700 bg-gray-50 w-2/5">{label}</td>
                          <td className="py-2 px-3 text-gray-800">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <hr />

                {/* Benefits */}
                <p className="text-gray-600 leading-relaxed">
                  Hospitalization, Life Insurance and Accident Coverage as per applicable Company Policies.
                  All allowances will be paid in the form of account credit on the weekly basis.
                  All benefits will be provided such as Air fares (Both Sides), Transportation, Leaves as per Provincial Labor Laws.
                  Following the initial probationary period, a progression and performance review will be conducted on a quarterly basis to assess performance to date.
                  This arrangement may be terminated by either party upon notice in writing with notice that complies with Employment Standards.
                </p>

                <hr />

                {/* LMIA */}
                <div>
                  <p className="font-bold text-gray-900 mb-1">TO THE CONSULATE OF CANADA</p>
                  <p className="text-gray-600 leading-relaxed">
                    Subject: Hiring of Foreign National Worker (overseas) LMIA approval Reference No.: <span className="font-bold">MB51KL5420</span><br />
                    This Employment Agreement is made and effective. Shadow Express, organized and existing under the laws of the Quebec Province of Canada, with its head office located at 511 Rankin Avenue Windsor Ontario Canada.
                  </p>
                </div>

                <hr />

                {/* Sections */}
                {[
                  ['APPOINTMENT', 'The Employee is hereby employed by the Corporation to render such services and to perform such tasks as may be assigned by the Corporation. The corporation may, in its sole discretion, increase or reduce the duties or modify the job description of the Employee from time to time.'],
                  ['ACCEPTANCE OF EMPLOYMENT', "A copy of employment letter was sent to the Employee and Employee accepts employment with the Corporation upon the terms set forth in that and agrees to devote all Employee's time, energy and ability to the interests of the Corporation, and to perform Employee's duties in an efficient, trustworthy and business-like manner."],
                  ['DEVOTION OF TIME TO EMPLOYMENT', "The Employee shall devote the Employee's best efforts and substantially all of the Employee's working time to performing the duties on behalf of the Corporation. The Employee shall provide services during the hours that are scheduled by the Corporation management."],
                  ['NO CONFLICT OF INTEREST', 'Employee shall not engage in any other business while employed by the Corporation. Employee shall not engage in any activity that conflicts with the Employees duties to the Corporation.'],
                  ['COMPENSATION', "The Corporation shall pay the Employee such Monthly compensation as determined by the Corporation in the previous employment letter. Payment shall be at the same time as the Corporations usual payroll to other employees."],
                  ['BONUS & BENEFITS', 'Payment of any bonuses shall be at the complete discretion of the Corporation. No guarantee or representation that any bonuses will be paid has been made to the Employee. Standard benefits that are provided to other non-management employees shall be offered to the Employee.'],
                  ['TERM OF AGREEMENT', 'There shall be 2 (TWO) Years term of employment. Employer acknowledges and agrees that Employee shall be an "At Will" Employee and that Employee\'s employment may be terminated at any time by the Corporation, with or without cause.'],
                  ['MODIFICATION', 'No change or modification of this Agreement shall be valid unless the same be in writing and signed by the parties.'],
                ].map(([title, body]) => (
                  <div key={title}>
                    <p className="font-bold text-gray-900 mb-1">{title}</p>
                    <p className="text-gray-600 leading-relaxed">{body}</p>
                    <hr className="mt-4" />
                  </div>
                ))}

                {/* Invoice */}
                <div>
                  <p className="font-bold text-gray-900 text-base mb-3">BIOMETRIC INSTRUCTION BILL TAX INVOICE</p>
                  <div className="space-y-1 mb-4">
                    {[
                      ['Invoice No:', '12'],
                      ['Full Name:', application.fullName],
                      ['Passport No:', application.passportNumber],
                      ['Country:', application.country],
                      ['Due:', '2 Days'],
                      ['Email Address:', application.email],
                    ].map(([label, value]) => (
                      <div key={label} className="flex gap-2">
                        <span className="font-bold text-gray-700 w-32 flex-shrink-0">{label}</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="font-bold text-gray-900 mb-2">Payment Voucher:</p>
                  <table className="w-full border border-gray-300 text-sm mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left font-bold">Fee</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-bold">Price</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-bold">Quantity</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-bold">Grand Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Biometric Fee</td>
                        <td className="border border-gray-300 px-3 py-2">340$</td>
                        <td className="border border-gray-300 px-3 py-2">1</td>
                        <td className="border border-gray-300 px-3 py-2">340$</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="border border-gray-300 px-3 py-2"></td>
                        <td className="border border-gray-300 px-3 py-2 font-bold">Sub Total</td>
                        <td className="border border-gray-300 px-3 py-2">340$</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="border border-gray-300 px-3 py-2"></td>
                        <td className="border border-gray-300 px-3 py-2 font-bold">Tax Total %1X</td>
                        <td className="border border-gray-300 px-3 py-2">$0.00</td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="border border-gray-300 px-3 py-2"></td>
                        <td className="border border-gray-300 px-3 py-2 font-bold">Grand Total</td>
                        <td className="border border-gray-300 px-3 py-2 font-bold">340$</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="font-bold text-gray-900">Payment Status: Unpaid</p>
                  <p className="font-bold text-gray-900 mt-1">Payment Mode: CLIENT</p>
                </div>

                <hr />

                {/* Note */}
                <div>
                  <p className="font-bold text-gray-900 mb-1">NOTE!!</p>
                  <p className="text-gray-600 leading-relaxed">
                    We request you to complete the biometric requirements for your Canada visa process as soon as possible.<br />
                    If you have any complaints please Reach our SK International Logistics. +91 8822021340
                  </p>
                </div>

                {/* Download PDF */}
                <div className="pt-2">
                  <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-5 py-2 border border-red-500 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download as PDF
                  </button>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-400 text-center">
                COPY TO: MANAGING DIRECTOR · CHIEF EXECUTIVE OFFICER · FINANCE MANAGER · ADMINISTRATOR · G. MANAGER · MINISTRY OF INTERIOR · MINISTRY OF FOREIGN AFFAIRS
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
