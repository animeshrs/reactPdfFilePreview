/** @format */

import React, { useState } from "react";
import PDFViewer from "pdf-viewer-reactjs";

const pdfExtension = "application/pdf";
const pdfBase64PrefixHeader = `data:${pdfExtension};base64,`;

const FileUpload = () => {
	const [pdfFile, setPdfFile] = useState({
		base64: "",
	});

	const changeHandler = (e: any) => {
		const selectedFile = e.target.files[0];
		if (!selectedFile || !pdfExtension.includes(selectedFile.type)) return;

		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = (e) => {
			const result = e.target?.result;
			if (result)
				setPdfFile({
					base64: result.toString(),
				});
		};
	};

	return (
		<>
			<input type="file" onChange={changeHandler} />
			{pdfFile.base64 && (
				<PDFViewer
					document={{
						base64: pdfFile.base64.split(pdfBase64PrefixHeader)[1],
					}}
				/>
			)}
		</>
	);
};

export default FileUpload;
