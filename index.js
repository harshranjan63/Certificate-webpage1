const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});


const generatePDF = async (name) => {
  
  const existingPdfBytes = await fetch("./Certificate.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  

  //get font
  const fontBytes = await fetch("./LEMONMILK-Bold.otf").then((res) =>
    res.arrayBuffer()
  );

  

  // Embed our custom font in the document
  const LemonMilkfont = await pdfDoc.embedFont(fontBytes);
  
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const textSize = 40
  textWidth = LemonMilkfont.widthOfTextAtSize(name, textSize);

  // Get the width and height of the first page
  // const {width, height } = firstPage.getSize();

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 200,
    y: 256,
    size: 40,
    font: LemonMilkfont,
    color: rgb(1,1,1),
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "Padhega India Subscription Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();
