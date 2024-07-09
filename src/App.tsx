import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import samplePDF1 from './sample1.pdf';
import samplePDF2 from './sample2.pdf';
import './App.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs-distからpdf.worker.min.jsファイルへのパスを設定
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="pdf-container">
        <div className="pdf">
          <Document file={samplePDF1}>
            {Array.from(new Array(5), (el, index) => (
              <Page key={`samplePDF1-page-${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
        <div className="pdf">
          <Document file={samplePDF2}>
            {Array.from(new Array(5), (el, index) => (
              <Page key={`samplePDF2-page-${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default App;
