import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from "date-fns";

const AnggotaPdf = itemPdf => {
  // initialize jsPDF
    const doc = new jsPDF("l","mm",[297,210]);
   
    // define the columns we want and their titles
    const tableColumn = ["No","Nama","Tanggal Daftar","Status"];
    // define an empty array of rows
    const tableRows = [];
  
    // for each ticket pass all its data into an array
    itemPdf.forEach( (item,index) => {
      const itemData = [
        index + 1,
        item.username,
        format(new Date(item.created_at), "dd-MM-yyyy"),
        item.status,
      ];
      // push each tickcet's info into a row
      tableRows.push(itemData);
    });
  
    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, {
        styles: { halign: "center",},
        startY: 28,
        theme: "grid",
    });
    // we use a date string to generate our filename.
    const thisDate = format(new Date(),"dd-MM-yyyy");
    // ticket title. and margin-top + margin-left
    doc.text("Daftar Anggota Koperasi Kahuripan",105,15);
    doc.text("Periode 2020/2021",125,22);
    // we define the name of our PDF file.
    doc.save(`Daftar_Anggota_${thisDate}.pdf`);
  };

export default AnggotaPdf;