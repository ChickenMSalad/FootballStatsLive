import PdfViewer from "../../components/PdfViewer/PdfViewer";
import './Documentation.css';
import docPdf from "../../assets/pdfs/sdd-codeproject.pdf";

const Documentation = () => {

    return (
        <div className='pdfdocument'>
            <div className="pdfdocument-about">
                <p className='title'><b>Documentation</b></p>
                <p>Solution Design Document</p>
                <p>Developer Code Project</p>
            </div>

            <div className="pdfdocument-about-info">
                <PdfViewer pdfUrl={docPdf} />
            </div>

        </div>
    )

}

export default Documentation
