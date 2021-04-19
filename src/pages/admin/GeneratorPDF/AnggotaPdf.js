import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from "date-fns";

const anggotaPDF = items => {
    // initialize jsPDF
    const doc = new jsPDF();
   
    // define the columns we want and their titles
    const tableColumn = ["No","Nama Anggota","Tanggal Pendaftaran"];
    // define an empty array of rows
    const tableRows = [];
  
    // for each ticket pass all its data into an array
    items.forEach(item => {
      const itemData = [
        item.id,
        item.nama_anggota,
        item.createdAt,
        // called date-fns to format the date on the ticket
        format(new Date(item.createdAt), "dd-MM-yyyy")
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
    doc.text("Daftar Anggota Koperasi Kahuripan",60,15);
    doc.text("Periode 2020/2021",78,22);
    // we define the name of our PDF file.
    doc.save(`Daftar_Anggota_${thisDate}.pdf`);
  };

export default anggotaPDF;