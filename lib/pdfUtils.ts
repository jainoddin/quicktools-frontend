export const downloadAsPDF = async (elementId: string, filename: string) => {
  if (typeof window === 'undefined') return;
  
  if (!(window as any).html2pdf) {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    } catch (err) {
      console.error('Failed to load html2pdf.js', err);
      return;
    }
  }
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const opt = {
    margin: 15,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  (window as any).html2pdf().set(opt).from(element).save();
};
