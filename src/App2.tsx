import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs-distからpdf.worker.min.jsファイルへのパスを設定
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const App: React.FC = () => {
  const [pdfDatas, setPdfDatas] = useState<string[]>([]);

  useEffect(() => {
    const pdfPaths = ['./sample1.pdf', './sample2.pdf'];

    const fetchPdfFiles = async () => {
      const pdfDataPromises = pdfPaths.map(async (path) => {
        const response = await fetch(path);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
      });

      const pdfDataArray = await Promise.all(pdfDataPromises);
      setPdfDatas(pdfDataArray);
    };

    fetchPdfFiles();
  }, []);

  return (
    <div className="App">
      <div className="pdf-container">
        {pdfDatas.map((pdfData, index) => (
          <div className="pdf" key={index}>
            <Document file={pdfData}>
              {Array.from(new Array(5), (el, pageIndex) => (
                <Page key={`samplePDF${index + 1}-page-${pageIndex + 1}`} pageNumber={pageIndex + 1} />
              ))}
            </Document>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
