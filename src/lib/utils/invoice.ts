import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from '../types/orderSuccess';

export const generateInvoicePDF = (order: Order) => {
  if (!order) {
    console.error('No order data provided for invoice generation');
    return;
  }

  try {
    const doc = new jsPDF();

    // Header - Company Name
    doc.setFontSize(22);
    doc.setTextColor(8, 102, 70); // Theme color :#086646
    doc.text('Vandopos81', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Official Invoice', 14, 28);

    // Divider
    doc.setDrawColor(200);
    doc.line(14, 32, 196, 32);

    // Order Details (Left)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'bold');
    doc.text('Billed To:', 14, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(order.billingInfo?.name || 'N/A', 14, 48);
    doc.text(order.billingInfo?.email || 'N/A', 14, 53);
    doc.text(order.billingInfo?.phone || 'N/A', 14, 58);
    doc.text(order.billingInfo?.address || 'N/A', 14, 63);
    doc.text(`${order.billingInfo?.city || ''}, ${order.billingInfo?.country || ''}`, 14, 68);

    // Order Details (Right)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Details:', 140, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const displayId = order._id ? order._id.slice(-8).toUpperCase() : 'N/A';
    doc.text(`Invoice ID: ${displayId}`, 140, 48);
    doc.text(`Order Date: ${order.purchaseDate ? new Date(order.purchaseDate).toLocaleDateString() : 'N/A'}`, 140, 53);
    doc.text(`Order Status: ${(order.orderStatus || 'N/A').toUpperCase()}`, 140, 58);
    doc.text(`Payment: ${(order.paymentStatus || 'N/A').toUpperCase()}`, 140, 63);

    // Items Table
    const items = order.items || [];
    const tableData = items.map((item, index) => [
      index + 1,
      item.product?.title || 'Unknown Product',
      item.quantity || 0,
      `$${(item.unitPrice || 0).toFixed(2)}`,
      `$${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 80,
      head: [['#', 'Description', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [8, 102, 70], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' },
      }
    });

    // Totals
    const finalY = (doc as any).lastAutoTable?.finalY || 150;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount: $${(order.totalPrice || 0).toFixed(2)}`, 196, finalY + 10, { align: 'right' });

    // Footer
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150);
    const pageHeight = doc.internal.pageSize.height;
    doc.text('Thank you for choosing Vandopos81!', 105, pageHeight - 15, { align: 'center' });
    doc.text('If you have any questions, please contact support@vandopos81.com', 105, pageHeight - 10, { align: 'center' });

    // Save the PDF
    doc.save(`invoice_${displayId}.pdf`);
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
  }
};
