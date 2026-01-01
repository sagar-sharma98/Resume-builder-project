import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPDF = async (elementId) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let remainingHeight = imgHeight;
    let yPosition = 0;

    pdf.addImage(imgData, "PNG", 0, yPosition, pageWidth, imgHeight);
    remainingHeight -= pageHeight;

    while (remainingHeight > 0) {
      yPosition = remainingHeight - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, yPosition, pageWidth, imgHeight);
      remainingHeight -= pageHeight;
    }

    pdf.save("resume.pdf");
  } catch (error) {
    console.log("PDF export failed", error);
  }
};
