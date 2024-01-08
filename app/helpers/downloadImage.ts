import html2canvas from "html2canvas";

export const downloadImage = (blob: string, fileName: string) => {
    const link = window.document.createElement("a");
    link.style.display = "none";
    link.download = fileName;

    link.href = blob;
    console.log(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    link.remove();
  };

  export const exportAsImage = async (element: any, imageFileName: string) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };